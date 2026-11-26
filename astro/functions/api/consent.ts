/**
 * POST /api/consent — jurnal de consimțământ (dovada cerută de Legea 506/2004 art. 4,
 * așa cum a fost modificată prin Legea nr. 219/2026). Cloudflare Pages Function.
 *
 * Browserul trimite (sendBeacon, din CookieConsent.astro) la fiecare alegere din banner:
 *   { id, choice: { analytics, marketing }, bannerVersion, policyVersion, path, locale }
 * Serverul adaugă momentul (ora serverului, nu a browserului) și țara (Cloudflare `cf.country`)
 * și salvează înregistrarea în KV. NU se stochează IP-ul, user-agent-ul sau altceva care
 * identifică direct persoana: `id` e un identificator aleator generat în browser și păstrat
 * în localStorage (`byg-consent-id`), deci o înregistrare se poate lega doar de browserul
 * care o deține.
 *
 * Stocare: binding KV `CONSENT_LOG` (Cloudflare → Pages → Settings → Bindings). Cheia:
 *   consent:<YYYY-MM-DD>:<id>:<epoch ms>
 * Păstrare: 3 ani (`RETENTION_SECONDS`), termenul general de prescripție — cât timp firma
 * poate fi nevoită să dovedească un consimțământ.
 *
 * Răspuns: 204 la succes; 400 la corp invalid. Dacă lipsește binding-ul sau KV
 * eșuează, răspunde tot 204 și loghează `[consent] …` (alegerea vizitatorului se aplică
 * oricum în browser; jurnalul nu are voie să blocheze site-ul).
 */

interface KV {
  put(key: string, value: string, options?: { expirationTtl?: number }): Promise<void>;
}

export interface Env {
  CONSENT_LOG?: KV;
}

interface Ctx {
  request: Request & { cf?: { country?: string } };
  env: Env;
}

const RETENTION_SECONDS = 3 * 365 * 24 * 60 * 60;
const ID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
const VERSION_RE = /^[\w.-]{1,32}$/;

const noContent = (): Response => new Response(null, { status: 204, headers: { 'Cache-Control': 'no-store' } });
const bad = (): Response =>
  new Response(JSON.stringify({ code: 'bad_request' }), {
    status: 400,
    headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' },
  });

export const onRequestPost = async ({ request, env }: Ctx): Promise<Response> => {
  let body: Record<string, unknown>;
  try {
    const text = await request.text();
    if (text.length > 1024) return bad();
    body = JSON.parse(text) as Record<string, unknown>;
  } catch {
    return bad();
  }

  const { id, choice, bannerVersion, policyVersion, path, locale } = body;
  if (typeof id !== 'string' || !ID_RE.test(id)) return bad();
  if (!choice || typeof choice !== 'object') return bad();
  const { analytics, marketing } = choice as Record<string, unknown>;
  if (typeof analytics !== 'boolean' || typeof marketing !== 'boolean') return bad();
  if (typeof bannerVersion !== 'string' || !VERSION_RE.test(bannerVersion)) return bad();
  if (typeof policyVersion !== 'string' || !VERSION_RE.test(policyVersion)) return bad();
  const safePath = typeof path === 'string' && path.startsWith('/') ? path.slice(0, 200) : null;

  const now = new Date();
  const record = {
    id,
    analytics,
    marketing,
    timestamp: now.toISOString(),
    bannerVersion,
    policyVersion,
    path: safePath,
    locale: locale === 'ro' || locale === 'en' || locale === 'it' ? locale : null,
    country: request.cf?.country ?? null,
  };

  const kv = env.CONSENT_LOG;
  if (!kv) {
    console.error('[consent] config_missing: CONSENT_LOG (binding KV)');
    return noContent();
  }
  try {
    const key = `consent:${record.timestamp.slice(0, 10)}:${id}:${now.getTime()}`;
    await kv.put(key, JSON.stringify(record), { expirationTtl: RETENTION_SECONDS });
  } catch (err) {
    console.error('[consent] KV indisponibil:', err instanceof Error ? err.message : String(err));
  }
  return noContent();
};
