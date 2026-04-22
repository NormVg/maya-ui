<template>
  <div class="maya-radio-group" :class="[`maya-radio-group--${orientation}`]">
    <slot />
  </div>
</template>

<script setup>
import { provide, computed } from 'vue'

const props = defineProps({
  modelValue: { type: [String, Number, Boolean], default: undefined },
  orientation: { type: String, default: 'vertical', validator: v => ['horizontal', 'vertical'].includes(v) },
  disabled: { type: Boolean, default: false }
})

const emit = defineEmits(['update:modelValue'])

// We can provide contextual state downwards if the Radio components read it,
// but Vue's v-model on grouped inputs usually requires each input to have the same v-model.
// To make it easy, we intercept the update event by reading the children, but we rely on the user passing v-model to Radio directly,
// OR we can make it so Radio can be used standalone without group.
// A simpler robust approach for Nuxt UI is to let users use `v-model` on Radio directly, and the group just handles layout.
</script>

<style scoped>
.maya-radio-group {
  display: flex;
  gap: 12px;
}

.maya-radio-group--vertical {
  flex-direction: column;
}

.maya-radio-group--horizontal {
  flex-direction: row;
  flex-wrap: wrap;
  gap: 24px;
}
</style>
