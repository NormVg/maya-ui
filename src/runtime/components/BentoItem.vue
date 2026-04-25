<template>
  <div class="maya-bento-item" :class="{ 'has-hover': hoverable }" :style="{ gridColumn: `span ${colSpan}`, gridRow: `span ${rowSpan}` }">
    <div class="maya-bento-inner">
      <slot />
    </div>
  </div>
</template>

<script setup>
defineProps({
  colSpan: { type: Number, default: 1 },
  rowSpan: { type: Number, default: 1 },
  hoverable: { type: Boolean, default: false }
})
</script>

<style scoped>
.maya-bento-item {
  position: relative;
  background: var(--maya-bg-surface);
  border: 1px solid var(--maya-border);
  border-radius: var(--maya-radius-xl);
  padding: 24px;
  overflow: hidden;
  box-shadow: var(--maya-shadow-sm);
  transition: all 400ms var(--maya-ease-bouncy);
}

.maya-bento-item::before {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: inherit;
  background: var(--maya-gradient-surface);
  pointer-events: none;
  z-index: 0;
}

.maya-bento-inner {
  position: relative;
  z-index: 1;
  height: 100%;
}

.maya-bento-item.has-hover:hover {
  transform: translateY(-4px) scale(1.01);
  box-shadow: var(--maya-shadow-md);
  border-color: var(--maya-border-hover);
}
</style>
