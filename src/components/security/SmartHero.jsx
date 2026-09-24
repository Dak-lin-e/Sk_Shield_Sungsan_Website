import React from 'react';
import { Building, Clock, FileText, Shield } from 'lucide-react';
import PageHero, { HeroVisual } from '../ui/PageHero';
import Section, { SectionHeading } from '../ui/Section';
import Card, { IconTile } from '../ui/Card';
import { RevealGroup, RevealItem } from '../ui/Reveal';

const FEATURES = [
  { icon: Shield, title: '보안솔루션 제공', desc: '캡스출동 서비스 / 24시간 경비 및 상황 서비스' },
  { icon: FileText, title: '도난 손해 보상', desc: '동산/현금/유가증권/귀중품 등 도난손해보상' },
  { icon: Building, title: '영업비 손해 보상', desc: '시설파손으로 인해 발생된 추가 손실에 대한 보상' },
];

export default function SmartHero() {
  return (
    <>
      <PageHero
        label="무인매장 특화 보안 및 원격관리"
        title={
          <>
            <span className="text-gradient">무인 경비</span>
            <br />
            솔루션
          </>
        }
        description={
          <>
            무인매장에 최적화된 첨단 보안 서비스로 안심하고 운영하세요.
            <br className="hidden sm:block" /> 24시간 빈틈없는 감시와 실시간 대응 시스템을 제공합니다.
          </>
        }
        visual={
          <HeroVisual
            src="/image_file/무인매장솔루션.png"
            alt="스마트 매장 솔루션"
            chips={[
              { icon: Clock, title: '24시간 경비', sub: '실시간 대응 시스템' },
              { icon: Shield, title: '캡스출동 서비스', sub: '상황 발생 시 출동' },
            ]}
          />
        }
      />

      <Section tone="white">
        <SectionHeading
          align="left"
          label="Unmanned Store"
          title={
            <>
              운영이 쉬워지는
              <br />
              <span className="text-gradient">맞춤형 무인화 솔루션</span>
            </>
          }
        />
        <RevealGroup className="grid gap-5 md:grid-cols-3 lg:gap-6">
          {FEATURES.map(item => (
            <RevealItem key={item.title}>
              <Card interactive className="p-7 md:p-8">
                <IconTile icon={item.icon} />
                <h3 className="mt-6 text-lg font-semibold tracking-tight md:text-xl">{item.title}</h3>
                <p className="mt-2 leading-relaxed text-muted-foreground">{item.desc}</p>
              </Card>
            </RevealItem>
          ))}
        </RevealGroup>
      </Section>
    </>
  );
}
