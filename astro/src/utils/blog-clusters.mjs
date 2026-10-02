/**
 * Blog translation clusters — the one place a cluster is computed.
 *
 * Every published post sharing a `translationKey` is a translation of the
 * others; together they form one hreflang cluster. A post alone under its key
 * (or without a key) is a cluster of one and links only to itself. Drafts never
 * join a cluster.
 *
 * Plain JS on purpose: the blog [slug] pages feed it from getCollection(), and
 * the sitemap serializer in astro.config.mjs feeds it from disk through
 * loadBlogPosts(), where astro:content is not available. Both sides pass plain
 * objects:
 *
 *   { slug: string, language: 'ro' | 'en' | 'it', translationKey?: string, draft?: boolean }
 */
import { readdirSync, readFileSync } from 'node:fs';
import { parse } from 'yaml';

const DEFAULT_LOCALE = 'ro';
const LOCALES = ['ro', 'en', 'it'];

/**
 * Read every blog post's frontmatter from disk, for callers outside Astro's
 * content layer (the sitemap). The URL slug follows Astro's rule: the
 * frontmatter `slug` when set — most EN/IT posts have one, e.g.
 * calculate-roas-correctly-en.md → calculate-roas-correctly — else the file
 * name without its extension.
 */
export function loadBlogPosts(dir = new URL('../content/blog/', import.meta.url)) {
  return readdirSync(dir)
    .filter((file) => /\.mdx?$/.test(file))
    .map((file) => {
      const source = readFileSync(new URL(file, dir), 'utf8');
      const frontmatter = source.match(/^---\r?\n([\s\S]*?)\r?\n---/);
      if (!frontmatter) throw new Error(`blog-clusters: no frontmatter in ${file}`);
      const data = parse(frontmatter[1]);
      return {
        slug: data.slug ?? file.replace(/\.mdx?$/, ''),
        language: data.language,
        translationKey: data.translationKey,
        draft: data.draft === true,
      };
    });
}

/** Root-relative URL of a post, in its canonical trailing-slash form. */
export function blogPostPath(language, slug) {
  return language === DEFAULT_LOCALE ? `/blog/${slug}/` : `/${language}/blog/${slug}/`;
}

/**
 * Group published posts into clusters.
 * @returns {Map<string, Record<string, string>>} cluster key → { locale: path }
 */
export function buildClusters(posts) {
  const clusters = new Map();
  for (const post of posts) {
    if (post.draft) continue;
    const key = clusterKey(post);
    const cluster = clusters.get(key) ?? {};
    if (cluster[post.language]) {
      throw new Error(
        `blog-clusters: translationKey "${key}" has two "${post.language}" posts ` +
          `(${cluster[post.language]} and ${blogPostPath(post.language, post.slug)})`
      );
    }
    cluster[post.language] = blogPostPath(post.language, post.slug);
    clusters.set(key, cluster);
  }
  return clusters;
}

/**
 * The per-locale paths of the cluster a post belongs to, shaped for
 * BaseLayout's `hreflangPaths`. A post outside every cluster (a draft seen in
 * dev) gets just itself.
 */
export function hreflangPathsFor(post, clusters) {
  const self = { [post.language]: blogPostPath(post.language, post.slug) };
  if (post.draft) return self;
  const cluster = clusters.get(clusterKey(post)) ?? self;
  return Object.fromEntries(LOCALES.filter((l) => cluster[l]).map((l) => [l, cluster[l]]));
}

function clusterKey(post) {
  return post.translationKey ?? `${post.language}:${post.slug}`;
}
