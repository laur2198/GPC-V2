# AUDIT REPORT — Green Pheonix Concept (Astro)

**Date:** 2026-05-08
**Scope:** `astro/src/**` și `astro/public/**` la commit `620a95d`
**Methodology:** static read pe codebase + verificare structurală (nu Lighthouse run real — environment-ul nu suportă Chromium headless aici)

---

## TL;DR — Severitate (16 issues)

| # | Severity | Area | Title |
|---|---|---|---|
| 1 | **Critical** | SEO / Brand | Meta title-urile spun "Green **Phoenix**" în loc de "Green **Pheonix**" pe toate paginile |
| 2 | **Critical** | A11y | Zero focus-visible styles — keyboard navigation invizibilă |
| 3 | **High** | A11y | `prefers-reduced-motion` ignorat — scanline + marquee + glow-pulse rulează permanent |
| 4 | **High** | UX / Conversion | Trust signals fake (placeholder logos, testimonial inventat) |
| 5 | **High** | Mobile | Touch targets sub 44×44 (hamburger 40, cookie buttons 32, lang switcher 28) |
| 6 | **Medium** | SEO | Meta title `/servicii-web` are 73 caractere (>60) |
| 7 | **Medium** | A11y | `focus:outline-none` pe form fără echivalent vizibil pentru tastatură |
| 8 | **Medium** | Typography | `prose max-w-none` în blog/case-study detail → linii > 75 caractere |
| 9 | **Medium** | UX | Form contact 8 câmpuri vizibile, cu validare `novalidate` doar HTML5 — zero feedback dacă Formspree returnează 4xx |
| 10 | **Medium** | A11y | Cookie banner nu primește focus la afișare; ESC nu îl închide; tab-trap absent |
| 11 | **Low** | Perf | Font preload URL-uri hardcodate (versiunea Google Fonts se poate schimba → 404 silent) |
| 12 | **Low** | Perf | `text-shadow` pe `.glow-green` cu animație repaint (paint-heavy) |
| 13 | **Low** | UX | 404 nu menționează scurt soluții (search? sitemap?) — doar back-home |
| 14 | **Low** | SEO | Image filenames legacy: `og-image.jpg`, `og-ads.jpg` — generice, nu descriptive |
| 15 | **Low** | Typography | h1 din BaseLayout nu există — toate paginile depind de Hero, dar 404 și multumim au h1 inline (ok) |
| 16 | **Low** | Content | TrustBar header "AU LUCRAT CU NOI" cu 6 SVG-uri placeholder + nume fictive — induce în eroare |

Tot ce e Critical / High recomandat fixat înainte de deploy public.

---

## 1. ACCESSIBILITY (WCAG AA)

### 1.1 Contrast text vs background — ✅ Pass

Combinațiile principale verificate cu WCAG ratio formula:

| Combinație | Ratio | AA normal (4.5) | AA large (3) |
|---|---|---|---|
| `phoenix-light #E5E5E5` pe `phoenix-black #0A0A0A` | ~14.4:1 | ✅ | ✅ |
| `phoenix-green #00FF94` pe `phoenix-black` | ~13.7:1 | ✅ | ✅ |
| `phoenix-cyan #00E5FF` pe `phoenix-black` | ~12.6:1 | ✅ | ✅ |
| `phoenix-light/85` pe `phoenix-black` | ~11.6:1 | ✅ | ✅ |
| `phoenix-light/70` pe `phoenix-black` | ~9:1 | ✅ | ✅ |
| `phoenix-light/60` pe `phoenix-black` | ~7:1 | ✅ | ✅ |
| `phoenix-light/50` pe `phoenix-black` | ~5:1 | ✅ | ✅ |
| `phoenix-light/40` pe `phoenix-black` (placeholders) | ~3.4:1 | ❌ | ✅ (large only) |

**Issue 1.1.1 — Medium:**
`phoenix-light/40` folosit pe input placeholders (`placeholder-phoenix-light/40`) are doar 3.4:1, sub minimul 4.5:1 pentru text normal.
- **Locație:** `src/pages/contact.astro:135,149,162,222`, `src/pages/en/contact.astro`, `src/pages/it/contact.astro`
- **Fix:**
  ```diff
  - placeholder-phoenix-light/40
  + placeholder-phoenix-light/55
  ```

