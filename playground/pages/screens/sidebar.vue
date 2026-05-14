<template>
  <div class="page-content">
    <div class="component-header">
      <h2 class="component-title">Sidebar</h2>
      <p class="component-desc">A vertical navigation container typically used alongside the App Shell.</p>
    </div>

    <MayaPreviewCode title="Live Demo" description="View the Sidebar layout in a full-screen environment." lang="vue" :code="demoCode">
      <template #preview>
        <div class="demo-launcher">
          <MayaBtn variant="primary" as="a" href="/screens/sidebar-demo" target="_blank">
            Open Full Screen Demo
            <svg class="ml-2" viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
              <polyline points="15 3 21 3 21 9"></polyline>
              <line x1="10" y1="14" x2="21" y2="3"></line>
            </svg>
          </MayaBtn>
        </div>
      </template>
    </MayaPreviewCode>

    <ApiTable title="MayaSidebar API" :propsList="sidebarProps" />
  </div>
</template>

<script setup>
import ApiTable from '~/components/ApiTable.vue'

const demoCode = `<template>
  <MayaAppShell>
    <template #sidebar>
      <MayaSidebar :collapsed="isCollapsed">
        <template #header>
          <!-- Brand / Logo -->
        </template>
        
        <!-- Navigation Links -->
        <div class="nav-links">
          <NuxtLink to="/">Dashboard</NuxtLink>
        </div>
        
        <template #footer>
          <!-- User Profile -->
        </template>
      </MayaSidebar>
    </template>
    
    <div>Main Content</div>
  </MayaAppShell>
</template>`

const sidebarProps = [
  { name: 'collapsed', type: 'Boolean', default: 'false', description: 'Whether the sidebar is minimized to a compact width.' },
  { name: '#header', type: 'Slot', default: '—', description: 'Top section, usually for branding or app logo.' },
  { name: '#default', type: 'Slot', default: '—', description: 'Middle scrollable section for primary navigation links.' },
  { name: '#footer', type: 'Slot', default: '—', description: 'Bottom section, typically for user profile or settings.' }
]
</script>

<style scoped>
.page-content {
  display: flex;
  flex-direction: column;
  gap: 32px;
}

.component-header {
  margin-bottom: 2rem;
}

.component-title {
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
}

.component-desc {
  color: var(--maya-text-muted);
}

.demo-launcher {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 48px 0;
}

.ml-2 {
  margin-left: 8px;
}
</style>
