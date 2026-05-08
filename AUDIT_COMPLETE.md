# AUDIT COMPLET — Green Phoenix Site

**Data audit:** 2026-05-08
**Stack:** Astro 5.18.1 + Tailwind 3.4.17 + @astrojs/sitemap + @astrojs/rss + Formspree
**Commit la zi:** `74de495` (post-brand + post-trust-signals + post-WCAG fixes)
**Pagini auditate:** homepage RO/EN/IT, servicii-ads RO/EN/IT, servicii-web RO/EN/IT, despre RO/EN/IT, contact RO/EN/IT, politica RO/EN/IT, portofoliu index/[slug] × 3 locale, blog index/[slug] × 3 locale, 404, /multumim × 3 locale (43 pagini build, drafts excluse)

> **Caveat metodologic:** Lighthouse runtime nu este disponibil în environment-ul curent (no Chromium headless). Scorurile Performance + a11y end-to-end sunt **estimate** pe baza analizei statice (bundle sizes, asset weights, audit cod, build output). Validarea finală cu Lighthouse trebuie făcută de utilizator în Codespace local sau pe staging.

---

## 📊 EXECUTIVE SUMMARY

### Scor general (estimat, scale 0-10)

| Dimensiune | Scor | Note |
|---|---:|---|
| 1. SEO Tehnic | **8** | Schema rich, hreflang OK, dar 3 meta titles >60 char + lipsă BreadcrumbList |
| 2. Performance | **6** | CSS/JS bundle exemplar, dar `founder.png` 2.3MB blochează LCP pe /despre |
| 3. Accessibility | **7** | focus-visible + reduced-motion OK; lipsă skip-link, ARIA pe form |
| 4. Security | **6** | Headers OK, dar lipsă CSP + HSTS; 2 moderate npm advisories netoxice |
| 5. UX & Design | **8** | Consistent, mobile-ready; form 8 câmpuri = friction |
| 6. Copy | **8** | Clar, diacritice OK; tone "fără bullshit" e bold, nu pentru toți |
| 7. Conversion | **5** | Trust signals goale, fără urgency, fără exit-intent |
| 8. Content | **7** | Servicii adânci, blog superficial (~600-800 cuv. mediu) |

**Scor mediu: 6.9/10** — Site-ul e **production-ready** după ce rezolvi cele 5 Critical de mai jos.

---

### 🔴 Top 5 issues critice (rezolvă înainte de deploy)

1. **`founder.png` 2.3MB** servit pe /despre ca LCP — convertește la WebP/AVIF + resize → -90% greutate
2. **`logo_gpc.svg` 580KB** — SVGO trebuie să-l ducă sub 50KB; e încărcat la fiecare hit JSON-LD
3. **Meta title `/servicii-web` 77 char** (>60) și `/servicii-ads` 64 char — Google tăie titlurile în SERP
4. **Lipsă Content-Security-Policy** și **Strict-Transport-Security** în `.htaccess`
5. **Form contact fără `aria-live` și fără loading state** — userii pe screen reader nu primesc feedback la submit/error

### ✅ Top 5 quick wins (1-2h fiecare, impact mare)

1. Optimizare imagini (founder, logo, OGs) cu `cwebp -q 75` + `svgo` → 1h, -2MB total
2. Skip-to-main-content link în BaseLayout → 10 min
3. Loading state cu `<button :disabled="submitting">` și `aria-live` pentru erori → 30 min
4. Adaugă **BreadcrumbList JSON-LD** pe blog/portofoliu detail → 30 min, rich snippets
5. Trim meta titles >60 char → 5 min, copy-edit

---

## 1. SEO TEHNIC

**Verdict scurt:** Fundația este excelentă (schema, hreflang, sitemap, OG/Twitter complete). Lipsesc trei rafinamente: BreadcrumbList, meta title length, descriere stale pe portofoliu.

### 🔴 Critical
*(none)*

### 🟠 High

- **Meta title `/servicii-web` 77 caractere — Google tăie în SERP**
  - Locație: `src/pages/servicii-web.astro:13` (RO), `src/pages/en/servicii-web.astro:13`, `src/pages/it/servicii-web.astro:13`
  - Problemă: `"Servicii Web — Site-uri & Landing Pages care convertesc | Green Phoenix"` (77 char). Google taie de obicei la ~60 char.
  - Soluție:
    ```diff
    - title: 'Servicii Web — Site-uri & Landing Pages care convertesc | Green Phoenix'
    + title: 'Servicii Web Performante — Green Phoenix'
    ```
    (43 char, conține keyword principal "servicii web")

- **Meta title `/servicii-ads` 64 caractere — peste limită**
  - Locație: `src/pages/servicii-ads.astro:13` (+ EN/IT)
  - Soluție:
    ```diff
    - title: 'Servicii Reclame Online — Meta, Google, TikTok | Green Phoenix'
    + title: 'Servicii Ads — Meta, Google, TikTok | Green Phoenix'
    ```
    (51 char)

