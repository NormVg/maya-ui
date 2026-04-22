<template>
  <div class="component-page">
    <div class="page-header">
      <h1 class="page-title">Number Field</h1>
      <p class="page-description">An input specifically tailored for numbers, featuring integrated stepper buttons and
        strict mathematical snap-to-step validation.</p>
    </div>

    <MayaPreviewCode title="Default" description="A clean, integrated numeric spinner."
      code='<MayaNumberField v-model="val" :min="0" :max="100" />'>
      <template #preview>
        <MayaNumberField v-model="val1" :min="0" :max="100" />
      </template>
    </MayaPreviewCode>

    <MayaPreviewCode title="Step Increments" description="Set a custom step value. The input snaps to these increments."
      code='<MayaNumberField v-model="val2" :step="0.5" />'>
      <template #preview>
        <MayaNumberField v-model="val2" :step="0.5" />
      </template>
    </MayaPreviewCode>

    <MayaPreviewCode title="Disabled State" description="Read-only mode."
      code='<MayaNumberField v-model="val3" disabled />'>
      <template #preview>
        <MayaNumberField v-model="val3" disabled />
      </template>
    </MayaPreviewCode>

    <div class="page-header">
      <h1 class="page-title" style="margin-top: 48px;">Input Group</h1>
      <p class="page-description">Collapse borders and combine inputs with buttons or other inputs horizontally.</p>
    </div>

    <MayaPreviewCode title="Input with Action" description="Merging an input with a send button." code='<MayaInputGroup>
  <MayaInput placeholder="Enter discount..." />
  <MayaBtn>Apply</MayaBtn>
</MayaInputGroup>'>
      <template #preview>
        <MayaInputGroup style="max-width: 300px;">
          <MayaInput placeholder="Enter discount..." />
          <MayaBtn>Apply</MayaBtn>
        </MayaInputGroup>
      </template>
    </MayaPreviewCode>

    <MayaPreviewCode title="Double Input" description="Grouping multiple inputs." code='<MayaInputGroup>
  <MayaInput placeholder="First Name" />
  <MayaInput placeholder="Last Name" />
</MayaInputGroup>'>
      <template #preview>
        <MayaInputGroup style="max-width: 400px;">
          <MayaInput placeholder="First Name" />
          <MayaInput placeholder="Last Name" />
        </MayaInputGroup>
      </template>
    </MayaPreviewCode>

  </div>
</template>

<script setup>
import { ref } from 'vue'

const val1 = ref(10)
const val2 = ref(2.5)
const val3 = ref(42)
</script>
