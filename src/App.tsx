import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { CompanyIdentity } from './components/CompanyIdentity';
import { BankSelector } from './components/BankSelector';
import { BankDetailsCard } from './components/BankDetailsCard';
import { SecurityNotice } from './components/SecurityNotice';
import { Footer } from './components/Footer';
import { ShareModal } from './components/ShareModal';
import { Toast } from './components/Toast';
import { SheetsDirectory } from './components/SheetsDirectory';
import { BankAccount, ToastMessage } from './types/bank';
import { OFFICIAL_BANK_ACCOUNTS, UI_STRINGS } from './lib/constants';

export default function App() {
  const lang = 'en';
  const strings = UI_STRINGS.en;
  const [accounts, setAccounts] = useState<BankAccount[]>(OFFICIAL_BANK_ACCOUNTS);
  const [selectedAccountId, setSelectedAccountId] = useState<string>(
    OFFICIAL_BANK_ACCOUNTS[0]?.id || 'fb-qnb-egp'
  );
  const [toast, setToast] = useState<ToastMessage | null>(null);
  const [isShareModalOpen, setIsShareModalOpen] = useState<boolean>(false);
  const [currentView, setCurrentView] = useState<'bank' | 'sheets'>('bank');

  // Set document language, LTR direction and English title
  useEffect(() => {
    document.documentElement.lang = 'en';
    document.documentElement.dir = 'ltr';
    document.title = 'Official Portal | F.B Company';
  }, []);

  // Fetch accounts from API with fallback to built-in verified constant
  useEffect(() => {
    async function loadAccounts() {
      try {
        const res = await fetch('/api/bank-accounts');
        if (res.ok) {
          const data = await res.json();
          if (data.accounts && Array.isArray(data.accounts) && data.accounts.length > 0) {
            setAccounts(data.accounts);
          }
        }
      } catch {
        console.debug('Loaded offline bank accounts constant');
      }
    }
    loadAccounts();
  }, []);

  const showToast = (message: string) => {
    const newToast: ToastMessage = {
      id: Date.now().toString(),
      message,
    };
    setToast(newToast);

    // Auto dismiss after 2.2 seconds
    setTimeout(() => {
      setToast((current) => (current?.id === newToast.id ? null : current));
    }, 2200);
  };

  const handleCopySuccess = (copiedText: string) => {
    const isFullBlock = copiedText.includes('\n');
    showToast(isFullBlock ? strings.toastCopiedAll : strings.toastCopiedField);
  };

  const selectedAccount =
    accounts.find((acc) => acc.id === selectedAccountId) || accounts[0];

  return (
    <div className="min-h-screen flex flex-col bg-[#FDFDFD] text-slate-900 selection:bg-[#003B3C]/15 selection:text-[#003B3C] font-sans antialiased">
      {/* Header with Monogram, Nav & Share Button */}
      <Header 
        onOpenShare={() => setIsShareModalOpen(true)} 
        currentView={currentView}
        onViewChange={setCurrentView}
      />

      {/* Main Container */}
      <main className="flex-1 w-full max-w-4xl mx-auto px-4 sm:px-6">
        {currentView === 'bank' ? (
          <>
            {/* Institutional Identity */}
            <CompanyIdentity lang={lang} />

            {/* Bank Account Selector Tabs / Cards */}
            {accounts.length > 1 && (
              <BankSelector
                accounts={accounts}
                selectedAccountId={selectedAccountId}
                onSelectAccount={setSelectedAccountId}
                lang={lang}
              />
            )}

            {/* Selected Bank Details Card */}
            {selectedAccount && (
              <BankDetailsCard
                account={selectedAccount}
                lang={lang}
                onCopySuccess={handleCopySuccess}
              />
            )}

            {/* Security & Inbound Transfer Notice */}
            <SecurityNotice lang={lang} />
          </>
        ) : (
          <SheetsDirectory />
        )}
      </main>

      {/* Institutional Minimal Footer */}
      <Footer lang={lang} />

      {/* Share / QR Modal */}
      <ShareModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        lang={lang}
      />

      {/* Toast Notification */}
      <Toast toast={toast} />
    </div>
  );
}
