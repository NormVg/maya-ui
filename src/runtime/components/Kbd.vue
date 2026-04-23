<template>
  <kbd class="maya-kbd" :class="{ 'is-triggered': isTriggered }">
    <slot />
  </kbd>
</template>

<script setup>
import { ref, watch, toRef } from 'vue'

const props = defineProps({
  triggered: { type: Boolean, default: false }
})

const isTriggered = ref(false)
let timeout = null

// Support external trigger via prop
watch(toRef(props, 'triggered'), (val) => {
  if (val) flash()
})

function flash() {
  isTriggered.value = true
  clearTimeout(timeout)
  timeout = setTimeout(() => {
    isTriggered.value = false
  }, 300)
}

defineExpose({ flash })
</script>

<style scoped>
.maya-kbd {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 2px 6px;
  font-family: var(--maya-font-mono);
  font-size: 0.6875rem;
  font-weight: 500;
  line-height: 1.4;
  color: var(--maya-text-secondary);
  background: var(--maya-bg-raised);
  border: 1px solid var(--maya-border-strong);
  border-bottom-width: 2px;
  border-radius: var(--maya-radius-sm);
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.06),
    0 1px 0 var(--maya-border-strong);
  white-space: nowrap;
  user-select: none;
  transition: all var(--maya-duration) var(--maya-ease);
}

/* ─── Triggered / Pressed micro-interaction ─── */
.maya-kbd.is-triggered {
  transform: translateY(1px) scale(0.95);
  border-bottom-width: 1px;
  color: var(--maya-text-primary);
  background: var(--maya-bg-surface);
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.06),
    0 0 0 1px var(--maya-border-strong),
    0 0 12px rgba(255, 255, 255, 0.08),
    0 0 4px rgba(255, 255, 255, 0.04);
  transition: all 60ms ease;
}
</style>
