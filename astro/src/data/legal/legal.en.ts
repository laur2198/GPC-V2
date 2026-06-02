// Legal documents — English. Mirrors the structure of legal.ro.ts.
// NOTE: professional GDPR-aligned templates, not a lawyer's legal advice.

import type { LegalDocData } from './legal.ro';

const COMPANY =
  'GREEN PHEONIX CONCEPT S.R.L., CUI 45667331 (VAT RO45667331), Trade Register No. J2022000195397, registered office Str. Principală Nr. 174, Gura Calitei, Vrancea, 627160, Romania';
const DISCLAIMER =
  '⚠️ THIS POLICY IS AN INFORMATIVE DOCUMENT BASED ON PROFESSIONAL GDPR-COMPLIANT TEMPLATES. It does not constitute legal advice. For specific situations or complex contracts, we recommend consulting a lawyer. Green Pheonix Concept SRL reserves the right to update this policy in line with regulatory evolution.';

export const privacy: LegalDocData = {
  slug: 'privacy-policy',
  metaTitle: 'Privacy Policy — Green Pheonix Concept',
  metaDescription:
    'Green Pheonix Concept SRL privacy policy: what data we collect, legal basis, recipients, transfers, retention and your GDPR rights.',
  title: 'Privacy Policy',
  subtitle:
    'How we collect, use and protect your data, in accordance with Regulation (EU) 2016/679 (GDPR).',
  lastUpdated: '2026-06-02',
  disclaimer: DISCLAIMER,
  breadcrumb: 'Privacy Policy',
  sections: [
    {
      heading: '1. Introduction',
      blocks: [
        { type: 'p', html: `The controller of the personal data collected through this website is <strong>${COMPANY}</strong>.` },
        { type: 'p', html: 'This policy applies to all data processed through the greenpheonixconcept.com website, the contact forms and any subsequent communications with us.' },
      ],
    },
    {
      heading: '2. Data protection contact',
      blocks: [
        { type: 'p', html: 'The person responsible for data protection: <a href="mailto:contact@greenpheonixconcept.com">contact@greenpheonixconcept.com</a>.' },
        { type: 'p', html: 'For any matter concerning your personal data, you may contact us by email or telephone (+40 793 650 902).' },
      ],
    },
    {
      heading: '3. What data we collect',
      blocks: [
        { type: 'h3', text: 'A. Data provided directly (contact form)' },
        { type: 'ul', items: [
          'Name, email, telephone, message content, business type, estimated budget and the services of interest.',
          'Legal basis: Art. 6(1)(b) GDPR — pre-contractual steps / performance of the contract, and Art. 6(1)(f) — legitimate interest.',
        ] },
        { type: 'h3', text: 'B. Data collected automatically' },
        { type: 'ul', items: [
          'Technical data (IP address, browser, operating system, device) — for analytics and security.',
          'Behaviour (pages visited, duration, scroll, clicks) — via Microsoft Clarity (heatmaps).',
          'Marketing (tracking for retargeting) — via Meta Pixel and TikTok Pixel.',
          'Legal basis: Art. 6(1)(a) GDPR — explicit consent through the cookie banner.',
        ] },
      ],
    },
    {
      heading: '4. Purpose of processing',
      blocks: [
        { type: 'ul', items: [
          'Responding to requests and quoting for services (contract / pre-contractual steps).',
          'Improving the website through anonymised analytics.',
          'Personalised marketing through pixels — <strong>only with consent</strong>.',
          'Compliance with legal obligations (invoicing, taxation).',
        ] },
      ],
    },
    {
      heading: '5. Recipients (processors)',
      blocks: [
        { type: 'p', html: 'We do not sell your data. It may be processed, under strict confidentiality obligations, by:' },
        { type: 'ul', items: [
          'Formspree Inc. (USA) — <a href="https://formspree.io/legal/privacy-policy/" target="_blank" rel="noopener">privacy policy</a> — form submission.',
          'Google LLC (USA) — <a href="https://policies.google.com/privacy" target="_blank" rel="noopener">privacy policy</a> — GA4 Analytics and Google Fonts.',
          'Microsoft Corp. (USA) — <a href="https://privacy.microsoft.com/privacystatement" target="_blank" rel="noopener">privacy statement</a> — Clarity heatmaps.',
          'Meta Platforms Inc. (USA) — <a href="https://www.facebook.com/privacy/policy/" target="_blank" rel="noopener">privacy policy</a> — Facebook/Instagram Pixel.',
          'TikTok Pte. Ltd. (Singapore) — <a href="https://www.tiktok.com/legal/privacy-policy-eea" target="_blank" rel="noopener">privacy policy</a> — TikTok Pixel.',
          'The hosting provider (confirmed at deployment) — website delivery.',
          'ANAF and authorities, within the limits of legal obligations.',
        ] },
      ],
    },
    {
      heading: '6. Transfers outside the EEA/EU',
      blocks: [
        { type: 'p', html: 'Formspree, Google, Microsoft and Meta may process data in the USA; TikTok in Singapore. The safeguards applied: <strong>Standard Contractual Clauses (SCC)</strong> and, where applicable, the <strong>EU-US Data Privacy Framework (DPF)</strong>.' },
      ],
    },
    {
      heading: '7. Retention periods',
      blocks: [
        { type: 'table', head: ['Category', 'Retention'], rows: [
          ['Contact messages (Formspree)', '24 months from receipt'],
          ['GA4 Analytics', '14 months (then anonymised)'],
          ['Clarity heatmaps', '90 days'],
          ['Marketing cookies (Meta, TikTok)', '90 days'],
          ['Invoicing data', '10 years (tax obligation)'],
          ['Email communications', 'Duration of the relationship + 3 years'],
        ] },
      ],
    },
    {
      heading: '8. Your rights (Art. 15-22 GDPR)',
      blocks: [
        { type: 'ul', items: [
          'Right of access (Art. 15).',
          'Rectification (Art. 16).',
          'Erasure / "right to be forgotten" (Art. 17).',
          'Restriction of processing (Art. 18).',
          'Data portability (Art. 20).',
          'Objection to processing (Art. 21).',
          'Withdrawal of consent at any time, without affecting prior processing.',
          'Complaint to <a href="https://www.dataprotection.ro" target="_blank" rel="noopener">ANSPDCP</a>.',
        ] },
        { type: 'p', html: 'How to exercise them: send an email to <a href="mailto:contact@greenpheonixconcept.com">contact@greenpheonixconcept.com</a> with the subject "GDPR Request — [type of request]". We respond within 30 days.' },
      ],
    },
    {
      heading: '9. Cookies',
      blocks: [
        { type: 'p', html: 'For full details about cookies, see the <a href="/en/cookie-policy">Cookie Policy</a>.' },
      ],
    },
    {
      heading: '10. Data security',
      blocks: [
        { type: 'ul', items: [
          'HTTPS (SSL) across the entire website.',
          'Limited access to data (Laurențiu Bogdan only).',
          'Certified processors (ISO 27001 or SOC 2).',
          'Incident notification within 72h, in accordance with Art. 33 GDPR.',
        ] },
      ],
    },
    {
      heading: '11. Minors',
      blocks: [
        { type: 'p', html: 'The website is not directed at persons under 16 and we do not knowingly collect data from minors. If you become aware that a minor has provided us with data, please contact us for its deletion.' },
      ],
    },
    {
      heading: '12. Changes to the policy',
      blocks: [
        { type: 'p', html: 'Updates are notified by email to those affected or through a notice on the website. The current version is marked with the date of the last update, at the top.' },
      ],
    },
    {
      heading: '13. Jurisdiction and applicable law',
      blocks: [
        { type: 'ul', items: [
          'Applicable law: Romanian law.',
          'For EU consumers, their national law prevails on mandatory matters.',
          'Competent courts: B2B — Brașov; B2C — the court of the consumer\'s residence.',
        ] },
      ],
    },
    {
      heading: '14. Contact',
      blocks: [
        { type: 'ul', items: [
          'Email: <a href="mailto:contact@greenpheonixconcept.com">contact@greenpheonixconcept.com</a>',
          'Telephone: +40 793 650 902',
          'Address: Str. Principală Nr. 174, Gura Calitei, Vrancea, 627160',
        ] },
      ],
    },
  ],
};

