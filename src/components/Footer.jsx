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
            {/* 왼쪽 - 회사 정보 */}
            <div className="flex-1 mb-6 lg:mb-0">
              <h3 className="font-bold text-2xl text-white mb-4">ADT 캡스 성산대리점</h3>
              
              <div className="space-y-1 text-sm text-gray-300 leading-tight">
                <p>대표자 : 박현석</p>
                <p>사업자 등록번호 : 189-01-03869</p>
                <p>전화 : 1588-6400</p>
                <p>이메일 : phs7730@hanmail.net</p>
              </div>
            </div>

            {/* 오른쪽 - 로고들 */}
            <div className="flex items-center gap-4 lg:gap-6 lg:ml-8 self-end lg:self-start w-full lg:w-auto justify-end">
              <motion.img
                src="./image_file/sk 쉴더스 로고.webp"
                alt="SK 쉴더스 로고"
                className="h-12 sm:h-14 lg:h-16 object-contain hover:scale-105 transition-transform duration-200"
                whileHover={{ scale: 1.05 }}
              />
              <motion.img
                src="./image_file/캡스.png"
                alt="캡스 로고"
                className="h-12 sm:h-14 lg:h-16 object-contain hover:scale-105 transition-transform duration-200"
                whileHover={{ scale: 1.05 }}
              />
            </div>
          </div>
        </motion.div>

        {/* 구분선 */}
        <div className="border-t border-gray-700 my-8"></div>

        {/* 하단 섹션 */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
        >
          <div className="flex items-center">
            <p className="text-sm text-gray-400">
              Copyright © 
              <a href="#" className="text-blue-400 hover:text-blue-300 transition-colors mx-1">
                sk shieldus
              </a>
              All rights reserved. Hosting by JH
            </p>
          </div>

          {/* 메뉴 링크들 */}
          <div className="flex flex-wrap items-center gap-1 sm:gap-2 text-sm">
            <a href="#" className="text-gray-400 hover:text-red-400 transition-colors px-1">
              홈
            </a>
            <span className="text-gray-600">|</span>
            <a href="#" className="text-gray-400 hover:text-red-400 transition-colors px-1">
              개인정보처리방침
            </a>
            <span className="text-gray-600">|</span>
            <a href="#" className="text-gray-400 hover:text-gray-300 transition-colors px-1">
              이용약관
            </a>
            <span className="text-gray-600">|</span>
            <a href="#" className="text-gray-400 hover:text-gray-300 transition-colors px-1">
              이용안내
            </a>
            <span className="text-gray-600">|</span>
            <a href="#" className="text-gray-400 hover:text-gray-300 transition-colors px-1">
              관리자
            </a>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}