<template>
  <div class="page-content">
    <div class="component-header">
      <h2 class="component-title">Sortable List</h2>
      <p class="component-desc">A vertical drag-and-drop list component for reordering items.</p>
    </div>

    <MayaPreviewCode title="Basic Usage" description="Bind an array to v-model. Drag the handles to reorder." lang="vue" :code="basicCode">
      <template #preview>
        <div style="max-width: 400px; margin: 0 auto; width: 100%;">
          <MayaSortableList v-model="items" itemKey="id" />
        </div>
      </template>
    </MayaPreviewCode>

    <ApiTable title="MayaSortableList API" :propsList="sortableProps" />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import ApiTable from '~/components/ApiTable.vue'

const items = ref([
  { id: 1, label: 'Design Homepage' },
  { id: 2, label: 'Write Documentation' },
  { id: 3, label: 'Fix Navigation Bug' },
  { id: 4, label: 'Update Dependencies' },
])

const basicCode = `<template>
  <MayaSortableList v-model="items" itemKey="id" />
</template>

<script setup>
import { ref } from 'vue'

const items = ref([
  { id: 1, label: 'Design Homepage' },
  { id: 2, label: 'Write Documentation' },
  { id: 3, label: 'Fix Navigation Bug' }
])
</script>`

const sortableProps = [
  { name: 'v-model', type: 'Array', default: '[]', description: 'The array of items to render and sort.' },
  { name: 'itemKey', type: 'String | Function', default: 'null', description: 'Key property or function to uniquely identify items (for Vue tracking).' },
  { name: '@change', type: 'Event', default: '—', description: 'Emitted when a drop completes: { list, movedItem, oldIndex, newIndex }.' },
  { name: '#item', type: 'Slot', default: '—', description: 'Custom rendering for the list item. Props: { item, index }.' }
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
