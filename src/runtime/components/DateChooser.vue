<template>
  <div class="maya-date-chooser" ref="container" :class="{ disabled }">
    <button type="button" class="maya-date-chooser-trigger" :class="{ 'is-open': isOpen }" @click="toggle"
      :disabled="disabled" aria-haspopup="dialog" :aria-expanded="isOpen">
      <span class="maya-date-chooser-value" :class="{ 'has-value': modelValue }">
        {{ displayValue }}
      </span>
      <svg class="maya-date-chooser-icon" viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor"
        stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
        <line x1="16" y1="2" x2="16" y2="6" />
        <line x1="8" y1="2" x2="8" y2="6" />
        <line x1="3" y1="10" x2="21" y2="10" />
      </svg>
    </button>

    <Transition name="maya-date-chooser-dropdown">
      <div v-if="isOpen" class="maya-date-chooser-popover" role="dialog" tabindex="-1">
        <div class="maya-calendar-header">
          <button type="button" class="maya-calendar-nav" @click="prevPage" aria-label="Previous">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"
              stroke-linecap="round" stroke-linejoin="round">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>
          <button type="button" class="maya-calendar-title-btn" @click="toggleViewMode">
            <template v-if="viewMode === 'date'">{{ currentMonthName }} {{ currentYear }}</template>
            <template v-else>{{ yearRangeStart + 1 }} - {{ yearRangeStart + 10 }}</template>
          </button>
          <button type="button" class="maya-calendar-nav" @click="nextPage" aria-label="Next">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"
              stroke-linecap="round" stroke-linejoin="round">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        </div>

        <div v-if="viewMode === 'date'" class="maya-calendar-grid">
          <!-- Days of Week -->
          <div v-for="day in daysOfWeek" :key="day" class="maya-calendar-dow">
            {{ day }}
          </div>

          <!-- Month Days -->
          <button v-for="(dateObj, index) in calendarDays" :key="index" type="button" class="maya-calendar-day" :class="{
            'is-today': isToday(dateObj.date),
            'is-selected': isSelected(dateObj.date),
            'is-other-month': !dateObj.isCurrentMonth
          }" @click="selectDate(dateObj.date)">
            {{ dateObj.day }}
          </button>
        </div>

        <div v-else-if="viewMode === 'year'" class="maya-year-grid">
          <!-- Year Selection -->
          <button v-for="(year, index) in visibleYears" :key="year" type="button" class="maya-year-item" :class="{
            'is-other-decade': index === 0 || index === 11,
            'is-current': year === currentYear
          }" @click="selectYear(year)">
            {{ year }}
          </button>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted, onUnmounted } from 'vue'

const props = defineProps({
  modelValue: { type: [Date, String, Number], default: null }, // Accepts a Date or empty
  placeholder: { type: String, default: 'Pick a date' },
  disabled: { type: Boolean, default: false },
})

const emit = defineEmits(['update:modelValue', 'change'])

const isOpen = ref(false)
const container = ref(null)

// Current view state
const currentViewDate = ref(new Date())
const viewMode = ref('date') // 'date' | 'year'
const yearPage = ref(new Date().getFullYear())

// Initialize view to modelValue if present
watch(() => props.modelValue, (val) => {
  if (val) {
    const d = new Date(val)
    if (!isNaN(d.valueOf())) {
      currentViewDate.value = new Date(d.getFullYear(), d.getMonth(), 1)
      yearPage.value = d.getFullYear()
    }
  }
}, { immediate: true })

const currentYear = computed(() => currentViewDate.value.getFullYear())
const currentMonth = computed(() => currentViewDate.value.getMonth())
const currentMonthName = computed(() => {
  return new Intl.DateTimeFormat('en-US', { month: 'long' }).format(currentViewDate.value)
})

const displayValue = computed(() => {
  if (!props.modelValue) return props.placeholder
  const d = new Date(props.modelValue)
  if (isNaN(d.valueOf())) return props.placeholder
  return new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: 'numeric' }).format(d)
})

const daysOfWeek = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']

