# AUDIT GPC-V2 — Pregătire migrare Astro 5

**Data:** 2026-05-28
**Branch:** `refactor/astro-prep` (creat din `main`)
**Scop:** Inventar complet pentru migrarea de la HTML static la Astro 5 + Tailwind 4, trilingv RO/IT/EN.
**Sursa de adevăr:** site live deployat pe `laur2198.github.io/GPC-V2/` și `greenpheonixconcept.com`.

---

## 1. Executive Summary

GPC-V2 este un site **HTML static plain** (17 pagini), cu un singur fișier CSS monolitic (1698 linii, 83× `!important`) și un singur `main.js` (394 linii) care concentrează **traduceri inline, tracking GA4/Meta/TikTok, cookie consent, language switcher, cursor custom, reveal animations și conversion tracking**.

Stack-ul actual:
- Fără build tool (HTML pur, deployat ca-i pe GitHub Pages)
- Fără i18n funcțional — există schelet `data-lang` în toate paginile și `translations` în `main.js`, dar **EN și IT sunt obiecte goale** (comentariu „Păstrează traducerile tale”), iar singurul buton din switcher este RO.
- Tracking deja instalat și gated cu cookie consent (GA4, Meta Pixel, TikTok Pixel).
- Schema markup `ProfessionalService` + `FAQPage` doar pe `index.html`.

Există deja un schelet **Astro 5 + Tailwind** în `astro/` cu i18n RO/IT/EN, Content Collections (blog + caseStudies), RSS și 9 pagini Astro — neconectat la build/deploy curent. Migrarea trebuie să consolideze acest schelet, nu să pornească de la zero.

**Decizii principale recomandate:**
1. Continuă pe `astro/` ca punct de plecare (deja are i18n complet și Content Collections).
2. Optimizează urgent assets: 4 fișiere > 1.9 MB livrate ca-s (hero, video, founder, europa).
3. Curăță CSS monolit + cookie-banner duplicat înainte de port.
4. Migrează doar 1 case study real (BPD Transport) — restul portofoliului este placeholder „Coming Soon”.

---

## 2. Inventar fișiere

### HTML — 17 pagini (total 6.369 linii cu CSS/JS)

| Fișier | Linii | Rol |
|---|---:|---|
| `index.html` | 482 | Homepage |
| `landing-transportatori.html` | 304 | Landing vertical transport |
| `servicii-ads.html` | 299 | Pagina servicii Ads |
| `landing-ecommerce.html` | 284 | Landing vertical e-commerce |
| `landing-horeca.html` | 283 | Landing vertical HoReCa |
| `servicii-web.html` | 282 | Pagina servicii Web |
| `contact.html` | 278 | Formular contact |
| `blog-site-conversii.html` | 261 | Articol blog |
| `blog-facebook-ads.html` | 252 | Articol blog |
| `blog-roas.html` | 249 | Articol blog |
| `blog.html` | 228 | Index blog |
| `proiect-detaliu.html` | 224 | Template generic case study (gol) |
| `portofoliu.html` | 193 | Listă portofoliu |
| `studiu-caz-bpd.html` | 192 | Case study real (BPD Transport) |
| `despre.html` | 188 | About / founder |
| `politica.html` | 176 | GDPR / privacy |
| `404.html` | 102 | Pagina 404 |

### CSS — 1 fișier
- `style.css` — **1698 linii**, 83× `!important`, conține cookie-banner **definit de două ori** (linia 901 și linia 1331).

### JS — 1 fișier
- `main.js` — **394 linii**, conține: `TRACKING_CONFIG`, `translations`, `loadMarketingPixels`, `setupCookieBanner`, `setupLangSwitcher`, `setupMenu`, `setupCursor`, `setupReveal`, `setupConversionTracking`.

### Assets media (>100 KB)

| Asset | Mărime | Notă |
|---|---:|---|
| `hero_gpc.svg` | **2.9 MB** | SVG hero — extrem de mare, probabil cu raster embedded |
| `video marketing bpd.mp4` | 2.4 MB | Video case study BPD |
| `founder.png` | **2.3 MB** | Foto founder needă-compresată |
| `video website bpd.mp4` | 2.3 MB | Video case study BPD |
| `mockup_laptop_bpd.mp4` | 1.9 MB | Mockup laptop BPD |
| `europa.png` | **1.9 MB** | Harta Europa (caz BPD) |
| `mockup_web_mobil.svg` | 988 KB | Mockup mobil |
| `logo_gpc.svg` | **567 KB** | Logo — probabil raster embedded |
| `solutionarea_alternativa.png` | 51 KB | ANPC SAL |
| `solutionarea_oline.png` | 51 KB | ANPC SOL |

