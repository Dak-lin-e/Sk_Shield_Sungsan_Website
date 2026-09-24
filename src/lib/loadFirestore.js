let pending;

/**
 * 공개 사이트용 Firestore Lite를 지연 로드한다.
 * 첫 화면은 기본 콘텐츠로 먼저 그리고, Firebase 코드는 별도 청크로 이어서 받는다.
 */
export function loadFirestore() {
  pending ??= Promise.all([import('firebase/firestore/lite'), import('./firebase')]).then(([firestore, { db }]) => ({ ...firestore, db }));
  return pending;
}
