export interface BankAccount {
  id: string;
  bankName: string;
  bankNameArabic?: string;
  bankShortName: string;
  accountNameEnglish?: string;
  accountNameArabic?: string;
  accountNumber: string;
  iban: string;
  swift?: string;
  branchCode?: string;
  branchName?: string;
  branchNameArabic?: string;
  currency: string;
  accountType?: string;
  accountTypeArabic?: string;
  isActive: boolean;
  displayOrder: number;
  logoUrl?: string;
  lastVerifiedAt?: string;
  verifiedBy?: string;
  verificationDocRef?: string;
  notes?: string;
}

export type Language = 'en' | 'ar';

export interface ToastMessage {
  id: string;
  message: string;
  messageArabic?: string;
  type?: 'success' | 'info' | 'error';
}

export interface BankApiResponse {
  success: boolean;
  accounts: BankAccount[];
  meta: {
    portal: string;
    company: string;
    companyArabic: string;
    verifiedDate: string;
    readOnly: boolean;
  };
}
