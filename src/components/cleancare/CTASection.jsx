import React from 'react';
import { ConsultCTA } from '../ui/Consult';

export default function CTASection() {
  return (
    <ConsultCTA
      title={
        <>
          지금 우리 사업장에 딱 맞는
          <br className="hidden sm:block" /> <span className="text-gradient-light">방역 플랜</span>을 확인하세요
        </>
      }
      description="전화 상담을 통해 무료 견적 및 컨설팅을 받으실 수 있습니다."
      kakaoLabel="간편 상담 신청하기"
    />
  );
}
