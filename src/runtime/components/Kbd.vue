<template>
  <kbd class="maya-kbd" :class="{ 'is-triggered': isTriggered || triggered }">
    <slot />
  </kbd>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

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
let handleGlobalShortcut = null

onMounted(() => {
  if (props.shortcut) {
    const s = props.shortcut.toLowerCase()
    const isMeta = s.includes('meta') || s.includes('cmd')
    const isCtrl = s.includes('ctrl')
    const isShift = s.includes('shift')
    const keyChar = s.split('+').pop()

    handleGlobalShortcut = (e) => {
      // Check if pressed keys match the required combo
      const matchMeta = isMeta ? (e.metaKey || e.ctrlKey) : !e.metaKey
      const matchShift = isShift ? e.shiftKey : !e.shiftKey

      // Allow ctrl as fallback for meta if meta isn't explicitly required,
      // but if explicit ctrl is required, enforce it.
      const matchCtrl = isCtrl ? e.ctrlKey : true

      const matchKey = e.key.toLowerCase() === keyChar

      if (matchMeta && matchShift && matchCtrl && matchKey) {
        if (props.prevent) e.preventDefault()
        flash()
        emit('trigger')
      }
    }

    window.addEventListener('keydown', handleGlobalShortcut)
  }
})

onUnmounted(() => {
  if (handleGlobalShortcut) {
    window.removeEventListener('keydown', handleGlobalShortcut)
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
