<template>
  <button class="maya-btn" :class="[
    `maya-btn--${variant}`,
    `maya-btn--${size}`,
    intent !== 'default' ? `maya-btn--intent-${intent}` : '',
    { 'maya-btn--disabled': disabled }
  ]" :disabled="disabled" @click="$emit('click', $event)">
    <slot />
  </button>
</template>

<script setup>
defineProps({
  variant: {
    type: String,
    default: 'primary',
    validator: (v) => ['primary', 'secondary', 'ghost'].includes(v),
  },
  size: {
    type: String,
    default: 'md',
    validator: (v) => ['sm', 'md', 'lg'].includes(v),
  },
  intent: {
    type: String,
    default: 'default',
    validator: (v) => ['default', 'success', 'warning', 'danger', 'info'].includes(v),
  },
  disabled: {
    type: Boolean,
    default: false,
  },
})

defineEmits(['click'])
</script>

<style scoped>
.maya-btn {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  font-weight: 500;
  border: none;
  cursor: pointer;
  transition: all var(--maya-duration) var(--maya-ease);
  border-radius: var(--maya-radius-md);
  line-height: 1;
  white-space: nowrap;
  font-family: var(--maya-font-sans);
}

.maya-btn::after {
  content: '';
  position: absolute;
  inset: -6px;
  border-radius: var(--maya-radius-xl);
}

.maya-btn:active {
  transform: scale(0.96);
}

/* Sizes */
.maya-btn--sm {
  padding: 6px 12px;
  font-size: 0.75rem;
  border-radius: var(--maya-radius-sm);
}

.maya-btn--md {
  padding: 8px 16px;
  font-size: 0.8125rem;
}

.maya-btn--lg {
  padding: 10px 20px;
  font-size: 0.875rem;
}

/* ─── Primary ─── */
.maya-btn--primary {
  background: var(--maya-btn-primary-bg) var(--maya-btn-primary-gradient);
  color: var(--maya-btn-primary-text);
  box-shadow: var(--maya-btn-primary-shadow);
}

.maya-btn--primary:hover {
  background: var(--maya-btn-primary-bg-hover) var(--maya-btn-primary-gradient);
}

/* ─── Secondary ─── */
.maya-btn--secondary {
  background-color: var(--maya-btn-secondary-bg);
  color: var(--maya-btn-secondary-text);
  border: 1px solid var(--maya-border-strong);
  box-shadow: var(--maya-btn-secondary-shadow);
}

.maya-btn--secondary:hover {
  background-color: var(--maya-btn-secondary-bg-hover);
  border-color: var(--maya-border-hover);
}

/* ─── Ghost ─── */
.maya-btn--ghost {
  background-color: var(--maya-btn-ghost-bg);
  color: var(--maya-btn-ghost-text);
}

.maya-btn--ghost:hover {
  background-color: var(--maya-btn-ghost-bg-hover);
  color: var(--maya-btn-ghost-text-hover);
}

/* ═══ Intent variants (override color on primary/secondary) ══ */

/* Success */
.maya-btn--primary.maya-btn--intent-success {
  background: var(--maya-success);
  color: #fff;
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.15), 0 1px 2px rgba(0, 0, 0, 0.2);
}

.maya-btn--primary.maya-btn--intent-success:hover {
  background: var(--maya-success-hover);
}

.maya-btn--secondary.maya-btn--intent-success {
  background: var(--maya-success-muted);
  color: var(--maya-success-text);
  border-color: var(--maya-success-border);
}

.maya-btn--secondary.maya-btn--intent-success:hover {
  background: var(--maya-success-muted);
  filter: brightness(1.1);
}

.maya-btn--ghost.maya-btn--intent-success {
  color: var(--maya-success-text);
}

.maya-btn--ghost.maya-btn--intent-success:hover {
  background: var(--maya-success-muted);
}

/* Warning */
.maya-btn--primary.maya-btn--intent-warning {
  background: var(--maya-warning);
  color: #fff;
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.15), 0 1px 2px rgba(0, 0, 0, 0.2);
}

.maya-btn--primary.maya-btn--intent-warning:hover {
  background: var(--maya-warning-hover);
}

.maya-btn--secondary.maya-btn--intent-warning {
  background: var(--maya-warning-muted);
  color: var(--maya-warning-text);
  border-color: var(--maya-warning-border);
}

.maya-btn--secondary.maya-btn--intent-warning:hover {
  filter: brightness(1.1);
}

.maya-btn--ghost.maya-btn--intent-warning {
  color: var(--maya-warning-text);
}

.maya-btn--ghost.maya-btn--intent-warning:hover {
  background: var(--maya-warning-muted);
}

/* Danger */
.maya-btn--primary.maya-btn--intent-danger {
  background: var(--maya-danger);
  color: #fff;
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.15), 0 1px 2px rgba(0, 0, 0, 0.2);
}

.maya-btn--primary.maya-btn--intent-danger:hover {
  background: var(--maya-danger-hover);
}

.maya-btn--secondary.maya-btn--intent-danger {
  background: var(--maya-danger-muted);
  color: var(--maya-danger-text);
  border-color: var(--maya-danger-border);
}

.maya-btn--secondary.maya-btn--intent-danger:hover {
  filter: brightness(1.1);
}

.maya-btn--ghost.maya-btn--intent-danger {
  color: var(--maya-danger-text);
}

.maya-btn--ghost.maya-btn--intent-danger:hover {
  background: var(--maya-danger-muted);
}

/* Info */
.maya-btn--primary.maya-btn--intent-info {
  background: var(--maya-info);
  color: #fff;
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.15), 0 1px 2px rgba(0, 0, 0, 0.2);
}

.maya-btn--primary.maya-btn--intent-info:hover {
  background: var(--maya-info-hover);
}

.maya-btn--secondary.maya-btn--intent-info {
  background: var(--maya-info-muted);
  color: var(--maya-info-text);
  border-color: var(--maya-info-border);
}

.maya-btn--secondary.maya-btn--intent-info:hover {
  filter: brightness(1.1);
}

.maya-btn--ghost.maya-btn--intent-info {
  color: var(--maya-info-text);
}

.maya-btn--ghost.maya-btn--intent-info:hover {
  background: var(--maya-info-muted);
}

/* ─── Disabled ─── */
.maya-btn--disabled {
  opacity: 0.4;
  cursor: not-allowed;
  pointer-events: none;
}
</style>
