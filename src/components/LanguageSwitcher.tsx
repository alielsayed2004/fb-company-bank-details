import React from 'react';
import { Language } from '../types/bank';
import { Globe } from 'lucide-react';

interface LanguageSwitcherProps {
  currentLang: Language;
  onLanguageChange: (lang: Language) => void;
}

export const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({
  currentLang,
  onLanguageChange,
}) => {
  return (
    <div
      id="language-switcher"
      className="inline-flex items-center gap-1 p-1 bg-slate-100/90 rounded-lg border border-slate-200/80 text-xs font-semibold text-slate-600"
      role="group"
      aria-label="Language selection"
    >
      <Globe className="w-3.5 h-3.5 text-slate-500 mx-1 shrink-0" aria-hidden="true" />
      <button
        type="button"
        id="lang-btn-ar"
        onClick={() => onLanguageChange('ar')}
        className={`px-2 py-0.5 rounded text-xs font-bold transition-all duration-150 cursor-pointer uppercase ${
          currentLang === 'ar'
            ? 'bg-[#003B3C] text-white shadow-xs'
            : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
        }`}
        aria-pressed={currentLang === 'ar'}
      >
        AR
      </button>
      <span className="text-slate-300 select-none text-xs">|</span>
      <button
        type="button"
        id="lang-btn-en"
        onClick={() => onLanguageChange('en')}
        className={`px-2 py-0.5 rounded text-xs font-bold transition-all duration-150 cursor-pointer uppercase ${
          currentLang === 'en'
            ? 'bg-[#003B3C] text-white shadow-xs'
            : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
        }`}
        aria-pressed={currentLang === 'en'}
      >
        EN
      </button>
    </div>
  );
};
