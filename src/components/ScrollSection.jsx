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
  window.open('010-3605-9528');
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

        
       {/* 메인 콘텐츠 영역 - 3번 대리점 직접 문의 (강력 추천) */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-12 group cursor-pointer"
          onClick={makePhoneCall}
        >
          {/* 그라데이션 테두리 */}
          <div className="p-1 rounded-2xl bg-gradient-to-r from-blue-300 to-blue-600 group-hover:from-blue-300 group-hover:to-blue-700 shadow-lg group-hover:shadow-2xl transition-all duration-300">
            <div className="bg-gray-100 rounded-xl p-6 group-hover:scale-105 transition-transform duration-300">
              <div className="flex items-center mb-6">
                <div className="bg-blue-600 text-white rounded-full w-12 h-12 flex items-center justify-center text-2xl font-bold mr-4 group-hover:bg-blue-700 transition-colors duration-300">
                  1
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 group-hover:text-blue-900 transition-colors duration-300">대리점 직접 문의 (강력 추천)</h3>
                  <p className="text-blue-600 group-hover:text-blue-700 transition-colors duration-300">가장 좋은 조건으로 설치하세요!</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                <div className="space-y-4">
                  <div className="flex items-center">
                    <span className="text-2xl mr-3">📞</span>
                    <div>
                      <p className="text-gray-600">성산대리점</p>
                      <p className="text-3xl font-bold text-blue-600 group-hover:text-blue-700 transition-colors duration-300">010-3605-9528</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <span className="text-2xl mr-3">🎁</span>
                    <div>
                      <p className="text-lg text-gray-900">월정료 <span className="text-blue-600 font-bold text-2xl group-hover:text-blue-700 transition-colors duration-300">1개월 대납</span> 지원</p>
                      <p className="text-gray-600 text-sm">※ 소개자님께 지급됩니다</p>
                    </div>
                  </div>
                </div>
                
                <div className="text-center lg:text-right mt-12">
                  <div className="inline-block">
                    {/* <div className="text-6xl mb-4 group-hover:scale-110 transition-transform duration-300">🏠🚐</div> */}
                    <p className="text-blue-600 font-bold text-lg mb-2 group-hover:text-blue-700 transition-colors duration-300">같은 ADT캡스,</p>
                    <p className="text-blue-600 font-bold text-lg group-hover:text-blue-700 transition-colors duration-300">더 좋은 조건으로 설치하세요!</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 p-4 bg-blue-100 rounded-lg group-hover:bg-blue-200 transition-colors duration-300">
                <p className="text-blue-800 font-semibold text-center">
                  <span className="text-red-400 font-bold">ADT 캡스 제공서비스</span> : 무인경비 CCTV 무인매장솔루션 테이블오더 셀링로봇 키오스크 포스 카드체크기
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* 특징 카드들 - 1번과 2번 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* 1번 고객센터 직접 문의 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="p-6 bg-gray-100 rounded-2xl shadow-lg hover:shadow-xl transition-shadow border-2 border-gray-200"
          >
            <div className="flex items-center mb-4">
              <div className="bg-gray-500 text-white rounded-full w-10 h-10 flex items-center justify-center text-xl font-bold mr-3">
                2
              </div>
              <h3 className="text-xl font-bold text-gray-900">고객센터 직접 문의</h3>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center text-gray-900">
                <span className="text-2xl mr-3">📞</span>
                <p className="text-2xl font-bold">1588-64**</p>
              </div>
              <div className="flex items-center text-gray-900">
                <span className="text-2xl mr-3">🎁</span>
                <p className="text-lg">혜택 없음</p>
              </div>
            </div>
          </motion.div>

          {/* 2번 고객 소개 문의 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="p-6 bg-gray-100 rounded-2xl shadow-lg hover:shadow-xl transition-shadow border-2 border-gray-200"
          >
            <div className="flex items-center mb-4">
              <div className="bg-gray-500 text-white rounded-full w-10 h-10 flex items-center justify-center text-xl font-bold mr-3">
                3
              </div>
              <h3 className="text-xl font-bold text-gray-900">고객 소개 문의</h3>
            </div>
            
            <div className="space-y-3">
              <div className="text-gray-700">
                <div className="flex items-center mb-2">
                  <span className="text-2xl mr-3">📱</span>
                  <p className="font-semibold">고객 소개 → 대리점 문의</p>
                </div>
                {/* <div className="flex items-center mb-2">
                  <span className="text-2xl mr-3">📞</span>
                  <p className="text-xl font-bold">010-3605-9528</p>
                </div> */}
                <div className="flex items-center">
                  <span className="text-2xl mr-3">🎁</span>
                  <div>
                    <p className="font-bold text-red-600">5만원 상품권 지급</p>
                    <p className="text-sm text-gray-600">※ 소개자님께 지급됩니다</p>
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