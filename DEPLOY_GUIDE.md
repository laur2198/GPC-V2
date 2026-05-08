# Deploy Green Phoenix pe Namecheap cPanel

Build static din `astro/` → upload în `public_html/` pe cPanel. Nu există Node runtime pe shared hosting; tot ce ajunge online este HTML/CSS/JS pre-renderat.

## 0. Pregătire (o singură dată)

- Asigură-te că ai acces la cPanel: <https://cpanel.namecheap.com>
- Activează SSL pe domeniu (cPanel → SSL/TLS Status → AutoSSL)
- Confirmă că `public_html/` este document root pentru `greenpheonixconcept.com`
- Înainte de orice deploy real, înlocuiește placeholderele:
  - `[FORM_ID_PLACEHOLDER]` în cele 3 pagini de contact (RO/EN/IT) cu ID-ul Formspree real
  - În `astro/src/layouts/BaseLayout.astro`, secțiunea de analytics (GA4 / Meta Pixel / Clarity) este comentată cu `{/* ... */}`. Înlocuiește `G-XXXXXXXXXX`, `XXXXXXXXXXXXXXXX`, `cccccccccc` cu ID-urile reale, apoi *uncomment* (șterge `{/*` și `*/}` din jurul blocului).

## 1. Build local

```bash
cd astro
npm install            # doar prima dată sau după update-uri
npm run build
```

Output: `astro/dist/` cu HTML pre-renderat, CSS/JS hash-uite în `_astro/`, imagini și `.htaccess`.

Verifică local înainte de upload:

```bash
npm run preview        # http://localhost:4321
```

Click pe paginile principale + RO/EN/IT, verifică că `/multumim`, `/404`, `/sitemap-index.xml` și `/rss.xml` răspund.

## 2. Backup site existent

În **cPanel → File Manager → public_html/**:

1. Selectează tot conținutul curent (`Ctrl+A` în File Manager)
2. *Compress* → format `.zip` → numește-l `backup_YYYY-MM-DD.zip`
3. *Download* zip-ul local și păstrează-l minim 30 de zile

Dacă ai și `cpanel.cgi` sau alte fișiere generate de cPanel, lasă-le pe loc — nu le șterge.

## 3. Curăță public_html/

În File Manager, șterge toate fișierele și folderele site-ului vechi din `public_html/`. **PĂSTREAZĂ**:

- `cgi-bin/` (dacă există)
- orice fișier generat de cPanel (de obicei începe cu `.cpanel` sau `.well-known/`)

## 4. Upload conținut nou

Local:

```bash
cd astro/dist
zip -r ../../dist.zip .   # comprimă conținutul, nu folderul în sine
```

În cPanel File Manager:

1. Navighează în `public_html/`
2. *Upload* → selectează `dist.zip`
3. După upload: click dreapta pe zip → *Extract* → confirmă
4. Șterge `dist.zip` rămas în `public_html/`

Dacă File Manager extrage într-un sub-folder `dist/`, mută conținutul în `public_html/` și șterge `dist/` gol.

## 5. Verifică `.htaccess`

`public_html/.htaccess` trebuie să existe (vine din `astro/public/.htaccess` la build). Dacă File Manager ascunde dotfile-urile: *Settings* → bifează "Show Hidden Files (dotfiles)".

Conținutul forțează HTTPS, redirectă `www.` → bare domain, redirectează URL-urile vechi `.html` și setează cache headers + security headers.

## 6. Smoke-test

Deschide pe rând și confirmă răspuns 200 + SSL activ:

- `https://greenpheonixconcept.com` (homepage RO)
- `https://greenpheonixconcept.com/en/`
- `https://greenpheonixconcept.com/it/`
- `https://greenpheonixconcept.com/servicii-ads`
- `https://greenpheonixconcept.com/servicii-web`
- `https://greenpheonixconcept.com/portofoliu`
- `https://greenpheonixconcept.com/blog`
- `https://greenpheonixconcept.com/contact`
- `https://greenpheonixconcept.com/politica`
- `https://greenpheonixconcept.com/sitemap-index.xml`
- `https://greenpheonixconcept.com/rss.xml`
- `https://greenpheonixconcept.com/404` (sau orice URL inexistent — trebuie să cadă pe 404.html cu styling complet)

Test redirecturi vechi:

- `https://greenpheonixconcept.com/index.html` → trebuie 301 către `/`
- `https://greenpheonixconcept.com/servicii-ads.html` → 301 către `/servicii-ads`

Test cookie banner: deschide site într-o fereastră incognito → bannerul trebuie să apară. Acceptă → setează `gpc_cookie_consent` în localStorage și ascunde bannerul. Reload → bannerul nu reapare.

## 7. Search Console + indexare

În <https://search.google.com/search-console>:

1. Selectează property-ul `greenpheonixconcept.com`
2. *Sitemaps* → adaugă `https://greenpheonixconcept.com/sitemap-index.xml`
3. *URL Inspection* pe homepage → *Request indexing*
4. Repetă pentru `/en/` și `/it/`

În Bing Webmaster Tools, repetă pașii 1-3.

## Rollback

Dacă smoke-testul eșuează:

1. **cPanel File Manager → public_html/**
2. Selectează tot și *Delete* (sau mută într-un folder `_failed/`)
3. *Upload* `backup_YYYY-MM-DD.zip` și *Extract*
4. Site vechi restaurat

Dacă doar `.htaccess` cauzează probleme (ex. 500 error), redenumește-l temporar `_htaccess` și reîncarcă pagina — Apache va folosi defaults și veți vedea pagina static.

## Update-uri ulterioare

După prima publicare, deploy nou înseamnă:

1. `cd astro && npm run build`
2. Compresează `dist/` și upload în `public_html/`
3. Confirmă suprascrierea fișierelor; fișierele orfane (de la build-ul anterior) trebuie șterse manual

Pentru deploy automat ulterior, considerăm migrare la Vercel sau Netlify.
