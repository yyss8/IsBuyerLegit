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
    platform: z.enum(['ebay', 'local']),
    outcome: z.enum(['scammed', 'safe']),
    date: z.date(),
    redFlags: z.array(z.string()),
    draft: z.boolean().default(false),
    whatToDo: z.string(),
  }),
});

export const collections = {
  stories,
};
