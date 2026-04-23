<template>
  <div class="maya-status-dot" :class="[
    `maya-status-dot--intent-${intent}`,
    { 'maya-status-dot--ping': ping }
  ]" role="status" aria-label="Status Indicator">
    <div class="maya-status-dot__core" />
    <div v-if="ping" class="maya-status-dot__wave" />
  </div>
</template>

<script setup>
const props = defineProps({
  intent: {
    type: String,
    default: 'default',
    validator: (v) => ['default', 'success', 'warning', 'danger', 'info'].includes(v)
  },
  ping: {
    type: Boolean,
    default: true
  }
})
</script>

<style scoped>
.maya-status-dot {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 10px;
  height: 10px;
}

.maya-status-dot__core {
  width: 10px;
  height: 10px;
  border-radius: 9999px;
  background-color: var(--status-color, var(--maya-text-muted));
  position: relative;
  z-index: 2;
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.2), 0 1px 1px rgba(0, 0, 0, 0.1);
}

.maya-status-dot__wave {
  position: absolute;
  inset: -4px;
  /* Extends 4px outwards all around */
  border-radius: 9999px;
  background-color: var(--status-color, var(--maya-text-muted));
  z-index: 1;
  opacity: 0.4;
  animation: maya-status-ping 2s cubic-bezier(0, 0, 0.2, 1) infinite;
}

/* Intents */
.maya-status-dot--intent-success {
  --status-color: var(--maya-success);
}

.maya-status-dot--intent-warning {
  --status-color: var(--maya-warning);
}

.maya-status-dot--intent-danger {
  --status-color: var(--maya-danger);
}

.maya-status-dot--intent-info {
  --status-color: var(--maya-info);
}

.maya-status-dot--intent-default {
  --status-color: var(--maya-text-muted);
}

/* Animation Keyframes */
@keyframes maya-status-ping {
  0% {
    transform: scale(0.5);
    opacity: 0.6;
  }

  70%,
  100% {
    transform: scale(2);
    opacity: 0;
  }
}
</style>
