<template>
  <div>
    <div class="component-header">
      <h2 class="component-title">Input</h2>
      <p class="component-desc">A text input field with optional label.</p>
    </div>

    <MayaPreviewCode
      title="Default"
      description="Basic text input."
      :code="`<MayaInput v-model=&quot;val&quot; placeholder=&quot;Enter text...&quot; />`"
    >
      <template #preview>
        <div style="width: 320px;">
          <MayaInput v-model="val" placeholder="Enter text..." />
        </div>
      </template>
    </MayaPreviewCode>

    <MayaPreviewCode
      title="With Label"
      description="Input with an associated label."
      :code="`<MayaInput v-model=&quot;val&quot; label=&quot;Email&quot; placeholder=&quot;you@example.com&quot; />`"
    >
      <template #preview>
        <div style="width: 320px;">
          <MayaInput v-model="labeled" label="Email" placeholder="you@example.com" />
        </div>
      </template>
    </MayaPreviewCode>

    <MayaPreviewCode
      title="Disabled"
      description="Input in a disabled state."
      :code="`<MayaInput label=&quot;Disabled&quot; placeholder=&quot;Can't type here&quot; disabled />`"
    >
      <template #preview>
        <div style="width: 320px;">
          <MayaInput label="Disabled" placeholder="Can't type here" disabled />
        </div>
      </template>
    </MayaPreviewCode>

    <!-- API Reference -->
    <ApiTable title="MayaInput Props API" :propsList="inputProps" />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import ApiTable from '~/components/ApiTable.vue'

const val = ref('')
const labeled = ref('')

const inputProps = [
  { name: 'modelValue', type: 'String | Number', default: '""', description: 'The value of the input. Used with v-model.' },
  { name: 'type', type: 'String', default: '"text"', description: 'Standard HTML input type (text, password, email, file, etc.).' },
  { name: 'label', type: 'String', default: 'undefined', description: 'Optional text label displayed above the input.' },
  { name: 'placeholder', type: 'String', default: '""', description: 'Placeholder text when input is empty.' },
  { name: 'disabled', type: 'Boolean', default: 'false', description: 'Whether the input is disabled.' },
  { name: '@update:modelValue', type: 'Event', default: '', description: 'Emitted when the input value changes.' }
]
</script>
