import React from 'react';
import { ArrowDown, ArrowLeftRight, ArrowRight, ArrowUp, Camera, Circle, Smartphone, User, Users } from 'lucide-react';
import { cn } from '../../lib/cn';
import Section, { SectionHeading } from '../ui/Section';
import Card from '../ui/Card';
import { Reveal } from '../ui/Reveal';

const STEPS = [
  { icon: User, label: '점주' },
  { icon: Smartphone, label: '점주 App' },
  { icon: Camera, label: '카메라' },
  { icon: Users, label: '매장고객', highlight: true },
  { icon: Circle, label: '호출버튼' },
];

// 각 단계 사이 연결 표시 (index i → i+1)
const LINKS = [{ icon: ArrowLeftRight }, { icon: ArrowRight }, { icon: ArrowRight, caption: '음성송출' }, { icon: ArrowRight }];

function Node({ step, compact = false }) {
  return (
    <div className="flex flex-col items-center gap-3">
      <div
        className={cn(
          'flex items-center justify-center rounded-full',
          compact ? 'h-16 w-16' : 'h-20 w-20',
          step.highlight ? 'bg-accent-gradient-diagonal text-white shadow-glow-lg' : 'border border-border bg-card text-foreground shadow-md'
        )}
      >
        <step.icon className={compact ? 'h-7 w-7' : 'h-9 w-9'} aria-hidden="true" />
      </div>
      <span
        className={cn(
          'rounded-full px-3 py-1 text-sm font-semibold',
          step.highlight ? 'bg-accent text-white' : 'bg-muted text-foreground'
        )}
      >
        {step.label}
      </span>
    </div>
  );
}

function Connector({ icon: Icon, rotate }) {
  return (
    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-accent/10 text-accent">
      <Icon className={cn('h-4 w-4', rotate)} aria-hidden="true" />
    </span>
  );
}

export default function ServiceFlow() {
  return (
    <Section tone="white">
      <SectionHeading label="Two-way Call" title={<>양방향통화 <span className="text-gradient">서비스 구성도</span></>} />

      <Reveal>
        <Card className="px-5 py-10 sm:px-10 md:py-14">
          {/* 데스크톱: 5열 그리드 위에 연결 배지를 경계에 배치 */}
          <div className="hidden md:block" aria-label="점주와 점주 App이 연결되고, 카메라가 매장고객에게 음성을 송출하며, 호출버튼의 음성은 카메라로 수신됩니다.">
            <div className="relative grid grid-cols-5">
              {STEPS.map(step => (
                <Node key={step.label} step={step} />
              ))}
              {LINKS.map((link, index) => (
                <div
                  key={index}
                  className="absolute top-10 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center"
                  style={{ left: `${(index + 1) * 20}%` }}
                >
                  {link.caption && (
                    <span className="absolute -top-7 whitespace-nowrap font-mono text-[11px] tracking-wider text-muted-foreground">{link.caption}</span>
                  )}
                  <Connector icon={link.icon} />
                </div>
              ))}
            </div>

            {/* 호출버튼(5열 중앙) → 카메라(3열 중앙): 음성수신 되돌림 경로 */}
            <div className="relative mt-4 h-16">
              <div className="absolute left-1/2 right-[10%] top-0 h-10 rounded-b-2xl border-2 border-t-0 border-dashed border-accent/40" />
              <ArrowUp className="absolute left-1/2 -top-2 h-5 w-5 -translate-x-1/2 text-accent" aria-hidden="true" />
              <span className="absolute left-[70%] top-10 -translate-x-1/2 -translate-y-1/2 rounded-full bg-card px-3 text-sm font-medium text-foreground">
                음성수신
              </span>
            </div>
          </div>

          {/* 모바일: 세로 흐름 */}
          <div className="flex flex-col items-center gap-3 md:hidden">
            {STEPS.map((step, index) => (
              <React.Fragment key={step.label}>
                <Node step={step} compact />
                {index < LINKS.length && (
                  <div className="flex flex-col items-center gap-1 py-1">
                    {LINKS[index].caption && <span className="font-mono text-[11px] tracking-wider text-muted-foreground">{LINKS[index].caption}</span>}
                    <Connector icon={index === 0 ? ArrowLeftRight : ArrowDown} rotate={index === 0 ? 'rotate-90' : undefined} />
                  </div>
                )}
              </React.Fragment>
            ))}
            <div className="mt-4 flex items-center gap-2 rounded-full border-2 border-dashed border-accent/40 px-4 py-2">
              <ArrowUp className="h-4 w-4 text-accent" aria-hidden="true" />
              <span className="text-sm font-medium">음성수신 (호출버튼 → 카메라)</span>
            </div>
          </div>
        </Card>
      </Reveal>
    </Section>
  );
}
