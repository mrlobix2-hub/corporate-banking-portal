const db = require('../config/db');
const env = require('../config/env');
const { hashPassword } = require('../utils/password');

(async () => {
  try {
    const existing = await db.query('SELECT id FROM users WHERE username = $1', [env.defaultUsername]);
    if (existing.rows[0]) {
      console.log('Default admin already mojood hai');
      process.exit(0);
    }
    const hash = await hashPassword(env.defaultPassword);
    await db.query(
      `INSERT INTO users (username, password_hash, full_name, email, must_change_password)
       VALUES ($1,$2,$3,$4,TRUE)`,
      [env.defaultUsername, hash, 'Raja Zahid Hussain', 'admin@example.com']
    );
    console.log('Default admin create ho gaya');
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
})();
