import React from 'react';
import { Gift, Phone, Users } from 'lucide-react';
import { CONTACT } from '../../constants/contact';
import Section, { SectionHeading } from '../ui/Section';
import Card, { IconTile } from '../ui/Card';
import Button from '../ui/Button';
import { RevealGroup, RevealItem } from '../ui/Reveal';

const SERVICES = ['무인경비', 'CCTV', '무인매장솔루션', '테이블오더', '서빙로봇', '키오스크', '포스', '카드체크기'];

export default function ScrollSection() {
  return (
    <Section id="scroll-section">
      <SectionHeading
        label="How to contact"
        title="ADT캡스 신규 문의 방법 안내"
        description={
          <>
            문의 방법에 따라 <strong className="font-semibold text-accent">혜택</strong>이 달라집니다!
          </>
        }
      />

      <RevealGroup className="grid grid-cols-1 gap-6 lg:grid-cols-[1.2fr_0.8fr] lg:gap-8">
        {/* 1. 대리점 직접 문의 — 추천 */}
        <RevealItem>
          <Card featured interactive className="p-7 md:p-10">
            <div className="flex items-start justify-between gap-4">
              <div>
                <span className="font-mono text-xs uppercase tracking-[0.15em] text-accent">01 · 추천</span>
                <h3 className="mt-2 text-2xl font-bold tracking-tight md:text-[1.75rem]">대리점 직접 문의</h3>
                <p className="mt-1 font-medium text-accent">가장 좋은 조건으로 설치하세요!</p>
              </div>
              <IconTile icon={Phone} size="lg" />
            </div>

            <div className="mt-8 grid gap-6 sm:grid-cols-2">
              <div className="rounded-xl bg-muted p-5">
                <p className="text-sm text-muted-foreground">성산대리점</p>
                <p className="font-display mt-1 text-3xl text-foreground md:text-4xl">{CONTACT.phoneLabel}</p>
              </div>
              <div className="rounded-xl bg-accent/5 p-5">
                <p className="text-sm text-muted-foreground">대리점 접수건 계약 후</p>
                <p className="mt-1 text-xl font-bold md:text-2xl">
                  <span className="text-gradient">고객 맞춤 혜택</span> 제공
                </p>
              </div>
            </div>

            <p className="mt-8 text-lg leading-relaxed text-muted-foreground">
              비교할수록 확실한 차이,
              <br />
              <span className="font-semibold text-foreground">ADT캡스 전문대리점에서 최적의 솔루션을 만나세요.</span>
            </p>

            <Button href={CONTACT.phoneHref} size="lg" icon={Phone} arrow className="mt-8 w-full sm:w-auto">
              지금 전화 연결하기
            </Button>
          </Card>
        </RevealItem>

        {/* 2. 고객 소개 문의 */}
        <RevealItem>
          <Card interactive className="flex flex-col p-7 md:p-10">
            <div className="flex items-start justify-between gap-4">
              <div>
                <span className="font-mono text-xs uppercase tracking-[0.15em] text-muted-foreground">02</span>
                <h3 className="mt-2 text-2xl font-bold tracking-tight md:text-[1.75rem]">고객 소개 문의</h3>
              </div>
              <IconTile icon={Users} size="lg" tone="soft" />
            </div>

            <div className="mt-8 space-y-5">
              <div>
                <p className="text-lg font-semibold">고객 소개 → 대리점 문의</p>
                <p className="mt-1 text-sm text-muted-foreground">기존 고객이 새로운 고객을 소개하는 경우</p>
              </div>
              <div className="rounded-xl border border-dashed border-accent/30 bg-accent/5 p-5">
                <div className="flex items-center gap-3">
                  <Gift className="h-6 w-6 text-accent" aria-hidden="true" />
                  <p className="font-display text-2xl text-foreground md:text-3xl">5만원 상품권 지급</p>
                </div>
                <p className="mt-2 text-sm text-muted-foreground">※ 소개자님께 지급됩니다</p>
              </div>
            </div>

            <p className="mt-auto pt-8 text-[15px] leading-relaxed text-muted-foreground">
              소개해주신 분께 감사의 마음을 담아 상품권을 드립니다!
            </p>
          </Card>
        </RevealItem>
      </RevealGroup>

      {/* 제공 서비스 */}
      <RevealGroup className="mt-12 flex flex-col items-center gap-5 md:mt-16">
        <RevealItem as="p" className="font-mono text-xs uppercase tracking-[0.15em] text-muted-foreground">
          ADT 캡스 제공서비스
        </RevealItem>
        <RevealItem as="ul" className="flex max-w-3xl flex-wrap justify-center gap-2.5">
          {SERVICES.map(service => (
            <li key={service} className="rounded-full border border-border bg-card px-4 py-2 text-sm font-medium shadow-sm">
              {service}
            </li>
          ))}
        </RevealItem>
      </RevealGroup>
    </Section>
  );
}
