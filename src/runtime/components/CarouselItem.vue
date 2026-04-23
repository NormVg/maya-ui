<template>
  <div class="maya-carousel-item" role="group" aria-roledescription="slide">
    <slot />
  </div>
</template>

<script setup lang="ts">
// Simple semantic wrapper configuring snap alignment
</script>

<style scoped>
.maya-carousel-item {
  scroll-snap-align: center;
  flex: 0 0 auto;
  min-width: 0;
  /* min-width: 0 is important for flex children to prevent flex blowout */
}
</style>
