<template>
  <Teleport to="body">
    <Transition name="maya-modal-backdrop">
      <div v-if="modelValue" class="maya-modal-backdrop" @click="closeOnClickOutside && close()">
        <Transition name="maya-modal-content" appear>
          <div class="maya-modal" :style="{ maxWidth }" @click.stop v-bind="$attrs">
            <div class="maya-modal-header" v-if="$slots.header || title || description">
              <slot name="header">
                <div>
                  <h2 v-if="title" class="maya-modal-title">{{ title }}</h2>
                  <p v-if="description" class="maya-modal-description">{{ description }}</p>
                </div>
              </slot>
              <button class="maya-modal-close" @click="close" aria-label="Close">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                  stroke-linecap="round" stroke-linejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>

            <div class="maya-modal-body">
              <slot />
            </div>

            <div class="maya-modal-footer" v-if="$slots.footer">
              <slot name="footer" />
            </div>
          </div>
        </Transition>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import { watch, onMounted, onUnmounted } from 'vue'

const props = defineProps({
  modelValue: { type: Boolean, default: false },
  title: { type: String, default: '' },
  description: { type: String, default: '' },
  maxWidth: { type: String, default: '480px' },
  closeOnClickOutside: { type: Boolean, default: true }
})

const emit = defineEmits(['update:modelValue'])

function close() {
  emit('update:modelValue', false)
}

function handleKeydown(e) {
  if (e.key === 'Escape' && props.modelValue) {
    close()
  }
}

watch(() => props.modelValue, (isOpen) => {
  if (isOpen) {
    document.body.style.overflow = 'hidden'
  } else {
    document.body.style.overflow = ''
  }
})

onMounted(() => {
  document.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
  document.removeEventListener('keydown', handleKeydown)
  document.body.style.overflow = ''
})
</script>

<style scoped>
.maya-modal-backdrop {
  position: fixed;
  inset: 0;
  z-index: 1000;
  background: var(--maya-bg-overlay);
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
}

.maya-modal {
  position: relative;
  width: 100%;
  background: var(--maya-bg-surface);
  border: 1px solid var(--maya-border);
  border-radius: var(--maya-radius-xl);
  box-shadow: var(--maya-shadow-md);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  max-height: 100%;
}

.maya-modal-header {
  padding: 20px 24px;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  border-bottom: 1px dashed var(--maya-dash-color);
  background: var(--maya-bg-root);
}

.maya-modal-title {
  margin: 0;
  font-size: 1.125rem;
  font-weight: 500;
  color: var(--maya-text-primary);
}

.maya-modal-description {
  margin: 6px 0 0 0;
  font-size: 0.875rem;
  color: var(--maya-text-secondary);
}

.maya-modal-close {
  background: transparent;
  border: none;
  color: var(--maya-text-muted);
  cursor: pointer;
  padding: 6px;
  margin: -6px -6px -6px 16px;
  border-radius: var(--maya-radius-sm);
  transition: all var(--maya-duration) var(--maya-ease);
  display: flex;
  align-items: center;
  justify-content: center;
}

.maya-modal-close:hover {
  color: var(--maya-text-primary);
  background: var(--maya-btn-secondary-bg-hover);
}

.maya-modal-close:active {
  transform: scale(0.9);
}

.maya-modal-body {
  padding: 24px;
  font-size: 0.875rem;
  color: var(--maya-text-primary);
  overflow-y: auto;
}

.maya-modal-footer {
  padding: 16px 24px;
  background: var(--maya-bg-root);
  border-top: 1px dashed var(--maya-dash-color);
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 12px;
}

/* Backdrop Transition */
.maya-modal-backdrop-enter-active,
.maya-modal-backdrop-leave-active {
  transition: opacity 250ms ease, backdrop-filter 250ms ease;
}

.maya-modal-backdrop-enter-from,
.maya-modal-backdrop-leave-to {
  opacity: 0;
  backdrop-filter: blur(0px);
  -webkit-backdrop-filter: blur(0px);
}

/* Modal Content Transition */
.maya-modal-content-enter-active {
  transition: transform var(--maya-duration-bouncy) var(--maya-ease-bouncy), opacity 200ms ease;
}

.maya-modal-content-leave-active {
  transition: transform 150ms ease, opacity 100ms ease;
}

.maya-modal-content-enter-from,
.maya-modal-content-leave-to {
  opacity: 0;
  transform: scale(0.97) translateY(8px);
}
</style>
