const path = require('path');
const dotenv = require('dotenv');
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

module.exports = {
  nodeEnv: process.env.NODE_ENV || 'development',
  port: Number(process.env.PORT || 5000),
  frontendUrl: process.env.FRONTEND_URL || 'http://localhost:5173',
  databaseUrl: process.env.DATABASE_URL,
  jwtSecret: process.env.JWT_SECRET || 'change_this_secret',
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || '8h',
  bcryptRounds: Number(process.env.BCRYPT_ROUNDS || 12),
  uploadDir: process.env.UPLOAD_DIR || 'uploads/receipts',
  defaultUsername: process.env.DEFAULT_USERNAME || 'MFCB0329',
  defaultPassword: process.env.DEFAULT_PASSWORD || 'Ipconfig786@aaa'
};
