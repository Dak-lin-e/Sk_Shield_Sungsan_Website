import { test } from 'node:test';
import assert from 'node:assert/strict';
import { collectReferencedPaths, planCleanup, storagePathFromUrl } from './cleanup.js';

const BUCKET = 'sk-shield-sungsan.firebasestorage.app';
const url = path => `https://firebasestorage.googleapis.com/v0/b/${BUCKET}/o/${encodeURIComponent(path)}?alt=media&token=abc`;
const DAY = 24 * 60 * 60 * 1000;
const NOW = Date.UTC(2026, 9, 1);

test('다운로드 URL에서 경로 추출', () => {
  assert.equal(storagePathFromUrl(url('content/home/1-a.jpg'), BUCKET), 'content/home/1-a.jpg');
  assert.equal(storagePathFromUrl('/image_file/a.png', BUCKET), null);
  assert.equal(storagePathFromUrl('https://firebasestorage.googleapis.com/v0/b/other-bucket/o/x.png', BUCKET), null);
  assert.equal(storagePathFromUrl(undefined, BUCKET), null);
});

test('광고/콘텐츠에서 쓰이는 경로 수집', () => {
  const refs = collectReferencedPaths({
    ads: [{ imagePath: 'ads/1.png', imageUrl: url('ads/1.png') }, { imageUrl: url('ads/2.png') }],
    siteContent: [{ heroImage: url('content/home/h.jpg'), heroTitle: '*제목*' }, { heroImage: 'https://example.com/x.png' }],
    bucket: BUCKET,
  });
  assert.deepEqual([...refs].sort(), ['ads/1.png', 'ads/2.png', 'content/home/h.jpg']);
});

test('처음 미사용이 된 파일은 기록만 하고 지우지 않는다', () => {
  const plan = planCleanup({ files: ['ads/old.png'], referenced: new Set(), orphans: {}, now: NOW });
  assert.deepEqual(plan, { toDelete: [], toRecord: ['ads/old.png'], toForget: [] });
});

test('기록 후 29일은 유지, 30일이 지나면 삭제', () => {
  const kept = planCleanup({ files: ['ads/old.png'], referenced: new Set(), orphans: { 'ads/old.png': NOW - 29 * DAY }, now: NOW });
  assert.deepEqual(kept.toDelete, []);
  const removed = planCleanup({ files: ['ads/old.png'], referenced: new Set(), orphans: { 'ads/old.png': NOW - 30 * DAY }, now: NOW });
  assert.deepEqual(removed.toDelete, ['ads/old.png']);
  assert.deepEqual(removed.toForget, ['ads/old.png']);
});

test('유예 중 다시 쓰이면 기록을 지우고 삭제하지 않는다', () => {
  const plan = planCleanup({ files: ['ads/back.png'], referenced: new Set(['ads/back.png']), orphans: { 'ads/back.png': NOW - 40 * DAY }, now: NOW });
  assert.deepEqual(plan, { toDelete: [], toRecord: [], toForget: ['ads/back.png'] });
});

test('쓰이는 파일과 대상 폴더 밖 파일은 건드리지 않는다', () => {
  const plan = planCleanup({
    files: ['ads/live.png', '헤더-로고.jpg', 'misc/x.png'],
    referenced: new Set(['ads/live.png']),
    orphans: {},
    now: NOW,
  });
  assert.deepEqual(plan, { toDelete: [], toRecord: [], toForget: [] });
});

test('이미 사라진 파일의 기록은 정리한다', () => {
  const plan = planCleanup({ files: [], referenced: new Set(), orphans: { 'content/home/gone.jpg': NOW - DAY }, now: NOW });
  assert.deepEqual(plan.toForget, ['content/home/gone.jpg']);
});
