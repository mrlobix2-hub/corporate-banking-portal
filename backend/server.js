const app = require('./app');
const env = require('./config/env');
const db = require('./config/db');
require('./scripts/seedAdmin');

async function start() {
  try {
    console.log('Starting backend...');
    console.log('NODE_ENV:', env.nodeEnv);
    console.log('PORT:', env.port);
    console.log('DATABASE_URL exists:', Boolean(env.databaseUrl));
    console.log('JWT_SECRET exists:', Boolean(env.jwtSecret));

    await db.query('SELECT 1');

    app.listen(env.port, '0.0.0.0', () => {
      console.log(`Backend running on port ${env.port}`);
    });
  } catch (error) {
    console.error('Server start nahi ho saka:');
    console.error('Message:', error?.message || error);
    console.error('Stack:', error?.stack || 'No stack available');
    process.exit(1);
  }
}

start();
