<template>
  <section class="features-section">
    <div class="section-container">
      <p class="section-kicker">Why Maya UI</p>
      <h2 class="section-title">Everything you need.<br/>Nothing you don't.</h2>

      <div class="feature-grid">
        <MayaCard v-for="feature in features" :key="feature.title" class="feature-card">
          <template #header>
            <div class="feature-icon-box">
              <component :is="feature.icon" :size="18" />
            </div>
          </template>
          <template #default>
            <h3 class="feature-title">{{ feature.title }}</h3>
            <p class="feature-desc">{{ feature.desc }}</p>
          </template>
        </MayaCard>
      </div>
    </div>
  </section>
</template>

<script setup>
import { PaletteIcon, PackageIcon, ShieldCheckIcon, MoonStarIcon, ActivityIcon, Wand2Icon } from 'lucide-vue-next'

const features = [
  {
    icon: ActivityIcon,
    title: 'Spring Motion',
    desc: 'Every toggle, button, and overlay uses fluid spring physics — never CSS easing.',
  },
  {
    icon: PaletteIcon,
    title: 'CSS Tokens',
    desc: 'Pure CSS variables. No Tailwind, no PostCSS plugins. Override anything in one line.',
  },
  {
    icon: PackageIcon,
    title: 'Auto-Imports',
    desc: '97+ components and composables, auto-imported. Zero boilerplate.',
  },
  {
    icon: ShieldCheckIcon,
    title: 'Semantic Intent',
    desc: 'success, warning, danger, info — baked into every interactive component.',
  },
  {
    icon: MoonStarIcon,
    title: 'Dark-First',
    desc: 'Designed for dark mode first, then polished for light. Never an afterthought.',
  },
  {
    icon: Wand2Icon,
    title: 'View Transitions',
    desc: 'Native Document View Transition API for cinematic theme switches.',
  },
]
</script>

<style scoped>
.features-section {
  padding: 100px 0;
  background: var(--maya-bg-base);
}

.section-container {
  max-width: 1120px;
  margin: 0 auto;
  padding: 0 32px;
}

.section-kicker {
  font-size: 0.8125rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--maya-info);
  margin: 0 0 12px;
}

.section-title {
  font-size: clamp(2rem, 4vw, 2.75rem);
  font-weight: 700;
  letter-spacing: -0.03em;
  line-height: 1.1;
  margin: 0 0 24px;
  color: var(--maya-text-primary);
}

.features-section .section-kicker,
.features-section .section-title {
  text-align: center;
}

.feature-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  margin-top: 48px;
}

.feature-card {
  transition: transform 0.25s ease, border-color 0.25s ease;
}

.feature-card:hover {
  transform: translateY(-3px);
  border-color: var(--maya-border-hover);
}

.feature-icon-box {
  width: 36px;
  height: 36px;
  border-radius: 8px;
  background: var(--maya-bg-surface);
  border: 1px solid var(--maya-border);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--maya-text-primary);
}

.feature-title {
  font-size: 1rem;
  font-weight: 600;
  margin: 0 0 6px;
  letter-spacing: -0.01em;
}

.feature-desc {
  font-size: 0.875rem;
  color: var(--maya-text-secondary);
  line-height: 1.55;
  margin: 0;
}

@media (max-width: 900px) {
  .feature-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 600px) {
  .feature-grid {
    grid-template-columns: 1fr;
  }
}
</style>
