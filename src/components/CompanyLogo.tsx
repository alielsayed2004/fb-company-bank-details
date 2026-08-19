import React, { useState } from 'react';

interface CompanyLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  src?: string;
  alt?: string;
}

export const CompanyLogo: React.FC<CompanyLogoProps> = ({
  className = '',
  size = 'md',
  src = '/fb-logo.png',
  alt = 'F.B Company Logo',
}) => {
  const [hasError, setHasError] = useState(false);

  const sizeClasses = {
    sm: 'w-9 h-9 rounded-lg',
    md: 'w-12 h-12 rounded-xl',
    lg: 'w-16 h-16 sm:w-20 sm:h-20 rounded-2xl',
    xl: 'w-24 h-24 sm:w-28 sm:h-28 rounded-2xl',
  }[size];

  if (hasError || !src) {
    return (
      <div
        className={`flex items-center justify-center bg-[#003B3C] text-white font-extrabold tracking-wider shadow-xs select-none shrink-0 ${sizeClasses} ${className}`}
      >
        <span className={size === 'sm' ? 'text-xs' : size === 'md' ? 'text-sm' : 'text-xl'}>
          F.B
        </span>
      </div>
    );
  }

  return (
    <div
      className={`relative flex items-center justify-center bg-white border border-slate-200/90 shadow-xs overflow-hidden shrink-0 ${sizeClasses} ${className}`}
      title={alt}
    >
      <img
        src={src}
        alt={alt}
        className="w-full h-full object-contain p-1"
        onError={() => setHasError(true)}
        loading="eager"
      />
    </div>
  );
};
