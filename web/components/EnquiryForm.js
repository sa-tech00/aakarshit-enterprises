'use client';
import { useState, useEffect } from 'react';
import { Send, CheckCircle2 } from 'lucide-react';
import { api } from '@/lib/api';
import { SERVICES, COMPANY } from '@/lib/data';

const EMPTY = { name: '', company: '', mobile: '', service: '', message: '', website: '' };

export default function EnquiryForm({ id = 'enquiry', title = 'Request a quote', hint = 'Tell us what you need and we will call you back to arrange a site visit.' }) {
  const [f, setF] = useState(EMPTY);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [fields, setFields] = useState({});
  const [done, setDone] = useState(false);

  // /contact?service=<slug> pre-selects the service the visitor clicked from
  useEffect(() => {
    const slug = new URLSearchParams(window.location.search).get('service');
    const match = SERVICES.find((x) => x.slug === slug);
    if (match) setF((s) => ({ ...s, service: match.title }));
  }, []);

  const set = (k) => (e) => setF((s) => ({ ...s, [k]: e.target.value }));

  async function submit(e) {
    e.preventDefault();
    setError('');
    setFields({});
    setBusy(true);
    try {
      await api('/enquiries', { method: 'POST', body: f });
      setDone(true);
      setF(EMPTY);
    } catch (err) {
      setError(err.message);
      setFields(err.fields || {});
    } finally {
      setBusy(false);
    }
  }

  if (done) {
    return (
      <div className="form-card" id={id}>
        <div className="success" role="status">
          <div className="tick"><CheckCircle2 size={38} /></div>
          <h3>Thank you, we have your enquiry</h3>
          <p className="hint" style={{ marginBottom: 20 }}>
            We will contact you shortly. For urgent work, please call{' '}
            <a href={`tel:${COMPANY.phones[0].tel}`} style={{ fontWeight: 700 }}>{COMPANY.phones[0].display}</a>.
          </p>
          <button className="btn btn-outline btn-sm" onClick={() => setDone(false)}>Send another enquiry</button>
        </div>
      </div>
    );
  }

  return (
    <form className="form-card" id={id} onSubmit={submit} noValidate>
      <h3>{title}</h3>
      <p className="hint">{hint}</p>

      {error && <div className="alert error" role="alert">{error}</div>}

      <div className="row2">
        <div className="field">
          <label htmlFor={`${id}-name`}>Your name *</label>
          <input id={`${id}-name`} className={`input ${fields.name ? 'bad' : ''}`} value={f.name} onChange={set('name')} autoComplete="name" required maxLength={100} />
          {fields.name && <span className="err">{fields.name}</span>}
        </div>
        <div className="field">
          <label htmlFor={`${id}-mobile`}>Mobile number *</label>
          <input id={`${id}-mobile`} className={`input ${fields.mobile ? 'bad' : ''}`} type="tel" inputMode="tel" value={f.mobile} onChange={set('mobile')} autoComplete="tel" placeholder="10-digit mobile number" required maxLength={20} />
          {fields.mobile && <span className="err">{fields.mobile}</span>}
        </div>
      </div>

      <div className="row2">
        <div className="field">
          <label htmlFor={`${id}-company`}>Company name <small>(optional)</small></label>
          <input id={`${id}-company`} className="input" value={f.company} onChange={set('company')} autoComplete="organization" maxLength={150} />
        </div>
        <div className="field">
          <label htmlFor={`${id}-service`}>Service needed <small>(optional)</small></label>
          <select id={`${id}-service`} className="select" value={f.service} onChange={set('service')}>
            <option value="">Select a service</option>
            {SERVICES.map((s) => <option key={s.slug} value={s.title}>{s.title}</option>)}
            <option value="Other">Other</option>
          </select>
        </div>
      </div>

      <div className="field">
        <label htmlFor={`${id}-message`}>Your enquiry *</label>
        <textarea id={`${id}-message`} className={`textarea ${fields.message ? 'bad' : ''}`} value={f.message} onChange={set('message')} placeholder="Tell us what you need – e.g. 20 chairs need repair, or partition for a 1500 sq ft office." required maxLength={2000} />
        {fields.message && <span className="err">{fields.message}</span>}
      </div>

      {/* spam trap: hidden from people */}
      <div className="hp" aria-hidden="true">
        <label>Website <input tabIndex={-1} autoComplete="off" value={f.website} onChange={set('website')} /></label>
      </div>

      <button className="btn btn-primary" type="submit" disabled={busy} style={{ width: '100%' }}>
        <Send size={18} /> {busy ? 'Sending…' : 'Send enquiry'}
      </button>
    </form>
  );
}
