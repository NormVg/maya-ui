<template>
  <div class="maya-avatar" :class="`maya-avatar--${size}`">
    <img v-if="src" :src="src" :alt="alt" class="maya-avatar-img" @error="imgError = true" />
    <span v-if="!src || imgError" class="maya-avatar-initials">
      {{ computedInitials }}
    </span>
    <span v-if="status" class="maya-avatar-status" :class="`maya-avatar-status--${status}`" />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  src: { type: String, default: '' },
  alt: { type: String, default: '' },
  initials: { type: String, default: '' },
  size: {
    type: String,
    default: 'md',
    validator: (v) => ['sm', 'md', 'lg', 'xl'].includes(v),
  },
  status: {
    type: String,
    default: '',
    validator: (v) => ['', 'online', 'away', 'busy', 'offline'].includes(v),
  },
})

const imgError = ref(false)

const computedInitials = computed(() => {
  if (props.initials) return props.initials.slice(0, 2).toUpperCase()
  if (props.alt) {
    return props.alt.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase()
  }
  return '?'
})
</script>

<style scoped>
.maya-avatar {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  overflow: visible;
  flex-shrink: 0;
  background: var(--maya-bg-raised);
  border: 1px solid var(--maya-border-strong);
  font-family: var(--maya-font-sans);
  font-weight: 600;
  box-shadow: var(--maya-shadow-sm);
  transition: transform var(--maya-duration-bouncy) var(--maya-ease-bouncy);
}

/* Sizes */
.maya-avatar--sm {
  width: 24px;
  height: 24px;
  font-size: 0.625rem;
}

.maya-avatar--md {
  width: 32px;
  height: 32px;
  font-size: 0.75rem;
}

.maya-avatar--lg {
  width: 40px;
  height: 40px;
  font-size: 0.875rem;
}

.maya-avatar--xl {
  width: 52px;
  height: 52px;
  font-size: 1rem;
}

.maya-avatar-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 50%;
}

.maya-avatar-initials {
  color: var(--maya-text-secondary);
  user-select: none;
  letter-spacing: 0.02em;
}

/* Status dot */
.maya-avatar-status {
  position: absolute;
  bottom: 0;
  right: 0;
  border-radius: 50%;
  border: 2px solid var(--maya-bg-root);
  transition: background-color var(--maya-duration) var(--maya-ease);
}

.maya-avatar--sm .maya-avatar-status {
  width: 7px;
  height: 7px;
}

.maya-avatar--md .maya-avatar-status {
  width: 9px;
  height: 9px;
}

.maya-avatar--lg .maya-avatar-status {
  width: 11px;
  height: 11px;
}

.maya-avatar--xl .maya-avatar-status {
  width: 13px;
  height: 13px;
}

.maya-avatar-status--online {
  background: var(--maya-success);
}

.maya-avatar-status--away {
  background: var(--maya-warning);
}

.maya-avatar-status--busy {
  background: var(--maya-danger);
}

.maya-avatar-status--offline {
  background: var(--maya-text-muted);
}
</style>
