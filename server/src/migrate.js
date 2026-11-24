require('dotenv').config();
const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs');
const db = require('./db');

(async () => {
  try {
    const sql = fs.readFileSync(path.join(__dirname, '..', 'schema.sql'), 'utf8');
    await db.query(sql);
    console.log('✔ Tables are ready');

    const email = (process.env.ADMIN_EMAIL || '').trim().toLowerCase();
    const password = process.env.ADMIN_PASSWORD || '';
    if (!email || password.length < 8) {
      console.warn('! Set ADMIN_EMAIL and an ADMIN_PASSWORD (8+ chars) in .env, then run migrate again to create the admin login.');
    } else {
      const hash = await bcrypt.hash(password, 12);
      await db.query(
        `INSERT INTO admins (email, password_hash) VALUES ($1, $2)
         ON CONFLICT (email) DO UPDATE SET password_hash = EXCLUDED.password_hash`,
        [email, hash]
      );
      console.log(`✔ Admin login ready for ${email}`);
    }
  } catch (err) {
    console.error('Migration failed:', err.message);
    process.exitCode = 1;
  } finally {
    await db.pool.end();
  }
})();
