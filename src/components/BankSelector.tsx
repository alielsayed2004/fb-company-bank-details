import React from 'react';
import { BankAccount, Language } from '../types/bank';
import { CheckCircle } from 'lucide-react';
import { UI_STRINGS } from '../lib/constants';
import { BankLogo } from './BankLogo';

interface BankSelectorProps {
  accounts: BankAccount[];
  selectedAccountId: string;
  onSelectAccount: (id: string) => void;
  lang: Language;
}

export const BankSelector: React.FC<BankSelectorProps> = ({
  accounts,
  selectedAccountId,
  onSelectAccount,
  lang,
}) => {
  const strings = UI_STRINGS[lang];
  const isAr = lang === 'ar';

  return (
    <div id="bank-selector-container" className="my-5">
      <div className="flex items-center justify-between mb-3">
        <label className="text-xs font-bold uppercase tracking-wider text-slate-500">
          {strings.selectAccount}
        </label>
        <span className="text-xs text-slate-500 font-medium">
          {accounts.length} {strings.activeAccountsCount}
        </span>
      </div>

      <div
        role="tablist"
        aria-label={strings.selectAccount}
        className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-3"
      >
        {accounts.map((acc) => {
          const isSelected = acc.id === selectedAccountId;
          const bankDisplayName = isAr
            ? (acc.bankNameArabic || acc.bankName)
            : acc.bankName;
          const bankShortName = acc.bankShortName || acc.bankName;

          const accountTypeDisplayName = isAr
            ? (acc.accountTypeArabic || 'حساب جاري')
            : (acc.accountType || 'Current Account');

          return (
            <button
              key={acc.id}
              id={`bank-tab-${acc.id}`}
              role="tab"
              aria-selected={isSelected}
              tabIndex={isSelected ? 0 : -1}
              onClick={() => onSelectAccount(acc.id)}
              className={`p-3.5 sm:p-4 rounded-xl text-start transition-all duration-200 cursor-pointer border relative select-none flex flex-col justify-between ${
                isSelected
                  ? 'bg-[#003B3C] text-white border-[#003B3C] shadow-md ring-2 ring-[#003B3C]/25 translate-y-[-1px]'
                  : 'bg-white hover:bg-slate-50 text-slate-800 border-slate-200 hover:border-slate-300 shadow-xs'
              }`}
            >
              <div className="flex items-start justify-between gap-2 w-full">
                <div className="flex items-center gap-2.5 min-w-0">
                  <BankLogo bankId={acc.id} logoUrl={acc.logoUrl} alt={bankDisplayName} size="sm" />
                  <div className="min-w-0 flex-1">
                    <h3
                      className={`text-xs sm:text-[13px] font-bold tracking-tight leading-snug truncate ${
                        isSelected ? 'text-white' : 'text-slate-900'
                      }`}
                      title={bankDisplayName}
                    >
                      {bankShortName}
                    </h3>
                    <p
                      className={`text-[11px] mt-0.5 font-medium truncate ${
                        isSelected ? 'text-teal-100' : 'text-slate-500'
                      }`}
                    >
                      {acc.currency} • {accountTypeDisplayName}
                    </p>
                  </div>
                </div>

                {isSelected ? (
                  <div className="w-4 h-4 rounded-full bg-white/20 flex items-center justify-center shrink-0 mt-0.5">
                    <CheckCircle className="w-3.5 h-3.5 text-white" />
                  </div>
                ) : (
                  <div className="w-3.5 h-3.5 rounded-full border border-slate-300 shrink-0 mt-1" />
                )}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
