import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);

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
                <p>전화 : 062-470-7730</p>
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
                SK Shields ADT caps 성산대리점
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
            <button 
              onClick={() => setIsPrivacyOpen(true)}
              className="text-gray-400 hover:text-red-400 transition-colors px-1"
            >
              개인정보처리방침
            </button>
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

      {/* 개인정보처리방침 팝업 모달 */}
      <AnimatePresence>
        {isPrivacyOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
            onClick={() => setIsPrivacyOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="bg-white rounded-lg shadow-2xl max-w-4xl w-full max-h-[85vh] overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* 헤더 */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-900">
                  개인정보처리방침(Privacy Policy)
                </h2>
                <button
                  onClick={() => setIsPrivacyOpen(false)}
                  className="p-1 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X className="w-6 h-6 text-gray-500" />
                </button>
              </div>

              {/* 내용 */}
              <div className="px-6 py-6 overflow-y-auto max-h-[70vh] text-gray-700 leading-relaxed text-sm">
                <div className="space-y-6">
                  {/* 서문 */}
                  <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500">
                    <p className="text-gray-800">
                      <strong>[ADT캡스(또는 SK쉴더스) 성산대리점]</strong>(이하 "대리점")은 「개인정보 보호법」 등 관련 법령을 준수하며, 고객(정보주체)의 개인정보를 보호하기 위해 다음과 같이 개인정보처리방침을 수립·공개합니다.
                    </p>
                    <p className="mt-2 text-gray-600">
                      <span className="font-medium">시행일:</span> 2025.01.01 &nbsp;|&nbsp; <span className="font-medium">최종 개정일:</span> 2025.02.04
                    </p>
                  </div>

                  {/* 1조 */}
                  <div>
                    <h3 className="font-bold text-gray-900 mb-2 text-base">1. 개인정보의 처리 목적</h3>
                    <p className="mb-2">대리점은 다음 목적을 위해 개인정보를 처리합니다.</p>
                    <ul className="list-disc list-inside space-y-1 text-gray-600 ml-2">
                      <li>상담 신청 접수 및 상담 진행(전화/문자/이메일 안내 포함)</li>
                      <li>보안서비스 견적 안내 및 설치/계약 관련 안내</li>
                      <li>민원 처리 및 분쟁 대응, 고객 문의 응대</li>
                      <li>(선택) 마케팅 정보 제공 및 이벤트/프로모션 안내 (별도 동의한 경우에만)</li>
                    </ul>
                  </div>

                  {/* 2조 */}
                  <div>
                    <h3 className="font-bold text-gray-900 mb-2 text-base">2. 처리하는 개인정보 항목 및 수집 방법</h3>
                    <div className="space-y-3">
                      <div>
                        <h4 className="font-semibold text-gray-800">2-1) 수집 항목</h4>
                        <ul className="list-disc list-inside space-y-1 text-gray-600 ml-2">
                          <li><strong>필수:</strong> 이름, 연락처(휴대전화번호), 상담 요청 내용(있을 경우), 개인정보 수집·이용 동의 여부</li>
                          <li><strong>선택:</strong> 연락 선호시간, (선택 동의 시) 마케팅 수신 동의 여부</li>
                          <li><strong>자동 수집(접속 시):</strong> IP 주소, 쿠키, 접속 로그, 기기/브라우저 정보 등(서비스 이용 과정에서 자동 생성·수집될 수 있음)</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-800">2-2) 수집 방법</h4>
                        <p className="text-gray-600 ml-2">웹사이트 상담신청 폼 제출, 전화 상담, 문자/카카오톡 문의 등</p>
                      </div>
                    </div>
                  </div>

                  {/* 3조 */}
                  <div>
                    <h3 className="font-bold text-gray-900 mb-2 text-base">3. 개인정보의 처리 및 보유 기간</h3>
                    <p className="mb-2">대리점은 원칙적으로 개인정보 처리 목적 달성 시 지체 없이 파기합니다. 다만, 분쟁 대응 및 고객 응대를 위해 아래 기간 동안 보관할 수 있습니다.</p>
                    <ul className="list-disc list-inside space-y-1 text-gray-600 ml-2">
                      <li>상담 신청 정보(이름/연락처/상담내용): 상담 완료 후 1년 보관 후 파기</li>
                      <li>(선택) 마케팅 수신 동의 정보: 동의 철회 시 또는 보관기간까지</li>
                      <li>접속 로그 등: 3개월 보관 후 파기</li>
                    </ul>
                    <p className="mt-2 text-gray-500 text-xs">※ 법령에 따라 보관이 필요한 경우 해당 법령에서 정한 기간 동안 보관합니다.</p>
                  </div>

                  {/* 4조 */}
                  <div>
                    <h3 className="font-bold text-gray-900 mb-2 text-base">4. 개인정보의 제3자 제공</h3>
                    <p className="mb-2">대리점은 원칙적으로 정보주체의 개인정보를 제3자에게 제공하지 않습니다. 다만, 아래에 해당하는 경우에는 정보주체 동의 또는 법령 근거에 따라 제공할 수 있습니다.</p>
                    <div className="overflow-x-auto mt-2">
                      <table className="min-w-full text-xs border border-gray-200">
                        <thead className="bg-gray-100">
                          <tr>
                            <th className="border border-gray-200 px-3 py-2 text-left">제공받는 자</th>
                            <th className="border border-gray-200 px-3 py-2 text-left">제공 목적</th>
                            <th className="border border-gray-200 px-3 py-2 text-left">제공 항목</th>
                            <th className="border border-gray-200 px-3 py-2 text-left">보유·이용 기간</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td className="border border-gray-200 px-3 py-2">에스케이쉴더스 성산대리점 </td>
                            <td className="border border-gray-200 px-3 py-2">상담/견적/계약 및 설치 안내</td>
                            <td className="border border-gray-200 px-3 py-2">이름, 연락처, 상담내용, 선호시간</td>
                            <td className="border border-gray-200 px-3 py-2">목적 달성 시까지</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* 5조 */}
                  <div>
                    <h3 className="font-bold text-gray-900 mb-2 text-base">5. 개인정보 처리업무의 위탁</h3>
                    <p className="mb-2">대리점은 원활한 서비스 제공을 위해 개인정보 처리업무를 위탁할 수 있으며, 위탁 시 관련 법령에 따라 안전하게 관리·감독합니다.</p>
                    <div className="overflow-x-auto mt-2">
                      <table className="min-w-full text-xs border border-gray-200">
                        <thead className="bg-gray-100">
                          <tr>
                            <th className="border border-gray-200 px-3 py-2 text-left">수탁자</th>
                            <th className="border border-gray-200 px-3 py-2 text-left">위탁 업무</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td className="border border-gray-200 px-3 py-2">Netlify, Inc.</td>
                            <td className="border border-gray-200 px-3 py-2">웹사이트 호스팅/운영, 상담신청 폼 데이터 수집/저장</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* 6조 */}
                  <div>
                    <h3 className="font-bold text-gray-900 mb-2 text-base">6. 개인정보의 국외 이전</h3>
                    <p className="mb-2">해외에 서버/서비스가 있는 호스팅·폼 수집·메일 발송 서비스를 사용하는 경우, 개인정보가 국외로 이전될 수 있습니다.</p>
                    <ul className="list-disc list-inside space-y-1 text-gray-600 ml-2">
                      <li><strong>이전 받는 자:</strong> Netlify, Inc.</li>
                      <li><strong>이전 국가:</strong> 미국</li>
                      <li><strong>이전 항목:</strong> 이름, 연락처, 상담내용 등</li>
                      <li><strong>이전 목적:</strong> 폼 접수 처리/저장/알림 발송</li>
                      <li><strong>이전 시점 및 방법:</strong> 웹 폼 제출 시 암호화된 통신으로 전송</li>
                      <li><strong>보유·이용 기간:</strong> 목적 달성 시까지 또는 수탁자 정책에 따름</li>
                    </ul>
                  </div>

                  {/* 7조 */}
                  <div>
                    <h3 className="font-bold text-gray-900 mb-2 text-base">7. 정보주체의 권리·의무 및 행사 방법</h3>
                    <p className="mb-2">정보주체는 언제든지 다음 권리를 행사할 수 있습니다.</p>
                    <ul className="list-disc list-inside space-y-1 text-gray-600 ml-2">
                      <li>개인정보 열람/정정/삭제/처리정지 요구</li>
                      <li>(선택 동의한 경우) 마케팅 수신 동의 철회</li>
                    </ul>
                    <p className="mt-2 text-gray-600">권리 행사는 아래 연락처로 요청할 수 있으며, 대리점은 지체 없이 조치합니다.</p>
                    <p className="text-gray-500 text-xs mt-1">※ 필수항목 미제공 시 상담 접수가 제한될 수 있습니다.</p>
                  </div>

                  {/* 8조 */}
                  <div>
                    <h3 className="font-bold text-gray-900 mb-2 text-base">8. 개인정보의 파기 절차 및 방법</h3>
                    <p className="mb-2">대리점은 보유기간 경과 또는 처리 목적 달성 시 지체 없이 파기합니다.</p>
                    <ul className="list-disc list-inside space-y-1 text-gray-600 ml-2">
                      <li><strong>파기 절차:</strong> 목적 달성/기간 만료 → 내부 검토 → 파기</li>
                      <li><strong>파기 방법:</strong>
                        <ul className="list-disc list-inside ml-4">
                          <li>전자적 파일: 복구 불가능한 방법으로 영구 삭제</li>
                          <li>서면: 분쇄 또는 소각</li>
                        </ul>
                      </li>
                    </ul>
                  </div>

                  {/* 9조 */}
                  <div>
                    <h3 className="font-bold text-gray-900 mb-2 text-base">9. 개인정보의 안전성 확보 조치</h3>
                    <p className="mb-2">대리점은 개인정보의 안전성 확보를 위해 다음 조치를 시행합니다.</p>
                    <ul className="list-disc list-inside space-y-1 text-gray-600 ml-2">
                      <li><strong>관리적 조치:</strong> 내부 접근 권한 관리, 개인정보 취급자 최소화, 교육</li>
                      <li><strong>기술적 조치:</strong> 접근통제, 계정/비밀번호 관리, 전송구간 암호화(HTTPS), 보안 업데이트</li>
                      <li><strong>물리적 조치:</strong> 문서/장비 보관 장소 접근 통제</li>
                    </ul>
                  </div>

                  {/* 10조 */}
                  <div>
                    <h3 className="font-bold text-gray-900 mb-2 text-base">10. 개인정보 보호책임자 및 문의처</h3>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <ul className="space-y-1 text-gray-600">
                        <li><strong>개인정보 보호책임자:</strong> 박현석 / 대표</li>
                        <li><strong>연락처:</strong> 062-470-7730 / phs7730@hanmail.net</li>
                        <li><strong>주소:</strong> 광주광역시 서구</li>
                      </ul>
                      <p className="mt-3 text-gray-500 text-xs">또한 개인정보 침해에 대한 신고/상담은 개인정보침해신고센터(privacy.go.kr), 경찰청, 대검찰청 등에 문의할 수 있습니다.</p>
                    </div>
                  </div>

                  {/* 11조 */}
                  <div>
                    <h3 className="font-bold text-gray-900 mb-2 text-base">11. 개인정보처리방침 변경</h3>
                    <p className="text-gray-600">본 방침 내용이 변경되는 경우 웹사이트 공지(또는 별도 고지)를 통해 안내합니다.</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </footer>
  );
}