<template>
  <div class="maya-skeleton" :class="[`maya-skeleton--rounded-${rounded}`]" :style="{ width, height }"
    aria-hidden="true" />
</template>

<script setup>
defineProps({
  width: { type: String, default: '100%' },
  height: { type: String, default: '16px' },
  rounded: {
    type: String,
    default: 'md',
    validator: (v) => ['none', 'sm', 'md', 'lg', 'full'].includes(v),
  },
})
</script>

<style scoped>
.maya-skeleton {
  background: linear-gradient(90deg,
      var(--maya-skeleton-base) 25%,
      var(--maya-skeleton-shimmer) 50%,
      var(--maya-skeleton-base) 75%);
  background-size: 200% 100%;
  animation: maya-shimmer 1.5s linear infinite;
}

@keyframes maya-shimmer {
  from {
    background-position: 200% 0;
  }

  to {
    background-position: -200% 0;
  }
}

.maya-skeleton--rounded-none {
  border-radius: 0;
}

.maya-skeleton--rounded-sm {
  border-radius: var(--maya-radius-sm);
}

.maya-skeleton--rounded-md {
  border-radius: var(--maya-radius-md);
}

.maya-skeleton--rounded-lg {
  border-radius: var(--maya-radius-lg);
}

.maya-skeleton--rounded-full {
  border-radius: 9999px;
}
</style>
