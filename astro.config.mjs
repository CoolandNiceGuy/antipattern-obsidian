import { defineConfig } from 'astro/config';
import { getFormattedPermaLinks, slugify } from './src/js/utils';
import react from "@astrojs/react";
const permalinks = getFormattedPermaLinks('./src/content/blog');

// https://astro.build/config
export default defineConfig({
  markdown: {
    remarkPlugins: [['remark-wiki-link', {
      hrefTemplate: permalink => `${permalink}`,
      pageResolver: name => [slugify(name)],
      aliasDivider: '|',
      permalinks: permalinks
    }]]
  },
  integrations: [react()]
});