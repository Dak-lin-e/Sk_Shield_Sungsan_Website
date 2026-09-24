/**
 * 관리자 페이지에서 수정할 수 있는 사이트 콘텐츠 목록.
 * 각 페이지는 Firestore `siteContent/{id}` 문서 하나에 대응하고, 필드 key가 문서의 필드명이다.
 * default는 Firestore에 값이 없을 때 사이트에 보이는 원래 문구/이미지다.
 *
 * type
 * - text: 한 줄 입력
 * - textarea: 여러 줄 입력 (줄바꿈 유지)
 * - rich: 여러 줄 + *별표로 감싼 부분*은 파란 그라데이션 강조
 * - lines: 한 줄에 항목 하나 (목록)
 * - image: 이미지 업로드
 * - url: 링크 주소
 * - tel: 전화번호 (숫자, -, + 만)
 */

const hero = (defaults) => [
  { key: 'heroTitle', label: '제목', type: 'rich', group: '상단 히어로', default: defaults.title },
  { key: 'heroDescription', label: '설명', type: 'textarea', group: '상단 히어로', default: defaults.description },
  { key: 'heroImage', label: '대표 이미지', type: 'image', group: '상단 히어로', default: defaults.image },
];

const cta = (defaults) => [
  { key: 'ctaTitle', label: '제목', type: 'rich', group: '하단 상담 유도', default: defaults.title },
  { key: 'ctaDescription', label: '설명', type: 'textarea', group: '하단 상담 유도', default: defaults.description },
];

const product = (n, defaults) => [
  { key: `product${n}Name`, label: '상품명', type: 'text', group: `상품 ${n}`, default: defaults.name },
  { key: `product${n}Description`, label: '한 줄 설명', type: 'text', group: `상품 ${n}`, default: defaults.description },
  { key: `product${n}Image`, label: '이미지', type: 'image', group: `상품 ${n}`, default: defaults.image },
  { key: `product${n}Details`, label: '상세 항목', type: 'lines', group: `상품 ${n}`, default: defaults.details.join('\n') },
];

