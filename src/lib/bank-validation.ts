/**
 * Structural IBAN validation and verification utility.
 * Specifically handles Egyptian IBAN specifications (29 alphanumeric characters).
 */

export interface IbanValidationResult {
  isValid: boolean;
  countryCode?: string;
  checksum?: string;
  bankCode?: string;
  branchCode?: string;
  accountNumber?: string;
  error?: string;
}

/**
 * Validates an IBAN using ISO 7064 Mod-97-10 algorithm.
 * Note: Algorithmic validity does not replace institutional bank document verification.
 */
export function validateIban(ibanRaw: string): IbanValidationResult {
  if (!ibanRaw) {
    return { isValid: false, error: 'IBAN is empty' };
  }

  // Remove whitespace and convert to uppercase for validation ONLY (stored value remains unmodified)
  const cleanIban = ibanRaw.replace(/\s+/g, '').toUpperCase();

  // Egyptian IBAN format: EG + 2 digits + 4 digits bank + 4 digits branch + 17 digits account = 29 chars
  if (cleanIban.startsWith('EG')) {
    if (cleanIban.length !== 29) {
      return {
        isValid: false,
        error: `Egyptian IBAN must be exactly 29 characters long (got ${cleanIban.length})`
      };
    }
  } else if (cleanIban.length < 15 || cleanIban.length > 34) {
    return {
      isValid: false,
      error: `Invalid IBAN length (${cleanIban.length})`
    };
  }

  // Mod-97 check: Move first 4 characters to end
  const rearranged = cleanIban.slice(4) + cleanIban.slice(0, 4);

  // Convert letters to digits (A = 10, B = 11, ..., Z = 35)
  let numericString = '';
  for (let i = 0; i < rearranged.length; i++) {
    const char = rearranged[i];
    const code = char.charCodeAt(0);
    if (code >= 65 && code <= 90) {
      numericString += (code - 55).toString();
    } else if (code >= 48 && code <= 57) {
      numericString += char;
    } else {
      return { isValid: false, error: 'IBAN contains invalid characters' };
    }
  }

  // Large integer modulo 97 using piece-wise division
  let remainder = 0;
  for (let i = 0; i < numericString.length; i += 7) {
    const block = remainder.toString() + numericString.substring(i, i + 7);
    remainder = parseInt(block, 10) % 97;
  }

  const isValid = remainder === 1;

  return {
    isValid,
    countryCode: cleanIban.slice(0, 2),
    checksum: cleanIban.slice(2, 4),
    bankCode: cleanIban.slice(4, 8),
    branchCode: cleanIban.slice(8, 12),
    accountNumber: cleanIban.slice(12),
    error: isValid ? undefined : 'Checksum verification failed'
  };
}
