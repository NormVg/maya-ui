<template>
  <div class="maya-color-panels" :class="`maya-color-panels--${cols}`">
    <button
      v-for="color in colors"
      :key="color.value"
      class="maya-color-panel"
      :class="{ 'is-active': modelValue === color.value }"
      @click="emit('update:modelValue', color.value)"
      :title="color.label || color.value"
    >
      <span class="maya-color-panel-swatch" :style="{ background: color.value }">
        <!-- Checkmark for selected -->
        <svg v-if="modelValue === color.value" class="maya-color-panel-check" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="20 6 9 17 4 12"/>
        </svg>
      </span>
      <span v-if="showLabel" class="maya-color-panel-label">{{ color.label || color.value }}</span>
    </button>
  </div>
</template>

<script setup>
defineProps({
  modelValue: { type: String, default: '' },
  colors: {
    type: Array,
    default: () => [
      { value: '#ef4444', label: 'Red' },
      { value: '#f97316', label: 'Orange' },
      { value: '#eab308', label: 'Yellow' },
      { value: '#22c55e', label: 'Green' },
      { value: '#06b6d4', label: 'Cyan' },
      { value: '#6366f1', label: 'Indigo' },
      { value: '#a855f7', label: 'Purple' },
      { value: '#ec4899', label: 'Pink' },
    ]
  },
  cols: {
    type: [String, Number],
    default: 'auto',
  },
  showLabel: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['update:modelValue'])
</script>

<style scoped>
.maya-color-panels {
  display: grid;
  gap: 10px;
  grid-template-columns: repeat(4, 1fr);
}

.maya-color-panels--auto {
  grid-template-columns: repeat(auto-fill, minmax(60px, 1fr));
}

.maya-color-panels--2 { grid-template-columns: repeat(2, 1fr); }
.maya-color-panels--3 { grid-template-columns: repeat(3, 1fr); }
.maya-color-panels--4 { grid-template-columns: repeat(4, 1fr); }
.maya-color-panels--6 { grid-template-columns: repeat(6, 1fr); }
.maya-color-panels--8 { grid-template-columns: repeat(8, 1fr); }

.maya-color-panel {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  padding: 0;
  background: none;
  border: none;
  cursor: pointer;
  transition: transform 150ms var(--maya-ease-out);
}

.maya-color-panel:hover {
  transform: scale(1.06);
}

.maya-color-panel:active {
  transform: scale(0.94);
}

.maya-color-panel-swatch {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  aspect-ratio: 1;
  border-radius: var(--maya-radius-lg);
  box-shadow:
    inset 0 1px 0 rgba(255,255,255,0.2),
    0 2px 6px rgba(0,0,0,0.2);
  transition: all 150ms var(--maya-ease-out);
  overflow: hidden;
}

.maya-color-panel.is-active .maya-color-panel-swatch {
  box-shadow:
    inset 0 1px 0 rgba(255,255,255,0.2),
    0 0 0 3px var(--maya-bg-root),
    0 0 0 5px currentColor,
    0 4px 12px rgba(0,0,0,0.3);
  transform: scale(0.95);
}

.maya-color-panel-check {
  filter: drop-shadow(0 1px 2px rgba(0,0,0,0.4));
  animation: check-in 300ms var(--maya-ease-bouncy) forwards;
}

@keyframes check-in {
  from { opacity: 0; transform: scale(0.4) rotate(-20deg); }
  to { opacity: 1; transform: scale(1) rotate(0deg); }
}

.maya-color-panel-label {
  font-size: 0.7rem;
  font-family: var(--maya-font-sans);
  color: var(--maya-text-tertiary);
  text-align: center;
  line-height: 1;
}

.maya-color-panel.is-active .maya-color-panel-label {
  color: var(--maya-text-primary);
  font-weight: 500;
}
</style>
