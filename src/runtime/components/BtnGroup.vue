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

/* Collapse inner border-radii and merge borders */
.maya-btn-group--horizontal :deep(.maya-btn:not(:first-child):not(:last-child)) {
  border-radius: 0;
}

.maya-btn-group--horizontal :deep(.maya-btn:first-child) {
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
}

.maya-btn-group--horizontal :deep(.maya-btn:last-child) {
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
}

.maya-btn-group--horizontal :deep(.maya-btn + .maya-btn) {
  margin-left: -1px;
}

/* Vertical */
.maya-btn-group--vertical :deep(.maya-btn:first-child) {
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
}

.maya-btn-group--vertical :deep(.maya-btn:last-child) {
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}

.maya-btn-group--vertical :deep(.maya-btn:not(:first-child):not(:last-child)) {
  border-radius: 0;
}

.maya-btn-group--vertical :deep(.maya-btn + .maya-btn) {
  margin-top: -1px;
}

/* Disable expanded hit area in groups */
.maya-btn-group :deep(.maya-btn::after) {
  display: none;
}
</style>
