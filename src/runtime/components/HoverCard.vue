<template>
  <div class="maya-hover-card" ref="container" @mouseenter="onContainerEnter" @mouseleave="onContainerLeave">
    <div class="maya-hover-card-trigger-wrapper" aria-haspopup="dialog" :aria-expanded="isOpen">
      <slot name="trigger" />
    </div>

    <Transition name="maya-hover-card-fade">
      <div v-if="isOpen" class="maya-hover-card-content" :class="[`align-${align}`]" role="dialog">
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
    default: 'down-center', // down-left, down-center, down-right, up-left, up-center, up-right
  },
  openDelay: {
    type: Number,
    default: 500
  },
  closeDelay: {
    type: Number,
    default: 300
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
.maya-hover-card {
  position: relative;
  display: inline-block;
}

.maya-hover-card-trigger-wrapper {
  display: inline-flex;
  outline: none;
}

.maya-hover-card-content {
  position: absolute;
  width: max-content;
  max-width: 320px;
  background: var(--maya-bg-surface);
  border: 1px solid var(--maya-border);
  border-radius: var(--maya-radius-lg);
  padding: 1rem;
  z-index: 100;

  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.04),
    0 4px 16px rgba(0, 0, 0, 0.3),
    0 1px 3px rgba(0, 0, 0, 0.2);
  background-image: linear-gradient(180deg,
      rgba(255, 255, 255, 0.03) 0%,
      rgba(255, 255, 255, 0) 100%);

  --x-offset: 0px;
  --y-offset: 0px;
  --enter-scale: 1;
}

.maya-hover-card-content.align-down-left {
  top: calc(100% + 8px);
  left: 0;
  transform: translate(0, var(--y-offset, 0px)) scale(var(--enter-scale, 1));
  transform-origin: top left;
}

.maya-hover-card-content.align-down-center {
  top: calc(100% + 8px);
  left: 50%;
  transform: translate(-50%, var(--y-offset, 0px)) scale(var(--enter-scale, 1));
  transform-origin: top center;
}

.maya-hover-card-content.align-down-right {
  top: calc(100% + 8px);
  right: 0;
  transform: translate(0, var(--y-offset, 0px)) scale(var(--enter-scale, 1));
  transform-origin: top right;
}

.maya-hover-card-content.align-up-left {
  bottom: calc(100% + 8px);
  left: 0;
  transform: translate(0, var(--y-offset, 0px)) scale(var(--enter-scale, 1));
  transform-origin: bottom left;
}

.maya-hover-card-content.align-up-center {
  bottom: calc(100% + 8px);
  left: 50%;
  transform: translate(-50%, var(--y-offset, 0px)) scale(var(--enter-scale, 1));
  transform-origin: bottom center;
}

.maya-hover-card-content.align-up-right {
  bottom: calc(100% + 8px);
  right: 0;
  transform: translate(0, var(--y-offset, 0px)) scale(var(--enter-scale, 1));
  transform-origin: bottom right;
}

/* Hover cards should feel slightly lighter than dialogs. Ease-out entrance. */
.maya-hover-card-fade-enter-active {
  transition:
    opacity 200ms var(--maya-ease-out),
    transform 250ms var(--maya-ease-out);
}

.maya-hover-card-fade-leave-active {
  transition:
    opacity 150ms cubic-bezier(0.55, 0.05, 0.68, 0.19),
    transform 150ms cubic-bezier(0.55, 0.05, 0.68, 0.19);
}

.maya-hover-card-fade-enter-from {
  opacity: 0;
  --y-offset: -6px;
  --enter-scale: 0.96;
}

.maya-hover-card-fade-leave-to {
  opacity: 0;
  --y-offset: -2px;
  --enter-scale: 0.98;
}

.maya-hover-card-content.align-up-left.maya-hover-card-fade-enter-from,
.maya-hover-card-content.align-up-center.maya-hover-card-fade-enter-from,
.maya-hover-card-content.align-up-right.maya-hover-card-fade-enter-from {
  --y-offset: 6px;
}
</style>
