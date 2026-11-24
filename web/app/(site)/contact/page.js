import { Phone, Mail, MapPin, MessageCircle } from 'lucide-react';
import EnquiryForm from '@/components/EnquiryForm';
import { PageHead } from '@/components/Sections';
import { COMPANY, whatsappLink } from '@/lib/data';

export const metadata = {
  title: 'Contact & Enquiry',
  description: 'Call, WhatsApp or send an enquiry to Akarshit Enterprises, Lokmanya Nagar, Thane (W). Book a site visit.',
  alternates: { canonical: '/contact' },
};

const MAP = `https://www.google.com/maps?q=${encodeURIComponent('Lokmanya Nagar, Thane West, 400606')}&output=embed`;

export default function Contact() {
  return (
    <>
      <PageHead crumb="Contact" title="Contact us" text="Call us directly, message on WhatsApp, or send an enquiry and we will get back to you." />

      <section className="section">
        <div className="container split top">
          <div>
            <ul className="contact-list">
              <li>
                <span className="ic"><Phone size={22} /></span>
                <div>
                  <h3>Call us</h3>
                  <a href={`tel:${COMPANY.phones[0].tel}`}>{COMPANY.phones[0].display}</a>
                  <a href={`tel:${COMPANY.phones[1].tel}`}>{COMPANY.phones[1].display}</a>
                </div>
              </li>
              <li>
                <span className="ic wa"><MessageCircle size={22} /></span>
                <div>
                  <h3>WhatsApp</h3>
                  <a href={whatsappLink()} target="_blank" rel="noopener noreferrer">Chat on {COMPANY.phones[0].display}</a>
                </div>
              </li>
              <li>
                <span className="ic"><Mail size={22} /></span>
                <div><h3>Email</h3><a href={`mailto:${COMPANY.email}`}>{COMPANY.email}</a></div>
              </li>
              <li>
                <span className="ic"><MapPin size={22} /></span>
                <div><h3>Office address</h3><p>{COMPANY.address}</p></div>
              </li>
            </ul>
            <div className="map">
              <iframe title={`${COMPANY.name} location`} src={MAP} loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
            </div>
          </div>
          <div>
            <EnquiryForm id="enquiry" />
          </div>
        </div>
      </section>
    </>
  );
}
