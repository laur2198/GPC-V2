// Legal documents — Italian. Mirrors the structure of legal.ro.ts.
// NOTE: professional GDPR-aligned templates, not a lawyer's legal advice.

import type { LegalDocData } from './legal.ro';

const COMPANY =
  'GREEN PHEONIX CONCEPT S.R.L., CUI 45667331 (P.IVA RO45667331), Reg. Imprese J2022000195397, sede Str. Principală Nr. 174, Gura Calitei, Vrancea, 627160, Romania';
const DISCLAIMER =
  '⚠️ QUESTA POLITICA È UN DOCUMENTO INFORMATIVO BASATO SU TEMPLATE PROFESSIONALI GDPR-CONFORMI. Non costituisce consulenza legale. Per situazioni specifiche o contratti complessi, consigliamo la consultazione di un avvocato. Green Pheonix Concept SRL si riserva il diritto di aggiornare questa politica in linea con l\'evoluzione normativa.';

export const privacy: LegalDocData = {
  slug: 'informativa-privacy',
  metaTitle: 'Informativa sulla Privacy — Green Pheonix Concept',
  metaDescription:
    'Informativa sulla privacy di Green Pheonix Concept SRL: quali dati raccogliamo, base giuridica, destinatari, trasferimenti, conservazione e i tuoi diritti GDPR.',
  title: 'Informativa sulla Privacy',
  subtitle:
    'Come raccogliamo, utilizziamo e proteggiamo i tuoi dati, ai sensi del Regolamento (UE) 2016/679 (GDPR).',
  lastUpdated: '2026-06-02',
  disclaimer: DISCLAIMER,
  breadcrumb: 'Informativa sulla Privacy',
  sections: [
    {
      heading: '1. Introduzione',
      blocks: [
        { type: 'p', html: `Il titolare del trattamento dei dati personali raccolti tramite questo sito è <strong>${COMPANY}</strong>.` },
        { type: 'p', html: 'La presente politica si applica a tutti i dati trattati tramite il sito greenpheonixconcept.com, i moduli di contatto e le successive comunicazioni con noi.' },
      ],
    },
    {
      heading: '2. Referente per la protezione dei dati',
      blocks: [
        { type: 'p', html: 'Referente responsabile per la protezione dei dati: <a href="mailto:contact@greenpheonixconcept.com">contact@greenpheonixconcept.com</a>.' },
        { type: 'p', html: 'Per qualsiasi questione relativa ai tuoi dati personali, puoi contattarci via email o telefono (+40 793 650 902).' },
      ],
    },
    {
      heading: '3. Quali dati raccogliamo',
      blocks: [
        { type: 'h3', text: 'A. Dati forniti direttamente (modulo di contatto)' },
        { type: 'ul', items: [
          'Nome, email, telefono, contenuto del messaggio, tipo di attività, budget stimato e servizi di interesse.',
          'Base giuridica: Art. 6(1)(b) GDPR — fasi precontrattuali / esecuzione del contratto, e Art. 6(1)(f) — legittimo interesse.',
        ] },
        { type: 'h3', text: 'B. Dati raccolti automaticamente' },
        { type: 'ul', items: [
          'Dati tecnici (indirizzo IP, browser, sistema operativo, dispositivo) — per analytics e sicurezza.',
          'Comportamento (pagine visitate, durata, scroll, click) — tramite Microsoft Clarity (heatmap).',
          'Marketing (tracciamento per il retargeting) — tramite Meta Pixel e TikTok Pixel.',
          'Base giuridica: Art. 6(1)(a) GDPR — consenso esplicito tramite il banner dei cookie.',
        ] },
      ],
    },
    {
      heading: '4. Finalità del trattamento',
      blocks: [
        { type: 'ul', items: [
          'Risposta alle richieste e offerta dei servizi (contratto / fasi precontrattuali).',
          'Miglioramento del sito tramite analytics anonimizzate.',
          'Marketing personalizzato tramite pixel — <strong>solo con consenso</strong>.',
          'Adempimento degli obblighi di legge (fatturazione, fiscalità).',
        ] },
      ],
    },
    {
      heading: '5. Destinatari (responsabili del trattamento)',
      blocks: [
        { type: 'p', html: 'Non vendiamo i tuoi dati. Possono essere trattati, con rigorosi obblighi di riservatezza, da:' },
        { type: 'ul', items: [
          'Formspree Inc. (USA) — <a href="https://formspree.io/legal/privacy-policy/" target="_blank" rel="noopener">privacy policy</a> — invio dei moduli.',
          'Google LLC (USA) — <a href="https://policies.google.com/privacy" target="_blank" rel="noopener">privacy policy</a> — Analytics GA4 e Google Fonts.',
          'Microsoft Corp. (USA) — <a href="https://privacy.microsoft.com/privacystatement" target="_blank" rel="noopener">privacy statement</a> — Clarity heatmap.',
          'Meta Platforms Inc. (USA) — <a href="https://www.facebook.com/privacy/policy/" target="_blank" rel="noopener">privacy policy</a> — Facebook/Instagram Pixel.',
          'TikTok Pte. Ltd. (Singapore) — <a href="https://www.tiktok.com/legal/privacy-policy-eea" target="_blank" rel="noopener">privacy policy</a> — TikTok Pixel.',
          'Namecheap, Inc. (USA) — <a href="https://www.namecheap.com/legal/general/privacy-policy/" target="_blank" rel="noopener">privacy policy</a> — hosting del sito (log del server: indirizzo IP, user-agent, data e ora di accesso).',
          'ANAF e autorità, nei limiti degli obblighi di legge.',
        ] },
      ],
    },
    {
      heading: '6. Trasferimento al di fuori dello SEE/UE',
      blocks: [
        { type: 'p', html: 'Formspree, Google, Microsoft e Meta possono trattare dati negli USA; TikTok a Singapore. Garanzie applicate: <strong>Clausole Contrattuali Standard (SCC)</strong> e, ove applicabile, <strong>EU-US Data Privacy Framework (DPF)</strong>.' },
        { type: 'p', html: 'Il sito è ospitato da <strong>Namecheap, Inc.</strong>, con server negli <strong>Stati Uniti</strong>. Ciò comporta il trasferimento di dati tecnici (indirizzo IP, log del server) verso gli USA, effettuato sulla base delle <strong>Clausole Contrattuali Standard (SCC)</strong> approvate dalla Commissione Europea, che garantiscono un livello adeguato di protezione dei dati.' },
      ],
    },
    {
      heading: '7. Periodi di conservazione',
      blocks: [
        { type: 'table', head: ['Categoria', 'Conservazione'], rows: [
          ['Messaggi di contatto (Formspree)', '24 mesi dalla ricezione'],
          ['Analytics GA4', '14 mesi (poi anonimizzati)'],
          ['Heatmap Clarity', '90 giorni'],
          ['Cookie di marketing (Meta, TikTok)', '90 giorni'],
          ['Dati di fatturazione', '10 anni (obbligo fiscale)'],
          ['Comunicazioni email', 'Durata del rapporto + 3 anni'],
        ] },
      ],
    },
    {
      heading: '8. I tuoi diritti (Art. 15-22 GDPR)',
      blocks: [
        { type: 'ul', items: [
          'Diritto di accesso (Art. 15).',
          'Rettifica (Art. 16).',
          'Cancellazione / „diritto all\'oblio” (Art. 17).',
          'Limitazione del trattamento (Art. 18).',
          'Portabilità dei dati (Art. 20).',
          'Opposizione al trattamento (Art. 21).',
          'Revoca del consenso in qualsiasi momento, senza pregiudicare il trattamento precedente.',
          'Reclamo all\'<a href="https://www.dataprotection.ro" target="_blank" rel="noopener">ANSPDCP</a>.',
        ] },
        { type: 'p', html: 'Come esercitarli: invia un\'email a <a href="mailto:contact@greenpheonixconcept.com">contact@greenpheonixconcept.com</a> con oggetto „Richiesta GDPR — [tipo di richiesta]”. Rispondiamo entro 30 giorni.' },
      ],
    },
    {
      heading: '9. Cookie',
      blocks: [
        { type: 'p', html: 'Per dettagli completi sui cookie, consulta la <a href="/it/politica-cookies">Politica sui Cookie</a>.' },
      ],
    },
    {
      heading: '10. Sicurezza dei dati',
      blocks: [
        { type: 'ul', items: [
          'HTTPS (SSL) su tutto il sito.',
          'Accesso limitato ai dati (solo Laurențiu Bogdan).',
          'Responsabili del trattamento certificati (ISO 27001 o SOC 2).',
          'Notifica degli incidenti entro 72h, ai sensi dell\'Art. 33 GDPR.',
        ] },
      ],
    },
    {
      heading: '11. Minori',
      blocks: [
        { type: 'p', html: 'Il sito non è rivolto a persone di età inferiore a 16 anni e non raccogliamo intenzionalmente dati da minori. Se vieni a conoscenza che un minore ci ha fornito dati, contattaci per la cancellazione.' },
      ],
    },
    {
      heading: '12. Modifiche alla politica',
      blocks: [
        { type: 'p', html: 'Gli aggiornamenti vengono notificati via email agli interessati o tramite avviso sul sito. La versione corrente è contrassegnata con la data dell\'ultimo aggiornamento, in alto.' },
      ],
    },
    {
      heading: '13. Giurisdizione e legge applicabile',
      blocks: [
        { type: 'ul', items: [
          'Legge applicabile: legge rumena.',
          'Per i consumatori dell\'UE prevale la loro legge nazionale per le questioni imperative.',
          'Fori competenti: B2B — Brașov; B2C — foro del consumatore (residenza del consumatore).',
        ] },
      ],
    },
    {
      heading: '14. Contatto',
      blocks: [
        { type: 'ul', items: [
          'Email: <a href="mailto:contact@greenpheonixconcept.com">contact@greenpheonixconcept.com</a>',
          'Telefono: +40 793 650 902',
          'Indirizzo: Str. Principală Nr. 174, Gura Calitei, Vrancea, 627160',
        ] },
      ],
    },
  ],
};

