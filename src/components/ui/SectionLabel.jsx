import React from 'react';
import { cn } from '../../lib/cn';

export default function SectionLabel({ children, tone = 'light', className }) {
  const dark = tone === 'dark';
  return (
    <div
      className={cn(
        'inline-flex items-center gap-3 rounded-full border px-4 py-1.5 sm:px-5 sm:py-2',
        dark ? 'border-white/20 bg-white/5' : 'border-accent/30 bg-accent/5',
        className
      )}
    >
      <span className={cn('h-2 w-2 shrink-0 rounded-full animate-pulse-dot', dark ? 'bg-accent-secondary' : 'bg-accent')} />
      <span className={cn('font-mono text-[11px] uppercase tracking-[0.15em] sm:text-xs', dark ? 'text-white/80' : 'text-accent')}>
        {children}
      </span>
    </div>
  );
}
