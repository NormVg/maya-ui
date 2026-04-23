<template>
  <div class="maya-resizable" :style="{ minWidth: minWidth, minHeight: minHeight, maxWidth, maxHeight }">
    <slot />
  </div>
</template>

<script setup>
defineProps({
  minWidth: { type: String, default: '180px' },
  minHeight: { type: String, default: '120px' },
  maxWidth: { type: String, default: '100%' },
  maxHeight: { type: String, default: '100%' }
})
</script>

<style scoped>
.maya-resizable {
  resize: both;
  overflow: hidden;
  border-radius: var(--maya-radius-md);
  border: 1px solid var(--maya-border);
  background: var(--maya-bg-surface);
  position: relative;
  /* Layered shadow for depth */
  box-shadow:
    0 0 0 1px rgba(255, 255, 255, 0.03),
    0 2px 8px rgba(0, 0, 0, 0.18);
  transition: box-shadow 200ms cubic-bezier(0.19, 1, 0.22, 1);
}

.maya-resizable:focus-within,
.maya-resizable:active {
  box-shadow:
    0 0 0 1px rgba(255, 255, 255, 0.06),
    0 4px 16px rgba(0, 0, 0, 0.28);
}

/* Triangular resize handle indicator */
.maya-resizable::after {
  content: '';
  position: absolute;
  bottom: 3px;
  right: 3px;
  width: 12px;
  height: 12px;
  cursor: se-resize;
  pointer-events: none;
  /* diagonal lines mimicking native resize handle */
  background:
    linear-gradient(135deg,
      transparent 30%, var(--maya-border-strong) 30%, var(--maya-border-strong) 40%, transparent 40%,
      transparent 60%, var(--maya-border-strong) 60%, var(--maya-border-strong) 70%, transparent 70%,
      transparent 85%, var(--maya-border-strong) 85%, var(--maya-border-strong) 95%, transparent 95%);
  opacity: 0.5;
  transition: opacity 150ms ease;
}

.maya-resizable:hover::after {
  opacity: 1;
}
</style>
