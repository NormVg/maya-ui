<template>
  <div class="landing-layout">
    <header class="landing-topbar">
      <NuxtLink to="/" class="landing-logo">Maya UI</NuxtLink>
      <nav class="landing-nav">
        <NuxtLink to="/install" class="landing-nav-link">Docs</NuxtLink>
        <NuxtLink to="/components/button" class="landing-nav-link">Components</NuxtLink>
        <a href="https://github.com/TheAlphaOnes/maya-ui" target="_blank" class="landing-nav-link">GitHub</a>
        <MayaThemeToggle />
      </nav>
    </header>
    <main class="landing-main">
      <slot />
    </main>
  </div>
</template>

<style scoped>
.landing-layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.landing-topbar {
  height: 52px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 40px;
  border-bottom: 1px dashed var(--maya-dash-color);
  background: var(--maya-bg-topbar);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  transition: background-color 0.2s ease;
}

.landing-logo {
  font-size: 0.875rem;
  font-weight: 600;
  letter-spacing: -0.01em;
  color: var(--maya-text-primary);
  text-decoration: none;
}

.landing-nav {
  display: flex;
  align-items: center;
  gap: 20px;
}

.landing-nav-link {
  font-size: 0.8125rem;
  color: var(--maya-text-secondary);
  text-decoration: none;
  transition: color var(--maya-duration) var(--maya-ease);
}

.landing-nav-link:hover {
  color: var(--maya-text-primary);
}

.landing-main {
  flex: 1;
}

@media (max-width: 768px) {
  .landing-topbar {
    padding: 0 20px;
  }
}
</style>
