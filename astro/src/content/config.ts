import { defineCollection, z } from 'astro:content';

const language = z.enum(['ro', 'en', 'it']);

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    publishDate: z.coerce.date(),
    author: z.string(),
    category: z.string(),
    tags: z.array(z.string()).default([]),
    heroImage: z.string().optional(),
    language,
    draft: z.boolean().default(false),
  }),
});

const caseStudies = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    client: z.string(),
    industry: z.string(),
    services: z.array(z.string()).default([]),
    duration: z.string(),
    heroImage: z.string().optional(),
    results: z
      .array(
        z.object({
          metric: z.string(),
          value: z.string(),
        })
      )
      .default([]),
    language,
    anonymized: z.boolean().default(false),
    draft: z.boolean().default(false),
    publishDate: z.coerce.date().optional(),
  }),
});

export const collections = { blog, caseStudies };
