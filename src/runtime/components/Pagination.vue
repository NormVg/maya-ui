<template>
  <nav class="maya-pagination" aria-label="Pagination" ref="listRef">
    <div class="maya-pagination-indicator" :style="indicatorStyle" aria-hidden="true"></div>
    <TransitionGroup name="maya-pagination-list" tag="div" class="maya-pagination-inner">
      <!-- Prev -->
      <button key="prev" class="maya-pagination-btn maya-pagination-arrow" :disabled="current <= 1" @click="go(current - 1)" aria-label="Previous page">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="m15 18-6-6 6-6"/>
        </svg>
      </button>

      <!-- Pages -->
      <template v-for="page in displayedPages" :key="page">
        <span v-if="String(page).startsWith('...')" class="maya-pagination-ellipsis maya-pagination-item">…</span>
        <button
          v-else
          class="maya-pagination-btn maya-pagination-page maya-pagination-item"
          :class="{ 'is-active': page === current }"
          :aria-current="page === current ? 'page' : undefined"
          :data-page="page"
          @click="go(page)"
        >
          {{ page }}
        </button>
      </template>

      <!-- Next -->
      <button key="next" class="maya-pagination-btn maya-pagination-arrow" :disabled="current >= totalPages" @click="go(current + 1)" aria-label="Next page">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="m9 18 6-6-6-6"/>
        </svg>
      </button>
    </TransitionGroup>
  </nav>
</template>

<script setup>
import { computed, ref, watch, onMounted, onUnmounted, nextTick } from 'vue'

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
  if (leftEdge > 2) pages.push('...-1')
  for (let i = leftEdge; i <= rightEdge; i++) pages.push(i)
  if (rightEdge < total - 1) pages.push('...-2')
  pages.push(total)

  return pages
})

const listRef = ref(null)
const indicatorStyle = ref({ opacity: 0, transform: 'scale(0.8)' })
let resizeObserver = null

const updateIndicator = async () => {
  await nextTick()
  if (!listRef.value) return
  // Target the specific button element that corresponds to the active page
  const activeEl = listRef.value.querySelector(`.maya-pagination-btn.is-active[data-page="${props.current}"]`)
  
  if (activeEl) {
    // We get offsetLeft/Top relatively to the parent `.maya-pagination` nav
    // The activeEl is inside `.maya-pagination-inner`, which itself is inside `.maya-pagination`
    // We can use offsetLeft if the parent is relatively positioned.
    // The parent nav `maya-pagination` has position: relative.
    const innerList = listRef.value.querySelector('.maya-pagination-inner')
    
    indicatorStyle.value = {
      width: `${activeEl.offsetWidth}px`,
      height: `${activeEl.offsetHeight}px`,
      transform: `translate(${activeEl.offsetLeft + innerList.offsetLeft}px, ${activeEl.offsetTop + innerList.offsetTop}px)`,
      opacity: 1
    }
  } else {
    indicatorStyle.value.opacity = 0
    indicatorStyle.value.transform = 'scale(0.8)'
  }
}

onMounted(() => {
  updateIndicator()
  if (window.ResizeObserver && listRef.value) {
    resizeObserver = new ResizeObserver(() => updateIndicator())
    resizeObserver.observe(listRef.value)
  }
})

onUnmounted(() => {
  if (resizeObserver) resizeObserver.disconnect()
})

watch([() => props.current, displayedPages], () => updateIndicator(), { deep: true })
</script>

<style scoped>
.maya-pagination {
  position: relative;
  display: inline-flex;
}

.maya-pagination-inner {
  position: relative;
  z-index: 2; /* Sits above indicator */
  display: inline-flex;
  align-items: center;
  gap: 4px;
}

.maya-pagination-indicator {
  position: absolute;
  top: 0;
  left: 0;
  background: var(--maya-bg-surface);
  border-radius: var(--maya-radius-md);
  box-shadow:
    inset 0 0 0 1px var(--maya-border-strong),
    0 1px 3px rgba(0, 0, 0, 0.25),
    0 4px 10px rgba(0, 0, 0, 0.15),
    inset 0 1px 0 rgba(255, 255, 255, 0.06);
  transition: all 400ms var(--maya-ease-bouncy);
  pointer-events: none;
  z-index: 1;
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
  /* Explicit per-property transitions for smooth states */
  transition:
    color 200ms var(--maya-ease-out),
    background 200ms var(--maya-ease-out),
    box-shadow 200ms var(--maya-ease-out),
    transform 400ms var(--maya-ease-bouncy),
    opacity 200ms ease;
}

/* Expanded hit area */
.maya-pagination-btn::after {
  content: '';
  position: absolute;
  inset: -5px;
  border-radius: var(--maya-radius-lg);
}

/* Hover pseudo background (ui-rules §5) */
.maya-pagination-btn::before {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: inherit;
  background: var(--maya-text-primary);
  opacity: 0;
  transform: scale(0.92);
  transition:
    opacity 200ms var(--maya-ease-out),
    transform 300ms var(--maya-ease-bouncy);
  pointer-events: none;
}

.maya-pagination-btn:hover:not(:disabled):not(.is-active)::before {
  opacity: 0.06;
  transform: scale(1);
}

.maya-pagination-btn:hover:not(:disabled) {
  color: var(--maya-text-primary);
}

/* Active press squash (ui-rules §4) */
.maya-pagination-btn:active:not(:disabled) {
  transform: scale(0.96);
}

.maya-pagination-btn:disabled {
  opacity: 0.3;
  cursor: not-allowed;
}

/* Active page — lifted card look handled mostly by indicator */
.maya-pagination-btn.is-active {
  color: var(--maya-text-primary);
  cursor: default;
}



/* Chevron arrows: nudge left/right on hover */
.maya-pagination-btn svg {
  transition: transform 0.15s cubic-bezier(0.19, 1, 0.22, 1);
}

.maya-pagination-btn:first-child:hover:not(:disabled) svg {
  transform: translateX(-2px);
}

.maya-pagination-btn:last-child:hover:not(:disabled) svg {
  transform: translateX(2px);
}

/* Ellipsis token */
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

/* List Transitions */
.maya-pagination-list-move,
.maya-pagination-list-enter-active,
.maya-pagination-list-leave-active {
  transition: all 400ms var(--maya-ease-bouncy);
}

.maya-pagination-list-enter-from,
.maya-pagination-list-leave-to {
  opacity: 0;
  transform: scale(0.8) translateY(4px);
}

.maya-pagination-list-leave-active {
  position: absolute;
  /* Leaving items stay where they were because of inline flow until they're absolute,
     but we let them fade out quickly. */
  transition: opacity 200ms ease, transform 200ms ease;
}

</style>
