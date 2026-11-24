const express = require('express');
const db = require('../db');
const { requireAdmin, clean } = require('../middleware');

const router = express.Router();

function parse(body) {
  const customer_name = clean(body.customer_name, 100);
  const company = clean(body.company, 150) || null;
  const message = clean(body.message, 1500);
  const rating = Math.min(5, Math.max(1, parseInt(body.rating, 10) || 5));
  const published = body.published === undefined ? true : Boolean(body.published);
  return { customer_name, company, message, rating, published };
}

/* Public: only published feedback */
router.get('/', async (_req, res) => {
  const { rows } = await db.query(
    'SELECT id, customer_name, company, rating, message, created_at FROM feedback WHERE published = true ORDER BY created_at DESC'
  );
  res.json(rows);
});

/* Admin: everything */
router.get('/all', requireAdmin, async (_req, res) => {
  const { rows } = await db.query('SELECT * FROM feedback ORDER BY created_at DESC');
  res.json(rows);
});

router.post('/', requireAdmin, async (req, res) => {
  const f = parse(req.body || {});
  if (!f.customer_name || !f.message) return res.status(400).json({ error: 'Name and feedback text are required.' });
  const { rows } = await db.query(
    `INSERT INTO feedback (customer_name, company, rating, message, published)
     VALUES ($1, $2, $3, $4, $5) RETURNING *`,
    [f.customer_name, f.company, f.rating, f.message, f.published]
  );
  res.status(201).json(rows[0]);
});

router.patch('/:id', requireAdmin, async (req, res) => {
  const f = parse(req.body || {});
  if (!f.customer_name || !f.message) return res.status(400).json({ error: 'Name and feedback text are required.' });
  const { rows } = await db.query(
    `UPDATE feedback SET customer_name = $1, company = $2, rating = $3, message = $4, published = $5
     WHERE id = $6 RETURNING *`,
    [f.customer_name, f.company, f.rating, f.message, f.published, parseInt(req.params.id, 10)]
  );
  if (!rows[0]) return res.status(404).json({ error: 'Feedback not found.' });
  res.json(rows[0]);
});

router.delete('/:id', requireAdmin, async (req, res) => {
  await db.query('DELETE FROM feedback WHERE id = $1', [parseInt(req.params.id, 10)]);
  res.json({ ok: true });
});

module.exports = router;
