// 1. Import utilities from `astro:content`
import { defineCollection, z } from 'astro:content';
// 2. Define collection
const blogCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    tags: z.array(z.string()),
  }),
});

export const collections = {
  'blog': blogCollection,
};