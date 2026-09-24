/** 사용자 기기 기준 오늘 날짜 (YYYY-MM-DD) */
export function todayString() {
  const now = new Date();
  const offset = now.getTimezoneOffset() * 60000;
  return new Date(now - offset).toISOString().slice(0, 10);
}

/** 노출 기간(시작일~종료일, 비어 있으면 제한 없음) 안에 오늘이 포함되는지 */
export function isInPeriod(ad, today = todayString()) {
  return (!ad.startDate || ad.startDate <= today) && (!ad.endDate || today <= ad.endDate);
}

/** 관리자 목록용 상태: live(노출 중) | scheduled(예정) | ended(종료) | hidden(숨김) */
export function adStatus(ad, today = todayString()) {
  if (!ad.active) return 'hidden';
  if (ad.startDate && ad.startDate > today) return 'scheduled';
  if (ad.endDate && ad.endDate < today) return 'ended';
  return 'live';
}
