<template>
  <svg class="maya-spinner" :class="[`maya-spinner--${size}`, `maya-spinner--intent-${intent}`]" viewBox="0 0 24 24"
    fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Loading">
    <circle cx="12" cy="12" r="9" stroke-width="2" class="maya-spinner-track" />
    <path d="M12 3a9 9 0 0 1 9 9" stroke-width="2" stroke-linecap="round" class="maya-spinner-arc" />
  </svg>
</template>

<script setup>
defineProps({
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
})
</script>

<style scoped>
.maya-spinner {
  display: inline-block;
  animation: maya-spin 700ms linear infinite;
  flex-shrink: 0;
}

@keyframes maya-spin {
  to {
    transform: rotate(360deg);
  }
}

/* Sizes */
.maya-spinner--sm {
  width: 14px;
  height: 14px;
}

.maya-spinner--md {
  width: 20px;
  height: 20px;
}

.maya-spinner--lg {
  width: 28px;
  height: 28px;
}

/* Track (background ring) */
.maya-spinner-track {
  stroke: var(--maya-border-strong);
}

/* Arc (animated segment) */
.maya-spinner-arc {
  stroke: var(--maya-text-primary);
  transition: stroke var(--maya-duration) var(--maya-ease);
}

.maya-spinner--intent-success .maya-spinner-arc {
  stroke: var(--maya-success);
}

.maya-spinner--intent-warning .maya-spinner-arc {
  stroke: var(--maya-warning);
}

.maya-spinner--intent-danger .maya-spinner-arc {
  stroke: var(--maya-danger);
}

.maya-spinner--intent-info .maya-spinner-arc {
  stroke: var(--maya-info);
}
</style>
