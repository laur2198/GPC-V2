// Legal documents — Romanian master. EN/IT mirror this structure.
// NOTE: professional GDPR-aligned templates, not a lawyer's legal advice.

export interface LegalBlock {
  type: 'p' | 'ul' | 'ol' | 'h3' | 'table';
  html?: string;
  text?: string;
  items?: string[];
  head?: string[];
  rows?: string[][];
}
export interface LegalSection {
  heading: string;
  blocks: LegalBlock[];
}
export interface LegalDocData {
  slug: string;
  metaTitle: string;
  metaDescription: string;
  title: string;
  subtitle: string;
  lastUpdated: string;
  disclaimer: string;
  breadcrumb: string;
  sections: LegalSection[];
}

const COMPANY =
  'GREEN PHEONIX CONCEPT S.R.L., CUI 45667331 (TVA RO45667331), Nr. Reg. Com. J2022000195397, sediu Str. Principală Nr. 174, Gura Calitei, Vrancea, 627160, România';
const DISCLAIMER =
  'ACEASTĂ POLITICĂ ESTE UN DOCUMENT INFORMATIV BAZAT PE TEMPLATE-URI PROFESIONALE GDPR-CONFORME. Nu constituie consultanță juridică. Pentru situații specifice sau contracte complexe, recomandăm consultarea unui avocat. Green Pheonix Concept SRL își rezervă dreptul de a actualiza această politică conform evoluției legislației.';

