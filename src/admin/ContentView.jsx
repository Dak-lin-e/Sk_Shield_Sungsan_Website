import React, { useEffect, useMemo, useRef, useState } from 'react';
import { deleteField, doc, getDoc, setDoc } from 'firebase/firestore/lite';
import { ExternalLink, ImagePlus, RotateCcw } from 'lucide-react';
import { db } from '../lib/firebase';
import { cn } from '../lib/cn';
import { CONTENT_SCHEMA, isSafeValue } from '../content/schema';
import RichText from '../content/RichText';
import Button from '../components/ui/Button';
import { Field, inputClass, Notice, PageHeader, Panel, Spinner, textareaClass } from './ui';
import { describeError, MAX_IMAGE_MB, uploadImage, validateImage } from './upload';

const HELP = {
  rich: '*별표로 감싼 부분*은 파란색으로 강조돼요. 줄바꿈도 그대로 반영돼요.',
  lines: '한 줄에 한 항목씩 입력해 주세요.',
  textarea: '줄바꿈은 넓은 화면에서만 적용돼요.',
};

function ResetButton({ onClick, disabled }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className="inline-flex items-center gap-1 text-xs font-medium text-muted-foreground hover:text-foreground disabled:invisible"
    >
      <RotateCcw className="h-3 w-3" aria-hidden="true" />
      기본값으로
    </button>
  );
}

function ImageInput({ id, value, onChange, folder }) {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');

  const pick = async e => {
    const file = e.target.files?.[0];
    e.target.value = '';
    if (!file) return;
    const problem = validateImage(file);
    if (problem) return setError(problem);
    setBusy(true);
    setError('');
    try {
      const { url } = await uploadImage(file, folder);
      onChange(url);
    } catch (err) {
      setError(describeError(err));
    } finally {
      setBusy(false);
    }
  };

  return (
    <div>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="flex aspect-[4/3] w-full shrink-0 items-center justify-center overflow-hidden rounded-xl border border-border bg-muted sm:w-48">
          {value && <img src={value} alt="" className="h-full w-full object-cover" />}
        </div>
        <label
          htmlFor={id}
          className={cn(
            'inline-flex h-11 cursor-pointer items-center justify-center gap-2 rounded-xl border border-border bg-card px-4 text-sm font-medium transition-colors hover:bg-muted',
            busy && 'pointer-events-none opacity-60'
          )}
        >
          <ImagePlus className="h-4 w-4" aria-hidden="true" />
          {busy ? '올리는 중…' : '이미지 바꾸기'}
          <input id={id} type="file" accept="image/jpeg,image/png,image/webp,image/gif" onChange={pick} className="sr-only" />
        </label>
      </div>
      <p className="mt-1.5 text-xs text-muted-foreground">JPG·PNG·WEBP, {MAX_IMAGE_MB}MB 이하. 바꾼 뒤 '저장'을 눌러야 사이트에 반영돼요. 이전 이미지는 30일 뒤 자동으로 정리돼요.</p>
      <Notice tone="error" className="mt-2">{error}</Notice>
    </div>
  );
}

function FieldInput({ page, field, value, onChange }) {
  const id = `${page.id}-${field.key}`;
  const handle = e => onChange(e.target.value);
  if (field.type === 'image') return <ImageInput id={id} value={value} onChange={onChange} folder={`content/${page.id}`} />;
  if (field.type === 'text' || field.type === 'url' || field.type === 'tel') {
    return <input id={id} type={field.type === 'text' ? 'text' : field.type} value={value} onChange={handle} className={inputClass} />;
  }
  const rows = Math.min(8, Math.max(2, value.split('\n').length + 1));
  return (
    <>
      <textarea id={id} rows={rows} value={value} onChange={handle} className={textareaClass} />
      {field.type === 'rich' && value && (
        <div className="mt-2 rounded-xl bg-muted px-4 py-3">
          <p className="mb-1 font-mono text-[11px] uppercase tracking-[0.12em] text-muted-foreground">미리보기</p>
          <p className="font-display text-xl leading-snug">
            <RichText value={value} />
          </p>
        </div>
      )}
    </>
  );
}

