<template>
  <div>
    <div class="hero">
      <div class="hero-badge">
        <MayaBadge variant="outline" intent="info">Maya UI v1.0.0</MayaBadge>
      </div>
      <h1 class="hero-title">A highly crafted,<br />premium component library.</h1>
      <p class="hero-subtitle">
        Highly opinionated on motion and structure, completely unopinionated on styling mechanisms. Dark-first, pure CSS tokens, engineered for Nuxt.
      </p>
      <div class="hero-actions">
        <MayaBtn variant="primary" size="md" @click="$router.push('/install')">
          Get Started
        </MayaBtn>
        <MayaBtn variant="secondary" size="md" @click="$router.push('/components/button')">
          Browse 40+ Components
        </MayaBtn>
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
      <h2 class="section-title">Quick Installation</h2>
      <MayaInlineCode code="pnpm add -D maya-ui" lang="bash" />
      <div style="margin-top: 16px;">
        <MayaCodeBlock filename="nuxt.config.ts" lang="typescript" :code="configCode" />
      </div>
    </div>

    <MayaSeparator />

    <div class="component-list">
      <h2 class="section-title">The Ecosystem</h2>
      <MayaProse :content="componentListMd" />
    </div>
  </div>
</template>

<script setup>
definePageMeta({ layout: 'landing' })

const features = [
  {
    title: 'State-of-the-art Motion',
    desc: 'Fluid, spring-based interactions on buttons, switches, toggles, and overlays.',
  },
  {
    title: 'Pure CSS Tokens',
    desc: 'No Tailwind config overhead. The theme strictly relies on standard CSS variables.',
  },
  {
    title: 'Nuxt Auto-Imports',
    desc: 'Zero repetitive import statements. All 40+ components are automatically available.',
  },
  {
    title: 'Semantic Intent',
    desc: 'Built-in success, warning, danger, and info intents across all interactive elements.',
  },
  {
    title: 'Dark-First Structure',
    desc: 'Every component is crafted for dark mode first, with a meticulously polished light counterpart.',
  },
  {
    title: 'Cinematic Transitions',
    desc: 'Built-in toggle using the native Document View Transition API for instant circular reveals.',
  },
]

const configCode = `export default defineNuxtConfig({
  modules: ['maya-ui'],
})`

const componentListMd = `### Controls & Inputs
- **MayaBtn**, **MayaToggle**, **MayaSwitch** — Interactive triggers with spring physics
- **MayaInput**, **MayaNumberField**, **MayaInputOtp** — Standard and composite forms
- **MayaCheckbox**, **MayaSelect**, **MayaCombobox** — Selection utilities

### Layouts & Containers
- **MayaCard**, **MayaBadge**, **MayaAvatar**, **MayaTable** — Core structural blocks
- **MayaScrollArea**, **MayaResizable**, **MayaSheet** — Advanced dimensional containers
- **MayaField**, **MayaLabel** — Accessible form framing

### Navigation & Menus
- **MayaBreadcrumb**, **MayaMenubar**, **MayaSidebar** — Wayfinding components
- **MayaDropdownMenu**, **MayaContextMenu** — Contextual overlays

### Feedback & Overlays
- **MayaAlert**, **MayaBanner**, **MayaToast**, **MayaSonner** — Real-time notification stacks
- **MayaSpinner**, **MayaSkeleton**, **MayaPixelLoader** — State indicators

### Code Documentation
- **MayaCodeBlock**, **MayaInlineCode**, **MayaProse** — Developer-centric formatting`
</script>

<style scoped>
.hero {
  text-align: center;
  padding: 80px 0 56px;
}

.hero-badge {
  margin-bottom: 24px;
}

.hero-title {
  font-size: 3.8rem;
  font-weight: 700;
  letter-spacing: -0.04em;
  margin-bottom: 18px;
  line-height: 1.1;
  background: linear-gradient(135deg, var(--maya-text-primary) 0%, var(--maya-text-secondary) 100%);
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
