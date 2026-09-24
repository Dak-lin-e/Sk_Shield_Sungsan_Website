import React from 'react';
import { Clock, Grid3X3, ShieldCheck } from 'lucide-react';
import Section, { SectionHeading } from '../ui/Section';
import Card, { IconTile } from '../ui/Card';
import { RevealGroup, RevealItem } from '../ui/Reveal';

const CORE_STRENGTHS = [
  { icon: ShieldCheck, title: '검증된 전문성', description: '국내최초 정보보호 인가기업과 검증된 보안 전문가 조직을 갖춘 조직을 보유하고 있습니다.' },
  { icon: Clock, title: '24/7 실시간 관제', description: '365일 쉬지 않는 모니터링을 통해 보안의 위협 요소를 신속하게 탐지 차단합니다.' },
  { icon: Grid3X3, title: '맞춤형 모듈', description: '기업의 규모와 산업 환경에 최적화된 보안솔루션 구축을 제공합니다.' },
];

export default function CoreStrength() {
  return (
    <Section tone="white">
      <SectionHeading
        label="Core Strengths"
        title={
          <>
            왜 <span className="text-gradient">ADT Caps 사이버가드</span>인가?
          </>
        }
      />

      <RevealGroup className="grid grid-cols-1 gap-5 md:grid-cols-3 lg:gap-6">
        {CORE_STRENGTHS.map((item, index) => (
          <RevealItem key={item.title} className={index === 1 ? 'md:translate-y-6' : undefined}>
            <Card interactive featured={index === 1} className="p-7 md:p-8">
              <IconTile icon={item.icon} size="lg" />
              <h3 className="mt-6 text-lg font-semibold tracking-tight md:text-xl">{item.title}</h3>
              <p className="mt-2 leading-relaxed text-muted-foreground">{item.description}</p>
            </Card>
          </RevealItem>
        ))}
      </RevealGroup>
    </Section>
  );
}
