import React from 'react';
import { Check, Grid3X3, Shield } from 'lucide-react';
import Section, { SectionHeading } from '../ui/Section';
import Card, { IconTile } from '../ui/Card';
import { RevealGroup, RevealItem } from '../ui/Reveal';

const SERVICES = [
  {
    icon: Shield,
    title: '개인정보 및 기업비밀 보호',
    description: '내부 데이터의 불법적인 유출을 원천 봉쇄, 개인정보보호 법적 요구사항을 대응합니다.',
    features: ['웹 방화벽', 'PC 백신 및 DRM', '문서파일 암호화', '랜섬웨어 탐지/차단/백업'],
  },
  {
    icon: Grid3X3,
    title: '서버 보호 및 인프라 보안',
    description: '보안 인증 서비스로 안벽을 대비한 침탈이 차단 대비와 위협 차단 기술을 제공합니다.',
    features: ['통합 네트워크 UTM', '이미지/도면 암호화', '웹/서버 취약점 진단', '365일 24시간 관제'],
  },
];

export default function CyberService() {
  return (
    <Section tone="muted">
      <SectionHeading
        label="Services"
        title={
          <>
            사이버가드 <span className="text-gradient">보안 서비스</span>
          </>
        }
      />

      <RevealGroup className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:gap-8">
        {SERVICES.map(service => (
          <RevealItem key={service.title}>
            <Card interactive className="p-7 md:p-10">
              <IconTile icon={service.icon} size="lg" />
              <h3 className="mt-6 text-xl font-semibold tracking-tight md:text-2xl">{service.title}</h3>
              <p className="mt-2 leading-relaxed text-muted-foreground">{service.description}</p>
              <ul className="mt-6 grid grid-cols-1 gap-3 border-t border-border pt-6 sm:grid-cols-2">
                {service.features.map(feature => (
                  <li key={feature} className="flex items-center gap-2.5 text-[15px] text-foreground/80">
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent/10 text-accent">
                      <Check className="h-3 w-3" strokeWidth={3} aria-hidden="true" />
                    </span>
                    {feature}
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
