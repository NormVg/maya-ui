<template>
  <Teleport to="body">
    <Transition name="maya-overlay-fade">
      <div v-if="open" class="maya-alert-dialog-overlay" @click="handleBackdropClick" />
    </Transition>

    <Transition name="maya-dialog-zoom">
      <div v-if="open" class="maya-alert-dialog-wrapper" @click.self="handleBackdropClick" role="dialog"
        aria-modal="true">
        <div class="maya-alert-dialog">

          <div class="maya-alert-dialog__header">
            <h2 class="maya-alert-dialog__title">
              <slot name="title">{{ title }}</slot>
            </h2>
            <p v-if="description || $slots.description" class="maya-alert-dialog__description">
              <slot name="description">{{ description }}</slot>
            </p>
          </div>

          <div class="maya-alert-dialog__content" v-if="$slots.default">
            <slot />
          </div>

          <div class="maya-alert-dialog__footer">
            <slot name="cancel">
              <MayaBtn variant="secondary" @click="emit('update:open', false)">Cancel</MayaBtn>
            </slot>
            <slot name="action">
              <MayaBtn intent="danger" @click="emit('action')">Continue</MayaBtn>
            </slot>
          </div>

        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import { onMounted, onUnmounted, watch } from 'vue'

const props = defineProps({
  open: {
    type: Boolean,
    default: false
  },
  title: {
    type: String,
    default: ''
  },
  description: {
    type: String,
    default: ''
  },
  preventCloseOut: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['update:open', 'action'])

function handleBackdropClick() {
  if (!props.preventCloseOut) {
    emit('update:open', false)
  }
}

function handleEscape(e) {
  if (e.key === 'Escape' && props.open && !props.preventCloseOut) {
    emit('update:open', false)
  }
}

watch(() => props.open, (isOpen) => {
  if (isOpen) {
    document.body.style.overflow = 'hidden'
  } else {
    document.body.style.overflow = ''
  }
})

onMounted(() => {
  window.addEventListener('keydown', handleEscape)
  if (props.open) document.body.style.overflow = 'hidden'
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleEscape)
  document.body.style.overflow = ''
})
</script>

<style scoped>
.maya-alert-dialog-overlay {
  position: fixed;
  inset: 0;
  z-index: 50;
  background-color: var(--maya-bg-overlay);
  backdrop-filter: blur(2px);
}

.maya-alert-dialog-wrapper {
  position: fixed;
  inset: 0;
  z-index: 51;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
}

.maya-alert-dialog {
  width: 100%;
  max-width: 480px;
  background-color: var(--maya-bg-surface);
  border: 1px solid var(--maya-border-strong);
  border-radius: var(--maya-radius-lg);
  box-shadow: var(--maya-shadow-md);
  padding: 24px;
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 16px;
  font-family: var(--maya-font-sans);
}

/* Base text */
.maya-alert-dialog__title {
  font-size: 1.125rem;
  font-weight: 600;
  color: var(--maya-text-primary);
  margin: 0 0 8px 0;
  letter-spacing: -0.01em;
}

.maya-alert-dialog__description {
  font-size: 0.9375rem;
  color: var(--maya-text-secondary);
  line-height: 1.5;
  margin: 0;
}

.maya-alert-dialog__footer {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  margin-top: 16px;
}

/* Animations */
.maya-overlay-fade-enter-active,
.maya-overlay-fade-leave-active {
  transition: opacity 250ms var(--maya-ease-out);
}
.maya-overlay-fade-enter-from,
.maya-overlay-fade-leave-to {
  opacity: 0;
}

.maya-dialog-zoom-enter-active {
  transition: opacity 250ms var(--maya-ease-out), transform 400ms var(--maya-ease-bouncy);
}
.maya-dialog-zoom-leave-active {
  transition: opacity 200ms ease-in, transform 200ms ease-in;
}
.maya-dialog-zoom-enter-from {
  opacity: 0;
  transform: scale(0.95);
}
.maya-dialog-zoom-leave-to {
  opacity: 0;
  transform: scale(0.98);
}
</style>
