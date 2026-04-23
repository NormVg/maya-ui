<template>
  <div class="maya-toast" :class="[`maya-toast--intent-${toast.intent || 'default'}`]" role="status" aria-live="polite">
    <div v-if="toast.icon" class="maya-toast__icon">
      <component :is="toast.icon" />
    </div>

    <div class="maya-toast__content">
      <div class="maya-toast__title">{{ toast.title }}</div>
      <div v-if="toast.description" class="maya-toast__desc">{{ toast.description }}</div>
    </div>

    <div v-if="toast.action" class="maya-toast__action">
      <MayaBtn size="sm" @click="handleAction">{{ toast.action.label }}</MayaBtn>
    </div>

    <button class="maya-toast__close" aria-label="Dismiss toast" @click="emit('dismiss')">
      <XIcon />
    </button>
  </div>
</template>

<script setup>
import { XIcon } from 'lucide-vue-next'

const props = defineProps({
  toast: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['dismiss'])

function handleAction() {
  if (props.toast.action && props.toast.action.onClick) {
    props.toast.action.onClick()
  }
  emit('dismiss')
}
</script>

<style scoped>
.maya-toast {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 16px 48px 16px 16px;
  border-radius: var(--maya-radius-lg);
  position: relative;
  overflow: hidden;
  font-family: var(--maya-font-sans);

  /* Very high elevation for Toasts */
  background: var(--maya-bg-surface);
  border: 1px solid var(--maya-border-strong);
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.04),
    0 8px 30px rgba(0, 0, 0, 0.12),
    0 0 0 1px rgba(0, 0, 0, 0.03);
}

[data-theme="dark"] .maya-toast {
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.04),
    inset 0 -1px 0 rgba(0, 0, 0, 0.1),
    0 8px 32px rgba(0, 0, 0, 0.4),
    0 0 0 1px rgba(0, 0, 0, 0.1);
}

.maya-toast__icon {
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--maya-text-primary);
  margin-top: 2px;
}

.maya-toast__icon :deep(svg) {
  width: 18px;
  height: 18px;
  stroke-width: 2px;
}

.maya-toast__content {
  flex: 1;
  min-width: 0;
  padding-right: 12px;
}

.maya-toast__title {
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--maya-text-primary);
  line-height: 1.4;
}

.maya-toast__desc {
  font-size: 0.8125rem;
  color: var(--maya-text-secondary);
  line-height: 1.4;
  margin-top: 4px;
}

.maya-toast__action {
  flex-shrink: 0;
  margin-left: 8px;
  align-self: center;
}

.maya-toast__close {
  background: none;
  border: none;
  padding: 0;
  margin: 0;
  color: var(--maya-text-secondary);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  border-radius: var(--maya-radius-md);
  transition: var(--maya-transition-standard);
  position: absolute;
  top: 12px;
  right: 12px;
}

.maya-toast__close::after {
  content: '';
  position: absolute;
  inset: -6px;
  /* Fitts law */
}

.maya-toast__close:hover {
  background-color: var(--maya-btn-ghost-bg-hover);
  color: var(--maya-text-primary);
}

.maya-toast__close :deep(svg) {
  width: 14px;
  height: 14px;
}

/* ─── Intents ─── */

.maya-toast--intent-success {
  background: var(--maya-bg-surface);
  border-color: var(--maya-success-border);
}

.maya-toast--intent-success .maya-toast__title {
  color: var(--maya-success-text);
}

.maya-toast--intent-success .maya-toast__icon {
  color: var(--maya-success);
}

.maya-toast--intent-success .maya-toast__desc {
  color: var(--maya-success);
  opacity: 0.9;
}


.maya-toast--intent-warning {
  background: var(--maya-bg-surface);
  border-color: var(--maya-warning-border);
}

.maya-toast--intent-warning .maya-toast__title {
  color: var(--maya-warning-text);
}

.maya-toast--intent-warning .maya-toast__icon {
  color: var(--maya-warning);
}

.maya-toast--intent-warning .maya-toast__desc {
  color: var(--maya-warning);
  opacity: 0.9;
}


.maya-toast--intent-danger {
  background: var(--maya-bg-surface);
  border-color: var(--maya-danger-border);
}

.maya-toast--intent-danger .maya-toast__title {
  color: var(--maya-danger-text);
}

.maya-toast--intent-danger .maya-toast__icon {
  color: var(--maya-danger);
}

.maya-toast--intent-danger .maya-toast__desc {
  color: var(--maya-danger);
  opacity: 0.9;
}


.maya-toast--intent-info {
  background: var(--maya-bg-surface);
  border-color: var(--maya-info-border);
}

.maya-toast--intent-info .maya-toast__title {
  color: var(--maya-info-text);
}

.maya-toast--intent-info .maya-toast__icon {
  color: var(--maya-info);
}

.maya-toast--intent-info .maya-toast__desc {
  color: var(--maya-info);
  opacity: 0.9;
}
</style>