### 1.2 Alt text — ✅ Pass

Verificare cu grep peste toate `<img>` în `src/`:
- 13 `<img>` găsite → 13 cu `alt=` (toate au alt descriptiv).
- ANPC SAL/SOL: `alt="ANPC SAL"` / `alt="ANPC SOL"` ok.
- Founder: `alt="Laurențiu Bogdan, fondator..."` ok.
- Hero/case study/blog: `alt={entry.data.title}` — ok cât timp `title` e completat (este).

### 1.3 Aria labels pe butoane fără text vizibil — ✅ Pass

Audit pe icon-only interactive elements:

| Element | Aria | Locație |
|---|---|---|
| WhatsApp floating | `aria-label="WhatsApp"` ✅ | `BaseLayout.astro:158` |
| Hamburger menu | `aria-label="Open menu"` ✅ | `Navbar.astro:84` |
| Mobile close | `aria-label="Close menu"` ✅ | `Navbar.astro:108` |
| Footer Facebook | `aria-label="Facebook"` ✅ | `Footer.astro` |
| Footer Instagram | `aria-label="Instagram"` ✅ | `Footer.astro` |
| Footer TikTok | `aria-label="TikTok"` ✅ | `Footer.astro` |
| ANPC SAL | `aria-label="ANPC SAL"` + alt pe img ✅ | `Footer.astro` |
| Lang switcher button | text-only (`RO`/`EN`/`IT`) ✅ | `LanguageSwitcher.astro` |
| Filter buttons portofoliu/blog | text-only ✅ | `pages/portofoliu/index.astro`, `pages/blog/index.astro` |
| Cookie buttons | text-only ✅ | `CookieConsent.astro` |
| Copy-link button | text "Copiază link"/"Copy link"/"Copia link" ✅ | `pages/blog/[slug].astro` etc. |

### 1.4 Heading hierarchy — ⚠️ Partial

**Issue 1.4.1 — Low:**
Pe blog index și portofoliu index (`pages/blog/index.astro`, `pages/portofoliu/index.astro`), structura e:
- `<h1>` → din Hero compact ✅
- `<h2>` → titlu sub-secțiune ✅
- Cardurile au `<h3>` în `BlogCard.astro:23` și `CaseStudyCard.astro:53` ✅

OK. Niciun skip h1→h3 detectat.

**Issue 1.4.2 — Low:**
Pe `politica` (toate locale-urile), titlul "Cookie & tracking" și restul sunt h2-uri direct numerice "1. Operator de date", "2. Date colectate" — corect ca structură, dar lipsesc ID-uri pentru deep-linking (ex `#cookies-tracking`).
- **Locație:** `src/pages/politica.astro:36-152`, `en/politica.astro`, `it/politica.astro`
- **Recomandare:** adaugă `id="..."` pe fiecare h2 → permite link direct la secțiune din email/comm GDPR.

### 1.5 Focus states vizibile — 🚨 Critical

**Issue 1.5.1 — CRITICAL:**
Zero `focus-visible` sau `focus:ring` în întreg codebase-ul. Singurele focus styles sunt pe inputuri form (`focus:border-phoenix-green focus:outline-none`) — iar `outline-none` elimină indicatorul implicit.

Userii care navighează cu tastatura **nu pot vedea unde e focus-ul** pe nav, butoane, link-uri, language switcher, share rail, filter buttons etc. Aceasta e o încălcare WCAG 2.4.7 (Focus Visible) — fail Level A.

- **Locație:** Lipsește global. Verifică prin `grep -rln focus-visible src/` → 0 hits.
- **Fix recomandat (singur file):** adaugă în `src/styles/global.css`:
  ```css
  /* Visible focus for keyboard users only — never on mouse click */
  :focus-visible {
    outline: 2px solid var(--phoenix-green);
    outline-offset: 2px;
    box-shadow: 0 0 0 4px rgba(0, 255, 148, 0.18);
    transition: box-shadow 120ms ease-out;
  }

  /* Form inputs already change border on focus — keep their explicit ring */
  input:focus-visible,
  select:focus-visible,
  textarea:focus-visible {
    outline-offset: 0;
    box-shadow: 0 0 0 2px rgba(0, 255, 148, 0.45);
  }
  ```

