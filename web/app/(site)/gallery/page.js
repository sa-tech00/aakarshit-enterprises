import Link from 'next/link';
import { GalleryGrid, CtaBand, PageHead } from '@/components/Sections';
import { serverGet } from '@/lib/api';

export const metadata = {
  title: 'Our Work',
  description: 'Photos of office repair, partition, interior and cleaning work by Akarshit Enterprises, Thane.',
  alternates: { canonical: '/gallery' },
};
export const revalidate = 60;

export default async function GalleryPage() {
  const items = await serverGet('/gallery');
  return (
    <>
      <PageHead crumb="Our work" title="Our work" text="A look at some of the offices we have repaired, cleaned and built." />
      <section className="section">
        <div className="container">
          {items.length ? (
            <GalleryGrid items={items} />
          ) : (
            <div className="empty">
              <h2>Project photos are being added</h2>
              <p>Call us to see samples of our work, or send an enquiry and we will share relevant examples.</p>
              <Link href="/contact#enquiry" className="btn btn-primary">Send an enquiry</Link>
            </div>
          )}
        </div>
      </section>
      <CtaBand />
    </>
  );
}