const calendarDays = computed(() => {
  const year = currentYear.value
  const month = currentMonth.value

  const firstDayOfMonth = new Date(year, month, 1)
  const lastDayOfMonth = new Date(year, month + 1, 0)

  const startingDayOfWeek = firstDayOfMonth.getDay()
  const daysInMonth = lastDayOfMonth.getDate()

  const days = []

  // Previous month padding
  const prevMonthLastDay = new Date(year, month, 0).getDate()
  for (let i = startingDayOfWeek - 1; i >= 0; i--) {
    days.push({
      day: prevMonthLastDay - i,
      date: new Date(year, month - 1, prevMonthLastDay - i),
      isCurrentMonth: false
    })
  }

  // Current month
  for (let i = 1; i <= daysInMonth; i++) {
    days.push({
      day: i,
      date: new Date(year, month, i),
      isCurrentMonth: true
    })
  }

  // Next month padding (keep to 42 cells total for consistent grid height)
  const padLength = 42 - days.length
  for (let i = 1; i <= padLength; i++) {
    days.push({
      day: i,
      date: new Date(year, month + 1, i),
      isCurrentMonth: false
    })
  }

  return days
})

const yearRangeStart = computed(() => {
  return yearPage.value - (yearPage.value % 10) - 1
})

const visibleYears = computed(() => {
  const start = yearRangeStart.value
  return Array.from({ length: 12 }, (_, i) => start + i)
})

function isToday(date) {
  const today = new Date()
  return date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
}

function isSelected(date) {
  if (!props.modelValue) return false
  const selected = new Date(props.modelValue)
  if (isNaN(selected.valueOf())) return false
  return date.getDate() === selected.getDate() &&
    date.getMonth() === selected.getMonth() &&
    date.getFullYear() === selected.getFullYear()
}

function prevPage() {
  if (viewMode.value === 'date') {
    currentViewDate.value = new Date(currentYear.value, currentMonth.value - 1, 1)
  } else {
    yearPage.value -= 10
  }
}

function nextPage() {
  if (viewMode.value === 'date') {
    currentViewDate.value = new Date(currentYear.value, currentMonth.value + 1, 1)
  } else {
    yearPage.value += 10
  }
}

function toggleViewMode() {
  if (viewMode.value === 'date') {
    yearPage.value = currentYear.value
    viewMode.value = 'year'
  } else {
    viewMode.value = 'date'
  }
}

function selectYear(year) {
  currentViewDate.value = new Date(year, currentMonth.value, 1)
  viewMode.value = 'date'
}

function selectDate(date) {
  // Emit an ISO string (usually best for v-model) or Date object based on your needs.
  // Using ISO string format YYYY-MM-DD
  const offset = date.getTimezoneOffset()
  const localDate = new Date(date.getTime() - (offset * 60 * 1000))
  const isoDate = localDate.toISOString().split('T')[0]

  emit('update:modelValue', isoDate)
  emit('change', isoDate)
  isOpen.value = false
}

function toggle() {
  if (!props.disabled) isOpen.value = !isOpen.value
}

function closeDropdown(e) {
  if (isOpen.value && container.value && !e.composedPath().includes(container.value)) {
    isOpen.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', closeDropdown)
})

onUnmounted(() => {
  document.removeEventListener('click', closeDropdown)
})
</script>

<style scoped>
.maya-date-chooser {
  position: relative;
  width: 100%;
}

.maya-date-chooser.disabled {
  opacity: 0.5;
}

.maya-date-chooser-trigger {
  width: 100%;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: var(--maya-bg-surface);
  border: 1px solid var(--maya-border);
  border-radius: var(--maya-radius-md);
  height: 36px;
  padding: 8px 12px;
  font-family: var(--maya-font-sans);
  font-size: 0.875rem;
  color: var(--maya-text-primary);
  outline: none;
  cursor: pointer;
  transition: all var(--maya-duration) var(--maya-ease);
}

.maya-date-chooser-trigger:focus-visible,
.maya-date-chooser-trigger.is-open {
  border-color: var(--maya-input-focus-border);
}

