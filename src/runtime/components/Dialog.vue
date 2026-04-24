<template>
  <ClientOnly>
    <Teleport to="body">
      <Transition name="maya-dialog" :duration="{ enter: 400, leave: 200 }">
        <div v-show="modelValue" class="maya-dialog-root" role="dialog" aria-modal="true" :aria-labelledby="titleId" :aria-describedby="descId">
          <div class="maya-dialog-backdrop" @click="closeOnClickOutside && close()" />

          <div class="maya-dialog-container">
            <div class="maya-dialog-content">
              <!-- Close Button -->
              <div class="maya-dialog-close-wrapper" v-if="showClose">
                <button class="maya-dialog-close-btn" @click="close" aria-label="Close dialog">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-x"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
                </button>
              </div>

              <!-- Content -->
              <div class="maya-dialog-body">
                <slot />
              </div>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>
  </ClientOnly>
</template>

<script setup lang="ts">
import { watch, onMounted, onUnmounted } from 'vue'

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false
  },
  showClose: {
    type: Boolean,
    default: true
  },
  closeOnClickOutside: {
    type: Boolean,
    default: true
  },
  closeOnEscape: {
    type: Boolean,
    default: true
  },
  titleId: {
    type: String,
    default: undefined
  },
  descId: {
    type: String,
    default: undefined
  }
})

const emit = defineEmits(['update:modelValue', 'close'])

const close = () => {
  emit('update:modelValue', false)
  emit('close')
}

// Handle Escape Key
const handleKeydown = (e: KeyboardEvent) => {
  if (e.key === 'Escape' && props.modelValue && props.closeOnEscape) {
    close()
  }
}

// Lock body scroll
watch(() => props.modelValue, (isOpen) => {
  if (typeof document === 'undefined') return
  if (isOpen) {
    document.body.style.overflow = 'hidden'
  } else {
    document.body.style.overflow = ''
  }
})

onMounted(() => {
  if (typeof window !== 'undefined') {
    window.addEventListener('keydown', handleKeydown)
  }
})

onUnmounted(() => {
  if (typeof window !== 'undefined') {
    window.removeEventListener('keydown', handleKeydown)
    document.body.style.overflow = ''
  }
})
</script>

<style scoped>
.maya-dialog-root {
  position: fixed;
  inset: 0;
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: center;
}

.maya-dialog-backdrop {
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(2px);
  -webkit-backdrop-filter: blur(2px);
  z-index: 101;
}

.maya-dialog-container {
  position: relative;
  z-index: 102;
  width: 100%;
  max-width: 480px;
  padding: 1rem;
}

.maya-dialog-content {
  position: relative;
  background-color: var(--maya-bg-surface);
  border-radius: var(--maya-radius-lg, 12px);
  border: 1px solid var(--maya-border-muted);

  /* Inner / Outer shadow depth aesthetics as dictated by ui-rules */
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.04), /* Subtle inner light from top */
    inset 0 -1px 0 rgba(255, 255, 255, 0.02), /* Subtle inner rim */
    0 4px 24px -4px rgba(0, 0, 0, 0.4), /* Deep outer shadow */
    0 12px 48px -12px rgba(0, 0, 0, 0.5); /* Extended ambient decay */

  padding: 1.5rem;
  overflow: hidden;
}

.maya-dialog-body {
  position: relative;
}

/* Close Button Hit Area Extender */
.maya-dialog-close-wrapper {
  position: absolute;
  top: 1rem;
  right: 1rem;
  z-index: 10;
}

.maya-dialog-close-btn {
  background: transparent;
  border: none;
  color: var(--maya-text-muted);
  cursor: pointer;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: var(--maya-radius-sm);
  position: relative;
  transition: all 150ms var(--maya-ease-out, ease-out);
}

.maya-dialog-close-btn::after {
  content: '';
  position: absolute;
  inset: -8px; /* Expand hit area invisibly */
}

.maya-dialog-close-btn::before {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: inherit;
  background: currentColor;
  opacity: 0;
  transform: scale(0.95);
  transition: all 150ms ease;
}

.maya-dialog-close-btn:hover {
  color: var(--maya-text-primary);
}
.maya-dialog-close-btn:hover::before {
  opacity: 0.1;
  transform: scale(1);
}
.maya-dialog-close-btn:active {
  transform: scale(0.92);
}

/*
  Transition Physics:
  Backdrop fades in via ease-out.
  Dialog box scales in using bouncy spring.
*/
.maya-dialog-enter-active .maya-dialog-backdrop,
.maya-dialog-leave-active .maya-dialog-backdrop {
  transition: opacity 250ms var(--maya-ease-out, ease-out);
}

.maya-dialog-enter-active .maya-dialog-content {
  transition: opacity 250ms ease-out, transform 400ms var(--maya-ease-bouncy, cubic-bezier(0.34, 1.56, 0.64, 1));
}

.maya-dialog-leave-active .maya-dialog-content {
  transition: opacity 200ms ease-in, transform 200ms ease-in;
}

.maya-dialog-enter-from .maya-dialog-backdrop,
.maya-dialog-leave-to .maya-dialog-backdrop {
  opacity: 0;
}

.maya-dialog-enter-from .maya-dialog-content {
  opacity: 0;
  transform: scale(0.95);
}

.maya-dialog-leave-to .maya-dialog-content {
  opacity: 0;
  transform: scale(0.98); /* Less drastic collapse on exit */
}
</style>
