<template>
  <div class="maya-number-field" :class="{ disabled }">
    <button type="button" class="maya-number-field-btn minus" :disabled="disabled || modelValue <= min"
      @click="decrement" aria-label="Decrease value">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
        stroke-linecap="round" stroke-linejoin="round">
        <line x1="5" y1="12" x2="19" y2="12"></line>
      </svg>
    </button>

    <input type="number" class="maya-number-field-input" :value="modelValue" :min="min" :max="max" :step="step"
      :disabled="disabled" @input="onInput" @blur="onBlur" />

    <button type="button" class="maya-number-field-btn plus" :disabled="disabled || modelValue >= max"
      @click="increment" aria-label="Increase value">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
        stroke-linecap="round" stroke-linejoin="round">
        <line x1="12" y1="5" x2="12" y2="19"></line>
        <line x1="5" y1="12" x2="19" y2="12"></line>
      </svg>
    </button>
  </div>
</template>

<script setup>
const props = defineProps({
  modelValue: { type: Number, default: 0 },
  min: { type: Number, default: -Infinity },
  max: { type: Number, default: Infinity },
  step: { type: Number, default: 1 },
  disabled: { type: Boolean, default: false },
})

const emit = defineEmits(['update:modelValue'])

function snapToStep(val) {
  // Prevent floating point errors by rounding to the nearest step precision
  const inv = 1.0 / props.step
  let snapped = Math.round(val * inv) / inv
  return Math.min(Math.max(snapped, props.min), props.max)
}

function increment() {
  if (props.disabled || props.modelValue >= props.max) return
  emit('update:modelValue', snapToStep(props.modelValue + props.step))
}

function decrement() {
  if (props.disabled || props.modelValue <= props.min) return
  emit('update:modelValue', snapToStep(props.modelValue - props.step))
}

function onInput(e) {
  // Allow empty or negative typing manually
  const val = parseFloat(e.target.value)
  if (!isNaN(val)) {
    emit('update:modelValue', val)
  }
}

function onBlur(e) {
  // Enforce min/max/step on blur so user can type freely then snap
  const val = parseFloat(e.target.value)
  if (!isNaN(val)) {
    const snapped = snapToStep(val)
    emit('update:modelValue', snapped)
    e.target.value = snapped
  } else {
    emit('update:modelValue', props.min === -Infinity ? 0 : props.min)
    e.target.value = props.min === -Infinity ? 0 : props.min
  }
}
</script>

<style scoped>
.maya-number-field {
  display: inline-flex;
  align-items: center;
  background: var(--maya-bg-surface);
  border: 1px solid var(--maya-border);
  border-radius: var(--maya-radius-md);
  transition: all var(--maya-duration) var(--maya-ease);
  height: 36px;
  overflow: hidden;
}

.maya-number-field:focus-within {
  border-color: var(--maya-text-primary);
}

.maya-number-field.disabled {
  opacity: 0.5;
  cursor: not-allowed;
  background: var(--maya-bg-root);
}

.maya-number-field-input {
  flex: 1;
  width: 48px;
  height: 100%;
  border: none;
  background: transparent;
  color: var(--maya-text-primary);
  font-family: var(--maya-font-sans);
  font-size: 0.875rem;
  text-align: center;
  outline: none;
  -moz-appearance: textfield;
}

/* Hide native number spin buttons */
.maya-number-field-input::-webkit-outer-spin-button,
.maya-number-field-input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

.maya-number-field-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 100%;
  border: none;
  background: transparent;
  color: var(--maya-text-secondary);
  cursor: pointer;
  transition: all var(--maya-duration) var(--maya-ease);
}

.maya-number-field-btn:not(:disabled):hover {
  background: var(--maya-border);
  color: var(--maya-text-primary);
}

.maya-number-field-btn:not(:disabled):active {
  background: var(--maya-text-primary);
  color: var(--maya-bg-root);
}

.maya-number-field-btn:disabled {
  opacity: 0.3;
  cursor: not-allowed;
}

.maya-number-field:not(.disabled) .maya-number-field-btn:active svg {
  transform: scale(0.85);
  transition: transform var(--maya-duration-bouncy) var(--maya-ease-bouncy);
}
</style>