### Config & infra
- `sitemap.xml`, `robots.txt`, `favicon.svg` + `favicon-16.png` + `favicon-32.png`
- **Niciun `.github/workflows`** la root — deploy probabil prin GitHub Pages auto din `main`
- **Niciun `package.json`** la root — proiectul curent e HTML pur

### Folder `astro/` (schelet pregătit, neconectat)
- `package.json`: `astro@^5.0.0`, `@astrojs/tailwind@^5.1.5`, `tailwindcss@^3.4.17`, `@astrojs/rss`, `@astrojs/sitemap`, `@tailwindcss/typography`
- `src/pages/`: `index.astro`, `servicii-web.astro`, `servicii-ads.astro`, `despre.astro`, `contact.astro`, `politica.astro`, `multumim.astro`, `404.astro`, `rss.xml.js`
- `src/components/`: Navbar, Hero, CaseStudyCard, ServiceCard, TrustBar, Footer, LanguageSwitcher, CTA, CookieConsent, Testimonial, BlogCard, FAQ, HowWeWork
- `src/i18n/`: `ro.json` (7.2 KB), `it.json` (7.1 KB), `en.json` (6.8 KB) — **complete!**
- `src/content/blog/`: 4 articole în markdown (RO + IT)
- `src/content/caseStudies/`: folder gol
- `src/styles/global.css`, `src/utils/i18n.ts`, `src/utils/content.ts`

### Docs existente la root
- `AUDIT_COMPLETE.md` (33 KB), `AUDIT_REPORT.md` (27 KB) — audituri anterioare
- `STATUS.md` (6 KB), `DEPLOY_GUIDE.md` (5 KB), `GOOGLE-BUSINESS-SETUP.md` (4 KB)

---

## 3. Temă vizuală — CONFIRMAT LIGHT / SWISS

Variabile CSS din `style.css:1-30`:

```css
--bg-main:      #FFFFFF;    /* alb pur */
--bg-card:      #F4F4F5;    /* gri foarte deschis */
--bg-surface:   #E4E4E7;
--text-primary: #050505;    /* aproape negru */
--text-secondary: #52525B;
--brand-primary: #43A047;   /* verde Green Pheonix */
--brand-dark:    #2E7D32;
--brand-light:   #66BB6A;
--accent-red:    #FF0033;
--accent-red-dark: #CC0029;
```

`body { background-color: var(--bg-main) /* #FFFFFF */ }` — **fundal alb confirmat**.

Fonturi: Oswald (display, uppercase), Space Grotesk (body), Space Mono.
Estetică: Swiss / brutalist editorial — `text-outline`, ticker, `noise-overlay`, cursor custom, reveal animations.

**Concluzie: tema este light/Swiss alb, exact cum se așteaptă.**

---

## 4. Inventar conținut & pagini

### 4.1 Structură pagini

| Categorie | Pagini |
|---|---|
| Core | index, despre, contact, politica, 404 |
| Servicii | servicii-ads, servicii-web |
| Portofoliu | portofoliu, studiu-caz-bpd, proiect-detaliu (template gol) |
| Blog | blog (index), blog-facebook-ads, blog-roas, blog-site-conversii |
| Landings verticale | landing-ecommerce, landing-horeca, landing-transportatori |

### 4.2 Case studies / clienți

**Singurul case study real: BPD Transport / BPD Trans** (`studiu-caz-bpd.html`)
- Apare în: `index.html`, `portofoliu.html`, `proiect-detaliu.html`, `landing-transportatori.html`, `studiu-caz-bpd.html`
- Asset-uri dedicate: `video marketing bpd.mp4`, `video website bpd.mp4`, `mockup_laptop_bpd.mp4`, `logo_bpdtrans.png`, `europa.png`
- Numerele revendicate: `-35% CPL`, `+120 rezervări/lună`, `24/7 sistem`

