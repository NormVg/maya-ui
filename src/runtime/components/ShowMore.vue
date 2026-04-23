<template>
  <div class="maya-show-more">
    <div
      class="maya-show-more-content"
      :style="{ maxHeight: isExpanded ? contentHeight : `${collapsedHeight}px`, '--content-height': contentHeight }"
      ref="contentWrap"
    >
      <div ref="innerContent">
        <slot />
      </div>
    </div>

    <!-- Fade gradient mask when collapsed -->
    <div v-if="!isExpanded && isTruncated" class="maya-show-more-fade"></div>

    <button
      v-if="isTruncated || isExpanded"
      class="maya-show-more-btn"
      @click="toggle"
    >
      <Transition name="maya-icon-swap" mode="out-in">
        <span :key="isExpanded ? 'less' : 'more'">
          {{ isExpanded ? 'Show less' : 'Show more' }}
        </span>
      </Transition>
      <svg
        width="14" height="14"
        viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
        stroke-linecap="round" stroke-linejoin="round"
        :style="{ transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 300ms var(--maya-ease-bouncy)' }"
      >
        <path d="m6 9 6 6 6-6"/>
      </svg>
    </button>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'

const props = defineProps({
  collapsedHeight: { type: Number, default: 80 },
})

const contentWrap = ref(null)
const innerContent = ref(null)
const isExpanded = ref(false)
const naturalHeight = ref(0)

const contentHeight = computed(() => isExpanded.value ? `${naturalHeight.value}px` : `${props.collapsedHeight}px`)
const isTruncated = computed(() => naturalHeight.value > props.collapsedHeight)

onMounted(() => {
  if (innerContent.value) {
    naturalHeight.value = innerContent.value.scrollHeight
  }
})

const toggle = () => {
  isExpanded.value = !isExpanded.value
}
</script>

<style scoped>
.maya-show-more {
  position: relative;
}

.maya-show-more-content {
  overflow: hidden;
  transition: max-height 400ms var(--maya-ease-bouncy);
}

.maya-show-more-fade {
  position: absolute;
  bottom: 2.25rem; /* sits just above the button */
  left: 0;
  right: 0;
  height: 60px;
  background: linear-gradient(to bottom, transparent, var(--maya-bg-root, #09090b));
  pointer-events: none;
}

.maya-show-more-btn {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  margin-top: 8px;
  background: transparent;
  border: none;
  cursor: pointer;
  font-size: 0.8125rem;
  font-family: var(--maya-font-sans);
  font-weight: 500;
  color: var(--maya-accent);
  padding: 4px 0;
  transition: opacity 150ms ease;
}

.maya-show-more-btn:hover {
  opacity: 0.75;
}

.maya-show-more-btn:active {
  opacity: 0.6;
}

/* Swap animation for label text */
.maya-icon-swap-enter-active { transition: all 200ms var(--maya-ease-bouncy); }
.maya-icon-swap-leave-active { transition: all 100ms ease-in; }
.maya-icon-swap-enter-from { opacity: 0; transform: scale(0.85); }
.maya-icon-swap-leave-to { opacity: 0; transform: scale(0.85); }
</style>
