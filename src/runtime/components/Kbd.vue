<template>
  <kbd class="maya-kbd" :class="{ 'is-triggered': isTriggered || triggered }">
    <slot />
  </kbd>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue'
import { useMagicKeys } from '@vueuse/core'

const props = defineProps({
  triggered: { type: Boolean, default: false },
  shortcut: { type: String, default: '' }, // e.g., 'meta+k', 'shift+x'
  prevent: { type: Boolean, default: true } // whether to prevent default browser action
})

const emit = defineEmits(['click', 'trigger'])

const isTriggered = ref(false)
let timeout = null

function flash() {
  isTriggered.value = true
  clearTimeout(timeout)
  timeout = setTimeout(() => {
    isTriggered.value = false
  }, 300)
}

// ─── Autonomous Hotkey Integration ───
onMounted(() => {
  if (props.shortcut) {
    const keys = useMagicKeys({
      passive: false,
      onEventFired(e) {
        if (props.prevent && e.type === 'keydown') {
          // A bit of custom logic to check if this specific keydown matches our shortcut
          // useMagicKeys handles the reactive state, but we manually preventDefault here if needed
          const keysCombo = props.shortcut.toLowerCase().split('+')
          const isMeta = keysCombo.includes('meta') || keysCombo.includes('cmd')
          const isCtrl = keysCombo.includes('ctrl')
          const isShift = keysCombo.includes('shift')
          const key = keysCombo[keysCombo.length - 1]

          if (
            (isMeta ? e.metaKey : true) &&
            (isCtrl ? e.ctrlKey : true) &&
            (isShift ? e.shiftKey : true) &&
            e.key.toLowerCase() === key
          ) {
            e.preventDefault()
          }
        }
      }
    })

    // Watch the specific shortcut via useMagicKeys dynamic property access
    const magicRef = keys[props.shortcut]
    watch(magicRef, (v) => {
      if (v) {
        flash()
        emit('trigger')
      }
    })
  }
})

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
  letter-spacing: 0.02em;
  gap: 1px;
  transition: all 150ms var(--maya-ease);
}

/* ─── Triggered / Pressed state ─── */
.maya-kbd:active,
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
