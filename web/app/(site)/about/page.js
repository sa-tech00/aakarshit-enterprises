import { Check } from 'lucide-react';
import ServiceIcon from '@/components/ServiceIcon';
import { SectionHead, Process, CtaBand, PageHead } from '@/components/Sections';
import { COMPANY, WHY_US, VALUES } from '@/lib/data';

export const metadata = {
  title: 'About Us',
  description: 'Akarshit Enterprises – specialists in office repairs & maintenance, interior, carpentry, painting and civil contracting in Thane.',
  alternates: { canonical: '/about' },
};

export default function About() {
  return (
    <>
      <PageHead crumb="About us" title={`About ${COMPANY.name}`} text={`${COMPANY.tagline}.`} />

      <section className="section">
        <div className="container split">
          <div>
            <h2 className="h2">A dependable team for your workplace</h2>
            <p className="lead">
              {COMPANY.name} is a Thane-based company led by {COMPANY.owner}. {COMPANY.speciality}
            </p>
            <p className="lead">
              We know an office cannot stop for long. That is why we plan work carefully, use quality materials and
              finish neatly, so your team can get back to business quickly. From repairing a single chair to
              delivering a complete turnkey interior, you deal with one team that is easy to reach and accountable
              for the result.
            </p>
            <ul className="checks">
              {['Office repairs & maintenance', 'Interior, carpentry, painting & civil contracting', 'Cleaning of carpets, sofas and chairs', 'Supply & fixing of furniture, blinds, curtains and hardware', 'IT / LAN cabling and HVAC services'].map((t) => (
                <li key={t}><Check size={18} /> {t}</li>
              ))}
            </ul>
          </div>
          <div className="about-card">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logo-lockup.png" alt={`${COMPANY.name} logo`} width="380" height="273" />
            <p className="about-tag">Your complete office maintenance partner</p>
            <div className="owner"><strong>{COMPANY.owner}</strong><span>Proprietor, {COMPANY.name}</span></div>
          </div>
        </div>
      </section>

      <section className="section soft">
        <div className="container">
          <SectionHead title="What we stand for" />
          <div className="pillars">
            {VALUES.map((v) => (
              <div key={v.title} className="pillar">
                <h3>{v.title}</h3>
                <p>{v.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section dark">
        <div className="container">
          <SectionHead title="What you can expect from us" />
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
          <SectionHead title="How we work" text="Four steps from your first call to a finished job." />
          <Process />
        </div>
      </section>

      <CtaBand />
    </>
  );
}
