import { BankAccount, Language } from '../types/bank';

/**
 * Formats a clean, professional transfer details text block
 * for one-click copying to emails, ERPs, or chats.
 * Never outputs 'undefined' or 'N/A'.
 */
export function formatTransferDetails(account: BankAccount, lang: Language = 'en'): string {
  const isAr = lang === 'ar';
  const lines: string[] = [];

  if (isAr) {
    lines.push('شركة إف آند بي لإدارة الأصول');
    lines.push('F.B Company — Assets Management');
    lines.push('بيانات التحويل البنكي الرسمية');
    lines.push('----------------------------------------');

    if (account.bankNameArabic || account.bankName) {
      lines.push(`البنك: ${account.bankNameArabic || account.bankName}`);
    }
    if (account.currency) {
      lines.push(`العملة: ${account.currency}`);
    }
    if (account.accountTypeArabic || account.accountType) {
      lines.push(`نوع الحساب: ${account.accountTypeArabic || account.accountType}`);
    }

    lines.push('');

    if (account.accountNameArabic) {
      lines.push('اسم الحساب (بالعربية):');
      lines.push(account.accountNameArabic);
    }
    if (account.accountNameEnglish) {
      lines.push('اسم الحساب (بالإنجليزية):');
      lines.push(account.accountNameEnglish);
    }

    lines.push('');
    lines.push('رقم الحساب:');
    lines.push(account.accountNumber);

    lines.push('');
    lines.push('رقم الحساب الدولي (IBAN):');
    lines.push(account.iban);

    if (account.swift) {
      lines.push('');
      lines.push('رمز السويفت (SWIFT / BIC):');
      lines.push(account.swift);
    }

    if (account.branchCode) {
      lines.push('');
      lines.push('كود الفرع:');
      lines.push(account.branchCode);
    }

    if (account.branchNameArabic || account.branchName) {
      lines.push('');
      lines.push(`اسم الفرع: ${account.branchNameArabic || account.branchName}`);
    }

    lines.push('----------------------------------------');
    lines.push('ملاحظة: هذه البيانات معتمدة للتحويلات البنكية الواردة فقط.');
  } else {
    lines.push('F.B Company — Assets Management');
    lines.push('شركة إف آند بي لإدارة الأصول');
    lines.push('Official Bank Transfer Details');
    lines.push('----------------------------------------');

    lines.push(`Bank: ${account.bankName}`);
    lines.push(`Currency: ${account.currency}`);
    if (account.accountType) {
      lines.push(`Account Type: ${account.accountType}`);
    }

    lines.push('');

    if (account.accountNameEnglish) {
      lines.push('Account Name (English):');
      lines.push(account.accountNameEnglish);
    }
    if (account.accountNameArabic) {
      lines.push('Account Name (Arabic):');
      lines.push(account.accountNameArabic);
    }

    lines.push('');
    lines.push('Account Number:');
    lines.push(account.accountNumber);

    lines.push('');
    lines.push('IBAN:');
    lines.push(account.iban);

    if (account.swift) {
      lines.push('');
      lines.push('SWIFT / BIC:');
      lines.push(account.swift);
    }

    if (account.branchCode) {
      lines.push('');
      lines.push('Branch Code:');
      lines.push(account.branchCode);
    }

    if (account.branchName) {
      lines.push('');
      lines.push(`Branch Name: ${account.branchName}`);
    }

    lines.push('----------------------------------------');
    lines.push('Notice: For inbound bank transfers only.');
  }

  return lines.join('\n');
}
