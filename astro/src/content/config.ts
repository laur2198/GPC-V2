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

const metric = z.object({
  value: z.string(),
  label: z.string(),
  context: z.string().optional(),
});

const caseStudies = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    client: z.string(),
    industry: z.string(),
    services: z.array(z.string()).default([]),
    // Legacy field — kept optional for backwards compatibility.
    duration: z.string().optional(),
    heroImage: z.string().optional(),
    // Legacy KPI list — superseded by heroMetric/secondaryMetrics.
    results: z
      .array(
        z.object({
          metric: z.string(),
          value: z.string(),
        })
      )
      .default([]),
    language: language.default('ro'),
    anonymized: z.boolean().default(false),
    draft: z.boolean().default(false),
    publishDate: z.coerce.date().optional(),

    // Rich case-study fields (Etapa 3 Part 1.5).
    slug: z.string().optional(),
    location: z.string().optional(),
    status: z.string().optional(),
    period: z.string().optional(),
    website: z.string().optional(),
    order: z.number().optional(),
    featured: z.boolean().optional(),
    heroMetric: metric.optional(),
    secondaryMetrics: z.array(metric).optional(),
    testimonial: z
      .object({
        quote: z.string(),
        author: z.string(),
        role: z.string().optional(),
      })
      .optional(),
    images: z
      .object({
        hero: z.string().optional(),
        plugin: z.string().optional(),
        showroom: z.string().optional(),
        adi: z.string().optional(),
        sensei: z.string().optional(),
        beforeAfter: z.string().optional(),
      })
      .optional(),
  }),
});

export const collections = { blog, caseStudies };
