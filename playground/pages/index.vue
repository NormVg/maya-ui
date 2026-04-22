<template>
  <div>
    <div class="component-header">
      <h2 class="component-title">Introduction</h2>
      <p class="component-desc">A premium component library for Nuxt, built with vanilla CSS.</p>
    </div>

    <div class="intro-section">
      <p>
        Maya UI provides beautiful, accessible components out of the box.
        Dark mode first, zero external CSS dependencies — just clean,
        composable Vue components designed for modern interfaces.
      </p>

      <h3>Features</h3>
      <ul>
        <li>Dark-first design with Vercel-inspired aesthetics</li>
        <li>Pure vanilla CSS — no Tailwind dependency</li>
        <li>Fully responsive and accessible</li>
        <li>Tree-shakeable Nuxt module</li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.intro-section {
  max-width: 560px;
}

.intro-section p {
  color: var(--text-secondary);
  font-size: 0.875rem;
  line-height: 1.7;
  margin-bottom: 32px;
}

.intro-section h3 {
  font-size: 0.875rem;
  font-weight: 500;
  margin-bottom: 12px;
}

.intro-section ul {
  list-style: none;
  padding: 0;
}

.intro-section li {
  color: var(--text-secondary);
  font-size: 0.8125rem;
  padding: 6px 0;
  border-bottom: 1px solid var(--border-color);
}

.intro-section li:last-child {
  border-bottom: none;
}
</style>
