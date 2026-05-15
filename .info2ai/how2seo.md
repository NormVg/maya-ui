# TaoHQ SEO & Dynamic OG Image Guide

This document explains how SEO, Open Graph (OG) tags, and dynamic social images are handled in the TaoHQ codebase using the **Nuxt SEO** suite.

## 1. Core Stack
The project utilizes the `@nuxtjs/seo` module, which is a meta-module encompassing several sub-modules:
- **Nuxt OG Image**: Generates dynamic social share images using Satori (HTML/CSS to SVG/PNG).
- **Nuxt Site Config**: Manages global site metadata.
- **Nuxt Robots**: Handles `robots.txt` and search engine indexing rules.
- **Nuxt Sitemap**: Generates the XML sitemap.
- **Nuxt Schema.org**: Handles structured data for rich search results.

---

## 2. Configuration (`nuxt.config.ts`)
The primary configuration lives in the `site` and `ogImage` blocks:

```typescript
site: {
  url: 'https://www.taohq.org',
  name: 'TheAlphaOnes',
  description: '...',
  defaultLocale: 'en',
},
ogImage: {
  defaults: {
    width: 1200,
    height: 630,
    // Cached for 7 days
    cacheMaxAgeSeconds: 60 * 60 * 24 * 7,
  },
}
```

---

## 3. Global Meta Tags (`app.vue`)
The site-wide SEO metadata is defined using the `useSeoMeta` composable:

```typescript
useSeoMeta({
  title: 'TheAlphaOnes — Thoughtful Software, Systems & Lifestyle Products',
  description: '...',
  ogType: 'website',
  twitterCard: 'summary_large_image',
})
```

---

## 4. Dynamic OG Images
Images are generated dynamically using Vue components rendered as SVGs via Satori.

### Triggering the Image
In `app.vue`, the `defineOgImage` function is called to specify which template to use and what data to pass:

```typescript
defineOgImage('OgImageDefault', {
  title: 'Building thoughtful software, systems, and lifestyle products.',
  description: 'An independent umbrella organisation...',
})
```

### The Template (`app/components/OgImage/OgImageDefault.satori.vue`)
This is a specialized Vue component that uses **inline styles** (required by Satori). It mirrors the brand's aesthetic:
- **Background**: Black (`#000`).
- **Visuals**: Includes the "riser bars" from the site footer to maintain brand consistency.
- **Dynamic Content**: Uses `defineProps` to accept the `title` and `description` passed from `defineOgImage`.

---

## 5. Structured Data (Schema.org)
Structured data is implemented in `app.vue` to help search engines understand the organization and website:

```typescript
useSchemaOrg([
  defineOrganization({
    name: 'TheAlphaOnes',
    url: site.url,
    logo: `${site.url}/favicon.ico`,
    sameAs: [
      'https://github.com/thealphaones',
      'https://twitter.com/thealphaones',
    ],
  }),
  defineWebSite({
    name: site.name,
    description: site.description,
  }),
])
```

---

## 6. How it works at Runtime
1. **Request**: When a social platform (Twitter, Slack, etc.) scrapes the URL.
2. **HTML Generation**: Nuxt generates the meta tags, including `<meta property="og:image" content="/__og-image__/image/og.png">`.
3. **Image Request**: When the platform requests that image URL, Nuxt invokes the `OgImageDefault.satori.vue` component.
4. **Satori Rendering**: Satori converts the Vue template's HTML/CSS into an SVG, which is then converted to a PNG and served to the platform.
5. **Caching**: The generated image is cached according to the `cacheMaxAgeSeconds` setting in `nuxt.config.ts`.
