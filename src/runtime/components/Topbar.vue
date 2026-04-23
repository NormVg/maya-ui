<template>
  <header class="maya-topbar" :class="{ sticky }">
    <div class="maya-topbar-left">
      <slot name="left" />
    </div>
    <div class="maya-topbar-center">
      <slot name="center" />
    </div>
    <div class="maya-topbar-right">
      <slot name="right" />
    </div>
  </header>
</template>

<script setup>
defineProps({
  sticky: { type: Boolean, default: false }
})
</script>

<style scoped>
.maya-topbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 52px;
  padding: 0 24px;
  background: transparent;
  border-bottom: 1px dashed var(--maya-border);
  z-index: 40;
  flex-shrink: 0;
}

.maya-topbar.sticky {
  position: sticky;
  top: 0;
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  background: color-mix(in srgb, var(--maya-bg-root) 85%, transparent);
}

.maya-topbar-left,
.maya-topbar-right {
  display: flex;
  align-items: center;
  flex: 1;
  gap: 16px;
}

.maya-topbar-right {
  justify-content: flex-end;
}

.maya-topbar-center {
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 2;
}
</style>