export const privacy: LegalDocData = {
  slug: 'politica-confidentialitate',
  metaTitle: 'Politica de Confidențialitate — Green Pheonix Concept',
  metaDescription:
    'Politica de confidențialitate Green Pheonix Concept SRL: ce date colectăm, temei legal, destinatari, transferuri, retenție și drepturile tale GDPR.',
  title: 'Politica de Confidențialitate',
  subtitle:
    'Cum colectăm, folosim și protejăm datele tale, conform Regulamentului (UE) 2016/679 (GDPR).',
  lastUpdated: '2026-06-02',
  disclaimer: DISCLAIMER,
  breadcrumb: 'Politica de Confidențialitate',
  sections: [
    {
      heading: '1. Introducere',
      blocks: [
        { type: 'p', html: `Operatorul datelor cu caracter personal colectate prin acest site este <strong>${COMPANY}</strong>.` },
        { type: 'p', html: 'Această politică se aplică tuturor datelor prelucrate prin intermediul site-ului greenpheonixconcept.com, al formularelor de contact și al comunicărilor ulterioare cu noi.' },
      ],
    },
    {
      heading: '2. Persoana de contact pentru protecția datelor',
      blocks: [
        { type: 'p', html: 'Persoana responsabilă pentru protecția datelor: <a href="mailto:contact@greenpheonixconcept.com">contact@greenpheonixconcept.com</a>.' },
        { type: 'p', html: 'Pentru orice chestiune privind datele tale personale, ne poți contacta prin email sau telefon (+40 793 650 902).' },
      ],
    },
    {
      heading: '3. Ce date colectăm',
      blocks: [
        { type: 'h3', text: 'A. Date furnizate direct (formular de contact)' },
        { type: 'ul', items: [
          'Nume, email, telefon, conținutul mesajului, tip business, buget estimat și serviciile de interes.',
          'Temei legal: Art. 6(1)(b) GDPR — pași precontractuali / executarea contractului, și Art. 6(1)(f) — interes legitim.',
        ] },
        { type: 'h3', text: 'B. Date colectate automat' },
        { type: 'ul', items: [
          'Date tehnice (adresă IP, browser, sistem de operare, dispozitiv) — pentru analytics și securitate.',
          'Comportament (pagini vizitate, durată, scroll, click) — prin Microsoft Clarity (heatmaps).',
          'Marketing (tracking pentru retargeting) — prin Meta Pixel și TikTok Pixel.',
          'Temei legal: Art. 6(1)(a) GDPR — consimțământ explicit prin banner-ul de cookies.',
        ] },
      ],
    },
    {
      heading: '4. Scopul prelucrării',
      blocks: [
        { type: 'ul', items: [
          'Răspuns la solicitări și ofertarea serviciilor (contract / pași precontractuali).',
          'Îmbunătățirea site-ului prin analytics anonimizate.',
          'Marketing personalizat prin pixeli — <strong>doar cu consimțământ</strong>.',
          'Conformarea cu obligațiile legale (facturare, fiscalitate).',
        ] },
      ],
    },
    {
      heading: '5. Destinatari (împuterniciți)',
      blocks: [
        { type: 'p', html: 'Nu vindem datele tale. Ele pot fi prelucrate, cu obligații stricte de confidențialitate, de către:' },
        { type: 'ul', items: [
          'Formspree Inc. (SUA) — <a href="https://formspree.io/legal/privacy-policy/" target="_blank" rel="noopener">privacy policy</a> — trimiterea formularelor.',
          'Google LLC (SUA) — <a href="https://policies.google.com/privacy" target="_blank" rel="noopener">privacy policy</a> — Analytics GA4 și Google Fonts.',
          'Microsoft Corp. (SUA) — <a href="https://privacy.microsoft.com/privacystatement" target="_blank" rel="noopener">privacy statement</a> — Clarity heatmaps.',
          'Meta Platforms Inc. (SUA) — <a href="https://www.facebook.com/privacy/policy/" target="_blank" rel="noopener">privacy policy</a> — Facebook/Instagram Pixel.',
          'TikTok Pte. Ltd. (Singapore) — <a href="https://www.tiktok.com/legal/privacy-policy-eea" target="_blank" rel="noopener">privacy policy</a> — TikTok Pixel.',
          'Furnizorul de hosting (confirmat la deploy) — livrarea site-ului.',
          'ANAF și autorități, în limita obligațiilor legale.',
        ] },
      ],
    },
    {
      heading: '6. Transfer în afara SEE/UE',
      blocks: [
        { type: 'p', html: 'Formspree, Google, Microsoft și Meta pot prelucra date în SUA; TikTok în Singapore. Garanțiile aplicate: <strong>Clauze Contractuale Standard (SCC)</strong> și, unde e cazul, <strong>EU-US Data Privacy Framework (DPF)</strong>.' },
      ],
    },
    {
      heading: '7. Perioade de retenție',
      blocks: [
        { type: 'table', head: ['Categorie', 'Retenție'], rows: [
          ['Mesaje contact (Formspree)', '24 luni de la primire'],
          ['Analytics GA4', '14 luni (apoi anonimizat)'],
          ['Heatmaps Clarity', '90 zile'],
          ['Cookies marketing (Meta, TikTok)', '90 zile'],
          ['Date facturare', '10 ani (obligație fiscală)'],
          ['Comunicări email', 'Durata relației + 3 ani'],
        ] },
      ],
    },
    {
      heading: '8. Drepturile tale (Art. 15-22 GDPR)',
      blocks: [
        { type: 'ul', items: [
          'Dreptul de acces (Art. 15).',
          'Rectificare (Art. 16).',
          'Ștergere / „dreptul de a fi uitat” (Art. 17).',
          'Restricționarea prelucrării (Art. 18).',
          'Portabilitatea datelor (Art. 20).',
          'Opoziție la prelucrare (Art. 21).',
          'Retragerea consimțământului oricând, fără a afecta prelucrarea anterioară.',
          'Reclamație la <a href="https://www.dataprotection.ro" target="_blank" rel="noopener">ANSPDCP</a>.',
        ] },
        { type: 'p', html: 'Cum exerciți: trimite un email la <a href="mailto:contact@greenpheonixconcept.com">contact@greenpheonixconcept.com</a> cu subiectul „Cerere GDPR — [tipul cererii]”. Răspundem în 30 de zile.' },
      ],
    },
    {
      heading: '9. Cookies',
      blocks: [
        { type: 'p', html: 'Pentru detalii complete despre cookies, vezi <a href="/politica-cookies">Politica de Cookies</a>.' },
      ],
    },
    {
      heading: '10. Securitatea datelor',
      blocks: [
        { type: 'ul', items: [
          'HTTPS (SSL) pe tot site-ul.',
          'Acces limitat la date (doar Laurențiu Bogdan).',
          'Procesatori certificați (ISO 27001 sau SOC 2).',
          'Notificarea incidentelor în 72h, conform Art. 33 GDPR.',
        ] },
      ],
    },
    {
      heading: '11. Minori',
      blocks: [
        { type: 'p', html: 'Site-ul nu se adresează persoanelor sub 16 ani și nu colectăm intenționat date de la minori. Dacă afli că un minor ne-a furnizat date, contactează-ne pentru ștergere.' },
      ],
    },
    {
      heading: '12. Modificări ale politicii',
      blocks: [
        { type: 'p', html: 'Actualizările sunt notificate prin email celor afectați sau printr-o notă pe site. Versiunea curentă este marcată cu data ultimei actualizări, în partea de sus.' },
      ],
    },
    {
      heading: '13. Jurisdicție și lege aplicabilă',
      blocks: [
        { type: 'ul', items: [
          'Lege aplicabilă: legea română.',
          'Pentru consumatorii din UE prevalează legea lor națională pentru chestiuni imperative.',
          'Instanțe competente: B2B — Brașov; B2C — instanța rezidenței consumatorului.',
        ] },
      ],
    },
    {
      heading: '14. Contact',
      blocks: [
        { type: 'ul', items: [
          'Email: <a href="mailto:contact@greenpheonixconcept.com">contact@greenpheonixconcept.com</a>',
          'Telefon: +40 793 650 902',
          'Adresă: Str. Principală Nr. 174, Gura Calitei, Vrancea, 627160',
        ] },
      ],
    },
  ],
};

