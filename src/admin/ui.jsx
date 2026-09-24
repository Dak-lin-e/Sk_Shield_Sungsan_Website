import React from 'react';
import { AlertCircle, CheckCircle2, Loader2 } from 'lucide-react';
import { cn } from '../lib/cn';

export const inputClass =
  'h-11 w-full rounded-xl border border-border bg-card px-3.5 text-[15px] text-foreground transition-colors placeholder:text-muted-foreground/60 hover:border-accent/30 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20 disabled:bg-muted disabled:text-muted-foreground';

export const textareaClass = cn(inputClass, 'h-auto min-h-24 py-2.5 leading-relaxed');

export function Field({ label, help, htmlFor, children, action, className }) {
  return (
    <div className={className}>
      <div className="mb-1.5 flex items-end justify-between gap-3">
        <label htmlFor={htmlFor} className="text-sm font-semibold text-foreground">
          {label}
        </label>
        {action}
      </div>
      {children}
      {help && <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">{help}</p>}
    </div>
  );
}

export function PageHeader({ title, description, actions }) {
  return (
    <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <h1 className="text-2xl font-bold tracking-tight md:text-[1.75rem]">{title}</h1>
        {description && <p className="mt-1 text-sm text-muted-foreground md:text-[15px]">{description}</p>}
      </div>
      {actions && <div className="flex flex-wrap gap-2">{actions}</div>}
    </div>
  );
}

export function Panel({ className, children }) {
  return <div className={cn('rounded-2xl border border-border bg-card p-5 shadow-sm md:p-6', className)}>{children}</div>;
}

const noticeTone = {
  error: { box: 'border-red-200 bg-red-50 text-red-700', Icon: AlertCircle },
  success: { box: 'border-accent/20 bg-accent/5 text-accent', Icon: CheckCircle2 },
  info: { box: 'border-border bg-muted text-muted-foreground', Icon: AlertCircle },
};

export function Notice({ tone = 'info', children, className }) {
  if (!children) return null;
  const { box, Icon } = noticeTone[tone];
  return (
    <div role={tone === 'error' ? 'alert' : 'status'} className={cn('flex items-start gap-2.5 rounded-xl border px-4 py-3 text-sm leading-relaxed', box, className)}>
      <Icon className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
      <div>{children}</div>
    </div>
  );
}

export function Spinner({ label = '불러오는 중…', className }) {
  return (
    <div className={cn('flex items-center justify-center gap-2 py-16 text-sm text-muted-foreground', className)}>
      <Loader2 className="h-5 w-5 animate-spin" aria-hidden="true" />
      {label}
    </div>
  );
}

export function EmptyState({ icon: Icon, title, description }) {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-card px-6 py-16 text-center">
      {Icon && (
        <span className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10 text-accent">
          <Icon className="h-6 w-6" aria-hidden="true" />
        </span>
      )}
      <p className="font-semibold">{title}</p>
      {description && <p className="mt-1 max-w-sm text-sm text-muted-foreground">{description}</p>}
    </div>
  );
}

/** 작은 아이콘/텍스트 버튼 (관리 목록의 행 동작용) */
export function IconButton({ icon: Icon, label, tone = 'default', className, ...props }) {
  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      className={cn(
        'inline-flex h-10 min-w-10 items-center justify-center gap-1.5 rounded-lg border border-border bg-card px-2.5 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent disabled:pointer-events-none disabled:opacity-40',
        tone === 'danger' ? 'text-red-600 hover:border-red-200 hover:bg-red-50' : 'text-foreground hover:bg-muted',
        className
      )}
      {...props}
    >
      <Icon className="h-4 w-4" aria-hidden="true" />
    </button>
  );
}
