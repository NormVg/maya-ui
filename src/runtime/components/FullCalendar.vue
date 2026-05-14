<template>
  <div class="maya-full-calendar">
    <div class="calendar-header">
      <div class="calendar-nav">
        <MayaBtn variant="outline" size="icon" @click="prevMonth" aria-label="Previous month">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="m15 18-6-6 6-6"/>
          </svg>
        </MayaBtn>
        <h2 class="calendar-title">{{ monthLabel }}</h2>
        <MayaBtn variant="outline" size="icon" @click="nextMonth" aria-label="Next month">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="m9 18 6-6-6-6"/>
          </svg>
        </MayaBtn>
      </div>
      <div class="calendar-actions">
        <MayaBtn variant="secondary" @click="goToToday">Today</MayaBtn>
      </div>
    </div>

    <div class="calendar-grid-header">
      <div class="calendar-weekday" v-for="d in weekdays" :key="d">{{ d }}</div>
    </div>

    <div class="calendar-grid">
      <!-- Empty leading cells -->
      <div v-for="n in firstDayOffset" :key="'empty-' + n" class="calendar-cell is-empty"></div>

      <!-- Day cells -->
      <div
        v-for="day in daysInMonth"
        :key="day"
        class="calendar-cell"
        :class="{ 'is-today': isToday(day) }"
        @click="openDayCard(day)"
      >
        <div class="cell-header">
          <span class="day-number">{{ day }}</span>
        </div>
        <div class="cell-content">
          <slot name="day" :day="day" :date="getDate(day)" :events="getEventsForDay(day)">
            <!-- Default rendering if events are passed via props -->
            <div class="event-badges" v-if="getEventsForDay(day).length">
              <div 
                v-for="(event, idx) in getEventsForDay(day).slice(0, 3)" 
                :key="idx" 
                class="event-badge"
                :style="{ backgroundColor: event.color || 'var(--maya-primary-muted)', color: event.textColor || 'var(--maya-primary)' }"
              >
                <span class="event-title">{{ event.title }}</span>
              </div>
              <div v-if="getEventsForDay(day).length > 3" class="event-more">
                +{{ getEventsForDay(day).length - 3 }} more
              </div>
            </div>
          </slot>
        </div>
      </div>
    </div>

    <!-- Expandable Day Card (Dialog) -->
    <MayaDialog v-model:open="isCardOpen">
      <template #title>
        Events for {{ selectedCardDateFormatted }}
      </template>
      <div class="day-card-content">
        <slot name="day-card" :day="selectedDay" :date="selectedDate" :events="selectedDayEvents">
          <div v-if="selectedDayEvents.length === 0" class="no-events">
            No events scheduled for this day.
          </div>
          <div class="event-list" v-else>
            <div 
              v-for="(event, idx) in selectedDayEvents" 
              :key="idx" 
              class="event-list-item"
              :style="{ borderLeftColor: event.color || 'var(--maya-primary)' }"
            >
              <div class="event-time" v-if="event.time">{{ event.time }}</div>
              <div class="event-details">
                <h4 class="event-item-title">{{ event.title }}</h4>
                <p class="event-item-desc" v-if="event.description">{{ event.description }}</p>
              </div>
            </div>
          </div>
        </slot>
      </div>
      <template #footer>
        <MayaBtn variant="outline" @click="isCardOpen = false">Close</MayaBtn>
        <slot name="day-card-actions" :day="selectedDay" :date="selectedDate" />
      </template>
    </MayaDialog>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  events: {
    type: Array,
    default: () => []
    // Example event: { date: Date|String, title: 'Meeting', time: '10:00 AM', color: '#ff0000', description: '...' }
  }
})

const today = new Date()
const viewYear = ref(today.getFullYear())
const viewMonth = ref(today.getMonth())

const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
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

const goToToday = () => {
  viewYear.value = today.getFullYear()
  viewMonth.value = today.getMonth()
}

const isToday = (day) => {
  return day === today.getDate() && viewMonth.value === today.getMonth() && viewYear.value === today.getFullYear()
}

const getDate = (day) => {
  return new Date(viewYear.value, viewMonth.value, day)
}

