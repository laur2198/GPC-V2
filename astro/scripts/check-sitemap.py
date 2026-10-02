#!/usr/bin/env python3
"""Validate hreflang in the built sitemap against the pages themselves.

Parses dist/sitemap-0.xml and checks every <url>: that its xhtml:link
alternates resolve to real pages, that they match the <link rel="alternate">
set the page emits in its own <head>, and that every cluster is reciprocal.
Exits 1 on any non-conformity.

Usage: python3 scripts/check-sitemap.py [dist-dir]   (default: ./dist)
Run after `npm run build`.
"""

import re
import sys
import xml.etree.ElementTree as ET
from collections import Counter
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import urlsplit

SITE = 'https://greenpheonixconcept.com'
NS = {'sm': 'http://www.sitemaps.org/schemas/sitemap/0.9', 'xhtml': 'http://www.w3.org/1999/xhtml'}
BLOG_ARTICLE = re.compile(r'^/(?:(?:en|it)/)?blog/[^/]+/$')


class HeadAlternates(HTMLParser):
    def __init__(self):
        super().__init__()
        self.alternates = []

    def handle_starttag(self, tag, attrs):
        a = dict(attrs)
        if tag == 'link' and 'alternate' in (a.get('rel') or '').lower().split() and a.get('hreflang'):
            self.alternates.append((a['hreflang'], a.get('href') or ''))


def page_file(dist: Path, url: str) -> Path | None:
    if not url.startswith(SITE):
        return None
    path = urlsplit(url).path or '/'
    target = dist / path.lstrip('/')
    if path.endswith('/'):
        target = target / 'index.html'
    return target if target.is_file() else None


def head_alternates(dist: Path, url: str):
    f = page_file(dist, url)
    if f is None:
        return None
    parser = HeadAlternates()
    parser.feed(f.read_text(encoding='utf-8'))
    return sorted(parser.alternates)


def main() -> int:
    dist = Path(sys.argv[1] if len(sys.argv) > 1 else 'dist').resolve()
    sitemap = dist / 'sitemap-0.xml'
    if not sitemap.is_file():
        print(f'check-sitemap: {sitemap} not found. Run `npm run build` first.')
        return 1

    entries = {}  # loc -> [(hreflang, href)]
    for url in ET.parse(sitemap).getroot().findall('sm:url', NS):
        loc = url.findtext('sm:loc', namespaces=NS)
        entries[loc] = [
            (link.get('hreflang'), link.get('href'))
            for link in url.findall('xhtml:link', NS)
            if link.get('rel') == 'alternate'
        ]

    links = [(loc, lang, href) for loc, ls in entries.items() for lang, href in ls]
    by_kind = Counter('x-default' if lang == 'x-default' else 'ro/en/it' for _, lang, _ in links)
    broken = [(loc, lang, href) for loc, lang, href in links if page_file(dist, href) is None]
    broken_locs = [loc for loc in entries if page_file(dist, loc) is None]

    # Parity: the sitemap must say exactly what each page says in its head.
    divergent = []
    for loc, ls in entries.items():
        head = head_alternates(dist, loc)
        if head is not None and head != sorted(ls):
            divergent.append((loc, sorted(ls), head))
    blog = [loc for loc in entries if BLOG_ARTICLE.match(urlsplit(loc).path)]
    blog_divergent = [d for d in divergent if d[0] in blog]

    # Reciprocity: every URL a cluster names must be in the sitemap and
    # carry the identical cluster.
    cluster = lambda ls: frozenset((l, h) for l, h in ls if l != 'x-default')
    reciprocity = []
    for loc, ls in entries.items():
        for lang, href in ls:
            if lang == 'x-default' or href == loc:
                continue
            if href not in entries or cluster(entries[href]) != cluster(ls):
                reciprocity.append((loc, lang, href))
    clusters = {cluster(ls) for ls in entries.values() if ls}
    blog_clusters = {cluster(entries[loc]) for loc in blog if entries[loc]}

    rows = [
        ('sitemap <url> entries', len(entries)),
        ('<loc> not resolving to a page', len(broken_locs)),
        ('xhtml:link ro/en/it', by_kind['ro/en/it']),
        ('xhtml:link x-default', by_kind['x-default']),
        ('xhtml:link total', len(links)),
        ('xhtml:link resolving to file', len(links) - len(broken)),
        ('xhtml:link BROKEN', len(broken)),
        ('parity sitemap<->head (all URLs)', f'{len(entries) - len(divergent)}/{len(entries)}'),
        ('parity sitemap<->head (blog articles)', f'{len(blog) - len(blog_divergent)}/{len(blog)}'),
        ('clusters (all / blog)', f'{len(clusters)} / {len(blog_clusters)}'),
        ('reciprocity violations', len(reciprocity)),
    ]
    width = max(len(label) for label, _ in rows)
    for label, value in rows:
        print(f'{label:<{width}} : {value}')

    failed = False
    for loc in broken_locs:
        failed = True
        print(f'  LOC NOT FOUND: {loc}')
    for item in broken:
        failed = True
        print(f'  BROKEN: {item}')
    for loc, sm, head in divergent:
        failed = True
        print(f'  DIVERGENT: {loc}\n    sitemap: {sm}\n    head:    {head}')
    for item in reciprocity:
        failed = True
        print(f'  RECIPROCITY: {item}')
    return 1 if failed else 0


if __name__ == '__main__':
    sys.exit(main())
