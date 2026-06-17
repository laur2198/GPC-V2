import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://greenpheonixconcept.com',
  trailingSlash: 'always',
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
        !page.includes('/blog') &&
        !page.endsWith('/404') &&
        !page.endsWith('/404/'),
    }),
  ],
  compressHTML: true,
});
