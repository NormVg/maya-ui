<template>
  <div class="page-content">
    <div class="component-header">
      <h2 class="component-title">Full Calendar</h2>
      <p class="component-desc">A full-sized, grid-based calendar view supporting daily event badges and an expandable day card.</p>
    </div>

    <MayaPreviewCode title="Basic Usage" description="Pass an array of events to display badges on specific days." lang="vue" :code="basicCode">
      <template #preview>
        <MayaFullCalendar :events="sampleEvents" />
      </template>
    </MayaPreviewCode>

    <ApiTable title="MayaFullCalendar API" :propsList="calendarProps" />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import ApiTable from '~/components/ApiTable.vue'

const today = new Date()
const currentYear = today.getFullYear()
const currentMonth = String(today.getMonth() + 1).padStart(2, '0')

const sampleEvents = ref([
  { date: \`\${currentYear}-\${currentMonth}-05\`, title: 'Design Sync', time: '10:00 AM', color: 'var(--maya-info-muted)', textColor: 'var(--maya-info-text)' },
  { date: \`\${currentYear}-\${currentMonth}-05\`, title: 'Lunch with Team', time: '1:00 PM', color: 'var(--maya-success-muted)', textColor: 'var(--maya-success-text)' },
  { date: \`\${currentYear}-\${currentMonth}-12\`, title: 'Project Release', time: '12:00 AM', color: 'var(--maya-primary-muted)', textColor: 'var(--maya-primary)' },
  { date: \`\${currentYear}-\${currentMonth}-18\`, title: 'Client Meeting', time: '3:00 PM', color: 'var(--maya-warning-muted)', textColor: 'var(--maya-warning-text)' },
  { date: \`\${currentYear}-\${currentMonth}-25\`, title: 'Quarterly Review', time: '9:00 AM', color: 'var(--maya-danger-muted)', textColor: 'var(--maya-danger-text)' },
])

const basicCode = `<template>
  <MayaFullCalendar :events="events" />
</template>

<script setup>
import { ref } from 'vue'

const events = ref([
  { date: '2026-05-05', title: 'Design Sync', time: '10:00 AM', color: 'var(--maya-info-muted)', textColor: 'var(--maya-info-text)' },
  { date: '2026-05-12', title: 'Project Release', time: '12:00 AM', color: 'var(--maya-primary-muted)', textColor: 'var(--maya-primary)' }
])
<\/script>`

const calendarProps = [
  { name: 'events', type: 'Array', default: '[]', description: 'Array of event objects: { date, title, time, description, color, textColor }.' },
  { name: '#day', type: 'Slot', default: '—', description: 'Overrides the default day cell rendering. Props: { day, date, events }.' },
  { name: '#day-card', type: 'Slot', default: '—', description: 'Overrides the content inside the expandable day dialog. Props: { day, date, events }.' }
]
</script>

<style scoped>
.page-content {
  display: flex;
  flex-direction: column;
  gap: 32px;
}
.component-header {
  margin-bottom: 2rem;
}
.component-title {
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
}
.component-desc {
  color: var(--maya-text-muted);
}
</style>
