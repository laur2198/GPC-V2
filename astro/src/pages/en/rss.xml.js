import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

export async function GET(context) {
  const showDrafts = import.meta.env.DEV;
  const posts = (await getCollection('blog', ({ data }) => data.language === 'en' && (showDrafts || !data.draft)))
    .sort((a, b) => b.data.publishDate.getTime() - a.data.publishDate.getTime());

  return rss({
    title: 'Green Pheonix Concept — Blog',
    description: 'Pragmatic articles on performance marketing, web and analytics — no jargon.',
    site: context.site,
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.publishDate,
      link: `/en/blog/${post.slug}/`,
      categories: [post.data.category, ...post.data.tags],
      author: post.data.author,
    })),
    customData: '<language>en-US</language>',
  });
}
