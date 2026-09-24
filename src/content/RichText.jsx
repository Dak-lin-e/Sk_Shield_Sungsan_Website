import React, { Fragment } from 'react';

/**
 * 관리자 입력 문자열을 렌더링한다.
 * - 줄바꿈(\n) → <br />  (softBreaks면 sm 이상에서만 줄바꿈)
 * - *강조* → 그라데이션 강조 (emphasis로 렌더링 방식 교체 가능)
 * HTML은 해석하지 않으므로 입력값이 그대로 텍스트로 출력된다.
 */
export default function RichText({ value = '', tone = 'light', softBreaks = false, emphasis }) {
  const gradient = tone === 'dark' ? 'text-gradient-light' : 'text-gradient';
  const renderEmphasis = emphasis || (text => <span className={gradient}>{text}</span>);

  return value.split('\n').map((line, lineIndex) => (
    <Fragment key={lineIndex}>
      {lineIndex > 0 && (softBreaks ? <br className="hidden sm:block" /> : <br />)}
      {lineIndex > 0 && softBreaks && ' '}
      {line.split(/(\*[^*]+\*)/g).map((part, partIndex) =>
        /^\*[^*]+\*$/.test(part) ? <Fragment key={partIndex}>{renderEmphasis(part.slice(1, -1))}</Fragment> : part
      )}
    </Fragment>
  ));
}
