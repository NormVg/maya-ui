<template>
  <div class="maya-loading-dots" :class="`maya-loading-dots--${size}`" aria-label="Loading">
    <span class="maya-dot" />
    <span class="maya-dot" />
    <span class="maya-dot" />
  </div>
</template>

<script setup>
defineProps({
  size: {
    type: String,
    default: 'md',
    validator: (v) => ['sm', 'md', 'lg'].includes(v),
  },
})
</script>

<style scoped>
.maya-loading-dots {
  display: inline-flex;
  align-items: center;
}

.maya-loading-dots--sm {
  gap: 4px;
}

.maya-loading-dots--md {
  gap: 5px;
}

.maya-loading-dots--lg {
  gap: 6px;
}

.maya-dot {
  display: block;
  border-radius: 50%;
  background: var(--maya-text-muted);
  animation: maya-bounce 1.2s ease-in-out infinite;
}

.maya-loading-dots--sm .maya-dot {
  width: 4px;
  height: 4px;
}

.maya-loading-dots--md .maya-dot {
  width: 5px;
  height: 5px;
}

.maya-loading-dots--lg .maya-dot {
  width: 7px;
  height: 7px;
}

.maya-dot:nth-child(1) {
  animation-delay: 0s;
}

.maya-dot:nth-child(2) {
  animation-delay: 0.2s;
}

.maya-dot:nth-child(3) {
  animation-delay: 0.4s;
}

@keyframes maya-bounce {

  0%,
  80%,
  100% {
    transform: translateY(0);
    opacity: 0.4;
  }

  40% {
    transform: translateY(-50%);
    opacity: 1;
  }
}
</style>
