import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Phone } from 'lucide-react';

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    region: '',
  });

  const [agreements, setAgreements] = useState({
    privacy: false,
    marketing: false,
    sms: false,
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleAgreementChange = (e) => {
    setAgreements({
      ...agreements,
      [e.target.name]: e.target.checked,
    });
  };

  return (
    <section id="contact" className="py-0">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="w-full"
      >
        <div className="bg-[#4a4a4a] flex flex-col lg:flex-row">
          {/* Form Section */}
          <div className="flex-1 px-6 md:px-10 py-8">
            <div className="flex flex-col lg:flex-row lg:items-center gap-6 lg:gap-8">
              {/* Title */}
              <h3 className="text-xl md:text-2xl font-bold text-white whitespace-nowrap">
                전문상담 예약
              </h3>

              <form 
                name="contact" 
                method="POST" 
                data-netlify="true"
                netlify-honeypot="bot-field"
                className="flex-1"
              >
                <input type="hidden" name="form-name" value="contact" />
                <p className="hidden">
                  <label>
                    Don't fill this out if you're human: <input name="bot-field" />
                  </label>
                </p>

                <div className="flex flex-col lg:flex-row gap-4 lg:items-center">
                  {/* Input Fields */}
                  <div className="flex flex-col sm:flex-row gap-3 flex-1">
                    <input
                      type="text"
                      name="name"
                      placeholder="이름"
                      value={formData.name}
                      onChange={handleChange}
                      className="flex-1 min-w-[120px] px-4 py-3 bg-white border-0 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                    <input
                      type="tel"
                      name="phone"
                      placeholder="'-' 없이 입력"
                      value={formData.phone}
                      onChange={handleChange}
                      className="flex-1 min-w-[140px] px-4 py-3 bg-white border-0 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                    <select
                      name="region"
                      value={formData.region}
                      onChange={handleChange}
                      className="flex-1 min-w-[160px] px-4 py-3 bg-white border-0 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none bg-[url('data:image/svg+xml;charset=UTF-8,%3csvg%20xmlns%3d%22http%3a%2f%2fwww.w3.org%2f2000%2fsvg%22%20width%3d%2212%22%20height%3d%2212%22%20viewBox%3d%220%200%2012%2012%22%3e%3cpath%20fill%3d%22%23333%22%20d%3d%22M6%208L1%203h10z%22%2f%3e%3c%2fsvg%3e')] bg-no-repeat bg-[center_right_1rem]"
                      required
                    >
                      <option value="">지역 선택</option>
                      <option value="서울">서울</option>
                      <option value="경기">경기</option>
                      <option value="인천">인천</option>
                      <option value="부산">부산</option>
                      <option value="대구">대구</option>
                      <option value="광주">광주</option>
                      <option value="대전">대전</option>
                      <option value="울산">울산</option>
                      <option value="세종">세종</option>
                      <option value="강원">강원</option>
                      <option value="충북">충북</option>
                      <option value="충남">충남</option>
                      <option value="전북">전북</option>
                      <option value="전남">전남</option>
                      <option value="경북">경북</option>
                      <option value="경남">경남</option>
                      <option value="제주">제주</option>
                    </select>
                  </div>

                  {/* Checkboxes */}
                  <div className="flex flex-col gap-1.5 text-xs text-white/90">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        name="privacy"
                        checked={agreements.privacy}
                        onChange={handleAgreementChange}
                        className="w-4 h-4 rounded border-white/30 bg-transparent accent-blue-500"
                        required
                      />
                      <span>[필수] 개인정보 수집·이용 동의 ›</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        name="marketing"
                        checked={agreements.marketing}
                        onChange={handleAgreementChange}
                        className="w-4 h-4 rounded border-white/30 bg-transparent accent-blue-500"
                      />
                      <span>[선택] 마케팅 정보 제공을 위한 개인정보 수집이용 동의 ›</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        name="sms"
                        checked={agreements.sms}
                        onChange={handleAgreementChange}
                        className="w-4 h-4 rounded border-white/30 bg-transparent accent-blue-500"
                      />
                      <span>[선택] 마케팅 정보 수신 동의</span>
                    </label>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-8 py-3 rounded-full transition-colors whitespace-nowrap"
                  >
                    전문상담 예약
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Phone Section */}
          <a 
            href="tel:010-3605-9528" 
            className="bg-blue-600 px-8 py-6 flex items-center justify-center gap-4 hover:bg-blue-700 transition-colors cursor-pointer"
          >
            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
              <Phone className="w-6 h-6 text-white" />
            </div>
            <div className="text-white">
              <p className="text-sm font-medium">전화상담 연결</p>
              <p className="text-2xl font-bold">062-470-7730</p>
            </div>
          </a>
        </div>
      </motion.div>
    </section>
  );
}