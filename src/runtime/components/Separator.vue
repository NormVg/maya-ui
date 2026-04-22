<template>
  <div class="maya-separator" :class="[
    `maya-separator--${orientation}`,
    { 'maya-separator--labeled': label }
  ]" role="separator">
    <span v-if="label && orientation === 'horizontal'" class="maya-separator-label">{{ label }}</span>
  </div>
</template>

<script setup>
defineProps({
  orientation: {
    type: String,
    default: 'horizontal',
    validator: (v) => ['horizontal', 'vertical'].includes(v),
  },
  label: { type: String, default: '' },
})
</script>

<style scoped>
.maya-separator {
  flex-shrink: 0;
}

/* Horizontal */
.maya-separator--horizontal {
  width: 100%;
  display: flex;
  align-items: center;
  gap: 12px;
}

.maya-separator--horizontal::before,
.maya-separator--horizontal::after {
  content: '';
  flex: 1;
  height: 1px;
  border-top: 1px dashed var(--maya-dash-color);
}

.maya-separator--horizontal:not(.maya-separator--labeled)::before {
  display: none;
}

.maya-separator--horizontal:not(.maya-separator--labeled)::after {
  content: '';
  flex: 1;
  display: block;
}

.maya-separator--horizontal:not(.maya-separator--labeled) {
  display: block;
  border-top: 1px dashed var(--maya-dash-color);
  height: 0;
}

/* Vertical */
.maya-separator--vertical {
  display: inline-block;
  width: 1px;
  height: 100%;
  min-height: 16px;
  border-left: 1px dashed var(--maya-dash-color);
  align-self: stretch;
}

.maya-separator-label {
  font-size: 0.6875rem;
  font-weight: 500;
  font-family: var(--maya-font-sans);
  color: var(--maya-text-muted);
  text-transform: uppercase;
  letter-spacing: 0.08em;
  white-space: nowrap;
  flex-shrink: 0;
}
</style>
