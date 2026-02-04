import React from 'react';
import { motion } from 'framer-motion';

export default function CleanHero() {
  const stats = [
    { value: '99.9%', label: '살균 소독력' },
    { value: '24/7', label: '실시간 모니터링' },
    { value: '1:1', label: '맞춤형 컨설팅' },
    { value: 'No.3', label: '만족 및 위생관리 전문성' },
  ];

  return (
    <>
      <section className="relative w-full bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 pt-20 overflow-hidden">
        {/* 배경 이미지 오버레이 */}
        <div className="absolute inset-0 opacity-90">
          <div className="absolute right-0 top-20 w-1/2 h-full">
            <img 
              src="./image_file/클린케어 로고 이미지.png" 
              alt="Sanitizer"
              className="w-full h-full object-contain opacity-30"
            />
          </div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {/* 태그 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-block bg-white/20 text-white text-xs px-3 py-1 rounded-full mb-6">
              Professional Hygiene Solution
            </span>
          </motion.div>

          {/* 메인 타이틀 */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="max-w-xl"
          >
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight mb-6 whitespace-nowrap">
              사업장 청결관리<br />
              전문 <span className="text-cyan-300">방역·방제</span> 솔루션
            </h1>
            <p className="text-blue-100 text-xs sm:text-lg mb-8 leading-relaxed ">
              ADT 캡스 클린케어는 차별화된 전문 기술력과<br />
              체계적인 살균·방역으로 완벽한 청정 공간을 약속합니다.
            </p>
          </motion.div>

          {/* CTA 버튼들 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-wrap gap-4 mb-16"
          >
            {/* <button className="bg-transparent border-2 border-white text-white px-6 py-3 w-40 rounded font-medium hover:bg-white hover:text-blue-900 transition-all">
              무료 카톡 상담
            </button>
            <button className=" bg-cyan-500 hover:bg-cyan-400 text-white px-6 py-3 w-40 rounded font-medium transition-all">
               클린케어 영상
            </button> */}
          </motion.div>

        </div>
      </section>

      {/* 통계 - 흰색 배경 (섹션 바깥으로 분리) */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="w-full bg-white py-8"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <p className="text-3xl sm:text-4xl font-bold text-blue-700 mb-1">{stat.value}</p>
                <p className="text-gray-500 text-sm">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </>
  );
}