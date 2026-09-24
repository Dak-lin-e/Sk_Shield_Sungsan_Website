import React from 'react';
import { Check } from 'lucide-react';
import Section, { SectionHeading } from '../ui/Section';
import Card from '../ui/Card';
import { RevealGroup, RevealItem } from '../ui/Reveal';
import { useContent } from '../../content/ContentProvider';

const PRODUCT_NUMBERS = [1, 2, 3, 4];

export default function TemplateSection() {
  const content = useContent('home');
  const products = PRODUCT_NUMBERS.map(n => ({
    name: content[`product${n}Name`],
    description: content[`product${n}Description`],
    image: content[`product${n}Image`],
    details: content[`product${n}Details`].split('\n').map(line => line.trim()).filter(Boolean),
  }));
  return (
    <Section id="template" tone="white">
      <SectionHeading
        label="Products"
        title={
          <>
            통합 <span className="text-gradient">상품 설명서</span>
          </>
        }
        description="AI 기술로 더 빨리, 더 정확하게! 자신과 정보를 지키는 전문 보안 서비스"
      />

      <RevealGroup className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:gap-8">
        {products.map((product, index) => (
          <RevealItem key={index}>
            <Card interactive>
              <div className="aspect-[16/9] overflow-hidden bg-muted">
                <img
                  src={product.image}
                  alt={product.name}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                />
              </div>
              <div className="p-6 md:p-8">
                <div className="flex items-baseline gap-3">
                  <span className="font-mono text-xs tracking-[0.15em] text-accent">{String(index + 1).padStart(2, '0')}</span>
                  <h3 className="text-xl font-bold tracking-tight md:text-2xl">{product.name}</h3>
                </div>
                <p className="mt-2 leading-relaxed text-muted-foreground">{product.description}</p>
                <ul className="mt-6 space-y-2.5 border-t border-border pt-6">
                  {product.details.map((detail, detailIndex) => (
                    <li key={detailIndex} className="flex items-start gap-3 text-[15px] leading-relaxed text-foreground/80">
                      <span className="mt-1 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-accent/10 text-accent">
                        <Check className="h-3 w-3" strokeWidth={3} aria-hidden="true" />
                      </span>
                      {detail}
                    </li>
                  ))}
                </ul>
              </div>
            </Card>
          </RevealItem>
        ))}
      </RevealGroup>
    </Section>
  );
}
