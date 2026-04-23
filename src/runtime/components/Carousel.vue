<template>
  <div class="maya-carousel" role="region" aria-roledescription="carousel">
    <!-- Carousel Track -->
    <div
      class="maya-carousel-viewport"
      ref="viewport"
      @scroll="handleScroll"
    >
      <div class="maya-carousel-container">
        <slot />
      </div>
    </div>

    <!-- Controls (Optional) -->
    <div v-if="showControls" class="maya-carousel-controls">
      <MayaBtn
        variant="outline"
        size="icon"
        class="maya-carousel-btn may-carousel-btn-prev"
        :disabled="!canScrollPrev"
        @click="scrollPrev"
        aria-label="Previous slide"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-arrow-left"><path d="m12 19-7-7 7-7"/><path d="M19 12H5"/></svg>
      </MayaBtn>
      <MayaBtn
        variant="outline"
        size="icon"
        class="maya-carousel-btn may-carousel-btn-next"
        :disabled="!canScrollNext"
        @click="scrollNext"
        aria-label="Next slide"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-arrow-right"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
      </MayaBtn>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

const props = defineProps({
  showControls: {
    type: Boolean,
    default: true
  },
  scrollAmount: {
    type: Number,
    default: 0 // If 0, uses the viewport width
  }
})

const viewport = ref<HTMLElement | null>(null)
const canScrollPrev = ref(false)
const canScrollNext = ref(true)

function handleScroll() {
  if (!viewport.value) return
  const { scrollLeft, scrollWidth, clientWidth } = viewport.value

  canScrollPrev.value = scrollLeft > 0
  // allow 1px rounding leniency
  canScrollNext.value = Math.ceil(scrollLeft + clientWidth) < scrollWidth
}

function scrollPrev() {
  if (!viewport.value) return
  const amount = props.scrollAmount > 0 ? props.scrollAmount : viewport.value.clientWidth * 0.8
  viewport.value.scrollBy({ left: -amount, behavior: 'smooth' })
}

function scrollNext() {
  if (!viewport.value) return
  const amount = props.scrollAmount > 0 ? props.scrollAmount : viewport.value.clientWidth * 0.8
  viewport.value.scrollBy({ left: amount, behavior: 'smooth' })
}

onMounted(() => {
  // Delay first check slightly to let DOM paint correctly
  setTimeout(handleScroll, 100)
})
</script>

<style scoped>
.maya-carousel {
  position: relative;
  width: 100%;
}

.maya-carousel-viewport {
  overflow-x: auto;
  overflow-y: hidden;
  /* Native scroll snap is perfectly smooth and lightweight */
  scroll-snap-type: x mandatory;
  scroll-behavior: smooth;
  scrollbar-width: none; /* Hide scrollbar Firefox */
  -ms-overflow-style: none; /* Hide scrollbar IE/Edge */
}

.maya-carousel-viewport::-webkit-scrollbar {
  display: none; /* Hide scrollbar Chrome/Safari */
}

.maya-carousel-container {
  display: flex;
  gap: 1rem;
  /* Allow the items to overflow horizontally without wrapping */
  width: max-content;
  padding: 0.5rem 0; /* Padding allows shadows on items to breathe */
}

.maya-carousel-controls {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 0.5rem;
  margin-top: 1rem;
}

.maya-carousel-btn {
  border-radius: var(--maya-radius-full);
}
</style>
