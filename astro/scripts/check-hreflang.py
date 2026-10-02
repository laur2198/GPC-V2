#!/usr/bin/env python3
"""Validate on-page hreflang alternates in the built site.

Scans every dist/**/*.html and checks the <link rel="alternate" hreflang>
set each page emits against its canonical and against the other pages.
Exits 1 on any non-conformity, so it can gate a build or a push.

Usage: python3 scripts/check-hreflang.py [dist-dir]   (default: ./dist)
Run after `npm run build`.
"""

import sys
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import urlsplit

SITE = 'https://greenpheonixconcept.com'


class HeadLinks(HTMLParser):
    """Collect canonical and hreflang alternates, in any attribute order."""

    def __init__(self):
        super().__init__()
        self.canonical = None
        self.alternates = []  # [(hreflang, href)]

    def handle_starttag(self, tag, attrs):
        if tag != 'link':
            return
        a = dict(attrs)
        rel = (a.get('rel') or '').lower().split()
        if 'canonical' in rel and self.canonical is None:
            self.canonical = a.get('href')
        if 'alternate' in rel and a.get('hreflang'):
            self.alternates.append((a['hreflang'], a.get('href') or ''))


def page_file(dist: Path, url: str) -> Path | None:
    """The file in dist that serves a same-site URL, or None if there is none."""
    if not url.startswith(SITE):
        return None
    path = urlsplit(url).path or '/'
    target = dist / path.lstrip('/')
    if path.endswith('/'):
        target = target / 'index.html'
    return target if target.is_file() else None


def page_url(dist: Path, file: Path) -> str:
    rel = file.relative_to(dist).as_posix()
    if rel.endswith('index.html'):
        rel = rel[: -len('index.html')]
    return f'{SITE}/{rel}'


def main() -> int:
    dist = Path(sys.argv[1] if len(sys.argv) > 1 else 'dist').resolve()
    files = sorted(dist.rglob('*.html'))
    if not files:
        print(f'check-hreflang: no HTML found under {dist}. Run `npm run build` first.')
        return 1

    pages = {}  # url -> HeadLinks
    for f in files:
        parser = HeadLinks()
        parser.feed(f.read_text(encoding='utf-8'))
        pages[page_url(dist, f)] = parser

    emitting = {u: p for u, p in pages.items() if p.alternates}
    all_alternates = [(u, lang, href) for u, p in emitting.items() for lang, href in p.alternates]

    broken = [(u, lang, href) for u, lang, href in all_alternates if page_file(dist, href) is None]
    no_slash = [(u, lang, href) for u, lang, href in all_alternates if not urlsplit(href).path.endswith('/')]
    # x-default is left out of both checks below: it points at the RO page, so
    # counting it would let a page "list itself" or "link back" through it.
    lang_hrefs = lambda page: {h for l, h in page.alternates if l != 'x-default'}
    canonical_missing = [(u, p.canonical) for u, p in emitting.items() if p.canonical not in lang_hrefs(p)]
    no_x_default = [u for u, p in emitting.items() if not any(l == 'x-default' for l, _ in p.alternates)]

    # Reciprocity: every page a page names as an alternate must name it back.
    # Read by canonical, since that is the URL other pages point at.
    by_canonical = {p.canonical: p for p in emitting.values() if p.canonical}
    reciprocity = []
    for u, p in emitting.items():
        for lang, href in p.alternates:
            if lang == 'x-default' or href == p.canonical or page_file(dist, href) is None:
                continue
            target = by_canonical.get(href)
            back = lang_hrefs(target) if target else set()
            if p.canonical not in back:
                reciprocity.append((u, lang, href))

    rows = [
        ('HTML pages scanned', len(pages)),
        ('pages emitting alternates', len(emitting)),
        ('alternates emitted (total)', len(all_alternates)),
        ('alternates resolving to file', len(all_alternates) - len(broken)),
        ('alternates BROKEN', len(broken)),
        ('alternates without trailing slash', len(no_slash)),
        ('pages whose canonical is NOT among its own alternates', len(canonical_missing)),
        ('reciprocity violations', len(reciprocity)),
        ('pages emitting alternates but no x-default', len(no_x_default)),
    ]
    width = max(len(label) for label, _ in rows)
    for label, value in rows:
        print(f'{label:<{width}} : {value}')

    problems = [
        ('BROKEN', broken),
        ('NO TRAILING SLASH', no_slash),
        ('CANONICAL MISSING', canonical_missing),
        ('RECIPROCITY', reciprocity),
        ('NO X-DEFAULT', no_x_default),
    ]
    failed = False
    for name, items in problems:
        for item in items:
            failed = True
            print(f'  {name}: {item}')
    return 1 if failed else 0


if __name__ == '__main__':
    sys.exit(main())
