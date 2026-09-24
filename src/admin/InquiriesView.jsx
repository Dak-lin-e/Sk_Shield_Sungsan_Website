import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { collection, deleteDoc, doc, getDocs, limit, orderBy, query, updateDoc } from 'firebase/firestore/lite';
import { Inbox, Phone, RefreshCw, Trash2 } from 'lucide-react';
import { db } from '../lib/firebase';
import { cn } from '../lib/cn';
import Button from '../components/ui/Button';
import { EmptyState, IconButton, Notice, PageHeader, Spinner } from './ui';
import { describeError } from './upload';

const STATUS = {
  new: { label: '신규', className: 'bg-accent/10 text-accent' },
  contacted: { label: '연락 완료', className: 'bg-muted text-muted-foreground' },
};

const FILTERS = [
  { id: 'all', label: '전체' },
  { id: 'new', label: '신규' },
  { id: 'contacted', label: '연락 완료' },
];

const formatDate = timestamp =>
  timestamp?.toDate
    ? new Intl.DateTimeFormat('ko-KR', { month: 'short', day: 'numeric', weekday: 'short', hour: '2-digit', minute: '2-digit' }).format(timestamp.toDate())
    : '-';

const formatPhone = digits => digits.replace(/^(\d{2,3})(\d{3,4})(\d{4})$/, '$1-$2-$3');

export default function InquiriesView() {
  const [items, setItems] = useState(null);
  const [filter, setFilter] = useState('all');
  const [error, setError] = useState('');
  const [busyId, setBusyId] = useState(null);

  const load = useCallback(async () => {
    setError('');
    try {
      const snapshot = await getDocs(query(collection(db, 'inquiries'), orderBy('createdAt', 'desc'), limit(300)));
      setItems(snapshot.docs.map(d => ({ id: d.id, ...d.data() })));
    } catch (err) {
      setItems([]);
      setError(describeError(err));
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const counts = useMemo(() => {
    const list = items || [];
    return { all: list.length, new: list.filter(i => i.status === 'new').length, contacted: list.filter(i => i.status === 'contacted').length };
  }, [items]);

  const visible = (items || []).filter(item => filter === 'all' || item.status === filter);

  const toggleStatus = async item => {
    const next = item.status === 'new' ? 'contacted' : 'new';
    setBusyId(item.id);
    try {
      await updateDoc(doc(db, 'inquiries', item.id), { status: next });
      setItems(list => list.map(i => (i.id === item.id ? { ...i, status: next } : i)));
    } catch (err) {
      setError(describeError(err));
    } finally {
      setBusyId(null);
    }
  };

  const remove = async item => {
    if (!window.confirm(`${item.name}님의 상담 신청을 삭제할까요? 삭제하면 되돌릴 수 없어요.`)) return;
    setBusyId(item.id);
    try {
      await deleteDoc(doc(db, 'inquiries', item.id));
      setItems(list => list.filter(i => i.id !== item.id));
    } catch (err) {
      setError(describeError(err));
    } finally {
      setBusyId(null);
    }
  };

  return (
    <>
      <PageHeader
        title="상담 신청"
        description="홈페이지 전문상담 예약 폼으로 들어온 신청이에요. 최근 300건까지 보여요."
        actions={
          <Button variant="secondary" icon={RefreshCw} onClick={load} className="h-10 px-4 text-sm">
            새로고침
          </Button>
        }
      />

      <div className="mb-5 flex gap-2 overflow-x-auto" role="tablist" aria-label="상태 필터">
        {FILTERS.map(f => (
          <button
            key={f.id}
            type="button"
            role="tab"
            aria-selected={filter === f.id}
            onClick={() => setFilter(f.id)}
            className={cn(
              'inline-flex h-10 shrink-0 items-center gap-2 rounded-full border px-4 text-sm font-medium transition-colors',
              filter === f.id ? 'border-foreground bg-foreground text-white' : 'border-border bg-card text-muted-foreground hover:text-foreground'
            )}
          >
            {f.label}
            <span className={cn('rounded-full px-1.5 font-mono text-xs', filter === f.id ? 'bg-white/15' : 'bg-muted')}>{counts[f.id]}</span>
          </button>
        ))}
      </div>

      <Notice tone="error" className="mb-5">{error}</Notice>

      {items === null ? (
        <Spinner />
      ) : visible.length === 0 ? (
        <EmptyState icon={Inbox} title="표시할 상담 신청이 없어요" description="새 신청이 들어오면 여기에 나타나요." />
      ) : (
        <ul className="space-y-3">
          {visible.map(item => (
            <li key={item.id} className={cn('rounded-2xl border bg-card p-5 shadow-sm transition-opacity', item.status === 'new' ? 'border-accent/30' : 'border-border', busyId === item.id && 'opacity-60')}>
              <div className="flex flex-col gap-4 md:flex-row md:items-center">
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className={cn('rounded-full px-2.5 py-0.5 text-xs font-semibold', STATUS[item.status]?.className || STATUS.new.className)}>
                      {STATUS[item.status]?.label || item.status}
                    </span>
                    <span className="text-xs text-muted-foreground">{formatDate(item.createdAt)}</span>
                  </div>
                  <p className="mt-2 text-lg font-bold tracking-tight">
                    {item.name}
                    <span className="ml-2 text-sm font-medium text-muted-foreground">{item.region}</span>
                  </p>
                  <div className="mt-1 flex flex-wrap gap-x-3 gap-y-1 text-xs text-muted-foreground">
                    <span>마케팅 수집 동의 {item.marketing ? 'O' : 'X'}</span>
                    <span>마케팅 수신 동의 {item.sms ? 'O' : 'X'}</span>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  <a
                    href={`tel:${item.phone}`}
                    className="inline-flex h-10 items-center gap-2 rounded-lg bg-accent-gradient px-4 font-mono text-sm font-medium text-white shadow-sm transition hover:brightness-110"
                  >
                    <Phone className="h-4 w-4" aria-hidden="true" />
                    {formatPhone(item.phone || '')}
                  </a>
                  <button
                    type="button"
                    disabled={busyId === item.id}
                    onClick={() => toggleStatus(item)}
                    className="inline-flex h-10 items-center rounded-lg border border-border bg-card px-3 text-sm font-medium transition-colors hover:bg-muted disabled:opacity-40"
                  >
                    {item.status === 'new' ? '연락 완료로 표시' : '신규로 되돌리기'}
                  </button>
                  <IconButton icon={Trash2} label="삭제" tone="danger" disabled={busyId === item.id} onClick={() => remove(item)} />
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
