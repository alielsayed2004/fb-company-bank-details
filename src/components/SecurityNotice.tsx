import React from 'react';
import { ShieldAlert } from 'lucide-react';
import { Language } from '../types/bank';
import { UI_STRINGS } from '../lib/constants';

interface SecurityNoticeProps {
  lang: Language;
}

export const SecurityNotice: React.FC<SecurityNoticeProps> = ({ lang }) => {
  const strings = UI_STRINGS[lang];

  return (
    <aside
      id="security-verification-notice"
      aria-label={strings.securityNoticeTitle}
      className="my-6 p-4 rounded-xl bg-slate-50 border border-slate-200 text-slate-600 transition-colors"
    >
      <div className="flex items-start gap-3">
        <div className="w-6 h-6 rounded-md bg-slate-200/80 flex items-center justify-center shrink-0 mt-0.5 text-slate-700">
          <ShieldAlert className="w-3.5 h-3.5" aria-hidden="true" />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-xs font-semibold text-slate-900 uppercase tracking-wider mb-1 flex items-center gap-2">
            <span>{strings.securityNoticeTitle}</span>
            <span className="inline-block w-1 h-1 rounded-full bg-slate-400" />
            <span className="text-[11px] text-slate-500 font-normal">
              {strings.securityInboundOnly}
            </span>
          </h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            {strings.securityNoticeText}
          </p>
        </div>
      </div>
    </aside>
  );
};
