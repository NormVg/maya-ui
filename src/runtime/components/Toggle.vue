<template>
  <button class="maya-toggle" :class="[
    `maya-toggle--${size}`,
    `maya-toggle--intent-${intent}`,
    { 'maya-toggle--pressed': modelValue, 'maya-toggle--disabled': disabled }
  ]" :aria-pressed="modelValue" :disabled="disabled" @click="$emit('update:modelValue', !modelValue)">
    <slot />
  </button>
</template>

<script setup>
defineProps({
  modelValue: { type: Boolean, default: false },
  size: {
    type: String,
    default: 'md',
    validator: (v) => ['sm', 'md', 'lg'].includes(v),
  },
  intent: {
    type: String,
    default: 'default',
    validator: (v) => ['default', 'success', 'warning', 'danger', 'info'].includes(v),
  },
  disabled: { type: Boolean, default: false },
})

defineEmits(['update:modelValue'])
</script>

<style scoped>
.maya-toggle {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  font-family: var(--maya-font-sans);
  font-weight: 500;
  cursor: pointer;
  border-radius: var(--maya-radius-md);
  border: 1px solid var(--maya-border);
  background: transparent;
  color: var(--maya-text-muted);
  transition:
    transform var(--maya-duration-bouncy) var(--maya-ease-bouncy),
    background-color var(--maya-duration) var(--maya-ease),
    color var(--maya-duration) var(--maya-ease),
    border-color var(--maya-duration) var(--maya-ease);
}

.maya-toggle::after {
  content: '';
  position: absolute;
  inset: -6px;
  border-radius: var(--maya-radius-xl);
}

.maya-toggle:active {
  transform: scale(0.96);
}

/* Sizes */
.maya-toggle--sm {
  padding: 6px 10px;
  font-size: 0.75rem;
}

.maya-toggle--md {
  padding: 7px 14px;
  font-size: 0.8125rem;
}

.maya-toggle--lg {
  padding: 9px 18px;
  font-size: 0.875rem;
}

/* Hover (unpressed) */
.maya-toggle:not(.maya-toggle--pressed):hover {
  background: var(--maya-bg-raised);
  color: var(--maya-text-secondary);
  border-color: var(--maya-border-strong);
}

/* ─── Pressed states by intent ─── */
.maya-toggle--pressed.maya-toggle--intent-default {
  background: var(--maya-bg-raised);
  color: var(--maya-text-primary);
  border-color: var(--maya-border-strong);
  box-shadow: var(--maya-shadow-sm);
}

.maya-toggle--pressed.maya-toggle--intent-success {
  background: var(--maya-success-muted);
  color: var(--maya-success-text);
  border-color: var(--maya-success-border);
}

.maya-toggle--pressed.maya-toggle--intent-warning {
  background: var(--maya-warning-muted);
  color: var(--maya-warning-text);
  border-color: var(--maya-warning-border);
}

.maya-toggle--pressed.maya-toggle--intent-danger {
  background: var(--maya-danger-muted);
  color: var(--maya-danger-text);
  border-color: var(--maya-danger-border);
}

.maya-toggle--pressed.maya-toggle--intent-info {
  background: var(--maya-info-muted);
  color: var(--maya-info-text);
  border-color: var(--maya-info-border);
}

.maya-toggle--disabled {
  opacity: 0.4;
  cursor: not-allowed;
  pointer-events: none;
}
</style>
