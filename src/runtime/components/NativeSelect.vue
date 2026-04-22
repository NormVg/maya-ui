<template>
  <div class="maya-native-select-wrapper" :class="{ disabled }">
    <select class="maya-native-select" :name="name" :value="modelValue" :disabled="disabled"
      @change="$emit('update:modelValue', $event.target.value)">
      <slot />
    </select>
    <!-- Custom Chevron -->
    <svg class="maya-native-select-icon" viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor"
      stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <polyline points="6 9 12 15 18 9" />
    </svg>
  </div>
</template>

<script setup>
defineProps({
  modelValue: { type: [String, Number], default: '' },
  name: { type: String, default: '' },
  disabled: { type: Boolean, default: false },
})
defineEmits(['update:modelValue'])
</script>

<style scoped>
.maya-native-select-wrapper {
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
}

.maya-native-select-wrapper.disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.maya-native-select {
  width: 100%;
  appearance: none;
  background: var(--maya-bg-surface);
  border: 1px solid var(--maya-border);
  border-radius: var(--maya-radius-md);
  color: var(--maya-text-primary);
  font-family: var(--maya-font-sans);
  font-size: 0.875rem;
  padding: 8px 36px 8px 12px;
  /* Extra padding on right for icon */
  height: 36px;
  outline: none;
  transition: all var(--maya-duration) var(--maya-ease);
  cursor: pointer;
}

.maya-native-select:focus-visible {
  border-color: var(--maya-accent);
  box-shadow: 0 0 0 1px var(--maya-accent);
}

.maya-native-select-wrapper.disabled .maya-native-select {
  background: var(--maya-bg-root);
  cursor: not-allowed;
}

.maya-native-select-icon {
  position: absolute;
  right: 12px;
  pointer-events: none;
  color: var(--maya-text-muted);
  transition: color var(--maya-duration) var(--maya-ease);
}

.maya-native-select:focus-visible~.maya-native-select-icon {
  color: var(--maya-accent);
}
</style>