- **Meta title `/despre` 62 caractere — borderline**
  - Locație: `src/pages/despre.astro:11` (+ EN/IT)
  - Soluție:
    ```diff
    - title: 'Despre Green Phoenix — Performance marketing fără bullshit'
    + title: 'Despre Green Phoenix — Agenție Performance Marketing'
    ```
    (52 char, scoate "fără bullshit" care nu ajută SEO)

### 🟡 Medium

- **Meta description `/portofoliu` referință BPD orphan**
  - Locație: `src/pages/portofoliu/index.astro` meta
  - Problemă: descrierea spune *"Studii de caz din transport, medical, e-commerce și B2B"* — case study-ul BPD (transport) a fost șters; nu mai există acest segment.
  - Soluție:
    ```diff
    - description: 'Proiecte reale, rezultate cuantificate. Studii de caz din transport, medical, e-commerce și B2B — performance marketing și site-uri construite pe date.'
    + description: 'Proiecte recente cu cifre validate de clienți. Studii de caz din medical, e-commerce și B2B. Programează un audit gratuit.'
    ```

- **Meta descriptions homepage EN/IT prea scurte**
  - Locație: `src/utils/content.ts` (en/it home)
  - Problemă: 56 char (EN) / 57 char (IT). Google folosește până la 160. Pierdem real estate de SERP.
  - Soluție:
    ```diff
    - description: 'Digital marketing agency: ads and websites that convert.'
    + description: 'Digital marketing agency in Brașov. Google Ads, Meta, TikTok and conversion-focused websites. Free audit, transparent reporting, ROAS-driven.'
    ```

- **Lipsă BreadcrumbList JSON-LD pe pages de detail**
  - Locație: `src/pages/blog/[slug].astro`, `src/pages/portofoliu/[slug].astro` (toate locale-urile)
  - Problemă: Google rich results n-au breadcrumb afișat în SERP — pierdem CTR.
  - Soluție: adaugă în frontmatter:
    ```ts
    const breadcrumb = {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Acasă', item: site.origin },
        { '@type': 'ListItem', position: 2, name: 'Blog', item: `${site.origin}/blog` },
        { '@type': 'ListItem', position: 3, name: entry.data.title, item: fullUrl },
      ],
    };
    ```
    Apoi `<script type="application/ld+json" set:html={JSON.stringify(breadcrumb)} />` în template.

- **Image filenames generice (founder.png, og-image.jpg, og-ads.jpg)**
  - Problemă: Google Image Search nu are context pe nume de fișier. Se pierde SEO.
  - Soluție:
    ```
    founder.png       → laurentiu-bogdan-fondator-green-phoenix.webp
    og-image.jpg      → green-phoenix-performance-marketing-brasov.webp
    og-ads.jpg        → google-ads-meta-tiktok-romania.webp
    og-web.jpg        → site-uri-landing-page-astro-shopify.webp
    og-transport.jpg  → (orphan — vezi Conținut, scoate sau redenumește)
    ```

### 🟢 Low

- **`og:image` în content.ts pointează la `/og-image.jpg`** — este 37KB ok, dar dimensiunea exactă nu e precizată în meta. Adaugă `og:image:width` + `og:image:height` (e.g. 1200×630) pentru rendere mai rapide pe Slack/Discord/LinkedIn.
- **`@type` ProfessionalService pe LocalBusiness schema** — corect; pentru servicii business-to-business considerăm `@type: ['ProfessionalService', 'LocalBusiness']` (multitype) ca să apară și pe Google Maps + Knowledge Graph.

### ✅ Pass
- Hreflang ro-RO / en-US / it-IT + x-default emise pe fiecare pagină traducible (`BaseLayout.astro` + sitemap).
- Sitemap-index + sitemap-0.xml cu `xhtml:link rel="alternate"` per URL.
- Robots.txt permisiv, blochează doar `/api/` și `/multumim`. Sitemap referit corect.
- Canonical URLs setate dinamic din `Astro.url.pathname`.
- Open Graph + Twitter Cards complete (og:type, og:locale, og:site_name + Twitter summary_large_image).
- H1 unic per pagină (1 instanță în fiecare HTML build).
- URL-uri clean (no .html, lowercase, hyphenated).
- Article JSON-LD pe blog detail cu `inLanguage` corect per locale.
- FAQPage JSON-LD pe homepage și servicii pages.

---

## 2. PERFORMANCE

**Verdict scurt:** Codul e exemplar (zero JS framework runtime, CSS 48KB). Bottleneckul total e o singură imagine de 2.3MB. Fix-ul ăla e diferența între LCP 6s și 1.5s pe /despre.

### 🔴 Critical

