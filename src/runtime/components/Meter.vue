<template>
  <div class="maya-meter-container">
    <div class="maya-meter-header" v-if="showLabel">
      <span class="maya-meter-label">
        <slot name="label">{{ label }}</slot>
      </span>
      <span class="maya-meter-value">
        <slot name="valueText">{{ valueText || `${Math.round((value / max) * 100)}%` }}</slot>
      </span>
    </div>

    <div class="maya-meter" role="meter" :aria-valuenow="value" :aria-valuemin="min" :aria-valuemax="max">
      <div class="maya-meter__indicator" :class="[`maya-meter__indicator--intent-${currentIntent}`]"
        :style="{ transform: `translateX(-${100 - fillPercentage}%)` }" />
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  value: { type: Number, default: 0 },
  min: { type: Number, default: 0 },
  max: { type: Number, default: 100 },
  label: { type: String, default: '' },
  valueText: { type: String, default: '' },
  showLabel: { type: Boolean, default: false },

  // High indicates danger if exceeded (like disk space)
  // Low indicates danger if dropped below (like battery)
  lowThreshold: { type: Number, default: 30 },
  highThreshold: { type: Number, default: 80 },
  optimum: { type: Number, default: 50 }, // Determines if high value is "good" or "bad"
})

const fillPercentage = computed(() => {
  const range = props.max - props.min
  if (range <= 0) return 0
  const clamped = Math.max(props.min, Math.min(props.max, props.value))
  return ((clamped - props.min) / range) * 100
})

const currentIntent = computed(() => {
  const percentage = fillPercentage.value

  // If optimum is low (closer to 0), high values are bad (e.g. Server Load)
  if (props.optimum <= props.max / 2) {
    if (percentage > props.highThreshold) return 'danger'
    if (percentage > props.lowThreshold) return 'warning'
    return 'success'
  }

  // If optimum is high (closer to max), low values are bad (e.g. Battery)
  if (percentage < props.lowThreshold) return 'danger'
  if (percentage < props.highThreshold) return 'warning'
  return 'success'
})
</script>

<style scoped>
.maya-meter-container {
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
  font-family: var(--maya-font-sans);
}

.maya-meter-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.8125rem;
}

.maya-meter-label {
  color: var(--maya-text-primary);
  font-weight: 500;
}

.maya-meter-value {
  color: var(--maya-text-secondary);
}

.maya-meter {
  position: relative;
  overflow: hidden;
  border-radius: 9999px;
  background-color: var(--maya-bg-raised);
  height: 8px;
  width: 100%;
  box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.05);
}

.maya-meter__indicator {
  width: 100%;
  height: 100%;
  transition: transform 400ms var(--maya-ease-bouncy), background-color 300ms ease;
  transform-origin: left;
  border-radius: 9999px;
}

/* ─── Intents ─── */
.maya-meter__indicator--intent-success {
  background-color: var(--maya-success);
}

.maya-meter__indicator--intent-warning {
  background-color: var(--maya-warning);
}

.maya-meter__indicator--intent-danger {
  background-color: var(--maya-danger);
}

.maya-meter__indicator--intent-default {
  background-color: var(--maya-text-primary);
}
</style>
