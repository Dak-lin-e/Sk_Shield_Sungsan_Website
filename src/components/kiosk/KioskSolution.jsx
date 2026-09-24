import React from 'react';
import { Headphones, Monitor, Shield } from 'lucide-react';
import Section, { SectionHeading } from '../ui/Section';
import Card, { IconTile } from '../ui/Card';
import { RevealGroup, RevealItem } from '../ui/Reveal';

const SOLUTIONS = [
  { icon: Monitor, title: '편리한 실시간 운영관리', description: '매장별 매출과 재고관리를 한 번에 파악해 효율적인 매장 운영이 가능합니다.' },
  { icon: Shield, title: '똑똑하고 견고한 키오스크', description: '다양한 기능 제공은 물론 전면 강화유리/아크릴로 제작되어 견고합니다.' },
  { icon: Headphones, title: '빠르고 정확한 A/S', description: '365일 빠르고 정확하게 문제를 해결합니다.' },
];

export default function KioskSolution() {
  return (
    <Section id="services" tone="white">
      <SectionHeading
        label="Solution"
        title={
          <>
            결제 <span className="text-gradient">키오스크 솔루션</span>
          </>
        }
        description="매장 운영에 최적화된 ADT 캡스만의 기술력을 경험하세요."
      />

      <RevealGroup className="grid gap-5 md:grid-cols-3 lg:gap-6">
        {SOLUTIONS.map(solution => (
          <RevealItem key={solution.title}>
            <Card interactive className="p-7 md:p-8">
              <IconTile icon={solution.icon} />
              <h3 className="mt-6 text-lg font-semibold tracking-tight md:text-xl">{solution.title}</h3>
              <p className="mt-2 leading-relaxed text-muted-foreground">{solution.description}</p>
            </Card>
          </RevealItem>
        ))}
      </RevealGroup>
    </Section>
  );
}
