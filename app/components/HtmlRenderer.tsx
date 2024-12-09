'use client';

import { useEffect, useRef } from 'react';
import katex from 'katex';
import 'katex/dist/katex.css';

interface HtmlRendererProps {
  htmlContent: string;
  className?: string;
}

export default function HtmlRenderer({ htmlContent, className = '' }: HtmlRendererProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Processa fórmulas matemáticas
    const mathElements = containerRef.current.querySelectorAll('.math-inline, .math-display');
    mathElements.forEach((element) => {
      try {
        const formula = element.getAttribute('data-formula');
        if (formula) {
          katex.render(formula, element as HTMLElement, {
            throwOnError: false,
            displayMode: element.classList.contains('math-display'),
          });
        }
      } catch (error) {
        console.error('Erro ao renderizar fórmula:', error);
      }
    });
  }, [htmlContent]);

  return (
    <div 
      ref={containerRef}
      className={`prose-custom ${className}`}
      dangerouslySetInnerHTML={{ __html: htmlContent }}
    />
  );
} 