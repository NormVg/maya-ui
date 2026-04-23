<template>
  <div class="maya-calendar">
    <!-- Header -->
    <div class="maya-calendar-header">
      <button class="maya-calendar-nav" @click="prevMonth" aria-label="Previous month">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="m15 18-6-6 6-6"/>
        </svg>
      </button>
      <span class="maya-calendar-title">{{ monthLabel }}</span>
      <button class="maya-calendar-nav" @click="nextMonth" aria-label="Next month">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="m9 18 6-6-6-6"/>
        </svg>
      </button>
    </div>

    <!-- Weekday labels -->
    <div class="maya-calendar-grid">
      <div class="maya-calendar-weekday" v-for="d in weekdays" :key="d">{{ d }}</div>

      <!-- Empty leading cells -->
      <div v-for="n in firstDayOffset" :key="'e' + n" class="maya-calendar-cell maya-calendar-empty"></div>

      <!-- Day cells -->
      <button
        v-for="day in daysInMonth"
        :key="day"
        class="maya-calendar-cell maya-calendar-day"
        :class="{
          'is-today': isToday(day),
          'is-selected': isSelected(day),
          'is-outside': false,
        }"
        @click="selectDay(day)"
      >
        {{ day }}
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  modelValue: { type: Date, default: null }
})
const emit = defineEmits(['update:modelValue'])

const today = new Date()
const viewYear = ref(today.getFullYear())
const viewMonth = ref(today.getMonth()) // 0-indexed

const weekdays = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']
const monthNames = ['January','February','March','April','May','June','July','August','September','October','November','December']

const monthLabel = computed(() => `${monthNames[viewMonth.value]} ${viewYear.value}`)

const daysInMonth = computed(() => {
  return new Date(viewYear.value, viewMonth.value + 1, 0).getDate()
})

const firstDayOffset = computed(() => {
  return new Date(viewYear.value, viewMonth.value, 1).getDay()
})

const prevMonth = () => {
  if (viewMonth.value === 0) { viewMonth.value = 11; viewYear.value-- }
  else viewMonth.value--
}

const nextMonth = () => {
  if (viewMonth.value === 11) { viewMonth.value = 0; viewYear.value++ }
  else viewMonth.value++
}

const isToday = (day) => {
  return day === today.getDate() && viewMonth.value === today.getMonth() && viewYear.value === today.getFullYear()
}

const isSelected = (day) => {
  if (!props.modelValue) return false
  const d = props.modelValue
  return day === d.getDate() && viewMonth.value === d.getMonth() && viewYear.value === d.getFullYear()
}

const selectDay = (day) => {
  emit('update:modelValue', new Date(viewYear.value, viewMonth.value, day))
}
</script>

<style scoped>
.maya-calendar {
  display: inline-flex;
  flex-direction: column;
  gap: 12px;
  padding: 16px;
  background: var(--maya-bg-surface);
  border-radius: var(--maya-radius-xl);
  box-shadow:
    inset 0 1px 0 rgba(255,255,255,0.05),
    inset 0 0 0 1px var(--maya-border-subtle),
    0 4px 16px rgba(0,0,0,0.25),
    0 1px 4px rgba(0,0,0,0.2);
  width: 280px;
}

.maya-calendar-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.maya-calendar-title {
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--maya-text-primary);
  font-family: var(--maya-font-sans);
}

.maya-calendar-nav {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  background: transparent;
  border: none;
  border-radius: var(--maya-radius-md);
  color: var(--maya-text-secondary);
  cursor: pointer;
  transition: all 150ms var(--maya-ease-out);
}

.maya-calendar-nav:hover {
  background: var(--maya-bg-surface-elevated);
  color: var(--maya-text-primary);
}

.maya-calendar-nav:active {
  transform: scale(0.9);
}

.maya-calendar-grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 2px;
}

.maya-calendar-weekday {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 32px;
  font-size: 0.75rem;
  font-family: var(--maya-font-sans);
  font-weight: 500;
  color: var(--maya-text-tertiary);
}

.maya-calendar-cell {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 36px;
  font-size: 0.8125rem;
  font-family: var(--maya-font-sans);
  font-weight: 400;
  border-radius: var(--maya-radius-md);
}

.maya-calendar-day {
  background: transparent;
  border: none;
  color: var(--maya-text-secondary);
  cursor: pointer;
  transition: all 150ms var(--maya-ease-out);
  position: relative;
}

.maya-calendar-day:hover {
  background: var(--maya-bg-surface-elevated);
  color: var(--maya-text-primary);
}

.maya-calendar-day:active {
  transform: scale(0.88);
}

.maya-calendar-day.is-today {
  color: var(--maya-text-primary);
  font-weight: 600;
}

.maya-calendar-day.is-today::after {
  content: '';
  position: absolute;
  bottom: 5px;
  left: 50%;
  transform: translateX(-50%);
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background: var(--maya-accent);
}

.maya-calendar-day.is-selected {
  background: var(--maya-accent);
  color: white;
  font-weight: 600;
  box-shadow:
    0 2px 8px rgba(99, 102, 241, 0.4),
    0 1px 2px rgba(0,0,0,0.2);
}

.maya-calendar-day.is-selected:hover {
  background: var(--maya-accent-hover, var(--maya-accent));
}
</style>
