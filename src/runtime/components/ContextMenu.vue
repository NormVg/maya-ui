<template>
  <div @contextmenu.prevent="open" class="maya-context-trigger">
    <slot />

    <Teleport to="body">
      <Transition name="maya-dropdown-fade">
        <div v-if="isOpen" ref="menu" class="maya-dropdown-content maya-context-menu"
          :style="{ top: `${y}px`, left: `${x}px` }" role="menu" @keydown.esc="close" tabindex="-1">
          <slot name="menu" />
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, provide, nextTick } from 'vue'

const isOpen = ref(false)
const x = ref(0)
const y = ref(0)
const menu = ref(null)

provide('closeDropdown', close)

function open(e) {
  // Prevent immediate close event from this click bubbling
  e.stopPropagation()

  isOpen.value = true

  // Calculate positioning to avoid screen overflow
  nextTick(() => {
    let targetX = e.clientX
    let targetY = e.clientY

    if (menu.value) {
      const rect = menu.value.getBoundingClientRect()
      // Adjust if off screen right
      if (targetX + rect.width > window.innerWidth) {
        targetX = window.innerWidth - rect.width - 8
      }
      // Adjust if off screen bottom
      if (targetY + rect.height > window.innerHeight) {
        targetY = targetY - rect.height // Flip it upwards
      }

      menu.value.focus()
    }

    x.value = targetX
    y.value = targetY
  })
}

function close() {
  isOpen.value = false
}

function onClickOutside(e) {
  if (isOpen.value && menu.value && !menu.value.contains(e.target)) {
    close()
  }
}

// Global dismiss listeners
onMounted(() => {
  document.addEventListener('click', onClickOutside)
  document.addEventListener('contextmenu', (e) => {
    // If we right-click outside, close the current one
    if (isOpen.value && menu.value && !menu.value.contains(e.target)) {
      close()
    }
  })
})

onUnmounted(() => {
  document.removeEventListener('click', onClickOutside)
})
</script>

<style scoped>
.maya-context-trigger {
  display: contents;
}

.maya-dropdown-content.maya-context-menu {
  position: fixed;
  min-width: 180px;
  background: var(--maya-bg-surface);
  border: 1px solid var(--maya-border);
  border-radius: var(--maya-radius-md);
  padding: 4px;
  z-index: 9999;
  box-shadow: var(--maya-shadow-md);
  outline: none;
}

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
</style>
