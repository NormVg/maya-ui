<template>
  <div class="maya-resizable" :style="{ minWidth, minHeight, maxWidth, maxHeight }">
    <slot />
  </div>
</template>

<script setup>
defineProps({
  minWidth: { type: String, default: 'auto' },
  minHeight: { type: String, default: 'auto' },
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
  min-width: 100px;
  min-height: 100px;
}

/* Subtly indicate resizability in the corner */
.maya-resizable::after {
  content: '';
  position: absolute;
  bottom: 0;
  right: 0;
  width: 16px;
  height: 16px;
  cursor: se-resize;
  background: linear-gradient(135deg, transparent 50%, var(--maya-border-strong) 50%);
  pointer-events: none;
  opacity: 0.5;
}

.maya-resizable:hover::after {
  opacity: 1;
}
</style>
