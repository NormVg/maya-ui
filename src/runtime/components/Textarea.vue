<template>
  <div class="maya-textarea-wrapper">
    <label v-if="label" class="maya-textarea-label">{{ label }}</label>
    <textarea class="maya-textarea" :class="{ 'maya-textarea--disabled': disabled }" :value="modelValue"
      :placeholder="placeholder" :disabled="disabled" :rows="rows"
      @input="$emit('update:modelValue', $event.target.value)" />
  </div>
</template>

<script setup>
defineProps({
  modelValue: { type: String, default: '' },
  placeholder: { type: String, default: '' },
  label: { type: String, default: '' },
  rows: { type: Number, default: 4 },
  disabled: { type: Boolean, default: false },
})
defineEmits(['update:modelValue'])
</script>

<style scoped>
.maya-textarea-wrapper {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.maya-textarea-label {
  font-size: 0.8125rem;
  font-weight: 500;
  color: var(--maya-text-primary);
}

.maya-textarea {
  background: var(--maya-input-bg) var(--maya-input-gradient);
  box-shadow: var(--maya-input-shadow);
  border: 1px solid var(--maya-border-strong);
  border-radius: var(--maya-radius-md);
  padding: 8px 12px;
  font-size: 0.8125rem;
  color: var(--maya-text-primary);
  width: 100%;
  outline: none;
  resize: vertical;
  font-family: inherit;
  line-height: 1.5;
  transition: all var(--maya-duration) var(--maya-ease);
}

.maya-textarea::placeholder {
  color: var(--maya-text-muted);
}

.maya-textarea:focus {
  border-color: var(--maya-input-focus-border);
}

.maya-textarea--disabled {
  opacity: 0.4;
  cursor: not-allowed;
}
</style>
