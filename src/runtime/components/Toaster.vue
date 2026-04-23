<template>
  <ClientOnly>
    <Teleport to="body">
      <div class="maya-toaster" aria-live="polite" aria-atomic="true">
        <TransitionGroup name="maya-toast-stack" tag="ul" class="maya-toaster__list">
          <li v-for="(toast, index) in toasts" :key="toast.id" class="maya-toaster__item" :style="getToastStyle(index)"
            :data-front="index === 0" :ref="el => setRef(toast.id, el)">
            <MayaToast :toast="toast" @dismiss="dismiss(toast.id)" />
          </li>
        </TransitionGroup>
      </div>
    </Teleport>
  </ClientOnly>
</template>

<script setup>
import { ref, watch, nextTick } from 'vue'

const { toasts, dismiss } = useToast()
const VISIBLE_COUNT = 3

const heights = ref({})

function setRef(id, el) {
  if (el) {
    heights.value[id] = el.offsetHeight
  } else {
    delete heights.value[id]
  }
}

// Ensure style updates gracefully if heights change
watch(() => toasts.value.length, async () => {
  await nextTick()
})

function getToastStyle(index) {
  // Cumulate preceding toast heights + 12px gap
  let offset = 0
  for (let i = 0; i < index; i++) {
    const t = toasts.value[i]
    offset += (heights.value[t.id] || 60) + 12
  }

  // Cap offsets to 3 items to avoid off-screen scaling rendering issues
  if (index >= VISIBLE_COUNT) {
    return {
      '--y-offset': `${offset}px`,
      '--scale': 1 - VISIBLE_COUNT * 0.05,
      opacity: 0,
      pointerEvents: 'none'
    }
  }

  return {
    '--y-offset': `${offset}px`,
    '--scale': 1 - (index * 0.05),
    zIndex: 50 - index,
    opacity: 1
  }
}
</script>

<style scoped>
.maya-toaster {
  position: fixed;
  bottom: 0;
  right: 0;
  z-index: 100;
  padding: 32px;
  pointer-events: none;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  outline: none;
  perspective: 1000px;
}

.maya-toaster__list {
  margin: 0;
  padding: 0;
  list-style: none;
  position: relative;
  width: 356px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
}

.maya-toaster__item {
  position: absolute;
  bottom: 0;
  right: 0;
  width: 100%;
  pointer-events: auto;
  transition: opacity 400ms ease, transform 400ms var(--maya-ease-bouncy);
  transform-origin: bottom center;
  transform: translateY(calc(0px - var(--y-offset))) scale(var(--scale));
}

.maya-toast-stack-enter-active {
  transition: opacity 400ms ease, transform 500ms var(--maya-ease-bouncy);
}

.maya-toast-stack-leave-active {
  transition: opacity 300ms ease, transform 300ms var(--maya-ease-in);
  position: absolute;
}

.maya-toast-stack-enter-from {
  opacity: 0;
  transform: translateY(100%) scale(0.9) !important;
}

.maya-toast-stack-leave-to {
  opacity: 0;
  transform: translateY(20px) scale(0.9) !important;
}
</style>
