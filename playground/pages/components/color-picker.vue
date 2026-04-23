<template>
  <div class="page-content">
    <MayaPreviewCode
      title="Color Picker"
      description="A full-featured color picker with HSB gradient canvas, hue and alpha sliders, hex input, and preset swatches. Drag anywhere on the gradient to pick."
      lang="vue"
      :code="pickerCode"
    >
      <template #preview>
        <div class="center-wrap">
          <MayaColorPicker v-model="color" />
          <div style="display: flex; align-items: center; gap: 10px; margin-top: 8px;">
            <span style="display:block; width:32px; height:32px; border-radius:8px; box-shadow: inset 0 0 0 1px rgba(0,0,0,0.15);" :style="{ background: color }"></span>
            <span style="font-size: 0.8125rem; font-family: var(--maya-font-mono); color: var(--maya-text-secondary);">{{ color }}</span>
          </div>
        </div>
      </template>
    </MayaPreviewCode>

    <MayaPreviewCode
      title="Color Panels"
      description="A grid of selectable color swatches. The active color gets a ring highlight and a bouncy pop-in checkmark."
      lang="vue"
      :code="panelsCode"
    >
      <template #preview>
        <div style="padding: 24px; max-width: 400px;">
          <MayaColorPanels v-model="panelColor" :show-label="true" />
          <div style="margin-top: 12px; font-size: 0.8rem; color: var(--maya-text-tertiary);">Selected: {{ panelColor }}</div>
        </div>
      </template>
    </MayaPreviewCode>

    <MayaPreviewCode
      title="Compact Swatches"
      description="Use the cols prop to set a specific column count, and omit showLabel for a compact swatch toolbar."
      lang="vue"
      :code="compactCode"
    >
      <template #preview>
        <div style="padding: 24px;">
          <MayaColorPanels v-model="compactColor" :cols="8" />
        </div>
      </template>
    </MayaPreviewCode>
  </div>
</template>

<script setup>
import { ref } from 'vue'
const color = ref('#6366f1')
const panelColor = ref('#6366f1')
const compactColor = ref('#22c55e')

const pickerCode = `<MayaColorPicker v-model="color" />`

const panelsCode = `<MayaColorPanels
  v-model="color"
  :show-label="true"
  :colors="[
    { value: '#ef4444', label: 'Red' },
    { value: '#6366f1', label: 'Indigo' },
    { value: '#22c55e', label: 'Green' },
  ]"
/>`

const compactCode = `<!-- 8-column compact toolbar -->
<MayaColorPanels v-model="color" :cols="8" />`
</script>

<style scoped>
.page-content { display: flex; flex-direction: column; gap: 32px; }
.center-wrap { display: flex; flex-direction: column; align-items: center; padding: 32px 16px; gap: 8px; }
</style>
