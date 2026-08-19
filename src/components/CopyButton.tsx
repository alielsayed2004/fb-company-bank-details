import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';
import { copyToClipboard } from '../lib/clipboard';
import { Language } from '../types/bank';
import { UI_STRINGS } from '../lib/constants';

interface CopyButtonProps {
  valueToCopy: string;
  fieldLabel?: string;
  lang?: Language;
  onCopySuccess?: (copiedValue: string) => void;
  className?: string;
  size?: 'sm' | 'md';
}

export const CopyButton: React.FC<CopyButtonProps> = ({
  valueToCopy,
  fieldLabel = '',
  lang = 'en',
  onCopySuccess,
  className = '',
  size = 'md',
}) => {
  const [copied, setCopied] = useState(false);
  const strings = UI_STRINGS[lang];

  const handleCopy = async (e: React.MouseEvent) => {
    e.stopPropagation();
    const success = await copyToClipboard(valueToCopy);
    if (success) {
      setCopied(true);
      onCopySuccess?.(valueToCopy);
      setTimeout(() => {
        setCopied(false);
      }, 1800);
    }
  };

  const isSmall = size === 'sm';

  return (
    <button
      type="button"
      id={`copy-btn-${fieldLabel.toLowerCase().replace(/\s+/g, '-') || 'field'}`}
      onClick={handleCopy}
      aria-label={`${copied ? strings.copied : strings.copy} ${fieldLabel || valueToCopy}`}
      className={`inline-flex items-center justify-center gap-1.5 rounded-md font-medium transition-all duration-150 cursor-pointer active:scale-97 select-none shrink-0 ${
        isSmall ? 'px-2.5 py-1 text-xs' : 'px-3 py-1.5 text-xs'
      } ${
        copied
          ? 'bg-emerald-50 text-emerald-700 border border-emerald-300 font-semibold'
          : 'bg-slate-100 hover:bg-slate-200/80 text-slate-700 border border-slate-200/80 hover:text-slate-900 active:bg-slate-300/70'
      } ${className}`}
    >
      {copied ? (
        <>
          <Check className="w-3.5 h-3.5 text-emerald-600 animate-in fade-in" />
          <span className="leading-none">{strings.copied}</span>
        </>
      ) : (
        <>
          <Copy className="w-3.5 h-3.5 text-slate-500" />
          <span className="leading-none">{strings.copy}</span>
        </>
      )}
    </button>
  );
};
