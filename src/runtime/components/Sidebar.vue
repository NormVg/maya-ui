<template>
  <aside class="maya-sidebar" :class="{ 'is-collapsed': collapsed }">
    <div class="maya-sidebar-header">
      <slot name="header" />
    </div>
    <div class="maya-sidebar-content">
      <slot />
    </div>
    <div class="maya-sidebar-footer">
      <slot name="footer" />
    </div>
  </aside>
</template>

<script setup>
defineProps({
  collapsed: { type: Boolean, default: false }
})
</script>

<style scoped>
.maya-sidebar {
  display: flex;
  flex-direction: column;
  width: 220px;
  height: 100vh;
  background: var(--maya-bg-root);
  border-right: 1px solid var(--maya-border);
  transition: width var(--maya-duration) var(--maya-ease-in-out);
  overflow: hidden;
  flex-shrink: 0;
}

.maya-sidebar.is-collapsed {
  width: 64px;
}

.maya-sidebar-header {
  height: 52px;
  padding: 0 20px;
  display: flex;
  align-items: center;
  border-bottom: 1px dashed var(--maya-border);
  flex-shrink: 0;
}

.maya-sidebar-content {
  flex: 1;
  overflow-y: auto;
  padding: 16px 12px;
}

.maya-sidebar-content::-webkit-scrollbar {
  width: 4px;
}

.maya-sidebar-content::-webkit-scrollbar-thumb {
  background: var(--maya-border-strong);
  border-radius: 99px;
}

.maya-sidebar-footer {
  padding: 16px 12px;
  border-top: 1px solid var(--maya-border);
  flex-shrink: 0;
}
</style>
