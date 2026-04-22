<template>
  <label class="maya-checkbox" :class="{ 'maya-checkbox--disabled': disabled }">
    <input type="checkbox" class="maya-checkbox-input" :checked="modelValue" :disabled="disabled"
      @change="$emit('update:modelValue', $event.target.checked)" />
    <span class="maya-checkbox-box">
      <svg v-if="modelValue" viewBox="0 0 12 12" fill="none" class="maya-checkbox-icon">
        <path d="M2.5 6L5 8.5L9.5 3.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"
          stroke-linejoin="round" />
      </svg>
    </span>
    <span v-if="label" class="maya-checkbox-label">{{ label }}</span>
  </label>
</template>

<script setup>
defineProps({
  modelValue: { type: Boolean, default: false },
  label: { type: String, default: '' },
  disabled: { type: Boolean, default: false },
})
defineEmits(['update:modelValue'])
</script>

<style scoped>
.maya-checkbox {
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  user-select: none;
  padding: 4px;
  margin: -4px;
  border-radius: var(--maya-radius-md);
  transition: all 0.1s ease;
}

.maya-checkbox:active .maya-checkbox-box {
  transform: scale(0.92);
}

.maya-checkbox-input {
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;
}

.maya-checkbox-box {
  width: 16px;
  height: 16px;
  background: var(--maya-checkbox-bg) var(--maya-checkbox-gradient);
  box-shadow: var(--maya-checkbox-shadow);
  border: 1px solid var(--maya-border-hover);
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all var(--maya-duration) var(--maya-ease);
  flex-shrink: 0;
}

.maya-checkbox-input:checked+.maya-checkbox-box {
  background: var(--maya-checkbox-checked-bg);
  border-color: var(--maya-checkbox-checked-border);
}

.maya-checkbox-icon {
  width: 10px;
  height: 10px;
  color: var(--maya-checkbox-check-color);
}

.maya-checkbox-label {
  font-size: 0.8125rem;
  color: var(--maya-text-primary);
}

.maya-checkbox--disabled {
  opacity: 0.4;
  cursor: not-allowed;
  pointer-events: none;
}
</style>
