import React from 'react';
import { cn } from '../../lib/cn';

/**
 * 흰 카드. interactive면 호버 시 떠오르고 그림자가 깊어진다.
 * featured면 2px 그라데이션 테두리를 두른다. className은 내용 영역(패딩·레이아웃)에 적용된다.
 */
export default function Card({ interactive = false, featured = false, className, children }) {
  const inner = (
    <div
      className={cn(
        'group relative h-full overflow-hidden rounded-2xl bg-card',
        !featured && 'border border-border shadow-md',
        interactive && 'transition-all duration-300 hover:-translate-y-1 hover:shadow-xl',
        featured && 'rounded-[14px]'
      )}
    >
      {interactive && (
        <div className="pointer-events-none absolute inset-0 bg-linear-to-br from-accent/[0.04] to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      )}
      <div className={cn('relative h-full', className)}>{children}</div>
    </div>
  );

  if (!featured) return inner;
  return (
    <div
      className={cn(
        'h-full rounded-2xl bg-linear-to-br from-accent via-accent-secondary to-accent p-[2px] shadow-glow',
        interactive && 'transition-all duration-300 hover:-translate-y-1 hover:shadow-glow-lg'
      )}
    >
      {inner}
    </div>
  );
}

export function IconTile({ icon: Icon, size = 'md', tone = 'gradient', className }) {
  const box = size === 'lg' ? 'h-14 w-14 rounded-2xl' : 'h-12 w-12 rounded-xl';
  const glyph = size === 'lg' ? 'h-7 w-7' : 'h-6 w-6';
  return (
    <div
      className={cn(
        'flex shrink-0 items-center justify-center transition-transform duration-300 group-hover:scale-110',
        box,
        tone === 'gradient' ? 'bg-accent-gradient-diagonal text-white shadow-glow' : 'bg-accent/10 text-accent',
        className
      )}
    >
      <Icon className={glyph} aria-hidden="true" />
    </div>
  );
}
