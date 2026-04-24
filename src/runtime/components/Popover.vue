<template>
  <div class="maya-popover" ref="container">
    <div
      ref="triggerRef"
      class="maya-popover__trigger"
      role="button"
      tabindex="0"
      aria-haspopup="dialog"
      :aria-expanded="isOpen"
      @click="toggle"
      @keydown.enter.prevent="toggle"
      @keydown.space.prevent="toggle"
    >
      <slot name="trigger" />
    </div>

    <Transition name="maya-popover-transition">
      <div
        v-if="isOpen"
        ref="contentRef"
        class="maya-popover__content"
        :class="`align-${align}`"
        role="dialog"
        :aria-label="ariaLabel"
        @click.stop
      >
        <slot />
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'

withDefaults(defineProps<{
  align?: 'bottom-start' | 'bottom-center' | 'bottom-end' | 'top-start' | 'top-center' | 'top-end'
  ariaLabel?: string
}>(), {
  align: 'bottom-start',
  ariaLabel: 'Popover'
})

const isOpen = ref(false)
const container = ref<HTMLElement | null>(null)
const triggerRef = ref<HTMLElement | null>(null)
const contentRef = ref<HTMLElement | null>(null)

function open() {
  isOpen.value = true
}

function close() {
  isOpen.value = false
}

function toggle() {
  isOpen.value ? close() : open()
}

function onDocumentClick(event: MouseEvent) {
  if (!isOpen.value || !container.value) return
  const target = event.target as Node
  if (!container.value.contains(target)) close()
}

function onDocumentKeydown(event: KeyboardEvent) {
  if (event.key !== 'Escape' || !isOpen.value) return
  close()
  triggerRef.value?.focus()
}

onMounted(() => {
  document.addEventListener('click', onDocumentClick)
  document.addEventListener('keydown', onDocumentKeydown)
})

onUnmounted(() => {
  document.removeEventListener('click', onDocumentClick)
  document.removeEventListener('keydown', onDocumentKeydown)
})
</script>

<style scoped>
.maya-popover {
  position: relative;
  display: inline-block;
}

.maya-popover__trigger {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  outline: none;
}

.maya-popover__trigger::after {
  content: '';
  position: absolute;
  inset: -6px;
}

.maya-popover__trigger:focus-visible {
  border-radius: var(--maya-radius-sm);
  box-shadow: 0 0 0 3px var(--maya-border);
}

.maya-popover__content {
  --x: 0;
  --y: 0;
  --scale: 1;
  position: absolute;
  z-index: 300;
  min-width: 220px;
  max-width: min(92vw, 360px);
  padding: 12px;
  border-radius: var(--maya-radius-lg);
  border: 1px solid var(--maya-border);
  background: var(--maya-bg-raised);
  background-image: var(--maya-gradient-surface);
  color: var(--maya-text-primary);
  box-shadow: var(--maya-shadow-md);
  transform: translate(var(--x), var(--y)) scale(var(--scale));
}

.maya-popover__content.align-bottom-start {
  top: calc(100% + 8px);
  left: 0;
  transform-origin: top left;
}

.maya-popover__content.align-bottom-center {
  top: calc(100% + 8px);
  left: 50%;
  --x: -50%;
  transform-origin: top center;
}

.maya-popover__content.align-bottom-end {
  top: calc(100% + 8px);
  right: 0;
  transform-origin: top right;
}

.maya-popover__content.align-top-start {
  bottom: calc(100% + 8px);
  left: 0;
  transform-origin: bottom left;
}

.maya-popover__content.align-top-center {
  bottom: calc(100% + 8px);
  left: 50%;
  --x: -50%;
  transform-origin: bottom center;
}

.maya-popover__content.align-top-end {
  bottom: calc(100% + 8px);
  right: 0;
  transform-origin: bottom right;
}

.maya-popover-transition-enter-active {
  transition:
    opacity 200ms cubic-bezier(0.19, 1, 0.22, 1),
    transform 240ms cubic-bezier(0.19, 1, 0.22, 1),
    filter 220ms cubic-bezier(0.19, 1, 0.22, 1);
}

.maya-popover-transition-leave-active {
  transition:
    opacity 140ms cubic-bezier(0.55, 0.05, 0.68, 0.19),
    transform 140ms cubic-bezier(0.55, 0.05, 0.68, 0.19),
    filter 140ms cubic-bezier(0.55, 0.05, 0.68, 0.19);
}

.maya-popover-transition-enter-from {
  opacity: 0;
  --y: -6px;
  --scale: 0.96;
  filter: blur(8px);
}

.maya-popover-transition-leave-to {
  opacity: 0;
  --y: -4px;
  --scale: 0.98;
  filter: blur(8px);
}

.maya-popover__content.align-top-start.maya-popover-transition-enter-from,
.maya-popover__content.align-top-center.maya-popover-transition-enter-from,
.maya-popover__content.align-top-end.maya-popover-transition-enter-from,
.maya-popover__content.align-top-start.maya-popover-transition-leave-to,
.maya-popover__content.align-top-center.maya-popover-transition-leave-to,
.maya-popover__content.align-top-end.maya-popover-transition-leave-to {
  --y: 6px;
}
</style>