**NU am găsit niciun fel de referință** la **CBS, Kokoro sau Lemet** în HTML/CSS/JS.

**În `despre.html:123`** menționează **„Reinert și Martinel”** ca proiecte anterioare (experiență founder, nu clienți GPC actuali).

În `portofoliu.html:127-140` există un singur card placeholder **„ÎN CURÂND — Proiect nou e-commerce”** (opacity 0.45, pointer-events:none).

### 4.3 Statistici (real vs fabricat)

| Cifră | Locație | Tip |
|---|---|---|
| `-35% CPL` | studiu-caz-bpd + portofoliu | Atribuit BPD (revendicat real) |
| `+120 rezervări/lună` | studiu-caz-bpd + portofoliu | Atribuit BPD |
| `24/7 sistem` | studiu-caz-bpd + portofoliu | Generic |
| `ROAS 4.8X` în hero card | `index.html:198` | **Mockup decorativ** (dashboard fictiv) |
| `7 campanii active` | `index.html:203` | Mockup decorativ |
| `ROAS 4.5X` în service card | `index.html:298` | Mockup decorativ |
| `4.8 lei câștigați per 1 leu` | `index.html:200` | Mockup decorativ |

> Restul site-ului folosește exclusiv copywriting calitativ (fără cifre absolute fabricate).

### 4.4 i18n — semnal mixt

- Toate HTML-urile au `lang="ro"` hardcoded și atribut `data-lang="…"` pe elemente traduse (~50 chei).
- `main.js:11` definește `translations = { ro: {…full}, en: {…GOL}, it: {…GOL} }`. EN și IT sunt comentate `// Păstrează traducerile tale`.
- Switcher în UI: **un singur buton `<button onclick="changeLanguage('ro')">RO</button>`** — nu există butoane EN/IT.
- `hreflang` în `<head>` listează doar `ro` + `x-default` (același URL).
- ✅ **DAR** în `astro/src/i18n/` cele 3 fișiere JSON (ro/it/en) sunt **complete** (~7 KB fiecare). Tezaurul de traduceri pentru migrare există acolo.

---

## 5. Probleme tehnice

### 5.1 Critice (P0)

1. **Assets gigantice livrate fără optimizare** — `hero_gpc.svg` 2.9 MB, `founder.png` 2.3 MB, `europa.png` 1.9 MB, `logo_gpc.svg` 567 KB. Hero SVG-ul singur depășește orice buget Lighthouse. SVG-urile au foarte probabil raster embedded.
2. **i18n promis dar nelivrat** — switcher cu un singur buton RO, `hreflang` doar pentru RO, traduceri EN/IT goale în `main.js`, dar conținut data-lang pe toate paginile. Site-ul declară (în meta, în UI, în descriere) că e multilingv — nu este.
3. **Niciun `package.json` la root, niciun CI** — nu există build, test, lint, deploy reproductibil. Site-ul live e pushed-as-is.

### 5.2 Moderate (P1)

4. **CSS monolit cu 83× `!important`** — 1698 linii, greu de refactorizat per-pagină. Va trebui spart pe componente la port-ul Astro.
5. **`.cookie-banner` definit de două ori** în `style.css` (linia 901-940 și 1331-1395). Conflict de styling.
6. **`main.js` monolit, 394 linii**, amestecă traduceri + tracking + UI + cursor + reveal. Greu de tree-shake la migrare.
7. **`proiect-detaliu.html` este template gol** (224 linii) care nu corespunde la niciun case study real — dead weight.
8. **Tracking IDs hardcoded** în `main.js:5-9` (GA4 `G-BP0J2SJTP1`, Meta Pixel `1250834263629342`, TikTok `D64F6T3C77U69UNGKT30`). OK pentru client-side, dar la migrarea Astro ar trebui mutate în env vars + `<script>` în layout, nu în logică JS.
9. **Schema markup doar pe `index.html`** — `ProfessionalService` și `FAQPage` lipsesc de pe servicii / case studies / blog. Pierdem AEO/GEO pe paginile cu cea mai mare valoare semantică.
10. **`logo_bpdtrans.png` 17 KB** — există în root, nereferențiat din nicio pagină (verificare necesară la port).

### 5.3 Minore (P2)

