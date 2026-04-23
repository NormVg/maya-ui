<template>
  <div class="maya-alert" :class="[
    `maya-alert--intent-${intent}`,
    { 'maya-alert--layout-row': layout === 'row' }
  ]" role="alert">
    <div v-if="$slots.icon || icon" class="maya-alert__icon">
      <slot name="icon">
        <component :is="icon" v-if="icon" />
      </slot>
    </div>
    <div class="maya-alert__content">
      <div v-if="title || $slots.title" class="maya-alert__title">
        <slot name="title">{{ title }}</slot>
      </div>
      <div v-if="$slots.default" class="maya-alert__desc">
        <slot />
      </div>
    </div>
    <div v-if="$slots.action" class="maya-alert__action">
      <slot name="action" />
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  intent: {
    type: String,
    default: 'default',
    validator: (v) => ['default', 'success', 'warning', 'danger', 'info'].includes(v)
  },
  title: {
    type: String,
    default: ''
  },
  icon: {
    type: [Object, Function, String],
    default: null
  },
  layout: {
    type: String,
    default: 'column',
    validator: (v) => ['column', 'row'].includes(v)
  }
})
</script>

<style scoped>
.maya-alert {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 16px;
  border-radius: var(--maya-radius-lg);
  font-family: var(--maya-font-sans);
  position: relative;
  overflow: hidden;

  /* Soft 3D base styling mimicking the new button tokens but lighter */
  background: var(--maya-bg-surface);
  border: 1px solid var(--maya-border-strong);
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.04),
    /* Top inner highlight */
    inset 0 -2px 0 rgba(0, 0, 0, 0.06),
    /* Bottom inner shadow */
    0 1px 3px rgba(0, 0, 0, 0.05);
  /* Soft outer drop */

  transition: var(--maya-transition-standard);
}

/* Base text */
.maya-alert__title {
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--maya-text-primary);
  line-height: 1.4;
}

.maya-alert__desc {
  font-size: 0.875rem;
  color: var(--maya-text-secondary);
  line-height: 1.5;
  margin-top: 4px;
}

.maya-alert__icon {
  flex-shrink: 0;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--maya-text-primary);
}

.maya-alert__icon :deep(svg) {
  width: 18px;
  height: 18px;
  stroke-width: 2px;
}

.maya-alert__content {
  flex: 1;
  min-width: 0;
}

.maya-alert__action {
  flex-shrink: 0;
  margin-left: 12px;
}

/* Layout overrides */
.maya-alert--layout-row {
  align-items: center;
}

.maya-alert--layout-row .maya-alert__desc {
  margin-top: 0;
  display: inline;
  margin-left: 8px;
}

.maya-alert--layout-row .maya-alert__title {
  display: inline;
}

/* ─── Semantic Intents ─── */

.maya-alert--intent-success {
  background: var(--maya-success-muted);
  border-color: var(--maya-success-border);
}

.maya-alert--intent-success .maya-alert__title {
  color: var(--maya-success-text);
}

.maya-alert--intent-success .maya-alert__icon {
  color: var(--maya-success);
}

.maya-alert--intent-success .maya-alert__desc {
  color: var(--maya-success);
  opacity: 0.9;
}

.maya-alert--intent-warning {
  background: var(--maya-warning-muted);
  border-color: var(--maya-warning-border);
}

.maya-alert--intent-warning .maya-alert__title {
  color: var(--maya-warning-text);
}

.maya-alert--intent-warning .maya-alert__icon {
  color: var(--maya-warning);
}

.maya-alert--intent-warning .maya-alert__desc {
  color: var(--maya-warning);
  opacity: 0.9;
}

.maya-alert--intent-danger {
  background: var(--maya-danger-muted);
  border-color: var(--maya-danger-border);
}

.maya-alert--intent-danger .maya-alert__title {
  color: var(--maya-danger-text);
}

.maya-alert--intent-danger .maya-alert__icon {
  color: var(--maya-danger);
}

.maya-alert--intent-danger .maya-alert__desc {
  color: var(--maya-danger);
  opacity: 0.9;
}

.maya-alert--intent-info {
  background: var(--maya-info-muted);
  border-color: var(--maya-info-border);
}

.maya-alert--intent-info .maya-alert__title {
  color: var(--maya-info-text);
}

.maya-alert--intent-info .maya-alert__icon {
  color: var(--maya-info);
}

.maya-alert--intent-info .maya-alert__desc {
  color: var(--maya-info);
  opacity: 0.9;
}

/* Subtle gradient background on intent variants to emphasize 3d depth */
.maya-alert[class*="intent-"]:not(.maya-alert--intent-default)::before {
  content: '';
  position: absolute;
  inset: 0;
  pointer-events: none;
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.03) 0%, rgba(255, 255, 255, 0) 100%);
  border-radius: inherit;
  z-index: 0;
}

.maya-alert__content,
.maya-alert__icon,
.maya-alert__action {
  position: relative;
  z-index: 1;
}

/* Light mode shadow adjustments */
[data-theme="light"] .maya-alert {
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 1),
    inset 0 -2px 0 rgba(0, 0, 0, 0.04),
    0 2px 4px rgba(0, 0, 0, 0.04);
}
</style>
