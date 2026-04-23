<template>
  <kbd class="maya-kbd" :class="{ 'is-triggered': isTriggered || triggered }">
    <slot />
  </kbd>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useMagicKeys, whenever } from '@vueuse/core'

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
          // Normalize to handle 'cmd+k', 'meta+k', etc for preventDefault
          const s = props.shortcut.replace(/meta/ig, 'cmd').toLowerCase()
          const isCmd = s.includes('cmd')
          const isCtrl = s.includes('ctrl')
          const isShift = s.includes('shift')
          const keyChar = s.split('+').pop()

          if (
            (isCmd ? (e.metaKey || e.ctrlKey) : !e.metaKey) &&
            (isShift ? e.shiftKey : !e.shiftKey) &&
            e.key.toLowerCase() === keyChar
          ) {
            e.preventDefault()
          }
        }
      }
    })

    // Prepare exactly the keys the user wants internally natively tracked by VueUse proxy
    // Convert 'meta+k' to 'command_k' and 'ctrl_k' automatically
    const baseKey = props.shortcut.split('+').pop().toLowerCase()
    const s = props.shortcut.toLowerCase()

    // Explicit trigger configurations
    const isMetaOrCmd = s.includes('meta') || s.includes('cmd')
    const isShift = s.includes('shift')

    let ctrlStr = isShift ? `shift_ctrl_${baseKey}` : `ctrl_${baseKey}`
    let cmdStr = isShift ? `shift_command_${baseKey}` : `command_${baseKey}`
    let altStr = isShift ? `shift_alt_${baseKey}` : `alt_${baseKey}`

    if (isMetaOrCmd) {
      // Catch both Ctrl and Command bindings natively
      whenever(keys[ctrlStr], () => { flash(); emit('trigger') })
      whenever(keys[cmdStr], () => { flash(); emit('trigger') })
    } else if (s.includes('ctrl')) {
      whenever(keys[ctrlStr], () => { flash(); emit('trigger') })
    } else if (s.includes('alt')) {
      whenever(keys[altStr], () => { flash(); emit('trigger') })
    } else {
      // Just a simple key like 'shift_x' or 'escape'
      const normStr = s.replace(/\+/g, '_')
      whenever(keys[normStr], () => { flash(); emit('trigger') })
    }
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
