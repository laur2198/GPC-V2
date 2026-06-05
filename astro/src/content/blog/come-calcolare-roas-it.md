---
title: "Come calcolare il ROAS in modo corretto (e perché le piattaforme ti mentono)"
slug: "come-calcolare-roas"
description: "Guida pragmatica al calcolo del ROAS reale nel 2026: blended view, tracking server-side, GA4 vs Meta vs Google e cosa fare quando i dati non coincidono."
publishDate: 2026-04-22
author: "Laurențiu Bogdan"
category: "Performance Marketing"
tags: ["roas", "tracking", "ga4", "meta-ads"]
heroImage: "/og/blog/come-calcolare-roas.png"
language: "it"
---

## Il ROAS "in piattaforma" è un'illusione

Se oggi hai aperto Meta Ads Manager e hai visto un ROAS di 4.5x, hai festeggiato. Poi hai aperto Google Ads e hai visto 6.2x. Poi hai aperto Shopify — e il fatturato totale reale è inferiore alla somma dei due. Benvenuto nell'era post-iOS 14, dove ogni piattaforma si attribuisce risultati con generosità.

In questo articolo ti mostro come calcolare il ROAS reale, non quello dei dashboard.

## Blended ROAS = l'unico ROAS che conta

La formula:

```
Blended ROAS = Fatturato totale (dallo shop) / Spesa totale (tutte le piattaforme)
```

Questo è il numero che riporti agli investitori e su cui prendi decisioni di budget. Tutto il resto è *attribution noise*.

## Il tracking server-side non è opzionale

Nel 2026, se non invii eventi tramite Meta CAPI e Google Enhanced Conversions, perdi tra il 15% e il 40% del segnale su iOS e sui browser con ITP. Setup corretto:

- **Meta**: pixel + CAPI tramite Stape o implementazione custom su Cloudflare Worker.
- **Google**: GA4 + Enhanced Conversions + Consent Mode v2.
- **TikTok**: Pixel + Events API + Advanced Matching.

## Quando i dati non coincidono

Non coincideranno mai al 100%. Accettabile: discrepanza del 10-15% tra piattaforme e GA4. Se è di più, hai un setup rotto.

Step di debug:
1. Verifica la deduplicazione su `event_id`.
2. Conferma che `purchase` venga inviato una sola volta.
3. Assicurati che `value` e `currency` siano impostati in modo coerente.
4. Controlla il Consent Mode se l'utente è in UE.

## Conclusione

Il ROAS corretto è un processo, non un numero. Il setup tecnico, non il creative, è la differenza tra un'agenzia buona e una eccellente.
