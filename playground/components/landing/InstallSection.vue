<template>
  <section class="install-section">
    <div class="section-container">
      <div class="install-grid">
        <div class="install-text">
          <p class="section-kicker">Setup</p>
          <h2 class="section-title" style="text-align: left;">Zero config.<br/>One line install.</h2>
          <p class="install-desc">Maya UI ships as a native Nuxt module. Auto-imported components, CSS tokens, composables — everything just works.</p>

          <ul class="check-list">
            <li>
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
              97+ auto-imported components
            </li>
            <li>
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
              Pure CSS variable theming
            </li>
            <li>
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
              Dark mode out of the box
            </li>
          </ul>
        </div>
        <div class="install-code">
          <div style="margin-bottom: 16px;">
            <MayaInlineCode code="pnpm add -D @thenormvg/maya-ui" lang="bash" :copyable="true" />
          </div>
          <MayaCodeBlock filename="nuxt.config.ts" lang="typescript" :code="configCode" />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const configCode = `export default defineNuxtConfig({
  modules: ['@thenormvg/maya-ui'],
})`
</script>

<style scoped>
.install-section {
  padding: 100px 0;
  background: var(--maya-bg-surface);
  border-top: 1px solid var(--maya-border);
  border-bottom: 1px solid var(--maya-border);
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

.install-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 64px;
  align-items: center;
}

.install-desc {
  font-size: 1rem;
  color: var(--maya-text-secondary);
  line-height: 1.6;
  margin: 0 0 28px;
}

.check-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.check-list li {
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 0.9375rem;
  color: var(--maya-text-primary);
}

.check-list svg {
  color: var(--maya-info);
}

.install-code {
  background: var(--maya-bg-root);
  border: 1px solid var(--maya-border);
  border-radius: 16px;
  padding: 24px;
  box-shadow: var(--maya-shadow-md);
}

@media (max-width: 900px) {
  .install-grid {
    grid-template-columns: 1fr;
    gap: 40px;
  }
}
</style>
