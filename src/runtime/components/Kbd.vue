<template>
  <kbd class="maya-kbd">
    <slot />
  </kbd>
</template>

<script setup>
// No props — purely presentational
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
</style>
