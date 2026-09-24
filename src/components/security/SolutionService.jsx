import React from 'react';
import { ArrowRight, Megaphone, Monitor, Siren } from 'lucide-react';
import Section, { SectionHeading } from '../ui/Section';
import Card, { IconTile } from '../ui/Card';
import { RevealGroup, RevealItem } from '../ui/Reveal';

const SOLUTIONS = [
  {
    icon: Megaphone,
    title: 'AI / 스피커',
    items: ['AI카메라 금지구역 침입 감지 및 양방향 대화', '매장 이용 안내 스피커를 통한 안내멘트 송출'],
  },
  {
    icon: Monitor,
    title: '인증기 / 키오스크',
    items: ['다양한 인증 방식으로 출입가능한 인증기', '카드/현금 겸용의 결제 키오스크'],
  },
  {
    icon: Siren,
    title: '출동서비스 / 환경감지기',
    items: ['비상벨/장기체류/쓰러짐 감지 시 출동서비스', '매장 온/습도/유해물질 측정하는 환경감지기'],
  },
];

export default function SolutionServices() {
  return (
    <Section tone="muted">
      <SectionHeading
        label="Special Service"
        title={
          <>
            무인안심존 솔루션
            <br className="sm:hidden" /> <span className="text-gradient">특화 서비스</span>
          </>
        }
        description="간편하게 매장 운영을 위한 ADT 캡스만의 특별한 기술력"
      />

      <RevealGroup className="grid grid-cols-1 gap-5 md:grid-cols-3 lg:gap-6">
        {SOLUTIONS.map((solution, index) => (
          <RevealItem key={solution.title}>
            <Card interactive className="p-7 md:p-8">
              <div className="flex items-center justify-between">
                <IconTile icon={solution.icon} />
                <span className="font-mono text-4xl text-border transition-colors duration-300 group-hover:text-accent/20">
                  {String(index + 1).padStart(2, '0')}
                </span>
              </div>
              <h3 className="mt-6 text-lg font-semibold tracking-tight md:text-xl">{solution.title}</h3>
              <ul className="mt-4 space-y-3">
                {solution.items.map(item => (
                  <li key={item} className="flex items-start gap-2.5 text-[15px] leading-relaxed text-muted-foreground">
                    <ArrowRight className="mt-1 h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
            </Card>
          </RevealItem>
        ))}
      </RevealGroup>
    </Section>
  );
}
