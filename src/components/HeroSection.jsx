import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function HeroSection() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 20,
        y: (e.clientY / window.innerHeight) * 20,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // 전화 연결 함수
  const makePhoneCall = () => {
    window.open('tel:010-3605-9528');
  };

  // ADT 캡스 유튜브 영상 링크 함수
  const openAdtCapsVideo = () => {
    window.open('https://www.youtube.com/watch?v=zQQNhQMxst0', '_blank');
  };

  return (
    <section className="w-full min-h-[85vh] sm:h-[90vh] lg:h-screen relative bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center pt-20">
      {/* 배경 이미지 */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: 'url(/image_file/출입보안2.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        {/* 오버레이 (텍스트 가독성을 위해) */}
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      {/* 콘텐츠 */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        <div className="flex flex-col items-center justify-center h-full py-8 sm:py-12">
          {/* 메인 제목 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-center mb-6 sm:mb-8"
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-white mb-4 sm:mb-6">
              <span className="block mb-2 sm:mb-3">ADT 캡스</span>
              <span className="block mb-2 sm:mb-3">통합 보안</span>
              <span className="block text-gray-200">시스템</span>
            </h1>
          </motion.div>

          {/* 버튼 그룹 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-4 sm:gap-6 mb-8 sm:mb-12 items-center justify-center"
          >
            <button 
              onClick={makePhoneCall}
              className="bg-white hover:bg-gray-100 text-black px-8 py-4 text-lg font-bold rounded transition-all duration-300 transform hover:scale-105 w-[240px] h-[56px] flex items-center justify-center gap-2"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M6.62,10.79C8.06,13.62 10.38,15.94 13.21,17.38L15.41,15.18C15.69,14.9 16.08,14.82 16.43,14.93C17.55,15.3 18.75,15.5 20,15.5A1,1 0 0,1 21,16.5V20A1,1 0 0,1 20,21A17,17 0 0,1 3,4A1,1 0 0,1 4,3H7.5A1,1 0 0,1 8.5,4C8.5,5.25 8.7,6.45 9.07,7.57C9.18,7.92 9.1,8.31 8.82,8.59L6.62,10.79Z"/>
              </svg>
              상담 연결
            </button>
            <button 
              onClick={openAdtCapsVideo}
              className="border-2 border-white text-white hover:bg-white hover:text-black px-6 py-4 text-base font-bold rounded transition-all duration-300 transform hover:scale-105 w-[240px] h-[56px] flex items-center justify-center gap-2 whitespace-nowrap"
            >
              <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z"/>
              </svg>
              <span className="truncate">ADT 캡스 영상보기</span>
            </button>
          </motion.div>

          {/* 스크롤 인디케이터 */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-4 sm:mt-8"
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="flex flex-col items-center gap-2"
            >
              <span className="text-white text-sm font-medium">Scroll to explore</span>
              <svg className="w-6 h-6 text-white" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
              </svg>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}