---
title: "Cum calculezi ROAS-ul corect (și de ce platformele te mint)"
description: "Ghid pragmatic pentru calcularea ROAS-ului real în 2026: blended view, tracking server-side, GA4 vs Meta vs Google și ce să faci când datele nu se potrivesc."
publishDate: 2026-04-22
author: "Laurențiu Bogdan"
category: "Performance Marketing"
tags: ["roas", "tracking", "ga4", "meta-ads"]
heroImage: "/og-ads.jpg"
language: "ro"
---

## ROAS-ul "din platformă" e o iluzie

Dacă ai deschis Meta Ads Manager azi și ai văzut un ROAS de 4.5x, te-ai bucurat. Apoi ai deschis Google Ads și ai văzut 6.2x. Apoi ai deschis Shopify-ul — și total revenue real e mai mic decât suma celor două. Bun venit în era post-iOS 14, unde fiecare platformă atribuie generos pentru sine.

În articolul ăsta îți arăt cum să calculezi ROAS-ul real, nu cel din dashboard-uri.

## Blended ROAS = singurul ROAS care contează

Formula:

```
Blended ROAS = Total revenue (din shop) / Total spend (toate platformele)
```

Acesta e numărul pe care îl raportezi investitorilor și pe care iei decizii de buget. Tot restul e *attribution noise*.

## Server-side tracking nu e opțional

În 2026, dacă nu trimiți evenimente prin Meta CAPI și Google Enhanced Conversions, pierzi între 15% și 40% din signal pe iOS și pe browseri cu ITP. Setup-ul corect:

- **Meta**: pixel + CAPI prin Stape sau implementare custom Cloudflare Worker.
- **Google**: GA4 + Enhanced Conversions + Consent Mode v2.
- **TikTok**: Pixel + Events API + Advanced Matching.

## Când datele nu se potrivesc

Nu se vor potrivi niciodată 100%. Acceptabil: discrepanță 10-15% între platforme și GA4. Dacă e mai mult, ai un setup rupt.

Pași de debug:
1. Verifică deduplicarea pe `event_id`.
2. Confirmă că `purchase` se trimite o singură dată.
3. Asigură-te că `value` și `currency` sunt setate consistent.
4. Verifică Consent Mode dacă userul e în EU.

## Concluzie

ROAS-ul corect e un proces, nu un număr. Setup-ul tehnic, nu creative-ul, e diferența între o agenție bună și una excelentă.
