<template>
  <div class="maya-checkbox-group" :class="[`maya-checkbox-group--${orientation}`]">
    <slot />
  </div>
</template>

<script setup>
defineProps({
  orientation: { type: String, default: 'vertical', validator: v => ['horizontal', 'vertical'].includes(v) },
})
</script>

<style scoped>
.maya-checkbox-group {
  display: flex;
  gap: 12px;
}

.maya-checkbox-group--vertical {
  flex-direction: column;
}

.maya-checkbox-group--horizontal {
  flex-direction: row;
  flex-wrap: wrap;
  gap: 24px;
}
</style>
