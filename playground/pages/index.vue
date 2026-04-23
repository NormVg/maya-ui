<template>
  <div>
    <div class="hero">
      <div class="hero-badge">
        <MayaBadge variant="outline">v0.1.0</MayaBadge>
      </div>
      <h1 class="hero-title">Maya UI</h1>
      <p class="hero-subtitle">
        A premium component library for Nuxt — dark-first, zero dependencies, pure CSS tokens.
      </p>
      <div class="hero-actions">
        <MayaBtn variant="primary" size="md" @click="$router.push('/install')">Get Started</MayaBtn>
        <MayaBtn variant="secondary" size="md" @click="$router.push('/components/button')">Browse Components</MayaBtn>
      </div>
    </div>

    <MayaSeparator />

    <div class="features">
      <div class="feature-grid">
        <MayaCard v-for="feature in features" :key="feature.title">
          <template #header>
            <span class="feature-title">{{ feature.title }}</span>
          </template>
          <template #default>
            <p class="feature-desc">{{ feature.desc }}</p>
          </template>
        </MayaCard>
      </div>
    </div>

    <MayaSeparator />

    <div class="quick-start">
      <h2 class="section-title">Quick Start</h2>
      <MayaInlineCode code="pnpm add -D maya-ui" lang="bash" />
      <div style="margin-top: 16px;">
        <MayaCodeBlock filename="nuxt.config.ts" lang="typescript" :code="configCode" />
      </div>
    </div>

    <MayaSeparator />

    <div class="component-list">
      <h2 class="section-title">What's Included</h2>
      <MayaProse :content="componentListMd" />
    </div>
  </div>
</template>

<script setup>
definePageMeta({ layout: 'landing' })

const features = [
  {
    title: 'Dark-First Design',
    desc: 'Every component is designed for dark mode first, with a polished light mode counterpart.',
  },
  {
    title: 'Pure CSS Tokens',
    desc: 'No Tailwind, no utility classes — just clean CSS custom properties you can override.',
  },
  {
    title: 'Auto-Imported',
    desc: 'Register the Nuxt module and every component is available globally. No manual imports needed.',
  },
  {
    title: 'Semantic Intent',
    desc: 'Success, warning, danger, info — all components speak the same semantic color language.',
  },
  {
    title: 'Bouncy Motion',
    desc: 'Spring-based animations on every interactive element — buttons, toggles, checkboxes.',
  },
  {
    title: 'View Transitions',
    desc: 'Built-in theme toggle with Document View Transition API for cinematic dark/light switches.',
  },
]

const configCode = `export default defineNuxtConfig({
  modules: ['maya-ui'],
})`

const componentListMd = `### Buttons & Controls
- **MayaBtn** — Primary, secondary, ghost with semantic intent
- **MayaSwitch** — iOS-style toggle with spring animation
- **MayaToggle** / **MayaToggleGroup** — Pressable selection buttons

### Inputs
- **MayaInput** — Text input with focus ring
- **MayaTextarea** — Multi-line text input
- **MayaCheckbox** — Bouncy animated checkmark

### Containers
- **MayaCard** — Surface with header/content/footer slots
- **MayaBadge** — Solid, soft, outline chip with semantic colors
- **MayaAvatar** / **MayaAvatarGroup** — Image, initials, status dot
- **MayaTable** — Clean data table

### Base UI
- **MayaLabel** — Accessible form label with required indicator
- **MayaSeparator** — Horizontal/vertical divider
- **MayaKbd** — Keyboard shortcut display

### Code & Prose
- **MayaCodeBlock** — Shiki-highlighted multi-line code
- **MayaInlineCode** — Copyable one-liner
- **MayaProse** — Markdown renderer with syntax highlighting

### Loaders
- **MayaSpinner** — SVG animated ring
- **MayaSkeleton** — Shimmer placeholder
- **MayaLoadingDots** — Bouncing dots`
</script>

<style scoped>
.hero {
  text-align: center;
  padding: 80px 0 56px;
}

.hero-badge {
  margin-bottom: 20px;
}

.hero-title {
  font-size: 3.5rem;
  font-weight: 700;
  letter-spacing: -0.045em;
  margin-bottom: 14px;
  background: linear-gradient(135deg, var(--maya-text-primary) 0%, var(--maya-text-muted) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.hero-subtitle {
  font-size: 1.0625rem;
  color: var(--maya-text-secondary);
  max-width: 440px;
  margin: 0 auto 32px;
  line-height: 1.65;
}

.hero-actions {
  display: flex;
  gap: 10px;
  justify-content: center;
}

.features {
  padding: 48px 0;
}

.feature-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
}

.feature-title {
  font-size: 0.8125rem;
  font-weight: 500;
}

.feature-desc {
  font-size: 0.8125rem;
  color: var(--maya-text-secondary);
  line-height: 1.6;
  margin: 0;
}

.quick-start {
  padding: 48px 0;
}

.section-title {
  font-size: 1.125rem;
  font-weight: 600;
  letter-spacing: -0.02em;
  margin-bottom: 20px;
}

.component-list {
  padding: 48px 0 20px;
}

@media (max-width: 768px) {
  .hero {
    padding: 40px 0 32px;
  }
  .hero-title {
    font-size: 2.5rem;
  }
  .hero-actions {
    flex-direction: column;
    align-items: stretch;
    padding: 0 40px;
  }
  .feature-grid {
    grid-template-columns: 1fr;
  }
}
</style>
