---
title: "How to calculate ROAS correctly (and why platforms lie to you)"
slug: "calculate-roas-correctly"
description: "A pragmatic guide to calculating real ROAS in 2026: blended view, server-side tracking, GA4 vs Meta vs Google, and what to do when the numbers don't match."
publishDate: 2026-04-22
author: "Laurențiu Bogdan"
category: "Performance Marketing"
tags: ["roas", "tracking", "ga4", "meta-ads"]
heroImage: "/og/blog/calculate-roas-correctly.png"
language: "en"
---

## "In-platform" ROAS is an illusion

If you opened Meta Ads Manager today and saw a 4.5x ROAS, you cheered. Then you opened Google Ads and saw 6.2x. Then you opened your Shopify — and the actual total revenue is lower than the sum of the two. Welcome to the post-iOS 14 era, where every platform attributes generously to itself.

In this article I'll show you how to calculate real ROAS, not the dashboard one.

## Blended ROAS = the only ROAS that matters

The formula:

```
Blended ROAS = Total revenue (from shop) / Total spend (all platforms)
```

This is the number you report to investors and the number you use for budget decisions. Everything else is *attribution noise*.

## Server-side tracking is not optional

In 2026, if you don't send events through Meta CAPI and Google Enhanced Conversions, you lose between 15% and 40% of signal on iOS and ITP-blocking browsers. Proper setup:

- **Meta**: pixel + CAPI via Stape or a custom Cloudflare Worker.
- **Google**: GA4 + Enhanced Conversions + Consent Mode v2.
- **TikTok**: Pixel + Events API + Advanced Matching.

## When the data doesn't match

It will never match 100%. Acceptable: 10-15% discrepancy between platforms and GA4. More than that, you have a broken setup.

Debug steps:
1. Verify deduplication on `event_id`.
2. Confirm `purchase` fires only once.
3. Make sure `value` and `currency` are set consistently.
4. Check Consent Mode if the user is in EU.

## Conclusion

Correct ROAS is a process, not a number. Technical setup, not creative, is the difference between a good agency and a great one.
