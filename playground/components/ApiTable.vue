<template>
  <div class="api-table-wrapper">
    <h3 class="api-table-title">{{ title }}</h3>
    <div class="maya-table-container">
      <table class="maya-table">
        <thead>
          <tr>
            <th>Prop / Event</th>
            <th>Type</th>
            <th>Default</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="prop in propsList" :key="prop.name">
            <td>
              <code class="prop-name">{{ prop.name }}</code>
            </td>
            <td>
              <code class="prop-type">{{ prop.type }}</code>
            </td>
            <td>
              <code v-if="prop.default" class="prop-default">{{ prop.default }}</code>
              <span v-else class="text-muted">—</span>
            </td>
            <td class="prop-desc">{{ prop.description }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    default: 'Props'
  },
  propsList: {
    type: Array,
    required: true,
    // Expected structure: { name: 'variant', type: 'String', default: '"primary"', description: '...' }
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

.maya-table-container {
  width: 100%;
  overflow-x: auto;
  border: 1px solid var(--maya-border);
  border-radius: var(--maya-radius-lg);
  background: var(--maya-bg-surface);
}

.maya-table {
  width: 100%;
  border-collapse: collapse;
  text-align: left;
  font-size: 0.875rem;
}

.maya-table th {
  padding: 12px 16px;
  background: rgba(255, 255, 255, 0.02);
  border-bottom: 1px solid var(--maya-border);
  color: var(--maya-text-secondary);
  font-weight: 500;
}

.maya-table td {
  padding: 12px 16px;
  border-bottom: 1px solid var(--maya-border);
  color: var(--maya-text-primary);
}

.maya-table tr:last-child td {
  border-bottom: none;
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
