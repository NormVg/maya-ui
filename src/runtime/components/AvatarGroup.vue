<template>
  <div class="maya-avatar-group">
    <MayaAvatar v-for="(avatar, i) in visibleAvatars" :key="i" v-bind="avatar" :size="size"
      class="maya-avatar-group-item" />
    <div v-if="overflow > 0" class="maya-avatar-group-item maya-avatar-overflow" :class="`maya-avatar--${size}`">
      +{{ overflow }}
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  avatars: { type: Array, default: () => [] },
  max: { type: Number, default: 4 },
  size: {
    type: String,
    default: 'md',
    validator: (v) => ['sm', 'md', 'lg', 'xl'].includes(v),
  },
})

const visibleAvatars = computed(() => props.avatars.slice(0, props.max))
const overflow = computed(() => Math.max(0, props.avatars.length - props.max))
</script>

<style scoped>
.maya-avatar-group {
  display: inline-flex;
  align-items: center;
}

.maya-avatar-group-item {
  margin-left: -8px;
  border: 2px solid var(--maya-bg-root);
  border-radius: 50%;
  transition: transform var(--maya-duration) var(--maya-ease);
}

.maya-avatar-group-item:first-child {
  margin-left: 0;
}

.maya-avatar-group-item:hover {
  transform: translateY(-2px);
  z-index: 1;
}

.maya-avatar-overflow {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: var(--maya-bg-raised);
  border: 1px solid var(--maya-border-strong);
  border-radius: 50%;
  font-family: var(--maya-font-sans);
  font-weight: 600;
  color: var(--maya-text-muted);
  box-shadow: var(--maya-shadow-sm);
}

/* Mirror avatar sizes */
.maya-avatar--sm {
  width: 24px;
  height: 24px;
  font-size: 0.5625rem;
}

.maya-avatar--md {
  width: 32px;
  height: 32px;
  font-size: 0.6875rem;
}

.maya-avatar--lg {
  width: 40px;
  height: 40px;
  font-size: 0.75rem;
}

.maya-avatar--xl {
  width: 52px;
  height: 52px;
  font-size: 0.875rem;
}
</style>
