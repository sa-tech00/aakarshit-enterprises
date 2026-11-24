const express = require('express');
const rateLimit = require('express-rate-limit');
const db = require('../db');
const { requireAdmin, clean } = require('../middleware');
const { sendEnquiryMail } = require('../mailer');

const router = express.Router();
const STATUSES = ['new', 'contacted', 'in_progress', 'closed'];

const submitLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  limit: 8,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many enquiries from this connection. Please call us instead.' },
});

/* ---------- Public: submit an enquiry ---------- */
router.post('/', submitLimiter, async (req, res) => {
  const b = req.body || {};

  // honeypot – real users never fill this hidden field
  if (b.website) return res.status(201).json({ ok: true });

  const name = clean(b.name, 100);
  const mobile = clean(b.mobile, 20);
  const company = clean(b.company, 150);
  const service = clean(b.service, 120);
  const message = clean(b.message, 2000);

  const errors = {};
  if (name.length < 2) errors.name = 'Please enter your name.';
  if (!/^\+?[0-9][0-9\s-]{8,14}$/.test(mobile)) errors.mobile = 'Enter a valid mobile number.';
  if (message.length < 5) errors.message = 'Please tell us a little about your requirement.';
  if (Object.keys(errors).length) return res.status(400).json({ error: 'Please check the form.', fields: errors });

  const { rows } = await db.query(
    `INSERT INTO enquiries (name, company, mobile, service, message)
     VALUES ($1, $2, $3, $4, $5) RETURNING *`,
    [name, company || null, mobile, service || null, message]
  );
  const enq = rows[0];

  // Email is best-effort: the enquiry is already safely stored.
  sendEnquiryMail(enq).then((sent) => {
    if (sent) db.query('UPDATE enquiries SET email_sent = true WHERE id = $1', [enq.id]).catch(() => {});
  });

  res.status(201).json({ ok: true });
});

/* ---------- Admin: list ---------- */
router.get('/', requireAdmin, async (req, res) => {
  const page = Math.max(1, parseInt(req.query.page, 10) || 1);
  const limit = Math.min(50, Math.max(1, parseInt(req.query.limit, 10) || 20));
  const where = [];
  const params = [];

  if (STATUSES.includes(req.query.status)) {
    params.push(req.query.status);
    where.push(`status = $${params.length}`);
  }
  const q = clean(req.query.q, 100);
  if (q) {
    params.push(`%${q}%`);
    const i = params.length;
    where.push(`(name ILIKE $${i} OR company ILIKE $${i} OR mobile ILIKE $${i} OR message ILIKE $${i})`);
  }
  const clause = where.length ? `WHERE ${where.join(' AND ')}` : '';

  const total = await db.query(`SELECT COUNT(*)::int AS n FROM enquiries ${clause}`, params);
  const list = await db.query(
    `SELECT * FROM enquiries ${clause} ORDER BY created_at DESC LIMIT ${limit} OFFSET ${(page - 1) * limit}`,
    params
  );
  res.json({ items: list.rows, total: total.rows[0].n, page, pages: Math.ceil(total.rows[0].n / limit) || 1 });
});

/* ---------- Admin: update status / response ---------- */
router.patch('/:id', requireAdmin, async (req, res) => {
  const id = parseInt(req.params.id, 10);
  const sets = [];
  const params = [];

  if (req.body.status !== undefined) {
    if (!STATUSES.includes(req.body.status)) return res.status(400).json({ error: 'Invalid status.' });
    params.push(req.body.status);
    sets.push(`status = $${params.length}`);
  }
  if (req.body.admin_response !== undefined) {
    params.push(clean(req.body.admin_response, 3000) || null);
    sets.push(`admin_response = $${params.length}`);
  }
  if (!sets.length) return res.status(400).json({ error: 'Nothing to update.' });

  params.push(id);
  const { rows } = await db.query(
    `UPDATE enquiries SET ${sets.join(', ')}, updated_at = now() WHERE id = $${params.length} RETURNING *`,
    params
  );
  if (!rows[0]) return res.status(404).json({ error: 'Enquiry not found.' });
  res.json(rows[0]);
});

router.delete('/:id', requireAdmin, async (req, res) => {
  await db.query('DELETE FROM enquiries WHERE id = $1', [parseInt(req.params.id, 10)]);
  res.json({ ok: true });
});

module.exports = router;
