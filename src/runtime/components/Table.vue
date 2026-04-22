<template>
  <div class="maya-table-wrapper">
    <table class="maya-table">
      <thead>
        <tr>
          <th v-for="col in columns" :key="col.key">{{ col.label }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(row, i) in rows" :key="i">
          <td v-for="col in columns" :key="col.key">{{ row[col.key] }}</td>
        </tr>
        <tr v-if="!rows || rows.length === 0">
          <td :colspan="columns.length" class="maya-table-empty">No data</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
defineProps({
  columns: { type: Array, required: true },
  rows: { type: Array, default: () => [] },
})
</script>

<style scoped>
.maya-table-wrapper {
  background: var(--maya-table-bg) var(--maya-gradient-surface);
  border: 1px solid var(--maya-border);
  border-radius: var(--maya-radius-lg);
  overflow: hidden;
  box-shadow: var(--maya-shadow-md);
}

.maya-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.8125rem;
}

.maya-table thead {
  background-color: var(--maya-table-head-bg);
}

.maya-table th {
  text-align: left;
  padding: 10px 16px;
  font-weight: 500;
  color: var(--maya-table-head-text);
  border-bottom: 1px dashed var(--maya-dash-color);
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.04em;
}

.maya-table td {
  padding: 10px 16px;
  color: var(--maya-text-primary);
  border-bottom: 1px solid var(--maya-table-row-border);
}

.maya-table tbody tr:last-child td {
  border-bottom: none;
}

.maya-table tbody tr:hover {
  background-color: var(--maya-table-row-hover);
}

.maya-table-empty {
  text-align: center;
  color: var(--maya-text-muted);
  padding: 32px 16px;
}
</style>
