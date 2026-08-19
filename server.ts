import express, { Request, Response } from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { OFFICIAL_BANK_ACCOUNTS } from './src/lib/constants';

async function startServer() {
  const app = express();
  const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 5173;

  // Global security & JSON headers
  app.use(express.json());
  app.use((req, res, next) => {
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('X-Frame-Options', 'SAMEORIGIN');
    res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
    next();
  });

  // Health check endpoint
  app.get('/api/health', (req: Request, res: Response) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
  });

  // Static public assets (logos, images, etc.)
  app.use(express.static(path.join(process.cwd(), 'public')));

  // Read-only Public Bank Accounts API
  // Strictly READ-ONLY. No mutations permitted on public API.
  app.get('/api/bank-accounts', (req: Request, res: Response) => {
    // Return only active verified accounts
    const activeAccounts = OFFICIAL_BANK_ACCOUNTS.filter(acc => acc.isActive).sort(
      (a, b) => a.displayOrder - b.displayOrder
    );

    res.json({
      success: true,
      accounts: activeAccounts,
      meta: {
        portal: 'F.B Company — Official Bank Details Portal',
        company: 'F.B Company — Assets Management',
        companyArabic: 'شركة إف آند بي لإدارة الأصول',
        verifiedDate: '2026-08-15',
        readOnly: true,
      }
    });
  });

  // Vite development middleware vs production static serving
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req: Request, res: Response) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`F.B Company Bank Details Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch(err => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
