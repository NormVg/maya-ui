<script setup>
definePageMeta({
  layout: 'screen'
})
</script>

<template>
  <div style="display: flex; flex-direction: column; flex: 1; height: 100vh;">
    <MayaTopbar>
      <template #left>
        <div style="display: flex; align-items: center; gap: 10px;">
          <div
            style="width: 28px; height: 28px; background: var(--maya-text-primary); color: var(--maya-bg-root); border-radius: 6px; display: flex; align-items: center; justify-content: center; font-size: 0.875rem; font-weight: 700;">
            M</div>
          <span style="font-weight: 600; font-size: 0.9375rem; color: var(--maya-text-primary);">Maya UI</span>
        </div>
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

    <div class="topbar-demo-body">
      <div class="topbar-demo-content">
        <h2 style="margin: 0 0 8px; font-size: 1.25rem; color: var(--maya-text-primary);">Topbar</h2>
        <p style="margin: 0 0 24px; font-size: 0.9375rem; color: var(--maya-text-secondary); line-height: 1.6;">
          This is the <strong>MayaTopbar</strong> component running at full viewport width. It supports left, center,
          and
          right slots. Scroll down to see the sticky behavior.
        </p>
        <div class="placeholder-grid">
          <div class="placeholder-card" v-for="i in 12" :key="i" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
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

.topbar-demo-body {
  flex: 1;
  overflow-y: auto;
  padding: 40px;
  display: flex;
  justify-content: center;
}

.topbar-demo-content {
  max-width: 720px;
  width: 100%;
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