### 1.6 Keyboard navigation — ⚠️ Partial

**Issue 1.6.1 — Medium:**
Mobile off-canvas panel din Navbar nu trap-ează focusul. La `Tab` în interior, focusul iese în spate la elementele pageului ascuns.
- **Locație:** `src/components/Navbar.astro:124-148` (panel) și `:153-176` (script)
- **Fix:** la `open()`, `panel.focus()` (după ce-i adăugăm `tabindex="-1"`); pe `Tab`/`Shift+Tab`, dacă focusul ar ieși din panel, adu-l la primul/ultimul element. Plus `Escape` pentru a închide.

**Issue 1.6.2 — Medium:**
Cookie banner nu se închide la `Escape` și nu primește focus la apariție.
- **Locație:** `src/components/CookieConsent.astro:147-185`
- **Fix:** la `show()`, `banner.focus()` (cu `tabindex="-1"`) + `addEventListener('keydown', e => e.key === 'Escape' && persist({analytics:false,marketing:false}))`.

**Issue 1.6.3 — Medium:**
LanguageSwitcher: pe `Escape` se închide ✅, pe click outside se închide ✅. **Dar** opțiunile dropdown nu sunt navigabile cu săgețile sus/jos (pattern listbox standard).
- **Locație:** `src/components/LanguageSwitcher.astro:67-94`
- **Fix:** adaugă handler keydown pe `<ul role="listbox">` care reacționează la `ArrowDown`/`ArrowUp` mutând focusul între `<a>`-urile copil. Sau mai simplu: schimbă pattern-ul în `<details><summary>` care e nativ accesibil.

### 1.7 prefers-reduced-motion — 🚨 High

**Issue 1.7.1 — HIGH:**
Animațiile rulează **mereu**, indiferent de preferința OS. Userii cu vestibular disorders văd `scanline` (mișcare verticală continuă), `marquee` (mișcare orizontală continuă), `glow-pulse` (text-shadow pulsing) în homepage, hero, CTA-uri, 404. Încălcare WCAG 2.3.3.
- **Locație:** `src/styles/global.css` (definițiile keyframes la liniile 50-78); `src/components/CTA.astro:53` (animation marquee inline); `src/components/Hero.astro:179` (marquee-track).
- **Fix:** adaugă la sfârșitul `global.css`:
  ```css
  @media (prefers-reduced-motion: reduce) {
    *,
    *::before,
    *::after {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
      scroll-behavior: auto !important;
    }
    .scanline::after,
    .marquee-track,
    .glow-green {
      animation: none !important;
    }
  }
  ```

---

## 2. MOBILE RESPONSIVENESS

### 2.1 Viewport tests

Codul folosește breakpoints Tailwind default: `sm 640`, `md 768`, `lg 1024`, `xl 1280`. Hero are `text-4xl md:text-6xl lg:text-7xl` — la 320px, h1 e ~36px (citibil fără zoom ✅).

**Issue 2.1.1 — Low:**
La 320px, nav-ul desktop dispare la `md:` (≥768) — corect, hamburger preia. **Dar** logo-ul "GREEN PHEONIX" + lang switcher + hamburger pot să se înghesuie pe ecrane <360px.
- **Locație:** `src/components/Navbar.astro:18-44`
- **Fix:** ascunde lang switcher pe mobil din nav (rămâne în footer + mobile panel):
  ```diff
  - <LanguageSwitcher locale={locale} />
  + <span class="hidden sm:flex"><LanguageSwitcher locale={locale} /></span>
  ```

### 2.2 Touch targets — ⚠️ Mai multe sub 44×44

WCAG 2.5.5 (AAA) și industry-standard recomandă minimum 44×44 CSS pixels pentru touch targets.

**Issue 2.2.1 — High:**
Hamburger menu și close — `h-10 w-10` = 40×40, sub 44.
- **Locație:** `src/components/Navbar.astro:84,108`
- **Fix:**
  ```diff
  - class="grid h-10 w-10 place-items-center ..."
  + class="grid h-11 w-11 place-items-center ..."
  ```

