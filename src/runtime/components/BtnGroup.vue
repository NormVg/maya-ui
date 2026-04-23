<template>
  <div class="maya-btn-group" :class="`maya-btn-group--${orientation}`">
    <slot />
  </div>
</template>

<script setup>
defineProps({
  orientation: {
    type: String,
    default: 'horizontal',
    validator: (v) => ['horizontal', 'vertical'].includes(v),
  },
})
</script>

<style scoped>
.maya-btn-group {
  display: inline-flex;
}

.maya-btn-group--horizontal {
  flex-direction: row;
}

.maya-btn-group--vertical {
  flex-direction: column;
}

/* 1. Square EVERYTHING natively inside a BtnGroup to prevent rounded crevices on borders */
.maya-btn-group :deep(.maya-btn) {
  border-radius: 0 !important;
}

/* 2. Horizontal Radii - targeting immediate buttons or buttons wrapped in simple tooltips/dropdowns */
.maya-btn-group--horizontal> :deep(.maya-btn:first-child),
.maya-btn-group--horizontal> :deep(:first-child .maya-btn) {
  border-top-left-radius: var(--maya-radius-md) !important;
  border-bottom-left-radius: var(--maya-radius-md) !important;
}

.maya-btn-group--horizontal> :deep(.maya-btn:last-child),
.maya-btn-group--horizontal> :deep(:last-child .maya-btn) {
  border-top-right-radius: var(--maya-radius-md) !important;
  border-bottom-right-radius: var(--maya-radius-md) !important;
}

/* 3. Drop negative margins on adjacent components globally to handle Fudo's button borders */
.maya-btn-group--horizontal> :deep(*:not(:first-child)) {
  margin-left: -1px;
}

/* 4. Vertical Radii */
.maya-btn-group--vertical> :deep(.maya-btn:first-child),
.maya-btn-group--vertical> :deep(:first-child .maya-btn) {
  border-top-left-radius: var(--maya-radius-md) !important;
  border-top-right-radius: var(--maya-radius-md) !important;
}

.maya-btn-group--vertical> :deep(.maya-btn:last-child),
.maya-btn-group--vertical> :deep(:last-child .maya-btn) {
  border-bottom-left-radius: var(--maya-radius-md) !important;
  border-bottom-right-radius: var(--maya-radius-md) !important;
}

/* 5. Vertical Negative Margins */
.maya-btn-group--vertical> :deep(*:not(:first-child)) {
  margin-top: -1px;
}

/* 6. Disable generic hit Area glow boxes for grouped components to prevent double borders under UI elements */
.maya-btn-group :deep(.maya-btn::after) {
  display: none !important;
}
</style>
