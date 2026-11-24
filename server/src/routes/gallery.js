const express = require('express');
const multer = require('multer');
const crypto = require('crypto');
const fs = require('fs');
const path = require('path');
const db = require('../db');
const { requireAdmin, clean } = require('../middleware');

const router = express.Router();

const UPLOAD_DIR = process.env.UPLOAD_DIR
  ? path.resolve(process.env.UPLOAD_DIR)
  : path.join(__dirname, '..', '..', 'uploads');
fs.mkdirSync(UPLOAD_DIR, { recursive: true });

const EXT = { 'image/jpeg': '.jpg', 'image/png': '.png', 'image/webp': '.webp' };

const upload = multer({
  storage: multer.diskStorage({
    destination: UPLOAD_DIR,
    // extension comes from the verified mime type, never from the user's file name
    filename: (_req, file, cb) => cb(null, crypto.randomUUID() + EXT[file.mimetype]),
  }),
  limits: { fileSize: 6 * 1024 * 1024, files: 1 },
  fileFilter: (_req, file, cb) =>
    EXT[file.mimetype] ? cb(null, true) : cb(new Error('Only JPG, PNG or WebP images are allowed.')),
});

const shape = (r) => ({ ...r, url: `/uploads/${r.filename}` });

router.get('/', async (_req, res) => {
  const { rows } = await db.query('SELECT * FROM gallery ORDER BY created_at DESC');
  res.json(rows.map(shape));
});

router.post('/', requireAdmin, upload.single('image'), async (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'Please choose an image.' });
  const title = clean(req.body.title, 120) || 'Our work';
  const category = clean(req.body.category, 80) || null;
  const { rows } = await db.query(
    'INSERT INTO gallery (title, category, filename) VALUES ($1, $2, $3) RETURNING *',
    [title, category, req.file.filename]
  );
  res.status(201).json(shape(rows[0]));
});

router.patch('/:id', requireAdmin, async (req, res) => {
  const title = clean(req.body.title, 120);
  if (!title) return res.status(400).json({ error: 'Title is required.' });
  const category = clean(req.body.category, 80) || null;
  const { rows } = await db.query(
    'UPDATE gallery SET title = $1, category = $2 WHERE id = $3 RETURNING *',
    [title, category, parseInt(req.params.id, 10)]
  );
  if (!rows[0]) return res.status(404).json({ error: 'Image not found.' });
  res.json(shape(rows[0]));
});

router.delete('/:id', requireAdmin, async (req, res) => {
  const { rows } = await db.query('DELETE FROM gallery WHERE id = $1 RETURNING filename', [
    parseInt(req.params.id, 10),
  ]);
  if (rows[0]) fs.unlink(path.join(UPLOAD_DIR, path.basename(rows[0].filename)), () => {});
  res.json({ ok: true });
});

module.exports = router;
module.exports.UPLOAD_DIR = UPLOAD_DIR;