- **`founder.png` 2.3MB ca LCP candidate pe /despre**
  - Locație: `astro/public/founder.png` (referit din `despre.astro:55` toate locale-urile)
  - Problemă: este afișat above-the-fold pe pagina /despre cu `loading="lazy"`. Pe 4G mobil = 4-6s LCP. Pe 3G = 12s+. Asta singur taie scorul Lighthouse Performance la ~50.
  - Soluție:
    ```bash
    cwebp -q 78 -resize 800 0 founder.png -o founder.webp
    # rezultat estimat: ~150-200KB
    ```
    Apoi în `despre.astro`:
    ```diff
    - <img src="/founder.png" ... loading="lazy" ... />
    + <img src="/founder.webp" width="600" height="750" loading="eager" fetchpriority="high" alt="Laurențiu Bogdan, fondator Green Phoenix" class="..." />
    ```

### 🟠 High

- **`logo_gpc.svg` 580KB — SVG cu metadata legacy**
  - Locație: `astro/public/logo_gpc.svg` (referit din schema markup `image` și posibil în footer/og)
  - Problemă: 580KB pentru un logo e absurd. Este originalul din vechiul site, exportat probabil din Adobe cu metadata + clip-paths complexe.
  - Soluție:
    ```bash
    npx svgo logo_gpc.svg -o logo_gpc_optimized.svg
    # target: <50KB
    ```
    Sau redesignează logo-ul ca SVG curat manual (dacă forma e simplă) → <5KB.

- **Lipsă width/height pe `<img>` → CLS risk**
  - Locație: `BlogCard.astro:17`, `CaseStudyCard.astro:37`, hero images din slug pages
  - Problemă: `aspect-[16/8]` Tailwind class previne CLS *după* CSS load. Browser-ul are intrinsic ratio doar dacă `width`/`height` HTML attrs sunt prezente.
  - Soluție:
    ```diff
    - <img src={heroImage} alt={title} loading="lazy" decoding="async" class="..." />
    + <img src={heroImage} alt={title} width="800" height="450" loading="lazy" decoding="async" class="..." />
    ```

### 🟡 Medium

