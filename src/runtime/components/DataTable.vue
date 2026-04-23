<template>
  <div class="maya-data-table-wrap">
    <!-- Search + actions bar slot -->
    <div v-if="$slots.toolbar" class="maya-data-table-toolbar">
      <slot name="toolbar" />
    </div>

    <div class="maya-data-table-scroll">
      <table class="maya-data-table">
        <thead>
          <tr>
            <th
              v-for="col in columns"
              :key="col.key"
              class="maya-data-table-th"
              :class="{ 'is-sortable': col.sortable }"
              @click="col.sortable ? toggleSort(col.key) : null"
            >
              <span>{{ col.label }}</span>
              <span v-if="col.sortable" class="maya-data-table-sort-icon">
                <svg
                  width="12" height="12" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" stroke-width="2.5"
                  stroke-linecap="round" stroke-linejoin="round"
                  :style="{ transform: sortKey === col.key && sortDir === 'asc' ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 200ms var(--maya-ease-out)', opacity: sortKey === col.key ? 1 : 0.3 }"
                >
                  <path d="m6 9 6 6 6-6"/>
                </svg>
              </span>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(row, i) in sortedRows"
            :key="i"
            class="maya-data-table-tr"
            :class="{ 'is-clickable': !!onRowClick }"
            @click="onRowClick && onRowClick(row)"
          >
            <td v-for="col in columns" :key="col.key" class="maya-data-table-td">
              <slot :name="`cell-${col.key}`" :row="row" :value="row[col.key]">
                {{ row[col.key] }}
              </slot>
            </td>
          </tr>
          <tr v-if="!sortedRows.length">
            <td :colspan="columns.length" class="maya-data-table-empty">
              <slot name="empty">No results found.</slot>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  columns: { type: Array, required: true },
  rows: { type: Array, required: true },
  onRowClick: { type: Function, default: null },
})

const sortKey = ref(null)
const sortDir = ref('asc')

const toggleSort = (key) => {
  if (sortKey.value === key) {
    sortDir.value = sortDir.value === 'asc' ? 'desc' : 'asc'
  } else {
    sortKey.value = key
    sortDir.value = 'asc'
  }
}

const sortedRows = computed(() => {
  if (!sortKey.value) return props.rows
  return [...props.rows].sort((a, b) => {
    const aVal = a[sortKey.value]
    const bVal = b[sortKey.value]
    const result = String(aVal).localeCompare(String(bVal), undefined, { numeric: true })
    return sortDir.value === 'asc' ? result : -result
  })
})
</script>

<style scoped>
.maya-data-table-wrap {
  display: flex;
  flex-direction: column;
  gap: 12px;
  border-radius: var(--maya-radius-xl);
  overflow: hidden;
  box-shadow:
    inset 0 1px 0 rgba(255,255,255,0.04),
    inset 0 0 0 1px var(--maya-border-subtle),
    0 4px 16px rgba(0,0,0,0.15);
}

.maya-data-table-toolbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 12px 16px;
  border-bottom: 1px solid var(--maya-border-subtle);
  background: var(--maya-bg-surface);
}

.maya-data-table-scroll {
  overflow-x: auto;
}

.maya-data-table {
  width: 100%;
  border-collapse: collapse;
  font-family: var(--maya-font-sans);
  background: var(--maya-bg-surface);
}

.maya-data-table-th {
  padding: 12px 16px;
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: var(--maya-text-tertiary);
  text-align: left;
  border-bottom: 1px solid var(--maya-border-subtle);
  white-space: nowrap;
  background: var(--maya-bg-root);
}

.maya-data-table-th.is-sortable {
  cursor: pointer;
  user-select: none;
}

.maya-data-table-th.is-sortable:hover {
  color: var(--maya-text-secondary);
}

.maya-data-table-th span {
  display: inline-flex;
  align-items: center;
}

.maya-data-table-sort-icon {
  display: inline-flex;
  align-items: center;
  margin-left: 6px;
}

.maya-data-table-tr {
  transition: background 100ms ease;
  border-bottom: 1px solid var(--maya-border-subtle);
}

.maya-data-table-tr:last-child {
  border-bottom: none;
}

.maya-data-table-tr:hover {
  background: var(--maya-bg-surface-elevated);
}

.maya-data-table-tr.is-clickable {
  cursor: pointer;
}

.maya-data-table-tr.is-clickable:active {
  background: var(--maya-bg-surface-hover, rgba(255,255,255,0.04));
}

.maya-data-table-td {
  padding: 14px 16px;
  font-size: 0.8125rem;
  color: var(--maya-text-secondary);
  vertical-align: middle;
}

.maya-data-table-empty {
  padding: 48px 16px;
  text-align: center;
  font-size: 0.875rem;
  color: var(--maya-text-tertiary);
}
</style>
