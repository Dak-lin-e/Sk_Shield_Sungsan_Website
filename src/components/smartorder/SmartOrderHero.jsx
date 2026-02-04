import React from 'react';
import { motion } from 'framer-motion';

export default function SmartOrderHero() {
  return (
    <section className="pt-20 bg-gradient-to-br from-blue-50 via-blue-100/50 to-gray-100 min-h-[500px] relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 py-16 flex flex-col lg:flex-row items-center">
        {/* 왼쪽 텍스트 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="lg:w-1/2 z-10"
        >
          <span className="inline-block bg-white/80 text-blue-600 text-xs px-3 py-1 rounded-full mb-4 border border-blue-100">
            스마트한 매장 운영의 시작
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight mb-4">
            캡스만의 특별함을<br />
            경험해보세요
          </h1>
          <p className="text-gray-600 text-sm mb-8 leading-relaxed">
            태블릿을 통해 테이블에서 직접 주문받고, 주문 내역을 실시간으로 관리
            하는 효율적인 스마트 오더 시스템입니다.
          </p>

          <div className="flex flex-wrap gap-3">
            {/* <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg text-sm font-medium">
              도입 문의하기
            </button>
            <button className="bg-white hover:bg-gray-50 text-gray-700 px-6 py-3 rounded-lg text-sm font-medium border border-gray-200">
              서비스 영상 보기
            </button> */}
          </div>
        </motion.div>

        {/* 오른쪽 이미지 */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="lg:w-1/2 mt-12 lg:mt-0 flex justify-center"
        >
          <div className="relative">
            <img 
              src="./image_file/스마트오더.png"
              alt="태블릿 주문 시스템"
              className="rounded-2xl shadow-2xl"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}