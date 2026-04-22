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
  border-radius: 0;
  margin-left: -1px;
  /* Collapse borders */
}

/* Fix z-index on hover/focus so the shared border is drawn above siblings */
.maya-input-group> :deep(*:focus-within),
.maya-input-group> :deep(*:hover),
.maya-input-group> :deep(*:active) {
  z-index: 1;
}

/* First child gets left side rounded, remove negative margin */
.maya-input-group> :deep(*:first-child) {
  border-top-left-radius: var(--maya-radius-md);
  border-bottom-left-radius: var(--maya-radius-md);
  margin-left: 0;
}

/* Last child gets right side rounded */
.maya-input-group> :deep(*:last-child) {
  border-top-right-radius: var(--maya-radius-md);
  border-bottom-right-radius: var(--maya-radius-md);
}

/* If the child itself is a wrapper (like our components often are), pass the border radius down */
.maya-input-group> :deep(*:first-child)>input,
.maya-input-group> :deep(*:first-child)>button,
.maya-input-group> :deep(*:first-child.maya-btn) {
  border-top-left-radius: var(--maya-radius-md);
  border-bottom-left-radius: var(--maya-radius-md);
}

.maya-input-group> :deep(*:last-child)>input,
.maya-input-group> :deep(*:last-child)>button,
.maya-input-group> :deep(*:last-child.maya-btn) {
  border-top-right-radius: var(--maya-radius-md);
  border-bottom-right-radius: var(--maya-radius-md);
}

.maya-input-group> :deep(:not(:first-child):not(:last-child))>input,
.maya-input-group> :deep(:not(:first-child):not(:last-child))>button,
.maya-input-group> :deep(:not(:first-child):not(:last-child).maya-btn) {
  border-radius: 0;
}
</style>
