<template>
  <div class="page-content">
    <div class="component-header">
      <h2 class="component-title">Canvas Board</h2>
      <p class="component-desc">A 2D spatial canvas for dragging and freely placing nodes.</p>
    </div>

    <MayaPreviewCode title="Interactive Canvas" description="Drag nodes to reposition them. Hold Shift or click empty space to pan the canvas." lang="vue" :code="basicCode">
      <template #preview>
        <MayaCanvasBoard v-model="nodes" />
      </template>
    </MayaPreviewCode>

    <ApiTable title="MayaCanvasBoard API" :propsList="canvasProps" />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import ApiTable from '~/components/ApiTable.vue'

const nodes = ref([
  { id: 1, label: 'Start Hub', x: 50, y: 50 },
  { id: 2, label: 'Processing Unit', x: 250, y: 120 },
  { id: 3, label: 'Output Sink', x: 100, y: 250 },
])

const basicCode = `<template>
  <MayaCanvasBoard v-model="nodes" />
</template>

<script setup>
import { ref } from 'vue'

const nodes = ref([
  { id: 1, label: 'Start Hub', x: 50, y: 50 },
  { id: 2, label: 'Processing Unit', x: 250, y: 120 },
  { id: 3, label: 'Output Sink', x: 100, y: 250 },
])
</script>`

const canvasProps = [
  { name: 'v-model', type: 'Array', default: '[]', description: 'Array of nodes containing { id, x, y }.' },
  { name: '@node-move', type: 'Event', default: '—', description: 'Emitted when a node is dropped/moved. Passes the updated node object.' },
  { name: '#node', type: 'Slot', default: '—', description: 'Custom rendering for nodes. Props: { node, index }.' }
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
</style>
