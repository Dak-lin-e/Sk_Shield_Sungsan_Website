import React from 'react';
import { ConsultCTA } from '../ui/Consult';
import { useContent } from '../../content/ContentProvider';
import RichText from '../../content/RichText';

export default function SmartOrderCTA() {
  const content = useContent('tableOrder');
  return (
    <ConsultCTA
      title={<RichText value={content.ctaTitle} tone="dark" />}
      description={<RichText value={content.ctaDescription} softBreaks />}
      kakaoLabel="간편 상담 신청하기"
    />
  );
}