export const terms: LegalDocData = {
  slug: 'termini-condizioni',
  metaTitle: 'Termini e Condizioni — Green Pheonix Concept',
  metaDescription:
    'I termini e le condizioni di utilizzo del sito e dei servizi di Green Pheonix Concept SRL: contrattualizzazione, prezzi, proprietà intellettuale, responsabilità, controversie.',
  title: 'Termini e Condizioni',
  subtitle: 'Le condizioni di utilizzo del sito e dei servizi di Green Pheonix Concept.',
  lastUpdated: '2026-06-02',
  disclaimer: DISCLAIMER,
  breadcrumb: 'Termini e Condizioni',
  sections: [
    {
      heading: '1. Introduzione',
      blocks: [
        { type: 'p', html: `Prestatore: <strong>${COMPANY}</strong>.` },
        { type: 'p', html: 'I presenti termini si applicano all\'utilizzo del sito e dei servizi contrattati. L\'accettazione è implicita con l\'uso del sito o esplicita con la firma di un contratto.' },
      ],
    },
    {
      heading: '2. Servizi offerti',
      blocks: [
        { type: 'ul', items: [
          'Performance marketing (Meta Ads, Google Ads, TikTok Ads).',
          'Strategia e Audit marketing.',
          'Sviluppo web (siti web, landing page, plugin).',
          'Produzione di contenuti (social media, fotografia, video).',
          'I dettagli specifici sono stabiliti in ciascun contratto individuale.',
        ] },
      ],
    },
    {
      heading: '3. Il contratto di servizi',
      blocks: [
        { type: 'p', html: 'Il modulo di contatto <strong>non</strong> costituisce contratto. Il contratto si conclude dopo:' },
        { type: 'ol', items: [
          'Audit gratuito / colloquio iniziale.',
          'Offerta scritta.',
          'Accettazione del cliente (firma + pagamento dell\'acconto).',
        ] },
        { type: 'p', html: 'Le specifiche, le tempistiche e i deliverable sono definiti nel contratto individuale.' },
      ],
    },
    {
      heading: '4. Prezzi e pagamento',
      blocks: [
        { type: 'ul', items: [
          'I prezzi sono in RON o EUR (su richiesta); l\'IVA inclusa/esclusa è specificata in ciascuna offerta.',
          'Pagamento: acconto del 50% alla firma + 50% alla consegna (o mensile per i retainer).',
          'Ritardo nel pagamento: penali dello 0,1%/giorno (max. 50% dell\'importo dovuto).',
          'I servizi possono essere sospesi in caso di mancato pagamento.',
        ] },
      ],
    },
    {
      heading: '5. Proprietà intellettuale',
      blocks: [
        { type: 'ul', items: [
          'I materiali consegnati (design, copy, codice) diventano proprietà del cliente dopo il pagamento integrale.',
          'I concetti, le metodologie e il know-how restano proprietà di Green Pheonix Concept.',
          'Ci riserviamo il diritto di utilizzare i risultati nel portfolio / case study, con il consenso del cliente.',
        ] },
      ],
    },
    {
      heading: '6. Riservatezza',
      blocks: [
        { type: 'p', html: 'I dati del cliente sono riservati (NDA implicito) e non vengono divulgati a terzi senza consenso, salvo gli obblighi di legge, l\'audit o le controversie legali.' },
      ],
    },
    {
      heading: '7. Responsabilità',
      blocks: [
        { type: 'p', html: 'La responsabilità è limitata al valore del contratto. <strong>Non rispondiamo</strong> per:' },
        { type: 'ul', items: [
          'Le performance degli algoritmi di terzi (Meta, Google modificano le regole).',
          'Le decisioni editoriali delle piattaforme (ban, restrizioni sugli annunci).',
          'Forza maggiore (pandemie, guerra, attacchi informatici).',
        ] },
        { type: 'p', html: 'Rispondiamo per: errori tecnici propri, ritardi propri, violazioni contrattuali comprovate.' },
      ],
    },
    {
      heading: '8. Diritto di recesso (B2C)',
      blocks: [
        { type: 'ul', items: [
          'Per i consumatori: 14 giorni di diritto di recesso, ai sensi della Direttiva 2011/83/UE.',
          'Se l\'esecuzione inizia immediatamente su richiesta del consumatore (audit, strategia), il diritto di recesso si perde proporzionalmente al servizio prestato (Art. 16(a)).',
          'Per il B2B: il diritto di recesso non si applica.',
        ] },
      ],
    },
    {
      heading: '9. Risoluzione delle controversie',
      blocks: [
        { type: 'ul', items: [
          'Negoziazione amichevole (30 giorni), poi mediazione (facoltativa).',
          'B2B: i fori di Brașov. B2C: il foro del consumatore (residenza del consumatore).',
          'ADR UE: <a href="https://ec.europa.eu/consumers/odr/" target="_blank" rel="noopener">ec.europa.eu/consumers/odr</a>.',
          'ANPC: <a href="https://anpc.ro" target="_blank" rel="noopener">anpc.ro</a>. SAL: <a href="https://www.salro.ro" target="_blank" rel="noopener">salro.ro</a>.',
        ] },
      ],
    },
    {
      heading: '10. Durata e cessazione',
      blocks: [
        { type: 'ul', items: [
          'Contratto individuale: durata specificata nel contratto.',
          'Risoluzione: preavviso scritto di 30 giorni.',
          'Risoluzione immediata: mancato pagamento > 30 giorni o grave violazione.',
        ] },
      ],
    },
    {
      heading: '11. Modifiche ai termini',
      blocks: [
        { type: 'ul', items: [
          'Gli aggiornamenti vengono notificati via email con 30 giorni di anticipo.',
          'La prosecuzione dell\'utilizzo del sito/servizi = accettazione delle modifiche.',
          'I contratti firmati non vengono modificati retroattivamente.',
        ] },
      ],
    },
    {
      heading: '12. Lingua prevalente',
      blocks: [
        { type: 'p', html: 'La versione in lingua rumena prevale in caso di discrepanza tra le traduzioni. I presenti termini non limitano i diritti imperativi del consumatore dell\'UE ai sensi della sua legge nazionale.' },
      ],
    },
    {
      heading: '13. Legge applicabile',
      blocks: [
        { type: 'p', html: 'Legge rumena. Per i consumatori dell\'UE, la loro legge nazionale prevale per le questioni di protezione imperativa.' },
      ],
    },
  ],
};

