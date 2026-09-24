// 쓰이지 않는 업로드 이미지(ads/, content/)를 유예 기간 뒤에 정리한다.
// "처음 안 쓰이게 된 날"을 기록해 두고, 그로부터 GRACE_DAYS가 지나면 삭제한다.

export const CLEANUP_PREFIXES = ['ads/', 'content/'];
export const GRACE_DAYS = 30;
const DAY_MS = 24 * 60 * 60 * 1000;

/** Firebase Storage 다운로드 URL에서 객체 경로를 뽑는다. 우리 버킷이 아니면 null. */
export function storagePathFromUrl(url, bucket) {
  if (typeof url !== 'string') return null;
  const prefix = `https://firebasestorage.googleapis.com/v0/b/${bucket}/o/`;
  if (!url.startsWith(prefix)) return null;
  const encoded = url.slice(prefix.length).split('?')[0];
  try {
    return decodeURIComponent(encoded);
  } catch {
    return null;
  }
}

/** 광고 문서와 사이트 콘텐츠 문서에서 현재 쓰이는 Storage 경로 모음 */
export function collectReferencedPaths({ ads = [], siteContent = [], bucket }) {
  const referenced = new Set();
  for (const ad of ads) {
    if (typeof ad.imagePath === 'string' && ad.imagePath) referenced.add(ad.imagePath);
    const fromUrl = storagePathFromUrl(ad.imageUrl, bucket);
    if (fromUrl) referenced.add(fromUrl);
  }
  for (const page of siteContent) {
    for (const value of Object.values(page)) {
      const path = storagePathFromUrl(value, bucket);
      if (path) referenced.add(path);
    }
  }
  return referenced;
}

/**
 * 정리 계획을 세운다 (부수효과 없음).
 * @param {object} input
 * @param {string[]} input.files        정리 대상 폴더의 현재 파일 경로
 * @param {Set<string>} input.referenced 현재 쓰이는 경로
 * @param {Record<string, number>} input.orphans  기록된 미사용 파일: 경로 → 처음 미사용 확인 시각(ms)
 * @param {number} input.now
 * @param {number} [input.graceDays]
 * @returns {{ toDelete: string[], toRecord: string[], toForget: string[] }}
 *   toDelete: 유예 기간이 지나 지울 파일 / toRecord: 새로 미사용으로 기록할 파일 /
 *   toForget: 기록을 지울 경로(다시 쓰이거나 이미 사라진 파일)
 */
export function planCleanup({ files, referenced, orphans, now, graceDays = GRACE_DAYS }) {
  const inScope = path => CLEANUP_PREFIXES.some(prefix => path.startsWith(prefix));
  const existing = new Set(files.filter(inScope));
  const toDelete = [];
  const toRecord = [];
  const toForget = [];

  for (const path of existing) {
    if (referenced.has(path)) {
      if (path in orphans) toForget.push(path);
      continue;
    }
    if (!(path in orphans)) toRecord.push(path);
    else if (now - orphans[path] >= graceDays * DAY_MS) toDelete.push(path);
  }
  for (const path of Object.keys(orphans)) {
    if (!existing.has(path)) toForget.push(path);
  }
  // 지운 파일의 기록도 함께 정리한다.
  return { toDelete, toRecord, toForget: [...toForget, ...toDelete] };
}

/** Firestore 문서 ID로 쓸 수 있게 경로를 인코딩한다 ('/' 불가). */
export const orphanDocId = path => encodeURIComponent(path);

/**
 * 실제 정리 실행. Admin SDK의 Firestore와 Storage 버킷을 받는다.
 * @returns 실행 요약
 */
export async function runStorageCleanup({ db, bucket, now = Date.now(), graceDays = GRACE_DAYS, dryRun = false }) {
  const [adsSnap, contentSnap, orphanSnap, ...fileLists] = await Promise.all([
    db.collection('ads').get(),
    db.collection('siteContent').get(),
    db.collection('storageOrphans').get(),
    ...CLEANUP_PREFIXES.map(prefix => bucket.getFiles({ prefix })),
  ]);

  const referenced = collectReferencedPaths({
    ads: adsSnap.docs.map(d => d.data()),
    siteContent: contentSnap.docs.map(d => d.data()),
    bucket: bucket.name,
  });
  const orphans = Object.fromEntries(orphanSnap.docs.map(d => [d.data().path, d.data().firstSeenAt?.toMillis?.() ?? now]));
  const files = fileLists.flatMap(([list]) => list.map(file => file.name)).filter(name => !name.endsWith('/'));

  const plan = planCleanup({ files, referenced, orphans, now, graceDays });
  if (dryRun) return { ...plan, scanned: files.length };

  for (const path of plan.toDelete) {
    await bucket.file(path).delete({ ignoreNotFound: true });
  }
  const batch = db.batch();
  for (const path of plan.toRecord) {
    batch.set(db.collection('storageOrphans').doc(orphanDocId(path)), { path, firstSeenAt: new Date(now) });
  }
  for (const path of plan.toForget) {
    batch.delete(db.collection('storageOrphans').doc(orphanDocId(path)));
  }
  await batch.commit();

  return { scanned: files.length, deleted: plan.toDelete.length, recorded: plan.toRecord.length, forgotten: plan.toForget.length };
}
