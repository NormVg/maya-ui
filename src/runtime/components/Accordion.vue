<template>
  <div class="maya-accordion">
    <slot />
  </div>
</template>

<script setup lang="ts">
import { provide, ref, watch } from 'vue'

const props = defineProps({
  type: {
    type: String,
    default: 'single', // 'single' or 'multiple'
  },
  collapsible: {
    type: Boolean,
    default: false, // For 'single', allows closing an open item
  },
  modelValue: {
    type: [String, Array],
    default: undefined
  }
})

const emit = defineEmits(['update:modelValue'])

const internalState = ref<string[]>([])

// Sync with modelValue if provided
watch(() => props.modelValue, (newVal) => {
  if (newVal !== undefined) {
    if (Array.isArray(newVal)) {
      internalState.value = [...(newVal as string[])]
    } else {
      internalState.value = newVal ? [newVal as string] : []
    }
  }
}, { immediate: true })

function toggleItem(value: string) {
  if (props.type === 'single') {
    if (internalState.value[0] === value) {
      if (props.collapsible) {
        internalState.value = []
      }
    } else {
      internalState.value = [value]
    }
  } else {
    // Multiple
    const index = internalState.value.indexOf(value)
    if (index > -1) {
      internalState.value.splice(index, 1)
    } else {
      internalState.value.push(value)
    }
  }

  // Emit
  if (props.type === 'single') {
    emit('update:modelValue', internalState.value[0] || '')
  } else {
    emit('update:modelValue', [...internalState.value])
  }
}

provide('mayaAccordionContext', {
  state: internalState,
  toggleItem
})
</script>

<style scoped>
.maya-accordion {
  display: flex;
  flex-direction: column;
  width: 100%;
}
</style>
