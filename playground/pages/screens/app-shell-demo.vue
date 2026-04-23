<script setup>
import { ref } from 'vue'

definePageMeta({
  layout: 'screen'
})

const active = ref('Dashboard')
const navItems = ['Dashboard', 'Analytics', 'Team', 'Projects', 'Settings']
</script>

<template>
  <MayaAppShell>
    <!-- Sidebar slot -->
    <template #sidebar>
      <MayaSidebar>
        <template #header>
          <div style="display: flex; align-items: center; gap: 10px;">
            <div class="brand-icon">M</div>
            <span style="font-weight: 600; font-size: 0.9375rem; color: var(--maya-text-primary);">Maya UI</span>
          </div>
        </template>

        <div style="display: flex; flex-direction: column; gap: 4px;">
          <p class="nav-heading">Navigation</p>
          <button v-for="item in navItems" :key="item" class="sidebar-link" :class="{ active: active === item }"
            @click="active = item">
            {{ item }}
          </button>
        </div>

        <template #footer>
          <div style="display: flex; align-items: center; gap: 10px;">
            <MayaAvatar initials="VN" size="sm" />
            <div style="line-height: 1.3;">
              <div style="font-size: 0.875rem; font-weight: 500; color: var(--maya-text-primary);">Vishnu N.</div>
              <div style="font-size: 0.75rem; color: var(--maya-text-muted);">Admin</div>
            </div>
          </div>
        </template>
      </MayaSidebar>
    </template>

    <!-- Topbar slot -->
    <template #topbar>
      <MayaTopbar>
        <template #left>
          <span style="font-weight: 600; font-size: 0.875rem; color: var(--maya-text-primary);">{{ active }}</span>
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
    </template>

    <!-- Default slot = the work area -->
    <div class="demo-page-content">
      <h2 style="margin: 0 0 8px; font-size: 1.25rem; color: var(--maya-text-primary);">{{ active }}</h2>
      <p style="margin: 0 0 24px; font-size: 0.9375rem; color: var(--maya-text-secondary); line-height: 1.6;">
        Full app shell with <strong>MayaSidebar</strong> + <strong>MayaTopbar</strong> + scrollable work area — all
        managed
        by <strong>MayaAppShell</strong>.
      </p>
      <div class="placeholder-grid">
        <div class="placeholder-card" v-for="i in 20" :key="i" />
      </div>
    </div>
  </MayaAppShell>
</template>

<style scoped>
.brand-icon {
  width: 28px;
  height: 28px;
  background: var(--maya-text-primary);
  color: var(--maya-bg-root);
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.875rem;
  font-weight: 700;
}

.nav-heading {
  font-size: 0.6875rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: var(--maya-text-muted);
  margin: 0 0 4px 8px;
}

.sidebar-link {
  position: relative;
  display: flex;
  align-items: center;
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
  font-family: var(--maya-font-sans);
  transition: color 120ms cubic-bezier(0.19, 1, 0.22, 1);
}

.sidebar-link::before {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: inherit;
  background: var(--maya-text-primary);
  opacity: 0;
  transform: scale(0.96);
  transition: opacity 120ms ease, transform 120ms ease;
}

.sidebar-link:hover::before {
  opacity: 0.05;
  transform: scale(1);
}

.sidebar-link:hover {
  color: var(--maya-text-primary);
}

.sidebar-link.active {
  color: var(--maya-text-primary);
}

.sidebar-link.active::before {
  opacity: 0.08;
  transform: scale(1);
}

.topbar-search {
  display: flex;
  align-items: center;
  gap: 8px;
  background: var(--maya-bg-root);
  border: 1px solid var(--maya-border);
  border-radius: var(--maya-radius-md);
  padding: 6px 10px;
  min-width: 260px;
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

.demo-page-content {
  padding: 40px;
  max-width: 800px;
}

.placeholder-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 12px;
}

.placeholder-card {
  height: 120px;
  background: var(--maya-bg-surface);
  border: 1px solid var(--maya-border);
  border-radius: var(--maya-radius-md);
}
</style>
