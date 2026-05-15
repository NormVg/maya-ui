<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup>
const site = useSiteConfig()

useSeoMeta({
  title: 'Maya UI — Premium Nuxt Component Library',
  description: 'A premium, highly customizable Vue & Nuxt component library built for speed and aesthetics.',
  ogType: 'website',
  twitterCard: 'summary_large_image',
})

defineOgImage('OgImageMaya', {
  title: 'Maya UI',
  description: 'A premium, highly customizable Vue & Nuxt component library.',
})

useSchemaOrg([
  defineOrganization({
    name: 'Maya UI',
    url: site.url,
    logo: '/favicon.ico',
    sameAs: [
      'https://github.com/NormVg/maya-ui',
    ],
  }),
  defineWebSite({
    name: site.name,
    description: site.description,
  }),
])
</script>
