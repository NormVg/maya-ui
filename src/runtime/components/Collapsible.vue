<template>
  <div class="maya-collapsible">
    <div class="maya-collapsible-trigger" @click="toggle" role="button" :aria-expanded="internalOpen" tabindex="0" @keydown.enter.prevent="toggle" @keydown.space.prevent="toggle">
      <slot name="trigger" :isOpen="internalOpen" />
    </div>

    <div class="maya-collapsible-grid-wrapper" :class="{ 'is-open': internalOpen }">
      <div class="maya-collapsible-content">
        <div class="maya-collapsible-inner">
          <slot :isOpen="internalOpen" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: undefined
  },
  defaultOpen: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['update:modelValue'])

const internalOpen = ref(props.modelValue !== undefined ? props.modelValue : props.defaultOpen)

watch(() => props.modelValue, (newVal) => {
  if (newVal !== undefined) {
    internalOpen.value = newVal
  }
})

function toggle() {
  const nextOpen = !internalOpen.value

  if (props.modelValue === undefined) {
    internalOpen.value = nextOpen
  }

  emit('update:modelValue', nextOpen)
}
</script>

<style scoped>
.maya-collapsible {
  display: flex;
  flex-direction: column;
}

.maya-collapsible-trigger {
  cursor: pointer;
  outline: none;
}

/*
  Modern CSS Grid trick to animate height to auto seamlessly
  Adheres to ui-rules: bounds transitions without layout thrashing
*/
.maya-collapsible-grid-wrapper {
  display: grid;
  grid-template-rows: 0fr;
  transition: grid-template-rows 250ms var(--maya-ease-out, ease-out);
}

.maya-collapsible-grid-wrapper.is-open {
  grid-template-rows: 1fr;
}

.maya-collapsible-content {
  min-height: 0;
  overflow: hidden;
  transition: opacity 250ms var(--maya-ease-out, ease-out);
  opacity: 0;
}

.maya-collapsible-grid-wrapper.is-open > .maya-collapsible-content {
  opacity: 1;
}

.maya-collapsible-inner {
  padding-top: 8px; /* Optional spacing logic */
}
</style>
