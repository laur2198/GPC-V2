/**
 * Legal document routes — the one map of which URL holds which legal document
 * in which language. Legal slugs differ per locale (privacy-policy vs
 * informativa-privacy), so the same-slug locale swap can't pair them; this map
 * does.
 *
 * Plain JS, like blog-clusters.mjs: LegalDoc.astro reads it for the page head
 * and language switcher, and the sitemap serializer in astro.config.mjs reads
 * it for xhtml:link. Paths are root-relative, in canonical trailing-slash form.
 */

export const LEGAL_PATHS = {
  privacy: { ro: '/politica-confidentialitate/', en: '/en/privacy-policy/', it: '/it/informativa-privacy/' },
  terms: { ro: '/termeni-conditii/', en: '/en/terms-of-service/', it: '/it/termini-condizioni/' },
  cookies: { ro: '/politica-cookies/', en: '/en/cookie-policy/', it: '/it/politica-cookies/' },
};

/**
 * The cluster ({ locale: path }) of the legal document served at `pathname`,
 * matched on the exact path, or undefined when the path is not a legal page.
 */
export function legalClusterFor(pathname) {
  return Object.values(LEGAL_PATHS).find((cluster) => Object.values(cluster).includes(pathname));
}
