import React from 'react';
import { CompanyLogo } from './CompanyLogo';
import { QrCode } from 'lucide-react';

interface HeaderProps {
  onOpenShare: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenShare }) => {
  return (
    <header
      id="portal-header"
      className="w-full bg-white/95 backdrop-blur-xs border-b border-slate-200/80 sticky top-0 z-40"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Left: Official F.B Company Logo & Identity */}
        <div className="flex items-center gap-3">
          <CompanyLogo size="sm" color="#003B3C" />
          <div className="flex items-center gap-2">
            <span className="text-sm font-bold text-slate-950 tracking-tight leading-none">
              F.B COMPANY
            </span>
            <span className="text-[11px] text-slate-400 select-none">
              •
            </span>
            <span className="text-[11px] text-slate-500 font-medium tracking-wide uppercase">
              Assets Management
            </span>
          </div>
        </div>

        {/* Right: Share / QR Button */}
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            type="button"
            id="header-share-btn"
            onClick={onOpenShare}
            aria-label="Share / QR Code"
            className="px-3 py-1.5 rounded-lg text-slate-700 hover:text-slate-900 bg-slate-100 hover:bg-slate-200/70 border border-slate-200 text-xs font-semibold inline-flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <QrCode className="w-3.5 h-3.5 text-slate-700" />
            <span>Share / QR</span>
          </button>
        </div>
      </div>
    </header>
  );
};
