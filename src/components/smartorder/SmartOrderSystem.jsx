import React from 'react';
import { Check } from 'lucide-react';
import Section, { SectionHeading } from '../ui/Section';
import { Reveal, RevealGroup, RevealItem } from '../ui/Reveal';

const FEATURES = [
  '주문내역이 주방/홀 프린터에 전송되고 POS와 연동되어 주문누락 예방 및 매장 테이블 회전율 상승 가능',
  '메뉴 무상 촬영 및 메뉴판 제작 지원',
  '결제방식 선불/후불형 운영 선택 가능',
  '기존 POS 기기 교체 없이 Agent 연동 가능',
  '웨이팅 기능, 적립/웨이터 기능, 테이블 별 고객인원 관리 기능 제공',
];

export default function SmartOrderSystem() {
  return (
    <Section tone="muted">
      <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
        <div>
          <SectionHeading
            align="left"
            label="Order System"
            className="mb-10"
            title={
              <>
                태블릿PC로 테이블에서 직접 주문 받고,
                <br className="hidden md:block" /> <span className="text-gradient">주문 내역을 관리하는</span> 오더 시스템
              </>
            }
          />
          <RevealGroup as="ul" className="space-y-4">
            {FEATURES.map(feature => (
              <RevealItem as="li" key={feature} className="flex items-start gap-3">
                <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent-gradient-diagonal text-white">
                  <Check className="h-3.5 w-3.5" strokeWidth={3} aria-hidden="true" />
                </span>
                <span className="leading-relaxed text-foreground/80">{feature}</span>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>

        {/* 기기 목업 */}
        <Reveal delay={0.1}>
          <div className="relative overflow-hidden rounded-tl-[4rem] rounded-br-[4rem] rounded-tr-2xl rounded-bl-2xl bg-accent-gradient-diagonal px-6 py-14 shadow-glow-lg sm:px-10">
            <div className="dot-pattern absolute inset-0 opacity-15" aria-hidden="true" />
            <div className="relative flex items-end justify-center gap-4 sm:gap-6">
              <div className="w-44 animate-float rounded-2xl bg-foreground p-2 shadow-xl sm:w-52">
                <div className="h-52 overflow-hidden rounded-xl bg-white sm:h-60">
                  <img src="/image_file/스마트오더메뉴.png" alt="테이블오더 화면" className="h-full w-full object-contain" />
                </div>
              </div>

              <div className="w-28 animate-float-late rounded-[1.5rem] bg-foreground p-2 shadow-xl sm:w-36" aria-hidden="true">
                <div className="overflow-hidden rounded-[1rem] bg-white">
                  <div className="bg-muted px-3 py-2">
                    <p className="text-[9px] text-muted-foreground sm:text-[10px]">주문하실 음식 선택</p>
                  </div>
                  <div className="space-y-2 p-3">
                    <p className="text-[10px] font-bold sm:text-xs">시그니쳐 피자</p>
                    <div className="space-y-1 text-[9px] text-muted-foreground sm:text-[10px]">
                      <p>메뉴 항목</p>
                      <p>메뉴 항목</p>
                    </div>
                    <div className="flex items-center justify-between border-t border-border pt-2">
                      <span className="text-[9px] text-muted-foreground sm:text-[10px]">합계</span>
                      <span className="text-xs font-bold text-accent sm:text-sm">₩ 15,000</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
