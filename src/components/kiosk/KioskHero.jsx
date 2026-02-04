import React from 'react';
import { motion } from 'framer-motion';

export default function HeroSection() {
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="pt-24 pb-16 md:pt-32 md:pb-24 bg-white overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 md:px-6">
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-xs tracking-widest text-gray-500 mb-4">
              PROFESSIONAL KIOSK
            </p>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight mb-2">
              캡스 키오스크의 
            </h1>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-6">
              <span className="text-[#6495ed]">특별함을 경험해보세요</span>
            </h1>
            <p className="text-gray-600 text-sm md:text-base leading-relaxed mb-8 max-w-md">
              직원 없이도 간편하게! 인건비와 응대 피로도를 줄이는
              <br />
              똑똑한 결제 키오스크로 매장 운영의 효율을 높이세요.
            </p>
            <div className="flex flex-wrap gap-3">
              {/* <button 
                onClick={() => scrollToSection('products')}
                className="bg-[#1a2b6d] text-white text-sm font-medium px-6 py-3 rounded-full hover:bg-[#243580] transition-colors"
              >
                제품 둘러보기
              </button>
              <button 
                onClick={() => scrollToSection('contact')}
                className="border border-gray-300 text-gray-700 text-sm font-medium px-6 py-3 rounded-full hover:bg-gray-50 transition-colors"
              >
                무료 도입 컨설팅
              </button> */}
            </div>
          </motion.div>

          {/* Right Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-[#c4a35a]/20 to-[#0000ff/10">
              {/* Decorative background */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#6495ed] rounded-bl-[100px] opacity-80"></div>
              
              {/* Kiosk Image */}
              <div className="relative p-8 md:p-12">
                <img 
                  src="./image_file/키오스크배경1.png"
                  alt="ADT CAPS 키오스크"
                  className="w-full h-auto rounded-2xl shadow-2xl"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}