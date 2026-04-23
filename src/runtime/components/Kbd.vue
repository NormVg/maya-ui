<template>
  <kbd class="maya-kbd" :class="{ 'is-triggered': isTriggered || triggered }">
    <slot />
  </kbd>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const props = defineProps({
  triggered: { type: Boolean, default: false },
  shortcut: { type: String, default: '' },
  prevent: { type: Boolean, default: true }
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
// Native keydown listener instead of useMagicKeys — macOS browsers
// don't fire keyup for non-modifier keys while Cmd is held, which
// breaks useMagicKeys' state tracking on repeated presses.
onMounted(() => {
  if (!props.shortcut) return

  const parts = props.shortcut.toLowerCase().split('+')
  const keyChar = parts[parts.length - 1]
  const needsMeta = parts.includes('meta') || parts.includes('cmd')
  const needsCtrl = parts.includes('ctrl')
  const needsShift = parts.includes('shift')
  const needsAlt = parts.includes('alt')

  window.addEventListener('keydown', (e) => {
    const key = e.key.toLowerCase()
    if (key !== keyChar) return

    // Check modifier requirements
    if (needsMeta && !(e.metaKey || e.ctrlKey)) return
    if (needsCtrl && !e.ctrlKey) return
    if (needsShift && !e.shiftKey) return
    if (needsAlt && !e.altKey) return

    // For meta shortcuts, block if no modifier was held
    if (!needsMeta && !needsCtrl && !needsShift && !needsAlt) {
      // Plain key — only fire if no modifiers are held
      if (e.metaKey || e.ctrlKey || e.altKey) return
    }

    if (props.prevent) e.preventDefault()
    flash()
    emit('trigger')
  })
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
