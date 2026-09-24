import React, { useState } from 'react';
import { ArrowRight, CheckCircle, ChevronDown, Loader2, Phone } from 'lucide-react';
import { useContact } from '../../content/ContentProvider';
import { loadFirestore } from '../../lib/loadFirestore';
import Section from '../ui/Section';
import SectionLabel from '../ui/SectionLabel';
import Button from '../ui/Button';
import { IconTile } from '../ui/Card';
import { Reveal } from '../ui/Reveal';

const REGIONS = ['서울', '경기', '인천', '부산', '대구', '광주', '대전', '울산', '세종', '강원', '충북', '충남', '전북', '전남', '경북', '경남', '제주'];

const inputClass =
  'h-12 w-full rounded-xl border border-border bg-muted/40 px-4 text-[15px] text-foreground transition-colors placeholder:text-muted-foreground/60 hover:border-accent/30 focus:border-accent focus:bg-card focus:outline-none focus:ring-2 focus:ring-accent/20';

export default function ContactSection() {
  const contact = useContact();
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

  const [submitStatus, setSubmitStatus] = useState('idle'); // 'idle' | 'loading' | 'success' | 'error'

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 허니팟: 사람에게 보이지 않는 칸이 채워져 있으면 봇으로 보고 저장하지 않는다.
    if (e.currentTarget.elements['bot-field']?.value) {
      setSubmitStatus('success');
      return;
    }

    setSubmitStatus('loading');
    try {
      const { addDoc, collection, db, serverTimestamp } = await loadFirestore();
      await addDoc(collection(db, 'inquiries'), {
        name: formData.name.trim(),
        phone: formData.phone.replace(/[^0-9]/g, ''),
        region: formData.region,
        privacy: agreements.privacy,
        marketing: agreements.marketing,
        sms: agreements.sms,
        status: 'new',
        createdAt: serverTimestamp(),
      });
      setSubmitStatus('success');
      setFormData({ name: '', phone: '', region: '' });
      setAgreements({ privacy: false, marketing: false, sms: false });
      setTimeout(() => setSubmitStatus('idle'), 5000);
    } catch (error) {
      console.error('Form submission error:', error);
      setSubmitStatus('error');
      setTimeout(() => setSubmitStatus('idle'), 3000);
    }
  };

  const agreementItems = [
    { name: 'privacy', label: '[필수] 개인정보 수집·이용 동의', required: true },
    { name: 'marketing', label: '[선택] 마케팅 정보 제공을 위한 개인정보 수집이용 동의' },
    { name: 'sms', label: '[선택] 마케팅 정보 수신 동의' },
  ];

  return (
    <Section id="contact" tone="inverted">
      <div className="grid items-center gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
        <Reveal>
          <SectionLabel tone="dark">Consulting</SectionLabel>
          <h2 className="font-display mt-5 text-[2rem] leading-[1.2] text-white sm:text-4xl md:text-5xl">
            <span className="text-gradient-light">전문상담</span> 예약
          </h2>
          <p className="mt-5 max-w-md text-base leading-relaxed text-white/70 md:text-lg">
            이름과 연락처를 남겨주시면 성산대리점에서 상담을 도와드려요.
          </p>

          <a
            href={contact.phoneHref}
            className="group mt-10 flex max-w-sm items-center gap-4 rounded-2xl border border-white/10 bg-white/5 p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-white/25 hover:bg-white/10"
          >
            <IconTile icon={Phone} />
            <span className="flex-1">
              <span className="block text-sm text-white/60">전화상담 연결</span>
              <span className="font-display block text-2xl text-white md:text-3xl">{contact.phoneLabel}</span>
            </span>
            <ArrowRight className="h-5 w-5 text-white/50 transition-transform duration-200 group-hover:translate-x-1 group-hover:text-white" aria-hidden="true" />
          </a>
        </Reveal>

        <Reveal delay={0.1}>
          <form
            name="contact"
            onSubmit={handleSubmit}
            className="rounded-2xl bg-card p-6 text-foreground shadow-xl sm:p-8"
          >
            <p className="hidden" aria-hidden="true">
              <label>
                Don't fill this out if you're human: <input name="bot-field" tabIndex={-1} autoComplete="off" />
              </label>
            </p>

            <div className="grid gap-4 sm:grid-cols-2">
              <label className="block">
                <span className="mb-1.5 block text-sm font-medium">이름</span>
                <input type="text" name="name" placeholder="홍길동" maxLength={30} value={formData.name} onChange={handleChange} className={inputClass} required />
              </label>
              <label className="block">
                <span className="mb-1.5 block text-sm font-medium">전화번호</span>
                <input
                  type="tel"
                  name="phone"
                  placeholder="'-' 없이 입력"
                  inputMode="numeric"
                  pattern="0[0-9]{1,2}-?[0-9]{3,4}-?[0-9]{4}"
                  title="예: 01012345678"
                  value={formData.phone}
                  onChange={handleChange}
                  className={inputClass}
                  required
                />
              </label>
              <label className="block sm:col-span-2">
                <span className="mb-1.5 block text-sm font-medium">지역</span>
                <span className="relative block">
                  <select name="region" value={formData.region} onChange={handleChange} className={`${inputClass} appearance-none pr-10`} required>
                    <option value="">지역 선택</option>
                    {REGIONS.map(region => (
                      <option key={region} value={region}>
                        {region}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
                </span>
              </label>
            </div>

            <fieldset className="mt-6 space-y-3 border-t border-border pt-6">
              <legend className="sr-only">약관 동의</legend>
              {agreementItems.map(item => (
                <label key={item.name} className="flex cursor-pointer items-start gap-3 text-sm leading-snug text-muted-foreground">
                  <input
                    type="checkbox"
                    name={item.name}
                    checked={agreements[item.name]}
                    onChange={handleAgreementChange}
                    className="mt-0.5 h-4 w-4 shrink-0 cursor-pointer rounded accent-accent"
                    required={item.required}
                  />
                  <span className={item.required ? 'font-medium text-foreground' : undefined}>{item.label}</span>
                </label>
              ))}
            </fieldset>

            <Button
              type="submit"
              size="lg"
              disabled={!agreements.privacy || submitStatus === 'loading'}
              icon={submitStatus === 'loading' ? Loader2 : submitStatus === 'success' ? CheckCircle : undefined}
              arrow={submitStatus === 'idle' || submitStatus === 'error'}
              className={`mt-6 w-full ${submitStatus === 'loading' ? '[&>svg:first-child]:animate-spin' : ''}`}
            >
              {submitStatus === 'success' ? '신청 완료!' : submitStatus === 'loading' ? '제출 중...' : '전문상담 예약'}
            </Button>

            <p className="mt-3 min-h-5 text-center text-sm" role="status" aria-live="polite">
              {submitStatus === 'success' && <span className="text-accent">상담 신청이 접수되었어요.</span>}
              {submitStatus === 'error' && <span className="text-red-600">제출에 실패했어요. 잠시 후 다시 시도하거나 전화로 문의해 주세요.</span>}
              {submitStatus === 'idle' && !agreements.privacy && <span className="text-muted-foreground">필수 항목에 동의하면 예약할 수 있어요.</span>}
            </p>
          </form>
        </Reveal>
      </div>
    </Section>
  );
}
