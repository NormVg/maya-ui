<template>
  <Transition name="maya-banner">
    <div v-if="modelValue" class="maya-banner" :class="[`maya-banner--intent-${intent}`]" role="banner">
      <div class="maya-banner__inner">
        <slot name="icon">
          <div v-if="icon" class="maya-banner__icon">
            <component :is="icon" />
          </div>
        </slot>

        <div class="maya-banner__content">
          <slot />
        </div>

        <div class="maya-banner__actions">
          <slot name="actions" />

          <button v-if="dismissible" class="maya-banner__close" @click="emit('update:modelValue', false)"
            aria-label="Dismiss banner">
            <XIcon />
          </button>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup>
import { XIcon } from 'lucide-vue-next'

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: true
  },
  intent: {
    type: String,
    default: 'default',
    validator: (v) => ['default', 'success', 'warning', 'danger', 'info'].includes(v)
  },
  dismissible: {
    type: Boolean,
    default: true
  },
  icon: {
    type: [Object, Function, String],
    default: null
  }
})

const emit = defineEmits(['update:modelValue'])
</script>

<style scoped>
.maya-banner {
  width: 100%;
  position: relative;
  overflow: hidden;
  font-family: var(--maya-font-sans);

  background: var(--maya-bg-surface);
  border-bottom: 1px solid var(--maya-border-strong);
}

.maya-banner__inner {
  max-width: 1200px;
  margin: 0 auto;
  padding: 12px 16px;
  display: flex;
  align-items: center;
  gap: 12px;
  min-height: 48px;
}

.maya-banner__icon {
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--maya-text-primary);
}

.maya-banner__icon :deep(svg) {
  width: 18px;
  height: 18px;
  stroke-width: 2px;
}

.maya-banner__content {
  flex: 1;
  font-size: 0.875rem;
  color: var(--maya-text-primary);
  line-height: 1.5;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px;
}

.maya-banner__actions {
  flex-shrink: 0;
  display: flex;
  align-items: center;
  gap: 12px;
  margin-left: auto;
}

.maya-banner__close {
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
  position: relative;
}

/* Fitts's Law Hit Area */
.maya-banner__close::after {
  content: '';
  position: absolute;
  inset: -6px;
}

.maya-banner__close:hover {
  background-color: var(--maya-btn-ghost-bg-hover);
  color: var(--maya-text-primary);
}

.maya-banner__close :deep(svg) {
  width: 16px;
  height: 16px;
}

/* ─── Semantic Intents ─── */

.maya-banner--intent-success {
  background: var(--maya-success-muted);
  border-bottom-color: var(--maya-success-border);
}

.maya-banner--intent-success .maya-banner__content,
.maya-banner--intent-success .maya-banner__icon {
  color: var(--maya-success-text);
}

.maya-banner--intent-success .maya-banner__close {
  color: var(--maya-success);
}


.maya-banner--intent-warning {
  background: var(--maya-warning-muted);
  border-bottom-color: var(--maya-warning-border);
}

.maya-banner--intent-warning .maya-banner__content,
.maya-banner--intent-warning .maya-banner__icon {
  color: var(--maya-warning-text);
}

.maya-banner--intent-warning .maya-banner__close {
  color: var(--maya-warning);
}


.maya-banner--intent-danger {
  background: var(--maya-danger-muted);
  border-bottom-color: var(--maya-danger-border);
}

.maya-banner--intent-danger .maya-banner__content,
.maya-banner--intent-danger .maya-banner__icon {
  color: var(--maya-danger-text);
}

.maya-banner--intent-danger .maya-banner__close {
  color: var(--maya-danger);
}


.maya-banner--intent-info {
  background: var(--maya-info-muted);
  border-bottom-color: var(--maya-info-border);
}

.maya-banner--intent-info .maya-banner__content,
.maya-banner--intent-info .maya-banner__icon {
  color: var(--maya-info-text);
}

.maya-banner--intent-info .maya-banner__close {
  color: var(--maya-info);
}


/* Inner shadow for that soft 3D top-bar feel */
.maya-banner[class*="intent-"]:not(.maya-banner--intent-default) {
  box-shadow: inset 0 -1px 0 rgba(0, 0, 0, 0.04);
}

/* ─── Transition ─── */
/* Using max-height/padding for smooth slide/fold up.
   Because standard CSS can't transition to height: auto reliably without grid tricks,
   we'll use a grid trick or standard Vue transition hooking max-height.
   Actually, CSS Grid `1fr` trick is cleanest. Let's just do a transform + fade for simplicity. */

.maya-banner-enter-active,
.maya-banner-leave-active {
  transition: all 300ms var(--maya-ease-out);
  transform-origin: top;
}

.maya-banner-enter-from,
.maya-banner-leave-to {
  opacity: 0;
  transform: translateY(-10px) scaleY(0.95);
}
</style>
