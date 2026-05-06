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

    <!-- API Reference -->
    <ApiTable title="MayaCalendar Props API" :propsList="calendarProps" />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import ApiTable from '~/components/ApiTable.vue'

const selected = ref(null)

const calendarCode = `<MayaCalendar v-model="date" />`

const calendarProps = [
  { name: 'modelValue', type: 'Date', default: 'null', description: 'The selected Date object. Used with v-model.' },
  { name: '@update:modelValue', type: 'Event', default: '—', description: 'Emitted with the Date object when selected.' }
]
</script>

<style scoped>
.page-content { display: flex; flex-direction: column; gap: 32px; }
.center-wrap { display: flex; flex-direction: column; align-items: center; padding: 32px 16px; gap: 8px; }
</style>
