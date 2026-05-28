# Green Pheonix — Design Identity

**Scop:** documentează ce face acest site să fie *Green Pheonix*, nu un template generic. Compară versiunea **HTML statică live** (root `style.css` + `main.js` + paginile `.html`) cu versiunea **Astro** (`astro/src/`), așa cum sunt pe `refactor/astro-prep` după repaint-ul light + curățarea hero-ului.

---

## 1. Sistem de culori

Paleta este identică între HTML live și Astro (post-repaint). Ce diferă este numirea tokenilor: CSS variables `--brand-*` / `--bg-*` în live, vs. Tailwind palette `gpc-*` în Astro.

### Brand verde (primary)

| Token Astro | Token live | Hex | Rol |
|---|---|---|---|
| `gpc-green` | `--brand-primary` | `#43A047` | Verde forest, accent principal — folosit pentru: link `is-active`, scan-line, brand-slot border, header decorations mono uppercase, hover state pe link-uri, marquee strip (live), pulsing dot, FAQ icon border, focus outline secundar |
| `gpc-green-dark` | `--brand-dark` | `#2E7D32` | Hover pe WhatsApp button (live), hover pe primary CTA verde (Astro) |
| `gpc-green-light` | `--brand-light` | `#66BB6A` | Gradient end pe progress bar (Astro hero metrics era acolo, acum eliminat) |

### Accent roșu

| Token Astro | Token live | Hex | Rol |
|---|---|---|---|
| `gpc-red` | `--accent-red` | `#FF0033` | **CTA primar** („Programează un audit", „Începe proiectul"). Culoare hamburger activ. FAQ title color când e `[open]`. Cursor outline color la hover. Sticky-card `card-ads` background. `result-impact-section` accent. |
| `gpc-red-dark` | `--accent-red-dark` | `#CC0029` | Hover state pe `.btn-main`. |
| `gpc-red-soft` | `--accent-red-soft` | `#FF3355` | Nefolosit activ în Astro, declarat ca rezervă. |

### Neutrali (Swiss / light mode)

| Token Astro | Token live | Hex | Rol |
|---|---|---|---|
| `gpc-white` | `--bg-main` | `#FFFFFF` | Fundal principal pagină. Body, navbar, hero, secțiuni. |
| `gpc-card` | `--bg-card` | `#F4F4F5` | Card surfaces (editorial-img-container, hero card metrics aside, ServiceCard hover). |
| `gpc-surface` | `--bg-surface` | `#E4E4E7` | FAQ item open background, footer giant text background fallback. |
| `gpc-border` | `--border-color` | `#E0E0E0` | Toate border-urile structurale: navbar bottom, sticky-card stack-section divider, FAQ item bottom, content-grid sidebars, stat-box borders. |
| — | `--border-strong` | `#000000` | Live HTML only: pill button border. În Astro convertit la `border-gpc-ink`. |

### Text

| Token Astro | Token live | Hex | Rol |
|---|---|---|---|
| `gpc-ink` | `--text-primary` | `#050505` | Aproape-negru. Body text, headings, navbar links. Folosit și pentru `pill-btn` background hover (text invers). |
| `gpc-text-secondary` | `--text-secondary` | `#52525B` | Subtitle paragraph, descriptive copy, link-minimal. |
| `gpc-text-muted` | `--text-muted` | `#71717A` | Mono labels small uppercase (stat-label, page-desc, FAQ closed answer hint, footer-rights). |
| — | `--text-inverse` | `#FFFFFF` | Pe fundal dark (footer, sticky-card dark, cookie banner brutalist). În Astro = literal `text-white`. |

### Cazuri speciale dark (intentional accent)

- **Footer**: `bg-gpc-footer` = `#050505` (identic cu `--text-primary`), text `white` cu opacity 60/70/80 pentru ierarhie. Pe site-ul live: `.footer-brutalist { background: #050505; color: #fff }`.
- **Sticky stack `card-audit`** (HTML live only): `background-color: #111111`.

### Raporturi de utilizare

