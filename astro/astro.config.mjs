import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://greenpheonixconcept.com',
  // Legacy service URLs now redirect into the new /servicii structure.
  redirects: {
    '/servicii-ads': '/servicii/meta-ads',
    '/servicii-web': '/servicii/web-development',
    '/en/servicii-ads': '/en/servicii/meta-ads',
    '/en/servicii-web': '/en/servicii/web-development',
    '/it/servicii-ads': '/it/servicii/meta-ads',
    '/it/servicii-web': '/it/servicii/web-development',
  },
  i18n: {
    defaultLocale: 'ro',
    locales: ['ro', 'en', 'it'],
    routing: {
      prefixDefaultLocale: false,
    },
  },
  integrations: [
    tailwind(),
    sitemap({
      i18n: {
        defaultLocale: 'ro',
        locales: { ro: 'ro-RO', en: 'en-US', it: 'it-IT' },
      },
      filter: (page) =>
        !page.includes('/multumim') &&
        !page.includes('/thank-you') &&
        !page.includes('/grazie') &&
        !page.endsWith('/404') &&
        !page.endsWith('/404/'),
    }),
  ],
  compressHTML: true,
});
