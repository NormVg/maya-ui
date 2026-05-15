<template>
  <div class="page-container">
    <div class="page-header">
      <h1 class="page-title">Checkbox Group</h1>
      <p class="page-desc">Group multiple checkboxes together with a unified state.</p>
    </div>

    <MayaPreviewCode title="Usage" description="A coordinated group of checkboxes using v-model as an array." lang="vue" :code="code">
      <template #preview>
        <div style="display: flex; flex-direction: column; gap: 16px;">
          <MayaCheckboxGroup v-model="selected" :options="[
            { label: 'Vue', value: 'vue' },
            { label: 'React', value: 'react' },
            { label: 'Svelte', value: 'svelte' }
          ]" />
          <div style="font-size: 0.875rem; color: var(--maya-text-secondary);">
            Selected: {{ selected.join(', ') || 'none' }}
          </div>
        </div>
      </template>
    </MayaPreviewCode>

    <ApiTable 
      title="CheckboxGroup API" 
      description="Properties for the CheckboxGroup component."
      :propsList="[
        { name: 'modelValue', type: 'Array', default: '[]', description: 'Array of selected values.' },
        { name: 'options', type: 'Array', default: '[]', description: 'Array of { label, value, disabled? } objects.' }
      ]"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import ApiTable from '~/components/ApiTable.vue'

const selected = ref(['vue'])

const code = `<script setup>
const frameworks = ref(['vue'])
<\/script>

<template>
  <MayaCheckboxGroup 
    v-model="frameworks" 
    :options="[
      { label: 'Vue', value: 'vue' },
      { label: 'React', value: 'react' }
    ]" 
  />
</template>`
</script>
