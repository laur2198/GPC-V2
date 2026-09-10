/**
 * Route registry — single source of truth for per-locale route slugs.
 *
 * Replaces the old "identical path + locale prefix" assumption baked into
 * `localizedPath` / `switchLocalePath`. Every translatable route is declared
 * once here, keyed by its **Romanian canonical path** (`RouteKey`), with the
 * slug it uses in each locale.
 *
 * Why the RO path is the key: ~150 existing call sites already pass the RO
 * path to `localizedPath` (`localizedPath(locale, '/servicii')`). Keeping it
 * as the lookup key means the registry can be introduced without touching
 * any of them.
 *
 * Slugs are stored WITHOUT a leading slash, WITHOUT a locale prefix and
 * WITHOUT a trailing slash. The home route uses the empty string. Path
 * composition (locale prefix, trailing slash) lives in `../utils/i18n.ts`.
 *
 * NOTE: `/404` is deliberately absent. Only a Romanian 404 page exists and
 * its alternates point at the three homepages, which is a genuine "no
 * translated equivalent" case, not a slug mapping — `src/pages/404.astro`
 * keeps an explicit `hreflangPaths` override for it.
 */

export type Locale = 'ro' | 'en' | 'it';

export const defaultLocale: Locale = 'ro';
export const locales: Locale[] = ['ro', 'en', 'it'];

/** Canonical (Romanian) path for every translatable route. */
export type RouteKey =
  | '/'
  | '/servicii'
  | '/servicii/meta-ads'
  | '/servicii/google-ads'
  | '/servicii/social-media'
  | '/servicii/web-development'
  | '/servicii/strategie-audit'
  | '/servicii/content-production'
  | '/portofoliu'
  | '/blog'
  | '/despre'
  | '/procesul'
  | '/contact'
  | '/multumim'
  | '/politica-confidentialitate'
  | '/politica-cookies'
  | '/termeni-conditii';

/** Slug of each service detail page, relative to `/servicii`. */
export type ServiceSlug =
  | 'meta-ads'
  | 'google-ads'
  | 'social-media'
  | 'web-development'
  | 'strategie-audit'
  | 'content-production';

/** Route keys that act as a parent for content-driven child routes. */
export type DynamicRouteKey = '/blog' | '/portofoliu';

/**
 * A concrete path below a dynamic parent, e.g. `/blog/cum-calculezi-roas`.
 * The child segment is the content slug and is carried through untranslated.
 */
export type DynamicRoutePath = `${DynamicRouteKey}/${string}`;

/** Anything `localizedPath` accepts. */
export type RoutePathInput = RouteKey | DynamicRoutePath;

interface RouteDef {
  /** Per-locale slug, no slashes, `''` for the homepage. */
  slugs: Record<Locale, string>;
  /** Parent of content-driven child routes (`/blog/<post>`). */
  dynamic?: true;
  /**
   * Extra slugs that must resolve back to this key. Used for legacy duplicate
   * pages that still ship (`/en/multumim/` alongside `/en/thank-you/`).
   * Forward lookup always returns `slugs`, never an alias.
   */
  aliases?: Partial<Record<Locale, string[]>>;
}

/**
 * PHASE 1: values mirror the routes that exist on disk today, byte for byte.
 * EN/IT slugs are identical to RO except where the codebase had already
 * translated them (legal pages, thank-you). Translating the rest is phase 4.
 */
