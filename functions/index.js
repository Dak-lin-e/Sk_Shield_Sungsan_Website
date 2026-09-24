import { onDocumentCreated } from 'firebase-functions/v2/firestore';
import { onSchedule } from 'firebase-functions/v2/scheduler';
import { defineSecret, defineString } from 'firebase-functions/params';
import { logger } from 'firebase-functions';
import { initializeApp } from 'firebase-admin/app';
import { FieldValue, getFirestore } from 'firebase-admin/firestore';
import { getStorage } from 'firebase-admin/storage';
import nodemailer from 'nodemailer';
import { buildInquiryEmail, nextThrottleState } from './mail.js';
import { GRACE_DAYS, runStorageCleanup } from './cleanup.js';

initializeApp();
const db = getFirestore();

// 배포 시 값을 묻고 functions/.env.<프로젝트ID> 에 저장된다 (저장소에는 커밋하지 않음).
const GMAIL_USER = defineString('GMAIL_USER', { description: '알림 메일을 보낼 Gmail 주소' });
const NOTIFY_TO = defineString('NOTIFY_TO', { description: '알림을 받을 이메일 주소 (여러 개면 쉼표로 구분)' });
const SITE_URL = defineString('SITE_URL', { default: '', description: '메일의 관리자 페이지 링크에 쓸 사이트 주소 (예: https://example.vercel.app)' });
// Gmail 앱 비밀번호는 Secret Manager에 보관한다: firebase functions:secrets:set GMAIL_APP_PASSWORD
const GMAIL_APP_PASSWORD = defineSecret('GMAIL_APP_PASSWORD');

// Firestore 데이터베이스와 같은 리전이어야 한다. (콘솔 Firestore 화면에서 위치 확인)
const REGION = 'asia-northeast3';
// 시간당 최대 알림 메일 수. 넘으면 메일은 건너뛰고 신청 자체는 관리자 페이지에 그대로 쌓인다.
const MAX_MAILS_PER_HOUR = 30;

const isEmulator = process.env.FUNCTIONS_EMULATOR === 'true';

function createTransport() {
  // 로컬 에뮬레이터에서는 실제로 보내지 않고 메일 내용을 로그로만 남긴다.
  if (isEmulator) return nodemailer.createTransport({ jsonTransport: true });
  return nodemailer.createTransport({
    service: 'gmail',
    auth: { user: GMAIL_USER.value(), pass: GMAIL_APP_PASSWORD.value() },
  });
}

async function takeThrottleSlot() {
  const ref = db.doc('meta/inquiryMailThrottle');
  return db.runTransaction(async tx => {
    const snap = await tx.get(ref);
    const { allowed, next } = nextThrottleState(snap.exists ? snap.data() : null, Date.now(), MAX_MAILS_PER_HOUR);
    tx.set(ref, next);
    return allowed;
  });
}

export const notifyNewInquiry = onDocumentCreated(
  {
    document: 'inquiries/{inquiryId}',
    region: REGION,
    secrets: [GMAIL_APP_PASSWORD],
    maxInstances: 3,
  },
  async event => {
    const snapshot = event.data;
    if (!snapshot) return;
    const inquiry = snapshot.data();

    // 같은 이벤트가 다시 전달돼도 메일을 두 번 보내지 않는다.
    if (inquiry.notifiedAt) return;

    if (!(await takeThrottleSlot())) {
      logger.warn('시간당 알림 한도를 넘어 메일을 보내지 않았습니다.', { inquiryId: event.params.inquiryId });
      return;
    }

    const recipients = NOTIFY_TO.value()
      .split(',')
      .map(address => address.trim())
      .filter(Boolean);
    if (recipients.length === 0) {
      logger.error('NOTIFY_TO가 비어 있어 알림 메일을 보내지 못했습니다.');
      return;
    }

    const { subject, text, html } = buildInquiryEmail(inquiry, {
      createdAt: inquiry.createdAt?.toDate?.() ?? new Date(),
      siteUrl: SITE_URL.value(),
    });

    const info = await createTransport().sendMail({
      from: { name: '성산대리점 홈페이지', address: GMAIL_USER.value() },
      to: recipients,
      subject,
      text,
      html,
    });

    await snapshot.ref.update({ notifiedAt: FieldValue.serverTimestamp() });
    logger.info('상담 신청 알림 메일을 보냈습니다.', {
      inquiryId: event.params.inquiryId,
      recipients: recipients.length,
      ...(isEmulator && { preview: JSON.parse(info.message) }),
    });
  }
);

// 매일 새벽 4시(한국 시간): 광고·콘텐츠에서 더 이상 쓰이지 않는 업로드 이미지를
// "처음 안 쓰이게 된 날"로부터 GRACE_DAYS(30일)가 지난 뒤 삭제한다.
export const cleanupUnusedImages = onSchedule(
  { schedule: 'every day 04:00', timeZone: 'Asia/Seoul', region: REGION, maxInstances: 1 },
  async () => {
    const summary = await runStorageCleanup({ db, bucket: getStorage().bucket() });
    logger.info(`미사용 이미지 정리 완료 (유예 ${GRACE_DAYS}일)`, summary);
  }
);