11. **Inline styles abundente** în `portofoliu.html`, `studiu-caz-bpd.html`, `index.html` (sticky-card, stat-box). Va trebui mutat în Tailwind 4 utility classes sau componente Astro.
12. **Mix de fonturi încărcate de pe Google Fonts** fără `font-display: swap` explicit pe toate.
13. **Două fișiere de audit anterioare** (`AUDIT_COMPLETE.md`, `AUDIT_REPORT.md`) însumează 61 KB — pot fi arhivate în `docs/` la port.
14. **Cursor custom hover doar pe `pointer: fine`** OK, dar adaugă greutate JS pe desktop fără valoare clară pentru SEO/UX.
15. **Comentariul de copyright** spune `&copy; 2026` — corect pentru anul curent, dar va trebui dinamizat în Astro.

### 5.4 Pozitive (de păstrat)

- ✅ **Brand consistency**: zero ocurențe „Phoenix” (cu „h”) — peste tot „Pheonix” (intentional).
- ✅ Cookie consent gating tracking — GDPR compliant.
- ✅ Conversion tracking deja instalat (form submit, WhatsApp, tel:, mailto:, scroll 75%).
- ✅ Schema `ProfessionalService` + `FAQPage` pe homepage.
- ✅ `sitemap.xml` și `robots.txt` prezente.
- ✅ Favicon set complet (SVG + 16 + 32).
- ✅ ANPC SAL/SOL în footer (legal RO obligatoriu).
- ✅ Folder `astro/` deja are i18n complet RO/IT/EN și 4 articole blog markdown — **bază solidă de pornit**.

---

## 6. Recomandări next step

### Faza 0 — Curățenie pe `refactor/astro-prep` (înainte de port)
- Optimizează / înlocuiește `hero_gpc.svg`, `founder.png`, `europa.png`, `logo_gpc.svg` (vector pur sau WebP).
- Dezduplica `.cookie-banner` în `style.css`.
- Decide soarta `proiect-detaliu.html` (șterge sau înlocuiește cu real case study viitor).

### Faza 1 — Consolidare schelet Astro
- Verifică ce există în `astro/src/pages/` față de cele 17 HTML-uri și marchează gap-urile (lipsă: blog articles, landings verticale, studiu-caz-bpd, portofoliu, blog index).
- Setează `astro.config.mjs` cu `i18n: { defaultLocale: 'ro', locales: ['ro','it','en'] }`.
- Mută tracking-ul din `main.js` într-un component `<TrackingScripts>` în BaseLayout, cu IDs din env.

### Faza 2 — Migrare pagini
- Port homepage + servicii Ads/Web ca pilot (cele 3 pagini cu cel mai mult conținut și mai multe data-lang chei).
- Migrate `studiu-caz-bpd` ca primul Content Collection entry în `caseStudies/`.
- Port-ul restului paginilor după ce layout-ul și i18n-ul sunt validate pe pilot.

### Faza 3 — AEO/GEO + integrări
- Extinde schema markup pe servicii (`Service`), case studies (`Article` + `Organization`), blog (`Article` + `BreadcrumbList`).
- Integrare Stripe Payment Links (CTA „Plătește acont”) și Resend pentru formularele de contact.
- Configurează GitHub Actions: build Astro + deploy pe Pages (sau Vercel/Cloudflare).

### Faza 4 — Tăiere monolit & decommission
- Mută `style.css` + `main.js` complet în componente Astro / utils.
- Șterge HTML-urile vechi din root după validare paritate.
- Arhivează `AUDIT_COMPLETE.md` și `AUDIT_REPORT.md` în `docs/`.

---

## Anexa A — Pixeluri tracking instalate

```js
ga4_id:           'G-BP0J2SJTP1'           // main.js:6
meta_pixel_id:    '1250834263629342'       // main.js:7
tiktok_pixel_id:  'D64F6T3C77U69UNGKT30'   // main.js:8
```

Toate trei sunt încărcate doar după `cookieConsent === 'granted'` (`main.js:225-260`).

## Anexa B — Schema markup existent

- `index.html:25-63` — `ProfessionalService` (telefon +40793650902, geo Brașov 45.6579/25.6012, openingHours, sameAs Facebook/Instagram/TikTok)
- `index.html:64-95` — `FAQPage` (3 întrebări: buget minim, timp rezultate, contract minim)
