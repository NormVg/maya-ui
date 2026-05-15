<template>
  <div class="landing-page">
    <LandingHeroSection />
    <LandingFeaturesSection />
    <LandingInstallSection />
    <LandingFooterSection />
  </div>
</template>

<script setup>
definePageMeta({ layout: 'landing' })

useSeoMeta({
  title: 'Maya UI — Premium Nuxt Component Library',
  description: '97+ premium Nuxt components with spring physics, dark-first tokens, and zero config.',
})
</script>

<style scoped>
.landing-page {
  display: flex;
  flex-direction: column;
}
</style>
