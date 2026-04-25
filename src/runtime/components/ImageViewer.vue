<template>
  <div class="maya-image-viewer-wrapper">
    <!-- Thumbnail preview -->
    <div class="maya-image-viewer" @click="openModal">
      <div class="image-wrapper">
        <img :src="src" :alt="alt" class="image" loading="lazy" />
        <div class="zoom-indicator">
          <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="15 3 21 3 21 9"></polyline>
            <polyline points="9 21 3 21 3 15"></polyline>
            <line x1="21" y1="3" x2="14" y2="10"></line>
            <line x1="3" y1="21" x2="10" y2="14"></line>
          </svg>
        </div>
      </div>
    </div>

    <!-- Fullscreen Modal Overlay -->
    <Teleport to="body">
      <Transition name="maya-overlay-fade">
        <div v-if="isModalOpen" class="maya-image-modal" @click.self="closeModal">
          <div class="maya-image-modal-close" @click="closeModal">
            <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </div>
          
          <div 
            class="maya-image-modal-content" 
            :class="{ 'is-zoomed': isZoomed }" 
            @click="toggleZoom" 
            @mousemove="onMouseMove"
          >
            <img 
              :src="src" 
              :alt="alt" 
              class="modal-image" 
              :style="imageStyle" 
            />
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'

const props = defineProps({ 
  src: { type: String, required: true }, 
  alt: { type: String, default: '' }, 
  zoomLevel: { type: Number, default: 2.5 } 
})

const isModalOpen = ref(false)
const isZoomed = ref(false)
const panX = ref(0)
const panY = ref(0)
const isTransitioning = ref(false)
let transTimer = null

const openModal = () => {
  isModalOpen.value = true
  isZoomed.value = false
  panX.value = 0
  panY.value = 0
  document.body.style.overflow = 'hidden'
}

const closeModal = () => {
  isModalOpen.value = false
  isZoomed.value = false
  document.body.style.overflow = ''
  if (transTimer) clearTimeout(transTimer)
}

const toggleZoom = (e) => {
  isZoomed.value = !isZoomed.value
  
  isTransitioning.value = true
  if (transTimer) clearTimeout(transTimer)
  
  if (isZoomed.value) {
    // Instantly set target pan on click
    updatePanPosition(e)
    // Match easing duration in CSS
    transTimer = setTimeout(() => { isTransitioning.value = false }, 400) 
  } else {
    // Reset pan when zooming out
    panX.value = 0
    panY.value = 0
    transTimer = setTimeout(() => { isTransitioning.value = false }, 400)
  }
}

const updatePanPosition = (e) => {
  // Pure math based tracking - absolutely zero layout thrashing or DOM reads
  const cx = window.innerWidth / 2
  const cy = window.innerHeight / 2
  const deltaX = e.clientX - cx
  const deltaY = e.clientY - cy

  // Calculate translation required to map screen pixels to scaled image pixels perfectly
  panX.value = deltaX * (1 - props.zoomLevel)
  panY.value = deltaY * (1 - props.zoomLevel)
}

const onMouseMove = (e) => {
  if (!isZoomed.value) return
  // Vue efficiently batches inline style updates, no rAF needed
  updatePanPosition(e)
}

const imageStyle = computed(() => {
  if (!isZoomed.value) {
    return {
      transform: 'translate3d(0px, 0px, 0) scale(1)',
      transition: 'transform 400ms var(--maya-ease-bouncy)'
    }
  }

  // When actively panning, we drop the bouncy transition for a very fast linear ease 
  // to ensure it perfectly sticks to the mouse without jitter or lag
  const transition = isTransitioning.value 
    ? 'transform 400ms var(--maya-ease-bouncy)' 
    : 'transform 50ms linear'

  return {
    transform: `translate3d(${panX.value}px, ${panY.value}px, 0) scale(${props.zoomLevel})`,
    transition
  }
})

const handleKeydown = (e) => {
  if (e.key === 'Escape' && isModalOpen.value) {
    closeModal()
  }
}

onMounted(() => {
  document.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
  document.removeEventListener('keydown', handleKeydown)
})
</script>

<style scoped>
.maya-image-viewer-wrapper {
  width: 100%;
  height: 100%;
}

.maya-image-viewer {
  width: 100%;
  height: 100%;
  overflow: hidden;
  border-radius: var(--maya-radius-lg);
  background: var(--maya-bg-surface);
  border: 1px solid var(--maya-border);
  box-shadow: var(--maya-shadow-sm);
  cursor: pointer;
  position: relative;
  transition: all 400ms var(--maya-ease-bouncy);
}

.maya-image-viewer:hover {
  box-shadow: var(--maya-shadow-md);
  border-color: var(--maya-border-hover);
  transform: translateY(-2px);
}

.image-wrapper {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 400ms var(--maya-ease-bouncy);
}

.maya-image-viewer:hover .image {
  transform: scale(1.05);
}

.zoom-indicator {
  position: absolute;
  top: 16px;
  right: 16px;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(4px);
  color: #fff;
  border-radius: 50%;
  padding: 8px;
  opacity: 0;
  transform: scale(0.8);
  transition: all 400ms var(--maya-ease-bouncy);
}

.maya-image-viewer:hover .zoom-indicator {
  opacity: 1;
  transform: scale(1);
}

/* Modal Overlay */
.maya-image-modal {
  position: fixed;
  inset: 0;
  z-index: 99999;
  background: rgba(0, 0, 0, 0.85);
  backdrop-filter: blur(8px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px;
}

.maya-image-modal-close {
  position: absolute;
  top: 24px;
  right: 24px;
  color: #fff;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 50%;
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 2;
  transition: all 400ms var(--maya-ease-bouncy);
}

.maya-image-modal-close:hover {
  background: rgba(255, 255, 255, 0.2);
  transform: scale(1.1);
}

.maya-image-modal-close:active {
  transform: scale(0.9);
}

.maya-image-modal-content {
  position: relative;
  width: 100%;
  height: 100%;
  max-width: 1200px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: zoom-in;
  overflow: hidden;
  border-radius: var(--maya-radius-lg);
}

.maya-image-modal-content.is-zoomed {
  cursor: zoom-out;
}

.modal-image {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  will-change: transform;
  transform-origin: center center;
}
</style>
