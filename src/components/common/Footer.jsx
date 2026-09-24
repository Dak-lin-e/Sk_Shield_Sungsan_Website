import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { CONTACT } from '../../constants/contact';
import { DarkTexture } from '../ui/Section';

const linkClass = 'rounded px-1 text-white/60 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent';

export default function Footer() {
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);

  useEffect(() => {
    if (!isPrivacyOpen) return;
    const onKey = (e) => e.key === 'Escape' && setIsPrivacyOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isPrivacyOpen]);

  return (
    <footer className="relative w-full overflow-hidden bg-foreground text-white">
      <DarkTexture glow={false} />
      <div className="relative mx-auto w-full max-w-6xl px-5 py-14 sm:px-6 md:py-16">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.15em] text-white/50">SK shieldus · ADT CAPS</p>
            <h3 className="mt-3 text-2xl font-bold tracking-tight">ADT 캡스 성산대리점</h3>
            <dl className="mt-6 grid grid-cols-[auto_1fr] gap-x-4 gap-y-1.5 text-sm">
              <dt className="text-white/50">대표자</dt>
              <dd className="text-white/80">박현석</dd>
              <dt className="text-white/50">사업자 등록번호</dt>
              <dd className="text-white/80">189-01-03869</dd>
              <dt className="text-white/50">전화</dt>
              <dd>
                <a href={CONTACT.phoneHref} className="text-white/80 hover:text-white">{CONTACT.phoneLabel}</a>
              </dd>
              <dt className="text-white/50">이메일</dt>
              <dd className="text-white/80">phs7730@hanmail.net</dd>
            </dl>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex h-16 items-center rounded-xl bg-white px-4">
              <img src="/image_file/sk 쉴더스 로고.webp" alt="SK 쉴더스 로고" className="h-10 object-contain" />
            </div>
            <div className="flex h-16 items-center rounded-xl bg-white px-4">
              <img src="/image_file/캡스.png" alt="캡스 로고" className="h-10 object-contain" />
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-white/10 pt-8 text-sm sm:flex-row sm:items-center sm:justify-between">
          <p className="text-white/50">
            Copyright © SK Shields ADT caps 성산대리점. All rights reserved. Hosting by JH
          </p>
          <nav className="flex flex-wrap items-center gap-x-3 gap-y-2" aria-label="푸터 메뉴">
            <Link to="/" className={linkClass}>홈</Link>
            <button type="button" onClick={() => setIsPrivacyOpen(true)} className={`${linkClass} font-semibold text-white/80`}>
              개인정보처리방침
            </button>
            <a href="#" className={linkClass}>이용약관</a>
            <a href="#" className={linkClass}>이용안내</a>
            <a href="#" className={linkClass}>관리자</a>
          </nav>
        </div>
      </div>

      {/* 개인정보처리방침 팝업 모달 */}
      <AnimatePresence>
        {isPrivacyOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-center justify-center bg-foreground/60 p-4 backdrop-blur-sm"
            onClick={() => setIsPrivacyOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              role="dialog"
              aria-modal="true"
              aria-labelledby="privacy-title"
              className="w-full max-w-4xl max-h-[85vh] overflow-hidden rounded-2xl bg-card text-foreground shadow-xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* 헤더 */}
              <div className="flex items-center justify-between border-b border-border px-6 py-4">
                <h2 id="privacy-title" className="text-lg font-bold tracking-tight md:text-xl">
                  개인정보처리방침(Privacy Policy)
                </h2>
                <button
                  type="button"
                  onClick={() => setIsPrivacyOpen(false)}
                  aria-label="닫기"
                  className="flex h-10 w-10 items-center justify-center rounded-xl text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* 내용 */}
              <div className="px-6 py-6 overflow-y-auto max-h-[70vh] text-gray-700 leading-relaxed text-sm">
                <div className="space-y-6">
                  {/* 서문 */}
                  <div className="rounded-xl border-l-4 border-accent bg-accent/5 p-4">
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
                        <li><strong>연락처:</strong> 1533-2089 / phs7730@hanmail.net</li>
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