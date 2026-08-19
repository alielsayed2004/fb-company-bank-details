import React from 'react';
import { CopyButton } from './CopyButton';
import { Language } from '../types/bank';

interface DetailRowProps {
  label: string;
  value: string;
  secondaryValue?: string;
  isMonospace?: boolean;
  canCopy?: boolean;
  lang: Language;
  onCopySuccess?: (val: string) => void;
  idPrefix?: string;
  badge?: string;
}

export const DetailRow: React.FC<DetailRowProps> = ({
  label,
  value,
  secondaryValue,
  isMonospace = false,
  canCopy = true,
  lang,
  onCopySuccess,
  idPrefix = 'field',
  badge,
}) => {
  if (!value) return null;

  return (
    <div
      id={`row-${idPrefix}`}
      className="group py-3.5 border-b border-slate-100 last:border-b-0 flex flex-col sm:flex-row sm:items-center justify-between gap-2 transition-colors duration-100"
    >
      <div className="flex-1 min-w-0 pr-2 rtl:pr-0 rtl:pl-2">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-600">
            {label}
          </span>
          {badge && (
            <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-medium bg-slate-100 text-slate-600 border border-slate-200/60">
              {badge}
            </span>
          )}
        </div>

        <div className="flex flex-col">
          {/* Ensure exact LTR preservation for numbers and codes */}
          <span
            dir={isMonospace ? 'ltr' : undefined}
            className={`text-[15px] sm:text-base font-medium text-slate-900 select-all tracking-tight ${
              isMonospace
                ? 'font-mono text-slate-900 bg-slate-50/80 px-2 py-0.5 rounded border border-slate-200/60 inline-block w-fit max-w-full break-all'
                : 'text-slate-900 break-words'
            }`}
            style={{ fontVariantNumeric: 'tabular-nums' }}
          >
            {value}
          </span>

          {secondaryValue && (
            <span
              dir={lang === 'ar' ? 'rtl' : 'ltr'}
              className="text-xs text-slate-600 mt-0.5 font-medium"
            >
              {secondaryValue}
            </span>
          )}
        </div>
      </div>

      {canCopy && (
        <div className="self-end sm:self-center shrink-0 pt-1 sm:pt-0">
          <CopyButton
            valueToCopy={value}
            fieldLabel={label}
            lang={lang}
            onCopySuccess={onCopySuccess}
            size="sm"
          />
        </div>
      )}
    </div>
  );
};
