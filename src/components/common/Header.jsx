import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';
export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed w-full top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100" style={{ backgroundColor: '#f8f9fa' }}>
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 md:py-4 flex items-center justify-between min-h-[64px] md:min-h-[80px]">
        {/* 로고 */}
        <Link to="/" className="flex items-center h-full flex-shrink-0 gap-0.5 md:gap-0.5">
          <div className="h-12 md:h-16 overflow-hidden flex items-center">
            <img 
              src="./image_file/헤더-로고.jpg" 
              alt="ADT 캡스 로고" 
              className="h-full w-auto object-contain cursor-pointer" 
              style={{ 
                backgroundColor: '#f8f9fa',
                mixBlendMode: 'multiply'
              }}
            />
          </div>
          <span 
            className="text-sky-800 font-bold text-base md:text-xl lg:text-xl whitespace-nowrap leading-none flex items-center h-12 md:h-16"
            style={{ 
              fontFamily: 'system-ui, -apple-system, sans-serif',
              letterSpacing: '-0.02em',
              paddingBottom: '1px'
            }}
          >
            성산대리점
          </span>
        </Link>

        {/* 데스크톱 메뉴 - 화면 크기에 따라 조정 */}
        <div className="hidden lg:flex items-center gap-6 xl:gap-8">
          <Link to="/security" className="text-black font-bold hover:text-gray-900 text-sm xl:text-base whitespace-nowrap">ADT캡스 무인경비</Link>
          <Link to="/kiosk" className="text-black font-bold hover:text-gray-900 text-sm xl:text-base whitespace-nowrap">키오스크</Link>
          <Link to="/table-order" className="text-black font-bold hover:text-gray-900 text-sm xl:text-base whitespace-nowrap">테이블오더</Link>
          <Link to="/clean-care" className="text-black font-bold hover:text-gray-900 text-sm xl:text-base whitespace-nowrap">클린케어</Link>
          <Link to="/cyber-guard" className="text-black font-bold hover:text-gray-900 text-sm xl:text-base whitespace-nowrap">사이버가드</Link>
        </div>

        {/* 태블릿용 축약 메뉴 */}
        <div className="hidden md:flex lg:hidden items-center gap-3">
          <Link to="/security" className="text-black font-bold hover:text-gray-900 text-sm whitespace-nowrap">ADT캡스 무인경비</Link>
          <Link to="/kiosk" className="text-black font-bold hover:text-gray-900 text-sm whitespace-nowrap">키오스크</Link>
          <Link to="/table-order" className="text-black font-bold hover:text-gray-900 text-sm whitespace-nowrap">테이블오더</Link>
          <Link to="/clean-care" className="text-black font-bold hover:text-gray-900 text-sm whitespace-nowrap">클린케어</Link>
          <Link to="/cyber-guard" className="text-black font-bold hover:text-gray-900 text-sm whitespace-nowrap">사이버가드</Link>
        </div>

        {/* 버튼 */}
        <div className="hidden md:flex items-center gap-2 lg:gap-4 flex-shrink-0">
          <button 
            onClick={() => window.open('tel:010-3605-9528')}
            className="w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 p-0 border-0 bg-green-500 hover:bg-green-600 rounded-full overflow-hidden transition-all duration-200 hover:scale-105 shadow-md hover:shadow-lg flex items-center justify-center"
          >
            <svg 
              className="w-4 h-4 md:w-5 md:h-5 lg:w-6 lg:h-6 text-white" 
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
            onClick={() => window.open('https://open.kakao.com/o/sIBSxkbi')}
            className="w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 p-0 border-0 bg-transparent rounded-full overflow-hidden transition-transform duration-200 hover:scale-105 shadow-md hover:shadow-lg"
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
          className="md:hidden flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-lg bg-sky-800 text-white shadow-md hover:bg-blue-700 active:scale-95 transition-all duration-200"
        >
          {isOpen ? <X size={22} strokeWidth={2.5} /> : <Menu size={22} strokeWidth={2.5} />}
        </button>
      </nav>

      {/* 모바일 메뉴 */}
      <div 
        className={`md:hidden border-t border-gray-100 bg-white overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
        style={{ backgroundColor: '#f8f9fa' }}
      >
        <div className="px-4 py-3">
          <Link to="/security" onClick={() => setIsOpen(false)} className="block text-black font-bold hover:text-gray-900 hover:bg-gray-100 text-sm py-3 px-2 rounded-lg transition-colors duration-200">ADT캡스 무인경비</Link>
          <div className="border-b border-gray-200 mx-2"></div>
          <Link to="/kiosk" onClick={() => setIsOpen(false)} className="block text-black font-bold hover:text-gray-900 hover:bg-gray-100 text-sm py-3 px-2 rounded-lg transition-colors duration-200">키오스크</Link>
          <div className="border-b border-gray-200 mx-2"></div>
          <Link to="/table-order" onClick={() => setIsOpen(false)} className="block text-black font-bold hover:text-gray-900 hover:bg-gray-100 text-sm py-3 px-2 rounded-lg transition-colors duration-200">테이블오더</Link>
          <div className="border-b border-gray-200 mx-2"></div>
          <Link to="/clean-care" onClick={() => setIsOpen(false)} className="block text-black font-bold hover:text-gray-900 hover:bg-gray-100 text-sm py-3 px-2 rounded-lg transition-colors duration-200">클린케어</Link>
          <div className="border-b border-gray-200 mx-2"></div>
          <Link to="/cyber-guard" onClick={() => setIsOpen(false)} className="block text-black font-bold hover:text-gray-900 hover:bg-gray-100 text-sm py-3 px-2 rounded-lg transition-colors duration-200">사이버가드</Link>
          <div className="flex items-center justify-center gap-3 pt-4 mt-2 border-t border-gray-200">
              <button 
                onClick={() => window.open('tel:010-3605-9528')}
                className="w-10 h-10 p-0 border-0 bg-green-500 hover:bg-green-600 rounded-full overflow-hidden transition-all duration-200 hover:scale-105 shadow-md hover:shadow-lg flex items-center justify-center"
              >
                <svg 
                  className="w-5 h-5 text-white" 
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
                onClick={() => window.open('https://open.kakao.com/o/sIBSxkbi')}
                className="w-10 h-10 p-0 border-0 bg-transparent rounded-full overflow-hidden transition-transform duration-200 hover:scale-105 shadow-md hover:shadow-lg"
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
    </header>
  );
}