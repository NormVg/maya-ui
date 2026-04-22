<template>
  <div class="maya-card" :class="[
    `maya-card--intent-${intent}`,
    { 'maya-card--bordered': bordered }
  ]">
    <div v-if="$slots.header" class="maya-card-header">
      <slot name="header" />
    </div>
    <div class="maya-card-body">
      <slot />
    </div>
    <div v-if="$slots.footer" class="maya-card-footer">
      <slot name="footer" />
    </div>
  </div>
</template>

<script setup>
defineProps({
  intent: {
    type: String,
    default: 'default',
    validator: (v) => ['default', 'success', 'warning', 'danger', 'info'].includes(v),
  },
  bordered: { type: Boolean, default: false },
})
</script>

<style scoped>
.maya-card {
  background: var(--maya-bg-raised);
  border: 1px solid var(--maya-border);
  border-radius: var(--maya-radius-lg);
  box-shadow: var(--maya-shadow-md);
  overflow: hidden;
  transition:
    background-color var(--maya-duration) var(--maya-ease),
    border-color var(--maya-duration) var(--maya-ease);
}

.maya-card-header {
  padding: 16px 20px 0;
  border-bottom: 1px solid var(--maya-border);
  padding-bottom: 12px;
}

.maya-card-body {
  padding: 16px 20px;
}

.maya-card-footer {
  padding: 12px 20px;
  border-top: 1px solid var(--maya-border);
  background: var(--maya-bg-surface);
}

/* ─── Intent left-edge accent ─── */
.maya-card--intent-success {
  border-left: 3px solid var(--maya-success-border);
  background: var(--maya-success-muted);
}

.maya-card--intent-warning {
  border-left: 3px solid var(--maya-warning-border);
  background: var(--maya-warning-muted);
}

.maya-card--intent-danger {
  border-left: 3px solid var(--maya-danger-border);
  background: var(--maya-danger-muted);
}

.maya-card--intent-info {
  border-left: 3px solid var(--maya-info-border);
  background: var(--maya-info-muted);
}
</style>
