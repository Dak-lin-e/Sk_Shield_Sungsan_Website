import React from 'react';
import { ConsultCTA } from '../ui/Consult';
import { useContent } from '../../content/ContentProvider';
import RichText from '../../content/RichText';

export default function CyberCTA() {
  const content = useContent('cyberGuard');
  return (
    <ConsultCTA
      title={<RichText value={content.ctaTitle} tone="dark" />}
      description={<RichText value={content.ctaDescription} softBreaks />}
    />
  );
}
