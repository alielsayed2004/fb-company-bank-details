import React from 'react';
import { CheckCircle2 } from 'lucide-react';
import { ToastMessage } from '../types/bank';

interface ToastProps {
  toast: ToastMessage | null;
}

export const Toast: React.FC<ToastProps> = ({ toast }) => {
  if (!toast) return null;

  return (
    <div
      id="toast-notification"
      role="status"
      aria-live="polite"
      className="fixed bottom-5 left-1/2 -translate-x-1/2 sm:left-auto sm:right-6 sm:translate-x-0 z-50 flex items-center gap-2 px-4 py-2.5 bg-slate-900 text-white rounded-xl shadow-lg text-xs sm:text-sm font-medium animate-in fade-in slide-in-from-bottom-3 duration-200"
    >
      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
      <span>{toast.message}</span>
    </div>
  );
};
