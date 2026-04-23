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

// Provide close method to children items
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
  min-width: 180px;
  background: var(--maya-bg-surface);
  border: 1px solid var(--maya-border);
  border-radius: var(--maya-radius-md);
  padding: 4px;
  z-index: 100;
  box-shadow: var(--maya-shadow-md);
}

/* Alignment variants */
.maya-dropdown-content.align-down-left {
  top: calc(100% + 4px);
  left: 0;
}

.maya-dropdown-content.align-down-right {
  top: calc(100% + 4px);
  right: 0;
}

.maya-dropdown-content.align-up-left {
  bottom: calc(100% + 4px);
  left: 0;
}

.maya-dropdown-content.align-up-right {
  bottom: calc(100% + 4px);
  right: 0;
}

/* Dropdown Animation (Using the crisp ultra-smooth var) */
.maya-dropdown-fade-enter-active {
  transition: opacity var(--maya-duration) var(--maya-ease), transform var(--maya-duration) var(--maya-ease);
}

.maya-dropdown-fade-leave-active {
  transition: opacity 120ms ease, transform 120ms ease;
}

.maya-dropdown-fade-enter-from {
  opacity: 0;
  transform: translateY(-4px) scale(0.98);
}

.maya-dropdown-fade-leave-to {
  opacity: 0;
  transform: translateY(-2px) scale(0.99);
}

.maya-dropdown-content.align-up-left.maya-dropdown-fade-enter-from,
.maya-dropdown-content.align-up-right.maya-dropdown-fade-enter-from {
  transform: translateY(4px) scale(0.98);
}

.maya-dropdown-content.align-up-left.maya-dropdown-fade-leave-to,
.maya-dropdown-content.align-up-right.maya-dropdown-fade-leave-to {
  transform: translateY(2px) scale(0.99);
}
</style>
