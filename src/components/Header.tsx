import React from 'react';
import { CompanyLogo } from './CompanyLogo';
import { QrCode, Link as LinkIcon, Building2 } from 'lucide-react';

interface HeaderProps {
  onOpenShare: () => void;
  currentView: 'bank' | 'sheets';
  onViewChange: (view: 'bank' | 'sheets') => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenShare, currentView, onViewChange }) => {
  return (
    <header
      id="portal-header"
      className="w-full bg-white/95 backdrop-blur-xs border-b border-slate-200/80 sticky top-0 z-40"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Left: Official F.B Company Logo & Identity */}
        <div className="flex items-center gap-3">
          <CompanyLogo size="sm" color="#003B3C" />
          <div className="hidden md:flex items-center gap-2">
            <span className="text-sm font-bold text-slate-950 tracking-tight leading-none">
              F.B COMPANY
            </span>
            <span className="text-[11px] text-slate-400 select-none">
              •
            </span>
            <span className="text-[11px] text-slate-500 font-medium tracking-wide uppercase">
              Portal
            </span>
          </div>
        </div>

        {/* Center: Navigation */}
        <div className="flex items-center gap-1 bg-slate-100/80 p-1 rounded-lg border border-slate-200/50">
          <button
            onClick={() => onViewChange('bank')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-md flex items-center gap-1.5 transition-all ${
              currentView === 'bank'
                ? 'bg-white text-slate-900 shadow-sm border border-slate-200/50'
                : 'text-slate-500 hover:text-slate-700 hover:bg-slate-200/50'
            }`}
          >
            <Building2 className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Bank Details</span>
            <span className="sm:hidden">Bank</span>
          </button>
          <button
            onClick={() => onViewChange('sheets')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-md flex items-center gap-1.5 transition-all ${
              currentView === 'sheets'
                ? 'bg-white text-slate-900 shadow-sm border border-slate-200/50'
                : 'text-slate-500 hover:text-slate-700 hover:bg-slate-200/50'
            }`}
          >
            <LinkIcon className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Sheets & Links</span>
            <span className="sm:hidden">Sheets</span>
          </button>
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
            <span className="hidden sm:inline">Share / QR</span>
          </button>
        </div>
      </div>
    </header>
  );
};