// Normalize event dates to YYYY-MM-DD for easy comparison
const normalizedEvents = computed(() => {
  return props.events.map(ev => {
    const d = new Date(ev.date)
    return {
      ...ev,
      _dateStr: `${d.getFullYear()}-${String(d.getMonth()).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
    }
  })
})

const getEventsForDay = (day) => {
  const targetStr = `${viewYear.value}-${String(viewMonth.value).padStart(2, '0')}-${String(day).padStart(2, '0')}`
  return normalizedEvents.value.filter(ev => ev._dateStr === targetStr)
}

// Expandable Card state
const isCardOpen = ref(false)
const selectedDay = ref(1)

const selectedDate = computed(() => getDate(selectedDay.value))
const selectedDayEvents = computed(() => getEventsForDay(selectedDay.value))

const selectedCardDateFormatted = computed(() => {
  return selectedDate.value.toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })
})

const openDayCard = (day) => {
  selectedDay.value = day
  isCardOpen.value = true
}
</script>

<style scoped>
.maya-full-calendar {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  min-height: 600px;
  background: var(--maya-bg-surface);
  border: 1px solid var(--maya-border);
  border-radius: var(--maya-radius-xl);
  overflow: hidden;
}

.calendar-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 24px;
  border-bottom: 1px solid var(--maya-border);
}

.calendar-nav {
  display: flex;
  align-items: center;
  gap: 16px;
}

.calendar-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--maya-text-primary);
  margin: 0;
  min-width: 180px;
  text-align: center;
}

.calendar-grid-header {
  display: grid;
  grid-template-columns: repeat(7, minmax(0, 1fr));
  border-bottom: 1px solid var(--maya-border);
  background: var(--maya-bg-root);
}

.calendar-weekday {
  padding: 12px;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  color: var(--maya-text-muted);
  text-align: center;
  letter-spacing: 0.05em;
  overflow: hidden;
  text-overflow: ellipsis;
}

.calendar-grid {
  display: grid;
  grid-template-columns: repeat(7, minmax(0, 1fr));
  grid-auto-rows: minmax(120px, 1fr);
  flex: 1;
  background: var(--maya-border); /* acts as grid lines */
  gap: 1px;
}

.calendar-cell {
  background: var(--maya-bg-surface);
  padding: 8px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  cursor: pointer;
  transition: background-color 150ms var(--maya-ease);
}

.calendar-cell:hover {
  background: var(--maya-bg-root);
}

.calendar-cell.is-empty {
  background: var(--maya-bg-root);
  opacity: 0.5;
  cursor: default;
}

.cell-header {
  display: flex;
  justify-content: flex-end;
}

.day-number {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--maya-text-secondary);
  border-radius: 50%;
}

.calendar-cell.is-today .day-number {
  background: var(--maya-primary);
  color: #fff;
  font-weight: 600;
}

.cell-content {
  flex: 1;
  overflow: hidden;
}

.event-badges {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.event-badge {
  padding: 4px 6px;
  border-radius: 4px;
  font-size: 0.75rem;
  font-weight: 500;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  box-shadow: inset 0 0 0 1px rgba(0,0,0,0.05);
}

.event-more {
  font-size: 0.6875rem;
  font-weight: 600;
  color: var(--maya-text-muted);
  padding-left: 2px;
  margin-top: 2px;
}

/* Day Card / Dialog Content */
.day-card-content {
  min-height: 150px;
  max-height: 60vh;
  overflow-y: auto;
}

.no-events {
  padding: 32px 0;
  text-align: center;
  color: var(--maya-text-muted);
  font-size: 0.875rem;
}

.event-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 8px 0;
}

.event-list-item {
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 12px 16px;
  background: var(--maya-bg-root);
  border: 1px solid var(--maya-border);
  border-left-width: 4px;
  border-radius: var(--maya-radius-md);
}

.event-time {
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--maya-text-muted);
}

.event-item-title {
  margin: 0;
  font-size: 0.9375rem;
  font-weight: 600;
  color: var(--maya-text-primary);
}

.event-item-desc {
  margin: 4px 0 0;
  font-size: 0.875rem;
  color: var(--maya-text-secondary);
  line-height: 1.4;
}
</style>
