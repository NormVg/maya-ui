<template>
  <div class="page-content">
    <div class="component-header">
      <h2 class="component-title">Topbar</h2>
      <p class="component-desc">A horizontal navigation bar designed for the top of the application or page.</p>
    </div>

    <MayaPreviewCode title="Live Demo" description="View the Topbar layout in a full-screen environment." lang="vue" :code="demoCode">
      <template #preview>
        <div class="demo-launcher">
          <MayaBtn variant="primary" @click="openDemo('/screens/topbar-demo')">
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

    <ApiTable title="MayaTopbar API" :propsList="topbarProps" />
  </div>
</template>

<script setup>
import ApiTable from '~/components/ApiTable.vue'

const openDemo = (url) => {
  window.open(url, '_blank')
}

const demoCode = `<template>
  <MayaAppShell>
    <template #topbar>
      <MayaTopbar sticky>
        <template #left>
          <!-- Branding or Mobile Menu Toggle -->
        </template>
        
        <template #center>
          <!-- Global Search or Main Navigation -->
        </template>
        
        <template #right>
          <!-- Notifications, User Profile -->
        </template>
      </MayaTopbar>
    </template>
    
    <div>Main Content</div>
  </MayaAppShell>
</template>`

const topbarProps = [
  { name: 'sticky', type: 'Boolean', default: 'false', description: 'Pins the topbar to the top and applies a blurred background.' },
  { name: '#left', type: 'Slot', default: '—', description: 'Left-aligned content area.' },
  { name: '#center', type: 'Slot', default: '—', description: 'Center-aligned content area.' },
  { name: '#right', type: 'Slot', default: '—', description: 'Right-aligned content area.' }
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
