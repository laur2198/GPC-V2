import type { Locale } from './i18n';

interface PageCopy {
  meta: { title: string; description: string };
  hero: { title: string; subtitle: string; ctaLabel: string };
  services?: { title: string; description: string }[];
  steps?: { title: string; description: string }[];
  faq?: { q: string; a: string }[];
  cta?: { title: string; description: string; ctaLabel: string };
}

type LocaleCopy = Record<string, PageCopy>;

export const copy: Record<Locale, LocaleCopy> = {
  ro: {
    home: {
      meta: { title: 'Green Phoenix — Performanță digitală', description: 'Agenție de marketing digital: ads și site-uri care convertesc.' },
      hero: { title: 'Performanță digitală pentru afaceri ambițioase', subtitle: 'Campanii ads și site-uri care convertesc.', ctaLabel: 'Discută cu noi' },
      services: [
        { title: 'Google Ads', description: 'Campanii Search, Shopping, PMax optimizate pentru ROAS.' },
        { title: 'Meta Ads', description: 'Strategii Facebook & Instagram pentru lead-uri și vânzări.' },
        { title: 'Site-uri Web', description: 'Landing pages și site-uri orientate spre conversie.' },
      ],
      steps: [
        { title: 'Audit', description: 'Analizăm situația actuală și identificăm oportunități.' },
        { title: 'Strategie', description: 'Construim planul: target, mesaje, canale, KPI.' },
        { title: 'Execuție', description: 'Lansăm campanii, optimizăm continuu.' },
        { title: 'Scalare', description: 'Creștem bugete pe segmentele care performează.' },
      ],
      faq: [
        { q: 'Cu ce bugete lucrați?', a: 'Pornim de la 1.500€/lună budget media. Recomandăm minim 3 luni pentru rezultate stabile.' },
        { q: 'În cât timp văd rezultate?', a: 'Primele insight-uri în 2 săptămâni; optimizări consistente după 30-45 de zile.' },
      ],
      cta: { title: 'Pregătit să creștem împreună?', description: 'Programează un audit gratuit de 30 de minute.', ctaLabel: 'Contactează-ne' },
    },
    'servicii-ads': {
      meta: { title: 'Servicii Ads — Green Phoenix', description: 'Campanii Google Ads, Meta Ads și TikTok Ads pentru rezultate măsurabile.' },
      hero: { title: 'Campanii ads care aduc clienți', subtitle: 'Google, Meta, TikTok — strategie, execuție și optimizare.', ctaLabel: 'Cere ofertă' },
    },
    'servicii-web': {
      meta: { title: 'Servicii Web — Green Phoenix', description: 'Site-uri și landing pages performante, optimizate pentru conversie.' },
      hero: { title: 'Site-uri web care convertesc', subtitle: 'Design rapid, SEO tehnic și UX bazat pe date.', ctaLabel: 'Solicită proiect' },
    },
    despre: {
      meta: { title: 'Despre noi — Green Phoenix', description: 'Cine suntem și de ce facem ce facem.' },
      hero: { title: 'Despre Green Phoenix', subtitle: 'O echipă focusată pe rezultate, nu pe vanity metrics.', ctaLabel: 'Vorbește cu noi' },
    },
    contact: {
      meta: { title: 'Contact — Green Phoenix', description: 'Discută cu echipa noastră.' },
      hero: { title: 'Hai să vorbim', subtitle: 'Programează un audit gratuit sau cere o ofertă personalizată.', ctaLabel: 'Trimite mesaj' },
    },
    politica: {
      meta: { title: 'Politică de confidențialitate', description: 'Politica de confidențialitate Green Phoenix.' },
      hero: { title: 'Politică de confidențialitate', subtitle: 'Cum colectăm, folosim și protejăm datele tale.', ctaLabel: '' },
    },
    portofoliu: {
      meta: { title: 'Portofoliu — Green Phoenix', description: 'Studii de caz și proiecte realizate.' },
      hero: { title: 'Proiectele noastre', subtitle: 'Rezultate reale pentru clienți reali.', ctaLabel: '' },
    },
    blog: {
      meta: { title: 'Blog — Green Phoenix', description: 'Articole despre marketing digital, ads și optimizare web.' },
      hero: { title: 'Blog', subtitle: 'Insight-uri, ghiduri și studii de caz.', ctaLabel: '' },
    },
  },
  en: {
    home: {
      meta: { title: 'Green Phoenix — Digital performance', description: 'Digital marketing agency: ads and websites that convert.' },
      hero: { title: 'Digital performance for ambitious businesses', subtitle: 'Ad campaigns and websites that convert.', ctaLabel: 'Talk to us' },
      services: [
        { title: 'Google Ads', description: 'Search, Shopping, PMax campaigns optimized for ROAS.' },
        { title: 'Meta Ads', description: 'Facebook & Instagram strategies for leads and sales.' },
        { title: 'Web Development', description: 'Landing pages and sites built for conversion.' },
      ],
      steps: [
        { title: 'Audit', description: 'We analyze the current state and identify opportunities.' },
        { title: 'Strategy', description: 'We build the plan: targeting, messaging, channels, KPIs.' },
        { title: 'Execution', description: 'We launch campaigns and optimize continuously.' },
        { title: 'Scale', description: 'We grow budgets on segments that perform.' },
      ],
      faq: [
        { q: 'What budgets do you work with?', a: 'We start from €1,500/month media budget. We recommend at least 3 months for stable results.' },
        { q: 'How soon will I see results?', a: 'First insights within 2 weeks; consistent optimization after 30-45 days.' },
      ],
      cta: { title: 'Ready to grow together?', description: 'Book a free 30-minute audit.', ctaLabel: 'Contact us' },
    },
    'servicii-ads': {
      meta: { title: 'Ads Services — Green Phoenix', description: 'Google Ads, Meta Ads and TikTok Ads campaigns with measurable results.' },
      hero: { title: 'Ad campaigns that bring clients', subtitle: 'Google, Meta, TikTok — strategy, execution and optimization.', ctaLabel: 'Request a quote' },
    },
    'servicii-web': {
      meta: { title: 'Web Services — Green Phoenix', description: 'High-performance websites and landing pages optimized for conversion.' },
      hero: { title: 'Websites that convert', subtitle: 'Fast design, technical SEO and data-driven UX.', ctaLabel: 'Start a project' },
    },
    despre: {
      meta: { title: 'About — Green Phoenix', description: 'Who we are and why we do what we do.' },
      hero: { title: 'About Green Phoenix', subtitle: 'A team focused on results, not vanity metrics.', ctaLabel: 'Talk to us' },
    },
    contact: {
      meta: { title: 'Contact — Green Phoenix', description: 'Talk to our team.' },
      hero: { title: 'Let’s talk', subtitle: 'Book a free audit or request a custom quote.', ctaLabel: 'Send a message' },
    },
    politica: {
      meta: { title: 'Privacy policy', description: 'Green Phoenix privacy policy.' },
      hero: { title: 'Privacy policy', subtitle: 'How we collect, use and protect your data.', ctaLabel: '' },
    },
    portofoliu: {
      meta: { title: 'Portfolio — Green Phoenix', description: 'Case studies and completed projects.' },
      hero: { title: 'Our work', subtitle: 'Real results for real clients.', ctaLabel: '' },
    },
    blog: {
      meta: { title: 'Blog — Green Phoenix', description: 'Articles on digital marketing, ads and web optimization.' },
      hero: { title: 'Blog', subtitle: 'Insights, guides and case studies.', ctaLabel: '' },
    },
  },
  it: {
    home: {
      meta: { title: 'Green Phoenix — Performance digitale', description: 'Agenzia di marketing digitale: ads e siti che convertono.' },
      hero: { title: 'Performance digitale per aziende ambiziose', subtitle: 'Campagne ads e siti che convertono.', ctaLabel: 'Parla con noi' },
      services: [
        { title: 'Google Ads', description: 'Campagne Search, Shopping, PMax ottimizzate per il ROAS.' },
        { title: 'Meta Ads', description: 'Strategie Facebook & Instagram per lead e vendite.' },
        { title: 'Sviluppo Web', description: 'Landing page e siti progettati per convertire.' },
      ],
      steps: [
        { title: 'Audit', description: 'Analizziamo lo stato attuale e individuiamo le opportunità.' },
        { title: 'Strategia', description: 'Costruiamo il piano: target, messaggi, canali, KPI.' },
        { title: 'Esecuzione', description: 'Lanciamo le campagne e ottimizziamo costantemente.' },
        { title: 'Scala', description: 'Aumentiamo i budget sui segmenti che performano.' },
      ],
      faq: [
        { q: 'Con quali budget lavorate?', a: 'Partiamo da 1.500€/mese di budget media. Consigliamo almeno 3 mesi per risultati stabili.' },
        { q: 'In quanto tempo vedrò risultati?', a: 'Primi insight entro 2 settimane; ottimizzazione costante dopo 30-45 giorni.' },
      ],
      cta: { title: 'Pronto a crescere insieme?', description: 'Prenota un audit gratuito di 30 minuti.', ctaLabel: 'Contattaci' },
    },
    'servicii-ads': {
      meta: { title: 'Servizi Ads — Green Phoenix', description: 'Campagne Google Ads, Meta Ads e TikTok Ads con risultati misurabili.' },
      hero: { title: 'Campagne ads che portano clienti', subtitle: 'Google, Meta, TikTok — strategia, esecuzione e ottimizzazione.', ctaLabel: 'Richiedi un preventivo' },
    },
    'servicii-web': {
      meta: { title: 'Servizi Web — Green Phoenix', description: 'Siti e landing page ad alte performance ottimizzati per la conversione.' },
      hero: { title: 'Siti che convertono', subtitle: 'Design veloce, SEO tecnica e UX basata sui dati.', ctaLabel: 'Avvia un progetto' },
    },
    despre: {
      meta: { title: 'Chi siamo — Green Phoenix', description: 'Chi siamo e perché facciamo quello che facciamo.' },
      hero: { title: 'Chi siamo', subtitle: 'Un team focalizzato sui risultati, non sulle vanity metrics.', ctaLabel: 'Parla con noi' },
    },
    contact: {
      meta: { title: 'Contatti — Green Phoenix', description: 'Parla con il nostro team.' },
      hero: { title: 'Parliamone', subtitle: 'Prenota un audit gratuito o richiedi un preventivo personalizzato.', ctaLabel: 'Invia un messaggio' },
    },
    politica: {
      meta: { title: 'Informativa sulla privacy', description: 'Informativa sulla privacy di Green Phoenix.' },
      hero: { title: 'Informativa sulla privacy', subtitle: 'Come raccogliamo, usiamo e proteggiamo i tuoi dati.', ctaLabel: '' },
    },
    portofoliu: {
      meta: { title: 'Portfolio — Green Phoenix', description: 'Case study e progetti realizzati.' },
      hero: { title: 'I nostri progetti', subtitle: 'Risultati reali per clienti reali.', ctaLabel: '' },
    },
    blog: {
      meta: { title: 'Blog — Green Phoenix', description: 'Articoli su marketing digitale, ads e ottimizzazione web.' },
      hero: { title: 'Blog', subtitle: 'Insight, guide e case study.', ctaLabel: '' },
    },
  },
};

export function getPageCopy(locale: Locale, key: string): PageCopy {
  return copy[locale]?.[key] ?? copy.ro[key];
}
