<template>
  <div>
    <div class="component-header">
      <h2 class="component-title">Checkbox</h2>
      <p class="component-desc">A toggleable checkbox input.</p>
    </div>

    <MayaPreviewCode
      title="Default"
      description="Basic checkbox with a label."
      :code="`<MayaCheckbox v-model=&quot;checked&quot; label=&quot;Accept terms&quot; />`"
    >
      <template #preview>
        <MayaCheckbox v-model="checked" label="Accept terms" />
      </template>
    </MayaPreviewCode>

    <MayaPreviewCode
      title="Multiple"
      description="Group of checkboxes."
      :code="`<MayaCheckbox v-model=&quot;a&quot; label=&quot;Option A&quot; />\n<MayaCheckbox v-model=&quot;b&quot; label=&quot;Option B&quot; />\n<MayaCheckbox v-model=&quot;c&quot; label=&quot;Option C&quot; />`"
    >
      <template #preview>
        <div style="display: flex; flex-direction: column; gap: 12px;">
          <MayaCheckbox v-model="a" label="Option A" />
          <MayaCheckbox v-model="b" label="Option B" />
          <MayaCheckbox v-model="c" label="Option C" />
        </div>
      </template>
    </MayaPreviewCode>

    <MayaPreviewCode
      title="Disabled"
      description="Checkbox in a disabled state."
      :code="`<MayaCheckbox label=&quot;Can't toggle&quot; disabled />`"
    >
      <template #preview>
        <MayaCheckbox label="Can't toggle" disabled />
      </template>
    </MayaPreviewCode>

    <!-- API Reference -->
    <ApiTable title="MayaCheckbox Props API" :propsList="checkboxProps" />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import ApiTable from '~/components/ApiTable.vue'

const checked = ref(false)
const a = ref(true)
const b = ref(false)
const c = ref(false)

const checkboxProps = [
  { name: 'modelValue', type: 'Boolean', default: 'false', description: 'The checked state of the checkbox. Used with v-model.' },
  { name: 'label', type: 'String', default: '""', description: 'Optional text label displayed next to the checkbox.' },
  { name: 'disabled', type: 'Boolean', default: 'false', description: 'Whether the checkbox is disabled.' },
  { name: '@update:modelValue', type: 'Event', default: '—', description: 'Emitted when the checkbox is toggled.' }
]
</script>