export const terms: LegalDocData = {
  slug: 'termeni-conditii',
  metaTitle: 'Termeni și Condiții — Green Pheonix Concept',
  metaDescription:
    'Termenii și condițiile de utilizare a site-ului și serviciilor Green Pheonix Concept SRL: contractare, prețuri, proprietate intelectuală, răspundere, litigii.',
  title: 'Termeni și Condiții',
  subtitle: 'Condițiile de utilizare a site-ului și a serviciilor Green Pheonix Concept.',
  lastUpdated: '2026-06-02',
  disclaimer: DISCLAIMER,
  breadcrumb: 'Termeni și Condiții',
  sections: [
    {
      heading: '1. Introducere',
      blocks: [
        { type: 'p', html: `Prestator: <strong>${COMPANY}</strong>.` },
        { type: 'p', html: 'Acești termeni se aplică utilizării site-ului și serviciilor contractate. Acceptarea este implicită prin folosirea site-ului sau explicită prin semnarea unui contract.' },
      ],
    },
    {
      heading: '2. Serviciile oferite',
      blocks: [
        { type: 'ul', items: [
          'Performance marketing (Meta Ads, Google Ads, TikTok Ads).',
          'Strategie & Audit marketing.',
          'Dezvoltare web (websites, landing pages, plugin-uri).',
          'Producție conținut (social media, fotografie, video).',
          'Detaliile specifice se stabilesc în fiecare contract individual.',
        ] },
      ],
    },
    {
      heading: '3. Contractul de servicii',
      blocks: [
        { type: 'p', html: 'Formularul de contact <strong>nu</strong> constituie contract. Contractul se încheie după:' },
        { type: 'ol', items: [
          'Audit gratuit / discuție inițială.',
          'Ofertă scrisă.',
          'Acceptarea clientului (semnătură + plată avans).',
        ] },
        { type: 'p', html: 'Specificațiile, termenele și livrabilele sunt definite în contractul individual.' },
      ],
    },
    {
      heading: '4. Prețuri și plată',
      blocks: [
        { type: 'ul', items: [
          'Prețurile sunt în RON sau EUR (la cerere); TVA inclus/exclus se precizează în fiecare ofertă.',
          'Plată: avans 50% la semnătură + 50% la livrare (sau lunar pentru retainer).',
          'Întârziere la plată: penalități 0,1%/zi (max. 50% din suma datorată).',
          'Serviciile pot fi suspendate în caz de neplată.',
        ] },
      ],
    },
    {
      heading: '5. Proprietate intelectuală',
      blocks: [
        { type: 'ul', items: [
          'Materialele livrate (design, copy, cod) devin proprietatea clientului după plata integrală.',
          'Conceptele, metodologiile și know-how-ul rămân proprietatea Green Pheonix Concept.',
          'Ne rezervăm dreptul de a folosi rezultatele în portofoliu / case studies, cu acordul clientului.',
        ] },
      ],
    },
    {
      heading: '6. Confidențialitate',
      blocks: [
        { type: 'p', html: 'Datele clientului sunt confidențiale (NDA implicit) și nu sunt divulgate către terți fără consimțământ, cu excepția obligațiilor legale, auditului sau disputelor legale.' },
      ],
    },
    {
      heading: '7. Răspundere',
      blocks: [
        { type: 'p', html: 'Răspunderea este limitată la valoarea contractului. <strong>Nu răspundem</strong> pentru:' },
        { type: 'ul', items: [
          'Performanța algoritmilor terți (Meta, Google modifică regulile).',
          'Deciziile editoriale ale platformelor (banuri, restricții pe reclame).',
          'Forță majoră (pandemii, război, atacuri cibernetice).',
        ] },
        { type: 'p', html: 'Răspundem pentru: erori tehnice proprii, întârzieri proprii, încălcări contractuale dovedite.' },
      ],
    },
    {
      heading: '8. Dreptul de retragere (B2C)',
      blocks: [
        { type: 'ul', items: [
          'Pentru consumatori: 14 zile drept de retragere, conform Directivei 2011/83/UE.',
          'Dacă execuția începe imediat la cererea consumatorului (audit, strategie), dreptul de retragere se pierde proporțional cu serviciul prestat (Art. 16(a)).',
          'Pentru B2B: dreptul de retragere nu se aplică.',
        ] },
      ],
    },
    {
      heading: '9. Soluționarea litigiilor',
      blocks: [
        { type: 'ul', items: [
          'Negociere amiabilă (30 zile), apoi mediere (opțional).',
          'B2B: instanțele din Brașov. B2C: instanța rezidenței consumatorului.',
          'ADR UE: <a href="https://ec.europa.eu/consumers/odr/" target="_blank" rel="noopener">ec.europa.eu/consumers/odr</a>.',
          'ANPC: <a href="https://anpc.ro" target="_blank" rel="noopener">anpc.ro</a>. SAL: <a href="https://www.salro.ro" target="_blank" rel="noopener">salro.ro</a>.',
        ] },
      ],
    },
    {
      heading: '10. Durată și încetare',
      blocks: [
        { type: 'ul', items: [
          'Contractul individual: durata specificată în contract.',
          'Reziliere: notificare scrisă cu 30 de zile înainte.',
          'Reziliere imediată: neplată > 30 zile sau încălcare gravă.',
        ] },
      ],
    },
    {
      heading: '11. Modificări ale termenilor',
      blocks: [
        { type: 'ul', items: [
          'Actualizările sunt notificate prin email cu 30 de zile înainte.',
          'Continuarea utilizării site-ului/serviciilor = acceptarea modificărilor.',
          'Contractele semnate nu se modifică retroactiv.',
        ] },
      ],
    },
    {
      heading: '12. Limbă prevalentă',
      blocks: [
        { type: 'p', html: 'Versiunea în limba română prevalează în caz de discrepanță între traduceri. Acești termeni nu restrâng drepturile imperative ale consumatorului din UE conform legii sale naționale.' },
      ],
    },
    {
      heading: '13. Lege aplicabilă',
      blocks: [
        { type: 'p', html: 'Legea română. Pentru consumatorii din UE, legea lor națională prevalează pentru chestiunile de protecție imperativă.' },
      ],
    },
  ],
};

