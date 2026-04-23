<template>
  <Teleport to="body">
    <Transition name="maya-sheet-fade">
      <div v-if="open" class="maya-sheet-overlay" @click="close" aria-hidden="true" />
    </Transition>

    <Transition :name="`maya-sheet-slide-${side}`">
      <div v-if="open" class="maya-sheet-content" :class="`maya-sheet-${side}`" role="dialog" aria-modal="true"
        tabindex="-1">
        <button v-if="!hideClose" class="maya-sheet-close" @click="close" aria-label="Close">
          <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" stroke-width="2" fill="none"
            stroke-linecap="round" stroke-linejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
        <slot />
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import { watch, onMounted, onUnmounted } from 'vue'

const props = defineProps({
  open: { type: Boolean, default: false },
  side: { type: String, default: 'right' }, // 'left', 'right', 'top', 'bottom'
  hideClose: { type: Boolean, default: false }
})

const emit = defineEmits(['update:open'])

function close() {
  emit('update:open', false)
}

function handleKeydown(e) {
  if (e.key === 'Escape' && props.open) {
    close()
  }
}

watch(() => props.open, (val) => {
  if (val && typeof document !== 'undefined') {
    document.body.style.overflow = 'hidden'
  } else if (typeof document !== 'undefined') {
    document.body.style.overflow = ''
  }
})

onMounted(() => {
  document.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
  document.removeEventListener('keydown', handleKeydown)
  if (typeof document !== 'undefined') document.body.style.overflow = ''
})
</script>

<style scoped>
.maya-sheet-overlay {
  position: fixed;
  inset: 0;
  background: var(--maya-bg-overlay);
  backdrop-filter: blur(2px);
  z-index: 999;
}

.maya-sheet-content {
  position: fixed;
  background: var(--maya-bg-root);
  z-index: 1000;
  box-shadow: var(--maya-shadow-md);
  display: flex;
  flex-direction: column;
  outline: none;
}

/* Close Button */
.maya-sheet-close {
  position: absolute;
  top: 16px;
  right: 16px;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  border: none;
  color: var(--maya-text-muted);
  border-radius: var(--maya-radius-sm);
  cursor: pointer;
  transition: all var(--maya-duration) var(--maya-ease);
  z-index: 10;
}

.maya-sheet-close:hover {
  background: var(--maya-bg-surface);
  color: var(--maya-text-primary);
}

/* Sides */
.maya-sheet-right {
  top: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  max-width: 400px;
  border-left: 1px solid var(--maya-border);
}

.maya-sheet-left {
  top: 0;
  left: 0;
  bottom: 0;
  width: 100%;
  max-width: 400px;
  border-right: 1px solid var(--maya-border);
}

.maya-sheet-top {
  top: 0;
  left: 0;
  right: 0;
  height: 100%;
  max-height: 400px;
  border-bottom: 1px solid var(--maya-border);
}

.maya-sheet-bottom {
  bottom: 0;
  left: 0;
  right: 0;
  height: 100%;
  max-height: 400px;
  border-top: 1px solid var(--maya-border);
  border-top-left-radius: var(--maya-radius-xl);
  border-top-right-radius: var(--maya-radius-xl);
}

/* Transitions */
.maya-sheet-fade-enter-active,
.maya-sheet-fade-leave-active {
  transition: opacity 300ms var(--maya-ease-in-out);
}

.maya-sheet-fade-enter-from,
.maya-sheet-fade-leave-to {
  opacity: 0;
}

/* Slide Right */
.maya-sheet-slide-right-enter-active,
.maya-sheet-slide-right-leave-active {
  transition: transform 300ms var(--maya-ease-in-out);
}

.maya-sheet-slide-right-enter-from,
.maya-sheet-slide-right-leave-to {
  transform: translateX(100%);
}

/* Slide Left */
.maya-sheet-slide-left-enter-active,
.maya-sheet-slide-left-leave-active {
  transition: transform 300ms var(--maya-ease-in-out);
}

.maya-sheet-slide-left-enter-from,
.maya-sheet-slide-left-leave-to {
  transform: translateX(-100%);
}

/* Slide Top */
.maya-sheet-slide-top-enter-active,
.maya-sheet-slide-top-leave-active {
  transition: transform 300ms var(--maya-ease-in-out);
}

.maya-sheet-slide-top-enter-from,
.maya-sheet-slide-top-leave-to {
  transform: translateY(-100%);
}

/* Slide Bottom */
.maya-sheet-slide-bottom-enter-active,
.maya-sheet-slide-bottom-leave-active {
  transition: transform 300ms var(--maya-ease-in-out);
}

.maya-sheet-slide-bottom-enter-from,
.maya-sheet-slide-bottom-leave-to {
  transform: translateY(100%);
}
</style>
