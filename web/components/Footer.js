import Link from 'next/link';
import { Phone, Mail, MapPin } from 'lucide-react';
import { COMPANY, SERVICES, CORE_SLUGS } from '@/lib/data';
import { Brand } from './Header';
import Stripes from './Stripes';

export default function Footer() {
  const featured = CORE_SLUGS.map((s) => SERVICES.find((x) => x.slug === s)).filter(Boolean);
  return (
    <footer className="footer">
      <Stripes className="footer-stripes" />
      <div className="container">
        <div className="footer-grid">
          <div>
            <Brand light />
            <p className="footer-about">
              {COMPANY.speciality}
            </p>
          </div>
          <div>
            <h4>Company</h4>
            <ul>
              <li><Link href="/">Home</Link></li>
              <li><Link href="/about">About us</Link></li>
              <li><Link href="/services">Services</Link></li>
              <li><Link href="/gallery">Our work</Link></li>
              <li><Link href="/contact">Contact &amp; enquiry</Link></li>
            </ul>
          </div>
          <div>
            <h4>Services</h4>
            <ul>
              {featured.map((s) => (
                <li key={s.slug}><Link href={`/services#${s.slug}`}>{s.title}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <h4>Contact</h4>
            <ul>
              <li className="line"><MapPin size={18} /> <span>{COMPANY.address}</span></li>
              <li className="line"><Phone size={18} /> <span>
                <a href={`tel:${COMPANY.phones[0].tel}`}>{COMPANY.phones[0].display}</a>, <a href={`tel:${COMPANY.phones[1].tel}`}>{COMPANY.phones[1].display}</a>
              </span></li>
              <li className="line"><Mail size={18} /> <a href={`mailto:${COMPANY.email}`}>{COMPANY.email}</a></li>
            </ul>
          </div>
        </div>
        <div className="copyright">
          <span>© {new Date().getFullYear()} {COMPANY.name}. All rights reserved.</span>
          <span>Proprietor: {COMPANY.owner}</span>
        </div>
      </div>
    </footer>
  );
}
