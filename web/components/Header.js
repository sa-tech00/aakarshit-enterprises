'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { Phone, Mail, MapPin, Menu, X, MessageCircle } from 'lucide-react';
import { COMPANY, whatsappLink } from '@/lib/data';

const LINKS = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About us' },
  { href: '/services', label: 'Services' },
  { href: '/gallery', label: 'Our work' },
  { href: '/contact', label: 'Contact' },
];

/** Logo lock-up: emblem image + live text, so the name stays sharp at every size. */
export function Brand({ light = false }) {
  const [first, ...rest] = COMPANY.name.split(' ');
  return (
    <Link href="/" className={`brand ${light ? 'light' : ''}`} aria-label={`${COMPANY.name} home`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img className="brand-logo" src={light ? '/logo-mark-white.png' : '/logo-mark.png'} alt="" width="58" height="40" />
      <span className="brand-text">
        <strong>{first}</strong>
        <span>{rest.join(' ')}</span>
      </span>
    </Link>
  );
}

export default function Header() {
  const path = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => setOpen(false), [path]);

  const isActive = (href) => (href === '/' ? path === '/' : path.startsWith(href));

  return (
    <>
      <div className="topbar">
        <div className="container">
          <div className="group">
            <a href={`tel:${COMPANY.phones[0].tel}`}><Phone size={14} /> {COMPANY.phones[0].display}</a>
            <a href={`tel:${COMPANY.phones[1].tel}`} className="hide-sm"><Phone size={14} /> {COMPANY.phones[1].display}</a>
            <a href={`mailto:${COMPANY.email}`} className="hide-sm"><Mail size={14} /> {COMPANY.email}</a>
          </div>
          <span className="hide-sm place"><MapPin size={14} /> Lokmanya Nagar, Thane (W)</span>
        </div>
      </div>

      <header className="nav">
        <div className="container">
          <Brand />
          <nav id="main-nav" className={`nav-links ${open ? 'open' : ''}`} aria-label="Main">
            {LINKS.map((l) => (
              <Link key={l.href} href={l.href} className={`link ${isActive(l.href) ? 'active' : ''}`} aria-current={isActive(l.href) ? 'page' : undefined}>
                {l.label}
              </Link>
            ))}
            <Link href="/contact#enquiry" className="btn btn-primary btn-sm nav-quote-mobile">Get a quote</Link>
          </nav>
          <div className="nav-actions">
            <a href={`tel:${COMPANY.phones[0].tel}`} className="nav-phone" aria-label={`Call ${COMPANY.phones[0].display}`}>
              <Phone size={18} />
              <span><small>Call us</small>{COMPANY.phones[0].display}</span>
            </a>
            <Link href="/contact#enquiry" className="btn btn-primary btn-sm btn-quote">Get a quote</Link>
            <button
              className="menu-btn"
              onClick={() => setOpen((o) => !o)}
              aria-expanded={open}
              aria-controls="main-nav"
              aria-label={open ? 'Close menu' : 'Open menu'}
            >
              {open ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </header>
    </>
  );
}

export function FloatingButtons() {
  return (
    <div className="floaters">
      <a className="floater wa" href={whatsappLink()} target="_blank" rel="noopener noreferrer" aria-label="Chat on WhatsApp">
        <MessageCircle size={24} /> <span>WhatsApp</span>
      </a>
      <a className="floater call" href={`tel:${COMPANY.phones[0].tel}`} aria-label="Call now">
        <Phone size={22} /> <span>Call now</span>
      </a>
    </div>
  );
}
