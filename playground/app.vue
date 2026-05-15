<script setup lang="ts">
useSeoMeta({
  title: 'Maya UI — Premium Nuxt Component Library',
  description: 'A premium, highly customizable Vue & Nuxt component library built for speed and aesthetics. Dark-first, pure CSS tokens, engineered for Nuxt.',
  ogTitle: 'Maya UI — Premium Nuxt Component Library',
  ogDescription: 'A premium, highly customizable Vue & Nuxt component library built for speed and aesthetics.',
  ogImage: 'https://ui.taohq.org/og-image.png',
  ogUrl: 'https://ui.taohq.org',
  ogType: 'website',
  twitterCard: 'summary_large_image',
  twitterTitle: 'Maya UI — Premium Nuxt Component Library',
  twitterDescription: 'A premium, highly customizable Vue & Nuxt component library built for speed and aesthetics.',
  twitterImage: 'https://ui.taohq.org/og-image.png',
})

useHead({
  link: [
    { rel: 'icon', href: '/favicon.svg', type: 'image/svg+xml' },
    { rel: 'icon', href: '/favicon.ico', sizes: '32x32' }
  ]
})
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
