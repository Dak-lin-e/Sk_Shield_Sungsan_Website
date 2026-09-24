// 상담 신청 알림 메일 내용 만들기 (Firebase와 무관한 순수 함수라 단독 테스트 가능)

const escapeHtml = value =>
  String(value ?? '').replace(/[&<>"']/g, ch => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[ch]);

// 제목 헤더에 줄바꿈/제어문자가 들어가지 않도록 제거한다.
const oneLine = value => String(value ?? '').replace(/[\u0000-\u001f\u007f]+/g, ' ').trim();

// 서울(02)만 지역번호가 두 자리다.
export const formatPhone = digits =>
  String(digits ?? '')
    .replace(/^(02)(\d{3,4})(\d{4})$/, '$1-$2-$3')
    .replace(/^(0\d{2})(\d{3,4})(\d{4})$/, '$1-$2-$3');

export const formatKoreanTime = date =>
  new Intl.DateTimeFormat('ko-KR', {
    timeZone: 'Asia/Seoul',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    weekday: 'short',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date);

/**
 * @param {object} inquiry Firestore inquiries 문서 데이터
 * @param {{ createdAt?: Date, siteUrl?: string }} options
 */
export function buildInquiryEmail(inquiry, { createdAt = new Date(), siteUrl = '' } = {}) {
  const name = oneLine(inquiry.name) || '이름 없음';
  const region = oneLine(inquiry.region);
  const phone = formatPhone(inquiry.phone);
  const time = formatKoreanTime(createdAt);
  const adminUrl = siteUrl ? `${siteUrl.replace(/\/+$/, '')}/admin` : '';
  const yesNo = value => (value ? '동의' : '미동의');

  const rows = [
    ['이름', name],
    ['전화번호', phone],
    ['지역', region],
    ['접수 시각', time],
    ['마케팅 정보 수집', yesNo(inquiry.marketing)],
    ['마케팅 정보 수신', yesNo(inquiry.sms)],
  ];

  const subject = `[성산대리점] 새 상담 신청 - ${name}${region ? ` (${region})` : ''}`;

  const text = [
    '홈페이지로 새 상담 신청이 들어왔어요.',
    '',
    ...rows.map(([label, value]) => `${label}: ${value}`),
    '',
    adminUrl ? `관리자 페이지: ${adminUrl}` : '',
  ]
    .filter((line, i, all) => line !== '' || all[i - 1] !== '')
    .join('\n')
    .trim();

  const html = `<!doctype html>
<html lang="ko"><body style="margin:0;padding:24px;background:#F1F5F9;font-family:-apple-system,BlinkMacSystemFont,'Apple SD Gothic Neo','Malgun Gothic',sans-serif;color:#0F172A">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:520px;margin:0 auto;background:#FFFFFF;border:1px solid #E2E8F0;border-radius:16px">
    <tr><td style="padding:28px 28px 8px">
      <p style="margin:0;font-size:12px;letter-spacing:.12em;color:#0052FF">NEW INQUIRY</p>
      <h1 style="margin:8px 0 0;font-size:20px">새 상담 신청이 들어왔어요</h1>
    </td></tr>
    <tr><td style="padding:16px 28px">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="font-size:15px">
        ${rows
          .map(
            ([label, value]) =>
              `<tr><td style="padding:8px 0;color:#64748B;width:120px;vertical-align:top">${escapeHtml(label)}</td><td style="padding:8px 0;font-weight:600">${
                label === '전화번호' ? `<a href="tel:${escapeHtml(inquiry.phone)}" style="color:#0052FF;text-decoration:none">${escapeHtml(value)}</a>` : escapeHtml(value)
              }</td></tr>`
          )
          .join('\n        ')}
      </table>
    </td></tr>
    ${
      adminUrl
        ? `<tr><td style="padding:8px 28px 28px"><a href="${escapeHtml(adminUrl)}" style="display:inline-block;padding:12px 20px;border-radius:12px;background:#0052FF;color:#FFFFFF;font-weight:600;text-decoration:none">관리자 페이지에서 보기</a></td></tr>`
        : ''
    }
  </table>
</body></html>`;

  return { subject, text, html };
}

/** 시간당 발송 한도 판단 (스팸성 대량 신청 시 메일 폭주 방지) */
export function nextThrottleState(state, now, limitPerHour) {
  const hourStart = Math.floor(now / 3600000) * 3600000;
  const count = state && state.windowStart === hourStart ? state.count : 0;
  if (count >= limitPerHour) return { allowed: false, next: { windowStart: hourStart, count, suppressed: (state?.suppressed || 0) + 1 } };
  return { allowed: true, next: { windowStart: hourStart, count: count + 1, suppressed: state?.windowStart === hourStart ? state.suppressed || 0 : 0 } };
}