- ~75% alb pur (`#FFFFFF`) dominant.
- ~15% gri-foarte-deschis (`#F4F4F5`, `#E4E4E7`) pentru carduri, formulare, secțiuni alternante.
- ~7% negru / aproape-negru pentru text și footer.
- ~2% verde (#43A047) — strict accent: tag-uri eyebrow mono, link hover, accent line, icoane mici, marquee.
- ~1% roșu (#FF0033) — strict CTA primar și stări „danger" (hamburger activ, FAQ deschis).

> Regula: verde și roșu **nu apar niciodată simultan ca mase de culoare**. Verde = elemente sistemice (status, link, accent). Roșu = decizia de cumpărare / atenție urgentă.

---

## 2. Tipografia

### Fonturi (identice între live și Astro post-repaint)

| Rol | Font | Greutăți | Familie CSS |
|---|---|---|---|
| Display (h1–h6, butoane, navbar, footer text giant) | **Oswald** | 400, 500, 600, 700 | `var(--font-display)` / Tailwind `font-display` |
| Body (paragrafe, descriptive copy, formulare) | **Space Grotesk** | 300, 400, 500, 600, 700 | `var(--font-body)` / Tailwind `font-sans` |
| Mono (badge-uri tech, labeluri, ticker, eyebrows, coordonate GPS) | **Space Mono** | 400, 700 | `var(--font-mono)` / Tailwind `font-mono` |

> Notă istorică: schimbul a fost făcut în refactor-ul `37ceb1f`. Înainte, Astro folosea greșit `Inter + JetBrains Mono` care era off-brand.

### Scale tipografic — live HTML

| Element | Font | Dimensiune | Tratament |
|---|---|---|---|
| Hero h1 (`.sophisticated-headline`) | Oswald | `clamp(3.5rem, 7vw, 7rem)` (≈ 56-112px) | `line-height: 0.85`, uppercase, `letter-spacing: -0.5px`. Linia 2 indentată 40px și colorată verde brand. |
| Page title (`.page-title`) | Oswald | `clamp(3rem, 8vw, 6rem)` (48-96px) | `line-height: 0.9`, uppercase. |
| Footer giant text | Oswald 700 | `13.5vw` (responsive până la `clamp(2rem, 10vw, 6rem)`) | `line-height: 0.8`, hover → verde. |
| Inline social-proof sentence | Oswald | `clamp(2rem, 5vw, 4.5rem)` | uppercase. |
| Section title medium (`.sticky-title`, `.editorial-title`) | Oswald | `clamp(1.5rem, 3vw, 2.5rem)` / `2.5rem` | uppercase, line-height 1. |
| Hero stats value (`.stat-value`) | Oswald | `3rem` | verde brand. |
| Body paragraph | Space Grotesk 400 | `1rem-1.2rem` | line-height 1.6, secondary text color. |
| Tech header / mono badges | Space Mono | `0.7rem-0.85rem` | uppercase, `letter-spacing: 1-2px`, muted. |
| Ticker | Oswald | `1rem` | uppercase, `letter-spacing: 2px`. |
| FAQ title | Oswald | `1.2rem` | uppercase. |
| Section eyebrow (`.stack-section-title`) | Oswald | `1.5rem` | uppercase, secondary color, `letter-spacing: 2px`. |

### Scale tipografic — Astro

| Element | Clasă | Dimensiune Tailwind |
|---|---|---|
| Hero h1 full | `font-display text-5xl md:text-7xl lg:text-[5.5rem]` | 48 / 72 / 88px |
| Hero h1 compact | `font-display text-4xl md:text-6xl` | 36 / 60px |
| Section header eyebrow | `font-mono text-xs uppercase tracking-[0.3em] text-gpc-green` | 12px |
| Subheader / h2 | `font-display text-3xl md:text-4xl text-gpc-ink` | 30 / 36px |
| Card title | `font-display text-2xl` | 24px |
| Stat value (CaseStudyCard KPI) | `font-display text-xl text-gpc-green` | 20px |
| Body paragraph | `font-mono text-sm leading-relaxed text-gpc-ink/70` / `text-base` | 14 / 16px |
| Tag/badge | `font-mono text-[10px] uppercase tracking-[0.2em]` | 10px |
| Ticker marquee | `font-mono text-xs uppercase tracking-[0.3em]` | 12px |

### Tratamente tipografice signature

1. **Toate headerele uppercase** — `text-transform: uppercase` global pe `h1..h4`, plus `letter-spacing: -0.5px` în live (negative tracking pentru densitate verticală).
2. **Line-height extrem de strâns**: `0.85` pentru hero, `0.8` pentru footer giant, `0.9` pentru page titles. Cuvintele se „lipesc" — semnătură brutalist/Swiss.
3. **`.text-outline`** (live only, nu portat în Astro): `color: transparent; -webkit-text-stroke: 1px var(--text-primary);` Folosit pentru cuvintele „STUDIES", „WORKS", „VÂND" în titluri — efect de logo decupat.
4. **`tracking-[0.2em]` / `tracking-[0.3em]` / `tracking-[0.4em]`** pe mono labels — semnătura „terminal".
5. **Negative margin pe linia 2** a hero h1 (live): `.line-2 { margin-left: 40px; color: var(--brand-primary); }` — typography asimetric editorial.
6. **Caractere ASCII decorative** în mono: `///`, `◉`, `[X]`, `+`, `→`, parantheze pătrate pentru coordonate `[45.6579° N, 25.6012° E]`.

### Ce dă caracterul tipografic „tech/Swiss/brutalist"

- **Oswald** = grotesk condensat, uppercase strict — referință clasică Swiss/Bauhaus (Helvetica Inserat).
- **Space Mono** = mono cu serif minimal — semnătură terminal / Apple developer / coding aesthetic.
- **Space Grotesk** = grotesk modern cu picior mono — punte între cele două.
- Combinația: corporate (Oswald) + tech (Mono) + neutral modern (Grotesk) = stratificare „agenție de marketing tehnică, nu creative shop".

---

## 3. Elemente de personalitate / signature

Inventar complet, marcat **LIVE** (există în site-ul HTML root), **ASTRO** (există în versiunea Astro), sau **AMBELE**.

### Badge-uri tech / eyebrow row

**AMBELE** — pe hero, înainte de h1:

```
[● ONLINE SYSTEM]  [LOC: BRAȘOV [45.6579° N, 25.6012° E]]  [AGENCY_VER_2.5]
```

- Mono, uppercase, `letter-spacing: 0.2em-0.3em`, border subțire verde (pentru cele "live") sau gri (pentru cele "neutral").
- Live HTML are `.tech-item` cu `pulsing-dot` (verde, animație `pulse-green` 2s infinite, scaling 1 → 0.8 → 1).
- Astro: classes `border border-gpc-green/40 bg-gpc-green/5 px-2 py-1 text-gpc-green` pentru primele două, `border border-gpc-border bg-gpc-card/40 text-gpc-ink/70` pentru a treia.
- Coordonatele GPS sunt **reale Brașov** (45.6579° N, 25.6012° E) — folosite și în JSON-LD `LocalBusiness`.

### Marquee / ticker

**AMBELE**:

- Sub hero, peste 100vh: ticker orizontal cu cuvinte STRATEGIE / AUDIT / IMPLEMENTARE / OPTIMIZARE / CREATIVE / TRACKING / SCALING (8-10 cuvinte loop).
- Animație CSS keyframe: `0% translateX(0) → 100% translateX(-50%)`, durată **30s**, `linear infinite`.
- `transform: translate3d(0,0,0)` + `will-change: transform` pentru GPU optimization.
- În live: `.ticker-track` fundal alb, text secondary 1rem letterspacing 2px. În Astro: `.marquee-track` cu separator `///` verde între cuvinte.
- Există și un al doilea marquee **LIVE only** — `.marquee-wrapper` cu `background: var(--brand-primary)` (verde) și text negru bold — folosit ca strip newsletter.

### Custom cursor

**LIVE only** (nu portat în Astro):

```css
.cursor-dot   { 8x8px;  background: var(--brand-primary); }
.cursor-outline { 40x40px; border: 1px solid var(--brand-primary); opacity 0.5; }
body.hovering .cursor-outline { 65x65px; bg: rgba(67,160,71,0.1); border: red; }
body.hovering .cursor-dot { background: var(--accent-red); }
```

- `cursor: none` pe tot `body`.
- JS: `setupCursor()` în `main.js`, IntersectionObserver pe `a, button, .pill-btn, .editorial-card, .poster-visual` adaugă `body.hovering`.
- Outline animat cu `Element.animate()` (Web Animations API) fill: forwards, duration 500ms — efect „lag" pentru fluiditate.
- Disabled pe `pointer: coarse` (touch devices) și pe focus-visible (keyboard nav).

### Spotlight grid effect

**LIVE only**: variabile `--x` și `--y` setate de JS pe `.hero-sophisticated`, fundal `.bg-grid-layer` cu `mask-image` care urmărește mouse-ul pentru efect lanternă. Codul mask-image e dezactivat în CSS-ul actual cu `!important: none` — feature partial, mostly cosmetic.

### Magnetic buttons

**LIVE only**:

```css
.btn-main, .pill-btn, .sticky-link {
  transition: transform 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94), ...;
  will-change: transform;
}
```

Buton-ul se „lipește" subtil de cursor la hover (deplasare 2-4px spre direcția cursor-ului). Logica JS nu mai e prezentă în `main.js` post-cleanup, dar CSS-ul rămâne pregătit. Hover state stays.

### Scan-line animation

**LIVE only** — pe `.floating-card` hero:

```css
.scan-line {
  height: 15px;
  background: linear-gradient(to bottom, rgba(67,160,71,0) 0%, rgba(67,160,71,0.8) 50%, rgba(67,160,71,0) 100%);
  box-shadow: 0 0 15px var(--brand-primary);
  animation: scan 4s ease-in-out infinite;
}
@keyframes scan { 0% { top: -10%; opacity:0; } 15% { opacity:1; } 85% { opacity:1; } 100% { top:110%; opacity:0; } }
```

Verde glow horizontal care traversează cardul de la sus la jos la 4s. Element semnătură „CRT scanner / radar".

### Numerotări tech și caractere recurente

**AMBELE**:
- `///` ca separator în mono headlines, marquee, marker pe rail-uri.
- `[X]` în `AGENCY_VER_2.5` și similar.
- `→` (Unicode arrow), nu `-->`, pe CTA-uri.
- `◉` pe badge `ONLINE SYSTEM`.
- `+` (rotit la `×` cu 45deg) pe FAQ trigger.
- Numere padded cu zero: `01`, `02`, `03` pentru steps și service cards.

### „GP" watermark giant

**LIVE only** — în secțiunea FAQ:

```css
.faq-section::before {
  content: 'GP';
  font-family: var(--font-display);
  font-size: 30vw;
  color: var(--text-primary);
  opacity: 0.03;
  bottom: -50px; right: -20px;
}
```

Bound-uri uriașe „GP" decupate la 3% opacitate în colțul jos-dreapta — semnătură tipografic-spațială.

### Footer giant text

**LIVE only**: `<div class="footer-giant-text">GREEN PHEONIX®</div>` afișat la **`font-size: 13.5vw`** centered (≈194px @1440), `line-height: 0.8`, hover → verde brand. Pe mobil scade la 18vw. Practic ocupă o secțiune întreagă a footerului ca poster typographic.

### Brand-slot decorație colțuri

**LIVE only** — pe propoziția social proof „NOI CONSTRUIM SISTEME PENTRU [BRANDURI], CREȘTEM CERERI PENTRU [BPD TRANS]":

```css
.brand-slot::before { 15x15px; border: 2px solid var(--brand-primary); top:0; left:0; border-right:none; border-bottom:none; }
.brand-slot::after  { 15x15px; border: 2px solid var(--brand-primary); bottom:0; right:0; border-left:none; border-top:none; }
:hover ::before, :hover ::after { width: 100%; height: 100%; border-color: var(--accent-red); }
```

Două colțuri verzi (sus-stânga + jos-dreapta) care la hover se extind la marginile întregi și se înroșesc. Element editorial signature — citează tagging-ul din presa tipărită.

### Noise overlay

**LIVE only**:

```html
<div class="noise-overlay"></div>
```
```css
.noise-overlay {
  position: fixed; inset: 0; z-index: 9000; opacity: 0.03;
  background-image: url("data:image/svg+xml,...feTurbulence baseFrequency='0.8'...");
  filter: invert(1);
}
```

SVG fractal noise generat inline ca data-URI, peste tot, la 3% opacitate. Dă senzație de „print analog / film grain". Element subtle dar definitoriu.

### Limbaj vizual recurent

**AMBELE**:
- Mono font folosit **exclusiv** pentru metadata (date, categorii, version tags, coordinates, tracking labels). Niciodată pentru body copy.
- `letter-spacing: 0.2em-0.4em` pe orice text mono uppercase — semnătură terminal.
- Borders mereu `1px solid var(--gpc-border)` (#E0E0E0). Niciodată 2px decât pe brand-slot accent.
- Carduri fără `border-radius` (squared corners) — Swiss strict.
- Hover state aproape niciodată cu `box-shadow` mare — preferință pentru `translate-y(-1px)`, `border-color shift` la verde, sau scale subtil 1.02.

---

## 4. Componente vizuale cheie

### Hero (după refactor)

**LIVE**: layout 2 coloane `grid-template-columns: 1.2fr 0.8fr`, max-width 1440px. Coloana stânga: badge row + h1 mare (linia 2 indentată 40px, verde) + paragraph + CTA wrapper. Coloana dreapta: `.floating-card` 350x480 rotat -3deg, hover rotate(0deg) scale(1.02), filtru grayscale → color. Ticker bottom alb. `min-height: 100vh`, `padding-top: 100px` pentru navbar fixed.

**ASTRO** (post-curățare cifre): layout single-column `max-w-5xl`. Badge row, h1 până la `5.5rem` (88px) — ultimele 2 cuvinte verzi. Paragraph + CTA roșu + CTA outline negru. Sub: rail capability `META · GOOGLE · TIKTOK · WEB` separat prin `///`, peste o linie subțire `border-t`. Marquee bottom cu separator verde `///`. Fundal grid blueprint subtil `rgba(5,5,5,0.04)` 48px tile.

> Astro a **pierdut** cardul floating rotated, scan-line, partea vizuală de dreapta — câștigând onestitate (zero cifre fabricate).

### Navbar

**LIVE**: `position: fixed`, full-width, `padding: 20px 40px`, `border-bottom: 1px var(--border-color)`, `background: rgba(255,255,255,0.95)`, `backdrop-filter: blur(10px)`, `z-index: 9999`. Logo: SVG glyph + text Oswald uppercase tracking 1px. Links Oswald uppercase 0.9rem secondary; active state = verde brand + underline 4px offset; contact CTA = `.pill-btn` rounded 50px border-strong, hover fills cu ink. Hamburger 3 bars 30x2px, activ = bars roșii rotate to X.

**ASTRO**: `sticky top-0`, `border-b border-gpc-border`, `bg-gpc-white/95 backdrop-blur-md`, `z-40`. Logo SVG hexagonal + wordmark `GREEN PHEONIX` (Oswald tracking 0.18em). Links mono `text-xs uppercase tracking-widest`. Active = `text-gpc-green`. Mobile panel = full-screen overlay `translate-x-full → 0`, transition 300ms. Adaugă scroll shadow `shadow-sm` la y > 8px.

### Cards (servicii / portofoliu / blog)

**LIVE — sticky stack services** (signature element, pierdut în Astro):
- 3 carduri stacked cu `position: sticky; top: 0..240px` increments — efect „cards se așază peste cardurile precedente la scroll".
- Card 1 `.card-audit` = `background: #111111`, text alb. Card 2 `.card-web` = `background: var(--brand-primary)` (verde), text negru. Card 3 `.card-ads` = `background: var(--accent-red)` (roșu), text alb.
- Fiecare card are `.sticky-poster` rotated 3deg înăuntru — minigafică tipo.
- `box-shadow: 0 -10px 40px rgba(0,0,0,0.5)` între carduri.
- `min-height: 80vh`.

**LIVE — editorial portfolio**:
- Layout split `grid-template-columns: 30% 65%`, sidebar sticky cu titlu „CASE STUDIES" + descriere cu `border-left: 2px solid brand-primary`.
- Feed: carduri 16:9 cu `filter: grayscale(20%)`, hover `transform: scale(1.05) filter: grayscale(0%)`. Title hover → verde. Read-link arrow translate-x-5px → roșu.

**ASTRO — ServiceCard**: `border border-gpc-border bg-gpc-card/30 p-6`, hover `-translate-y-1 border-gpc-green bg-gpc-card/60 shadow-sm`. Număr mare 7xl în colțul dreapta-sus la opacity 5%, devine verde 20% la hover. Tag mono verde, title Oswald 2xl ink → verde la hover. Pe CTA jos: arrow → translate-x-1px.

**ASTRO — CaseStudyCard**: `border border-gpc-border bg-gpc-card/30`, hover `scale-[1.02] border-gpc-green`. Image 16:9 cu opacity 90 → scale 105 la hover. Tag industry badge cu mono uppercase verde. Title + summary + KPI grid 3 cols (value verde Oswald xl + label mono 10px muted).

### Footer

**LIVE — brutalist dark**:
- `background: #050505; color: #fff; padding: 80px 20px 20px`.
- Top: `.footer-giant-text` ca poster typographic 13.5vw.
- Middle: `.footer-nav-row` cu link-uri muted gray → white pe hover.
- Bottom: `.footer-legal-row` cu privacy link, ANPC SAL/SOL logos (35-45px, grayscale → color la hover), social icons SVG 36px rounded circle border `var(--border-color)`, copyright muted.

**ASTRO**: păstrat dark `bg-gpc-footer` (#050505), grid 4 coloane: brand col (logo SVG hexagonal + tagline + social pills 36px squared border `white/20`), Quick Links (3 link-uri mono pe categorie), Legal (links + ANPC SAL/SOL imagini 12 high), Contact (tel WhatsApp). Headere coloane = mono 12px uppercase `tracking-[0.3em] text-gpc-green`. Brand mark final `GREEN PHEONIX®` (PHEONIX verde). Bottom strip `border-t border-white/10`, copyright 11px mono uppercase. **Lipsesc** footerul giant text typographic și hoverul lui pe verde.

### Cookie banner

**LIVE** — există DOUĂ stiluri în CSS (duplicat), final folosit e brutalist:
- v1 (linia 901+): banner sticky-bottom alb light, max-width 920px, `box-shadow: 0 10px 30px rgba(0,0,0,0.08)`.
- v2 (linia 1331+ și 1610+): **modal centrat** pe `cookie-overlay` cu `background: rgba(0,0,0,0.85) backdrop-blur(8px)`, banner dark `#050505 + border 1px brand-primary + box-shadow brand-primary 0.3`. Acesta a fost cel renderat la final = modal blocking. (Problemă raportată anterior.)

**ASTRO**: sticky bottom alb light, `bg-gpc-white border-t border-gpc-border shadow-[0_-8px_24px_rgba(0,0,0,0.08)]`, NU modal. 3 butoane: Accept all (verde solid `bg-gpc-green text-white`), Essential only (outline), Customize (outline gray) + dezvăluie checkboxes „analytics / marketing" cu accent verde. Gate pixel loaders via `gpc:cookie-consent` CustomEvent.

### Butoane — tipuri și stiluri

| Tip | Live HTML | Astro |
|---|---|---|
| **Primary CTA** (`btn-main`) | `bg: accent-red`, padding `16px 40px`, Oswald 1.1rem, uppercase, shadow `0 4px 20px rgba(255,0,51,0.2)`, hover `bg: red-dark + translateY(-2px) + shadow 0 8px 30px`. | `bg-gpc-red px-8 py-4 font-display text-sm uppercase tracking-widest text-white hover:bg-gpc-red-dark` (drop shadow eliminat). |
| **Outline secondary** | `.link-minimal` mono 0.9rem uppercase secondary, hover → primary + letter-spacing 1px. | `border border-gpc-ink px-8 py-4 font-display text-sm uppercase text-gpc-ink hover:bg-gpc-ink hover:text-white` (inversare la hover). |
| **Pill rounded** | `.pill-btn`: `border 1px ink, rounded 50px, padding 10px 25px`, hover fill `bg: ink color: white`. | Folosit doar pe LanguageSwitcher trigger. |
| **Green outline tag-style** | Nefolosit ca buton, doar ca badge eyebrow. | `border border-gpc-green bg-gpc-green/10 px-8 py-4 font-mono text-sm tracking-[0.25em] text-gpc-green hover:bg-gpc-green hover:text-gpc-ink` — pe CTA-urile mid-section (HowWeWork, CTA component). |
| **WhatsApp floater** | `.whatsapp-float`: `60x60px rounded full bg: brand-primary, box-shadow: 0 10px 30px rgba(67,160,71,0.4)`, hover scale 1.1 rotate 10deg. | `fixed bottom-6 right-6 h-14 w-14 rounded-full bg-gpc-green text-white shadow-lg shadow-gpc-green/30 hover:scale-110`. |

### Secțiuni speciale

- **Sticky stack services** (live only): descris mai sus. Astro o înlocuiește cu un grid simplu 3-col ServiceCard.
- **Editorial portfolio** (live only): split 30/65 cu sidebar sticky. Astro folosește grid simplu CaseStudyCard 3-col responsive.
- **Manifesto split** (live only): `.manifesto-wrapper grid 1fr 1fr` cu imagine grayscale stânga + text dreapta. Pe hover imagine `scale(1.1)` în 10s transition. Astro nu are echivalent.
- **FAQ accordion**: `details/summary` native. Live: `[open]` background surface gri, title roșu, icon `+` rotate 45deg → `×` roșu. Astro: similar, dar title verde + icon verde border + grid-rows transition pentru content collapse.
- **Big quote testimonials** (live only): `.big-quote` Oswald 5vw centered, `max-width: 1100px`, author avatar 60px rounded cu border verde. Astro: figure cu quotation marks Oswald 7xl verde poziționate `-top-2 left-6` / `-bottom-8 right-6`, blockquote Oswald 2xl, stars verde, author mono.
- **Process steps** (servicii-ads / web, live): `.process-grid 4 cols`, fiecare step are `border-top: 2px solid muted`, step-1 verde, step-4 roșu, număr `3rem opacity 0.3`. Astro `HowWeWork`: 5 steps cu border și hover „lift", linie orizontală conector cu gradient verde animated cu `glow-pulse` 2.4s.
- **Result impact section** (case study live): `background: brand-primary` (verde), text alb, padding 100px. Astro nu are echivalent.

---

## 5. Interacțiuni & animații

### Animații LIVE

| Animație | Durată | Easing | Element |
|---|---|---|---|
| `pulse-green` | 2s infinite | linear (implicit) | `.pulsing-dot` în hero badge → scale 1 / 0.8 / 1 + opacity 1 / 0.5 / 1 |
| `scan` | 4s ease-in-out infinite | ease-in-out | `.scan-line` traversează `.floating-card` |
| `ticker-move` / `scroll` | 30s linear infinite | linear | marquee tickers |
| `.reveal.active` | 1s | `cubic-bezier(0.165, 0.84, 0.44, 1)` | scroll-in: translateY(40px) → 0 + opacity 0 → 1, prin IntersectionObserver threshold 0.1 |
| `.floating-card` hover | 0.6s | `cubic-bezier(0.25, 0.46, 0.45, 0.94)` | rotate(-3deg) → rotate(0deg) scale(1.02) |
| `.editorial-card` hover image | 0.6s | `cubic-bezier(0.2, 1, 0.3, 1)` | scale(1.05) + grayscale(20%) → 0% |
| `.btn-main` hover | 0.4s | `cubic-bezier(0.165, 0.84, 0.44, 1)` | bg shift + translateY(-2px) + box-shadow expand |
| `.brand-slot` corners | 0.3s | (default ease) | colțuri 15x15 → 100% extindere + border verde → roșu |
| `.mobile-menu-overlay` | 0.4s ease-in-out | ease-in-out | translateY(-100%) → 0 |
| `.cursor-outline` follow | 500ms | `fill: forwards` | Web Animations API `Element.animate()` |
| `.faq-item[open] .faq-icon` | 0.3s | (default) | rotate(0) → rotate(45deg) + color shift roșu |

### Animații ASTRO

| Animație | Durată | Easing | Element |
|---|---|---|---|
| `marquee` keyframe | 30s linear infinite | linear | `.marquee-track` ticker hero |
| `glow-pulse` | 2.4s ease-in-out infinite | ease-in-out | linia connector HowWeWork (oximpia) — nu mai are text-shadow după curățare, doar gradient pulse |
| Hover lift cards (ServiceCard, CaseStudyCard, HowWeWork step) | 300ms | default ease | `-translate-y-1 + border-gpc-green` |
| CaseStudyCard hover scale | 300ms | default ease | `scale-[1.02]` |
| Card image hover scale | 500ms | default ease | `scale-105` |
| Hero badge arrows (CTA) | 200-300ms | default ease | `translate-x-1` la hover |
| FAQ details transition | 300ms ease-out | ease-out | `grid-rows-[0fr] → [1fr]` (smooth height collapse) |
| LanguageSwitcher dropdown | default | default | `invisible/hidden/opacity-0` toggle |
| Navbar scroll shadow | (instant toggle) | — | `shadow-sm` la window.scrollY > 8 |

### Filozofia de motion

- **LIVE**: motion bogat, cu signature elements (cursor follow, scan-line, magnetic, pulse, scroll-reveal-translateY). Un site care „trăiește" vizual.
- **ASTRO**: motion conservator, doar utility hovers. Reveal-on-scroll **lipsește** complet. Site-ul se simte mai static, deși mai stabil performance-wise.

Easing-uri preferate:
- `cubic-bezier(0.165, 0.84, 0.44, 1)` (live): „expo out" — energie inițială rapidă, decelerare elegantă. Folosit pe butoane, pill-btn, .reveal.
- `cubic-bezier(0.25, 0.46, 0.45, 0.94)` (live): „ease-out-cubic" — pentru elemente fizice (floating-card).
- `cubic-bezier(0.2, 1, 0.3, 1)` (live): „cubic-bezier" agresiv în finalul curbei — pentru imagini editorial.
- Astro folosește implicit `transition` Tailwind default (`cubic-bezier(0.4, 0, 0.2, 1)`, 150ms-500ms).

---

## 6. Layout & spațiere

### Container & grid

| Aspect | Live | Astro |
|---|---|---|
| Max container | `--container-width: 1440px` (`var(--container-width)` aplicat pe `.hero-main-layout`, `.portfolio-editorial-wrapper`, `.project-content-grid`). | `max-w-7xl` (1280px) ca default, `max-w-4xl` / `max-w-5xl` pe hero compact / full / CTA. |
| Section padding vertical | `100px-120px` (`.stack-scroll-wrapper`, `.inline-clients-wrapper`, `.faq-section`, `.newsletter-section`, `.testimonials-section`). | `py-20` (80px) majoritar, `py-24 lg:py-32` (96-128px) pe hero. |
| Section padding horizontal | `20px` mobil / `40px` desktop. | `px-6` (24px) mobil-first. |
| Border separare secțiuni | `border-bottom: 1px solid var(--border-color)` aproape pe toate. Linie subțire constantă. | `border-t border-gpc-border` / `border-y border-gpc-border` similar. |

### Filozofia de spațiere

- **Aerisit**, nu dens. Padding-uri 60-80px între blocuri.
- Hero pe live HTML are `min-height: 100vh` — ocupă fereastra completă. Astro a redus la `py-20` simplu (height auto), pierde efectul „first impression full-screen".
- Spațiu alb (negative space) abundent ca element compozițional — verde și roșu sunt mici insule.
- Asimetria editorial — `.line-2 { margin-left: 40px }` pe hero h1 (live), `.portfolio-editorial-wrapper grid-template-columns: 30% 65%` (asimetric), `.contact-wrapper grid-template-columns: 1fr 1.5fr`.

### Borders, separatoare, linii

- **Toate** secțiunile sunt separate prin `1px solid var(--border-color)` (#E0E0E0) — un grid invizibil structural.
- Carduri folosesc același 1px border ca regulă.
- Excepție de la „1px ușor": `.brand-slot` 2px verde, `.process-step` 2px top color-coded.
- `border-radius` aproape niciodată. Excepții: `.pill-btn` 50px (rounded full), `.author-avatar` 50% (rounded full), `.social-link` 50% (rounded full), `.whatsapp-float` 50%, `.cursor-dot/outline` 50%, `.process-step border-top 2px`. **Restul = squared corners brutalist**.

### Scrollbar custom

**LIVE only**:
```css
::-webkit-scrollbar { width: 8px; }
::-webkit-scrollbar-track { background: var(--bg-main); }
::-webkit-scrollbar-thumb { background: var(--border-color); }
::-webkit-scrollbar-thumb:hover { background: var(--brand-primary); }
```

Subtle — alb fundal, gri thumb, verde la hover. Astro nu a portat.

---

## 7. „Tonul" vizual — în 3-5 propoziții

Green Pheonix arată ca o **agenție de marketing technică din 2026**, nu un creative studio. Estetic: **Swiss minimalism × brutalism digital × terminal / dev tools**. Headerele uppercase Oswald cu line-height 0.85 vin direct din afișele tipografice Müller-Brockmann și Massimo Vignelli; mono badge-urile cu coordonate GPS, version tags și `///` separators citează interfețele Linux/Apple Developer și aesthetic-ul boutique de tipul Linear / Vercel / Stripe Press; touch-urile roșii pe CTA (#FF0033) și verde brand (#43A047) împrumută codul tehnic „status indicators" din dashboard-uri reale. **E memorabil prin contrastul dintre liniștea aproape obsesivă a layout-ului Swiss (alb pur, 1px borders, geometrie strictă) și momentele de personalitate (cursor custom, scan-line, magnetic buttons, footer typographic 13.5vw, brand-slot animat cu colțuri)** — un site care promite că „nu inventăm cifre, dar avem grijă de fiecare pixel".

Referințe vizuale apropiate:
- **Linear.app** (mono micro-typography, dark accents pe light, restraint).
- **Vercel.com** (geometric border-only cards, mono badges, restraint).
- **Stripe Press** (Swiss editorial split layouts).
- **Pentagram / SVA-style brutalism digital** (footer typographic giant, uppercase strict).
- **Awwwards-style dev tools** (custom cursor, scan-line, terminal aesthetic).

---

## 8. Ce s-a pierdut în migrarea Astro

Inventar al elementelor de personalitate din versiunea HTML live care **NU** sunt prezente în versiunea Astro actuală pe `refactor/astro-prep`.

### Elemente lipsă critice (signature)

| # | Element | Severitate | Detalii |
|---|---|---|---|
| 1 | **Custom cursor** (dot + outline cu hover-state inversare red↔green) | Mare | `cursor: none` global + JS `setupCursor()` + `body.hovering` class. Nu mai există nici componenta, nici CSS-ul. Pierdere semnificativă de „signature interaction". |
| 2 | **Reveal animations on scroll** (translateY 40px → 0, opacity 0 → 1, cubic-bezier expo) | Mare | `.reveal` class + IntersectionObserver în main.js. Astro nu are echivalent — secțiunile pop instant. |
| 3 | **Sticky stack services** (3 carduri color-coded dark/green/red stacked cu sticky-position) | Mare | Înlocuit cu grid 3-col ServiceCard simplu. Pierde efectul „scrollytelling" semnătură. |
| 4 | **Floating card hero** (350x480 rotat -3deg, hover rotate(0) scale(1.02), grayscale → color, scan-line verde 4s) | Mare | Eliminat complet (intenționat, conținea cifre fabricate). Spațiul a rămas gol, hero-ul e single-column acum. |
| 5 | **Editorial portfolio** (split 30/65, sidebar sticky cu border-left verde, grayscale → color hover, scale 1.05) | Medie | Înlocuit cu CaseStudyCard în grid 3-col. Pierde diferențierea „press / journalism feel". |
| 6 | **Footer giant text 13.5vw** (Oswald 700, hover verde) | Medie | Footer Astro are doar wordmark normal Oswald 16px. Pierde gestul typographic-poster. |
| 7 | **`.text-outline`** (`-webkit-text-stroke: 1px`, color transparent) — folosit pe „STUDIES", „WORKS", „VÂND" în titluri | Medie | Astro a tradus în text colorat simplu sau verde solid. Pierde tratamentul „decupat / logo". |
| 8 | **Brand-slot animație** (colțuri 15x15 verzi → extindere 100% roșu pe hover) pe „NOI CONSTRUIM SISTEME PENTRU [BRANDURI]" | Medie | Conținutul de social proof inline lipsește complet în Astro. |
| 9 | **„GP" watermark giant** în FAQ section (`30vw`, opacity 0.03) | Mică | Astro FAQ section e curat dar fără semnătură spațială. |
| 10 | **Manifesto split section** (img grayscale stânga + text dreapta + img zoom 10s la hover) | Mică | Inexistent în Astro. |
| 11 | **Magnetic buttons** (CSS pregătit, JS de implementat) | Mică | CSS-ul de bază era acolo, JS-ul nu mai era nici în live. Astro nu a portat ideea. |
| 12 | **Pulsing dot verde** (`pulse-green` animation 2s) pe badge `ONLINE SYSTEM` | Mică | În Astro e doar un border + caracter `◉` Unicode static. |
| 13 | **Noise overlay SVG** (`feTurbulence` la opacity 0.03 peste tot) | Mică | Element subtil dar definitoriu — Astro e perfect curat fără film grain. |
| 14 | **Newsletter marquee strip verde** (`.marquee-wrapper` brand-primary background, text negru bold) | Mică | Există un marquee, dar nu cu strip-ul verde brutalist secundar. |
| 15 | **Footer giant hover → verde** | Mică | Nici elementul, nici interacțiunea. |
| 16 | **Scrollbar custom** (8px, thumb gri → verde la hover) | Mică | Astro folosește scrollbar default browser. |
| 17 | **`box-shadow: 15px 15px 0px rgba(67,160,71,0.2)`** pe cookie banner brutalist (offset hard shadow) | Mică | Astro folosește drop-shadow neutru subtle. |
| 18 | **Big quote testimonials** (5vw centered, avatar 60px round verde) | Mică | Astro `Testimonial.astro` folosește o cartelă figure cu quotes 7xl pozițional — diferit feel, mai conservator. |

### Elemente bine portate sau îmbunătățite în Astro

| # | Element | Notă |
|---|---|---|
| ✓ | **Paleta de culori** | Identică, doar redenumită `phoenix-*` → `gpc-*`. |
| ✓ | **Fonturi** | Identice (Oswald + Space Grotesk + Space Mono) după refactor. |
| ✓ | **Marquee ticker hero** | Funcțional, 30s linear infinite. |
| ✓ | **Badge row eyebrow** (ONLINE SYSTEM / LOC / VER) | Portat, doar fără pulsing-dot animat. |
| ✓ | **FAQ accordion** | Better — `details` native cu `grid-rows` transition smooth. |
| ✓ | **HowWeWork steps cu connector line gradient pulse** | Element nou Astro, nu există în live — o adăugare bună. |
| ✓ | **CTA component cu repeating-linear-gradient animat** | Nou în Astro, fundal subtle diagonal stripes. |
| ✓ | **i18n routing** (RO/EN/IT cu hreflang + path-aware switcher) | Astro mult mai bun decât JS-based translation în live. |
| ✓ | **Schema markup** (LocalBusiness + FAQPage JSON-LD dinamic) | Astro mai bun, central în BaseLayout. |
| ✓ | **Cookie consent gating** | Astro folosește CustomEvent `gpc:cookie-consent` — pattern mai modern decât localStorage poll. |
| ✓ | **Footer dark păstrat** | Conscious decision, identic ca paletă cu live `.footer-brutalist`. |

### Recomandări de prioritizare pentru repunerea identității în Astro

**P0 — Trebuie repuse pentru a păstra brandul:**
1. Reveal animations on scroll (IntersectionObserver + `.reveal` class CSS cu cubic-bezier expo).
2. Sticky stack services 3-color cards (sau alternativă scrollytelling care diferențiază secțiunea servicii).
3. `.text-outline` utility class (`-webkit-text-stroke`) — element typographic semnătură.
4. Footer giant text typographic (Oswald 13.5vw cu hover verde).

**P1 — Adaugă caracter, low effort:**
5. Custom cursor (CSS + JS ~50 LOC, gate pe `pointer: fine`).
6. Editorial portfolio layout (split asimetric 30/65 cu sidebar sticky).
7. Pulsing-dot pe ONLINE SYSTEM badge.
8. Brand-slot animație colțuri.

**P2 — Nice to have:**
9. Noise overlay SVG.
10. Manifesto split section.
11. Newsletter marquee strip verde.
12. Magnetic buttons (necesită JS).
13. Scrollbar custom.

---

*Document generat din `refactor/astro-prep` la stadiul commit `9d18ff9`.*
