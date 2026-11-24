'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { LayoutDashboard, Inbox, Images, MessageSquareQuote, LogOut } from 'lucide-react';
import { getToken, clearToken, api } from '@/lib/api';
import Dashboard from '@/components/admin/Dashboard';
import Enquiries from '@/components/admin/Enquiries';
import GalleryAdmin from '@/components/admin/GalleryAdmin';
import FeedbackAdmin from '@/components/admin/FeedbackAdmin';

const TABS = [
  { id: 'dash', label: 'Overview', icon: LayoutDashboard },
  { id: 'enq', label: 'Enquiries', icon: Inbox },
  { id: 'gal', label: 'Gallery', icon: Images },
  { id: 'fb', label: 'Feedback', icon: MessageSquareQuote },
];

export default function AdminHome() {
  const router = useRouter();
  const [ready, setReady] = useState(false);
  const [tab, setTab] = useState('dash');
  const [email, setEmail] = useState('');

  useEffect(() => {
    if (!getToken()) return router.replace('/admin/login');
    api('/auth/me', { auth: true })
      .then((r) => { setEmail(r.email); setReady(true); })
      .catch(() => {});
  }, [router]);

  function logout() {
    clearToken();
    router.replace('/admin/login');
  }

  if (!ready) return <div style={{ padding: 40, textAlign: 'center' }} className="muted">Loading…</div>;

  return (
    <>
      <div className="adm-top">
        <div className="container">
          <div className="brand"><span className="brand-mark">A</span><span className="brand-text"><strong>Admin</strong><span>{email}</span></span></div>
          <button className="btn btn-ghost-light btn-sm" onClick={logout}><LogOut size={16} /> Sign out</button>
        </div>
      </div>
      <div className="container">
        <div className="adm-tabs" role="tablist">
          {TABS.map((t) => (
            <button key={t.id} role="tab" aria-selected={tab === t.id} className={`adm-tab ${tab === t.id ? 'active' : ''}`} onClick={() => setTab(t.id)}>
              <t.icon size={18} /> {t.label}
            </button>
          ))}
        </div>
        <div className="adm-panel">
          {tab === 'dash' && <Dashboard />}
          {tab === 'enq' && <Enquiries />}
          {tab === 'gal' && <GalleryAdmin />}
          {tab === 'fb' && <FeedbackAdmin />}
        </div>
      </div>
    </>
  );
}
