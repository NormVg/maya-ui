<template>
  <div class="page-content">
    <MayaPreviewCode
      title="Calendar"
      description="A standalone calendar picker with month navigation, today indicator, and accent-colored selected date."
      lang="vue"
      :code="calendarCode"
    >
      <template #preview>
        <div class="center-wrap">
          <MayaCalendar v-model="selected" />
          <div v-if="selected" style="font-size: 0.8125rem; color: var(--maya-text-secondary); margin-top: 8px;">
            Selected: {{ selected.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) }}
          </div>
        </div>
      </template>
    </MayaPreviewCode>
  </div>
</template>

<script setup>
import { ref } from 'vue'
const selected = ref(null)

const calendarCode = `<MayaCalendar v-model="date" />`
</script>

<style scoped>
.page-content { display: flex; flex-direction: column; gap: 32px; }
.center-wrap { display: flex; flex-direction: column; align-items: center; padding: 32px 16px; gap: 8px; }
</style>
