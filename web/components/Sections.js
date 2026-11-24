import Link from 'next/link';
import { ArrowRight, Check, Phone, MessageCircle, Star, Mail } from 'lucide-react';
import { COMPANY, SERVICES, GROUPS, STEPS, whatsappLink } from '@/lib/data';
import ServiceIcon from './ServiceIcon';
import EnquiryForm from './EnquiryForm';
import Stripes from './Stripes';

export function SectionHead({ title, text, center = false, action }) {
  return (
    <div className={`sec-head ${center ? 'center' : ''} ${action ? 'has-action' : ''}`}>
      <div>
        <h2>{title}</h2>
        {text && <p>{text}</p>}
      </div>
      {action}
    </div>
  );
}

/** Ruled grid of services (shared borders instead of separate cards). */
export function ServiceGrid({ list = SERVICES }) {
  return (
    <div className="svc-grid">
      {list.map((s) => (
        <article key={s.slug} className="svc">
          <div className="svc-icon"><ServiceIcon name={s.icon} size={30} /></div>
          <h3>{s.title}</h3>
          <p>{s.short}</p>
          <Link href={`/services#${s.slug}`} className="text-link">Details <ArrowRight size={16} /></Link>
        </article>
      ))}
    </div>
  );
}

/** Full catalogue grouped by category, with a quote link that pre-selects the service. */
export function ServiceCatalogue() {
  return (
    <div className="catalogue">
      <nav className="cat-nav" aria-label="Service categories">
        {GROUPS.map((g) => (
          <a key={g.id} href={`#${g.id}`}>{g.title}</a>
        ))}
      </nav>
      <div className="cat-body">
        {GROUPS.map((g) => (
          <section key={g.id} id={g.id} className="cat-group">
            <header>
              <h2>{g.title}</h2>
              <p>{g.text}</p>
            </header>
            {SERVICES.filter((s) => s.group === g.id).map((s) => (
              <article key={s.slug} id={s.slug} className="cat-row">
                <div className="cat-title">
                  <span className="svc-icon"><ServiceIcon name={s.icon} size={26} /></span>
                  <h3>{s.title}</h3>
                </div>
                <div className="cat-info">
                  <p>{s.short}</p>
                  <ul>
                    {s.items.map((it) => (
                      <li key={it}><Check size={16} /> {it}</li>
                    ))}
                  </ul>
                  <Link href={`/contact?service=${s.slug}#enquiry`} className="text-link">Request a quote <ArrowRight size={16} /></Link>
                </div>
              </article>
            ))}
          </section>
        ))}
      </div>
    </div>
  );
}

export function Process() {
  return (
    <ol className="steps">
      {STEPS.map((s, i) => (
        <li key={s.title} className="step">
          <span className="step-no">{i + 1}</span>
          <h3>{s.title}</h3>
          <p>{s.text}</p>
        </li>
      ))}
    </ol>
  );
}

export function Testimonials({ items }) {
  if (!items?.length) return null;
  return (
    <div className="quotes">
      {items.slice(0, 6).map((t) => (
        <figure key={t.id} className="quote">
          <div className="stars" role="img" aria-label={`${t.rating} out of 5`}>
            {Array.from({ length: t.rating }).map((_, k) => <Star key={k} size={16} fill="currentColor" />)}
          </div>
          <blockquote>{t.message}</blockquote>
          <figcaption>
            <strong>{t.customer_name}</strong>
            {t.company && <span>{t.company}</span>}
          </figcaption>
        </figure>
      ))}
    </div>
  );
}

export function GalleryGrid({ items, strip = false }) {
  return (
    <div className={strip ? 'gallery-strip' : 'gallery'}>
      {items.map((g) => (
        <figure className="shot" key={g.id}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={g.url} alt={g.title} loading="lazy" decoding="async" />
          <figcaption>
            {g.category && <small>{g.category}</small>}
            {g.title}
          </figcaption>
        </figure>
      ))}
    </div>
  );
}

export function CtaBand() {
  return (
    <section className="section dark" id="get-in-touch">
      <div className="container cta-grid">
        <div>
          <h2>Tell us what your office needs</h2>
          <p className="lead">Call or WhatsApp us straight away, or leave an enquiry and we will call you back.</p>
          <div className="cta-options">
            <a className="option" href={`tel:${COMPANY.phones[0].tel}`}>
              <span className="ic"><Phone size={22} /></span>
              <div><strong>Call {COMPANY.phones[0].display}</strong><span>Also {COMPANY.phones[1].display}, Monday to Saturday</span></div>
            </a>
            <a className="option" href={whatsappLink()} target="_blank" rel="noopener noreferrer">
              <span className="ic wa"><MessageCircle size={22} /></span>
              <div><strong>WhatsApp us</strong><span>Send photos or measurements of your requirement</span></div>
            </a>
            <a className="option" href={`mailto:${COMPANY.email}`}>
              <span className="ic"><Mail size={22} /></span>
              <div><strong>Email</strong><span>{COMPANY.email}</span></div>
            </a>
          </div>
        </div>
        <div>
          <EnquiryForm id="enquiry-home" />
        </div>
      </div>
    </section>
  );
}

export function PageHead({ crumb, title, text }) {
  return (
    <section className="page-head">
      <Stripes className="page-head-stripes" width={420} />
      <div className="container">
        <nav className="crumbs" aria-label="Breadcrumb"><Link href="/">Home</Link> / {crumb}</nav>
        <h1>{title}</h1>
        {text && <p>{text}</p>}
      </div>
    </section>
  );
}
