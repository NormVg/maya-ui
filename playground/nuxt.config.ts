export default defineNuxtConfig({
  modules: ['../src/module', '@nuxtjs/seo'],
  devtools: { enabled: true },
  compatibilityDate: 'latest',
  css: ['~/assets/css/main.css'],
  mayaUi: {},

  site: {
    url: process.env.NUXT_SITE_URL || 'https://ui.taohq.org',
    name: 'Maya UI',
    description: 'A premium, highly customizable Vue & Nuxt component library.',
    defaultLocale: 'en',
    indexable: true,
  },

  // Robots — full access
  robots: {
    blockAiBots: false,
    blockNonSeoBots: false,
  },

  // Sitemap
  sitemap: {
    zeroRuntime: true,
  },

  // OG Image — dynamic via nuxt-og-image
  ogImage: {
    defaults: {
      width: 1200,
      height: 630,
      cacheMaxAgeSeconds: 60 * 60 * 24 * 7, // 7 days
    },
  },

  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      htmlAttrs: { lang: 'en' },
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      ],
    },
    pageTransition: { name: 'page', mode: 'out-in' },
    layoutTransition: { name: 'layout', mode: 'out-in' },
  },
})
