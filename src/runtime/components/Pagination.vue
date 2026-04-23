<template>
  <nav class="maya-pagination" aria-label="Pagination">
    <!-- Prev -->
    <button class="maya-pagination-btn" :disabled="current <= 1" @click="go(current - 1)" aria-label="Previous page">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="m15 18-6-6 6-6"/>
      </svg>
    </button>

    <!-- Pages -->
    <template v-for="page in displayedPages" :key="page">
      <span v-if="page === '...'" class="maya-pagination-ellipsis">…</span>
      <button
        v-else
        class="maya-pagination-btn maya-pagination-page"
        :class="{ 'is-active': page === current }"
        :aria-current="page === current ? 'page' : undefined"
        @click="go(page)"
      >
        {{ page }}
      </button>
    </template>

    <!-- Next -->
    <button class="maya-pagination-btn" :disabled="current >= totalPages" @click="go(current + 1)" aria-label="Next page">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="m9 18 6-6-6-6"/>
      </svg>
    </button>
  </nav>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  current: { type: Number, required: true },
  total: { type: Number, required: true },
  perPage: { type: Number, default: 10 },
  siblings: { type: Number, default: 1 },
})

const emit = defineEmits(['update:current'])

const totalPages = computed(() => Math.max(1, Math.ceil(props.total / props.perPage)))

const go = (page) => {
  if (page < 1 || page > totalPages.value) return
  emit('update:current', page)
}

const displayedPages = computed(() => {
  const c = props.current
  const total = totalPages.value
  const s = props.siblings
  const pages = []

  if (total <= 7 + s * 2) {
    return Array.from({ length: total }, (_, i) => i + 1)
  }

  const leftEdge = Math.max(2, c - s)
  const rightEdge = Math.min(total - 1, c + s)

  pages.push(1)
  if (leftEdge > 2) pages.push('...')
  for (let i = leftEdge; i <= rightEdge; i++) pages.push(i)
  if (rightEdge < total - 1) pages.push('...')
  pages.push(total)

  return pages
})
</script>

<style scoped>
.maya-pagination {
  display: inline-flex;
  align-items: center;
  gap: 4px;
}

.maya-pagination-btn {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 36px;
  height: 36px;
  padding: 0 8px;
  border: none;
  border-radius: var(--maya-radius-md);
  background: transparent;
  color: var(--maya-text-secondary);
  font-size: 0.8125rem;
  font-family: var(--maya-font-sans);
  font-weight: 500;
  cursor: pointer;
  transition: all 150ms var(--maya-ease-out);
}

.maya-pagination-btn::after {
  content: '';
  position: absolute;
  inset: -4px;
  border-radius: var(--maya-radius-lg);
}

.maya-pagination-btn:hover:not(:disabled) {
  background: var(--maya-bg-surface-elevated);
  color: var(--maya-text-primary);
  box-shadow: inset 0 0 0 1px var(--maya-border-subtle);
}

.maya-pagination-btn:active:not(:disabled) {
  transform: scale(0.94);
}

.maya-pagination-btn:disabled {
  opacity: 0.35;
  cursor: not-allowed;
}

.maya-pagination-btn.is-active {
  background: var(--maya-bg-surface);
  color: var(--maya-text-primary);
  box-shadow:
    inset 0 0 0 1px var(--maya-border-strong),
    0 1px 3px rgba(0, 0, 0, 0.25),
    0 4px 8px rgba(0, 0, 0, 0.15),
    inset 0 1px 0 rgba(255, 255, 255, 0.06);
}

.maya-pagination-ellipsis {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  color: var(--maya-text-tertiary);
  font-size: 0.8125rem;
  user-select: none;
}
</style>
