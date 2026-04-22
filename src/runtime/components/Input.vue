<template>
  <div class="maya-input-wrapper">
    <label v-if="label" class="maya-input-label">{{ label }}</label>
    <input class="maya-input" :class="{ 'maya-input--disabled': disabled }" :value="modelValue"
      :placeholder="placeholder" :disabled="disabled" :type="type"
      @input="$emit('update:modelValue', $event.target.value)" />
  </div>
</template>

<script setup>
defineProps({
  modelValue: { type: String, default: '' },
  placeholder: { type: String, default: '' },
  label: { type: String, default: '' },
  type: { type: String, default: 'text' },
  disabled: { type: Boolean, default: false },
})
defineEmits(['update:modelValue'])
</script>

<style scoped>
.maya-input-wrapper {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.maya-input-label {
  font-size: 0.8125rem;
  font-weight: 500;
  color: var(--maya-text-primary);
}

.maya-input {
  background: var(--maya-input-bg) var(--maya-input-gradient);
  box-shadow: var(--maya-input-shadow);
  border: 1px solid var(--maya-border-strong);
  border-radius: var(--maya-radius-md);
  padding: 8px 12px;
  font-size: 0.8125rem;
  color: var(--maya-text-primary);
  width: 100%;
  outline: none;
  transition: all var(--maya-duration) var(--maya-ease);
}

.maya-input::placeholder {
  color: var(--maya-text-muted);
}

.maya-input:focus {
  border-color: var(--maya-input-focus-border);
}

.maya-input--disabled {
  opacity: 0.4;
  cursor: not-allowed;
}
</style>
