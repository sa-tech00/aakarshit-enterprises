import { SITE_URL } from '@/lib/data';

export default function sitemap() {
  return ['', '/about', '/services', '/gallery', '/contact'].map((p) => ({
    url: `${SITE_URL}${p}`,
    changeFrequency: 'weekly',
    priority: p === '' ? 1 : 0.7,
  }));
}