export const terms: LegalDocData = {
  slug: 'terms-of-service',
  metaTitle: 'Terms of Service — Green Pheonix Concept',
  metaDescription:
    'Terms and conditions for using the website and services of Green Pheonix Concept SRL: contracting, pricing, intellectual property, liability, disputes.',
  title: 'Terms of Service',
  subtitle: 'The terms of use of the website and services of Green Pheonix Concept.',
  lastUpdated: '2026-06-02',
  disclaimer: DISCLAIMER,
  breadcrumb: 'Terms of Service',
  sections: [
    {
      heading: '1. Introduction',
      blocks: [
        { type: 'p', html: `Provider: <strong>${COMPANY}</strong>.` },
        { type: 'p', html: 'These terms apply to the use of the website and the contracted services. Acceptance is implied through the use of the website or explicit through the signing of a contract.' },
      ],
    },
    {
      heading: '2. Services offered',
      blocks: [
        { type: 'ul', items: [
          'Performance marketing (Meta Ads, Google Ads, TikTok Ads).',
          'Marketing strategy & audit.',
          'Web development (websites, landing pages, plugins).',
          'Content production (social media, photography, video).',
          'Specific details are set out in each individual contract.',
        ] },
      ],
    },
    {
      heading: '3. Service contract',
      blocks: [
        { type: 'p', html: 'The contact form does <strong>not</strong> constitute a contract. The contract is concluded after:' },
        { type: 'ol', items: [
          'Free audit / initial discussion.',
          'Written quotation.',
          'Client acceptance (signature + advance payment).',
        ] },
        { type: 'p', html: 'The specifications, deadlines and deliverables are defined in the individual contract.' },
      ],
    },
    {
      heading: '4. Pricing and payment',
      blocks: [
        { type: 'ul', items: [
          'Prices are in RON or EUR (on request); VAT included/excluded is specified in each quotation.',
          'Payment: 50% advance on signature + 50% on delivery (or monthly for a retainer).',
          'Late payment: penalties of 0.1%/day (max. 50% of the amount due).',
          'Services may be suspended in the event of non-payment.',
        ] },
      ],
    },
    {
      heading: '5. Intellectual property',
      blocks: [
        { type: 'ul', items: [
          'The materials delivered (design, copy, code) become the property of the client after full payment.',
          'The concepts, methodologies and know-how remain the property of Green Pheonix Concept.',
          'We reserve the right to use the results in our portfolio / case studies, with the client\'s consent.',
        ] },
      ],
    },
    {
      heading: '6. Confidentiality',
      blocks: [
        { type: 'p', html: 'Client data is confidential (implied NDA) and is not disclosed to third parties without consent, except for legal obligations, audits or legal disputes.' },
      ],
    },
    {
      heading: '7. Liability',
      blocks: [
        { type: 'p', html: 'Liability is limited to the value of the contract. We are <strong>not liable</strong> for:' },
        { type: 'ul', items: [
          'The performance of third-party algorithms (Meta, Google change the rules).',
          'The editorial decisions of platforms (bans, advertising restrictions).',
          'Force majeure (pandemics, war, cyberattacks).',
        ] },
        { type: 'p', html: 'We are liable for: our own technical errors, our own delays, proven breaches of contract.' },
      ],
    },
    {
      heading: '8. Right of withdrawal (B2C)',
      blocks: [
        { type: 'ul', items: [
          'For consumers: 14-day right of withdrawal, in accordance with Directive 2011/83/EU.',
          'If performance begins immediately at the consumer\'s request (audit, strategy), the right of withdrawal is lost in proportion to the service performed (Art. 16(a)).',
          'For B2B: the right of withdrawal does not apply.',
        ] },
      ],
    },
    {
      heading: '9. Dispute resolution',
      blocks: [
        { type: 'ul', items: [
          'Amicable negotiation (30 days), then mediation (optional).',
          'B2B: the courts of Brașov. B2C: the court of the consumer\'s residence.',
          'EU ADR: <a href="https://ec.europa.eu/consumers/odr/" target="_blank" rel="noopener">ec.europa.eu/consumers/odr</a>.',
          'ANPC: <a href="https://anpc.ro" target="_blank" rel="noopener">anpc.ro</a>. SAL: <a href="https://www.salro.ro" target="_blank" rel="noopener">salro.ro</a>.',
        ] },
      ],
    },
    {
      heading: '10. Duration and termination',
      blocks: [
        { type: 'ul', items: [
          'Individual contract: the duration specified in the contract.',
          'Termination: written notice 30 days in advance.',
          'Immediate termination: non-payment > 30 days or serious breach.',
        ] },
      ],
    },
    {
      heading: '11. Changes to the terms',
      blocks: [
        { type: 'ul', items: [
          'Updates are notified by email 30 days in advance.',
          'Continued use of the website/services = acceptance of the changes.',
          'Signed contracts are not modified retroactively.',
        ] },
      ],
    },
    {
      heading: '12. Prevailing language',
      blocks: [
        { type: 'p', html: 'The Romanian-language version prevails in the event of a discrepancy between translations. These terms do not restrict the mandatory rights of EU consumers under their national law.' },
      ],
    },
    {
      heading: '13. Applicable law',
      blocks: [
        { type: 'p', html: 'Romanian law. For EU consumers, their national law prevails on matters of mandatory protection.' },
      ],
    },
  ],
};

