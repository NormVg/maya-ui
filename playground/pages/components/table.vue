<template>
  <div>
    <div class="component-header">
      <h2 class="component-title">Table</h2>
      <p class="component-desc">Data table with columns and rows.</p>
    </div>

    <Showcase
      title="Basic"
      description="A simple data table."
      :code="`<MayaTable :columns=&quot;columns&quot; :rows=&quot;rows&quot; />`"
    >
      <template #preview>
        <div style="width: 100%;">
          <MayaTable :columns="columns" :rows="rows" />
        </div>
      </template>
    </Showcase>

    <Showcase
      title="Empty State"
      description="Table with no data."
      :code="`<MayaTable :columns=&quot;columns&quot; :rows=&quot;[]&quot; />`"
    >
      <template #preview>
        <div style="width: 100%;">
          <MayaTable :columns="columns" :rows="[]" />
        </div>
      </template>
    </Showcase>
  </div>
</template>

<script setup>
const columns = [
  { key: 'name', label: 'Name' },
  { key: 'role', label: 'Role' },
  { key: 'status', label: 'Status' },
]

const rows = [
  { name: 'Alice', role: 'Engineer', status: 'Active' },
  { name: 'Bob', role: 'Designer', status: 'Active' },
  { name: 'Charlie', role: 'Manager', status: 'Inactive' },
  { name: 'Diana', role: 'DevOps', status: 'Active' },
]
</script>
