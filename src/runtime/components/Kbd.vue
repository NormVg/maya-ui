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
// Only set up if this Kbd instance has a shortcut prop
onMounted(async () => {
  if (!props.shortcut) return

  console.log('[MayaKbd] Mounting with shortcut:', props.shortcut)

  // Dynamic import to avoid SSR issues — useMagicKeys needs window
  const { useMagicKeys, whenever } = await import('@vueuse/core')

  const keys = useMagicKeys({
    passive: false,
    onEventFired(e) {
      if (!props.prevent || e.type !== 'keydown') return
      const parts = props.shortcut.toLowerCase().split('+')
      const keyChar = parts[parts.length - 1]
      const needsMeta = parts.includes('meta') || parts.includes('cmd')
      const needsShift = parts.includes('shift')

      if (needsMeta && (e.metaKey || e.ctrlKey) && e.key.toLowerCase() === keyChar) {
        if (needsShift && !e.shiftKey) return
        e.preventDefault()
      }
    }
  })

  // Build the VueUse combo strings from the shortcut prop
  // 'meta+k' → watch keys['command_k'] and keys['ctrl_k']
  const parts = props.shortcut.toLowerCase().split('+')
  const keyChar = parts[parts.length - 1]
  const hasMeta = parts.includes('meta') || parts.includes('cmd')
  const hasShift = parts.includes('shift')
  const hasCtrl = parts.includes('ctrl')
  const hasAlt = parts.includes('alt')

  function onTrigger() {
    console.log('[MayaKbd] TRIGGERED:', props.shortcut)
    flash()
    emit('trigger')
  }

  if (hasMeta) {
    // Mac: command, Windows/Linux: ctrl
    const cmdCombo = hasShift ? `shift_command_${keyChar}` : `command_${keyChar}`
    const ctrlCombo = hasShift ? `shift_ctrl_${keyChar}` : `ctrl_${keyChar}`
    console.log('[MayaKbd] Watching:', cmdCombo, 'and', ctrlCombo)
    whenever(keys[cmdCombo], onTrigger)
    whenever(keys[ctrlCombo], onTrigger)
  } else if (hasCtrl) {
    const combo = hasShift ? `shift_ctrl_${keyChar}` : `ctrl_${keyChar}`
    console.log('[MayaKbd] Watching:', combo)
    whenever(keys[combo], onTrigger)
  } else if (hasAlt) {
    const combo = hasShift ? `shift_alt_${keyChar}` : `alt_${keyChar}`
    console.log('[MayaKbd] Watching:', combo)
    whenever(keys[combo], onTrigger)
  } else {
    const combo = props.shortcut.replace(/\+/g, '_').toLowerCase()
    console.log('[MayaKbd] Watching:', combo)
    whenever(keys[combo], onTrigger)
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
