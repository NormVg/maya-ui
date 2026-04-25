<template>
  <div class="maya-bento-grid" :style="{ gap: gap, gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` }">
    <slot />
  </div>
</template>

<script setup>
defineProps({
  columns: { type: Number, default: 3 },
  gap: { type: String, default: '16px' }
})
</script>

<style scoped>
.maya-bento-grid {
  display: grid;
  width: 100%;
}
@media (max-width: 768px) {
  .maya-bento-grid {
    grid-template-columns: 1fr !important;
  }
}
</style>
