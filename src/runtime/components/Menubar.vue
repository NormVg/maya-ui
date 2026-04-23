<template>
  <div class="maya-menubar" role="menubar" tabindex="0">
    <slot />
  </div>
</template>

<style scoped>
.maya-menubar {
  display: flex;
  align-items: center;
  height: 40px;
  padding: 4px;
  background: var(--maya-bg-surface);
  border: 1px solid var(--maya-border);
  border-radius: var(--maya-radius-md);
  gap: 4px;
}

/* Ensure Dropdown wrappers expand to Menubar height */
.maya-menubar :deep(.maya-dropdown),
.maya-menubar :deep(.maya-dropdown-trigger-wrapper) {
  height: 100%;
  display: inline-flex;
}

/* We style slotted Dropdown Triggers organically if they are inside Menubar */
.maya-menubar :deep(.maya-btn) {
  height: 100%;
  border: none;
  background: transparent;
  box-shadow: none;
  font-weight: 500;
  padding: 0 12px;
  border-radius: var(--maya-radius-sm);
}

.maya-menubar :deep(.maya-btn:hover) {
  background: var(--maya-bg-raised);
}
</style>
