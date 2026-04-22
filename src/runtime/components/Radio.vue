<template>
  <label class="maya-radio-wrapper" :class="{ disabled }">
    <input type="radio" class="maya-radio-input" :name="name" :value="value" :checked="checked" :disabled="disabled"
      @change="$emit('update:modelValue', value)" />
    <span class="maya-radio" :class="{ 'maya-radio--checked': checked }">
      <span class="maya-radio-dot" />
    </span>
    <span v-if="label || $slots.default" class="maya-radio-label">
      <slot>{{ label }}</slot>
    </span>
  </label>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  modelValue: { type: [String, Number, Boolean], default: undefined },
  value: { type: [String, Number, Boolean], required: true },
  name: { type: String, default: '' },
  label: { type: String, default: '' },
  disabled: { type: Boolean, default: false },
})

defineEmits(['update:modelValue'])

const checked = computed(() => props.modelValue === props.value)
</script>

<style scoped>
.maya-radio-wrapper {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  padding: 4px;
  margin: -4px;
}

.maya-radio-wrapper.disabled {
  cursor: not-allowed;
  opacity: 0.6;
}

.maya-radio-input {
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;
  pointer-events: none;
}

.maya-radio {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  border: 1px solid var(--maya-border);
  background: var(--maya-bg-surface);
  transition: all var(--maya-duration) var(--maya-ease);
  position: relative;
  flex-shrink: 0;
}

/* Hover effect */
.maya-radio::before {
  content: '';
  position: absolute;
  inset: -6px;
  border-radius: 50%;
  background: var(--maya-text-primary);
  opacity: 0;
  transform: scale(0.8);
  transition: all var(--maya-duration) var(--maya-ease);
}

.maya-radio-wrapper:not(.disabled):hover .maya-radio::before {
  opacity: 0.05;
  transform: scale(1);
}

.maya-radio-wrapper:not(.disabled):active .maya-radio {
  transform: scale(0.92);
}

/* Checked State */
.maya-radio.maya-radio--checked {
  border-color: var(--maya-accent);
  background: var(--maya-accent);
}

/* Inner Dot using bouncy transition */
.maya-radio-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--maya-bg-root);
  transform: scale(0);
  transition: transform var(--maya-duration-bouncy) var(--maya-ease-bouncy);
}

.maya-radio--checked .maya-radio-dot {
  transform: scale(1);
}

.maya-radio-label {
  font-size: 0.875rem;
  color: var(--maya-text-primary);
  font-family: var(--maya-font-sans);
  line-height: 1.4;
  user-select: none;
}

.maya-radio-wrapper.disabled .maya-radio-label {
  color: var(--maya-text-muted);
}
</style>
