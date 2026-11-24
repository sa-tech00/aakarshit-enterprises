'use client';
import { useEffect, useState } from 'react';
import { api } from '@/lib/api';

function fmt(label, mode) {
  if (mode === 'monthly') {
    const [y, m] = label.split('-');
    return new Date(+y, +m - 1, 1).toLocaleString('en-IN', { month: 'short', year: '2-digit' });
  }
  const d = new Date(label + 'T00:00:00');
  return d.toLocaleString('en-IN', { day: 'numeric', month: 'short' });
}

export default function Dashboard() {
  const [s, setS] = useState(null);
  const [mode, setMode] = useState('daily');
  const [err, setErr] = useState('');

  useEffect(() => {
    api('/stats', { auth: true }).then(setS).catch((e) => setErr(e.message));
  }, []);

  if (err) return <div className="alert error">{err}</div>;
  if (!s) return <p className="muted">Loading…</p>;

  const rows = s[mode];
  const max = Math.max(1, ...rows.map((r) => r.count));
  const maxSvc = Math.max(1, ...s.byService.map((r) => r.count));
  const titles = { daily: 'Last 30 days', weekly: 'Last 12 weeks (week starting)', monthly: 'Last 12 months' };

  return (
    <>
      <div className="kpis">
        <div className="kpi hot"><span>Today</span><strong>{s.totals.today}</strong></div>
        <div className="kpi"><span>This week</span><strong>{s.totals.this_week}</strong></div>
        <div className="kpi"><span>This month</span><strong>{s.totals.this_month}</strong></div>
        <div className="kpi"><span>Not yet attended</span><strong>{s.totals.unattended}</strong></div>
      </div>

      <div className="toolbar" style={{ justifyContent: 'space-between' }}>
        <h3 style={{ fontSize: '1.1rem' }}>Enquiries · {titles[mode]}</h3>
        <div className="seg" role="group" aria-label="Period">
          {['daily', 'weekly', 'monthly'].map((m) => (
            <button key={m} className={mode === m ? 'on' : ''} onClick={() => setMode(m)}>
              {m === 'daily' ? 'Day' : m === 'weekly' ? 'Week' : 'Month'}
            </button>
          ))}
        </div>
      </div>

      <div className="chart" role="img" aria-label={`Enquiries ${titles[mode]}`}>
        {rows.map((r) => (
          <div className="bar" key={r.label} title={`${fmt(r.label, mode)}: ${r.count}`}>
            {r.count > 0 && <b>{r.count}</b>}
            <i className={r.count ? '' : 'zero'} style={{ height: `${(r.count / max) * 82}%` }} />
            <em>{mode === 'daily' ? new Date(r.label + 'T00:00:00').getDate() : fmt(r.label, mode)}</em>
          </div>
        ))}
      </div>

      <h3 className="mt" style={{ fontSize: '1.1rem', marginBottom: 14 }}>Most requested services</h3>
      {s.byService.length === 0 ? (
        <p className="muted">No enquiries yet.</p>
      ) : (
        <div className="list-bars">
          {s.byService.map((r) => (
            <div className="lb" key={r.label}>
              <span>{r.label}</span>
              <div><i style={{ width: `${(r.count / maxSvc) * 100}%` }} /></div>
              <b>{r.count}</b>
            </div>
          ))}
        </div>
      )}
      <p className="muted mt">All-time enquiries: <b>{s.totals.total}</b></p>
    </>
  );
}
