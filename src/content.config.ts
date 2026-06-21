import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const stories = defineCollection({
  loader: glob({
    base: './src/content/stories',
    pattern: '**/*.{md,mdx}',
  }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    type: z.string(),
    category: z.string(),
    platform: z.enum(['ebay', 'local', 'direct']),
    outcome: z.enum(['scammed', 'safe', 'declined']),
    outcomeLabel: z.string().optional(),
    result: z.enum(['scammed', 'avoided']),
    date: z.date(),
    redFlags: z.array(z.string()),
    sources: z.array(z.object({
      title: z.string(),
      url: z.string().url().optional(),
    })).min(1),
    pinned: z.boolean().default(false),
    draft: z.boolean().default(false),
    whatToDo: z.string(),
  }),
});

export const collections = {
  stories,
};
