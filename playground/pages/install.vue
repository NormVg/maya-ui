<template>
  <div>
    <div class="component-header">
      <h2 class="component-title">Installation</h2>
      <p class="component-desc">Get up and running with Maya UI.</p>
    </div>

    <div class="install-steps">
      <div class="step">
        <h3>1. Install the package</h3>
        <div class="code-block">
          <code>pnpm add -D maya-ui</code>
        </div>
      </div>

      <div class="step">
        <h3>2. Add to nuxt.config.ts</h3>
        <div class="code-block">
          <pre><code>export default defineNuxtConfig({
  modules: ['maya-ui']
})</code></pre>
        </div>
      </div>

      <div class="step">
        <h3>3. Use components</h3>
        <p>All Maya UI components are auto-imported. Start using them directly in your templates.</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.install-steps {
  max-width: 560px;
}

.step {
  margin-bottom: 32px;
}

.step h3 {
  font-size: 0.875rem;
  font-weight: 500;
  margin-bottom: 10px;
}

.step p {
  color: var(--text-secondary);
  font-size: 0.8125rem;
  line-height: 1.6;
}

.code-block {
  background: var(--bg-surface);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-md);
  padding: 14px 18px;
  font-family: var(--font-mono);
  font-size: 0.8125rem;
  color: var(--text-secondary);
  overflow-x: auto;
}

.code-block pre {
  margin: 0;
}

.code-block code {
  font-family: inherit;
}
</style>
