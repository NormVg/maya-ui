<script>
export default { layout: 'screen' }
</script>

<template>
  <div class="demo-root">
    <!-- Sidebar -->
    <MayaSidebar>
      <template #header>
        <div class="brand">
          <div class="brand-icon">M</div>
          <span class="brand-name">Maya UI</span>
        </div>
      </template>

      <div class="nav-section">
        <p class="nav-label">Navigation</p>
        <nav-link icon="grid" label="Dashboard" :active="activePage === 'dashboard'"
          @click="activePage = 'dashboard'" />
        <nav-link icon="bar-chart" label="Analytics" :active="activePage === 'analytics'"
          @click="activePage = 'analytics'" />
        <nav-link icon="users" label="Team" :active="activePage === 'team'" @click="activePage = 'team'" />
        <nav-link icon="folder" label="Projects" :active="activePage === 'projects'" @click="activePage = 'projects'" />
      </div>

      <div class="nav-section">
        <p class="nav-label">Settings</p>
        <nav-link icon="settings" label="Preferences" :active="activePage === 'prefs'" @click="activePage = 'prefs'" />
        <nav-link icon="shield" label="Security" :active="activePage === 'security'" @click="activePage = 'security'" />
      </div>

      <template #footer>
        <div class="sidebar-footer-user">
          <MayaAvatar initials="VN" size="sm" />
          <div class="user-info">
            <span class="user-name">Vishnu N.</span>
            <span class="user-role">Admin</span>
          </div>
        </div>
      </template>
    </MayaSidebar>

    <!-- Main body -->
    <div class="demo-body">
      <MayaTopbar>
        <template #left>
          <span class="page-title">{{ pageTitles[activePage] }}</span>
        </template>
        <template #center>
          <div class="topbar-search">
            <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2"
              stroke-linecap="round" stroke-linejoin="round">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input placeholder="Search..." class="search-input" />
            <MayaKbd>⌘K</MayaKbd>
          </div>
        </template>
        <template #right>
          <MayaBtn variant="ghost" size="sm">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"
              stroke-linecap="round" stroke-linejoin="round">
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
              <path d="M13.73 21a2 2 0 0 1-3.46 0" />
            </svg>
          </MayaBtn>
          <MayaAvatar initials="VN" size="sm" />
        </template>
      </MayaTopbar>

      <div class="demo-content">
        <Transition name="demo-fade" mode="out-in">
          <div :key="activePage" class="page-panel">
            <h2 class="panel-title">{{ pageTitles[activePage] }}</h2>
            <p class="panel-desc">This is the <strong>{{ pageTitles[activePage] }}</strong> view. The Sidebar and Topbar
              components are fully functional — navigate using the sidebar links.</p>
            <div class="placeholder-grid">
              <div class="placeholder-card" v-for="i in 6" :key="i" />
            </div>
          </div>
        </Transition>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, defineComponent, h } from 'vue'

const activePage = ref('dashboard')
const pageTitles = {
  dashboard: 'Dashboard',
  analytics: 'Analytics',
  team: 'Team',
  projects: 'Projects',
  prefs: 'Preferences',
  security: 'Security',
}

// Inline nav link component
const NavLink = defineComponent({
  props: ['icon', 'label', 'active'],
  emits: ['click'],
  setup(props, { emit }) {
    const icons = {
      grid: 'M3 3h7v7H3zM14 3h7v7h-7zM3 14h7v7H3zM14 14h7v7h-7z',
      'bar-chart': 'M18 20V10M12 20V4M6 20v-6',
      users: 'M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75',
      folder: 'M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z',
      settings: 'M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z',
      shield: 'M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z',
    }
    return () => h('button', {
      class: ['nav-link', { 'nav-link--active': props.active }],
      onClick: () => emit('click'),
    }, [
      h('svg', { viewBox: '0 0 24 24', width: 16, height: 16, fill: 'none', stroke: 'currentColor', 'stroke-width': '2', 'stroke-linecap': 'round', 'stroke-linejoin': 'round' },
        [h('path', { d: icons[props.icon] })]
      ),
      h('span', {}, props.label),
    ])
  }
})
</script>

