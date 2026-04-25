<template>
  <div class="component-page">
    <div class="page-header">
      <h1 class="page-title">Radio</h1>
      <p class="page-description">Standard radio buttons with bouncy physics and generous Fitts's law hit areas.</p>
    </div>

    <MayaPreviewCode title="Default" description="A simple radio button. Note the expanded hover area." code='<MayaRadio v-model="color" value="red" label="Red" />
<MayaRadio v-model="color" value="blue" label="Blue" />'>
      <template #preview>
        <div style="display: flex; gap: 1rem;">
          <MayaRadio v-model="color1" value="red" label="Red" />
          <MayaRadio v-model="color1" value="blue" label="Blue" />
        </div>
      </template>
    </MayaPreviewCode>

    <div class="page-header">
      <h1 class="page-title" style="margin-top: 48px;">Radio Group</h1>
      <p class="page-description">Group radio buttons together horizontally or vertically.</p>
    </div>

    <MayaPreviewCode title="Vertical (Default)" description="Lines items up with a clean gap." code='<MayaRadioGroup>
  <MayaRadio v-model="color" value="red" label="Red" />
  <MayaRadio v-model="color" value="blue" label="Blue" />
  <MayaRadio v-model="color" value="green" label="Green" />
</MayaRadioGroup>'>
      <template #preview>
        <MayaRadioGroup>
          <MayaRadio v-model="color2" value="red" label="Red" />
          <MayaRadio v-model="color2" value="blue" label="Blue" />
          <MayaRadio v-model="color2" value="green" label="Green" />
        </MayaRadioGroup>
      </template>
    </MayaPreviewCode>

    <MayaPreviewCode title="Horizontal" description="Wraps if space constrains." code='<MayaRadioGroup orientation="horizontal">
  <MayaRadio v-model="color" value="red" label="Red" />
  <MayaRadio v-model="color" value="blue" label="Blue" />
  <MayaRadio v-model="color" value="green" label="Green" />
</MayaRadioGroup>'>
      <template #preview>
        <MayaRadioGroup orientation="horizontal">
          <MayaRadio v-model="color3" value="red" label="Red" />
          <MayaRadio v-model="color3" value="blue" label="Blue" />
          <MayaRadio v-model="color3" value="green" label="Green" />
        </MayaRadioGroup>
      </template>
    </MayaPreviewCode>

    <!-- API Reference -->
    <ApiTable title="MayaRadio Props API" :propsList="radioProps" />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import ApiTable from '~/components/ApiTable.vue'

const color1 = ref('red')
const color2 = ref('blue')
const color3 = ref('green')

const radioProps = [
  { name: 'modelValue', type: 'String | Number | Boolean', default: 'undefined', description: 'The currently selected value of the group. Used with v-model.' },
  { name: 'value', type: 'String | Number | Boolean', default: '(Required)', description: 'The specific value of this radio button.' },
  { name: 'name', type: 'String', default: '""', description: 'The native name attribute for grouping.' },
  { name: 'label', type: 'String', default: '""', description: 'Optional text label displayed next to the radio button.' },
  { name: 'disabled', type: 'Boolean', default: 'false', description: 'Whether the radio button is disabled.' },
  { name: '@update:modelValue', type: 'Event', default: '—', description: 'Emitted when the radio is selected.' },
  { name: '#default', type: 'Slot', default: '—', description: 'Default slot to render custom label content.' }
]
</script>
