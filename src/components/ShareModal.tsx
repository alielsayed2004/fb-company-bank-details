import React, { useState } from 'react';
import { X, Copy, Check, QrCode, ExternalLink } from 'lucide-react';
import { Language } from '../types/bank';
import { UI_STRINGS } from '../lib/constants';
import { copyToClipboard } from '../lib/clipboard';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
}

export const ShareModal: React.FC<ShareModalProps> = ({
  isOpen,
  onClose,
  lang,
}) => {
  const [copied, setCopied] = useState(false);
  const strings = UI_STRINGS[lang];

  if (!isOpen) return null;

  const currentUrl = typeof window !== 'undefined' ? window.location.href : 'https://bank.fbcompany.com';

  const handleCopyLink = async () => {
    const success = await copyToClipboard(currentUrl);
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  // Generate an institutional QR SVG representation with brand color 003B3C
  const qrSvgUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(
    currentUrl
  )}&color=003B3C&bgcolor=FFFFFF&margin=2`;

  return (
    <div
      id="share-modal-overlay"
      role="dialog"
      aria-modal="true"
      aria-labelledby="share-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs animate-in fade-in duration-150"
      onClick={onClose}
    >
      <div
        id="share-modal-content"
        className="bg-white rounded-2xl border border-slate-200 shadow-xl max-w-sm w-full p-6 relative animate-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          aria-label={strings.close}
          className="absolute top-4 right-4 rtl:right-auto rtl:left-4 p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Title & Description */}
        <div className="text-center pt-2 pb-4">
          <div className="w-10 h-10 rounded-full bg-teal-50 text-[#003B3C] flex items-center justify-center mx-auto mb-3">
            <QrCode className="w-5 h-5" />
          </div>
          <h3 id="share-modal-title" className="text-base font-bold text-slate-900">
            {strings.shareModalTitle}
          </h3>
          <p className="text-xs text-slate-500 mt-1 leading-relaxed">
            {strings.shareModalSubtitle}
          </p>
        </div>

        {/* QR Code Container */}
        <div className="my-2 p-4 bg-slate-50 rounded-xl border border-slate-200/80 flex flex-col items-center justify-center">
          <div className="bg-white p-2.5 rounded-lg border border-slate-200/80 shadow-xs">
            <img
              src={qrSvgUrl}
              alt="Official Bank Details QR Code"
              width={160}
              height={160}
              className="w-40 h-40 object-contain rounded"
              referrerPolicy="no-referrer"
              loading="eager"
            />
          </div>
          <span className="text-[11px] font-medium text-slate-500 mt-2.5">
            {strings.qrCodeDesc}
          </span>
        </div>

        {/* Permanent URL Box & Copy */}
        <div className="mt-4 flex flex-col gap-2">
          <div className="flex items-center gap-2 p-2 bg-slate-100/80 rounded-lg border border-slate-200/70 text-xs font-mono text-slate-700 select-all truncate">
            <ExternalLink className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span className="truncate">{currentUrl}</span>
          </div>

          <button
            type="button"
            onClick={handleCopyLink}
            className={`w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg text-xs font-semibold transition-all cursor-pointer select-none ${
              copied
                ? 'bg-emerald-600 text-white'
                : 'bg-[#003B3C] hover:bg-[#002C2D] text-white'
            }`}
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-200" />
                <span>{strings.linkCopied}</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-teal-100" />
                <span>{strings.copyPortalLink}</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
