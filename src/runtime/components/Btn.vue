<template>
  <button class="maya-btn" :class="[
    `maya-btn--${variant}`,
    `maya-btn--${size}`,
    { 'maya-btn--disabled': disabled }
  ]" :disabled="disabled" @click="$emit('click', $event)">
    <slot />
  </button>
</template>

<script setup>
defineProps({
  variant: {
    type: String,
    default: 'primary',
    validator: (v) => ['primary', 'secondary', 'ghost'].includes(v),
  },
  size: {
    type: String,
    default: 'md',
    validator: (v) => ['sm', 'md', 'lg'].includes(v),
  },
  disabled: {
    type: Boolean,
    default: false,
  },
})

defineEmits(['click'])
</script>

<style scoped>
.maya-btn {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-weight: 500;
  border: none;
  cursor: pointer;
  transition: all var(--maya-duration) var(--maya-ease);
  border-radius: var(--maya-radius-md);
  line-height: 1;
  white-space: nowrap;
}

.maya-btn::after {
  content: '';
  position: absolute;
  inset: -6px;
  border-radius: var(--maya-radius-xl);
}

.maya-btn:active {
  transform: scale(0.96);
}

/* Sizes */
.maya-btn--sm {
  padding: 6px 12px;
  font-size: 0.75rem;
  border-radius: var(--maya-radius-sm);
}

.maya-btn--md {
  padding: 8px 16px;
  font-size: 0.8125rem;
}

.maya-btn--lg {
  padding: 10px 20px;
  font-size: 0.875rem;
}

/* Primary */
.maya-btn--primary {
  background: var(--maya-btn-primary-bg) var(--maya-btn-primary-gradient);
  color: var(--maya-btn-primary-text);
  box-shadow: var(--maya-btn-primary-shadow);
}

.maya-btn--primary:hover {
  background: var(--maya-btn-primary-bg-hover) var(--maya-btn-primary-gradient);
}

/* Secondary */
.maya-btn--secondary {
  background-color: var(--maya-btn-secondary-bg);
  color: var(--maya-btn-secondary-text);
  border: 1px solid var(--maya-border-strong);
  box-shadow: var(--maya-btn-secondary-shadow);
}

.maya-btn--secondary:hover {
  background-color: var(--maya-btn-secondary-bg-hover);
  border-color: var(--maya-border-hover);
}

/* Ghost */
.maya-btn--ghost {
  background-color: var(--maya-btn-ghost-bg);
  color: var(--maya-btn-ghost-text);
}

.maya-btn--ghost:hover {
  background-color: var(--maya-btn-ghost-bg-hover);
  color: var(--maya-btn-ghost-text-hover);
}

/* Disabled */
.maya-btn--disabled {
  opacity: 0.4;
  cursor: not-allowed;
  pointer-events: none;
}
</style>
