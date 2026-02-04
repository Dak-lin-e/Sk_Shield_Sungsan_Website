import React from 'react';
import { motion } from 'framer-motion';
import { ClipboardCheck } from 'lucide-react';

export default function SmartOrderSystem() {
  const features = [
    '주문내역이 주방/홀 프린터에 전송되고 POS와 연동되어 주문누락 예방 및 매장 테이블 회전율 상승 가능',
    '메뉴 무상 촬영 및 메뉴판 제작 지원',
    '결제방식 선불/후불형 운영 선택 가능',
    '기존 POS 기기 교체 없이 Agent 연동 가능',
    '웨이팅 기능, 적립/웨이터 기능, 테이블 별 고객인원 관리 기능 제공',
  ];

  return (
    <section className="py-16 bg-gray-100">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row rounded-3xl overflow-hidden shadow-xl">
          {/* 왼쪽 흰색 카드 */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="lg:w-1/2 bg-white py-12 px-8 lg:px-12"
          >
            <h2 className="text-base sm:text-2xl font-bold text-gray-900 leading-relaxed mb-8 flex items-start gap-2">
              <ClipboardCheck className="w-6 h-6 sm:w-8 sm:h-8 text-blue-600 flex-shrink-0 mt-1" />
              <span>
                태블릿PC로 테이블에서<br />
                직접 주문 받고,<br />
                <span className="text-base sm:text-2xl text-blue-600">주문 내역을 관리하는<br/> 오더 시스템</span>
              </span>
            </h2>

            <ul className="space-y-3">
              {features.map((feature, index) => (
                <li key={index} className="flex items-start gap-3">
                  <span className="text-blue-600 mt-1">•</span>
                  <span className="text-gray-600 text-sm leading-relaxed">{feature}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* 오른쪽 파란색 카드 */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="lg:w-1/2 bg-[#87CEEB] py-12 px-4 sm:px-8 lg:px-12 flex items-center justify-center"
          >
            <div className="relative flex items-end gap-3 sm:gap-6 scale-75 sm:scale-100">
              {/* 태블릿 (왼쪽) */}
              <div className="bg-[#000] rounded-2xl p-2 shadow-xl w-50 sm:w-48">
                <div className="bg-white rounded-xl overflow-hidden h-56 sm:h-56">
                  <img 
                    src="./image_file/스마트오더메뉴.png" 
                    alt="테이블오더 화면"
                    className="w-full h-full object-contain"
                  />
                </div>
              </div>

              {/* 스마트폰 (오른쪽) */}
              <div className="relative">
                <div className="bg-gray-800 rounded-[1.5rem] p-2 shadow-xl w-25 sm:w-36">
                  <div className="bg-white rounded-[1rem] overflow-hidden">
                    <div className="bg-gray-100 px-2 sm:px-3 py-2">
                      <p className="text-[8px] sm:text-[10px] text-gray-500">주문하실 음식 선택</p>
                    </div>
                    <div className="p-2 sm:p-3 space-y-2">
                      <p className="text-[10px] sm:text-xs font-bold text-gray-900">시그니쳐 피자</p>
                      <div className="space-y-1">
                        <div className="flex justify-between text-[8px] sm:text-[10px]">
                          <span className="text-gray-600">메뉴 항목</span>
                        </div>
                        <div className="flex justify-between text-[8px] sm:text-[10px]">
                          <span className="text-gray-600">메뉴 항목</span>
                        </div>
                      </div>
                      <div className="pt-2 border-t border-gray-100">
                        <div className="flex justify-between items-center">
                          <span className="text-[8px] sm:text-[10px] text-gray-500">합계</span>
                          <span className="text-xs sm:text-sm font-bold text-blue-600">₩ 15,000</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}