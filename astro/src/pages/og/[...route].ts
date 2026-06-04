// Programmatic Open Graph image generator (1200×630) — astro-og-canvas.
// Two layouts: STANDARD (page title + eyebrow) and METRIC (case studies,
// big heroMetric value). Brand palette only: black / white / green.
import { getCollection } from 'astro:content';
import { OGImageRoute } from 'astro-og-canvas';

const GREEN: [number, number, number] = [67, 160, 71]; // #43A047
const BLACK: [number, number, number] = [5, 5, 5]; // #050505
const WHITE: [number, number, number] = [255, 255, 255];

const FONTS = [
  './src/assets/fonts/Oswald-Bold.ttf',
  './src/assets/fonts/SpaceMono-Bold.ttf',
];
const LOGO = { path: './src/assets/og-logo.png', size: [90] as [number] };

interface OGPage {
  title: string;
  description?: string;
  metric?: boolean;
}

// --- Standard pages (RO) -----------------------------------------------------
const standardPages: Record<string, OGPage> = {
  index: { title: 'Performance marketing fără promisiuni goale', description: '// AGENȚIE DE MARKETING · BRAȘOV' },
  servicii: { title: 'Servicii care produc rezultate măsurabile', description: '// CE FACEM' },
  'servicii/meta-ads': { title: 'Meta Ads. Calibrate pentru Andromeda', description: '// SERVICIU 01' },
  'servicii/google-ads': { title: 'Google Ads. Intent peste interest', description: '// SERVICIU 02' },
  'servicii/social-media': { title: 'Social Media. Prezență organică care vinde', description: '// SERVICIU 03' },
  'servicii/web-development': { title: 'Web Development. Site-uri care vând', description: '// SERVICIU 04' },
  'servicii/strategie-audit': { title: 'Strategie & Audit. Înainte de execuție', description: '// SERVICIU 05' },
  'servicii/content-production': { title: 'Content Production. Conținut care performează', description: '// SERVICIU 06' },
  despre: { title: 'Performance marketing fără promisiuni goale', description: '// DESPRE' },
  procesul: { title: 'Cum lucrăm. 5 pași, fără surprize', description: '// PROCESUL' },
  contact: { title: 'Hai să vorbim', description: '// CONTACT · BRAȘOV' },
  portofoliu: { title: 'Proiecte reale, rezultate cuantificate', description: '// PORTOFOLIU' },
};

// --- Case studies → metric layout -------------------------------------------
const caseStudies = await getCollection('caseStudies', ({ data }) => data.language === 'ro');
const csPages: Record<string, OGPage> = {};
for (const cs of caseStudies) {
  const m = cs.data.heroMetric;
  if (m) {
    csPages[`portofoliu/${cs.slug}`] = { title: m.value, description: `${m.label} · ${cs.data.client}`, metric: true };
  } else {
    csPages[`portofoliu/${cs.slug}`] = { title: cs.data.title, description: `// ${cs.data.client.toUpperCase()}` };
  }
}

const pages: Record<string, OGPage> = { ...standardPages, ...csPages };

export const { getStaticPaths, GET } = await OGImageRoute({
  param: 'route',
  pages,
  getImageOptions: (_path, page) => ({
    title: page.title,
    description: page.description ?? '',
    logo: LOGO,
    bgGradient: [BLACK],
    border: { color: GREEN, width: 12, side: 'block-end' },
    padding: 70,
    fonts: FONTS,
    format: 'PNG',
    font: page.metric
      ? {
          // METRIC layout: the value is huge + green, label small + white.
          title: { color: GREEN, size: 150, weight: 700, families: ['Oswald'], lineHeight: 1 },
          description: { color: WHITE, size: 40, weight: 700, families: ['Space Mono'], lineHeight: 1.3 },
        }
      : {
          // STANDARD layout: eyebrow (green mono) above white Oswald title.
          title: { color: WHITE, size: 64, weight: 700, families: ['Oswald'], lineHeight: 1.1 },
          description: { color: GREEN, size: 30, weight: 700, families: ['Space Mono'], lineHeight: 1.4 },
        },
  }),
});
