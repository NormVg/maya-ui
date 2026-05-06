<template>
  <div class="page-content">
    <MayaPreviewCode
      title="Data Table"
      description="A sortable data table with custom cell slot overrides, hover states, and an empty state slot."
      lang="vue"
      :code="tableCode"
    >
      <template #preview>
        <div style="padding: 8px 0;">
          <MayaDataTable :columns="columns" :rows="rows">
            <template #toolbar>
              <span style="font-size: 0.875rem; font-weight: 600; color: var(--maya-text-primary);">Team Members</span>
              <MayaBtn variant="primary" size="sm">Add Member</MayaBtn>
            </template>
            <template #cell-status="{ value }">
              <MayaBadge :intent="value === 'Active' ? 'success' : value === 'Pending' ? 'warning' : 'default'">
                {{ value }}
              </MayaBadge>
            </template>
            <template #cell-actions>
              <MayaBtn variant="ghost" size="sm">Edit</MayaBtn>
            </template>
          </MayaDataTable>
        </div>
      </template>
    </MayaPreviewCode>

    <!-- API Reference -->
    <ApiTable title="MayaDataTable API" :propsList="dataTableProps" />
  </div>
</template>

<script setup>
import ApiTable from '~/components/ApiTable.vue'

const dataTableProps = [
  { name: 'columns', type: 'Array', default: '—', description: 'Required. Array of columns: { key, label, sortable }.' },
  { name: 'rows', type: 'Array', default: '—', description: 'Required. Array of data objects.' },
  { name: 'onRowClick', type: 'Function', default: 'null', description: 'Callback function triggered when a row is clicked.' },
  { name: '#toolbar', type: 'Slot', default: '—', description: 'Optional slot for a toolbar above the table.' },
  { name: '#cell-{key}', type: 'Slot', default: '—', description: 'Dynamic slot to override the rendering of a specific cell.' },
  { name: '#empty', type: 'Slot', default: '—', description: 'Displayed when there are no rows.' }
]

const columns = [
  { key: 'name', label: 'Name', sortable: true },
  { key: 'email', label: 'Email', sortable: true },
  { key: 'role', label: 'Role', sortable: true },
  { key: 'status', label: 'Status', sortable: false },
  { key: 'actions', label: '', sortable: false },
]

const rows = [
  { name: 'Alice Chen', email: 'alice@company.co', role: 'Engineer', status: 'Active' },
  { name: 'Ben Okafor', email: 'ben@company.co', role: 'Designer', status: 'Active' },
  { name: 'Clara Ruiz', email: 'clara@company.co', role: 'Product', status: 'Pending' },
  { name: 'David Kim', email: 'david@company.co', role: 'Engineer', status: 'Inactive' },
  { name: 'Eva Schmidt', email: 'eva@company.co', role: 'Marketing', status: 'Active' },
]

const tableCode = `<MayaDataTable :columns="columns" :rows="rows">
  <template #toolbar>
    <span>Team Members</span>
    <MayaBtn variant="primary" size="sm">Add Member</MayaBtn>
  </template>
  <template #cell-status="{ value }">
    <MayaBadge :intent="value === 'Active' ? 'success' : 'warning'">{{ value }}</MayaBadge>
  </template>
</MayaDataTable>`
</script>

<style scoped>
.page-content { display: flex; flex-direction: column; gap: 32px; }
</style>
