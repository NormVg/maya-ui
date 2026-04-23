<template>
  <div class="maya-scroll-area" :class="{ 'scrollbar-hidden': hideScrollbar }">
    <slot />
  </div>
</template>

<script setup>
defineProps({
  hideScrollbar: {
    type: Boolean,
    default: false
  }
})
</script>

<style scoped>
.maya-scroll-area {
  overflow: auto;
  position: relative;
  height: 100%;
  width: 100%;
}

.maya-scroll-area::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}

.maya-scroll-area::-webkit-scrollbar-track {
  background: transparent;
}

.maya-scroll-area::-webkit-scrollbar-thumb {
  background: var(--maya-border-strong);
  border-radius: 99px;
}

.maya-scroll-area::-webkit-scrollbar-thumb:hover {
  background: var(--maya-text-muted);
}

.maya-scroll-area.scrollbar-hidden::-webkit-scrollbar {
  display: none;
}

.maya-scroll-area.scrollbar-hidden {
  -ms-overflow-style: none;
  /* IE and Edge */
  scrollbar-width: none;
  /* Firefox */
}
</style>
