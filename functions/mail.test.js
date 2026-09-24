import { test } from 'node:test';
import assert from 'node:assert/strict';
import { buildInquiryEmail, formatPhone, nextThrottleState } from './mail.js';

const base = { name: '홍길동', phone: '01012345678', region: '광주', privacy: true, marketing: true, sms: false };
const at = new Date('2026-09-24T07:41:00Z'); // KST 16:41

test('제목·본문에 신청 정보가 들어간다', () => {
  const mail = buildInquiryEmail(base, { createdAt: at, siteUrl: 'https://example.vercel.app/' });
  assert.equal(mail.subject, '[성산대리점] 새 상담 신청 - 홍길동 (광주)');
  assert.match(mail.text, /전화번호: 010-1234-5678/);
  assert.match(mail.text, /오후 04:41/);
  assert.match(mail.text, /마케팅 정보 수집: 동의/);
  assert.match(mail.text, /마케팅 정보 수신: 미동의/);
  assert.match(mail.text, /관리자 페이지: https:\/\/example\.vercel\.app\/admin$/);
  assert.match(mail.html, /href="tel:01012345678"/);
});

test('HTML 주입을 이스케이프한다', () => {
  const mail = buildInquiryEmail({ ...base, name: '<img src=x onerror=alert(1)>' }, { createdAt: at });
  assert.ok(!mail.html.includes('<img src=x'));
  assert.match(mail.html, /&lt;img src=x onerror=alert\(1\)&gt;/);
});

test('제목에 줄바꿈(헤더 주입)이 남지 않는다', () => {
  const mail = buildInquiryEmail({ ...base, name: '홍\r\nBcc: evil@example.com' }, { createdAt: at });
  assert.ok(!/[\r\n]/.test(mail.subject));
});

test('사이트 주소가 없으면 관리자 링크를 넣지 않는다', () => {
  const mail = buildInquiryEmail(base, { createdAt: at });
  assert.ok(!mail.text.includes('관리자 페이지'));
  assert.ok(!mail.html.includes('/admin'));
});

test('전화번호 포맷', () => {
  assert.equal(formatPhone('0212345678'), '02-1234-5678');
  assert.equal(formatPhone('0311234567'), '031-123-4567');
  assert.equal(formatPhone('021234567'), '02-123-4567');
  assert.equal(formatPhone('01012345678'), '010-1234-5678');
  assert.equal(formatPhone('0101234567'), '010-123-4567');
});

test('시간당 발송 한도', () => {
  const hour = Date.UTC(2026, 8, 24, 7);
  let state = null;
  for (let i = 0; i < 3; i++) {
    const r = nextThrottleState(state, hour + i * 1000, 3);
    assert.equal(r.allowed, true);
    state = r.next;
  }
  const blocked = nextThrottleState(state, hour + 5000, 3);
  assert.equal(blocked.allowed, false);
  assert.equal(blocked.next.suppressed, 1);
  const nextHour = nextThrottleState(blocked.next, hour + 3600000, 3);
  assert.equal(nextHour.allowed, true);
  assert.equal(nextHour.next.count, 1);
});