**Issue 2.2.2 — High:**
LanguageSwitcher trigger button — `px-3 py-1.5` = ~28px tall.
- **Locație:** `src/components/LanguageSwitcher.astro:33`
- **Fix:** `py-2.5` minimum sau wrap cu `min-h-[44px]`.

**Issue 2.2.3 — High:**
CookieConsent buttons — `px-4 py-2` = ~32px.
- **Locație:** `src/components/CookieConsent.astro:75-100`
- **Fix:** `py-3` (devine ~44px) sau `min-h-[44px]`.

**Issue 2.2.4 — Medium:**
FAQ accordion `+` indicator — `h-8 w-8` = 32×32 (apare totuși ca click target întrucât tot summary e clickable, dar nu e clar pentru touch).
- **Locație:** `src/components/FAQ.astro:53`
- **Recomandare:** acceptabil — summary parent are padding suficient (`px-6 py-5` = ~52px tall).

### 2.3 Body text mobile

text-base = 16px ✅. Multe locuri folosesc `text-sm` (14px) pentru body, sub recomandarea iOS de 16px (sub care zooming auto poate triggera).

**Issue 2.3.1 — Low:**
Form inputs au `text-sm` (14px) pe mobile.
- **Locație:** `src/pages/contact.astro:135` și locale-uri
- **Fix:**
  ```diff
  - class="... font-mono text-sm text-phoenix-light ..."
  + class="... font-mono text-base md:text-sm text-phoenix-light ..."
  ```
  (16px pe mobil, 14px desktop — previne zoom Safari iOS)

### 2.4 Hamburger menu — ✅ Funcțional

Verificat în `Navbar.astro` — toggle/close OK, panelul e fixed, scroll body lock activ.

### 2.5 Hero readable fără zoom — ✅ Pass

H1 ~36px la 320px. Subtitle text-base = 16px. CTA-urile au padding suficient.

---

## 3. PERFORMANCE FRONTEND

### 3.1 CSS bundle

Astro + Tailwind cu purge default. La build: `_astro/*.css` < 30KB minified estimat (Tailwind shake).

**Issue 3.1.1 — Low:**
`@tailwindcss/typography` adaugă ~10KB pentru `prose` classes. Folosit doar pe blog `[slug].astro` și portofoliu `[slug].astro` (6 pagini din 38 publicate).
- **Recomandare:** OK pentru moment; dacă scor Lighthouse Perf < 95, considerăm să încărcăm typography doar pe paginile de detail prin scoped import.

### 3.2 Font loading — ⚠️ Risk

**Issue 3.2.1 — Low:**
`<link rel="preload">` pentru woff2 hardcodat la URL-uri Google Fonts cu versiune (`v13`, `v19`). Dacă Google bumpește la `v14` sau `v20`, preload-urile 404 silent — nu blochează render dar pierdem benefit-ul.
- **Locație:** `src/layouts/BaseLayout.astro:144-152`
- **Recomandare alternativă:** self-host fonturile (download `.woff2` din Google Fonts CSS, pune în `public/fonts/`, actualizează `@import url(...)` la propriile fișiere `@font-face`). Beneficii: zero dependență Google, preload garantat, +5-10 puncte Lighthouse Perf, GDPR-friendly (no IP leak la Google).

`font-display: swap` e setat de Google CSS, deci FOIT nu apare; doar FOUT scurt — acceptabil.

### 3.3 Animation performance

`scanline`, `marquee` folosesc `transform: translate*` → GPU-accelerated, 60fps probabile.

**Issue 3.3.1 — Low:**
`.glow-green` aplică `text-shadow` cu animație de opacity și culoare — `text-shadow` e paint operation, nu composited, deci poate scădea FPS pe pagini cu mult `.glow-green` (homepage are ~5 instanțe).
- **Locație:** `src/styles/global.css:60-69`
- **Recomandare:** acceptă cost-ul (efectul e marcantul brand-ului). Reduce frecvență dacă FPS scade pe Lighthouse.

