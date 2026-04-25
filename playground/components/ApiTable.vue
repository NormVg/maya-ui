<template>
  <div class="api-table-wrapper">
    <h3 class="api-table-title">{{ title }}</h3>
    <MayaDataTable :columns="columns" :rows="propsList">
      <template #cell-name="{ value }">
        <code class="prop-name">{{ value }}</code>
      </template>
      <template #cell-type="{ value }">
        <code class="prop-type">{{ value }}</code>
      </template>
      <template #cell-default="{ value }">
        <code v-if="value" class="prop-default">{{ value }}</code>
        <span v-else class="text-muted">—</span>
      </template>
      <template #cell-description="{ value }">
        <span class="prop-desc">{{ value }}</span>
      </template>
    </MayaDataTable>
  </div>
</template>

<script setup>
const columns = [
  { key: 'name', label: 'Prop / Event' },
  { key: 'type', label: 'Type' },
  { key: 'default', label: 'Default' },
  { key: 'description', label: 'Description' }
]

defineProps({
  title: {
    type: String,
    default: 'Props API'
  },
  propsList: {
    type: Array,
    required: true,
  }
})
</script>

<style scoped>
.api-table-wrapper {
  margin-top: 3rem;
  margin-bottom: 2rem;
}

.api-table-title {
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: var(--maya-text-primary);
}

.prop-name {
  color: var(--maya-info-text);
  background: var(--maya-info-muted);
  padding: 2px 6px;
  border-radius: var(--maya-radius-sm);
  font-family: var(--maya-font-mono);
  font-size: 0.8em;
}

.prop-type {
  color: var(--maya-warning-text);
  font-family: var(--maya-font-mono);
  font-size: 0.8em;
}

.prop-default {
  color: var(--maya-text-secondary);
  background: var(--maya-bg-raised);
  padding: 2px 6px;
  border-radius: var(--maya-radius-sm);
  font-family: var(--maya-font-mono);
  font-size: 0.8em;
  border: 1px solid var(--maya-border);
}

.text-muted {
  color: var(--maya-text-muted);
}

.prop-desc {
  color: var(--maya-text-secondary);
  line-height: 1.5;
}
</style>
