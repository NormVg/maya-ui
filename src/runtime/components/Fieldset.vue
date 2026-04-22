<template>
  <fieldset class="maya-fieldset" :disabled="disabled">
    <legend v-if="legend || $slots.legend" class="maya-fieldset-legend">
      <slot name="legend">{{ legend }}</slot>
    </legend>
    <div v-if="description || $slots.description" class="maya-fieldset-description">
      <slot name="description">{{ description }}</slot>
    </div>

    <div class="maya-fieldset-content">
      <slot />
    </div>
  </fieldset>
</template>

<script setup>
defineProps({
  legend: { type: String, default: '' },
  description: { type: String, default: '' },
  disabled: { type: Boolean, default: false }
})
</script>

<style scoped>
.maya-fieldset {
  border: 1px solid var(--maya-border);
  border-radius: var(--maya-radius-lg);
  padding: 24px;
  margin: 0;
  min-width: 0;
  background: var(--maya-bg-root);
}

.maya-fieldset:disabled {
  opacity: 0.6;
  pointer-events: none;
}

.maya-fieldset-legend {
  font-family: var(--maya-font-sans);
  font-size: 1rem;
  font-weight: 500;
  color: var(--maya-text-primary);
  padding: 0 8px;
  /* Breathing room against the border cut */
  margin-left: -8px;
  /* visually align with content */
}

.maya-fieldset-description {
  font-family: var(--maya-font-sans);
  font-size: 0.875rem;
  color: var(--maya-text-secondary);
  margin-bottom: 20px;
  line-height: 1.5;
}

/* If there's no description, make sure the legend doesn't stick directly to inputs */
.maya-fieldset-legend+.maya-fieldset-content {
  margin-top: 20px;
}

.maya-fieldset-description+.maya-fieldset-content {
  margin-top: 0;
}

.maya-fieldset-content {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
</style>
