'use client';
import { useEffect, useState } from 'react';
import { Plus, Save, Trash2 } from 'lucide-react';
import { api } from '@/lib/api';

const BLANK = { customer_name: '', company: '', rating: 5, message: '', published: true };

function Editor({ initial, onSave, onCancel, onDelete }) {
  const [f, setF] = useState(initial);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState('');
  const set = (k) => (e) => setF((s) => ({ ...s, [k]: e.target.type === 'checkbox' ? e.target.checked : e.target.value }));

  async function submit(e) {
    e.preventDefault();
    setBusy(true); setErr('');
    try { await onSave({ ...f, rating: Number(f.rating) }); } catch (x) { setErr(x.message); } finally { setBusy(false); }
  }

  return (
    <form className="enq" onSubmit={submit}>
      {err && <div className="alert error">{err}</div>}
      <div className="split-form">
        <div className="field"><label>Customer name *</label><input className="input" value={f.customer_name} onChange={set('customer_name')} required maxLength={100} /></div>
        <div className="field"><label>Company</label><input className="input" value={f.company || ''} onChange={set('company')} maxLength={150} /></div>
      </div>
      <div className="field"><label>Feedback *</label><textarea className="textarea" value={f.message} onChange={set('message')} required maxLength={1500} /></div>
      <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', alignItems: 'center' }}>
        <label>Rating{' '}
          <select className="select" style={{ width: 'auto', display: 'inline-block' }} value={f.rating} onChange={set('rating')}>
            {[5, 4, 3, 2, 1].map((n) => <option key={n} value={n}>{n} ★</option>)}
          </select>
        </label>
        <label style={{ display: 'flex', gap: 8, alignItems: 'center' }}><input type="checkbox" checked={f.published} onChange={set('published')} /> Show on website</label>
        <span style={{ flex: 1 }} />
        {onCancel && <button type="button" className="btn btn-outline btn-sm" onClick={onCancel}>Cancel</button>}
        {onDelete && <button type="button" className="btn btn-danger btn-sm" onClick={onDelete}><Trash2 size={14} /> Delete</button>}
        <button className="btn btn-dark btn-sm" disabled={busy}><Save size={14} /> {busy ? 'Saving…' : 'Save'}</button>
      </div>
    </form>
  );
}

export default function FeedbackAdmin() {
  const [items, setItems] = useState([]);
  const [editing, setEditing] = useState(null); // id | 'new'
  const [err, setErr] = useState('');

  const load = () => api('/feedback/all', { auth: true }).then(setItems).catch((e) => setErr(e.message));
  useEffect(() => { load(); }, []);

  async function create(f) { await api('/feedback', { method: 'POST', auth: true, body: f }); setEditing(null); load(); }
  async function update(id, f) { await api(`/feedback/${id}`, { method: 'PATCH', auth: true, body: f }); setEditing(null); load(); }
  async function remove(id) { if (confirm('Delete this feedback?')) { await api(`/feedback/${id}`, { method: 'DELETE', auth: true }); setEditing(null); load(); } }

  return (
    <>
      <div className="toolbar" style={{ justifyContent: 'space-between' }}>
        <p className="muted">Add customer feedback you receive. Only items marked “Show on website” are public.</p>
        <button className="btn btn-primary btn-sm" onClick={() => setEditing('new')}><Plus size={16} /> Add feedback</button>
      </div>
      {err && <div className="alert error">{err}</div>}
      {editing === 'new' && <Editor initial={BLANK} onSave={create} onCancel={() => setEditing(null)} />}
      {items.map((f) =>
        editing === f.id ? (
          <Editor key={f.id} initial={f} onSave={(x) => update(f.id, x)} onCancel={() => setEditing(null)} onDelete={() => remove(f.id)} />
        ) : (
          <article className="enq" key={f.id}>
            <div className="enq-head">
              <h4>{f.customer_name}{f.company ? ` · ${f.company}` : ''}</h4>
              <span className={`badge ${f.published ? 'closed' : 'off'}`}>{f.published ? 'Visible' : 'Hidden'} · {f.rating}★</span>
            </div>
            <div className="enq-msg" style={{ marginTop: 10 }}>{f.message}</div>
            <div style={{ marginTop: 10 }}><button className="btn btn-outline btn-sm" onClick={() => setEditing(f.id)}>Edit</button></div>
          </article>
        )
      )}
      {items.length === 0 && editing !== 'new' && <p className="muted">No feedback yet.</p>}
    </>
  );
}