export const cookies: LegalDocData = {
  slug: 'cookie-policy',
  metaTitle: 'Cookie Policy — Green Pheonix Concept',
  metaDescription:
    'What cookies we use on greenpheonixconcept.com: necessary, analytics (GA4, Clarity) and marketing (Meta, TikTok), duration, legal basis and how to manage them.',
  title: 'Cookie Policy',
  subtitle: 'What cookies we use, why, and how you can control them.',
  lastUpdated: '2026-06-02',
  disclaimer: DISCLAIMER,
  breadcrumb: 'Cookie Policy',
  sections: [
    {
      heading: '1. What are cookies?',
      blocks: [
        { type: 'p', html: 'Cookies are small text files stored by your browser when you visit a website. They enable the website to function, remember preferences and, with your consent, measurement and marketing.' },
      ],
    },
    {
      heading: '2. What cookies we use',
      blocks: [
        { type: 'h3', text: 'A. Necessary cookies (always active)' },
        { type: 'ul', items: [
          'Language preference cookie (ro/en/it).',
          'Consent cookie (gpc_cookie_consent).',
          'Security tokens for forms.',
        ] },
        { type: 'p', html: 'Duration: session or up to 12 months. Basis: Art. 6(1)(f) GDPR — legitimate interest (website operation).' },
        { type: 'h3', text: 'B. Analytics cookies (consent required)' },
        { type: 'table', head: ['Service', 'Cookies', 'Duration', 'Data sent'], rows: [
          ['Google Analytics 4', '_ga, _ga_*, _gid', 'up to 14 months', 'USA (SCC + DPF)'],
          ['Microsoft Clarity', '_clck, _clsk, MUID', '90 days', 'USA'],
        ] },
        { type: 'p', html: 'GA4 opt-out: <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener">browser add-on</a>.' },
        { type: 'h3', text: 'C. Marketing cookies (consent required)' },
        { type: 'table', head: ['Service', 'Cookies', 'Duration', 'Data sent'], rows: [
          ['Meta Pixel', '_fbp, fr', '90 days', 'USA (SCC + DPF)'],
          ['TikTok Pixel', '_ttp', '90 days', 'Singapore (SCC)'],
        ] },
        { type: 'p', html: 'Opt-out: <a href="https://www.facebook.com/help/568137493302217" target="_blank" rel="noopener">Meta</a> · <a href="https://www.tiktok.com/legal/privacy-policy-eea" target="_blank" rel="noopener">TikTok</a>.' },
      ],
    },
    {
      heading: '3. How to manage cookies',
      blocks: [
        { type: 'ul', items: [
          'The consent banner on your first visit (granular).',
          'The "Cookie settings" button in the footer reopens the banner.',
          'Browser settings — blocking third-party cookies.',
          'Specific opt-out plugins (links in section 2).',
        ] },
      ],
    },
    {
      heading: '4. Consequences of refusal',
      blocks: [
        { type: 'ul', items: [
          'Necessary cookies: the website functions normally.',
          'Refusing analytics: the website works, but we cannot measure improvements.',
          'Refusing marketing: you will not see personalised ads; generic ads may appear on other websites.',
        ] },
      ],
    },
    {
      heading: '5. Changes to the policy',
      blocks: [
        { type: 'p', html: 'Updates are notified by reopening the consent banner.' },
      ],
    },
    {
      heading: '6. Contact',
      blocks: [
        { type: 'p', html: 'Questions? <a href="mailto:contact@greenpheonixconcept.com">contact@greenpheonixconcept.com</a>.' },
      ],
    },
  ],
};

export const legalDocs = { privacy, terms, cookies };
export default legalDocs;
