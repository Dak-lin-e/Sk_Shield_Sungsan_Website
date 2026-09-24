import React from 'react';
import { Zap } from 'lucide-react';
import Section, { SectionHeading } from '../ui/Section';
import Card from '../ui/Card';
import { Reveal, RevealGroup, RevealItem } from '../ui/Reveal';
import { siteImage } from '../../lib/siteImages';

const PRODUCTS = [
  { name: '유통매장용', subtitle: 'Retail & Convenience', image: siteImage('유통매장용.png') },
  { name: '베리어프리 요식업용', subtitle: 'Full Service Floor', image: siteImage('베리어프리.png') },
];

export default function KioskSystem() {
  return (
    <Section id="products" tone="muted">
      <SectionHeading
        align="left"
        label="제품 라인업"
        title={
          <>
            결제 시간 단축, 빠른 주문 처리로
            <br />
            <span className="text-gradient">회전율 상승</span>이 가능한 키오스크 시스템
          </>
        }
      />

      <RevealGroup className="grid gap-6 md:grid-cols-2 lg:gap-8">
        {PRODUCTS.map((product, index) => (
          <RevealItem key={product.name}>
            <Card interactive>
              <div className="relative aspect-square bg-[radial-gradient(circle_at_50%_40%,rgba(0,82,255,0.07),transparent_65%)]">
                <img
                  src={product.image}
                  alt={product.name}
                  loading="lazy"
                  className="h-full w-full object-contain p-8 transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                />
                <span className="absolute left-5 top-5 font-mono text-xs tracking-[0.15em] text-muted-foreground">
                  {String(index + 1).padStart(2, '0')}
                </span>
              </div>
              <div className="flex items-center justify-between border-t border-border px-6 py-5 md:px-8">
                <div>
                  <h3 className="text-lg font-semibold tracking-tight md:text-xl">{product.name}</h3>
                  <p className="mt-0.5 font-mono text-xs uppercase tracking-[0.12em] text-muted-foreground">{product.subtitle}</p>
                </div>
              </div>
            </Card>
          </RevealItem>
        ))}
      </RevealGroup>

      <Reveal className="mt-8 flex flex-col items-start gap-4 rounded-2xl border border-accent/20 bg-card p-6 shadow-sm sm:flex-row sm:items-center md:p-8">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent/10 text-accent">
          <Zap className="h-5 w-5" aria-hidden="true" />
        </span>
        <p className="leading-relaxed text-muted-foreground md:text-lg">
          다양한 종류의 매장에 최적화된 <strong className="font-semibold text-foreground">구성/크기의 키오스크</strong>와 고객의 사업 전반
          상담을 진행합니다.
        </p>
      </Reveal>
    </Section>
  );
}
