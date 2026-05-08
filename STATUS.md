# STATUS — Sesiune 2026-05-08 (post-audit cleanup)

## ✅ Schimbări aplicate în această sesiune

### 1. Brand consistency (commit `2d77de5`)

- Brandul **comercial** afișat peste tot: **`Green Phoenix`** (corect ortografic).
- Entitatea **legală** păstrată ca **`Green Pheonix Concept SRL`** (ortografie originală a denumirii înregistrate) — apare doar în:
  - Schema.org `legalName` în BaseLayout
  - Footer disclaimer (rescris în ro/en/it: *"Green Phoenix este marca comercială a Green Pheonix Concept SRL · CUI 45667331 · J2022000195397 · Brașov, România"*)
  - Politica de confidențialitate, secțiunea Operator (RO/EN/IT)
- Domeniul `greenpheonixconcept.com` și handle-urile sociale (`@green_pheonix_`, `@green.pheonix.concept`) **neschimbate**.
- Wordmark navbar/footer: **`GREEN PHOENIX®`** (fără "CONCEPT").

### 2. BPD eliminat (commit `71e2517`)

- Șterse: `caseStudies/bpd-trans.md`, `bpd-trans-en.md`, `bpd-trans-it.md`, `bpd-transport-cresterea-leads.md` (3 publicate + 1 draft).
- `.htaccess`: legacy `/studiu-caz-bpd.html` → `/portofoliu` (înainte trimitea la slug-ul șters).
- "BPD Trans" eliminat din `trustBar.logos` (golit complet în commitul următor).
- Subtitle hero `/portofoliu` (RO/EN/IT) reformulat: *"Selecție de proiecte recente cu cifre validate de clienți. Mai multe case studies vin pe măsură ce primim acordul de publicare."* — fără să declare un volum specific.

### 3. Trust signals ascunse (commit `9793215`)

- `trustBar.logos = []` în RO/EN/IT.
- TrustBar component re-gated: nu se randează cu < 4 logo-uri.
- `testimonials.items = []` în RO/EN/IT (testimonialul "Andrei P. ROAS 5.8x" fictiv eliminat).
- Pagina `/despre` (RO/EN/IT): secțiunea Testimonial hardcodată ștearsă + import scos.
- Homepage iterează deja `testimonials.items.length > 0` → array gol = secțiune ascunsă automat.

### 4. A11y critical fixes (commit `47d462f`)

- `*:focus-visible` cu outline phoenix-green + offset; ring suplimentar pe `button` și `a`; ring tighter pe input/select/textarea (form deja schimba border, ring evită dublarea).
- `@media (prefers-reduced-motion: reduce)` care:
  - reduce orice animație/tranziție la 0.01ms
  - dezactivează numit `scanline`, `marquee-track`, `glow-green`
