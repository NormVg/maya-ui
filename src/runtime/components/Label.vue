<template>
  <label class="maya-label" :class="{
    'maya-label--disabled': disabled,
  }">
    <slot />
    <span v-if="required" class="maya-label-required" aria-hidden="true">*</span>
    <span v-if="hint" class="maya-label-hint">{{ hint }}</span>
  </label>
</template>

<script setup>
defineProps({
  required: { type: Boolean, default: false },
  disabled: { type: Boolean, default: false },
  hint: { type: String, default: '' },
})
</script>

<style scoped>
.maya-label {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-size: 0.8125rem;
  font-weight: 500;
  color: var(--maya-text-primary);
  font-family: var(--maya-font-sans);
  line-height: 1.4;
  cursor: default;
  transition: color var(--maya-duration) var(--maya-ease);
}

.maya-label-required {
  color: var(--maya-danger-text);
  font-size: 0.875em;
  line-height: 1;
}

.maya-label-hint {
  font-size: 0.75rem;
  font-weight: 400;
  color: var(--maya-text-muted);
  margin-left: 2px;
}

.maya-label--disabled {
  opacity: 0.45;
  cursor: not-allowed;
}
</style>
