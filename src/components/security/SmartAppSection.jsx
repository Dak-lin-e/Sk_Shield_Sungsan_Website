import React from 'react';
import { AlertTriangle, Clock, FileText, MapPin, Users, Zap } from 'lucide-react';
import Section, { SectionHeading } from '../ui/Section';
import { Reveal, RevealGroup, RevealItem } from '../ui/Reveal';
import { siteImage } from '../../lib/siteImages';

const APP_FEATURES = [
  { icon: Clock, text: '실시간(24시간) 조회' },
  { icon: Zap, text: '출입문 제어' },
  { icon: AlertTriangle, text: '실시간 녹화 및 저장' },
  { icon: MapPin, text: '매출/단가/재고 조회' },
  { icon: FileText, text: '키오스크 재실행' },
  { icon: Users, text: '방문 고객과 양방향 대화' },
];

export default function SmartAppSection() {
  return (
    <Section tone="inverted">
      <div className="grid items-center gap-14 lg:grid-cols-[1.2fr_0.8fr]">
        <div>
          <SectionHeading
            align="left"
            tone="dark"
            label="Mobile App"
            title={
              <>
                무인매장 전용 앱으로
                <br />
                <span className="text-gradient-light">어디서든 간편하게</span> 관리
              </>
            }
            description="다수의 매장을 운영하더라도 스마트폰 하나면 실시간 제어, 모니터링이 가능합니다."
            className="mb-10"
          />
          <RevealGroup className="grid gap-3 sm:grid-cols-2">
            {APP_FEATURES.map(feature => (
              <RevealItem
                key={feature.text}
                className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-4 py-3.5 transition-colors duration-200 hover:border-white/20 hover:bg-white/10"
              >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-accent-gradient-diagonal">
                  <feature.icon className="h-[18px] w-[18px] text-white" aria-hidden="true" />
                </span>
                <span className="text-[15px] text-white/90">{feature.text}</span>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>

        <Reveal delay={0.15} className="relative flex justify-center">
          <div className="absolute top-1/2 left-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-dashed border-white/10 animate-spin-slow" aria-hidden="true" />
          <div className="relative animate-float">
            <div className="rounded-[2.5rem] border border-white/15 bg-white/10 p-2.5 shadow-xl backdrop-blur">
              <div className="h-[26rem] w-[13rem] overflow-hidden rounded-[2rem] bg-white">
                <img src={siteImage('무인매장앱1.png')} alt="무인매장 앱 화면" className="h-full w-full object-cover" />
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
