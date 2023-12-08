---
tags:
  - Astro
  - Obsidian
  - Software-Engineering
  - Public
date: " 2023-12-08"
title: Using Obsidian as a CMS
---

## Scripting
I need to write a script that will:
>  Copy all all notes tagged `Public` from my Obsidian vault into the `blog` directory in `antipattern-obsidian`

### Copy the files from Vault to Astro project
`cp` is the command for copying files/directories in unix. It can be used with flags and [[Regular Expressions]] to perform complex copying actions.

Example: `cp -u *.txt newdir` 
The above example is all that is needed to:
- Copy all the files in current directory that end with `.txt`
- Paste those files to `newdir` location
- Only copy the files that have changed since last time with `-u` flag

I am going to combine the `cp` command to copy the output from my `grep` search into my `blog` directory inside my Astro project.

> Note: when writing scripts, remember to give them execution permissions with
>  `chmod +x file_name`

### Make sure we only publish `public` notes
In order to make sure I'm only publishing notes that I've tagged as `Public`, I need to a regex to use with the `grep` command.
```zsh
"- Public$"
```
This pattern will work perfectly for parsing through my Obsidian frontmatter.

### Putting it all together
[This post from StackOverflow](https://stackoverflow.com/questions/18724826/how-to-pass-find-results-to-cp-such-that-file-names-with-spaces-work) was the perfect template for what I'm trying to do:

````bash
find . -name \*.pdf -exec cp --parents {} /new_path/ \;
````

With some small tweaks to the provided answer, Im able to copy all the `Public` tagged files from my Obsidian vault into my Astro `blog` directory
```zsh
find . -type f -exec grep -le "- Public$" {} \; -exec cp {} $astro_posts_path \;
```

---
## Building the Astro site
Thanks to [[Using Markdown with Astro|Astro's extensive built-in markdown capabilities]], it's the perfect framework to use for publishing content from Obsidian.

### Configuring Astro's markdown interpreter
This ended up being an absolute rabbit-hole to figure out. No example that I found online showed how to pass in config overrides to Astro's remark plugin.  I ended up using the
[remark-wiki-link](https://github.com/landakram/remark-wiki-link/tree/master) to add support for Obsidian's markdown format in my astro project.

`astro.config.mjs`
```javascript
import { defineConfig } from 'astro/config';

export default defineConfig({
  markdown: {
    remarkPlugins: [
      ['remark-wiki-link', 
      {
        hrefTemplate: (permalink) => `${permalink}`, 
        pageResolver: (name) => [name.replace(/ /g, '-').toLowerCase()],
        aliasDivider: '|'
      }],
    ]
  }
});
```

The default behavior for `remark-wiki-link` didn't work out of the box with the way my project was structured, so I needed to find a way to pass in config overrides. 
- `hrefTemplate`: controls the href `src` prop for all generated wiki links. I wanted to make sure they were formatted in the right way to point to my other markdown files.
- `pageResolver`: formats the links used in `hrefTemplate`, in order for this to work with Astro's built in slug format, I had to make sure it changed spaces to `-` rather than `_`
- `aliasDivider`: Astro's wikilink syntax allows you to use an alias for links using the `|` character, this character needs to be defined here in order to support that in Astro.

### Defining a `blog` content collection
Luckily, blogging with Astro is a common use case and using [[Astro Content collections |content collections]] to type-check my blog post markdown files ended up being very straight-forward. All I had to do was: 
- Create a `content` folder within my `src` directory
- Create a `config.js` file within that `content` folder
- Define the shape of the blog frontmatter in the `config.js` file
```javascript
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
```
- Create a folder named `blog` within my `content` directory
- Move all the post markdown files into the `blog` folder

### Implementing site-wide search
https://www.youtube.com/watch?v=v79VRrfVau8
https://pagefind.app/

1. Install the pagefind dependency
`npm i -D pagefind`

2. Next, we need to add these tags to the `<head>` of our site:
```html
<link href="/pagefind/pagefind-ui.css" rel="stylesheet">
<script src="/pagefind/pagefind-ui.js" is:inline></script>
```
> Note: `/pagefind/pagefind-ui.css` and `/pagefind/pagefind-ui.css` will not exist when you first add these tags. They are generated after pagefind successfully indexes your site.> 

3. Define where you want your search bar to appear
`index.astro`
```html
<div id="search"></div>
<script>
	window.addEventListener('DOMContentLoaded', (event) => {
		new PagefindUI({ element: "#search", showSubResults: true });
	});
</script>
```
> Note: typescript will show an error saying that it cannot find `PagefindUI`. This error can be ignored with a comment `// @ts-ignore` as the `PagefindUI` module will be defined once the head of our site is build.

4. Update build script to also index your site for pagefind to search: 
```
"build": "astro build && pagefind --site dist && cp -r dist/pagefind public/"
```
> Adding the copy command at the end allows you to use pagefind when in dev mode. Otherwise it would only be accessible when running an astro build from your `dist` folder

## Use Github as a CDN with Statically
https://statically.io/

## Configuring Obsidian

### Creating  public post template
[[Public]]
### Adding a script shortcut to publish my public notes