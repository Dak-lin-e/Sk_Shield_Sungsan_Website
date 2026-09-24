import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { loadFirestore } from '../lib/loadFirestore';
import { CONTENT_DEFAULTS, CONTENT_TYPES, isSafeValue } from './schema';

const CACHE_KEY = 'siteContent:v1';
const ContentContext = createContext({});

function readCache() {
  try {
    return JSON.parse(localStorage.getItem(CACHE_KEY)) || {};
  } catch {
    return {};
  }
}

function writeCache(value) {
  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify(value));
  } catch {
    // 저장 공간이 막혀 있어도 사이트는 기본값/원격값으로 동작한다.
  }
}

/**
 * Firestore `siteContent` 컬렉션을 한 번 읽어 전역으로 제공한다.
 * 첫 렌더는 지난 방문 캐시(없으면 기본값)로 그려 깜빡임을 줄인다.
 */
export function ContentProvider({ children }) {
  const [remote, setRemote] = useState(readCache);

  useEffect(() => {
    let alive = true;
    loadFirestore()
      .then(({ collection, db, getDocs }) => getDocs(collection(db, 'siteContent')))
      .then(snapshot => {
        const next = {};
        snapshot.forEach(doc => {
          next[doc.id] = doc.data();
        });
        if (!alive) return;
        setRemote(next);
        writeCache(next);
      })
      .catch(error => console.warn('사이트 콘텐츠를 불러오지 못해 기본값을 사용합니다.', error));
    return () => {
      alive = false;
    };
  }, []);

  return <ContentContext.Provider value={remote}>{children}</ContentContext.Provider>;
}

/** 페이지 콘텐츠: 기본값 위에 Firestore에 저장된 (비어 있지 않고 안전한) 문자열 값을 덮어쓴다. */
export function useContent(pageId) {
  const remote = useContext(ContentContext);
  return useMemo(() => {
    const defaults = CONTENT_DEFAULTS[pageId] || {};
    const types = CONTENT_TYPES[pageId] || {};
    const overrides = remote[pageId] || {};
    const merged = { ...defaults };
    for (const key of Object.keys(defaults)) {
      const value = overrides[key];
      if (typeof value === 'string' && value.trim() !== '' && isSafeValue(types[key], value.trim())) merged[key] = value;
    }
    return merged;
  }, [remote, pageId]);
}

/** 전화/카카오 연락처 */
export function useContact() {
  const content = useContent('contact');
  return useMemo(
    () => ({
      phoneLabel: content.phoneLabel,
      phoneHref: `tel:${content.phoneDial.replace(/[^0-9+]/g, '')}`,
      kakaoUrl: content.kakaoUrl,
    }),
    [content]
  );
}
