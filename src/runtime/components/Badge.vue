<template>
  <span class="maya-badge" :class="[
    `maya-badge--${variant}`,
    `maya-badge--intent-${intent}`,
    `maya-badge--${size}`,
  ]">
    <span v-if="dot" class="maya-badge-dot" />
    <slot />
  </span>
</template>

<script setup>
defineProps({
  intent: {
    type: String,
    default: 'default',
    validator: (v) => ['default', 'success', 'warning', 'danger', 'info'].includes(v),
  },
  variant: {
    type: String,
    default: 'soft',
    validator: (v) => ['solid', 'soft', 'outline'].includes(v),
  },
  size: {
    type: String,
    default: 'md',
    validator: (v) => ['sm', 'md'].includes(v),
  },
  dot: { type: Boolean, default: false },
})
</script>

<style scoped>
.maya-badge {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  font-family: var(--maya-font-sans);
  font-weight: 500;
  border-radius: var(--maya-radius-sm);
  border: 1px solid transparent;
  white-space: nowrap;
  transition: all var(--maya-duration) var(--maya-ease);
}

.maya-badge--sm {
  padding: 2px 8px;
  font-size: 0.6875rem;
}

.maya-badge--md {
  padding: 3px 10px;
  font-size: 0.75rem;
}

.maya-badge-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  flex-shrink: 0;
}

/* ─── Default (mono) ─── */
.maya-badge--soft.maya-badge--intent-default {
  background: var(--maya-bg-raised);
  color: var(--maya-text-secondary);
  border-color: var(--maya-border);
}

.maya-badge--soft.maya-badge--intent-default .maya-badge-dot {
  background: var(--maya-text-muted);
}

.maya-badge--solid.maya-badge--intent-default {
  background: var(--maya-text-primary);
  color: var(--maya-bg-root);
  border-color: transparent;
}

.maya-badge--outline.maya-badge--intent-default {
  background: transparent;
  color: var(--maya-text-secondary);
  border-color: var(--maya-border-strong);
}

/* ─── Success ─── */
.maya-badge--soft.maya-badge--intent-success {
  background: var(--maya-success-muted);
  color: var(--maya-success-text);
  border-color: var(--maya-success-border);
}

.maya-badge--soft.maya-badge--intent-success .maya-badge-dot {
  background: var(--maya-success);
}

.maya-badge--solid.maya-badge--intent-success {
  background: var(--maya-success);
  color: #fff;
}

.maya-badge--outline.maya-badge--intent-success {
  background: transparent;
  color: var(--maya-success-text);
  border-color: var(--maya-success-border);
}

/* ─── Warning ─── */
.maya-badge--soft.maya-badge--intent-warning {
  background: var(--maya-warning-muted);
  color: var(--maya-warning-text);
  border-color: var(--maya-warning-border);
}

.maya-badge--soft.maya-badge--intent-warning .maya-badge-dot {
  background: var(--maya-warning);
}

.maya-badge--solid.maya-badge--intent-warning {
  background: var(--maya-warning);
  color: #fff;
}

.maya-badge--outline.maya-badge--intent-warning {
  background: transparent;
  color: var(--maya-warning-text);
  border-color: var(--maya-warning-border);
}

/* ─── Danger ─── */
.maya-badge--soft.maya-badge--intent-danger {
  background: var(--maya-danger-muted);
  color: var(--maya-danger-text);
  border-color: var(--maya-danger-border);
}

.maya-badge--soft.maya-badge--intent-danger .maya-badge-dot {
  background: var(--maya-danger);
}

.maya-badge--solid.maya-badge--intent-danger {
  background: var(--maya-danger);
  color: #fff;
}

.maya-badge--outline.maya-badge--intent-danger {
  background: transparent;
  color: var(--maya-danger-text);
  border-color: var(--maya-danger-border);
}

/* ─── Info ─── */
.maya-badge--soft.maya-badge--intent-info {
  background: var(--maya-info-muted);
  color: var(--maya-info-text);
  border-color: var(--maya-info-border);
}

.maya-badge--soft.maya-badge--intent-info .maya-badge-dot {
  background: var(--maya-info);
}

.maya-badge--solid.maya-badge--intent-info {
  background: var(--maya-info);
  color: #fff;
}

.maya-badge--outline.maya-badge--intent-info {
  background: transparent;
  color: var(--maya-info-text);
  border-color: var(--maya-info-border);
}
</style>
