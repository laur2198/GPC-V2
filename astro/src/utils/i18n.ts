import ro from '../i18n/ro.json';
import en from '../i18n/en.json';
import it from '../i18n/it.json';
import {
  type Locale,
  type RouteKey,
  type RoutePathInput,
  defaultLocale,
  locales,
  resolveRoute,
  routeSlug,
} from '../i18n/routes';

export type { Locale, RouteKey, RoutePathInput };
export type { ServiceSlug, DynamicRoutePath, LegalDocKey } from '../i18n/routes';
export { defaultLocale, locales, legalRouteKeys, routes, routeKeys } from '../i18n/routes';

export const localeLabels: Record<Locale, string> = {
  ro: 'RO',
  en: 'EN',
  it: 'IT',
};

const dictionaries = { ro, en, it } as const;

export type Dictionary = typeof ro;

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale] ?? dictionaries[defaultLocale];
}

export function getLocaleFromUrl(url: URL | string): Locale {
  const pathname = typeof url === 'string' ? url : url.pathname;
  const segment = pathname.split('/').filter(Boolean)[0];
  if (segment === 'en' || segment === 'it') return segment;
  return defaultLocale;
}

/**
 * Warn once per unresolved path. Fires during `astro build`, so a route that
 * was added to `src/pages/` but never registered shows up in build output
 * instead of silently producing a wrong link.
 */
const warned = new Set<string>();
function warnUnregistered(context: string, value: string): void {
  const signature = `${context}:${value}`;
  if (warned.has(signature)) return;
  warned.add(signature);
  console.warn(
    `[i18n] ${context}: "${value}" is not in the route registry (src/i18n/routes.ts). ` +
      `Falling back to the target locale homepage — register the route to fix this.`
  );
}

/**
 * Compose a public path from a locale + registry slug (+ untranslated
 * remainder for dynamic routes).
 *
 * `trailingSlash` is explicit rather than always-on: it reproduces the
 * existing link shape exactly (nav links render without a trailing slash,
 * hreflang alternates inherit the slash from `Astro.url.pathname`).
 */
function composePath(locale: Locale, slug: string, rest: string, trailingSlash: boolean): string {
  const full = rest ? (slug ? `${slug}/${rest}` : rest) : slug;
  if (full === '') return locale === defaultLocale ? '/' : `/${locale}/`;
  const base = locale === defaultLocale ? `/${full}` : `/${locale}/${full}`;
  return trailingSlash ? `${base}/` : base;
}

/** Homepage of a locale — the fallback whenever a route cannot be resolved. */
function localeHome(locale: Locale, trailingSlash = false): string {
  return composePath(locale, '', '', trailingSlash);
}

/**
 * Canonical Romanian path → the equivalent path in `locale`.
 *
 * Signature is unchanged from the pre-registry helper: callers pass the RO
 * path (`localizedPath(locale, '/servicii')`) or a dynamic path whose child
 * segment is a content slug (`localizedPath(locale, `/blog/${post.slug}`)`).
 * Resolution is a registry lookup, not string concatenation.
 */
export function localizedPath(locale: Locale, path: RoutePathInput): string {
  const clean = path.startsWith('/') ? path : `/${path}`;
  const resolved = resolveRoute(clean);
  if (!resolved) {
    warnUnregistered('localizedPath', clean);
    return localeHome(locale);
  }
  return composePath(locale, routeSlug(resolved.key, locale), resolved.rest, false);
}

/** Path of a route key in a locale, when the key is already known. */
export function routePath(locale: Locale, key: RouteKey, trailingSlash = false): string {
  return composePath(locale, routeSlug(key, locale), '', trailingSlash);
}

/**
 * The current URL's equivalent in another locale.
 *
 * Reverse-resolves the live pathname to its registry key, then re-composes it
 * with the target locale's slug. Content slugs below a dynamic parent
 * (`/blog/<post>`, `/portofoliu/<case-study>`) are carried through unchanged.
 * An unregistered path falls back to the target locale's homepage — never to
 * a blindly re-prefixed path, which is what used to produce 404 alternates.
 */
export function switchLocalePath(currentUrl: URL, target: Locale): string {
  const pathname = currentUrl.pathname;
  const trailingSlash = pathname.endsWith('/');
  const resolved = resolveRoute(pathname);
  if (!resolved) {
    warnUnregistered('switchLocalePath', pathname);
    return localeHome(target, trailingSlash);
  }
  return composePath(target, routeSlug(resolved.key, target), resolved.rest, trailingSlash);
}

/**
 * Per-locale paths for one registry key, for pages whose alternates are known
 * statically rather than derived from the current URL.
 *
 * `trailingSlash` defaults to `false` to match the link shape these pages
 * already emit. See the note in `composePath` — the site's internal links and
 * the hardcoded alternates it replaced both omit the trailing slash, while
 * `trailingSlash: 'always'` means the served URL has one. Normalising that is
 * a deliberate follow-up, not part of this refactor.
 */
export function routeAlternates(key: RouteKey, trailingSlash = false): Record<Locale, string> {
  return Object.fromEntries(
    locales.map((l) => [l, routePath(l, key, trailingSlash)])
  ) as Record<Locale, string>;
}

/** Per-locale alternates for the current URL, used for hreflang + the switcher. */
export function localeAlternates(
  currentUrl: URL,
  overrides?: Partial<Record<Locale, string>>
): Record<Locale, string> {
  return Object.fromEntries(
    locales.map((l) => [l, overrides?.[l] ?? switchLocalePath(currentUrl, l)])
  ) as Record<Locale, string>;
}

export function t<T = unknown>(locale: Locale, key: string): T {
  const dict = getDictionary(locale) as unknown as Record<string, unknown>;
  const parts = key.split('.');
  let cur: unknown = dict;
  for (const p of parts) {
    if (cur && typeof cur === 'object' && p in (cur as Record<string, unknown>)) {
      cur = (cur as Record<string, unknown>)[p];
    } else {
      return key as unknown as T;
    }
  }
  return cur as T;
}