export default function ContentView() {
  const [pageId, setPageId] = useState(CONTENT_SCHEMA[0].id);
  const [remote, setRemote] = useState(null);
  const [draft, setDraft] = useState({});
  const [status, setStatus] = useState({ tone: null, message: '' });
  const [saving, setSaving] = useState(false);
  const statusTimer = useRef(null);

  const page = CONTENT_SCHEMA.find(p => p.id === pageId);

  useEffect(() => {
    let alive = true;
    setRemote(null);
    setDraft({});
    getDoc(doc(db, 'siteContent', pageId))
      .then(snapshot => alive && setRemote(snapshot.exists() ? snapshot.data() : {}))
      .catch(err => {
        if (!alive) return;
        setRemote({});
        setStatus({ tone: 'error', message: describeError(err) });
      });
    return () => {
      alive = false;
    };
  }, [pageId]);

  useEffect(() => () => clearTimeout(statusTimer.current), []);

  const saved = useMemo(() => {
    const values = {};
    for (const field of page.fields) {
      const value = remote?.[field.key];
      values[field.key] = typeof value === 'string' && value.trim() !== '' ? value : field.default;
    }
    return values;
  }, [page, remote]);

  const current = key => draft[key] ?? saved[key];
  const dirtyKeys = Object.keys(draft).filter(key => draft[key] !== saved[key]);
  const dirty = dirtyKeys.length > 0;

  const groups = useMemo(() => {
    const map = new Map();
    for (const field of page.fields) {
      if (!map.has(field.group)) map.set(field.group, []);
      map.get(field.group).push(field);
    }
    return [...map.entries()];
  }, [page]);

  const switchPage = id => {
    if (id === pageId) return;
    if (dirty && !window.confirm('저장하지 않은 변경 사항이 있어요. 이동하면 사라져요. 계속할까요?')) return;
    setStatus({ tone: null, message: '' });
    setPageId(id);
  };

  const save = async () => {
    // key → 저장할 문자열, 또는 null(저장값 삭제 → 사이트가 기본값 사용)
    const updates = {};
    for (const key of dirtyKeys) {
      const field = page.fields.find(f => f.key === key);
      const value = draft[key].trim() === '' ? '' : draft[key];
      if (value && !isSafeValue(field.type, value.trim())) {
        return setStatus({ tone: 'error', message: `'${field.group} · ${field.label}' 형식을 확인해 주세요. ${field.type === 'tel' ? '숫자와 - 만 입력할 수 있어요.' : '주소는 https:// 로 시작해야 해요.'}` });
      }
      updates[key] = !value || value === field.default ? null : value;
    }
    const payload = Object.fromEntries(Object.entries(updates).map(([key, value]) => [key, value === null ? deleteField() : value]));
    setSaving(true);
    try {
      await setDoc(doc(db, 'siteContent', pageId), payload, { merge: true });
      const next = { ...(remote || {}) };
      for (const [key, value] of Object.entries(updates)) {
        if (value === null) delete next[key];
        else next[key] = value;
      }
      setRemote(next);
      setDraft({});
      setStatus({ tone: 'success', message: '저장했어요. 사이트를 새로고침하면 반영돼요.' });
      clearTimeout(statusTimer.current);
      statusTimer.current = setTimeout(() => setStatus({ tone: null, message: '' }), 4000);
    } catch (err) {
      setStatus({ tone: 'error', message: describeError(err) });
    } finally {
      setSaving(false);
    }
  };

  return (
    <>
      <PageHeader
        title="콘텐츠 편집"
        description="사이트의 주요 문구와 이미지를 바꿀 수 있어요. 비워 두면 원래 문구가 보여요."
        actions={
          <a
            href={page.path}
            target="_blank"
            rel="noreferrer"
            className="inline-flex h-10 items-center gap-1.5 rounded-xl border border-border bg-card px-4 text-sm font-medium hover:bg-muted"
          >
            <ExternalLink className="h-4 w-4" aria-hidden="true" />
            사이트에서 보기
          </a>
        }
      />

      <div className="mb-6 flex gap-2 overflow-x-auto pb-1" role="tablist" aria-label="편집할 페이지">
        {CONTENT_SCHEMA.map(p => (
          <button
            key={p.id}
            type="button"
            role="tab"
            aria-selected={p.id === pageId}
            onClick={() => switchPage(p.id)}
            className={cn(
              'h-10 shrink-0 rounded-full border px-4 text-sm font-medium transition-colors',
              p.id === pageId ? 'border-foreground bg-foreground text-white' : 'border-border bg-card text-muted-foreground hover:text-foreground'
            )}
          >
            {p.label}
          </button>
        ))}
      </div>

      {remote === null ? (
        <Spinner />
      ) : (
        <div className="space-y-5 pb-28">
          {groups.map(([group, fields]) => (
            <Panel key={group}>
              <h2 className="mb-5 font-mono text-xs uppercase tracking-[0.15em] text-accent">{group}</h2>
              <div className="space-y-6">
                {fields.map(field => {
                  const value = current(field.key);
                  return (
                    <Field
                      key={field.key}
                      label={field.label}
                      htmlFor={`${page.id}-${field.key}`}
                      help={field.help || HELP[field.type]}
                      action={<ResetButton disabled={value === field.default} onClick={() => setDraft(d => ({ ...d, [field.key]: field.default }))} />}
                    >
                      <FieldInput page={page} field={field} value={value} onChange={next => setDraft(d => ({ ...d, [field.key]: next }))} />
                    </Field>
                  );
                })}
              </div>
            </Panel>
          ))}
        </div>
      )}

      {/* 저장 바 */}
      <div className="fixed inset-x-0 bottom-0 z-30 border-t border-border bg-white/95 backdrop-blur">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-3 px-5 py-3 sm:flex-row sm:items-center sm:px-6">
          <div className="flex-1 text-sm">
            {status.message ? (
              <span className={status.tone === 'error' ? 'text-red-600' : 'text-accent'}>{status.message}</span>
            ) : dirty ? (
              <span className="font-medium">저장하지 않은 변경 {dirtyKeys.length}건</span>
            ) : (
              <span className="text-muted-foreground">{page.label} · 변경 사항 없음</span>
            )}
          </div>
          <div className="flex gap-2">
            <Button variant="secondary" disabled={!dirty || saving} onClick={() => setDraft({})} className="h-11 flex-1 sm:flex-none">
              되돌리기
            </Button>
            <Button disabled={!dirty || saving} onClick={save} className="h-11 flex-1 sm:flex-none">
              {saving ? '저장 중…' : '저장'}
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
