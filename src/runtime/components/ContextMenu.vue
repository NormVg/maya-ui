<template>
  <div @contextmenu.prevent="open" class="maya-context-trigger">
    <slot />

    <Teleport to="body">
      <Transition name="maya-ctx-fade">
        <div v-if="isOpen" ref="menu" class="maya-context-menu" :style="{ top: `${y}px`, left: `${x}px` }" role="menu"
          @keydown.esc="close" tabindex="-1">
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
  e.stopPropagation()
  isOpen.value = true

  nextTick(() => {
    let targetX = e.clientX
    let targetY = e.clientY

    if (menu.value) {
      const rect = menu.value.getBoundingClientRect()
      if (targetX + rect.width > window.innerWidth) {
        targetX = window.innerWidth - rect.width - 8
      }
      if (targetY + rect.height > window.innerHeight) {
        targetY = targetY - rect.height
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

onMounted(() => {
  document.addEventListener('click', onClickOutside)
  document.addEventListener('contextmenu', (e) => {
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

.maya-context-menu {
  position: fixed;
  min-width: 200px;
  background: var(--maya-bg-surface);
  background-image: linear-gradient(180deg,
      rgba(255, 255, 255, 0.03) 0%,
      rgba(255, 255, 255, 0) 100%);
  border: 1px solid var(--maya-border);
  border-radius: var(--maya-radius-md);
  padding: 4px;
  z-index: 9999;
  box-shadow:
    0 0 0 1px rgba(255, 255, 255, 0.04),
    0 8px 24px rgba(0, 0, 0, 0.35),
    0 2px 6px rgba(0, 0, 0, 0.25);
  outline: none;
}

/* Context menus: animate on entry from click position, fast exit */
.maya-ctx-fade-enter-active {
  transition:
    opacity 160ms cubic-bezier(0.19, 1, 0.22, 1),
    transform 180ms cubic-bezier(0.19, 1, 0.22, 1);
}

.maya-ctx-fade-leave-active {
  transition:
    opacity 100ms cubic-bezier(0.55, 0.05, 0.68, 0.19),
    transform 100ms cubic-bezier(0.55, 0.05, 0.68, 0.19);
}

.maya-ctx-fade-enter-from {
  opacity: 0;
  transform: scale(0.94) translateY(-4px);
}

.maya-ctx-fade-leave-to {
  opacity: 0;
  transform: scale(0.97);
}
</style>
