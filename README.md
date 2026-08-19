# F.B Company — Official Bank Details Portal
### شركة إف آند بي لإدارة الأصول

An official, verified, read-only institutional bank transfer details portal for **F.B Company**.

---

## 🏛 Purpose & Architecture

This application is designed specifically for receiving inbound bank transfers from clients, tenants, vendors, and business partners. It communicates **trust, precision, institutional credibility, and speed**.

- **Read-Only API**: Public users can only read verified bank records (`GET /api/bank-accounts`).
- **Zero Banking Credentials**: Never asks for credentials, passwords, PINs, or OTPs.
- **Permanent Canonical URL**: Optimized for QR codes and NFC business cards without needing physical re-issuance upon account updates.
- **Bilingual & Bi-directional**: Full English (LTR) and Arabic (RTL) support with LTR preservation for IBAN, SWIFT, and Account Numbers.
- **Instant Precision Copy**: Single-click field copy and "Copy All Transfer Details" formatted cleanly for invoices and ERP memos.

---

## 🛠 Technology Stack

- **Frontend**: React 19, TypeScript, Tailwind CSS v4, Lucide Icons
- **Backend / API**: Express 4 / Node.js
- **Tooling**: Vite 6, esbuild, tsx
- **Validation**: ISO 7064 Mod-97 IBAN structural verification

---

## 🔐 Security & Governance

1. **Read-Only Enforcement**: Public endpoints cannot modify data.
2. **Security Headers**: HSTS, CSP, X-Content-Type-Options (`nosniff`), X-Frame-Options (`SAMEORIGIN`), Referrer-Policy configured.
3. **Data Verification**: All accounts are timestamped and tagged with internal compliance references.

---

## 📋 Production Verification Checklist

Prior to final production deployment:
- [x] QNB candidate data documented with verification note
- [x] Secondary Corporate Account EGP verified
- [x] LTR preserved across RTL Arabic layout
- [x] Clipboard fallback verified for mobile and restricted browsers
- [x] Responsive layout tested for 320px up to 4K displays
