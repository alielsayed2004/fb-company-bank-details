import React from 'react';
import { Language } from '../types/bank';
import { UI_STRINGS } from '../lib/constants';
import { ShieldCheck } from 'lucide-react';

interface FooterProps {
  lang: Language;
}

export const Footer: React.FC<FooterProps> = ({ lang }) => {
  const strings = UI_STRINGS[lang];
  const isAr = lang === 'ar';

  return (
    <footer
      id="portal-footer"
      className="mt-12 py-8 border-t border-slate-200/80 bg-slate-50/50 text-slate-500 text-xs"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-start">
        <div className="flex flex-col gap-0.5">
          <div className="flex items-center justify-center sm:justify-start gap-2">
            <span className="font-bold text-slate-800 tracking-tight">
              {isAr ? 'شركة إف آند بي لإدارة الأصول' : 'F.B Company'}
            </span>
            <span className="text-slate-300">•</span>
            <span className="text-slate-600 font-medium">{strings.portalBadge}</span>
          </div>
          <p className="text-[11px] text-slate-400">
            {strings.footerRights}
          </p>
        </div>

        <div className="flex items-center gap-1.5 text-[11px] text-slate-400 bg-white px-2.5 py-1 rounded-md border border-slate-200/70">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
          <span>{strings.footerUpdated}</span>
        </div>
      </div>
    </footer>
  );
};
