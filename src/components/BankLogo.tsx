import React, { useState } from 'react';

interface BankLogoProps {
  bankId: string;
  logoUrl?: string;
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  alt?: string;
}

const DEFAULT_BANK_LOGOS: Record<string, string> = {
  'fb-qnb-egp': '/qnb-logo.jpg',
  'qnb': '/qnb-logo.jpg',
  'fb-nbe-egp': '/nbe-logo.jpg',
  'nbe': '/nbe-logo.jpg',
  'fb-misr-egp': '/misr-logo.jpg',
  'banque-misr': '/misr-logo.jpg',
  'misr': '/misr-logo.jpg',
};

const BANK_INITIALS: Record<string, string> = {
  'fb-qnb-egp': 'QNB',
  'qnb': 'QNB',
  'fb-nbe-egp': 'NBE',
  'nbe': 'NBE',
  'fb-misr-egp': 'MISR',
  'banque-misr': 'MISR',
  'misr': 'MISR',
};

export const BankLogo: React.FC<BankLogoProps> = ({
  bankId,
  logoUrl,
  className = '',
  size = 'md',
  alt = 'Bank Logo',
}) => {
  const [hasError, setHasError] = useState(false);

  const sizeClasses = {
    sm: 'w-8 h-8 rounded-lg',
    md: 'w-10 h-10 rounded-xl',
    lg: 'w-14 h-14 rounded-xl',
    xl: 'w-16 h-16 rounded-2xl',
  }[size];

  const imageSrc = logoUrl || DEFAULT_BANK_LOGOS[bankId];
  const initials = BANK_INITIALS[bankId] || bankId.toUpperCase().slice(0, 4);

  if (hasError || !imageSrc) {
    return (
      <div
        className={`flex items-center justify-center bg-slate-800 text-white font-bold text-xs tracking-wider border border-slate-700 select-none shrink-0 shadow-xs ${sizeClasses} ${className}`}
      >
        <span>{initials}</span>
      </div>
    );
  }

  return (
    <div
      className={`relative flex items-center justify-center bg-white p-1 border border-slate-200/90 shadow-xs shrink-0 overflow-hidden ${sizeClasses} ${className}`}
      title={alt}
    >
      <img
        src={imageSrc}
        alt={alt}
        className="w-full h-full object-contain"
        onError={() => setHasError(true)}
        loading="eager"
      />
    </div>
  );
};
