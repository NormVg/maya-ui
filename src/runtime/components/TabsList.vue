<template>
  <div
    class="maya-tabs-list"
    :class="[`maya-tabs-list--${orientation}`, variant === 'pills' ? 'maya-tabs-list--pills' : '']"
    ref="listRef"
    role="tablist"
    :aria-orientation="orientation"
  >
    <div class="maya-tabs-indicator" :style="indicatorStyle" aria-hidden="true"></div>
    <slot />
  </div>
</template>

<script setup>
import { inject, ref, watch, onMounted, onUnmounted, nextTick } from 'vue'

const props = defineProps({
  orientation: {
    type: String,
    default: 'horizontal',
    validator: (v) => ['horizontal', 'vertical'].includes(v)
  },
  variant: {
    type: String,
    default: 'default',
    validator: (v) => ['default', 'pills'].includes(v)
  }
})

const activeTab = inject('mayaTabsActive')
const listRef = ref(null)
const indicatorStyle = ref({ opacity: 0 })
let resizeObserver = null

const updateIndicator = async () => {
  await nextTick()
  if (!listRef.value) return
  const activeEl = listRef.value.querySelector(`[data-tab-value="${activeTab.value}"]`)
  if (activeEl) {
    indicatorStyle.value = {
      width: `${activeEl.offsetWidth}px`,
      height: `${activeEl.offsetHeight}px`,
      transform: `translate(${activeEl.offsetLeft}px, ${activeEl.offsetTop}px)`,
      opacity: 1
    }
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

watch(activeTab, () => updateIndicator())
</script>

<style scoped>
.maya-tabs-list {
  position: relative;
  display: inline-flex;
  background: var(--maya-bg-surface-elevated);
  padding: 4px;
  border-radius: var(--maya-radius-lg);
  box-shadow: inset 0 0 0 1px var(--maya-border-subtle);
  overflow: hidden;
}

.maya-tabs-list--horizontal {
  align-items: center;
  flex-direction: row;
}

.maya-tabs-list--vertical {
  align-items: stretch;
  flex-direction: column;
}

/* Pills variant: borderless, transparent background, pill-shaped indicator */
.maya-tabs-list--pills {
  background: transparent;
  box-shadow: none;
  padding: 0;
  gap: 4px;
}

.maya-tabs-list--pills .maya-tabs-indicator {
  border-radius: var(--maya-radius-full);
  background: var(--maya-bg-surface-elevated);
  box-shadow:
    inset 0 0 0 1px var(--maya-border-subtle),
    0 1px 3px rgba(0, 0, 0, 0.15);
}

.maya-tabs-list--pills :deep(.maya-tabs-trigger) {
  border-radius: var(--maya-radius-full);
}

.maya-tabs-indicator {
  position: absolute;
  top: 0;
  left: 0;
  background: var(--maya-bg-surface);
  border-radius: calc(var(--maya-radius-lg) - 2px);
  box-shadow:
    0 1px 3px rgba(0, 0, 0, 0.3),
    0 4px 8px rgba(0, 0, 0, 0.2),
    inset 0 1px 0 rgba(255, 255, 255, 0.06),
    inset 0 0 0 1px rgba(255, 255, 255, 0.02);
  transition: all 400ms var(--maya-ease-bouncy);
  pointer-events: none;
  z-index: 1;
}
</style>
