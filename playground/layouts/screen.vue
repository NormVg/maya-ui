<template>
  <div class="screen-layout">
    <slot />

    <!-- Floating pill to escape back to docs -->
    <NuxtLink to="/" class="screen-back-pill">
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"
        stroke-linecap="round" stroke-linejoin="round">
        <polyline points="15 18 9 12 15 6" />
      </svg>
      Back to docs
    </NuxtLink>
  </div>
</template>

<style scoped>
.screen-layout {
  position: fixed;
  inset: 0;
  display: flex;
  overflow: hidden;
  background: var(--maya-bg-root);
  font-family: var(--maya-font-sans);
}

.screen-back-pill {
  position: fixed;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 9999;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 8px 16px;
  background: var(--maya-bg-surface);
  border: 1px solid var(--maya-border);
  border-radius: 99px;
  font-size: 0.8125rem;
  font-weight: 500;
  color: var(--maya-text-secondary);
  text-decoration: none;
  box-shadow:
    0 0 0 1px rgba(255, 255, 255, 0.04),
    0 4px 20px rgba(0, 0, 0, 0.35);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  transition: all 150ms cubic-bezier(0.19, 1, 0.22, 1);
  white-space: nowrap;
}

.screen-back-pill:hover {
  color: var(--maya-text-primary);
  background: var(--maya-bg-raised);
  transform: translateX(-50%) translateY(-2px);
  box-shadow:
    0 0 0 1px rgba(255, 255, 255, 0.06),
    0 8px 28px rgba(0, 0, 0, 0.4);
}

.screen-back-pill:active {
  transform: translateX(-50%) scale(0.97);
  transition: transform 80ms ease;
}
</style>
