<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue'

const scrollY = ref(0)
const handleScroll = () => {
  scrollY.value = window.scrollY
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll, { passive: true })
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})

const parallaxStyle = computed(() => ({
  transform: `translate3d(0, ${scrollY.value * 0.2}px, 0)`,
  opacity: Math.max(0, 1 - scrollY.value / 700)
}))

const bgParallaxStyle = computed(() => ({
  transform: `translate3d(0, ${scrollY.value * 0.5}px, 0)`
}))
</script>

<template>
  <section class="hero-section">
    <!-- Full bleed shader background with parallax -->
    <div class="shader-bg" :style="bgParallaxStyle">
      <MayaDitherShader
        shape="warp"
        type="4x4"
        :size="3"
        :speed="0.15"
        :scale="1.2"
        :themeAware="true"
        colorFront="#1d4ed8"
        colorBack="#030712"
        colorFrontLight="#93c5fd"
        colorBackLight="#f8fafc"
      />
    </div>

    <!-- Soft radial vignette so text is readable without a solid white overlay -->
    <div class="shader-vignette"></div>

    <div class="hero-container" :style="parallaxStyle">
      <div class="hero-content">
        <div class="hero-install-wrap">
          <MayaInlineCode code="pnpm add -D @thenormvg/maya-ui" lang="bash" :copyable="true" />
        </div>

        <h1 class="hero-title">Build interfaces<br/>that feel alive.</h1>

        <p class="hero-subtitle">
          97+ premium Nuxt components with spring physics, dark-first tokens,
          and zero config. Just install and build.
        </p>

        <div class="hero-actions">
          <MayaBtn variant="primary" size="lg" @click="$router.push('/install')">
            Get Started
            <template #suffix>
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
            </template>
          </MayaBtn>
          <MayaBtn variant="outline" size="lg" @click="$router.push('/components/button')">
            Browse Components
          </MayaBtn>
        </div>

        <div class="hero-github-links">
          <a href="https://github.com/TheAlphaOnes/maya-ui" target="_blank" rel="noopener" class="gh-link">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
            Star on GitHub
          </a>
          <a href="https://github.com/TheAlphaOnes/maya-ui/issues/new" target="_blank" rel="noopener" class="gh-link">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
            Open an Issue
          </a>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.hero-section {
  position: relative;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 120px 32px 100px;
  overflow: hidden;
}

.shader-bg {
  position: absolute;
  inset: 0;
  z-index: 0;
  opacity: 1;
}

.hero-container {
  position: relative;
  z-index: 10;
  max-width: 800px;
  margin: 0 auto;
  width: 100%;
  text-align: center;
}

.hero-content {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.hero-install-wrap {
  margin-bottom: 32px;
  animation: fadeUp 0.6s ease-out forwards;
  opacity: 0;
}

.hero-title {
  font-size: clamp(3.5rem, 8vw, 5.5rem);
  font-weight: 800;
  letter-spacing: -0.04em;
  line-height: 1.05;
  margin: 0 0 24px;
  color: var(--maya-text-primary);
  animation: fadeUp 0.6s ease-out 0.08s forwards;
  opacity: 0;
}

.hero-subtitle {
  font-size: clamp(1.125rem, 2vw, 1.25rem);
  color: var(--maya-text-secondary);
  max-width: 540px;
  margin: 0 0 40px;
  line-height: 1.6;
  animation: fadeUp 0.6s ease-out 0.16s forwards;
  opacity: 0;
}

.hero-actions {
  display: flex;
  justify-content: center;
  gap: 16px;
  animation: fadeUp 0.6s ease-out 0.24s forwards;
  opacity: 0;
}

.hero-github-links {
  display: flex;
  justify-content: center;
  gap: 24px;
  margin-top: 40px;
  animation: fadeUp 0.6s ease-out 0.32s forwards;
  opacity: 0;
}

.gh-link {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--maya-text-secondary);
  text-decoration: none;
  transition: color 0.2s ease;
}

.gh-link:hover {
  color: var(--maya-text-primary);
}

@keyframes fadeUp {
  from { opacity: 0; transform: translateY(20px); }
  to   { opacity: 1; transform: translateY(0); }
}

@media (max-width: 600px) {
  .hero-actions {
    flex-direction: column;
    width: 100%;
  }
  .hero-actions > * {
    width: 100%;
  }
}
</style>
