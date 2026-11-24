'use client';
import { useCallback, useEffect, useState } from 'react';
import { Phone, Building2, Trash2, Save, Mail } from 'lucide-react';
import { api } from '@/lib/api';

const STATUS = { new: 'New', contacted: 'Contacted', in_progress: 'In progress', closed: 'Closed' };

function Item({ e, onChange, onDelete }) {
  const [status, setStatus] = useState(e.status);
  const [resp, setResp] = useState(e.admin_response || '');
  const [busy, setBusy] = useState(false);
  const [saved, setSaved] = useState(false);

  async function save() {
    setBusy(true);
    try {
      const r = await api(`/enquiries/${e.id}`, { method: 'PATCH', auth: true, body: { status, admin_response: resp } });
      onChange(r);
      setSaved(true);
      setTimeout(() => setSaved(false), 1800);
    } catch (err) {
      alert(err.message);
    } finally {
      setBusy(false);
    }
  }

  return (
    <article className={`enq ${e.status === 'new' ? 'new' : ''}`}>
      <div className="enq-head">
        <h4>{e.name}</h4>
        <span className={`badge ${e.status}`}>{STATUS[e.status]}</span>
      </div>
      <div className="enq-meta">
        <a href={`tel:${e.mobile}`}><Phone size={13} style={{ display: 'inline', verticalAlign: '-2px' }} /> {e.mobile}</a>
        {e.company && <span><Building2 size={13} style={{ display: 'inline', verticalAlign: '-2px' }} /> {e.company}</span>}
        {e.service && <span>Service: {e.service}</span>}
        <span>{new Date(e.created_at).toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short', timeZone: 'Asia/Kolkata' })}</span>
        <span title={e.email_sent ? 'Email sent to company' : 'Email not sent'}><Mail size={13} style={{ display: 'inline', verticalAlign: '-2px' }} /> {e.email_sent ? 'mailed' : 'not mailed'}</span>
      </div>
      <div className="enq-msg">{e.message}</div>
      <div className="enq-actions">
        <textarea className="textarea" style={{ minHeight: 70 }} placeholder="Your response / notes for this customer…" value={resp} onChange={(x) => setResp(x.target.value)} maxLength={3000} />
        <div style={{ display: 'grid', gap: 8 }}>
          <select className="select" value={status} onChange={(x) => setStatus(x.target.value)} aria-label="Status">
            {Object.entries(STATUS).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
          </select>
          <button className="btn btn-dark btn-sm" onClick={save} disabled={busy}><Save size={15} /> {saved ? 'Saved ✓' : busy ? 'Saving…' : 'Save'}</button>
          <button className="btn btn-danger btn-sm" onClick={() => confirm('Delete this enquiry permanently?') && onDelete(e.id)}><Trash2 size={15} /> Delete</button>
        </div>
      </div>
    </article>
  );
}

export default function Enquiries() {
  const [data, setData] = useState({ items: [], total: 0, page: 1, pages: 1 });
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState('');
  const [q, setQ] = useState('');
  const [qLive, setQLive] = useState('');
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState('');

  const load = useCallback(() => {
    setLoading(true);
    const p = new URLSearchParams({ page, limit: 15 });
    if (status) p.set('status', status);
    if (q) p.set('q', q);
    api(`/enquiries?${p}`, { auth: true })
      .then(setData)
      .catch((e) => setErr(e.message))
      .finally(() => setLoading(false));
  }, [page, status, q]);

  useEffect(load, [load]);
  useEffect(() => {
    const t = setTimeout(() => { setPage(1); setQ(qLive); }, 350);
    return () => clearTimeout(t);
  }, [qLive]);

  const replace = (row) => setData((d) => ({ ...d, items: d.items.map((i) => (i.id === row.id ? row : i)) }));
  async function remove(id) {
    await api(`/enquiries/${id}`, { method: 'DELETE', auth: true });
    load();
  }

  return (
    <>
      <div className="toolbar">
        <input className="input" placeholder="Search name, company, mobile…" value={qLive} onChange={(e) => setQLive(e.target.value)} />
        <select className="select" value={status} onChange={(e) => { setPage(1); setStatus(e.target.value); }}>
          <option value="">All statuses</option>
          {Object.entries(STATUS).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
        </select>
        <span className="muted">{data.total} total</span>
      </div>
      {err && <div className="alert error">{err}</div>}
      {loading && <p className="muted">Loading…</p>}
      {!loading && data.items.length === 0 && <p className="muted">No enquiries found.</p>}
      {data.items.map((e) => <Item key={e.id} e={e} onChange={replace} onDelete={remove} />)}
      {data.pages > 1 && (
        <div className="pager">
          <button className="btn btn-outline btn-sm" disabled={page <= 1} onClick={() => setPage(page - 1)}>Previous</button>
          <span>Page {data.page} of {data.pages}</span>
          <button className="btn btn-outline btn-sm" disabled={page >= data.pages} onClick={() => setPage(page + 1)}>Next</button>
        </div>
      )}
    </>
  );
}