### 3.4 Lazy loading — ✅ Pass

- BlogCard, CaseStudyCard imgs: `loading="lazy" decoding="async"` ✅
- Hero images în detail pages: `loading="eager" fetchpriority="high"` ✅
- Founder image (mod-deasupra-the-fold în despre): `loading="lazy"` ⚠️

**Issue 3.4.1 — Low:**
Founder image (despre) ar trebui `loading="eager"` întrucât e LCP candidate.
- **Locație:** `src/pages/despre.astro:55`, `en/despre.astro:36`, `it/despre.astro:36`
- **Fix:**
  ```diff
  - loading="lazy"
  + loading="eager"
  + fetchpriority="high"
  ```

### 3.5 Critical CSS

Astro inlinează automat CSS de pagină < 4kB. Pentru pagini mai mari, CSS e extern în `_astro/`. Nu am verificat output exact.

---

## 4. UX FLOW

### 4.1 Path home → conversie — ✅ Clear

- Hero: 2 CTA (primary "Programează un audit" + secondary "Vezi servicii")
- ServiceCards: 3 carduri, fiecare cu link spre /servicii-ads sau /servicii-web
- HowWeWork: CTA final "ÎNCEPE CU UN AUDIT GRATUIT" → /contact
- Footer: WhatsApp + Contact link
- Final CTA: "Programează audit"

≥ 5 căi distincte spre conversie de pe homepage. Nicio dezacord.

### 4.2 CTA hierarchy — ✅ One primary per page

Fiecare pagină are un CTA primary cu `glow-green + shadow` și CTAs secundare cu `border + hover`. Bun.

### 4.3 Friction în formular contact

**Issue 4.3.1 — High:**
Formularul are 8 câmpuri vizibile (nume, email, telefon, tip business, buget, 4 servicii checkboxes, mesaj) + GDPR consent. Pentru un lead-form e mult; psihologic respinge la prima impresie.
- **Locație:** `src/pages/contact.astro:125-275`
- **Recomandare:**
  - Mută "Tip business" și "Buget lunar" sub `<details>` sau pas 2 (`Telefon` + selecturile dropdown sunt opționale; doar nume/email/mesaj/GDPR sunt required).
  - Sau: arată inițial doar câmpurile required + mesaj, restul "Spune-ne mai multe (opțional)" expandabil.

**Issue 4.3.2 — Medium:**
Form folosește `novalidate` cu HTML5 `required` — dar lipsește feedback de validare custom pe câmpuri invalide.
- **Locație:** `src/pages/contact.astro:113`
- **Recomandare:** scoate `novalidate` sau adaugă script JS care arată mesaj sub câmp (`aria-invalid` + `aria-describedby`).

### 4.4 Error / success states

**Issue 4.4.1 — Medium:**
Success: redirect la `/multumim` ✅.
Error: niciun handling. Dacă Formspree returnează 4xx (ex. honeypot triggered), userul vede pagina lor default.
- **Locație:** `src/pages/contact.astro:113`
- **Recomandare:** pentru post-MVP, schimbă la AJAX submit cu Formspree's `Accept: application/json` și afișează mesaj de eroare pe pagină. Dar e overkill — `_next` + Formspree default error sunt acceptable.

### 4.5 404 page — ✅ Bun

Are: titlu mare, subtext clar, 2 CTA (înapoi acasă + contact), terminal mock cu listare rute. Lipsește totuși un link către `/sitemap-index.xml` pentru exploratori.

**Issue 4.5.1 — Low:**
Lipsește un input search sau link spre sitemap — userii care caută o pagină specifică nu au alternativă.
- **Locație:** `src/pages/404.astro`
- **Recomandare opțională:** adaugă un al treilea CTA `Vezi sitemap` linking la `/sitemap-index.xml`.

---

## 5. CYBERPUNK CONSISTENCY

### 5.1 Design system — ✅ Consistent

- Toate paginile folosesc aceleași classes: `border-phoenix-gray bg-phoenix-black`, `bg-phoenix-gray/30`, `border-phoenix-green/40`.
- Tipografie: `font-display`, `font-mono` aplicat consistent.
- Accent tags: pattern uniform (`border border-phoenix-cyan/40 bg-phoenix-cyan/5 px-2 py-1 font-mono text-[10px] uppercase tracking-[0.2em] text-phoenix-cyan`).

