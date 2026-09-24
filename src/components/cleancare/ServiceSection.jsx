import React from 'react';
import { Check } from 'lucide-react';
import Section, { SectionHeading } from '../ui/Section';
import Card from '../ui/Card';
import { RevealGroup, RevealItem } from '../ui/Reveal';

const SERVICES = [
  { title: '일반살균', image: '/image_file/일반살균.png', features: ['표면 살균 서비스', '접촉으로 인한 감염 예방', '월 1회 정기적 방문'] },
  { title: '전문살균', image: '/image_file/전문살균.png', features: ['초 미립자 분무 방식(ULV)', '법정 전염병 살균 서비스', '공기중 전파에 대한 예방'] },
  { title: '보행해충', image: '/image_file/보행해충.png', features: ['쥐, 바퀴벌레, 지네 퇴치', '모니터링 트랩 설치', '소독필증 발급', '월 1회 정기적 방문'] },
  { title: '비래해충', image: '/image_file/비행해충.png', features: ['포충기 렌탈 서비스', '파리, 모기, 나방 등 제거', '번트랩 PC 확산형 커버 사용', '오스람 램프 사용'] },
];

export default function ServiceSection() {
  return (
    <Section id="service" tone="muted">
      <SectionHeading
        label="Services"
        title={
          <>
            사업장 청결관리 <span className="text-gradient">전문 방역·방제</span>
          </>
        }
        description="검증된 방역 기술로 실내 환경의 안전을 책임집니다. 사업장 특성에 맞는 맞춤 솔루션을 경험해 보세요."
      />

      <RevealGroup className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {SERVICES.map((service, index) => (
          <RevealItem key={service.title}>
            <Card interactive className="p-6 md:p-7">
              <div className="flex items-center justify-between">
                <div className="h-20 w-20 overflow-hidden rounded-2xl bg-accent-gradient-diagonal shadow-glow transition-transform duration-300 group-hover:scale-105">
                  <img src={service.image} alt="" loading="lazy" className="h-full w-full object-cover" />
                </div>
                <span className="font-mono text-4xl text-border transition-colors duration-300 group-hover:text-accent/20">
                  {String(index + 1).padStart(2, '0')}
                </span>
              </div>
              <h3 className="mt-6 text-xl font-semibold tracking-tight">{service.title}</h3>
              <ul className="mt-4 space-y-2.5 border-t border-border pt-4">
                {service.features.map(feature => (
                  <li key={feature} className="flex items-start gap-2.5 text-[15px] leading-relaxed text-muted-foreground">
                    <Check className="mt-1 h-4 w-4 shrink-0 text-accent" strokeWidth={2.5} aria-hidden="true" />
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
