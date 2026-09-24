import React, { useCallback, useEffect, useState } from 'react';
import { addDoc, collection, deleteDoc, doc, getDocs, orderBy, query, serverTimestamp, updateDoc, writeBatch } from 'firebase/firestore/lite';
import { ArrowDown, ArrowUp, Eye, EyeOff, ImagePlus, Megaphone, Pencil, Plus, Trash2, X } from 'lucide-react';
import { db } from '../lib/firebase';
import { cn } from '../lib/cn';
import { adStatus } from '../lib/adPeriod';
import { isSafeValue } from '../content/schema';
import Button from '../components/ui/Button';
import { EmptyState, Field, IconButton, inputClass, Notice, PageHeader, Panel, Spinner } from './ui';
import { describeError, MAX_IMAGE_MB, removeImage, uploadImage, validateImage } from './upload';

const STATUS = {
  live: { label: '노출 중', className: 'bg-accent text-white' },
  scheduled: { label: '예정', className: 'bg-accent/10 text-accent' },
  ended: { label: '기간 종료', className: 'bg-muted text-muted-foreground' },
  hidden: { label: '숨김', className: 'bg-muted text-muted-foreground' },
};

const EMPTY = { title: '', linkUrl: '', startDate: '', endDate: '', active: true };

function AdForm({ initial, onCancel, onSaved, nextOrder }) {
  const editing = Boolean(initial?.id);
  const [values, setValues] = useState(() => ({ ...EMPTY, ...initial }));
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(initial?.imageUrl || '');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!file) return;
    const url = URL.createObjectURL(file);
    setPreview(url);
    return () => URL.revokeObjectURL(url);
  }, [file]);

  const set = key => e => setValues(v => ({ ...v, [key]: e.target.type === 'checkbox' ? e.target.checked : e.target.value }));

  const chooseFile = e => {
    const picked = e.target.files?.[0];
    e.target.value = '';
    if (!picked) return;
    const problem = validateImage(picked);
    if (problem) return setError(problem);
    setError('');
    setFile(picked);
  };

  const submit = async e => {
    e.preventDefault();
    setError('');
    if (!editing && !file) return setError('광고 이미지를 선택해 주세요.');
    if (values.linkUrl && !isSafeValue('url', values.linkUrl.trim())) return setError('링크는 https:// 로 시작하는 주소로 입력해 주세요.');
    if (values.startDate && values.endDate && values.startDate > values.endDate) return setError('종료일이 시작일보다 빠를 수 없어요.');

    setBusy(true);
    let uploaded = null;
    try {
      if (file) uploaded = await uploadImage(file, 'ads');
      const data = {
        title: values.title.trim(),
        linkUrl: values.linkUrl.trim(),
        startDate: values.startDate,
        endDate: values.endDate,
        active: values.active,
        ...(uploaded && { imageUrl: uploaded.url, imagePath: uploaded.path }),
      };
      if (editing) {
        await updateDoc(doc(db, 'ads', initial.id), data);
        if (uploaded) await removeImage(initial.imagePath).catch(() => {});
      } else {
        await addDoc(collection(db, 'ads'), { ...data, order: nextOrder, createdAt: serverTimestamp() });
      }
      onSaved();
    } catch (err) {
      if (uploaded) await removeImage(uploaded.path).catch(() => {});
      setError(describeError(err));
      setBusy(false);
    }
  };

  return (
    <Panel className="mb-6">
      <form onSubmit={submit}>
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-lg font-bold">{editing ? '광고 수정' : '새 광고 등록'}</h2>
          <IconButton icon={X} label="닫기" onClick={onCancel} />
        </div>

        <div className="grid gap-6 md:grid-cols-[16rem_1fr]">
          <div>
            <p className="mb-1.5 text-sm font-semibold">광고 이미지</p>
            <label className="group relative flex aspect-[4/5] cursor-pointer flex-col items-center justify-center overflow-hidden rounded-xl border-2 border-dashed border-border bg-muted/50 text-center transition-colors hover:border-accent/40">
              {preview ? (
                <>
                  <img src={preview} alt="" className="h-full w-full object-contain" />
                  <span className="absolute inset-x-3 bottom-3 rounded-lg bg-foreground/80 py-2 text-xs font-medium text-white opacity-0 transition-opacity group-hover:opacity-100">
                    이미지 바꾸기
                  </span>
                </>
              ) : (
                <>
                  <ImagePlus className="h-8 w-8 text-muted-foreground" aria-hidden="true" />
                  <span className="mt-2 text-sm font-medium">이미지 선택</span>
                  <span className="mt-1 text-xs text-muted-foreground">JPG·PNG·WEBP, {MAX_IMAGE_MB}MB 이하</span>
                </>
              )}
              <input type="file" accept="image/jpeg,image/png,image/webp,image/gif" onChange={chooseFile} className="sr-only" />
            </label>
            <p className="mt-2 text-xs text-muted-foreground">세로형(4:5) 이미지가 팝업에 가장 잘 맞아요.</p>
          </div>

          <div className="space-y-4">
            <Field label="광고 이름" htmlFor="ad-title" help="이미지가 보이지 않을 때 대신 읽히는 문구예요. 관리 목록에도 표시돼요.">
              <input id="ad-title" required maxLength={80} value={values.title} onChange={set('title')} className={inputClass} placeholder="예: 3월 무인경비 설치 이벤트" />
            </Field>
            <Field label="클릭 시 이동할 링크 (선택)" htmlFor="ad-link">
              <input id="ad-link" type="url" value={values.linkUrl} onChange={set('linkUrl')} className={inputClass} placeholder="https://" />
            </Field>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="노출 시작일 (선택)" htmlFor="ad-start">
                <input id="ad-start" type="date" value={values.startDate} onChange={set('startDate')} className={inputClass} />
              </Field>
              <Field label="노출 종료일 (선택)" htmlFor="ad-end">
                <input id="ad-end" type="date" value={values.endDate} onChange={set('endDate')} className={inputClass} />
              </Field>
            </div>
            <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-border px-4 py-3">
              <input type="checkbox" checked={values.active} onChange={set('active')} className="h-4 w-4 accent-accent" />
              <span className="text-sm">
                <b className="font-semibold">노출하기</b>
                <span className="ml-2 text-muted-foreground">끄면 기간과 관계없이 숨겨져요.</span>
              </span>
            </label>
          </div>
        </div>

        <Notice tone="error" className="mt-5">{error}</Notice>

        <div className="mt-6 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
          <Button variant="secondary" onClick={onCancel} disabled={busy}>
            취소
          </Button>
          <Button type="submit" disabled={busy}>
            {busy ? '저장 중…' : editing ? '수정 저장' : '광고 등록'}
          </Button>
        </div>
      </form>
    </Panel>
  );
}

