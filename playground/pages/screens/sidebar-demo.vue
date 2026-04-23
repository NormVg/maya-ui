<script>
export default { layout: 'screen' }
</script>

<template>
  <MayaSidebar>
    <template #header>
      <div style="display: flex; align-items: center; gap: 10px;">
        <div
          style="width: 28px; height: 28px; background: var(--maya-text-primary); color: var(--maya-bg-root); border-radius: 6px; display: flex; align-items: center; justify-content: center; font-size: 0.875rem; font-weight: 700;">
          M</div>
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

  <div class="sidebar-demo-main">
    <div class="sidebar-demo-content">
      <h2 style="margin: 0 0 8px; font-size: 1.25rem; color: var(--maya-text-primary);">{{ active }}</h2>
      <p style="margin: 0 0 24px; font-size: 0.9375rem; color: var(--maya-text-secondary); line-height: 1.6;">
        This is the <strong>MayaSidebar</strong> component running at full viewport width. Use the links on the left to
        test navigation state.
      </p>
      <div class="placeholder-grid">
        <div class="placeholder-card" v-for="i in 4" :key="i" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const active = ref('Dashboard')
const navItems = ['Dashboard', 'Analytics', 'Team', 'Projects', 'Settings']
</script>

<style scoped>
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

.sidebar-demo-main {
  flex: 1;
  overflow-y: auto;
  padding: 40px;
  display: flex;
  justify-content: center;
  align-items: flex-start;
}

.sidebar-demo-content {
  max-width: 640px;
  width: 100%;
}

.placeholder-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
}

.placeholder-card {
  height: 100px;
  background: var(--maya-bg-surface);
  border: 1px solid var(--maya-border);
  border-radius: var(--maya-radius-md);
}
</style>
