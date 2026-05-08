import ro from '../i18n/ro.json';
import en from '../i18n/en.json';
import it from '../i18n/it.json';

export type Locale = 'ro' | 'en' | 'it';

export const defaultLocale: Locale = 'ro';
export const locales: Locale[] = ['ro', 'en', 'it'];

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

export function localizedPath(locale: Locale, path: string): string {
  const clean = path.startsWith('/') ? path : `/${path}`;
  if (locale === defaultLocale) return clean === '/' ? '/' : clean;
  return clean === '/' ? `/${locale}/` : `/${locale}${clean}`;
}

export function t(locale: Locale, key: string): string {
  const dict = getDictionary(locale) as unknown as Record<string, unknown>;
  const parts = key.split('.');
  let cur: unknown = dict;
  for (const p of parts) {
    if (cur && typeof cur === 'object' && p in (cur as Record<string, unknown>)) {
      cur = (cur as Record<string, unknown>)[p];
    } else {
      return key;
    }
  }
  return typeof cur === 'string' ? cur : key;
}
