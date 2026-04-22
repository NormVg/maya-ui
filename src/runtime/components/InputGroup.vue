<template>
  <div class="maya-input-group">
    <slot />
  </div>
</template>

<style scoped>
.maya-input-group {
  display: flex;
  align-items: stretch;
  width: 100%;
}

/*
  Target direct children that are typical form controls
  in Maya UI to collapse their borders and rounded corners
*/
.maya-input-group> :deep(*) {
  position: relative;
  flex: 1 1 0%;
  min-width: 0;
  border-radius: 0;
  margin-left: -1px;
  /* Collapse borders */
}

/* Let buttons keep their natural width */
.maya-input-group> :deep(.maya-btn) {
  flex: 0 0 auto;
}

/* Fix z-index on hover/focus so the shared border is drawn above siblings */
.maya-input-group> :deep(*:focus-within),
.maya-input-group> :deep(*:hover),
.maya-input-group> :deep(*:active) {
  z-index: 1;
}

/* Base reset for inner elements to strip ALL radii by default */
.maya-input-group> :deep(*) .maya-input,
.maya-input-group> :deep(*) .maya-btn,
.maya-input-group> :deep(*.maya-btn) {
  border-radius: 0 !important;
}

/* First child gets left side rounded ONLY */
.maya-input-group> :deep(*:first-child) {
  margin-left: 0;
}

.maya-input-group> :deep(*:first-child) .maya-input,
.maya-input-group> :deep(*:first-child) .maya-btn,
.maya-input-group> :deep(*:first-child.maya-btn) {
  border-top-left-radius: var(--maya-radius-md) !important;
  border-bottom-left-radius: var(--maya-radius-md) !important;
  border-top-right-radius: 0 !important;
  border-bottom-right-radius: 0 !important;
}

/* Last child gets right side rounded ONLY */
.maya-input-group> :deep(*:last-child) .maya-input,
.maya-input-group> :deep(*:last-child) .maya-btn,
.maya-input-group> :deep(*:last-child.maya-btn) {
  border-top-right-radius: var(--maya-radius-md) !important;
  border-bottom-right-radius: var(--maya-radius-md) !important;
  border-top-left-radius: 0 !important;
  border-bottom-left-radius: 0 !important;
}
</style>
