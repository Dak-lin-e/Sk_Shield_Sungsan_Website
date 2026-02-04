 import React from 'react';
 import { motion } from 'framer-motion';
 import { ChevronDown } from 'lucide-react';
 
 
 export default function CyberHeroSection() {
   return (
     <>
 {/* 히어로 섹션 */}
      <section className="relative min-h-[600px] bg-[#0a1628] pt-20 overflow-hidden">
        {/* 배경 이미지 */}
        <div 
          className="absolute inset-0 opacity-100 bg-cover md:bg-contain bg-top bg-no-repeat"
          style={{
            backgroundImage: 'url(./image_file/사이버가드배경1.png)',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a1628]/50 to-[#0a1628]" />

        <div className="relative z-10 max-w-4xl mx-auto px-6 py-24 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-cyan-400 text-sm tracking-widest mb-6">ENTERPRISE SECURITY SOLUTION</p>
            <h1 className="text-xl sm:text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
              민감정보 유출을 완벽히 차단하는
            </h1>
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold text-cyan-400 mb-6">
              맞춤형 정보보안 솔루션
            </h2>
            <p className="text-gray-400 text-sm mb-10 max-w-xl mx-auto">
              ADT Caps 사이버가드와 함께라면, 보안 아키텍처를 통해<br />
              기업의 소중한 자산과 데이터를 24시간 보호합니다.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              {/* <button className="bg-cyan-500 hover:bg-cyan-400 text-white px-6 py-3 rounded font-medium flex items-center gap-2">
                솔루션 자세히 보기
              </button>
              <button className="border border-gray-500 text-white hover:bg-white/10 px-6 py-3 rounded font-medium">
                도입 문의
              </button> */}
            </div>
          </motion.div>

          {/* 스크롤 표시 */}
          <motion.div 
            className="absolute bottom-8 left-1/2 -translate-x-1/2"
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          >
            <ChevronDown className="w-6 h-6 text-gray-500" />
          </motion.div>
        </div>
      </section>
    </>
   );
 }
