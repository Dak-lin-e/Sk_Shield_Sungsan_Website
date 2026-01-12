import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed w-full top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100" style={{ backgroundColor: '#f8f9fa' }}>
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between h-25">
        {/* 로고 */}
        {/* <div className="flex items-center gap-6">
          <img src="./image_file/캡스.png" 
          className="w-20 h-20 object-contain rounded-lg hover:scale-105 hover:rotate-3 transition-transform duration-200 cursor-pointer" />
           <div className="flex items-center">
            <span className="font-black text-2xl tracking-tight" style={{
              fontFamily: '"Helvetica Neue", Arial, sans-serif',
              color: '#1e3a8a',
              letterSpacing: '-0.5px'
            }}>
              ADT
            </span>
            <span className="font-black text-2xl tracking-tight ml-1" style={{
              fontFamily: '"Helvetica Neue", Arial, sans-serif',
              color: '#1e3a8a',
              letterSpacing: '-0.5px'
            }}>
              캡스
            </span>
          </div>
        </div> */}
        <div className="flex items-center h-full">
          <div className="h-22 overflow-hidden">
            <img 
              src="./image_file/헤더-로고.jpg" 
              alt="ADT 캡스 로고" 
              className="h-full w-auto object-contain cursor-pointer " 
              style={{ 
                backgroundColor: '#f8f9fa',
                mixBlendMode: 'multiply'
              }}
            />
          </div>
        </div>


        {/* 데스크톱 메뉴 */}
        <div className="hidden md:flex items-center gap-8">
          <a href="#about" className="text-gray-700 hover:text-gray-900 font-medium">ADT캡스 무인경비</a>
          <a href="#template" className="text-gray-700 hover:text-gray-900 font-medium">키오스크</a>
          <a href="#pricing" className="text-gray-700 hover:text-gray-900 font-medium">테이블오더</a>
          <a href="#support" className="text-gray-700 hover:text-gray-900 font-medium">클린케어</a>
          <a href="#support" className="text-gray-700 hover:text-gray-900 font-medium">사이버가드</a>
        </div>

        {/* 버튼 */}
        <div className="hidden md:flex items-center gap-4">
          <button 
            onClick={() => window.open('010-3605-9528')}
            className="w-12 h-12 p-0 border-0 bg-green-500 hover:bg-green-600 rounded-full overflow-hidden transition-all duration-200 hover:scale-105 shadow-md hover:shadow-lg flex items-center justify-center"
          >
            <svg 
              className="w-6 h-6 text-white" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" 
              />
            </svg>
          </button>
          <button 
            onClick={() => window.open('https://open.kakao.com/o/sqkx5Nai')}
            className="w-12 h-12 p-0 border-0 bg-transparent rounded-full overflow-hidden transition-transform duration-200 hover:scale-105 shadow-md hover:shadow-lg"
          >
            <img 
              src="./image_file/카톡.png" 
              alt="kakao chat" 
              className="w-full h-full object-cover"
            />
          </button>
        </div>

        {/* 모바일 메뉴 버튼 */}
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* 모바일 메뉴 */}
      {isOpen && (
        <div className="md:hidden border-t border-gray-100 bg-white">
          <div className="px-4 py-4 space-y-4">
            <a href="#about" className="block text-gray-700 hover:text-gray-900 font-medium">CCTV</a>
            <a href="#template" className="block text-gray-700 hover:text-gray-900 font-medium">무인경비 시스템</a>
            <a href="#pricing" className="block text-gray-700 hover:text-gray-900 font-medium">화재안심 솔루션</a>
            <a href="#support" className="block text-gray-700 hover:text-gray-900 font-medium">캡스 클린케어</a>
            <div className="flex items-center justify-center gap-4 pt-4">
              <button 
                onClick={() => window.open('tel:010-2315-7491')}
                className="w-12 h-12 p-0 border-0 bg-green-500 hover:bg-green-600 rounded-full overflow-hidden transition-all duration-200 hover:scale-105 shadow-md hover:shadow-lg flex items-center justify-center"
              >
                <svg 
                  className="w-6 h-6 text-white" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" 
                  />
                </svg>
              </button>
              <button 
                onClick={() => window.open('https://open.kakao.com/o/sqkx5Nai')}
                className="w-12 h-12 p-0 border-0 bg-transparent rounded-full overflow-hidden transition-transform duration-200 hover:scale-105 shadow-md hover:shadow-lg"
              >
                <img 
                  src="./image_file/카톡.png" 
                  alt="kakao chat" 
                  className="w-full h-full object-cover"
                />
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}