import React from 'react';
import { MessageCircle, Phone } from 'lucide-react';
import { CONTACT } from '../../constants/contact';
import { cn } from '../../lib/cn';
import Button from './Button';
import Section, { SectionHeading } from './Section';
import { Reveal } from './Reveal';

/** 카카오톡 상담 + 전화 상담 버튼 묶음. 모바일에서는 세로로 꽉 차게 쌓인다. */
export function ConsultActions({ tone = 'light', size = 'lg', kakaoLabel = '간편 상담 신청', className }) {
  const dark = tone === 'dark';
  return (
    <div className={cn('flex flex-col gap-3 sm:flex-row sm:gap-4', className)}>
      <Button href={CONTACT.kakaoUrl} size={size} icon={MessageCircle} arrow className="w-full sm:w-auto">
        {kakaoLabel}
      </Button>
      <Button href={CONTACT.phoneHref} size={size} variant={dark ? 'inverse' : 'secondary'} icon={Phone} className="w-full sm:w-auto">
        {CONTACT.phoneLabel}
      </Button>
    </div>
  );
}

/** 페이지 마지막 상담 유도 섹션 (반전 톤) */
export function ConsultCTA({ label = 'FREE CONSULTING', title, description, kakaoLabel }) {
  return (
    <Section tone="inverted" className="md:py-32">
      <SectionHeading label={label} title={title} description={description} tone="dark" className="mb-10 md:mb-12" />
      <Reveal className="flex justify-center">
        <ConsultActions tone="dark" kakaoLabel={kakaoLabel} className="w-full sm:w-auto" />
      </Reveal>
    </Section>
  );
}
