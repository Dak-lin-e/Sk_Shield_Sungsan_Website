import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function ScrollSection() {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollElement = document.getElementById('scroll-section');
      if (!scrollElement) return;

      const elementTop = scrollElement.offsetTop;
      const elementHeight = scrollElement.offsetHeight;
      const windowHeight = window.innerHeight;
      const scrollTop = window.scrollY;

      const elementInView = scrollTop + windowHeight - elementTop;
      const progress = Math.min(elementInView / (elementHeight + windowHeight), 1);
      setScrollProgress(Math.max(progress, 0));
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const makePhoneCall = () => {
    window.open('tel:010-3605-9528');
  };

  return (
    <section id="scroll-section" className="w-full py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 섹션 제목 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            ADT캡스 신규 문의 방법 안내
          </h2>
          <p className="text-lg text-gray-600">
            📢 문의 방법에 따라 <span className="text-blue-500 font-bold">혜택</span>이 달라집니다!
          </p>
        </motion.div>

        {/* 메인 콘텐츠 영역 - 1번 대리점 직접 문의 (강력 추천) */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-12 group cursor-pointer"
          onClick={makePhoneCall}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          {/* 통합된 카드 구조 */}
          <div className="bg-gray-100 rounded-2xl border-2 border-blue-200 shadow-lg p-6 sm:p-8 hover:shadow-2xl active:shadow-md transition-all duration-300">
            <div className="flex items-center mb-4">
              <div className="bg-blue-600 text-white rounded-full w-12 h-12 flex items-center justify-center text-2xl font-bold mr-4 group-hover:bg-blue-700 active:bg-blue-800 transition-colors duration-300">
                1
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900 group-hover:text-blue-900 active:text-blue-800 transition-colors duration-300">대리점 직접 문의</h3>
                <p className="text-blue-600 group-hover:text-blue-700 active:text-blue-800 transition-colors duration-300">가장 좋은 조건으로 설치하세요!</p>
              </div>
            </div>
            
            {/* 구분선 - 중간만 그어진 선 */}
            <div className="flex items-center mb-6">
              <div className="flex-1"></div>
              <div className="w-300 h-px bg-blue-300 group-hover:bg-blue-400 active:bg-blue-500 transition-colors duration-300"></div>
              <div className="flex-1"></div>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div className="space-y-4">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mr-4 group-hover:bg-green-200 active:bg-green-300 transition-colors duration-300">
                    <span className="text-2xl">📞</span>
                  </div>
                  <div>
                    <p className="text-gray-600">성산대리점</p>
                    <p className="text-3xl font-bold text-blue-600 group-hover:text-blue-700 active:text-blue-800 transition-colors duration-300">010-3605-9528</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mr-4 group-hover:bg-yellow-200 active:bg-yellow-300 transition-colors duration-300">
                    <span className="text-2xl">🎁</span>
                  </div>
                  <div>
                    <p className="text-lg text-gray-900">월정료 <span className="text-blue-600 font-bold text-2xl group-hover:text-blue-700 active:text-blue-800 transition-colors duration-300">1개월 대납</span> 특별 지원</p>
                    
                  </div>
                </div>
              </div>
              
              <div className="text-right lg:text-right">
                <div className="inline-block">
                    <p className="text-gray-500 pb-5 text-right group-hover:text-blue-700 active:text-blue-800 transition-colors duration-300">비교할수록 확실한 차이,</p>
                  <h2 className="text-blue-600 text-[clamp(1.4rem,2vw,2.5rem)] font-bold text-3xl mb-2 group-hover:text-blue-700 active:text-blue-800 transition-colors duration-300">ADT캡스 전문대리점에서</h2>
                  <h2 className="text-blue-600 text-[clamp(1.4rem,2vw,2.5rem)] font-bold text-3xl group-hover:text-blue-700 active:text-blue-800 transition-colors duration-300">최적의 솔루션을 만나세요.</h2>
                </div>
              </div>
            </div>
            
            <div className="mt-6 p-4 bg-blue-100 rounded-lg group-hover:bg-blue-200 active:bg-blue-300 transition-colors duration-300">
              <p className="text-blue-800 font-semibold text-center">
                <span className="text-blue-800 font-bold">ADT 캡스 제공서비스</span> : 무인경비 | CCTV | 무인매장솔루션 | 테이블오더 | 셀링로봇 | 키오스크 | 포스 | 카드체크기
              </p>
            </div>

            {/* 클릭 안내 */}
            <div className="mt-4 text-center">
              <p className="text-sm text-gray-500 group-hover:text-gray-700 active:text-gray-800 transition-colors duration-300">
                💡 카드를 터치하면 바로 전화연결됩니다
              </p>
            </div>
          </div>
        </motion.div>

        {/* 2번 고객 소개 문의 카드 - 전체 너비로 확장 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="max-w-4xl mx-auto"
        >
          <div className="p-8 bg-gray-100 rounded-2xl shadow-lg hover:shadow-xl active:shadow-md transition-all duration-300 border-2 border-gray-200 hover:bg-gray-50 active:bg-gray-200">
            <div className="flex items-center mb-4">
              <div className="bg-gray-500 text-white rounded-full w-12 h-12 flex items-center justify-center text-2xl font-bold mr-4 hover:bg-gray-600 active:bg-gray-700 transition-colors duration-300">
                2
              </div>
              <h3 className="text-2xl font-bold text-gray-900 hover:text-gray-700 active:text-gray-800 transition-colors duration-300">고객 소개 문의</h3>
            </div>
            
            {/* 구분선 - 중간만 그어진 선 */}
            <div className="flex items-center mb-6">
              <div className="flex-1"></div>
              <div className="w-200 h-px bg-gray-400 hover:bg-gray-500 active:bg-gray-600 transition-colors duration-300"></div>
              <div className="flex-1"></div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div className="text-center md:text-left">
                <div className="flex items-center justify-center md:justify-start mb-4">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mr-4 hover:bg-blue-200 active:bg-blue-300 transition-colors duration-300">
                    <span className="text-3xl">📱</span>
                  </div>
                  <div>
                    <p className="text-xl font-semibold text-gray-700">고객 소개 → 대리점 문의</p>
                    <p className="text-sm text-gray-600 mt-1">기존 고객이 새로운 고객을 소개하는 경우</p>
                  </div>
                </div>
              </div>
              
              <div className="text-center md:text-right">
                <div className="flex items-center justify-center md:justify-end">
                  <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mr-4 hover:bg-red-200 active:bg-red-300 transition-colors duration-300">
                    <span className="text-3xl">🎁</span>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-red-600">5만원 상품권 지급</p>
                    <p className="text-sm text-gray-600 mt-1">※ 소개자님께 지급됩니다</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* 추가 설명 */}
            <div className="mt-6 p-4 bg-yellow-100 rounded-lg">
              <p className="text-yellow-800 font-semibold text-center">
                💝 소개해주신 분께 감사의 마음을 담아 상품권을 드립니다!
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}