export const CONTENT_SCHEMA = [
  {
    id: 'contact',
    path: '/',
    label: '연락처',
    fields: [
      { key: 'phoneLabel', label: '표시 전화번호', type: 'text', group: '전화', default: '1533-2089', help: '사이트에 보이는 번호예요.' },
      { key: 'phoneDial', label: '실제 연결 번호', type: 'tel', group: '전화', default: '010-3605-9528', help: '전화 버튼을 누르면 이 번호로 연결돼요.' },
      { key: 'kakaoUrl', label: '카카오톡 상담 링크', type: 'url', group: '카카오톡', default: 'https://open.kakao.com/o/sIBSxkbi' },
    ],
  },
  {
    id: 'home',
    path: '/',
    label: '홈',
    fields: [
      ...hero({
        title: 'ADT 캡스\n*통합 보안* 시스템',
        description: '비교할수록 확실한 차이, ADT캡스 전문대리점에서 최적의 솔루션을 만나세요.',
        image: '/image_file/출입보안2.jpg',
      }),
      ...product(1, {
        name: '출동경비',
        description: '이상 신호 감지 시 최단거리 차량 출동',
        image: '/image_file/출동경비2.png',
        details: [
          '방문 맞춤컨설팅을 통한 보안설계 및 설치',
          'AI 이상신호 감지 및 알림',
          'AI CCTV의 24시간 모니터링 및 긴급 출동',
          '안심플러스 보상서비스로 더 안심',
          '전국 규모의 전문 기술지원 센터 A/S 처리',
        ],
      }),
      ...product(2, {
        name: 'CCTV',
        description: '쉽고 빠른 영상 검색, 200만/500만 화소 고화질 AI CCTV',
        image: '/image_file/cctv.jpg',
        details: ['사람/차량 스마트 AI 검색', '영역 지정 침입탐지 및 검색', '침입 감지 알림 서비스', '피플카운팅 방문 분석 서비스'],
      }),
      ...product(3, {
        name: '출입통제',
        description: '지문, 카드, 얼굴 인식을 이용하여 출입/근태 출입관리',
        image: '/image_file/출입통제2.png',
        details: ['내,외부인원의 출입권한 통제 관리(일반문,자동문, E/L)', '내부직원을 위한 다양한 인증 방식', '외부인을 위한 다양한 호출 방식'],
      }),
      ...product(4, {
        name: '캡스홈 (가정용)',
        description: '현관문 앞 영상, 얼굴인식 AI, 집안상황 실시간 확인',
        image: '/image_file/캡스홈2.png',
        details: ['현관 앞 상황실시간 영상 확인', '현관문 출입 내역 알림/확인', '현관 앞 배회자 감지 및 알림', '이상신호 감지시 대원 출동'],
      }),
    ],
  },
  {
    id: 'security',
    path: '/security',
    label: 'ADT캡스 무인경비',
    fields: hero({
      title: '*무인 경비*\n솔루션',
      description: '무인매장에 최적화된 첨단 보안 서비스로 안심하고 운영하세요.\n24시간 빈틈없는 감시와 실시간 대응 시스템을 제공합니다.',
      image: '/image_file/무인매장솔루션.png',
    }),
  },
  {
    id: 'kiosk',
    path: '/kiosk',
    label: '키오스크',
    fields: hero({
      title: '캡스 키오스크의\n*특별함을 경험해보세요*',
      description: '직원 없이도 간편하게! 인건비와 응대 피로도를 줄이는\n똑똑한 결제 키오스크로 매장 운영의 효율을 높이세요.',
      image: '/image_file/키오스크배경1.png',
    }),
  },
  {
    id: 'tableOrder',
    path: '/table-order',
    label: '테이블오더',
    fields: [
      ...hero({
        title: '캡스만의 *특별함*을\n경험해보세요',
        description: '태블릿을 통해 테이블에서 직접 주문받고, 주문 내역을 실시간으로 관리하는 효율적인 스마트 오더 시스템입니다.',
        image: '/image_file/스마트오더.png',
      }),
      ...cta({
        title: '지금 바로 *전문가와 상담*하세요',
        description: '매장 규모와 업종에 최적화된 스마트 오더 솔루션을 제안해드립니다.',
      }),
    ],
  },
  {
    id: 'cleanCare',
    path: '/clean-care',
    label: '클린케어',
    fields: [
      ...hero({
        title: '사업장 청결관리\n전문 *방역·방제* 솔루션',
        description: 'ADT 캡스 클린케어는 차별화된 전문 기술력과\n체계적인 살균·방역으로 완벽한 청정 공간을 약속합니다.',
        image: '/image_file/클린케어 로고 이미지.png',
      }),
      ...cta({
        title: '지금 우리 사업장에 딱 맞는\n*방역 플랜*을 확인하세요',
        description: '전화 상담을 통해 무료 견적 및 컨설팅을 받으실 수 있습니다.',
      }),
    ],
  },
  {
    id: 'cyberGuard',
    path: '/cyber-guard',
    label: '사이버가드',
    fields: [
      ...hero({
        title: '민감정보 유출을 완벽히 차단하는\n*맞춤형 정보보안 솔루션*',
        description: 'ADT Caps 사이버가드와 함께라면, 보안 아키텍처를 통해\n기업의 소중한 자산과 데이터를 24시간 보호합니다.',
        image: '/image_file/사이버가드배경1.png',
      }),
      ...cta({
        title: '안전한 디지털 환경을 위한\n*최고의 파트너*',
        description: '보안 전문가의 1:1 무료 컨설팅을 통해 귀사만의 보안 로드맵을 만들어 보세요.',
      }),
    ],
  },
];

/** 이미지/링크 값이 안전한 주소인지 검사한다. (javascript: 등 차단) */
export function isSafeValue(type, value) {
  if (type === 'url') return /^https?:\/\//i.test(value);
  // 로컬 에뮬레이터(http://127.0.0.1, http://localhost) 주소는 개발용으로 허용한다.
  if (type === 'image') return /^https:\/\//i.test(value) || /^\/(?!\/)/.test(value) || /^http:\/\/(127\.0\.0\.1|localhost)(:\d+)?\//.test(value);
  if (type === 'tel') return /^\+?[0-9][0-9\s-]{7,18}$/.test(value);
  return true;
}

/** { pageId: { fieldKey: fieldType } } */
export const CONTENT_TYPES = Object.fromEntries(
  CONTENT_SCHEMA.map(page => [page.id, Object.fromEntries(page.fields.map(field => [field.key, field.type]))])
);

/** { pageId: { fieldKey: defaultValue } } */
export const CONTENT_DEFAULTS = Object.fromEntries(
  CONTENT_SCHEMA.map(page => [page.id, Object.fromEntries(page.fields.map(field => [field.key, field.default]))])
);
