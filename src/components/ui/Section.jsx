import React from 'react';
import { cn } from '../../lib/cn';
import SectionLabel from './SectionLabel';
import { Reveal } from './Reveal';

const tones = {
  default: 'bg-background text-foreground',
  white: 'bg-card text-foreground',
  muted: 'bg-muted text-foreground',
  inverted: 'bg-foreground text-white',
};

/** 반전 섹션용 질감: 점 패턴 + 모서리 액센트 글로우 */
export function DarkTexture({ glow = true }) {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      <div className="dot-pattern absolute inset-0 opacity-[0.04]" />
      {glow && (
        <>
          <div className="absolute -right-40 -top-40 h-[28rem] w-[28rem] rounded-full bg-accent opacity-25 blur-[150px]" />
          <div className="absolute -bottom-48 -left-40 h-[24rem] w-[24rem] rounded-full bg-accent-secondary opacity-15 blur-[150px]" />
        </>
      )}
    </div>
  );
}

export default function Section({ tone = 'default', id, className, containerClassName, children }) {
  return (
    <section id={id} className={cn('relative overflow-hidden py-20 md:py-28', tones[tone], className)}>
      {tone === 'inverted' && <DarkTexture />}
      <div className={cn('relative mx-auto w-full max-w-6xl px-5 sm:px-6', containerClassName)}>{children}</div>
    </section>
  );
}

/** 섹션 라벨 + 제목 + 설명 묶음 */
export function SectionHeading({ label, title, description, align = 'center', tone = 'light', className }) {
  const dark = tone === 'dark';
  return (
    <Reveal className={cn('mb-12 md:mb-16', align === 'center' ? 'mx-auto max-w-2xl text-center' : 'max-w-2xl', className)}>
      {label && <SectionLabel tone={tone}>{label}</SectionLabel>}
      <h2 className={cn('font-display mt-5 text-[1.75rem] leading-[1.25] sm:text-4xl md:text-[2.75rem]', dark ? 'text-white' : 'text-foreground')}>
        {title}
      </h2>
      {description && (
        <p className={cn('mt-4 text-base leading-relaxed md:text-lg', dark ? 'text-white/70' : 'text-muted-foreground')}>{description}</p>
      )}
    </Reveal>
  );
}
