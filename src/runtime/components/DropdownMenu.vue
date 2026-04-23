<template>
  <div class="maya-dropdown" ref="container">
    <div class="maya-dropdown-trigger-wrapper" @click="toggle" @keydown.enter.prevent="toggle"
      @keydown.space.prevent="toggle" role="button" aria-haspopup="menu" :aria-expanded="isOpen" tabindex="0">
      <slot name="trigger" />
    </div>

    <Transition name="maya-dropdown-fade">
      <div v-if="isOpen" class="maya-dropdown-content" :class="[`align-${align}`]" role="menu"
        @keydown.esc="closeDropdown" tabindex="-1">
        <slot />
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, provide } from 'vue'

const props = defineProps({
  align: {
    type: String,
    default: 'down-left', // down-left, down-right, up-left, up-right
  }
})

const isOpen = ref(false)
const container = ref(null)

provide('closeDropdown', closeDropdown)

function toggle() {
  isOpen.value = !isOpen.value
}

function closeDropdown() {
  isOpen.value = false
}

function onClickOutside(e) {
  if (isOpen.value && container.value && !container.value.contains(e.target)) {
    closeDropdown()
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
.maya-dropdown {
  position: relative;
  display: inline-block;
}

.maya-dropdown-trigger-wrapper {
  display: inline-flex;
  outline: none;
}

.maya-dropdown-content {
  position: absolute;
  min-width: 200px;
  background: var(--maya-bg-surface);
  border: 1px solid var(--maya-border);
  border-radius: var(--maya-radius-md);
  padding: 4px;
  z-index: 100;
  /* Layered shadow for premium depth as per ui-rules § Shadows */
  box-shadow:
    0 0 0 1px rgba(255, 255, 255, 0.04),
    0 4px 16px rgba(0, 0, 0, 0.3),
    0 1px 3px rgba(0, 0, 0, 0.2);
  /* Subtle gradient to suggest a lit surface */
  background-image: linear-gradient(180deg,
      rgba(255, 255, 255, 0.03) 0%,
      rgba(255, 255, 255, 0) 100%);
}

/* Alignment variants */
.maya-dropdown-content.align-down-left {
  top: calc(100% + 6px);
  left: 0;
  transform-origin: top left;
}

.maya-dropdown-content.align-down-right {
  top: calc(100% + 6px);
  right: 0;
  transform-origin: top right;
}

.maya-dropdown-content.align-up-left {
  bottom: calc(100% + 6px);
  left: 0;
  transform-origin: bottom left;
}

.maya-dropdown-content.align-up-right {
  bottom: calc(100% + 6px);
  right: 0;
  transform-origin: bottom right;
}

/* Entrance: ease-out (fast arrival, gentle settle) per ui-rules § Easing Curves */
.maya-dropdown-fade-enter-active {
  transition:
    opacity 180ms cubic-bezier(0.19, 1, 0.22, 1),
    transform 200ms cubic-bezier(0.19, 1, 0.22, 1);
}

/* Exit: ease-in (builds momentum, gets out of way) */
.maya-dropdown-fade-leave-active {
  transition:
    opacity 100ms cubic-bezier(0.55, 0.05, 0.68, 0.19),
    transform 100ms cubic-bezier(0.55, 0.05, 0.68, 0.19);
}

.maya-dropdown-fade-enter-from {
  opacity: 0;
  transform: translateY(-6px) scale(0.96);
}

.maya-dropdown-fade-leave-to {
  opacity: 0;
  transform: translateY(-3px) scale(0.98);
}

.maya-dropdown-content.align-up-left.maya-dropdown-fade-enter-from,
.maya-dropdown-content.align-up-right.maya-dropdown-fade-enter-from {
  transform: translateY(6px) scale(0.96);
}

.maya-dropdown-content.align-up-left.maya-dropdown-fade-leave-to,
.maya-dropdown-content.align-up-right.maya-dropdown-fade-leave-to {
  transform: translateY(3px) scale(0.98);
}
</style>