export default function AdsView() {
  const [ads, setAds] = useState(null);
  const [editing, setEditing] = useState(null); // null | 'new' | ad
  const [error, setError] = useState('');
  const [busyId, setBusyId] = useState(null);

  const load = useCallback(async () => {
    try {
      const snapshot = await getDocs(query(collection(db, 'ads'), orderBy('order')));
      setAds(snapshot.docs.map(d => ({ id: d.id, ...d.data() })));
    } catch (err) {
      setAds([]);
      setError(describeError(err));
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const run = async (id, task) => {
    setBusyId(id);
    setError('');
    try {
      await task();
      await load();
    } catch (err) {
      setError(describeError(err));
    } finally {
      setBusyId(null);
    }
  };

  const toggle = ad => run(ad.id, () => updateDoc(doc(db, 'ads', ad.id), { active: !ad.active }));

  const move = (index, delta) => {
    const a = ads[index];
    const b = ads[index + delta];
    if (!a || !b) return;
    run(a.id, async () => {
      const batch = writeBatch(db);
      batch.update(doc(db, 'ads', a.id), { order: b.order });
      batch.update(doc(db, 'ads', b.id), { order: a.order });
      await batch.commit();
    });
  };

  const remove = ad => {
    if (!window.confirm(`'${ad.title}' 광고를 삭제할까요? 이미지도 함께 삭제돼요.`)) return;
    run(ad.id, async () => {
      await deleteDoc(doc(db, 'ads', ad.id));
      await removeImage(ad.imagePath).catch(() => {});
    });
  };

  const nextOrder = (ads || []).reduce((max, ad) => Math.max(max, ad.order ?? 0), 0) + 1;

  return (
    <>
      <PageHeader
        title="광고 팝업"
        description="홈 접속 시 팝업으로 보여줄 광고예요. 노출 중인 광고가 여러 개면 위에서부터 순서대로 넘겨 볼 수 있어요."
        actions={
          editing === null && (
            <Button icon={Plus} onClick={() => setEditing('new')} className="h-10 px-4 text-sm">
              새 광고
            </Button>
          )
        }
      />

      {editing !== null && (
        <AdForm
          key={editing === 'new' ? 'new' : editing.id}
          initial={editing === 'new' ? null : editing}
          nextOrder={nextOrder}
          onCancel={() => setEditing(null)}
          onSaved={() => {
            setEditing(null);
            load();
          }}
        />
      )}

      <Notice tone="error" className="mb-5">{error}</Notice>

      {ads === null ? (
        <Spinner />
      ) : ads.length === 0 ? (
        editing === null && <EmptyState icon={Megaphone} title="등록된 광고가 없어요" description="'새 광고'를 눌러 첫 광고 이미지를 올려 보세요." />
      ) : (
        <ul className="space-y-3">
          {ads.map((ad, index) => {
            const status = STATUS[adStatus(ad)];
            return (
              <li key={ad.id} className={cn('flex flex-col gap-4 rounded-2xl border border-border bg-card p-4 shadow-sm sm:flex-row sm:items-center', busyId === ad.id && 'opacity-60')}>
                <div className="flex min-w-0 flex-1 items-center gap-4">
                  <img src={ad.imageUrl} alt="" className="h-20 w-16 shrink-0 rounded-lg border border-border bg-muted object-cover" />
                  <div className="min-w-0">
                    <span className={cn('inline-block rounded-full px-2.5 py-0.5 text-xs font-semibold', status.className)}>{status.label}</span>
                    <p className="mt-1.5 truncate font-semibold">{ad.title}</p>
                    <p className="mt-0.5 text-xs text-muted-foreground">
                      {ad.startDate || ad.endDate ? `${ad.startDate || '제한 없음'} ~ ${ad.endDate || '제한 없음'}` : '기간 제한 없음'}
                      {ad.linkUrl && <span className="ml-2 truncate">· {ad.linkUrl}</span>}
                    </p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  <IconButton icon={ArrowUp} label="위로" disabled={index === 0 || busyId !== null} onClick={() => move(index, -1)} />
                  <IconButton icon={ArrowDown} label="아래로" disabled={index === ads.length - 1 || busyId !== null} onClick={() => move(index, 1)} />
                  <IconButton icon={ad.active ? EyeOff : Eye} label={ad.active ? '숨기기' : '노출하기'} disabled={busyId !== null} onClick={() => toggle(ad)} />
                  <IconButton icon={Pencil} label="수정" disabled={busyId !== null} onClick={() => setEditing(ad)} />
                  <IconButton icon={Trash2} label="삭제" tone="danger" disabled={busyId !== null} onClick={() => remove(ad)} />
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </>
  );
}
