<template>
  <div class="page-content">
    <div class="component-header">
      <h2 class="component-title">App Shell</h2>
      <p class="component-desc">The foundational layout wrapper for building dashboard and application interfaces.</p>
    </div>

    <MayaPreviewCode title="Live Demo" description="View the App Shell layout with Topbar and Sidebar combined." lang="vue" :code="demoCode">
      <template #preview>
        <div class="demo-launcher">
          <MayaBtn variant="primary" @click="openDemo('/screens/app-shell-demo')">
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

    <ApiTable title="MayaAppShell Slots API" :propsList="appShellProps" />
  </div>
</template>

<script setup>
import ApiTable from '~/components/ApiTable.vue'

const openDemo = (url) => {
  window.open(url, '_blank')
}

const demoCode = `<template>
  <MayaAppShell>
    <template #sidebar>
      <MayaSidebar>...</MayaSidebar>
    </template>
    
    <template #topbar>
      <MayaTopbar>...</MayaTopbar>
    </template>
    
    <div class="page-content">
      <!-- Your main scrollable content -->
    </div>
  </MayaAppShell>
</template>`

const appShellProps = [
  { name: '#sidebar', type: 'Slot', default: '—', description: 'Slot for the MayaSidebar component. Fixed to the left.' },
  { name: '#topbar', type: 'Slot', default: '—', description: 'Slot for the MayaTopbar component. Fixed to the top.' },
  { name: '#default', type: 'Slot', default: '—', description: 'The main scrollable work area content.' }
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
