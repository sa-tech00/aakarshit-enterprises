const express = require('express');
const db = require('../db');
const { requireAdmin } = require('../middleware');

const router = express.Router();
const TZ = `'Asia/Kolkata'`;
const local = `(created_at AT TIME ZONE ${TZ})`;
const nowLocal = `(now() AT TIME ZONE ${TZ})`;

router.get('/', requireAdmin, async (_req, res) => {
  const [totals, daily, weekly, monthly, byService] = await Promise.all([
    db.query(`
      SELECT
        COUNT(*) FILTER (WHERE ${local}::date = ${nowLocal}::date)::int                           AS today,
        COUNT(*) FILTER (WHERE date_trunc('week', ${local})  = date_trunc('week',  ${nowLocal}))::int AS this_week,
        COUNT(*) FILTER (WHERE date_trunc('month', ${local}) = date_trunc('month', ${nowLocal}))::int AS this_month,
        COUNT(*)::int                                                                                AS total,
        COUNT(*) FILTER (WHERE status = 'new')::int                                                  AS unattended
      FROM enquiries`),
    db.query(`
      SELECT to_char(d, 'YYYY-MM-DD') AS label, COUNT(e.id)::int AS count
      FROM generate_series(${nowLocal}::date - 29, ${nowLocal}::date, interval '1 day') d
      LEFT JOIN enquiries e ON (e.created_at AT TIME ZONE ${TZ})::date = d::date
      GROUP BY d ORDER BY d`),
    db.query(`
      SELECT to_char(w, 'YYYY-MM-DD') AS label, COUNT(e.id)::int AS count
      FROM generate_series(date_trunc('week', ${nowLocal}) - interval '11 weeks', date_trunc('week', ${nowLocal}), interval '1 week') w
      LEFT JOIN enquiries e ON date_trunc('week', e.created_at AT TIME ZONE ${TZ}) = w
      GROUP BY w ORDER BY w`),
    db.query(`
      SELECT to_char(m, 'YYYY-MM') AS label, COUNT(e.id)::int AS count
      FROM generate_series(date_trunc('month', ${nowLocal}) - interval '11 months', date_trunc('month', ${nowLocal}), interval '1 month') m
      LEFT JOIN enquiries e ON date_trunc('month', e.created_at AT TIME ZONE ${TZ}) = m
      GROUP BY m ORDER BY m`),
    db.query(`
      SELECT COALESCE(NULLIF(service, ''), 'Not specified') AS label, COUNT(*)::int AS count
      FROM enquiries GROUP BY 1 ORDER BY count DESC LIMIT 6`),
  ]);

  res.json({
    totals: totals.rows[0],
    daily: daily.rows,
    weekly: weekly.rows,
    monthly: monthly.rows,
    byService: byService.rows,
  });
});

module.exports = router;
