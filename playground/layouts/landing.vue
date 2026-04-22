<template>
  <div class="landing-layout">
    <header class="landing-topbar">
      <NuxtLink to="/" class="landing-logo">Maya UI</NuxtLink>
      <nav class="landing-nav">
        <NuxtLink to="/install" class="landing-nav-link">Docs</NuxtLink>
        <NuxtLink to="/components/button" class="landing-nav-link">Components</NuxtLink>
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
  background: var(--maya-bg-root);
  position: sticky;
  top: 0;
  z-index: 10;
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
  max-width: 860px;
  width: 100%;
  margin: 0 auto;
  padding: 0 40px 80px;
}
</style>
