import React, { useMemo } from 'react';
import katex from 'katex';

export interface MathRendererProps {
  latex?: string;
  text?: string;
  displayMode?: boolean;
  className?: string;
}

function renderKatexSafe(math: string, displayMode: boolean): string {
  try {
    return katex.renderToString(math.trim(), {
      displayMode,
      throwOnError: false,
      strict: false,
    });
  } catch {
    return math;
  }
}

export const MathRenderer: React.FC<MathRendererProps> = ({
  latex,
  text,
  displayMode = false,
  className = '',
}) => {
  // If explicit latex is given
  const explicitHtml = useMemo(() => {
    if (latex !== undefined) {
      if (!latex) return '';
      return renderKatexSafe(latex, displayMode);
    }
    return null;
  }, [latex, displayMode]);

  // If text is given (may contain mixed text, $...$, and $$...$$)
  const textHtml = useMemo(() => {
    if (text === undefined) return null;
    if (!text) return '';

    // If the text starts and ends with $$...$$, render directly in display mode
    if (text.startsWith('$$') && text.endsWith('$$') && text.length > 4) {
      const math = text.slice(2, -2);
      return renderKatexSafe(math, true);
    }

    // Split text by $$...$$ and $...$
    // Regex matches $$...$$ or $...$
    const regex = /(\$\$[\s\S]+?\$\$|\$[^\$\n]+?\$)/g;
    const parts = text.split(regex);

    return parts
      .map((part) => {
        if (!part) return '';
        if (part.startsWith('$$') && part.endsWith('$$') && part.length > 4) {
          const inner = part.slice(2, -2);
          return renderKatexSafe(inner, true);
        }
        if (part.startsWith('$') && part.endsWith('$') && part.length > 2) {
          const inner = part.slice(1, -1);
          return renderKatexSafe(inner, false);
        }
        // Clean up markdown headers and bolding for plain text chunks
        let plain = part.replace(/^#{1,6}\s+/gm, ''); // Remove markdown '#' headers
        plain = plain.replace(/\*\*([^*]+?)\*\*/g, '<b>$1</b>'); // Normalize **bold** to <b>bold</b>

        // Escape general HTML safely
        const escaped = plain
          .replace(/&/g, '&amp;')
          .replace(/</g, '&lt;')
          .replace(/>/g, '&gt;')
          .replace(/\n/g, '<br/>');

        // Restore authorized bold tags for emphasis without markdown symbols
        return escaped
          .replace(/&lt;b&gt;(.*?)&lt;\/b&gt;/gi, '<strong class="font-semibold text-zinc-900 dark:text-zinc-100">$1</strong>')
          .replace(/&lt;strong&gt;(.*?)&lt;\/strong&gt;/gi, '<strong class="font-semibold text-zinc-900 dark:text-zinc-100">$1</strong>');
      })
      .join('');
  }, [text]);

  if (explicitHtml !== null) {
    if (!explicitHtml) return null;
    return (
      <span
        className={`inline-block font-sans ${
          displayMode ? 'my-2 text-center w-full overflow-x-auto py-1' : ''
        } ${className}`}
        dangerouslySetInnerHTML={{ __html: explicitHtml }}
      />
    );
  }

  if (textHtml !== null) {
    if (!textHtml) return null;
    return (
      <span
        className={`inline-block font-sans ${
          displayMode ? 'my-2 text-center w-full overflow-x-auto py-1' : ''
        } ${className}`}
        dangerouslySetInnerHTML={{ __html: textHtml }}
      />
    );
  }

  return null;
};
