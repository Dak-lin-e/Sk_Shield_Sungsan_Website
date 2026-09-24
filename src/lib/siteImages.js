const BUCKET = 'sk-shield-sungsan.firebasestorage.app';

/**
 * Firebase Storage 버킷 최상위에 올린 사이트 기본 이미지의 공개 주소.
 * - 공개 읽기는 storage.rules의 `match /{fileName} { allow get }` 규칙이 허용한다.
 * - macOS에서 올린 파일은 한글 파일명이 NFD(자모 분리)로 저장되므로 같은 형태로 맞춰 요청한다.
 *   Windows 등에서 NFC로 올린 파일이 섞이면 해당 이름만 따로 처리해야 한다.
 */
export const siteImage = fileName =>
  `https://firebasestorage.googleapis.com/v0/b/${BUCKET}/o/${encodeURIComponent(fileName.normalize('NFD'))}?alt=media`;