export const routes: Record<RouteKey, RouteDef> = {
  '/': { slugs: { ro: '', en: '', it: '' } },

  '/servicii': { slugs: { ro: 'servicii', en: 'servicii', it: 'servicii' } },
  '/servicii/meta-ads': {
    slugs: { ro: 'servicii/meta-ads', en: 'servicii/meta-ads', it: 'servicii/meta-ads' },
  },
  '/servicii/google-ads': {
    slugs: { ro: 'servicii/google-ads', en: 'servicii/google-ads', it: 'servicii/google-ads' },
  },
  '/servicii/social-media': {
    slugs: { ro: 'servicii/social-media', en: 'servicii/social-media', it: 'servicii/social-media' },
  },
  '/servicii/web-development': {
    slugs: {
      ro: 'servicii/web-development',
      en: 'servicii/web-development',
      it: 'servicii/web-development',
    },
  },
  '/servicii/strategie-audit': {
    slugs: {
      ro: 'servicii/strategie-audit',
      en: 'servicii/strategie-audit',
      it: 'servicii/strategie-audit',
    },
  },
  '/servicii/content-production': {
    slugs: {
      ro: 'servicii/content-production',
      en: 'servicii/content-production',
      it: 'servicii/content-production',
    },
  },

  '/portofoliu': {
    slugs: { ro: 'portofoliu', en: 'portofoliu', it: 'portofoliu' },
    dynamic: true,
  },
  '/blog': {
    slugs: { ro: 'blog', en: 'blog', it: 'blog' },
    dynamic: true,
  },

  '/despre': { slugs: { ro: 'despre', en: 'despre', it: 'despre' } },
  '/procesul': { slugs: { ro: 'procesul', en: 'procesul', it: 'procesul' } },
  '/contact': { slugs: { ro: 'contact', en: 'contact', it: 'contact' } },

  // `/en/multumim/` and `/it/multumim/` still exist as legacy duplicates of
  // the translated thank-you pages; they must resolve to this key too.
  '/multumim': {
    slugs: { ro: 'multumim', en: 'thank-you', it: 'grazie' },
    aliases: { en: ['multumim'], it: ['multumim'] },
  },

  '/politica-confidentialitate': {
    slugs: { ro: 'politica-confidentialitate', en: 'privacy-policy', it: 'informativa-privacy' },
  },
  '/politica-cookies': {
    slugs: { ro: 'politica-cookies', en: 'cookie-policy', it: 'politica-cookies' },
  },
  '/termeni-conditii': {
    slugs: { ro: 'termeni-conditii', en: 'terms-of-service', it: 'termini-condizioni' },
  },
};

export const routeKeys = Object.keys(routes) as RouteKey[];

/** Legal document keys, consumed by LegalDoc and Footer. */
export const legalRouteKeys = {
  privacy: '/politica-confidentialitate',
  terms: '/termeni-conditii',
  cookies: '/politica-cookies',
} as const satisfies Record<string, RouteKey>;

export type LegalDocKey = keyof typeof legalRouteKeys;

// ---------------------------------------------------------------------------
// Reverse index — built once at module load, O(1) lookups afterwards.
// ---------------------------------------------------------------------------

interface ReverseEntry {
  key: RouteKey;
  dynamic: boolean;
}

/** `"<locale>:<slug>"` → route key. Includes aliases. */
const reverseIndex = new Map<string, ReverseEntry>();

/** Longest slug (in segments) registered for any locale — bounds the probe loop. */
let maxSlugSegments = 1;

for (const key of routeKeys) {
  const def = routes[key];
  const dynamic = def.dynamic === true;
  for (const locale of locales) {
    const variants = [def.slugs[locale], ...(def.aliases?.[locale] ?? [])];
    for (const slug of variants) {
      reverseIndex.set(`${locale}:${slug}`, { key, dynamic });
      const segments = slug === '' ? 0 : slug.split('/').length;
      if (segments > maxSlugSegments) maxSlugSegments = segments;
    }
  }
}

export interface ResolvedRoute {
  key: RouteKey;
  /** Locale the incoming path belonged to. */
  locale: Locale;
  /** Untranslated remainder below a dynamic parent (`''` when there is none). */
  rest: string;
}

/** Split a pathname into its locale and the slug segments below it. */
function splitLocale(pathname: string): { locale: Locale; segments: string[] } {
  const segments = pathname.split('/').filter(Boolean);
  if (segments[0] === 'en' || segments[0] === 'it') {
    return { locale: segments[0], segments: segments.slice(1) };
  }
  return { locale: defaultLocale, segments };
}

/**
 * Reverse lookup: a live pathname → the canonical route key it belongs to.
 * Returns `null` for anything not in the registry — callers must handle that
 * rather than falling back to naive prefixing.
 */
export function resolveRoute(pathname: string): ResolvedRoute | null {
  const { locale, segments } = splitLocale(pathname);

  if (segments.length === 0) {
    return { key: '/', locale, rest: '' };
  }

  // Longest match first, so `/servicii/meta-ads` wins over `/servicii`.
  const upper = Math.min(segments.length, maxSlugSegments);
  for (let take = upper; take >= 1; take--) {
    const hit = reverseIndex.get(`${locale}:${segments.slice(0, take).join('/')}`);
    if (!hit) continue;
    const rest = segments.slice(take).join('/');
    // Only a dynamic parent may carry extra segments.
    if (rest !== '' && !hit.dynamic) return null;
    return { key: hit.key, locale, rest };
  }

  return null;
}

/** The slug a route key uses in a given locale. */
export function routeSlug(key: RouteKey, locale: Locale): string {
  return routes[key].slugs[locale];
}

/** Whether a key is a registered route (runtime guard for untyped input). */
export function isRouteKey(value: string): value is RouteKey {
  return Object.prototype.hasOwnProperty.call(routes, value);
}
