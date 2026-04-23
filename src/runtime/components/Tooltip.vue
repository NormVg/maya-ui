<template>
  <div class="maya-tooltip" ref="container" @mouseenter="onContainerEnter" @mouseleave="onContainerLeave">
    <div class="maya-tooltip-trigger-wrapper" aria-haspopup="dialog" :aria-expanded="isOpen">
      <slot name="trigger" />
    </div>

    <Transition name="maya-tooltip-fade">
      <div v-if="isOpen" class="maya-tooltip-content" :class="[`align-${align}`]" role="tooltip">
        <slot />
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps({
  align: {
    type: String,
    default: 'up-center', // down-left, down-center, down-right, up-left, up-center, up-right
  },
  openDelay: {
    type: Number,
    default: 200
  },
  closeDelay: {
    type: Number,
    default: 100
  }
})

const isOpen = ref(false)
const container = ref<HTMLElement | null>(null)

let openTimeout: ReturnType<typeof setTimeout> | null = null
let closeTimeout: ReturnType<typeof setTimeout> | null = null

function onContainerEnter() {
  if (closeTimeout) clearTimeout(closeTimeout)
  if (!isOpen.value) {
    if (openTimeout) clearTimeout(openTimeout)
    openTimeout = setTimeout(() => {
      isOpen.value = true
    }, props.openDelay)
  }
}

function onContainerLeave() {
  if (openTimeout) clearTimeout(openTimeout)
  if (isOpen.value) {
    if (closeTimeout) clearTimeout(closeTimeout)
    closeTimeout = setTimeout(() => {
      isOpen.value = false
    }, props.closeDelay)
  }
}
</script>

<style scoped>
.maya-tooltip {
  position: relative;
  display: inline-block;
}

.maya-tooltip-trigger-wrapper {
  display: inline-flex;
  outline: none;
}

.maya-tooltip-content {
  position: absolute;
  width: max-content;
  max-width: 280px;
  background: var(--maya-bg-surface);
  border: 1px solid var(--maya-border);
  border-radius: var(--maya-radius-md);
  padding: 4px 8px;
  z-index: 100;

  font-size: 0.75rem;
  color: var(--maya-text-primary);
  font-weight: 500;

  /* Minimized shadow for Tooltip */
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.04),
    0 2px 8px rgba(0, 0, 0, 0.4);

  --x-offset: 0px;
  --y-offset: 0px;
  --enter-scale: 1;
}

/* Alignment variants */
.maya-tooltip-content.align-down-left {
  top: calc(100% + 4px);
  left: 0;
  transform-origin: top left;
}

.maya-tooltip-content.align-down-center {
  top: calc(100% + 4px);
  left: 50%;
  --x-offset: -50%;
  transform: translate(var(--x-offset), var(--y-offset)) scale(var(--enter-scale));
  transform-origin: top center;
}

.maya-tooltip-content.align-down-right {
  top: calc(100% + 4px);
  right: 0;
  transform-origin: top right;
}

.maya-tooltip-content.align-up-left {
  bottom: calc(100% + 4px);
  left: 0;
  transform-origin: bottom left;
}

.maya-tooltip-content.align-up-center {
  bottom: calc(100% + 4px);
  left: 50%;
  --x-offset: -50%;
  transform: translate(var(--x-offset), var(--y-offset)) scale(var(--enter-scale));
  transform-origin: bottom center;
}

.maya-tooltip-content.align-up-right {
  bottom: calc(100% + 4px);
  right: 0;
  transform-origin: bottom right;
}

/* Tooltips MUST NOT bounce to feel responsive. Fast enter/exit. */
.maya-tooltip-fade-enter-active {
  transition:
    opacity 100ms var(--maya-ease-out),
    transform 150ms var(--maya-ease-out);
}

.maya-tooltip-fade-leave-active {
  transition:
    opacity 100ms cubic-bezier(0.55, 0.05, 0.68, 0.19),
    transform 100ms cubic-bezier(0.55, 0.05, 0.68, 0.19);
}

.maya-tooltip-fade-enter-from {
  opacity: 0;
  --y-offset: -4px;
  --enter-scale: 0.98;
}

.maya-tooltip-fade-leave-to {
  opacity: 0;
  --y-offset: -2px;
  --enter-scale: 0.99;
}

.maya-tooltip-content.align-up-left.maya-tooltip-fade-enter-from,
.maya-tooltip-content.align-up-center.maya-tooltip-fade-enter-from,
.maya-tooltip-content.align-up-right.maya-tooltip-fade-enter-from {
  --y-offset: 4px;
}

.maya-tooltip-content {
  transform: translate(var(--x-offset), var(--y-offset)) scale(var(--enter-scale));
}
</style>
