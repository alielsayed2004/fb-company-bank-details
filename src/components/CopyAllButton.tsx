import React, { useState } from 'react';
import { CopyCheck, Check } from 'lucide-react';
import { copyToClipboard } from '../lib/clipboard';
import { formatTransferDetails } from '../lib/format-transfer';
import { BankAccount, Language } from '../types/bank';
import { UI_STRINGS } from '../lib/constants';

interface CopyAllButtonProps {
  account: BankAccount;
  lang: Language;
  onCopySuccess?: (formattedText: string) => void;
}

export const CopyAllButton: React.FC<CopyAllButtonProps> = ({
  account,
  lang,
  onCopySuccess,
}) => {
  const [copied, setCopied] = useState(false);
  const strings = UI_STRINGS[lang];

  const handleCopyAll = async () => {
    const textToCopy = formatTransferDetails(account, lang);
    const success = await copyToClipboard(textToCopy);
    if (success) {
      setCopied(true);
      onCopySuccess?.(textToCopy);
      setTimeout(() => {
        setCopied(false);
      }, 2000);
    }
  };

  return (
    <button
      type="button"
      id="btn-copy-all-transfer-details"
      onClick={handleCopyAll}
      aria-label={copied ? strings.copiedAll : strings.copyAll}
      className={`w-full flex items-center justify-center gap-2.5 py-3.5 px-5 rounded-xl text-sm font-semibold transition-all duration-150 cursor-pointer shadow-xs active:scale-[0.99] select-none ${
        copied
          ? 'bg-emerald-600 text-white shadow-emerald-900/10'
          : 'bg-[#003B3C] hover:bg-[#002C2D] text-white shadow-slate-900/10'
      }`}
    >
      {copied ? (
        <>
          <Check className="w-4 h-4 text-emerald-200" />
          <span>{strings.copiedAll}</span>
        </>
      ) : (
        <>
          <CopyCheck className="w-4 h-4 text-teal-100" />
          <span>{strings.copyAll}</span>
        </>
      )}
    </button>
  );
};
