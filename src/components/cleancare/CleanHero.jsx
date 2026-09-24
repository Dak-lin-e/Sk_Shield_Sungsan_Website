import React from 'react';
import { ShieldCheck, Sparkles } from 'lucide-react';
import PageHero, { HeroVisual } from '../ui/PageHero';
import { DarkTexture } from '../ui/Section';
import { RevealGroup, RevealItem } from '../ui/Reveal';

const STATS = [
  { value: '99.9%', label: '살균 소독력' },
  { value: '24/7', label: '실시간 모니터링' },
  { value: '1:1', label: '맞춤형 컨설팅' },
  { value: 'No.3', label: '만족 및 위생관리 전문성' },
];

export default function CleanHero() {
  return (
    <>
      <PageHero
        label="Professional Hygiene Solution"
        title={
          <>
            사업장 청결관리
            <br />
            전문 <span className="text-gradient">방역·방제</span> 솔루션
          </>
        }
        description={
          <>
            ADT 캡스 클린케어는 차별화된 전문 기술력과
            <br className="hidden sm:block" /> 체계적인 살균·방역으로 완벽한 청정 공간을 약속합니다.
          </>
        }
        visual={
          <HeroVisual
            src="/image_file/클린케어 로고 이미지.png"
            alt="ADT 캡스 클린케어"
            chips={[
              { icon: Sparkles, title: '살균 소독력 99.9%', sub: '전문 살균 서비스' },
              { icon: ShieldCheck, title: '1:1 맞춤형 컨설팅', sub: '사업장 특성별 솔루션' },
            ]}
          />
        }
      />

      {/* 통계 — 반전 띠 */}
      <section className="relative overflow-hidden bg-foreground py-14 text-white md:py-16">
        <DarkTexture />
        <RevealGroup className="relative mx-auto grid w-full max-w-6xl grid-cols-2 gap-y-10 px-5 sm:px-6 md:grid-cols-4">
          {STATS.map((stat, index) => (
            <RevealItem key={stat.label} className={`text-center ${index > 0 ? 'md:border-l md:border-white/10' : ''}`}>
              <p className="font-display text-4xl md:text-5xl">
                <span className="text-gradient-light">{stat.value}</span>
              </p>
              <p className="mt-2 text-sm text-white/60">{stat.label}</p>
            </RevealItem>
          ))}
        </RevealGroup>
      </section>
    </>
  );
}
