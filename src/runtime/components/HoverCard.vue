<template>
  <div
    ref="container"
    class="maya-hover-card"
    @mouseenter="onEnter"
    @mouseleave="onLeave"
    @focusin="onEnter"
    @focusout="onFocusOut"
  >
    <div class="maya-hover-card__trigger" aria-haspopup="dialog" :aria-expanded="isOpen">
      <slot name="trigger" />
    </div>

    <Transition name="maya-hover-card-transition">
      <div
        v-if="isOpen"
        class="maya-hover-card__content"
        :class="`align-${align}`"
        role="dialog"
        :aria-label="ariaLabel"
        @mouseenter="onEnter"
        @mouseleave="onLeave"
      >
        <slot />
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const props = withDefaults(defineProps<{
  align?: 'bottom-start' | 'bottom-center' | 'bottom-end' | 'top-start' | 'top-center' | 'top-end'
  openDelay?: number
  closeDelay?: number
  ariaLabel?: string
}>(), {
  align: 'bottom-center',
  openDelay: 180,
  closeDelay: 120,
  ariaLabel: 'Hover card'
})

const isOpen = ref(false)
const container = ref<HTMLElement | null>(null)
let openTimeout: ReturnType<typeof setTimeout> | null = null
let closeTimeout: ReturnType<typeof setTimeout> | null = null

function onEnter() {
  if (closeTimeout) {
    clearTimeout(closeTimeout)
    closeTimeout = null
  }
  if (isOpen.value) return
  if (openTimeout) clearTimeout(openTimeout)
  openTimeout = setTimeout(() => {
    isOpen.value = true
    openTimeout = null
  }, props.openDelay)
}

function onLeave() {
  if (openTimeout) {
    clearTimeout(openTimeout)
    openTimeout = null
  }
  if (!isOpen.value) return
  if (closeTimeout) clearTimeout(closeTimeout)
  closeTimeout = setTimeout(() => {
    isOpen.value = false
    closeTimeout = null
  }, props.closeDelay)
}

function onFocusOut(event: FocusEvent) {
  if (!container.value) return
  const nextTarget = event.relatedTarget as Node | null
  if (nextTarget && container.value.contains(nextTarget)) return
  onLeave()
}
</script>

<style scoped>
.maya-hover-card {
  position: relative;
  display: inline-block;
}

.maya-hover-card__trigger {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.maya-hover-card__trigger::after {
  content: '';
  position: absolute;
  inset: -6px;
}

.maya-hover-card__content {
  --x: 0;
  --y: 0;
  --scale: 1;
  position: absolute;
  z-index: 300;
  min-width: 260px;
  max-width: min(92vw, 360px);
  padding: 14px;
  border-radius: var(--maya-radius-lg);
  border: 1px solid var(--maya-border);
  background: var(--maya-bg-raised);
  background-image: var(--maya-gradient-surface);
  box-shadow: var(--maya-shadow-md);
  color: var(--maya-text-primary);
  transform: translate(var(--x), var(--y)) scale(var(--scale));
}

.maya-hover-card__content.align-bottom-start {
  top: calc(100% + 10px);
  left: 0;
  transform-origin: top left;
}

.maya-hover-card__content.align-bottom-center {
  top: calc(100% + 10px);
  left: 50%;
  --x: -50%;
  transform-origin: top center;
}

.maya-hover-card__content.align-bottom-end {
  top: calc(100% + 10px);
  right: 0;
  transform-origin: top right;
}

.maya-hover-card__content.align-top-start {
  bottom: calc(100% + 10px);
  left: 0;
  transform-origin: bottom left;
}

.maya-hover-card__content.align-top-center {
  bottom: calc(100% + 10px);
  left: 50%;
  --x: -50%;
  transform-origin: bottom center;
}

.maya-hover-card__content.align-top-end {
  bottom: calc(100% + 10px);
  right: 0;
  transform-origin: bottom right;
}

.maya-hover-card-transition-enter-active {
  transition:
    opacity 200ms var(--maya-ease-out),
    transform 250ms var(--maya-ease-out),
    filter 220ms var(--maya-ease-out);
}

.maya-hover-card-transition-leave-active {
  transition:
    opacity 120ms var(--maya-ease-in),
    transform 120ms var(--maya-ease-in),
    filter 120ms var(--maya-ease-in);
}

.maya-hover-card-transition-enter-from {
  opacity: 0;
  --y: -6px;
  --scale: 0.96;
  filter: blur(8px);
}

.maya-hover-card-transition-leave-to {
  opacity: 0;
  --y: -4px;
  --scale: 0.98;
  filter: blur(8px);
}

.maya-hover-card__content.align-top-start.maya-hover-card-transition-enter-from,
.maya-hover-card__content.align-top-center.maya-hover-card-transition-enter-from,
.maya-hover-card__content.align-top-end.maya-hover-card-transition-enter-from,
.maya-hover-card__content.align-top-start.maya-hover-card-transition-leave-to,
.maya-hover-card__content.align-top-center.maya-hover-card-transition-leave-to,
.maya-hover-card__content.align-top-end.maya-hover-card-transition-leave-to {
  --y: 6px;
}
</style>