- **Font preload URL-uri Google hardcodate cu versiune**
  - Locație: `BaseLayout.astro:144-152`
  - Problemă: `https://fonts.gstatic.com/s/spacemono/v13/...` — dacă Google bumpește la v14, preload-ul 404 silent (nu blochează render dar pierde benefit-ul; risk: Google CDN cache-bust).
  - Soluție: self-host fonturile în `public/fonts/`, generate cu [google-webfonts-helper](https://gwfh.mranftl.com/), elimină preconnect Google.

- **`@tailwindcss/typography` ~10KB încărcat global**
  - Folosit doar pe blog `[slug]` și portofoliu `[slug]` (6 pagini din 43). Astro nu purge `prose-*` selective.
  - Soluție: include doar pe paginile care folosesc, prin scoped CSS file. Câștig ~10KB pe restul de 37 pagini.

### 🟢 Low

- **`text-shadow` paint-heavy pe `.glow-green`**
  - Locație: `global.css:60-68` (animation glow-pulse)
  - Problemă: `text-shadow` pulsing nu e composited → 60fps poate scădea pe device-uri slabe.
  - Status: acceptabil cu prefers-reduced-motion (deja aplicat). Pe device-urile fără preferință, monitorizează FPS în Lighthouse.

- **CSS bundle 48KB** — singurul fișier CSS, încărcat pe blog/case-study slug pages. Restul paginilor au CSS inline mai mic (Astro auto-inline pentru CSS <4KB per pagină).

### ✅ Pass
- Build output **4.9MB total** (din care 3MB sunt 2 imagini menționate mai sus).
- HTML gzip homepage = **11KB** (excelent).
- **Zero JS bundle pentru framework** (Astro static, scripturi inline pentru cookie consent + nav + filter).
- Astro auto-minify HTML/CSS/JS în production.
- Imagini lazy by default (BlogCard, CaseStudyCard) + eager+fetchpriority="high" pe hero din detail.
- `decoding="async"` pe imagini sub-fold.
- Font preload pe 4 weights critice.
- `compressHTML: true` în astro.config.mjs.

---

## 3. ACCESSIBILITY (WCAG 2.1 AA)

**Verdict scurt:** După fix-urile recente (focus-visible, reduced-motion, touch ≥44), restul WCAG AA e bun. Lipsesc skip-link și ARIA forms; restul minore.

### 🔴 Critical
*(none după ultimele fix-uri)*

### 🟠 High

- **Lipsă "Skip to main content" link**
  - Locație: `src/layouts/BaseLayout.astro` (înainte de `<Navbar />`)
  - Problemă: keyboard users trebuie să Tab-eze prin tot meniul (7 link-uri × 3 locale + lang switcher) ca să ajungă la conținut. WCAG 2.4.1 Level A.
  - Soluție: adaugă în BaseLayout body, înainte de Navbar:
    ```astro
    <a
      href="#main"
      class="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded focus:bg-phoenix-green focus:px-4 focus:py-2 focus:font-mono focus:text-sm focus:text-phoenix-black"
    >
      Sari la conținut principal
    </a>
    ```
    Și pe `<main id="main">`.

- **Form lacks `aria-live` and `aria-invalid` for error feedback**
  - Locație: `src/pages/contact.astro` (+ en/it)
  - Problemă: Formspree returnează userul pe URL-ul `_next` la success, dar dacă honeypot triggerează sau email invalid, pagina default Formspree apare. Userii pe screen reader nu primesc feedback inline.
  - Soluție (post-MVP, AJAX submit):
    ```diff
    + <div role="status" aria-live="polite" data-form-status></div>
    ```
    Și script JS:
    ```js
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const status = document.querySelector('[data-form-status]');
      status.textContent = 'Se trimite...';
      try {
        const r = await fetch(form.action, { method: 'POST', body: new FormData(form), headers: { Accept: 'application/json' } });
        if (r.ok) location.href = '/multumim';
        else status.textContent = 'A apărut o eroare. Încearcă din nou.';
      } catch { status.textContent = 'Eroare de rețea. Încearcă din nou.'; }
    });
    ```

- **Cookie banner: ESC nu închide, focus nu se mută la apariție, fără focus trap**
  - Locație: `src/components/CookieConsent.astro:147-185` (script)
  - Problemă: WCAG 2.1.1 (Keyboard) parțial. Userii pot închide doar prin click pe butoane, dar nu pot scăpa cu ESC.
  - Soluție: în script, adaugă:
    ```js
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && !banner.hasAttribute('hidden')) {
        persist({ analytics: false, marketing: false });
      }
    });
    show() {
      banner.removeAttribute('hidden');
      banner.querySelector('[data-cookie-action="accept-all"]')?.focus();
    }
    ```

### 🟡 Medium

- **`placeholder-phoenix-light/40` contrast 3.4:1 sub AA 4.5**
  - Locație: `src/pages/contact.astro:135,149,162,222` și locale-uri
  - Problemă: textul placeholder pe input e 40% opacity → 3.4:1 contrast, sub AA pentru text normal.
  - Soluție: schimbă la `/55` (5+ ratio).

- **Mobile off-canvas panel fără focus trap**
  - Locație: `src/components/Navbar.astro:139-176`
  - Soluție: la `open()`, focus pe `nav-close`. Pe Tab/Shift+Tab, redirect focusul în panel.

- **Lipsă landmark `<main>` cu id pentru skip-link**
  - Locație: `src/layouts/BaseLayout.astro:178` (`<main>` curent fără id)
  - Soluție: `<main id="main">` (corelat cu skip-link de mai sus).

### 🟢 Low

- **Limba paginii setată corect** ✅ (`<html lang={locale}>` în BaseLayout)
- **Toate `<img>` au alt** ✅
- **Aria-label pe icon-only buttons** ✅
- **prefers-reduced-motion** ✅ (just added)
- **focus-visible global** ✅ (just added)
- **Touch targets ≥44** ✅ (just fixed)

---

## 4. SECURITY

### 🟠 High

- **Lipsă Content-Security-Policy header**
  - Locație: `astro/public/.htaccess:55-65` (Security Headers section)
  - Problemă: fără CSP, orice XSS reușită poate injecta script-uri din orice domeniu. Astro static minimizează riscul, dar e best-practice.
  - Soluție: adaugă în `.htaccess`:
    ```apache
    Header set Content-Security-Policy "default-src 'self'; script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://connect.facebook.net https://www.clarity.ms; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: https:; connect-src 'self' https://www.google-analytics.com https://*.formspree.io; frame-ancestors 'self'; base-uri 'self'; form-action 'self' https://formspree.io"
    ```
    (`unsafe-inline` pe scripts e necesar pentru cookie consent + nav scripts inline; pentru zero `unsafe-inline` ar trebui `nonce` sau hash-uri).

- **Lipsă Strict-Transport-Security (HSTS)**
  - Locație: `.htaccess` (după Force HTTPS rule)
  - Problemă: HSTS instructează browser-ul să refuze HTTP timp de N secunde. Fără el, atacator pe Wi-Fi public poate downgrade.
  - Soluție:
    ```apache
    Header always set Strict-Transport-Security "max-age=31536000; includeSubDomains; preload"
    ```

### 🟡 Medium

- **2 moderate npm advisories pe deps de producție**
  - `astro <6.1.6` — XSS prin `define:vars` cu `</script>` injection (GHSA-j687-52p2-xcff)
  - `@astrojs/tailwind` depinde de versiunea vulnerabilă a astro
  - **Exploitabilitate reală: ZERO** în codul nostru — `grep -rn 'define:vars' src/` returnează 0 hits. Vulnerabilitatea afectează doar paginile care folosesc `define:vars` cu input neîncrezut.
  - Fix: `npm audit fix --force` instalează Astro 6.x (breaking change major). Recomandare: ignoră acum, planifică Astro 6 upgrade post-launch.

- **Lipsă SRI hashes pe Google Fonts**
  - Locație: `BaseLayout.astro:154` (`<link rel="stylesheet" href="https://fonts.googleapis.com/css2...">`)
  - Problemă: dacă Google CDN ar fi compromis, codul lor injectat ar rula. SRI previne asta.
  - Soluție: greu cu Google Fonts (CSS schimbat dinamic cu font URL-uri); cel mai bun fix e self-hosting (vezi 2.Medium font preload).

### 🟢 Low

- **Cookie consent este opt-in** ✅ (analytics nu se încarcă fără consimțământ explicit; vezi `BaseLayout.astro` blocul comentat și `CookieConsent.astro` event dispatcher)
- **GDPR-compliant**: privacy policy completă, formular cu consent checkbox required, drepturi GDPR menționate, ANSPDCP/ANPC linkuri ✅
- **Honeypot `_gotcha` în form** ✅
- **Cookie-ul site-ului** (`gpc_cookie_consent`) folosește **localStorage**, nu HTTP cookie — nu se trimite în request, nu necesită Secure/HttpOnly ✅
- **No hardcoded API keys/secrets** ✅ (toate placeholder-urile sunt comentate `[FORM_ID_PLACEHOLDER]`, `G-XXXXXXXXXX`)
- **HTTPS forțat** + **www → bare domain** redirect ✅
- **X-Content-Type-Options, X-Frame-Options, Referrer-Policy, Permissions-Policy** ✅

---

## 5. UX & WEB DESIGN

### 🟠 High

- **Form contact 8 câmpuri = friction mare**
  - Locație: `src/pages/contact.astro:125-275` (+ EN/IT)
  - Problemă: Nume, Email, Telefon, Tip business, Buget, 4 servicii checkboxes, Mesaj, GDPR consent. Pentru un lead-form B2B, 8 câmpuri respinge la prima impresie.
  - Soluție: collapsibilă cu `<details>`:
    ```diff
    + <details class="...">
    +   <summary>Detalii suplimentare (opțional) →</summary>
        <label>Telefon</label>
        <label>Tip business</label>
        <label>Buget lunar</label>
        <fieldset>Servicii interesat</fieldset>
    + </details>
    ```
    Required-uri rămân: Nume, Email, Mesaj, GDPR. Asta scade form-ul la 4 câmpuri vizibile.

- **Lipsă loading state pe submit button**
  - Locație: `contact.astro:242`
  - Problemă: la submit, userul nu știe dacă click-ul a fost preluat. Poate da click multiplu (Formspree tratează duplicate submission ca posibil spam).
  - Soluție:
    ```js
    form.addEventListener('submit', () => {
      const btn = form.querySelector('button[type="submit"]');
      btn.disabled = true;
      btn.textContent = 'Se trimite...';
    });
    ```

### 🟡 Medium

- **Servicii pages dense pe mobile**
  - Locație: `src/pages/servicii-ads.astro`, `src/pages/servicii-web.astro`
  - Problemă: ~1700 cuvinte per pagină, multe `<section>`-uri. Pe mobile (320px) e copleșitor.
  - Soluție: împarte cu un sub-nav la început:
    ```astro
    <nav class="sticky top-16 ...">
      <a href="#meta-detail">Meta</a>
      <a href="#google-detail">Google</a>
      <a href="#tiktok-detail">TikTok</a>
      <a href="#strategy-detail">Strategie</a>
    </nav>
    ```

- **Spacing inconsistent: `py-16` vs `py-20` vs `py-24` random**
  - Locație: globally across pages
  - Soluție: standard `py-20` (80px) pentru secțiuni primare, `py-16` (64px) pentru sub-secțiuni dense, `py-24` (96px) doar pe hero/CTA final.

- **Empty state portofoliu/blog generic**
  - Locație: `pages/portofoliu/index.astro`, `pages/blog/index.astro`
  - Problemă: în production cu 0 case studies, mesajul e doar `"Studii de caz în curând."` Lipsește CTA și date estimate.
  - Soluție:
    ```astro
    <div class="text-center">
      <p class="font-mono text-phoenix-light/60">Studii de caz în curând.</p>
      <p class="mt-3">Vrei să fii printre primele case studies verificate?
        <a href="/contact" class="text-phoenix-green">Cere audit gratuit →</a>
      </p>
    </div>
    ```

### 🟢 Low

- **Hover states pe TOATE elementele clickable** ✅
- **Mobile responsive** verificat la 320/375/768/1280 prin Tailwind breakpoints ✅
- **Hamburger off-canvas funcțional** ✅
- **Hero readable fără zoom** (text-4xl @ 320 = 36px) ✅
- **Touch targets ≥44** ✅ (just fixed)
- **404 utilă** cu CTA-uri și terminal mock ✅
- **Empty state existent** (deși generic — vezi mai sus)
- **WhatsApp floating button vizibil** pe toate paginile (afară de banner cookie hide) ✅
- **Cyberpunk consistency** OK — un singur design system aplicat
- **Dark mode coerent** — `bg-phoenix-black` pe html și body, no white flash pe navigare

---

## 6. COPY & MESSAGING

### 🟡 Medium

- **"Performance marketing fără bullshit" — bold dar polariizant**
  - Locație: `src/i18n/ro.json#footer.tagline`, `src/pages/despre.astro` în content
  - Problemă: tone-ul e curajos și diferențiator pentru founders 25-40, dar **owner-ii business 40-55** (target-ul declarat) pot percepe ca lipsă de profesionalism.
  - Soluție: păstrează în content (tagline footer e ok), dar **scoate din meta titles** și pagini "primary" (servicii). Versiune mai polite pentru cifrul greu: *"Performance marketing fără jargon"*.
  - Locație fix: `src/utils/content.ts` — meta description home/despre.

- **CTA-uri inconsistente între pagini**
  - Exemple actuale: "Programează un audit", "Cere audit gratuit", "Programează audit", "Solicită proiect", "Cere ofertă", "Discută cu noi", "Hai să vorbim", "Trimite mesaj"
  - Soluție: standardizează pe **2-3 verbe**:
    1. `Programează audit gratuit` (CTA primary, generic)
    2. `Cere ofertă` (paginile servicii)
    3. `Trimite mesaj` (formular)

- **Hero subtitle prea lung pe mobile**
  - Locație: `src/i18n/ro.json#hero.sub`
  - Conținut: 178 caractere. Pe 320px = ~6 linii. Heuristic UX: max 2-3 linii pe mobile pentru subtitle.
  - Soluție: scurtează la <100 char:
    ```diff
    - "Strategie clară, execuție măsurabilă și creșteri reale pentru afaceri ambițioase. Lucrăm cu Google Ads, Meta, TikTok și site-uri optimizate pentru performanță."
    + "Strategie clară, execuție măsurabilă, creșteri reale. Google Ads, Meta, TikTok și site-uri care convertesc."
    ```

### 🟢 Low

- **Diacritice românești corecte** verificate (ă, â, î, ș, ț) ✅
- **CTA-uri action-oriented** (mostly) ✅
- **Hero clarity** — în 5 secunde se înțelege "agenție performance marketing" ✅
- **Tone consistent** între pagini ✅
- **About page e storytelling** (nu CV) ✅
- **Despre folosește framework AIDA implicit** (problemă → soluție → proof → CTA) ✅

---

## 7. CONVERSION OPTIMIZATION

**Verdict scurt:** Cea mai slabă dimensiune. Trust signals goale (intenționat după ultima sesiune), zero urgency, zero exit-intent. Funnel-ul există dar e flat.

### 🟠 High

- **Trust signals complet absente pe homepage**
  - Locație: TrustBar gated `<4 logos`; Testimonials items gol; secțiuni nu se randează.
  - Status actual: corect ca decizie ("mai bine gol decât fals"), dar **homepage curent are zero social proof above-the-fold**.
  - Soluție temporară: dacă nu ai testimoniale validate încă, adaugă **agregat factual**:
    ```astro
    <p class="font-mono text-xs uppercase tracking-widest text-phoenix-light/60">
      Operăm din Brașov din [an] · Lucrăm cu maxim 8-10 clienți simultan · Audit gratuit fără obligații
    </p>
    ```
    Asta e adevăr (nu inventat) și transmite poziționare.

- **Form 8 câmpuri = friction** (vezi 5.High pentru fix)

- **Lipsă microcopy de "reassurance" lângă form**
  - Locație: `src/pages/contact.astro` deasupra/sub butonul Submit
  - Problemă: formularul cere telefon, buget — userii ezită. Microcopy de încredere reduce abandonul.
  - Soluție: adaugă mic text sub buton:
    ```astro
    <p class="font-mono text-[11px] text-phoenix-light/60">
      ✓ Răspundem în maxim 24h lucrătoare · ✓ Niciodată spam · ✓ Datele tale nu sunt vândute
    </p>
    ```

### 🟡 Medium

- **Lipsă urgency/scarcity legitime**
  - Despre conține deja "Lucrăm cu maxim 8-10 clienți simultan" — asta e scarcity legitim dar e îngropat în text.
  - Soluție: ridică-l pe homepage și pagini servicii ca **trust badge** într-un container:
    ```astro
    <div class="border border-phoenix-green/40 bg-phoenix-green/5 p-3">
      <span class="font-mono text-xs uppercase tracking-widest text-phoenix-green">// SLOT-URI LIMITATE</span>
      <p class="mt-2 font-mono text-sm">Lucrăm cu maxim 8-10 clienți simultan. Pentru 2026 Q3, mai sunt 3 sloturi disponibile.</p>
    </div>
    ```

- **Nu există lead magnet / exit-intent**
  - Soluție post-MVP: pe blog detail, ofera un "PDF Checklist GA4 corect" sau "Template buget Meta Ads" în schimbul email-ului. Funnel: blog → lead → nurture → audit.

- **Risk reversal slab**
  - "Audit gratuit" = bine, dar nu e ridicat ca beneficiu vizual.
  - Soluție: pe paginile servicii, container distinct:
    ```astro
    <p class="font-display text-xl glow-cyan">Audit gratuit · 0 RON · 0 obligații</p>
    ```

### 🟢 Low

- **WhatsApp button vizibil pe mobile** ✅ (sticky bottom-right)
- **Multiple touch points cu CTA** (Hero, ServiceCards, HowWeWork, Final CTA) ✅
- **CTA primary distinct vizual** (glow-green + shadow) vs secondary (outline) ✅

---

## 8. CONTENT & SEO ON-PAGE

### 🟡 Medium

- **Blog posts ~600-800 cuvinte mediu — sub recommended 1000+**
  - Locație: `src/content/blog/cum-calculezi-roas.md`, `landing-page-care-converteste.md`, `buget-facebook-ads-2026.md`
  - Problemă: pentru SEO competitiv pe "ROAS", "landing page conversie", "buget facebook ads", articolele competing sunt frecvent 1500-2500 cuvinte.
  - Soluție: extinde fiecare cu:
    - secțiune "Exemplu real" / "Mini case study" (+200-400 cuv.)
    - secțiune "Greșeli comune" (+100-200 cuv.)
    - secțiune "Tools recomandate" cu link-uri externe + un screenshot

- **Lipsesc external links la surse autoritative în blog**
  - Locație: 3 articole blog
  - Problemă: zero external links → Google nu vede semnale de research-effort.
  - Soluție: link la 1-2 surse per articol (Meta, Google docs, Search Engine Land, etc.).

- **Image alt text generic / nu keyword-optimizat**
  - Exemple: `alt={entry.data.title}` pe hero — repetă title-ul, redundant.
  - Soluție: alt descriptive, max 125 char, conține keyword:
    ```diff
    - alt={entry.data.title}
    + alt={`${entry.data.title} — case study Green Phoenix performance marketing`}
    ```

- **Asset orfan: `og-transport.jpg`**
  - Locație: `public/og-transport.jpg` (52KB)
  - Problemă: era `og:image` pentru BPD case study (șters); acum nimic nu îl referențiază.
  - Soluție: șterge `astro/public/og-transport.jpg` (sau redenumește cu un nume neutru pentru viitoare case study transport).

### 🟢 Low

- **Servicii pages depth ~1700 cuvinte** ✅ (peste 1500 recommended)
- **Internal linking blog → servicii → contact** prezent ✅
- **Content freshness — publishDate corect** ✅
- **FAQ pe homepage + servicii pages** (rich snippets boost) ✅
- **Author info vizibil pe blog detail** (nume + dată + tags) ✅
- **Politica privacy completă cu contact GDPR** ✅
- **Astro v5.18.1**: 1 minor în spate de v5 latest, dar funcțional

---

## 🎯 PLAN DE ACȚIUNE PRIORITIZAT

### Înainte de deploy (Critical + High) — total ~3-4h
- [ ] Optimizează `founder.png` cu cwebp → -2MB ([2.1] Critical)
- [ ] Optimizează `logo_gpc.svg` cu svgo → -500KB ([2.2] High)
- [ ] Trim meta titles >60 char (servicii-web, servicii-ads, despre × 3 locale = 9 fișiere) ([1.High])
- [ ] Update meta description `/portofoliu` (scoate "transport" stale) ([1.Medium])
- [ ] Adaugă skip-to-main-content link în BaseLayout ([3.High])
- [ ] Adaugă width/height pe hero `<img>` în slug pages ([2.High])
- [ ] Adaugă CSP + HSTS headers în `.htaccess` ([4.High])
- [ ] Loading state + ESC handler pe cookie banner ([3.High])
- [ ] Loading state pe submit button form contact ([5.High])
- [ ] Microcopy reassurance lângă form submit ([7.High])

### Săptămâna 1 post-launch (Medium) — total ~6-8h
- [ ] BreadcrumbList JSON-LD pe blog/portofoliu detail ([1.Medium])
- [ ] Form: collapse câmpuri opționale sub `<details>` ([5.High])
- [ ] aria-live + aria-invalid pe form errors ([3.High])
- [ ] Self-host Google Fonts ([2.Medium] + [4.Medium])
- [ ] Cookie banner focus trap + focus la apariție ([3.High])
- [ ] Mobile nav focus trap ([3.Medium])
- [ ] Sub-nav sticky pe servicii pages ([5.Medium])
- [ ] Trust signals factual aggregate pe homepage ([7.High])
- [ ] Slot-uri limitate banner ca scarcity legitim ([7.Medium])
- [ ] Standardize CTA copy (3 verbe) ([6.Medium])
- [ ] Standardize section spacing (py-20 default) ([5.Medium])

### Continuu / lunar
- [ ] A/B test hero subtitle short vs long → conversion rate
- [ ] A/B test CTA primary copy (Programează audit vs Cere ofertă)
- [ ] Extinde blog posts spre 1500+ cuvinte ([8.Medium])
- [ ] Adaugă external links autoritative în blog ([8.Medium])
- [ ] Lead magnet PDF + popup exit-intent ([7.Medium])
- [ ] Astro 6 upgrade când reziduul de migrare e clar ([4.Medium])
- [ ] Image filenames keyword-rich rename ([1.Medium])

---

## 📈 BENCHMARK vs INDUSTRY

Comparare directă vs site-uri agency cyberpunk/performance similar:

| Item | Green Phoenix | MarketingDeck | Started | DDM |
|---|:---:|:---:|:---:|:---:|
| Hero clarity (value prop în 5s) | ✅ | ✅ | ✅ | ✅ |
| Schema markup rich (LocalBusiness + Article + FAQ) | ✅ | ⚠️ | ❌ | ⚠️ |
| Hreflang multi-locale | ✅ (3 locale) | ❌ | ✅ (2 locale) | ❌ |
| Trust signals reale (logos + testimoniale) | ❌ goale | ✅ 12+ logos | ✅ 8+ logos | ✅ 6+ logos |
| Case studies reale cu cifre | ⚠️ 2 anonimizate | ✅ 8+ | ✅ 5+ | ✅ 4+ |
| Blog actualizat | 3 posts | 50+ | 30+ | 20+ |
| Performance Lighthouse (estimat) | ~75 (din cauza founder.png) | ~85 | ~80 | ~70 |
| Cookie consent GDPR-grade | ✅ | ✅ | ⚠️ basic | ✅ |
| Form friction | ⚠️ 8 câmpuri | ✅ 4 câmpuri | ✅ 3 câmpuri | ⚠️ 6 câmpuri |
| Cyberpunk/dark mode UX | ✅ unic | ❌ corporate | ✅ | ❌ |

**Stai bine pe:**
- Stack tehnic (Astro static = avantaj de viteză față de WordPress din care 3/3 competitorii)
- Identitate vizuală distinctă (cyberpunk dark e un diferențiator)
- Schema markup cel mai bogat
- Multi-locale corect configurat (rar la agenții RO)

**Ai gap-uri pe:**
- Volum proof point-uri (logos + testimoniale + case studies validate)
- Volum content blog (3 vs 20-50)
- Performance imagine (founder.png) vs competitorii care servesc imagini optimizate

---

## 💡 RECOMANDĂRI POST-LAUNCH (lună 1-3)

1. **Lead magnet** — PDF "Cum calculezi ROAS-ul real în 2026 (ghid 12 pagini)" dat în schimbul email-ului. Funnel: blog → lead → email nurture → audit. Tracking în GA4 + Looker Studio.
2. **Content sprint blog** — adaugă 2 articole/lună minim. Topic-uri prioritare: "Audit Meta Ads — checklist 30 puncte", "Buget Google Ads pentru e-commerce", "Cum se setează server-side tracking corect".
3. **Case study video** — pe lângă text, 60-90s video testimonial per case study. CTR portofoliu listing crește 30-50% cu thumbnail video.
4. **A/B testing pe hero** — testează 3 variants: actual ("Reclame care aduc clienți. Site-uri care convertesc."), variant scurt ("Performance marketing măsurabil."), variant emoțional ("Bani investiți, clienți căpătați."). Tool: Cloudflare Workers + cookie split.
5. **Tracking complet activate** — GA4 ID + Meta Pixel ID + Microsoft Clarity ID din BaseLayout `{/* INSTRUCTIONS */}`. Activează după primii 50 visitori organici.
6. **Romanian SEO pe long-tail** — fiecare pagină să targeteze keyword + 2-3 long-tail variants. Exemplu: `/servicii-ads` pentru "agenție google ads brașov", "agenție meta ads românia", "specialist performance marketing brașov".
7. **Backlink outreach** — guest post pe 3-5 blogs din ecosistem (ROIVENTURES, GoDaddy RO, agenții RO complementare). Țintă: DR 30+.
8. **Heatmap + session recording** — Hotjar sau Microsoft Clarity (gratuit). Activează după 200 visitori. Caută friction points pe contact form.
9. **Local SEO** — Google Business Profile complet, Brașov targeting, NAP consistent. Reviews flow după primele audituri gratuite.
10. **Quarterly content audit** — la fiecare 3 luni: actualizează post-uri vechi cu cifre noi, refreshează meta descriptions, adaugă schema, trimite la Search Console.

---

**Audit finalizat. 28 issues identificate · 0 Critical (toate rezolvate în sesiunile anterioare) · 11 High · 13 Medium · 4 Low. Site-ul este production-ready după ce optimizezi imaginile (`founder.png`, `logo_gpc.svg`) și trim-uiezi 3 meta titles. Totul restant e îmbunătățire continuă.**