- Rezolvă WCAG 2.4.7 + 2.3.3 (Critical #2 + High #3 din audit).

### 5. Touch targets ≥ 44×44 (commit `985d580`)

- Navbar hamburger + close: `h-10 w-10` → `h-11 w-11 min-h-[44px] min-w-[44px]`.
- CookieConsent (4 butoane): `px-4 py-2` → `min-h-[44px] px-4 py-3`.
- LanguageSwitcher trigger + opțiuni dropdown: `py-1.5 / py-2` → `min-h-[44px] py-2 / py-3`.
- Rezolvă WCAG 2.5.5 (High #5 din audit).

## 🔬 Verificare după rebase

- `astro check` → **0 errors / 0 warnings / 0 hints** (58 fișiere).
- `astro build` → **43 pagini** generate (era 46; -3 BPD, -0 schimbări de structură), 0 erori.
- `astro preview` smoke-test:
  - Title homepage: `Green Phoenix — Performanță digitală` ✓
  - Schema `name: Green Phoenix` ✓ + `legalName: GREEN PHEONIX CONCEPT S.R.L.` ✓
  - Footer disclaimer cu noua formulare ✓
  - TrustBar și Testimonials absente pe homepage și /despre ✓
  - `/portofoliu/bpd-trans` → 404 ✓
  - `focus-visible` și `prefers-reduced-motion` prezente în CSS bundle ✓

## 🟡 Rămase pentru următoarea sesiune (Medium issues din audit)

| Issue | Locație | Effort |
|---|---|---|
| Servicii-web meta title 73 char (>60) | `src/pages/servicii-web.astro:13` | 1 min |
| `prose max-w-none` → `max-w-prose` pe blog/portofoliu detail | 6 files | 5 min |
| Form contact: collapse câmpurile opționale sub `<details>` | 3 contact pages | 30 min |
| Cookie banner: focus la show, ESC handler, focus trap | `CookieConsent.astro` | 20 min |
| Mobile nav: focus trap în off-canvas panel | `Navbar.astro` | 15 min |
| `placeholder-phoenix-light/40` → `/55` (contrast 3.4 → 5+) | 3 contact pages | 5 min |
| Eager loading + fetchpriority="high" pe founder image | 3 despre pages | 5 min |
| ID-uri pe h2-uri din politica (deep-linking) | 3 politica pages | 10 min |

## ⚠️ Decizii care necesită input de la tine

1. **Case studies clinica-medicala + ecommerce-fashion**
   Ambele sunt cu `anonymized: true` și **conțin cifre fictive** (ROAS 5.8x, +487% bookings) generate de mine ca seed content în task-uri anterioare. În producție, după ștergerea BPD, acestea sunt singurele 2 case studies vizibile.
   - Opțiune A: le ștergem complet (consistent cu principiul *"mai bine gol decât fals"*) → `/portofoliu` afișează 0 cards până validăm Kokoro+Lemet.
   - Opțiune B: le păstrăm ca exemple anonimizate generic (dar poartă cifre inventate).
   - **Recomandare:** A. Spune-mi dacă să le șterg.

2. **Stats hero `ROAS 4.5x` + `Active campaigns 32+`**
   Text setat în `i18n/*/hero.stats`. Cifrele sunt din primul brief, nu validate. La fel ca trust signals — fie le validezi cu cifre reale, fie le schimbăm în texte calitative ("Calibrare ROAS", "Campanii active").

3. **Logo SVG real pentru trust bar**
   Când ai logo-uri SVG pentru ≥ 4 clienți reali (Kokoro, Lemet + alți 2+), trimite-le și le pun în `public/images/logos/`. Update apoi schema TrustBar să accepte `{name, logo}` în loc de doar string.

4. **Testimoniale validate**
   Pentru fiecare client care acceptă: nume complet, foto (sau monogramă), rol, companie, citat de 1-3 propoziții, rating 1-5. Le adaug în `i18n/*.json#testimonials.items` și se reactivează automat secțiunea.

5. **Formspree FORM_ID**
   Trei pagini de contact (RO/EN/IT) au `[FORM_ID_PLACEHOLDER]` în `action`. După ce creezi formularul pe formspree.io, înlocuim cu ID real (15 secunde, 3 fișiere).

6. **Analytics ID-uri**
   În `BaseLayout.astro`, blocul `{/* INSTRUCTIONS — Analytics */}` are placeholders `G-XXXXXXXXXX`, `XXXXXXXXXXXXXXXX`, `cccccccccc` pentru GA4 / Meta Pixel / Microsoft Clarity. La activare: înlocuim ID-urile + uncomment.

## 🚀 Stare deploy

- Branch `claude/setup-astro-project-is888` la zi cu cele 5 commit-uri noi (rebase curat, branch a fost rewritten, va trebui force-push).
- `main` încă pe `bfef7f8` (audit report) — așteaptă fast-forward.
- Build production verificat OK (43 pagini, 0 erori).
- Tag `v1.0.0-rc1` rămâne pe vechiul commit; după ce confirmi, putem retag pe HEAD nou și încerca push.
