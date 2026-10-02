import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';
import { loadBlogPosts, buildClusters, hreflangPathsFor, blogPostPath } from './src/utils/blog-clusters.mjs';
import { legalClusterFor } from './src/utils/legal-routes.mjs';

const SITE = 'https://greenpheonixconcept.com';

// The sitemap's i18n pairing matches URLs by locale prefix, which can't see
// that /blog/cum-calculezi-roas/ and /en/blog/calculate-roas-correctly/ are one
// article. Blog alternates come from the same clusters the pages use instead.
const blogPosts = loadBlogPosts().filter((post) => !post.draft);
const blogClusters = buildClusters(blogPosts);
const blogAlternates = new Map(
  blogPosts.map((post) => [
    SITE + blogPostPath(post.language, post.slug),
    Object.entries(hreflangPathsFor(post, blogClusters)).map(([lang, path]) => ({ lang, url: SITE + path })),
  ])
);

// Legal pages have per-locale slugs too; their clusters come from the same
// route map LegalDoc uses for the page head.
function legalAlternates(url) {
  const cluster = legalClusterFor(new URL(url).pathname);
  return cluster && Object.entries(cluster).map(([lang, path]) => ({ lang, url: SITE + path }));
}

export default defineConfig({
  site: SITE,
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
        locales: { ro: 'ro', en: 'en', it: 'it' },
      },
      filter: (page) =>
        !page.includes('/multumim') &&
        !page.includes('/thank-you') &&
        !page.includes('/grazie') &&
        !page.endsWith('/404') &&
        !page.endsWith('/404/'),
      serialize(item) {
        const links = blogAlternates.get(item.url) ?? legalAlternates(item.url) ?? item.links;
        // x-default follows the page head: it points at the RO version, and a
        // cluster without RO gets none.
        const ro = links?.find((link) => link.lang === 'ro');
        if (links) item.links = ro ? [...links, { lang: 'x-default', url: ro.url }] : links;
        return item;
      },
    }),
  ],
  compressHTML: true,
});
