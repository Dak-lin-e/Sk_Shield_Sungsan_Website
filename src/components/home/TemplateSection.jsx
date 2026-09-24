import React from 'react';
import { Check } from 'lucide-react';
import Section, { SectionHeading } from '../ui/Section';
import Card from '../ui/Card';
import { RevealGroup, RevealItem } from '../ui/Reveal';

const PRODUCTS = [
  {
    name: '출동경비',
    description: '이상 신호 감지 시 최단거리 차량 출동',
    image: '/image_file/출동경비2.png',
    details: [
      '방문 맞춤컨설팅을 통한 보안설계 및 설치',
      'AI 이상신호 감지 및 알림',
      'AI CCTV의 24시간 모니터링 및 긴급 출동',
      '안심플러스 보상서비스로 더 안심',
      '전국 규모의 전문 기술지원 센터 A/S 처리',
    ],
  },
  {
    name: 'CCTV',
    description: '쉽고 빠른 영상 검색, 200만/500만 화소 고화질 AI CCTV',
    image: '/image_file/cctv.jpg',
    details: ['사람/차량 스마트 AI 검색', '영역 지정 침입탐지 및 검색', '침입 감지 알림 서비스', '피플카운팅 방문 분석 서비스'],
  },
  {
    name: '출입통제',
    description: '지문, 카드, 얼굴 인식을 이용하여 출입/근태 출입관리',
    image: '/image_file/출입통제2.png',
    details: ['내,외부인원의 출입권한 통제 관리(일반문,자동문, E/L)', '내부직원을 위한 다양한 인증 방식', '외부인을 위한 다양한 호출 방식'],
  },
  {
    name: '캡스홈 (가정용)',
    description: '현관문 앞 영상, 얼굴인식 AI, 집안상황 실시간 확인',
    image: '/image_file/캡스홈2.png',
    details: ['현관 앞 상황실시간 영상 확인', '현관문 출입 내역 알림/확인', '현관 앞 배회자 감지 및 알림', '이상신호 감지시 대원 출동'],
  },
];

export default function TemplateSection() {
  return (
    <Section id="template" tone="white">
      <SectionHeading
        label="Products"
        title={
          <>
            통합 <span className="text-gradient">상품 설명서</span>
          </>
        }
        description="AI 기술로 더 빨리, 더 정확하게! 자신과 정보를 지키는 전문 보안 서비스"
      />

      <RevealGroup className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:gap-8">
        {PRODUCTS.map((product, index) => (
          <RevealItem key={product.name}>
            <Card interactive>
              <div className="aspect-[16/9] overflow-hidden bg-muted">
                <img
                  src={product.image}
                  alt={product.name}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                />
              </div>
              <div className="p-6 md:p-8">
                <div className="flex items-baseline gap-3">
                  <span className="font-mono text-xs tracking-[0.15em] text-accent">{String(index + 1).padStart(2, '0')}</span>
                  <h3 className="text-xl font-bold tracking-tight md:text-2xl">{product.name}</h3>
                </div>
                <p className="mt-2 leading-relaxed text-muted-foreground">{product.description}</p>
                <ul className="mt-6 space-y-2.5 border-t border-border pt-6">
                  {product.details.map(detail => (
                    <li key={detail} className="flex items-start gap-3 text-[15px] leading-relaxed text-foreground/80">
                      <span className="mt-1 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-accent/10 text-accent">
                        <Check className="h-3 w-3" strokeWidth={3} aria-hidden="true" />
                      </span>
                      {detail}
                    </li>
                  ))}
                </ul>
              </div>
            </Card>
          </RevealItem>
        ))}
      </RevealGroup>
    </Section>
  );
}
