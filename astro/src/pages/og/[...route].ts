// Programmatic Open Graph image generator (1200×630) — astro-og-canvas.
// Two layouts: STANDARD (page title + eyebrow) and METRIC (case studies,
// big heroMetric value). Brand palette only: black / white / green.
//
// Localized: every standard page is generated for ro / en / it. RO masters
// live at /og/<route>.png; localized variants at /og/<locale>/<route>.png.
// The per-locale copy below is bespoke OG-card marketing copy (punchier than
// the page meta titles) and is tone-matched per language, not literal — kept
// here rather than in i18n by design. BaseLayout maps each page to its key.
import { getCollection } from 'astro:content';
import { OGImageRoute } from 'astro-og-canvas';

const GREEN: [number, number, number] = [67, 160, 71]; // #43A047
const BLACK: [number, number, number] = [5, 5, 5]; // #050505
const WHITE: [number, number, number] = [255, 255, 255];

const FONTS = [
  './src/assets/fonts/Oswald-Bold.ttf',
  './src/assets/fonts/SpaceMono-Bold.ttf',
];
// Green phoenix mark (extracted from the hero logo) on the dark OG card.
const LOGO = { path: './src/assets/phoenix-mark.png', size: [70] as [number] };

type Locale = 'ro' | 'en' | 'it';
const LOCALES: Locale[] = ['ro', 'en', 'it'];

interface OGPage {
  title: string;
  description?: string;
  metric?: boolean;
}

// --- Standard pages, per locale ---------------------------------------------
// RO is the master; EN/IT are tone-matched marketing copy (not word-for-word).
const standardPages: Record<string, Record<Locale, OGPage>> = {
  index: {
    ro: { title: 'Performance marketing fără promisiuni goale', description: '// AGENȚIE DE MARKETING · BRAȘOV' },
    en: { title: 'Performance marketing. No empty promises.', description: '// MARKETING AGENCY' },
    it: { title: 'Performance marketing. Niente promesse a vuoto.', description: '// AGENZIA DI MARKETING' },
  },
  servicii: {
    ro: { title: 'Servicii care produc rezultate măsurabile', description: '// CE FACEM' },
    en: { title: 'Services that deliver measurable results', description: '// WHAT WE DO' },
    it: { title: 'Servizi che producono risultati misurabili', description: '// COSA FACCIAMO' },
  },
  'servicii/meta-ads': {
    ro: { title: 'Meta Ads. Calibrate pentru Andromeda', description: '// SERVICIU 01' },
    en: { title: 'Meta Ads. Tuned for Andromeda', description: '// SERVICE 01' },
    it: { title: 'Meta Ads. Ottimizzati per Andromeda', description: '// SERVIZIO 01' },
  },
  'servicii/google-ads': {
    ro: { title: 'Google Ads. Intent peste interest', description: '// SERVICIU 02' },
    en: { title: 'Google Ads. Intent over interest', description: '// SERVICE 02' },
    it: { title: 'Google Ads. Intent, non interesse', description: '// SERVIZIO 02' },
  },
  'servicii/social-media': {
    ro: { title: 'Social Media. Prezență organică care vinde', description: '// SERVICIU 03' },
    en: { title: 'Social Media. Organic presence that sells', description: '// SERVICE 03' },
    it: { title: 'Social Media. Presenza organica che vende', description: '// SERVIZIO 03' },
  },
  'servicii/web-development': {
    ro: { title: 'Web Development. Site-uri care vând', description: '// SERVICIU 04' },
    en: { title: 'Web Development. Websites that sell', description: '// SERVICE 04' },
    it: { title: 'Web Development. Siti che vendono', description: '// SERVIZIO 04' },
  },
  'servicii/strategie-audit': {
    ro: { title: 'Strategie & Audit. Înainte de execuție', description: '// SERVICIU 05' },
    en: { title: 'Strategy & Audit. Before the spend', description: '// SERVICE 05' },
    it: { title: 'Strategia & Audit. Prima di spendere', description: '// SERVIZIO 05' },
  },
  'servicii/content-production': {
    ro: { title: 'Content Production. Conținut care performează', description: '// SERVICIU 06' },
    en: { title: 'Content Production. Content that performs', description: '// SERVICE 06' },
    it: { title: 'Content Production. Contenuti che performano', description: '// SERVIZIO 06' },
  },
  despre: {
    ro: { title: 'Performance marketing fără promisiuni goale', description: '// DESPRE' },
    en: { title: 'Performance marketing. No empty promises.', description: '// ABOUT' },
    it: { title: 'Performance marketing. Niente promesse a vuoto.', description: '// CHI SIAMO' },
  },
  procesul: {
    ro: { title: 'Cum lucrăm. 5 pași, fără surprize', description: '// PROCESUL' },
    en: { title: 'How we work. 5 steps, zero surprises', description: '// THE PROCESS' },
    it: { title: 'Come lavoriamo. 5 passi, zero sorprese', description: '// IL PROCESSO' },
  },
  contact: {
    ro: { title: 'Hai să vorbim', description: '// CONTACT · BRAȘOV' },
    en: { title: "Let's talk", description: '// CONTACT' },
    it: { title: 'Parliamone', description: '// CONTATTI' },
  },
  portofoliu: {
    ro: { title: 'Proiecte reale, rezultate cuantificate', description: '// PORTOFOLIU' },
    en: { title: 'Real projects, quantified results', description: '// PORTFOLIO' },
    it: { title: 'Progetti reali, risultati quantificati', description: '// PORTFOLIO' },
  },
};

const pages: Record<string, OGPage> = {};
// Standard pages: RO at <route>, en/it at <locale>/<route>.
for (const [route, byLocale] of Object.entries(standardPages)) {
  for (const locale of LOCALES) {
    const key = locale === 'ro' ? route : `${locale}/${route}`;
    pages[key] = byLocale[locale];
  }
}

// --- Case studies → metric layout, every locale -----------------------------
// Slugs carry a -en/-it suffix; the public route strips it, so OG keys use the
// clean slug to match the page URL. Copy (heroMetric value + label, client)
// comes from each locale variant's already-translated frontmatter — no manual
// translation here. The value is taken verbatim, so number formatting (EN dot
// / IT comma) follows whatever the content file already uses.
const caseStudies = await getCollection('caseStudies');
for (const cs of caseStudies) {
  const locale = (cs.data.language ?? 'ro') as Locale;
  const cleanSlug = cs.slug.replace(/-(en|it)$/, '');
  const route = `portofoliu/${cleanSlug}`;
  const key = locale === 'ro' ? route : `${locale}/${route}`;
  const m = cs.data.heroMetric;
  if (m) {
    pages[key] = { title: m.value, description: `${m.label} · ${cs.data.client}`, metric: true };
  } else {
    pages[key] = { title: cs.data.title, description: `// ${cs.data.client.toUpperCase()}` };
  }
}

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