<style scoped>
.demo-root {
  display: flex;
  height: 100vh;
  overflow: hidden;
}

.demo-body {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

/* Brand slot */
.brand {
  display: flex;
  align-items: center;
  gap: 10px;
}

.brand-icon {
  width: 28px;
  height: 28px;
  background: var(--maya-text-primary);
  color: var(--maya-bg-root);
  border-radius: var(--maya-radius-sm);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.875rem;
  font-weight: 700;
  flex-shrink: 0;
}

.brand-name {
  font-weight: 600;
  font-size: 0.9375rem;
  color: var(--maya-text-primary);
}

/* Nav sections */
.nav-section {
  margin-bottom: 20px;
}

.nav-label {
  font-size: 0.6875rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: var(--maya-text-muted);
  margin: 0 0 6px 8px;
}

/* Nav links (from inline component) */
:deep(.nav-link) {
  position: relative;
  display: flex;
  align-items: center;
  gap: 10px;
  width: 100%;
  padding: 7px 10px;
  border: none;
  background: transparent;
  border-radius: var(--maya-radius-sm);
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--maya-text-muted);
  cursor: pointer;
  text-align: left;
  transition: color 120ms cubic-bezier(0.19, 1, 0.22, 1);
  font-family: var(--maya-font-sans);
}

:deep(.nav-link::before) {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: inherit;
  background: var(--maya-text-primary);
  opacity: 0;
  transform: scale(0.96);
  transition: opacity 120ms ease, transform 120ms ease;
}

:deep(.nav-link:hover::before) {
  opacity: 0.06;
  transform: scale(1);
}

:deep(.nav-link:hover) {
  color: var(--maya-text-primary);
}

:deep(.nav-link--active) {
  color: var(--maya-text-primary);
}

:deep(.nav-link--active::before) {
  opacity: 0.08;
  transform: scale(1);
}

/* Sidebar footer user */
.sidebar-footer-user {
  display: flex;
  align-items: center;
  gap: 10px;
}

.user-info {
  display: flex;
  flex-direction: column;
  line-height: 1.3;
}

.user-name {
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--maya-text-primary);
}

.user-role {
  font-size: 0.75rem;
  color: var(--maya-text-muted);
}

/* Topbar search */
.topbar-search {
  display: flex;
  align-items: center;
  gap: 8px;
  background: var(--maya-bg-root);
  border: 1px solid var(--maya-border);
  border-radius: var(--maya-radius-md);
  padding: 6px 10px;
  min-width: 280px;
}

.search-input {
  flex: 1;
  background: transparent;
  border: none;
  outline: none;
  font-size: 0.8125rem;
  color: var(--maya-text-primary);
  font-family: var(--maya-font-sans);
}

.search-input::placeholder {
  color: var(--maya-text-muted);
}

/* Page title in topbar */
.page-title {
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--maya-text-primary);
}

/* Demo content */
.demo-content {
  flex: 1;
  overflow-y: auto;
  padding: 32px;
}

.page-panel {
  max-width: 860px;
  margin: 0 auto;
}

.panel-title {
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--maya-text-primary);
  margin: 0 0 10px;
}

.panel-desc {
  font-size: 0.9375rem;
  color: var(--maya-text-secondary);
  margin: 0 0 32px;
  line-height: 1.65;
}

.placeholder-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 16px;
}

.placeholder-card {
  height: 120px;
  background: var(--maya-bg-surface);
  border: 1px solid var(--maya-border);
  border-radius: var(--maya-radius-md);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.15);
  background-image: linear-gradient(135deg, transparent 40%, rgba(255, 255, 255, 0.02) 100%);
}

/* Page transition */
.demo-fade-enter-active {
  transition: opacity 180ms cubic-bezier(0.19, 1, 0.22, 1), transform 200ms cubic-bezier(0.19, 1, 0.22, 1);
}

.demo-fade-leave-active {
  transition: opacity 100ms ease, transform 100ms ease;
}

.demo-fade-enter-from {
  opacity: 0;
  transform: translateY(8px);
}

.demo-fade-leave-to {
  opacity: 0;
  transform: translateY(-4px);
}
</style>
