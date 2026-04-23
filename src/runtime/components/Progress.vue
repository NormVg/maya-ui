<template>
  <div class="maya-progress" role="progressbar" :aria-valuenow="indeterminate ? undefined : value" :aria-valuemin="0"
    :aria-valuemax="max" :data-state="indeterminate ? 'indeterminate' : (value === max ? 'complete' : 'loading')">
    <div class="maya-progress__indicator" :class="[
      `maya-progress__indicator--intent-${intent}`,
      { 'maya-progress__indicator--indeterminate': indeterminate }
    ]" :style="!indeterminate ? { transform: `translateX(-${100 - (value / max) * 100}%)` } : {}" />
  </div>
</template>

<script setup>
const props = defineProps({
  value: {
    type: Number,
    default: 0
  },
  max: {
    type: Number,
    default: 100
  },
  indeterminate: {
    type: Boolean,
    default: false
  },
  intent: {
    type: String,
    default: 'default',
    validator: (v) => ['default', 'success', 'warning', 'danger', 'info'].includes(v)
  }
})
</script>

<style scoped>
.maya-progress {
  position: relative;
  overflow: hidden;
  border-radius: 9999px;
  background-color: var(--maya-bg-raised);
  height: 8px;
  width: 100%;

  /* Inner shadow to give the track depth */
  box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.05);
}

.maya-progress__indicator {
  width: 100%;
  height: 100%;
  background-color: var(--maya-text-primary);
  /* The linear timing function accurately portrays loading progress, unlike eases which lie about time */
  transition: transform 300ms linear;
  transform-origin: left;
  border-radius: 9999px;
}

/* ─── Indeterminate Animation ─── */
.maya-progress__indicator--indeterminate {
  width: 50%;
  transform-origin: left;
  animation: maya-progress-indeterminate 1.5s infinite ease-in-out;
}

@keyframes maya-progress-indeterminate {
  0% {
    transform: translateX(-100%) scaleX(0.2);
  }

  50% {
    transform: translateX(100%) scaleX(0.8);
  }

  100% {
    transform: translateX(200%) scaleX(0.2);
  }
}

/* ─── Intents ─── */
.maya-progress__indicator--intent-success {
  background-color: var(--maya-success);
}

.maya-progress__indicator--intent-warning {
  background-color: var(--maya-warning);
}

.maya-progress__indicator--intent-danger {
  background-color: var(--maya-danger);
}

.maya-progress__indicator--intent-info {
  background-color: var(--maya-info);
}
</style>