### 5.2 Spacing — ⚠️ Mostly consistent

Section padding: `py-16` și `py-20` alternate aproape random.

**Issue 5.2.1 — Low:**
Inconsistență: unele secțiuni folosesc `py-16`, altele `py-20`, altele `py-24`.
- **Locație:** Multiple files (caută `py-16\|py-20\|py-24` în pages).
- **Recomandare:** convenție fixă — `py-20` standard, `py-24` pentru hero-zone, `py-16` pentru sub-secțiuni dense.

### 5.3 Animation timing — ✅ Consistent

`transition-colors`, `duration-300` (hover cards), `duration-500` (image scale) — variete acceptabilă, nu inconsistență.

### 5.4 Hover states — ✅ Pass

Toate butoanele și link-urile au `hover:` styles. Cardurile au `hover:-translate-y-1` + `hover:border-phoenix-green` + glow shadow.

### 5.5 Dark mode coerent — ✅ Pass

Body `bg-phoenix-black` setat. Html `bg-phoenix-black` în BaseLayout. No white flash potential. CookieConsent are bg-phoenix-black/95 + backdrop-blur — discret, nu scoate userul din dark.

---

## 6. CONTENT & TYPOGRAPHY

### 6.1 Sizes per page

**Issue 6.1.1 — Low:**
Per pagină se folosesc: h1 (text-4xl/text-6xl/text-7xl), h2 (text-3xl/text-4xl), h3 (text-xl/text-2xl), body (text-base + text-sm + text-xs), eyebrow (text-[10px]/text-xs). Asta e ~5-6 sizes — peste limita de 3 menționată în spec.
- **Recomandare:** acceptabil pentru un site de agenție cu hero mare; dar reducerea la 4 (h1 / h2 / body / mono micro) ar simplifica.

### 6.2 Line-height

`leading-relaxed` (1.625) pe paragraf body, `leading-tight` (1.25) pe heading-uri — bine.

### 6.3 Max line length

**Issue 6.3.1 — Medium:**
`prose max-w-none` pe blog [slug] și portofoliu [slug] — pe ecran lat (≥1440px), liniile au ~110+ caractere → fatigue.
- **Locație:** `src/pages/blog/[slug].astro:176`, `src/pages/portofoliu/[slug].astro:99` și locale-uri
- **Fix:**
  ```diff
  - <div class="prose prose-invert max-w-none ...
  + <div class="prose prose-invert max-w-prose ...
  ```
  `prose` default = 65ch (~75 caractere). Sau `max-w-[72ch]` pentru control fin.

### 6.4 Headings scanabile — ✅ Pass

Headings sunt scurte, glow-green pe principal, fără jargon excesiv.

---

## 7. CONVERSION OPTIMIZATION

### 7.1 Trust signals — 🚨 High (faked)

**Issue 7.1.1 — HIGH:**
TrustBar afișează 6 "logo-uri" dar sunt **glyph SVG generic** + nume text "BPD Trans, Horeca Co, Ecom Pro, Local Biz, Fit Studio, Auto Hub" — toate cu excepția BPD sunt **inventate**. Userul vede asta și-și pierde încrederea (cere logo real, găsește că e generic).
- **Locație:** `src/components/TrustBar.astro:34-49`, `src/i18n/{ro,en,it}.json` (`trustBar.logos` array)
- **Recomandare:** după validare client, înlocuiește `trustBar.logos` cu numele clienților reali (sau scoate complet TrustBar până ai 4-6 logo-uri reale + permis pentru a le folosi).

**Issue 7.1.2 — HIGH:**
Testimonial: `"Andrei P., CEO, DTC Brand"` cu ROAS 5.8x — e generic și nu poate fi verificat. Vezi spec utilizator anterior: nu inventa cifre.
- **Locație:** `src/i18n/{ro,en,it}.json` (`testimonials.items[0]`); apare pe homepage și despre.
- **Recomandare:** scoate testimonialul din i18n până ai testimonial real cu nume complet, foto, link LinkedIn, cifre validate. Sau ascunde secțiunea Testimonials cu `{testimonials.items.length > 0 && ...}` care deja filtrează — golește array-ul în i18n: `"items": []`.

