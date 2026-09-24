import React from 'react';
import { Clock, Gift, Monitor, RefreshCw, Settings, Smartphone } from 'lucide-react';
import Section, { SectionHeading } from '../ui/Section';
import Card, { IconTile } from '../ui/Card';
import { RevealGroup, RevealItem } from '../ui/Reveal';

const FEATURES = [
  { icon: Smartphone, title: '편리한 셋업', description: '기존의 사용하던 POS 기기를 교체하지 않아도 활용이 가능합니다.' },
  { icon: RefreshCw, title: '빈틈없는 사후관리', description: '24시간 이내 신속하게 A/S 처리해드립니다.', highlight: true },
  { icon: Clock, title: '웨이팅 기능', description: '실시간 대기현황을 확인 후 입장 시 알람을 통해 고객 불편을 최소화합니다.' },
  {
    icon: Monitor,
    title: '태블릿 도난 알림 기능',
    description: '테블릿 네트워크가 끊어지면 관리자 테블릿에 도난방지알람이 발생해 빠른 대응이 가능합니다.',
    highlight: true,
  },
  { icon: Gift, title: '신규 가입 베네핏', description: '메뉴 사진 촬영과 기기 최초 설치를 무상으로 지원합니다.' },
  { icon: Settings, title: '다양한 관리자 기능', description: '매출 통계, 메뉴, 키오스크, 노출 순서 외 다른 종류의 관리를 다양하게 사용하세요.' },
];

export default function SmartOrderFeatures() {
  return (
    <Section tone="white">
      <SectionHeading
        label="Features"
        title={
          <>
            스마트 오더 <span className="text-gradient">주요 기능</span>
          </>
        }
        description="매장 운영의 효율성을 향상하는 스마트한 기능들을 확인해보세요."
      />

      <RevealGroup className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 lg:gap-6">
        {FEATURES.map(feature => (
          <RevealItem key={feature.title}>
            <Card interactive featured={feature.highlight} className="p-7 md:p-8">
              <div className="flex items-start justify-between">
                <IconTile icon={feature.icon} tone={feature.highlight ? 'gradient' : 'soft'} />
                {feature.highlight && (
                  <span className="rounded-full bg-accent/10 px-2.5 py-1 font-mono text-[11px] uppercase tracking-[0.12em] text-accent">Key</span>
                )}
              </div>
              <h3 className="mt-6 text-lg font-semibold tracking-tight md:text-xl">{feature.title}</h3>
              <p className="mt-2 leading-relaxed text-muted-foreground">{feature.description}</p>
            </Card>
          </RevealItem>
        ))}
      </RevealGroup>
    </Section>
  );
}
