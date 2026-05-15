export default defineNuxtConfig({
  modules: ['../src/module', '@nuxtjs/seo'],
  devtools: { enabled: true },
  compatibilityDate: 'latest',
  css: ['~/assets/css/main.css'],
  mayaUi: {},
  site: {
    url: 'https://ui.taohq.org/', // Placeholder URL
    name: 'Maya UI',
    description: 'A premium, highly customizable Vue & Nuxt component library.',
    defaultLocale: 'en',
  },
  ogImage: {
    defaults: {
      width: 1200,
      height: 630,
      cacheMaxAgeSeconds: 60 * 60 * 24 * 7,
    },
  },
  app: {
    pageTransition: { name: 'page', mode: 'out-in' },
    layoutTransition: { name: 'layout', mode: 'out-in' },
  },
})