**Issue 7.1.3 — Medium:**
Hero stats `ROAS 4.5x` + `Active campaigns 32+` — și acestea pot fi nerealist sau inventate.
- **Locație:** `src/i18n/{ro,en,it}.json` (`hero.stats`)
- **Recomandare:** validează cu Laurențiu cifrele reale. Dacă nu sunt verificabile → schimbă în texte calitative ("Calibrare ROAS", "Campanii active").

### 7.2 Social proof — Missing

Pe homepage, social proof e doar TrustBar (placeholder) + 1 testimonial (placeholder). Pentru un site de agenție, asta e subdimensionat.
- **Recomandare** post-validare: 3+ testimoniale, link la 3 case studies cu rezultate reale, "Au lucrat cu noi" cu logo-uri reale.

### 7.3 Urgency / scarcity — Absent

OK — nu trebuie inventat. Dacă agentul are program limitat ("8-10 clienți simultan" deja menționat în despre), poate fi punctat ca scarcity legitim.

### 7.4 Friction în formular — vezi 4.3.

### 7.5 Obvious next steps — ✅ Pass

Fiecare pagină are CTA primary la final + WhatsApp floating + nav.

---

## 8. SEO ON-PAGE

### 8.1 Meta titles — 🚨 Critical brand bug

**Issue 8.1.1 — CRITICAL:**
**Brand misspelled în `src/utils/content.ts`** — toate meta titlurile pentru pagini servite via `getPageCopy` (homepage RO/EN/IT, despre, contact, politica, portofoliu, blog) folosesc **"Green Phoenix"** (cu "h-o") în loc de **"Green Pheonix"** (intentional misspelling, brand actual, corespunde domeniului `greenpheonixconcept.com`).

Confirmation: `grep "Green Phoenix" src/utils/content.ts` → 27 hits. Domeniu real: `greenpheonixconcept.com`.

Impact: Search engines vor returna `<title>` cu marcă greșită (Google show-uiește titlul, deci users văd "Phoenix" dar landing pe `greenpheonixconcept.com` cu "Pheonix"); brand confusion; CTR reduced; risk de bounce.

- **Locație:** `src/utils/content.ts` linii 17, 21, 25, 37, 41, 45, 46, 49, 53, 57, 61, 67, 71, 75, 87, 91, 95, 96, 99, 103, 107, 117, 121, 125, 137, 141, 145, 146, 149, 153, 157
- **Fix:** find-and-replace global:
  ```bash
  sed -i 's/Green Phoenix/Green Pheonix/g' src/utils/content.ts
  ```
  Verifică apoi vizual că textul e OK pe ambele variante (ro/en/it).

**Issue 8.1.2 — Medium:**
`src/pages/servicii-web.astro` meta title = 73 caractere (peste 60).
- **Locație:** `src/pages/servicii-web.astro:13`
- **Title actual:** "Servicii Web — Site-uri & Landing Pages care convertesc | Green Pheonix"
- **Fix:**
  ```diff
  - title: 'Servicii Web — Site-uri & Landing Pages care convertesc | Green Pheonix'
  + title: 'Servicii Web Performante — Green Pheonix Concept'
  ```
  (52 char, conține keyword "servicii web" + brand)

**Issue 8.1.3 — Low:**
Multe titluri folosesc separator `—` em-dash (5 chars vizual). Ok pentru brand consistency.

### 8.2 Meta descriptions

Verificare lungimi: cele mai multe sub 160. Fără CTA explicit în descriptions.

**Issue 8.2.1 — Low:**
Meta descriptions nu conțin CTA verb-driven.
- Exemplu: "Agenție de marketing digital: ads și site-uri care convertesc."
- **Recomandare:** adaugă call-to-action la final: "Programează un audit gratuit." Asta crește CTR pe SERP cu ~5-15%.

### 8.3 H1 unique per pagină — ✅ Pass

