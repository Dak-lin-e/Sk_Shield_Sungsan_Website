import React from 'react';
import { motion } from 'framer-motion';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-gray-900 text-gray-800 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* 상단 섹션 - 회사 정보 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-8"
        >
            <div className="flex flex-col lg:flex-row justify-between items-start">
          <h3 className="font-bold text-2xl text-white mb-4">ADT 캡스 성산대리점</h3>
          
          <div className="space-y-2 text-sm text-gray-600 leading-relaxed">
            <p>
              {/* 주소 : 경기 오산시 수청로몰38번길 33 첨단 테라타워 CMC 8층 201호 주식회사판다  */}
              대표자 : 박현석 사업자 등록번호 : 189-01-03869 전화 : 1588-6400
            </p>
            <p>
             이메일 : phs7730@hanmail.net  
              
            </p>
          </div>
          {/* 오른쪽 - 로고들 */}
            <div className="flex items-center gap-6 lg:ml-8 self-end lg:self-start w-full lg:w-auto justify-end">
              <motion.img
                src="./image_file/sk 쉴더스 로고.webp"
                alt="SK 쉴더스 로고"
                className="h-16 object-contain hover:scale-105 transition-transform duration-200"
                whileHover={{ scale: 1.05 }}
              />
              <motion.img
                src="./image_file/캡스.png"
                alt="캡스 로고"
                className="h-16 object-contain hover:scale-105 transition-transform duration-200"
                whileHover={{ scale: 1.05 }}
              />
            </div>
            </div>
        </motion.div>

        {/* 구분선 */}
        <div className="border-t border-gray-300 my-8"></div>

        {/* 하단 섹션 */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="flex flex-col sm:flex-row justify-between items-start sm:items-center"
        >
          <div className="flex items-center mb-4 sm:mb-0">
            <p className="text-sm text-gray-600 mr-4">
              Copyright © 
              <a href="#" className="text-blue-600 hover:text-blue-800 transition-colors mx-1">
                sk shieldus
              </a>
              All rights reserved. Hosting by JH
            </p>
          </div>

          <div className="flex items-center gap-2 text-sm">
            <a href="#" className="text-gray-600 hover:text-red-700 transition-colors">
              홈
            </a>
            <span className="text-gray-400">|</span>
            <a href="#" className="text-gray-600 hover:text-red-700 transition-colors">
              개인정보처리방침
            </a>
            <span className="text-gray-400">|</span>
            <a href="#" className="text-gray-600 hover:text-gray-800 transition-colors">
              이용약관
            </a>
            <span className="text-gray-400">|</span>
            <a href="#" className="text-gray-600 hover:text-gray-800 transition-colors">
              이용안내
            </a>
            <span className="text-gray-400">|</span>
            <a href="#" className="text-gray-600 hover:text-gray-800 transition-colors">
              관리자
            </a>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}