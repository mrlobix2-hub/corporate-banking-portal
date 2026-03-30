const express = require('express');
const path = require('path');
const cors = require('cors');
const helmet = require('helmet');
const env = require('./config/env');
const { apiLimiter } = require('./middleware/rateLimiter');
const errorMiddleware = require('./middleware/errorMiddleware');
const notFoundMiddleware = require('./middleware/notFoundMiddleware');

const authRoutes = require('./routes/authRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes');
const accountRoutes = require('./routes/accountRoutes');
const transactionRoutes = require('./routes/transactionRoutes');
const exchangeRateRoutes = require('./routes/exchangeRateRoutes');
const settingsRoutes = require('./routes/settingsRoutes');
const receiptRoutes = require('./routes/receiptRoutes');
const exportRoutes = require('./routes/exportRoutes');

const app = express();
app.set('trust proxy', 1);
app.use(helmet());
app.use(cors({ origin: env.frontendUrl, credentials: true }));
app.use(express.json({ limit: '2mb' }));
app.use(express.urlencoded({ extended: true }));
app.use('/api', apiLimiter);
app.use('/uploads', express.static(path.resolve('uploads')));
app.get('/api/health', (_req, res) => res.json({ status: 'ok' }));
app.use('/api/auth', authRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/accounts', accountRoutes);
app.use('/api/transactions', transactionRoutes);
app.use('/api/exchange-rates', exchangeRateRoutes);
app.use('/api/settings', settingsRoutes);
app.use('/api/receipts', receiptRoutes);
app.use('/api/exports', exportRoutes);

if (env.nodeEnv === 'production') {
  const frontendDist = path.resolve(__dirname, '../frontend/dist');
  app.use(express.static(frontendDist));
  app.get('*', (req, res, next) => {
    if (req.path.startsWith('/api')) return next();
    res.sendFile(path.join(frontendDist, 'index.html'));
  });
}

app.use(notFoundMiddleware);
app.use(errorMiddleware);
module.exports = app;
