import './globals.css';
import { COMPANY, SITE_URL } from '@/lib/data';

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${COMPANY.name} – Office Repair, Cleaning & Interior Solutions in Thane`,
    template: `%s | ${COMPANY.name}`,
  },
  description:
    'Office chair repair, sofa & carpet cleaning, interior turnkey, partitions, carpentry, painting, IT cabling, blinds and more – all under one roof in Thane, Mumbai.',
  keywords: [
    'office repair Thane', 'interior contractor Thane', 'office chair repair', 'sofa cleaning Thane',
    'glass partition', 'modular workstation', 'IT cabling', 'blinds and curtains', 'Akarshit Enterprises',
  ],
  openGraph: {
    title: COMPANY.name,
    description: COMPANY.tagline,
    type: 'website',
    locale: 'en_IN',
    siteName: COMPANY.name,
    images: [{ url: '/og.png', width: 1200, height: 630, alt: `${COMPANY.name} logo` }],
  },
  robots: { index: true, follow: true },
};

export const viewport = { themeColor: '#0B2A63', width: 'device-width', initialScale: 1 };

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'HomeAndConstructionBusiness',
  name: COMPANY.name,
  description: COMPANY.tagline,
  url: SITE_URL,
  logo: `${SITE_URL}/logo-lockup.png`,
  image: `${SITE_URL}/og.png`,
  telephone: COMPANY.phones.map((p) => p.tel),
  email: COMPANY.email,
  founder: COMPANY.owner,
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Swami Samarth Suvarna Colony, Plot No. 6, Lokmanya Nagar',
    addressLocality: 'Thane (W)',
    addressRegion: 'Maharashtra',
    postalCode: '400606',
    addressCountry: 'IN',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en-IN">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Archivo:wdth,wght@62..125,100..900&display=swap"
        />
      </head>
      <body>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        {children}
      </body>
    </html>
  );
}
