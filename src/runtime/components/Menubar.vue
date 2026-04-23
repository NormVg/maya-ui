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
  /* subtle elevation */
  box-shadow:
    0 0 0 1px rgba(255, 255, 255, 0.04),
    0 1px 3px rgba(0, 0, 0, 0.15);
}

/* Ensure Dropdown wrappers expand to Menubar height */
.maya-menubar :deep(.maya-dropdown),
.maya-menubar :deep(.maya-dropdown-trigger-wrapper) {
  height: 100%;
  display: inline-flex;
  align-items: center;
}

/* Reset Btn styles inside Menubar */
.maya-menubar :deep(.maya-btn) {
  height: 100%;
  border: none !important;
  background: transparent !important;
  box-shadow: none !important;
  font-weight: 500;
  font-size: 0.875rem;
  padding: 0 12px;
  border-radius: var(--maya-radius-sm);
  /* Force text color — the bug fix */
  color: var(--maya-text-secondary) !important;
  transition: color 120ms ease, background 120ms ease !important;
}

.maya-menubar :deep(.maya-btn:hover) {
  background: var(--maya-bg-raised) !important;
  color: var(--maya-text-primary) !important;
}

/* Also kill any default ::before glow effects from Btn inside here */
.maya-menubar :deep(.maya-btn::before) {
  display: none;
}
</style>
