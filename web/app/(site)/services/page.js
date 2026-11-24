import { ServiceCatalogue, CtaBand, PageHead } from '@/components/Sections';
import { SERVICES } from '@/lib/data';

export const metadata = {
  title: 'Our Services',
  description:
    'Interior turnkey, partitions, carpentry, painting, chair & sofa repair, cleaning, blinds, curtains, IT cabling, HVAC and more from Akarshit Enterprises, Thane.',
  alternates: { canonical: '/services' },
};

export default function ServicesPage() {
  return (
    <>
      <PageHead
        crumb="Services"
        title="Our services"
        text={`${SERVICES.length} services for your office, from repair and cleaning to supply, interiors and IT cabling, all from one vendor. Not listed? Ask us and we will arrange it.`}
      />
      <section className="section">
        <div className="container">
          <ServiceCatalogue />
        </div>
      </section>
      <CtaBand />
    </>
  );
}
