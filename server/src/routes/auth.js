const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const rateLimit = require('express-rate-limit');
const db = require('../db');
const { requireAdmin, clean } = require('../middleware');

const router = express.Router();

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many login attempts. Try again in a few minutes.' },
});

router.post('/login', loginLimiter, async (req, res) => {
  const email = clean(req.body?.email, 200).toLowerCase();
  const password = typeof req.body?.password === 'string' ? req.body.password : '';
  if (!email || !password) return res.status(400).json({ error: 'Email and password are required.' });

  const { rows } = await db.query('SELECT * FROM admins WHERE email = $1', [email]);
  const admin = rows[0];
  // compare even when not found to keep timing similar
  const ok = await bcrypt.compare(password, admin?.password_hash || '$2a$10$invalidinvalidinvalidinvalidinvalidinvalidinvalidinvalidinv');
  if (!admin || !ok) return res.status(401).json({ error: 'Wrong email or password.' });

  const token = jwt.sign({ sub: admin.id, email: admin.email }, process.env.JWT_SECRET, { expiresIn: '7d' });
  res.json({ token, email: admin.email });
});

router.get('/me', requireAdmin, (req, res) => res.json({ email: req.admin.email }));

module.exports = router;
