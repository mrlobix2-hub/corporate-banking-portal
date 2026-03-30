const app = require('./app');
const env = require('./config/env');
const db = require('./config/db');

(async () => {
  try {
    await db.query('SELECT 1');
    app.listen(env.port, () => console.log(`Backend chal raha hai on port ${env.port}`));
  } catch (error) {
    console.error('Server start nahi ho saka:', error.message);
    process.exit(1);
  }
})();
