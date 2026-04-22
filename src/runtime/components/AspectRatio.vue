<template>
  <div class="maya-aspect-ratio" :style="{ paddingTop: `${(1 / ratio) * 100}%` }">
    <div class="maya-aspect-ratio-inner">
      <slot />
    </div>
  </div>
</template>

<script setup>
defineProps({
  ratio: { type: Number, default: 16 / 9 },
})
</script>

<style scoped>
.maya-aspect-ratio {
  position: relative;
  width: 100%;
  overflow: hidden;
  border-radius: var(--maya-radius-md);
}

.maya-aspect-ratio-inner {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
}
</style>
