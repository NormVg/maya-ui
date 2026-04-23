<template>
  <div class="maya-scroll-area" :class="{ 'scrollbar-hidden': hideScrollbar }">
    <slot />
  </div>
</template>

<script setup>
defineProps({
  hideScrollbar: { type: Boolean, default: false }
})
</script>

<style scoped>
.maya-scroll-area {
  overflow: auto;
  position: relative;
  height: 100%;
  width: 100%;
  /* Smooth scrolling feel */
  scroll-behavior: smooth;
  -webkit-overflow-scrolling: touch;
}

/* Premium scrollbar — thin and subtle */
.maya-scroll-area::-webkit-scrollbar {
  width: 5px;
  height: 5px;
}

.maya-scroll-area::-webkit-scrollbar-track {
  background: transparent;
}

.maya-scroll-area::-webkit-scrollbar-thumb {
  background: var(--maya-border-strong);
  border-radius: 99px;
  transition: background 200ms ease;
}

.maya-scroll-area::-webkit-scrollbar-thumb:hover {
  background: var(--maya-text-muted);
}

/* Fade-out mask on both ends to suggest more content */
.maya-scroll-area {
  mask-image: linear-gradient(to bottom,
      transparent 0px,
      black 16px,
      black calc(100% - 16px),
      transparent 100%);
  -webkit-mask-image: linear-gradient(to bottom,
      transparent 0px,
      black 16px,
      black calc(100% - 16px),
      transparent 100%);
}

.maya-scroll-area.scrollbar-hidden::-webkit-scrollbar {
  display: none;
}

.maya-scroll-area.scrollbar-hidden {
  -ms-overflow-style: none;
  scrollbar-width: none;
  /* Remove mask when scrollbar hidden — clean overflow */
  mask-image: none;
  -webkit-mask-image: none;
}
</style>
