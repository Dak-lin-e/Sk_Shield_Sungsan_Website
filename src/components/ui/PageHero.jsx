import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../lib/cn';
import { fadeInUp, stagger } from '../../lib/motion';
import SectionLabel from './SectionLabel';
import { DarkTexture } from './Section';
import { ConsultActions } from './Consult';

/**
 * 서브 페이지 공통 히어로. 1.1fr / 0.9fr 비대칭 그리드.
 * visual에는 HeroVisual을 넘긴다. actions를 null로 주면 버튼을 숨긴다.
 */
export default function PageHero({ label, title, description, visual, tone = 'light', actions, children }) {
  const dark = tone === 'dark';
  return (
    <section className={cn('relative overflow-hidden pt-28 pb-20 md:pt-36 md:pb-28', dark ? 'bg-foreground text-white' : 'bg-background')}>
      {dark ? (
        <DarkTexture />
      ) : (
        <div className="pointer-events-none absolute inset-0" aria-hidden="true">
          <div className="absolute -right-32 -top-32 h-[32rem] w-[32rem] rounded-full bg-accent opacity-[0.08] blur-[150px]" />
          <div className="dot-pattern-accent absolute left-0 top-24 h-64 w-64 opacity-[0.07] [mask-image:radial-gradient(circle,black,transparent_70%)]" />
        </div>
      )}

      <div className="relative mx-auto grid w-full max-w-6xl items-center gap-14 px-5 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:gap-12">
        <motion.div initial="hidden" animate="visible" variants={stagger}>
          {label && (
            <motion.div variants={fadeInUp}>
              <SectionLabel tone={dark ? 'dark' : 'light'}>{label}</SectionLabel>
            </motion.div>
          )}
          <motion.h1
            variants={fadeInUp}
            className={cn('font-display mt-6 text-[2.5rem] leading-[1.15] sm:text-5xl lg:text-[3.5rem]', dark ? 'text-white' : 'text-foreground')}
          >
            {title}
          </motion.h1>
          {description && (
            <motion.p variants={fadeInUp} className={cn('mt-6 max-w-xl text-base leading-[1.75] md:text-lg', dark ? 'text-white/70' : 'text-muted-foreground')}>
              {description}
            </motion.p>
          )}
          {actions !== null && (
            <motion.div variants={fadeInUp} className="mt-10">
              {actions ?? <ConsultActions tone={dark ? 'dark' : 'light'} />}
            </motion.div>
          )}
        </motion.div>

        {visual && (
          <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}>
            {visual}
          </motion.div>
        )}
      </div>
      {children}
    </section>
  );
}

/**
 * 히어로 오른쪽 그래픽: 이미지 프레임 + 천천히 도는 점선 링 + 떠다니는 정보 칩.
 * chips: [{ icon, title, sub }] 최대 2개. 장식 요소는 lg 미만에서 숨긴다.
 */
export function HeroVisual({ src, alt, chips = [], fit = 'cover', tone = 'light' }) {
  const dark = tone === 'dark';
  return (
    <div className="relative mx-auto w-full max-w-md lg:max-w-none">
      <div className="absolute -inset-10 hidden rounded-full border-2 border-dashed border-accent/20 animate-spin-slow lg:block" aria-hidden="true" />
      <div className="absolute -right-3 -top-3 h-20 w-20 rounded-2xl bg-accent shadow-glow-lg sm:-right-5 sm:-top-5" aria-hidden="true" />
      <div className="absolute -bottom-6 -left-6 hidden grid-cols-3 gap-2.5 lg:grid" aria-hidden="true">
        {Array.from({ length: 9 }).map((_, i) => (
          <span key={i} className="h-1.5 w-1.5 rounded-full bg-accent/40" />
        ))}
      </div>

      <div
        className={cn(
          'relative overflow-hidden rounded-3xl border shadow-xl',
          dark ? 'border-white/10 bg-white/5' : 'border-border bg-card',
          fit === 'contain' && 'bg-[radial-gradient(circle_at_30%_20%,rgba(0,82,255,0.08),transparent_60%)] p-8 sm:p-10'
        )}
      >
        <img src={src} alt={alt} className={cn('w-full', fit === 'cover' ? 'aspect-[4/3] object-cover' : 'max-h-[22rem] object-contain')} />
      </div>

      {chips.map((chip, index) => (
        <div
          key={chip.title}
          className={cn(
            'absolute hidden items-center gap-3 rounded-xl border border-border bg-card/95 px-4 py-3 text-foreground shadow-lg backdrop-blur sm:flex',
            index === 0 ? '-left-4 top-10 animate-float lg:-left-10' : '-right-2 bottom-10 animate-float-late xl:-right-8'
          )}
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent-gradient-diagonal text-white">
            <chip.icon className="h-[18px] w-[18px]" aria-hidden="true" />
          </span>
          <span className="leading-tight">
            <span className="block text-sm font-semibold">{chip.title}</span>
            {chip.sub && <span className="block text-xs text-muted-foreground">{chip.sub}</span>}
          </span>
        </div>
      ))}
    </div>
  );
}
