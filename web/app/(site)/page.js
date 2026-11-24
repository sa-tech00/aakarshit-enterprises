import Link from 'next/link';
import { Phone, CalendarCheck, Check, ShieldCheck, BadgeCheck, Layers } from 'lucide-react';
import HeroArt from '@/components/HeroArt';
import ServiceIcon from '@/components/ServiceIcon';
import { SectionHead, ServiceGrid, Process, Testimonials, GalleryGrid, CtaBand } from '@/components/Sections';
import { COMPANY, SERVICES, CORE_SLUGS, WHY_US, VALUES } from '@/lib/data';
import { serverGet } from '@/lib/api';

export const revalidate = 60;

const VALUE_ICONS = [BadgeCheck, ShieldCheck, Layers];

export default async function Home() {
  const [gallery, feedback] = await Promise.all([serverGet('/gallery'), serverGet('/feedback')]);
  const core = CORE_SLUGS.map((s) => SERVICES.find((x) => x.slug === s)).filter(Boolean);

  return (
    <>
      <section className="hero">
        <div className="container hero-grid">
          <div className="hero-copy">
            <h1>Your complete office maintenance partner</h1>
            <p className="sub">
              Repairs, cleaning, new furniture, interiors and IT cabling for offices in Thane and Mumbai. One team and
              one point of contact, whether it is a single chair or a full fit-out.
            </p>
            <div className="hero-cta">
              <Link href="/contact#enquiry" className="btn btn-primary btn-lg"><CalendarCheck size={20} /> Book a site visit</Link>
              <a href={`tel:${COMPANY.phones[0].tel}`} className="btn btn-outline btn-lg"><Phone size={20} /> {COMPANY.phones[0].display}</a>
            </div>
            <dl className="hero-facts">
              <div><dt>{SERVICES.length}</dt><dd>services, one vendor</dd></div>
              <div><dt>Written quote</dt><dd>before work begins</dd></div>
              <div><dt>Thane (W)</dt><dd>Lokmanya Nagar</dd></div>
            </dl>
          </div>
          <HeroArt />
        </div>
      </section>

      <section className="values" aria-label="What we stand for">
        <div className="container values-grid">
          {VALUES.map((v, i) => {
            const Icon = VALUE_ICONS[i];
            return (
              <div key={v.title} className="value">
                <Icon size={28} strokeWidth={1.6} aria-hidden="true" />
                <div>
                  <h2>{v.title}</h2>
                  <p>{v.text}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section className="section" id="services">
        <div className="container">
          <SectionHead
            title="Services for every corner of your office"
            text="Repairs, cleaning, supply and complete interiors, handled by one dependable team."
            action={<Link href="/services" className="btn btn-outline">View all {SERVICES.length} services</Link>}
          />
          <ServiceGrid list={core} />
        </div>
      </section>

      <section className="section soft">
        <div className="container split">
          <div>
            <h2 className="h2">One partner for office maintenance and interiors</h2>
            <p className="lead">
              {COMPANY.name} is a Thane-based specialist in office repairs and maintenance, interior work, carpentry,
              painting and civil contracting. Whether it is one broken chair or a complete office fit-out, we handle it
              with the same care.
            </p>
            <ul className="checks">
              {['Interior turnkey & project management', 'Repair, cleaning and new supply', 'Glass, gypsum, wooden & brick partitions', 'IT / LAN cabling and HVAC services'].map((t) => (
                <li key={t}><Check size={18} /> {t}</li>
              ))}
            </ul>
            <div className="actions"><Link href="/about" className="btn btn-dark">About {COMPANY.name.split(' ')[0]}</Link></div>
          </div>
          <div className="about-card">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logo-lockup.png" alt={`${COMPANY.name} logo`} width="380" height="273" />
            <div className="owner"><strong>{COMPANY.owner}</strong><span>Proprietor</span></div>
          </div>
        </div>
      </section>

      <section className="section dark">
        <div className="container">
          <SectionHead title="Reliable work, from the first call to handover" />
          <div className="why">
            {WHY_US.map((w) => (
              <div key={w.title} className="why-item">
                <ServiceIcon name={w.icon} size={30} />
                <h3>{w.title}</h3>
                <p>{w.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHead title="A simple process with clear communication" text="You always know what happens next, what it costs and when it will be done." />
          <Process />
        </div>
      </section>

      {gallery.length > 0 && (
        <section className="section soft">
          <div className="container">
            <SectionHead title="Recent projects" action={<Link href="/gallery" className="btn btn-outline">See all our work</Link>} />
            <GalleryGrid items={gallery.slice(0, 8)} strip />
          </div>
        </section>
      )}

      {feedback.length > 0 && (
        <section className="section">
          <div className="container">
            <SectionHead title="What our customers say" />
            <Testimonials items={feedback} />
          </div>
        </section>
      )}

      <CtaBand />
    </>
  );
}
