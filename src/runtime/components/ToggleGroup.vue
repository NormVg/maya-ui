<template>
  <div class="maya-toggle-group" :class="`maya-toggle-group--${orientation}`" role="group">
    <slot />
  </div>
</template>

<script setup>
import { provide } from 'vue'

const props = defineProps({
  modelValue: {
    type: [String, Number, Array],
    default: null,
  },
  type: {
    type: String,
    default: 'single',
    validator: (v) => ['single', 'multiple'].includes(v),
  },
  orientation: {
    type: String,
    default: 'horizontal',
    validator: (v) => ['horizontal', 'vertical'].includes(v),
  },
})

const emit = defineEmits(['update:modelValue'])

provide('toggleGroup', {
  type: props.type,
  value: () => props.modelValue,
  toggle: (val) => {
    if (props.type === 'single') {
      emit('update:modelValue', props.modelValue === val ? null : val)
    } else {
      const current = Array.isArray(props.modelValue) ? [...props.modelValue] : []
      const idx = current.indexOf(val)
      if (idx > -1) current.splice(idx, 1)
      else current.push(val)
      emit('update:modelValue', current)
    }
  },
})
</script>

<style scoped>
.maya-toggle-group {
  display: inline-flex;
  border: 1px solid var(--maya-border);
  border-radius: var(--maya-radius-md);
  overflow: hidden;
}

.maya-toggle-group--horizontal {
  flex-direction: row;
}

.maya-toggle-group--vertical {
  flex-direction: column;
}

.maya-toggle-group :deep(.maya-toggle) {
  border-radius: 0;
  border: none;
  border-right: 1px solid var(--maya-border);
}

.maya-toggle-group--horizontal :deep(.maya-toggle:last-child) {
  border-right: none;
}

.maya-toggle-group--vertical :deep(.maya-toggle) {
  border-right: none;
  border-bottom: 1px solid var(--maya-border);
}

.maya-toggle-group--vertical :deep(.maya-toggle:last-child) {
  border-bottom: none;
}

.maya-toggle-group :deep(.maya-toggle::after) {
  display: none;
}
</style>
