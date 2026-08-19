import React from 'react';
import { BankAccount, Language } from '../types/bank';
import { DetailRow } from './DetailRow';
import { CopyAllButton } from './CopyAllButton';
import { UI_STRINGS } from '../lib/constants';
import { ShieldCheck, CalendarCheck2 } from 'lucide-react';
import { BankLogo } from './BankLogo';

interface BankDetailsCardProps {
  account: BankAccount;
  lang: Language;
  onCopySuccess: (val: string) => void;
}

export const BankDetailsCard: React.FC<BankDetailsCardProps> = ({
  account,
  lang,
  onCopySuccess,
}) => {
  const strings = UI_STRINGS[lang];
  const isAr = lang === 'ar';

  const bankDisplayName = isAr
    ? (account.bankNameArabic || account.bankName)
    : account.bankName;

  const accountTypeDisplayName = isAr
    ? (account.accountTypeArabic || account.accountType || 'حساب معتمد')
    : (account.accountType || 'Current Account');

  return (
    <div
      id={`bank-card-${account.id}`}
      className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-5 sm:p-7 relative transition-all duration-200"
    >
      {/* Top Bank Header Bar with Bank Logo */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-5 border-b border-slate-100 gap-3">
        <div className="flex items-center gap-3.5">
          <BankLogo bankId={account.id} logoUrl={account.logoUrl} alt={bankDisplayName} size="lg" />
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg sm:text-xl font-bold text-slate-950 tracking-tight">
                {bankDisplayName}
              </h2>
              <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-bold bg-teal-50 text-[#003B3C] border border-teal-200/60">
                {account.currency}
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 font-medium mt-0.5">
              {accountTypeDisplayName}
            </p>
          </div>
        </div>

        {/* Verification stamp */}
        {account.lastVerifiedAt && (
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-50 border border-slate-200/60 text-slate-600 text-xs font-medium self-start sm:self-auto">
            <CalendarCheck2 className="w-3.5 h-3.5 text-emerald-600" />
            <span className="text-[11px]">
              {isAr ? 'سجل رسمي موثق' : 'Official Verified Record'}
            </span>
          </div>
        )}
      </div>

      {/* Financial Details Rows */}
      <div className="divide-y divide-slate-100">
        {/* Account Name in Arabic (First) */}
        {account.accountNameArabic && (
          <DetailRow
            label={strings.accountNameArabicLabel}
            value={account.accountNameArabic}
            canCopy={true}
            lang={lang}
            onCopySuccess={onCopySuccess}
            idPrefix="account-name-ar"
          />
        )}

        {/* Account Name in English (Second) */}
        {account.accountNameEnglish && (
          <DetailRow
            label={strings.accountName}
            value={account.accountNameEnglish}
            canCopy={true}
            lang={lang}
            onCopySuccess={onCopySuccess}
            idPrefix="account-name-en"
          />
        )}

        {/* Account Number */}
        <DetailRow
          label={strings.accountNumber}
          value={account.accountNumber}
          isMonospace={true}
          canCopy={true}
          lang={lang}
          onCopySuccess={onCopySuccess}
          idPrefix="account-number"
        />

        {/* IBAN */}
        <DetailRow
          label={strings.iban}
          value={account.iban}
          isMonospace={true}
          canCopy={true}
          lang={lang}
          onCopySuccess={onCopySuccess}
          idPrefix="iban"
          badge="International"
        />

        {/* SWIFT / BIC (omitted if not present) */}
        {account.swift && (
          <DetailRow
            label={strings.swiftBic}
            value={account.swift}
            isMonospace={true}
            canCopy={true}
            lang={lang}
            onCopySuccess={onCopySuccess}
            idPrefix="swift"
          />
        )}

        {/* Branch Code (omitted if not present) */}
        {account.branchCode && (
          <DetailRow
            label={strings.branchCode}
            value={account.branchCode}
            isMonospace={true}
            canCopy={true}
            lang={lang}
            onCopySuccess={onCopySuccess}
            idPrefix="branch-code"
          />
        )}

        {/* Branch Name (omitted if not present) */}
        {(account.branchName || account.branchNameArabic) && (
          <DetailRow
            label={strings.branchName}
            value={
              isAr
                ? (account.branchNameArabic || account.branchName || '')
                : (account.branchName || '')
            }
            canCopy={true}
            lang={lang}
            onCopySuccess={onCopySuccess}
            idPrefix="branch-name"
          />
        )}
      </div>

      {/* Copy All Button Container */}
      <div className="mt-6 pt-5 border-t border-slate-100">
        <CopyAllButton
          account={account}
          lang={lang}
          onCopySuccess={() => onCopySuccess(strings.toastCopiedAll)}
        />
      </div>

      {/* Sub-note with memo recommendation */}
      <div className="mt-4 flex items-start gap-2 text-xs text-slate-500 bg-slate-50/70 p-3 rounded-lg border border-slate-200/50">
        <ShieldCheck className="w-4 h-4 text-[#003B3C] shrink-0 mt-0.5" />
        <p className="leading-relaxed">
          <strong className="font-semibold text-slate-700">{strings.inboundTransferGuide}: </strong>
          {strings.inboundTransferTip}
        </p>
      </div>
    </div>
  );
};
