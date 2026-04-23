<template>
  <div class="maya-popover" ref="container">
    <div class="maya-popover-trigger-wrapper" @click="toggle" @keydown.enter.prevent="toggle"
      @keydown.space.prevent="toggle" role="button" aria-haspopup="dialog" :aria-expanded="isOpen" tabindex="0">
      <slot name="trigger" />
    </div>

    <Transition name="maya-popover-fade">
      <div v-if="isOpen" class="maya-popover-content" :class="[`align-${align}`]" role="dialog"
        @keydown.esc="closePopover" tabindex="-1">
        <slot />
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, provide } from 'vue'

const props = defineProps({
  align: {
    type: String,
    default: 'down-center', // down-left, down-center, down-right, up-left, up-center, up-right
  }
})

const isOpen = ref(false)
const container = ref<HTMLElement | null>(null)

function toggle() {
  isOpen.value = !isOpen.value
}

function closePopover() {
  isOpen.value = false
}

// Provide a close method to children inside the popover
provide('closePopover', closePopover)

function onClickOutside(e: MouseEvent) {
  if (isOpen.value && container.value && !container.value.contains(e.target as Node)) {
    closePopover()
  }
}

onMounted(() => {
  document.addEventListener('click', onClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', onClickOutside)
})
</script>

<style scoped>
.maya-popover {
  position: relative;
  display: inline-block;
}

.maya-popover-trigger-wrapper {
  display: inline-flex;
  outline: none;
}

.maya-popover-content {
  position: absolute;
  width: max-content;
  max-width: 320px;
  background: var(--maya-bg-surface);
  border: 1px solid var(--maya-border);
  border-radius: var(--maya-radius-lg);
  padding: 1rem;
  z-index: 100;

  /* Layered UI rules: deep drop shadow, subtle inner gradient */
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.04),
    0 4px 16px rgba(0, 0, 0, 0.3),
    0 1px 3px rgba(0, 0, 0, 0.2);
  background-image: linear-gradient(180deg,
      rgba(255, 255, 255, 0.03) 0%,
      rgba(255, 255, 255, 0) 100%);

  /* Base translations for origin math */
  --x-offset: 0px;
  --y-offset: 0px;
  --enter-scale: 1;
}

/* Alignment variants */
.maya-popover-content.align-down-left {
  top: calc(100% + 8px);
  left: 0;
  transform-origin: top left;
}

.maya-popover-content.align-down-center {
  top: calc(100% + 8px);
  left: 50%;
  --x-offset: -50%;
  transform: translate(var(--x-offset), var(--y-offset)) scale(var(--enter-scale));
  transform-origin: top center;
}

.maya-popover-content.align-down-right {
  top: calc(100% + 8px);
  right: 0;
  transform-origin: top right;
}

.maya-popover-content.align-up-left {
  bottom: calc(100% + 8px);
  left: 0;
  transform-origin: bottom left;
}

.maya-popover-content.align-up-center {
  bottom: calc(100% + 8px);
  left: 50%;
  --x-offset: -50%;
  transform: translate(var(--x-offset), var(--y-offset)) scale(var(--enter-scale));
  transform-origin: bottom center;
}

.maya-popover-content.align-up-right {
  bottom: calc(100% + 8px);
  right: 0;
  transform-origin: bottom right;
}

/* Entrance: slightly bouncy scale & fade (ui-rules: 300ms bouncy scale) */
.maya-popover-fade-enter-active {
  transition:
    opacity 200ms var(--maya-ease-out),
    transform 350ms var(--maya-ease-bouncy, cubic-bezier(0.34, 1.56, 0.64, 1));
}

/* Exit: ease-in (builds momentum, gets out of way) */
.maya-popover-fade-leave-active {
  transition:
    opacity 120ms cubic-bezier(0.55, 0.05, 0.68, 0.19),
    transform 120ms cubic-bezier(0.55, 0.05, 0.68, 0.19);
}

.maya-popover-fade-enter-from {
  opacity: 0;
  --y-offset: -6px;
  --enter-scale: 0.95;
}

.maya-popover-fade-leave-to {
  opacity: 0;
  --y-offset: -2px;
  --enter-scale: 0.98;
}

.maya-popover-content.align-up-left.maya-popover-fade-enter-from,
.maya-popover-content.align-up-center.maya-popover-fade-enter-from,
.maya-popover-content.align-up-right.maya-popover-fade-enter-from {
  --y-offset: 6px;
}

/* Combined transform application */
.maya-popover-content {
  transform: translate(var(--x-offset), var(--y-offset)) scale(var(--enter-scale));
}
</style>
