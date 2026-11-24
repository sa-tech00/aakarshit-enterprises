'use client';
import { useEffect, useRef, useState } from 'react';
import { Upload, Trash2, Save } from 'lucide-react';
import { api } from '@/lib/api';

function Tile({ g, onSaved, onDeleted }) {
  const [title, setTitle] = useState(g.title);
  const [category, setCategory] = useState(g.category || '');
  const [busy, setBusy] = useState(false);
  const dirty = title !== g.title || category !== (g.category || '');

  async function save() {
    setBusy(true);
    try {
      onSaved(await api(`/gallery/${g.id}`, { method: 'PATCH', auth: true, body: { title, category } }));
    } catch (e) { alert(e.message); } finally { setBusy(false); }
  }
  async function del() {
    if (!confirm('Delete this image?')) return;
    await api(`/gallery/${g.id}`, { method: 'DELETE', auth: true });
    onDeleted(g.id);
  }

  return (
    <div className="ag-item">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={g.url} alt={g.title} loading="lazy" />
      <div>
        <input className="input" value={title} onChange={(e) => setTitle(e.target.value)} aria-label="Title" maxLength={120} />
        <input className="input" value={category} onChange={(e) => setCategory(e.target.value)} placeholder="Category" aria-label="Category" maxLength={80} />
        <div style={{ display: 'flex', gap: 8 }}>
          <button className="btn btn-dark btn-sm" style={{ flex: 1 }} disabled={!dirty || busy} onClick={save}><Save size={14} /> Save</button>
          <button className="btn btn-danger btn-sm" onClick={del} aria-label="Delete image"><Trash2 size={14} /></button>
        </div>
      </div>
    </div>
  );
}

export default function GalleryAdmin() {
  const [items, setItems] = useState([]);
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [file, setFile] = useState(null);
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState(null);
  const input = useRef(null);

  const load = () => api('/gallery').then(setItems).catch(() => {});
  useEffect(() => { load(); }, []);

  async function upload(e) {
    e.preventDefault();
    if (!file) return setMsg({ t: 'error', m: 'Please choose an image first.' });
    setBusy(true);
    setMsg(null);
    try {
      const form = new FormData();
      form.append('image', file);
      form.append('title', title);
      form.append('category', category);
      const row = await api('/gallery', { method: 'POST', auth: true, form });
      setItems((l) => [row, ...l]);
      setTitle(''); setCategory(''); setFile(null);
      if (input.current) input.current.value = '';
      setMsg({ t: 'ok', m: 'Image added. It will appear on the website within a minute.' });
    } catch (err) {
      setMsg({ t: 'error', m: err.message });
    } finally { setBusy(false); }
  }

  return (
    <>
      <form onSubmit={upload}>
        <h3 style={{ marginBottom: 14, fontSize: '1.1rem' }}>Add a project photo</h3>
        {msg && <div className={`alert ${msg.t}`}>{msg.m}</div>}
        <div className="split-form">
          <div className="field"><label htmlFor="gt">Title</label><input id="gt" className="input" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g. Glass cabin – Andheri office" maxLength={120} /></div>
          <div className="field"><label htmlFor="gc">Category</label><input id="gc" className="input" value={category} onChange={(e) => setCategory(e.target.value)} placeholder="e.g. Partition, Cleaning" maxLength={80} /></div>
        </div>
        <div className="field"><label htmlFor="gf">Image (JPG, PNG or WebP, up to 6 MB)</label><input id="gf" ref={input} className="input" type="file" accept="image/jpeg,image/png,image/webp" onChange={(e) => setFile(e.target.files?.[0] || null)} /></div>
        <button className="btn btn-primary btn-sm" disabled={busy}><Upload size={16} /> {busy ? 'Uploading…' : 'Upload image'}</button>
      </form>

      <div className="admin-gallery">
        {items.map((g) => (
          <Tile key={g.id} g={g}
            onSaved={(row) => setItems((l) => l.map((x) => (x.id === row.id ? row : x)))}
            onDeleted={(id) => setItems((l) => l.filter((x) => x.id !== id))} />
        ))}
      </div>
      {items.length === 0 && <p className="muted mt">No images yet.</p>}
    </>
  );
}
