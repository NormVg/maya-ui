<template>
  <div class="maya-choice-box" :class="`maya-choice-box--${orientation}`" role="radiogroup">
    <slot />
  </div>
</template>

<script setup>
import { provide } from 'vue'

const props = defineProps({
  modelValue: {
    type: [String, Number],
    default: ''
  },
  orientation: {
    type: String,
    default: 'vertical',
    validator: (v) => ['horizontal', 'vertical'].includes(v)
  }
})
const emit = defineEmits(['update:modelValue'])

provide('mayaChoiceActive', () => props.modelValue)
provide('mayaChoiceSetActive', (v) => emit('update:modelValue', v))
</script>

<style scoped>
.maya-choice-box {
  display: flex;
  gap: 12px;
}

.maya-choice-box--vertical {
  flex-direction: column;
}

.maya-choice-box--horizontal {
  flex-direction: row;
}

.maya-choice-box--horizontal :deep(.maya-choice-box-item) {
  flex: 1;
  /* stretches equally in horizontal arrays */
}
</style>