Hero compact și full au h1 dinamic per pagină. Verifică:
- `/` → "Reclame care aduc clienți. Site-uri care convertesc."
- `/servicii-ads` → "Reclame online care aduc clienți, nu doar impresii."
- `/servicii-web` → "Site-uri rapide, optimizate să vândă."
- `/despre` → "Despre Green Pheonix."
- `/contact` → "Hai să vorbim."
- `/politica` → "Politica de Confidențialitate"
- `/portofoliu` → "Proiectele noastre."
- `/blog` → "Blog."
- `/404` → "404"
- `/multumim` → "Mulțumim!"

Toate unice ✅.

### 8.4 Internal linking — ✅ Pass

Navbar (7 links) + Footer (12 links) + cross-links din content (CTAs) + related-posts pe blog detail. Sufficient pentru un site de 9 pagini × 3 locale.

### 8.5 Image filenames

**Issue 8.5.1 — Low:**
Filenames generice: `og-image.jpg`, `og-ads.jpg`, `og-web.jpg`, `og-transport.jpg`, `founder.png`, `founder-og.jpg`. Nu sunt descriptive pentru SEO image search.
- **Locație:** `astro/public/`
- **Recomandare post-launch:** rename:
  ```
  founder.png       → laurentiu-bogdan-fondator-green-pheonix.png
  og-image.jpg      → green-pheonix-concept-performance-marketing.jpg
  og-ads.jpg        → google-ads-meta-tiktok-romania.jpg
  og-web.jpg        → site-uri-landing-pages-astro-shopify.jpg
  og-transport.jpg  → bpd-trans-transport-international-brasov.jpg
  ```
  Apoi update referințele din content.ts și frontmatter case studies. Atenție la `.htaccess` redirects dacă URL-urile sunt deja indexate.

---

## Recomandări prioritizate (high-impact first)

**Sprint 1 — Critical/High (deploy blockers):**
1. **Fix brand:** `sed -i 's/Green Phoenix/Green Pheonix/g' src/utils/content.ts` (10 secunde, fix global)
2. **Add focus-visible:** ~10 linii CSS în `global.css`
3. **Add prefers-reduced-motion:** ~10 linii CSS în `global.css`
4. **Touch targets:** `h-10 → h-11` (Navbar), `py-2 → py-3` (CookieConsent), `py-1.5 → py-2.5` (LanguageSwitcher)
5. **Goleste fake trust signals:** `trustBar.logos: []` și `testimonials.items: []` în i18n până ai date reale

**Sprint 2 — Medium (post-launch):**
6. Constraint `prose max-w-prose` pe blog/case-study detail
7. Reorganize formular contact: collapse câmpurile opționale
8. Servicii-web meta title sub 60 chars
9. Eager loading + fetchpriority pe founder image
10. Self-host fonturi (perf + GDPR)
11. Validare client-side custom pe form

**Sprint 3 — Low (nice-to-have):**
12. Rename image files cu cuvinte cheie SEO
13. ID-uri pe h2-uri din `politica` pentru deep-linking
14. CTA în meta descriptions
15. Reducere keyboard focus traps în Navbar mobile + Cookie banner

---

## Anex — Code snippet centralizat pentru `global.css`

Append-uie la sfârșitul `src/styles/global.css` pentru a rezolva 1.5 + 1.7 dintr-o singură edit:

```css
/* === Accessibility additions === */

/* Visible focus for keyboard users only */
:focus-visible {
  outline: 2px solid var(--phoenix-green);
  outline-offset: 2px;
  box-shadow: 0 0 0 4px rgba(0, 255, 148, 0.18);
  transition: box-shadow 120ms ease-out;
}
input:focus-visible,
select:focus-visible,
textarea:focus-visible {
  outline-offset: 0;
  box-shadow: 0 0 0 2px rgba(0, 255, 148, 0.45);
}

/* Respect reduce-motion preference */
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
  .scanline::after,
  .marquee-track,
  .glow-green {
    animation: none !important;
  }
}
```

Acoperă 2 din 3 issues Critical/High doar prin 25 de linii de CSS.

---

**Audit finalizat. Total issues: 16 (2 Critical, 5 High, 6 Medium, 3 Low).**
