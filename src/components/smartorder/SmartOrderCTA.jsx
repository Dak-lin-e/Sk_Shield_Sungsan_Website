import React from 'react';
import { ConsultCTA } from '../ui/Consult';

export default function SmartOrderCTA() {
  return (
    <ConsultCTA
      title={
        <>
          지금 바로 <span className="text-gradient-light">전문가와 상담</span>하세요
        </>
      }
      description="매장 규모와 업종에 최적화된 스마트 오더 솔루션을 제안해드립니다."
      kakaoLabel="간편 상담 신청하기"
    />
  );
}