.maya-date-chooser.disabled .maya-date-chooser-trigger {
  background: var(--maya-bg-root);
  cursor: not-allowed;
}

.maya-date-chooser-value {
  color: var(--maya-text-muted);
}

.maya-date-chooser-value.has-value {
  color: var(--maya-text-primary);
}

.maya-date-chooser-icon {
  color: var(--maya-text-muted);
}

.maya-date-chooser-popover {
  position: absolute;
  top: calc(100% + 4px);
  left: 0;
  width: 280px;
  background: var(--maya-bg-surface);
  border: 1px solid var(--maya-border);
  border-radius: var(--maya-radius-md);
  padding: 16px;
  z-index: 50;
  box-shadow: var(--maya-shadow-md);
}

.maya-calendar-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
}

.maya-calendar-title-btn {
  font-size: 0.875rem;
  font-family: var(--maya-font-sans);
  font-weight: 500;
  color: var(--maya-text-primary);
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 4px 8px;
  border-radius: var(--maya-radius-sm);
  transition: all var(--maya-duration) var(--maya-ease);
}

.maya-calendar-title-btn:hover {
  background: var(--maya-bg-root);
}

.maya-calendar-nav {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  border: 1px solid transparent;
  border-radius: var(--maya-radius-sm);
  background: transparent;
  color: var(--maya-text-muted);
  cursor: pointer;
  transition: all var(--maya-duration) var(--maya-ease);
}

.maya-calendar-nav:hover {
  background: var(--maya-bg-root);
  color: var(--maya-text-primary);
}

.maya-calendar-grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 4px;
}

.maya-calendar-dow {
  text-align: center;
  font-size: 0.6875rem;
  font-weight: 500;
  color: var(--maya-text-muted);
  margin-bottom: 4px;
}

.maya-calendar-day {
  display: flex;
  align-items: center;
  justify-content: center;
  aspect-ratio: 1;
  border: none;
  background: transparent;
  border-radius: var(--maya-radius-sm);
  font-family: var(--maya-font-sans);
  font-size: 0.8125rem;
  color: var(--maya-text-primary);
  cursor: pointer;
  transition: all 150ms ease;
  position: relative;
}

/* Fitts's Law Hit area */
.maya-calendar-day::after {
  content: '';
  position: absolute;
  inset: -2px;
}

.maya-calendar-day:hover {
  background: var(--maya-bg-root);
}

.maya-calendar-day.is-other-month {
  color: var(--maya-text-muted);
  opacity: 0.5;
}

.maya-calendar-day.is-today {
  font-weight: 600;
  color: var(--maya-text-primary);
}

.maya-calendar-day.is-selected {
  background: var(--maya-text-primary);
  color: var(--maya-text-inverse);
  font-weight: 500;
}

.maya-date-chooser-dropdown-enter-active {
  transition: opacity 200ms cubic-bezier(0.19, 1, 0.22, 1), transform 200ms cubic-bezier(0.19, 1, 0.22, 1);
}

.maya-date-chooser-dropdown-leave-active {
  transition: opacity 150ms ease;
}

.maya-date-chooser-dropdown-enter-from {
  opacity: 0;
  transform: translateY(-4px) scale(0.98);
}

.maya-date-chooser-dropdown-leave-to {
  opacity: 0;
}

.maya-year-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 8px;
  padding: 8px 0;
}

.maya-year-item {
  display: flex;
  align-items: center;
  justify-content: center;
  aspect-ratio: 2/1;
  border: none;
  background: transparent;
  border-radius: var(--maya-radius-sm);
  font-family: var(--maya-font-sans);
  font-size: 0.875rem;
  color: var(--maya-text-primary);
  cursor: pointer;
  transition: all 150ms ease;
}

.maya-year-item.is-other-decade {
  color: var(--maya-text-muted);
  opacity: 0.5;
}

.maya-year-item:hover {
  background: var(--maya-bg-root);
}

.maya-year-item.is-current {
  background: var(--maya-text-primary);
  color: var(--maya-text-inverse);
  font-weight: 500;
}
</style>
