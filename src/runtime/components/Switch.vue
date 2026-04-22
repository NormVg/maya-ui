<template>
  <button class="maya-switch" :class="[
    `maya-switch--${size}`,
    { 'maya-switch--checked': modelValue, 'maya-switch--disabled': disabled }
  ]" role="switch" :aria-checked="modelValue" :disabled="disabled" @click="$emit('update:modelValue', !modelValue)">
    <span class="maya-switch-thumb" />
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
  disabled: { type: Boolean, default: false },
})

defineEmits(['update:modelValue'])
</script>

<style scoped>
.maya-switch {
  position: relative;
  display: inline-flex;
  align-items: center;
  cursor: pointer;
  border: none;
  padding: 0;
  border-radius: 9999px;
  background: var(--maya-bg-raised);
  border: 1px solid var(--maya-border-strong);
  box-shadow: var(--maya-shadow-inset);
  transition:
    background-color 200ms cubic-bezier(0.19, 1, 0.22, 1),
    border-color 200ms cubic-bezier(0.19, 1, 0.22, 1);
  flex-shrink: 0;
}

.maya-switch::after {
  content: '';
  position: absolute;
  inset: -6px;
  border-radius: 9999px;
}

/* Sizes */
.maya-switch--sm {
  width: 28px;
  height: 16px;
}

.maya-switch--md {
  width: 36px;
  height: 20px;
}

.maya-switch--lg {
  width: 44px;
  height: 24px;
}

.maya-switch-thumb {
  position: absolute;
  border-radius: 9999px;
  background: var(--maya-text-muted);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
  transition:
    transform var(--maya-duration-bouncy) var(--maya-ease-bouncy),
    width var(--maya-duration-bouncy) var(--maya-ease-bouncy),
    background-color var(--maya-duration) var(--maya-ease);
}

/* Thumb sizes & Press logic */
.maya-switch--sm .maya-switch-thumb {
  width: 10px;
  height: 10px;
  left: 2px;
}

.maya-switch--sm:active .maya-switch-thumb {
  width: 14px;
}

.maya-switch--md .maya-switch-thumb {
  width: 14px;
  height: 14px;
  left: 2px;
}

.maya-switch--md:active .maya-switch-thumb {
  width: 19px;
}

.maya-switch--lg .maya-switch-thumb {
  width: 18px;
  height: 18px;
  left: 2px;
}

.maya-switch--lg:active .maya-switch-thumb {
  width: 24px;
}

/* Checked state */
.maya-switch--checked {
  background: var(--maya-success-muted);
  border-color: var(--maya-success-border);
}

.maya-switch--checked .maya-switch-thumb {
  background: var(--maya-success);
}

/* Thumb positions when checked */
.maya-switch--sm.maya-switch--checked .maya-switch-thumb {
  transform: translateX(12px);
}

.maya-switch--sm.maya-switch--checked:active .maya-switch-thumb {
  transform: translateX(8px);
}

.maya-switch--md.maya-switch--checked .maya-switch-thumb {
  transform: translateX(16px);
}

.maya-switch--md.maya-switch--checked:active .maya-switch-thumb {
  transform: translateX(11px);
}

.maya-switch--lg.maya-switch--checked .maya-switch-thumb {
  transform: translateX(20px);
}

.maya-switch--lg.maya-switch--checked:active .maya-switch-thumb {
  transform: translateX(14px);
}

.maya-switch--disabled {
  opacity: 0.4;
  cursor: not-allowed;
  pointer-events: none;
}
</style>
