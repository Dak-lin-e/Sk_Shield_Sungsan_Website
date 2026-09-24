import { deleteObject, getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { storage } from './firebaseAdmin';

export const MAX_IMAGE_MB = 5;
const ALLOWED = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];

/** 업로드 전 검사. 문제가 있으면 사용자에게 보여줄 문장을 반환한다. */
export function validateImage(file) {
  if (!file) return '이미지를 선택해 주세요.';
  if (!ALLOWED.includes(file.type)) return 'JPG, PNG, WEBP, GIF 이미지만 올릴 수 있어요.';
  if (file.size > MAX_IMAGE_MB * 1024 * 1024) return `이미지는 ${MAX_IMAGE_MB}MB 이하만 올릴 수 있어요.`;
  return null;
}

/** Storage에 이미지를 올리고 { url, path }를 돌려준다. */
export async function uploadImage(file, folder) {
  const error = validateImage(file);
  if (error) throw new Error(error);
  const ext = file.name.split('.').pop()?.toLowerCase().replace(/[^a-z0-9]/g, '') || 'img';
  const path = `${folder}/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
  const fileRef = ref(storage, path);
  await uploadBytes(fileRef, file, { contentType: file.type, cacheControl: 'public, max-age=31536000' });
  return { url: await getDownloadURL(fileRef), path };
}

/** Storage 파일 삭제. 이미 없으면 조용히 넘어간다. */
export async function removeImage(path) {
  if (!path) return;
  try {
    await deleteObject(ref(storage, path));
  } catch (error) {
    if (error?.code !== 'storage/object-not-found') throw error;
  }
}

/** Firebase 오류를 한국어 안내로 바꾼다. */
export function describeError(error) {
  const code = error?.code || '';
  if (code.includes('permission-denied') || code === 'storage/unauthorized') return '권한이 없어요. 관리자 계정으로 로그인했는지, 보안 규칙이 배포됐는지 확인해 주세요.';
  if (code === 'storage/bucket-not-found' || code === 'storage/unknown' || code === 'storage/project-not-found') return 'Storage가 아직 설정되지 않았어요. Firebase 콘솔에서 Storage를 먼저 시작해 주세요.';
  if (code === 'unavailable' || code.includes('network')) return '네트워크 연결을 확인해 주세요.';
  return error?.message || '알 수 없는 오류가 발생했어요.';
}