export const cookies: LegalDocData = {
  slug: 'politica-cookies',
  metaTitle: 'Politica de Cookies — Green Pheonix Concept',
  metaDescription:
    'Ce cookies folosim pe greenpheonixconcept.com: necesare, analitice (GA4, Clarity) și marketing (Meta, TikTok), durată, temei legal și cum le gestionezi.',
  title: 'Politica de Cookies',
  subtitle: 'Ce cookies folosim, de ce, și cum le poți controla.',
  lastUpdated: '2026-06-02',
  disclaimer: DISCLAIMER,
  breadcrumb: 'Politica de Cookies',
  sections: [
    {
      heading: '1. Ce sunt cookies?',
      blocks: [
        { type: 'p', html: 'Cookies sunt fișiere text mici stocate de browser-ul tău când vizitezi un site. Ele permit funcționarea site-ului, memorarea preferințelor și, cu acordul tău, măsurători și marketing.' },
      ],
    },
    {
      heading: '2. Ce cookies folosim',
      blocks: [
        { type: 'h3', text: 'A. Cookies necesare (mereu active)' },
        { type: 'ul', items: [
          'Cookie de preferință limbă (ro/en/it).',
          'Cookie de consimțământ (gpc_cookie_consent).',
          'Token-uri de securitate pentru formulare.',
        ] },
        { type: 'p', html: 'Durată: sesiune sau până la 12 luni. Temei: Art. 6(1)(f) GDPR — interes legitim (funcționarea site-ului).' },
        { type: 'h3', text: 'B. Cookies analitice (consimțământ obligatoriu)' },
        { type: 'table', head: ['Serviciu', 'Cookies', 'Durată', 'Date trimise'], rows: [
          ['Google Analytics 4', '_ga, _ga_*, _gid', 'până la 14 luni', 'SUA (SCC + DPF)'],
          ['Microsoft Clarity', '_clck, _clsk, MUID', '90 zile', 'SUA'],
        ] },
        { type: 'p', html: 'Opt-out GA4: <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener">browser add-on</a>.' },
        { type: 'h3', text: 'C. Cookies de marketing (consimțământ obligatoriu)' },
        { type: 'table', head: ['Serviciu', 'Cookies', 'Durată', 'Date trimise'], rows: [
          ['Meta Pixel', '_fbp, fr', '90 zile', 'SUA (SCC + DPF)'],
          ['TikTok Pixel', '_ttp', '90 zile', 'Singapore (SCC)'],
        ] },
        { type: 'p', html: 'Opt-out: <a href="https://www.facebook.com/help/568137493302217" target="_blank" rel="noopener">Meta</a> · <a href="https://www.tiktok.com/legal/privacy-policy-eea" target="_blank" rel="noopener">TikTok</a>.' },
      ],
    },
    {
      heading: '3. Cum gestionezi cookies',
      blocks: [
        { type: 'ul', items: [
          'Banner-ul de consimțământ la prima vizită (granular).',
          'Butonul „Setări cookies” din footer redeschide banner-ul.',
          'Setările browser-ului — blocarea cookies third-party.',
          'Plugin-uri de opt-out specifice (link-uri în secțiunea 2).',
        ] },
      ],
    },
    {
      heading: '4. Consecințele refuzului',
      blocks: [
        { type: 'ul', items: [
          'Cookies necesare: site-ul funcționează normal.',
          'Refuz analitice: site-ul funcționează, dar nu putem măsura îmbunătățiri.',
          'Refuz marketing: nu vezi reclame personalizate; reclame generice pot apărea pe alte site-uri.',
        ] },
      ],
    },
    {
      heading: '5. Modificări ale politicii',
      blocks: [
        { type: 'p', html: 'Actualizările sunt notificate prin redeschiderea banner-ului de consimțământ.' },
      ],
    },
    {
      heading: '6. Contact',
      blocks: [
        { type: 'p', html: 'Întrebări? <a href="mailto:contact@greenpheonixconcept.com">contact@greenpheonixconcept.com</a>.' },
      ],
    },
  ],
};

export const legalDocs = { privacy, terms, cookies };
export default legalDocs;
