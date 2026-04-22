<template>
  <div class="component-page">
    <div class="page-header">
      <h1 class="page-title">Date Chooser</h1>
      <p class="page-description">A robust calendar picker supporting native date structures and exact hit areas
        according to Fitt's law.</p>
    </div>

    <MayaPreviewCode title="Basic Month Grid"
      description="Generates an accurate 7x6 popover. Automatically extracts ISO formatting. Arrow keys to navigate months."
      code='<MayaDateChooser v-model="date" />'>
      <template #preview>
        <div style="display: flex; flex-direction: column; gap: 1rem;">
          <MayaDateChooser v-model="date1" style="max-width: 240px;" />
          <div style="font-size: 0.8rem; color: var(--maya-text-muted)">Selected ISO: {{ date1 || 'None' }}</div>
        </div>
      </template>
    </MayaPreviewCode>

    <MayaPreviewCode title="Disabled" description="When date choice is locked out."
      code='<MayaDateChooser v-model="date" disabled />'>
      <template #preview>
        <MayaDateChooser v-model="date2" disabled style="max-width: 240px;" />
      </template>
    </MayaPreviewCode>

  </div>
</template>

<script setup>
import { ref } from 'vue'

const date1 = ref('')
// Set date2 to effectively tomorrow's date for demo context
const tomorrow = new Date()
tomorrow.setDate(tomorrow.getDate() + 1)
const date2 = ref(tomorrow.toISOString().split('T')[0])
</script>