export const cookies: LegalDocData = {
  slug: 'politica-cookies',
  metaTitle: 'Politica sui Cookie — Green Pheonix Concept',
  metaDescription:
    'Quali cookie utilizziamo su greenpheonixconcept.com: necessari, analitici (GA4, Clarity) e di marketing (Meta, TikTok), durata, base giuridica e come gestirli.',
  title: 'Politica sui Cookie',
  subtitle: 'Quali cookie utilizziamo, perché e come puoi controllarli.',
  lastUpdated: '2026-06-02',
  disclaimer: DISCLAIMER,
  breadcrumb: 'Politica sui Cookie',
  sections: [
    {
      heading: '1. Cosa sono i cookie?',
      blocks: [
        { type: 'p', html: 'I cookie sono piccoli file di testo memorizzati dal tuo browser quando visiti un sito. Consentono il funzionamento del sito, la memorizzazione delle preferenze e, con il tuo consenso, misurazioni e marketing.' },
      ],
    },
    {
      heading: '2. Quali cookie utilizziamo',
      blocks: [
        { type: 'h3', text: 'A. Cookie necessari (sempre attivi)' },
        { type: 'ul', items: [
          'Cookie di preferenza della lingua (ro/en/it).',
          'Cookie di consenso (gpc_cookie_consent).',
          'Token di sicurezza per i moduli.',
        ] },
        { type: 'p', html: 'Durata: sessione o fino a 12 mesi. Base: Art. 6(1)(f) GDPR — legittimo interesse (funzionamento del sito).' },
        { type: 'h3', text: 'B. Cookie analitici (consenso obbligatorio)' },
        { type: 'table', head: ['Servizio', 'Cookie', 'Durata', 'Dati inviati'], rows: [
          ['Google Analytics 4', '_ga, _ga_*, _gid', 'fino a 14 mesi', 'USA (SCC + DPF)'],
          ['Microsoft Clarity', '_clck, _clsk, MUID', '90 giorni', 'USA'],
        ] },
        { type: 'p', html: 'Opt-out GA4: <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener">browser add-on</a>.' },
        { type: 'h3', text: 'C. Cookie di marketing (consenso obbligatorio)' },
        { type: 'table', head: ['Servizio', 'Cookie', 'Durata', 'Dati inviati'], rows: [
          ['Meta Pixel', '_fbp, fr', '90 giorni', 'USA (SCC + DPF)'],
          ['TikTok Pixel', '_ttp', '90 giorni', 'Singapore (SCC)'],
        ] },
        { type: 'p', html: 'Opt-out: <a href="https://www.facebook.com/help/568137493302217" target="_blank" rel="noopener">Meta</a> · <a href="https://www.tiktok.com/legal/privacy-policy-eea" target="_blank" rel="noopener">TikTok</a>.' },
      ],
    },
    {
      heading: '3. Come gestire i cookie',
      blocks: [
        { type: 'ul', items: [
          'Il banner di consenso alla prima visita (granulare).',
          'Il pulsante „Impostazioni cookie” nel footer riapre il banner.',
          'Le impostazioni del browser — blocco dei cookie di terze parti.',
          'Plugin di opt-out specifici (link nella sezione 2).',
        ] },
      ],
    },
    {
      heading: '4. Conseguenze del rifiuto',
      blocks: [
        { type: 'ul', items: [
          'Cookie necessari: il sito funziona normalmente.',
          'Rifiuto degli analitici: il sito funziona, ma non possiamo misurare i miglioramenti.',
          'Rifiuto del marketing: non vedi annunci personalizzati; annunci generici possono apparire su altri siti.',
        ] },
      ],
    },
    {
      heading: '5. Modifiche alla politica',
      blocks: [
        { type: 'p', html: 'Gli aggiornamenti vengono notificati tramite la riapertura del banner di consenso.' },
      ],
    },
    {
      heading: '6. Contatto',
      blocks: [
        { type: 'p', html: 'Domande? <a href="mailto:contact@greenpheonixconcept.com">contact@greenpheonixconcept.com</a>.' },
      ],
    },
  ],
};

export const legalDocs = { privacy, terms, cookies };
export default legalDocs;
