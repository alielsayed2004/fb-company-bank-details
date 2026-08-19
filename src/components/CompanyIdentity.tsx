import React from 'react';
import { Language } from '../types/bank';
import { UI_STRINGS } from '../lib/constants';
import { CompanyLogo } from './CompanyLogo';

interface CompanyIdentityProps {
  lang: Language;
}

export const CompanyIdentity: React.FC<CompanyIdentityProps> = ({ lang }) => {
  const strings = UI_STRINGS[lang];

  return (
    <div id="company-identity" className="pt-6 sm:pt-8 pb-5 text-center sm:text-start">
      {/* Corporate Logo & Hierarchical Split Title */}
      <div className="flex flex-col sm:flex-row items-center sm:items-center gap-4 sm:gap-5">
        <CompanyLogo size="lg" className="shrink-0" />
        <div className="flex flex-col justify-center gap-0.5 sm:gap-1">
          {/* Top Line: Bold Company Name */}
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#003B3C] font-serif-heading leading-tight">
            F.B COMPANY
          </h1>
          {/* Bottom Line: Subtitle with contrast in size, weight, and tracking */}
          <p className="text-xs sm:text-sm font-semibold tracking-[0.22em] text-[#003B3C]/75 uppercase">
            FOR ASSETS MANAGEMENT
          </p>
        </div>
      </div>

      {/* Purpose Subtitle */}
      <div className="mt-4 max-w-2xl">
        <h2 className="text-sm sm:text-base font-semibold text-slate-800">
          {strings.pageTitle}
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 mt-1 leading-relaxed">
          {strings.pageSubtitle}
        </p>
      </div>
    </div>
  );
};
