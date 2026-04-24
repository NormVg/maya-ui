<template>
  <button class="maya-tabs-trigger"
    :class="{ 'is-active': isActive, 'maya-tabs-trigger--vertical': orientation === 'vertical' }"
    :data-state="isActive ? 'active' : 'inactive'" :data-tab-value="value" role="tab" :aria-selected="isActive"
    @click="handleClick">
    <slot />
  </button>
</template>

<script setup>
import { inject, computed } from 'vue'

const props = defineProps({
  value: {
    type: String,
    required: true,
  },
})

const activeTab = inject('mayaTabsActive')
const setActive = inject('mayaTabsSetActive')
const orientation = inject('mayaTabsOrientation', 'horizontal')

const isActive = computed(() => activeTab.value === props.value)

const handleClick = () => {
  setActive(props.value)
}
</script>

<style scoped>
.maya-tabs-trigger {
  position: relative;
  z-index: 2;
  /* Sits above the absolute bounding indicator */
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  padding: 8px 16px;
  font-size: 0.8125rem;
  font-family: var(--maya-font-sans);
  font-weight: 500;
  color: var(--maya-text-secondary);
  border: none;
  background: transparent;
  cursor: pointer;
  border-radius: calc(var(--maya-radius-lg) - 2px);
  transition: color 200ms var(--maya-ease-out);
  white-space: nowrap;
}

.maya-tabs-trigger--vertical {
  justify-content: flex-start;
  text-align: left;
  width: 100%;
}

.maya-tabs-trigger.is-active {
  color: var(--maya-text-primary);
}

.maya-tabs-trigger:-moz-focusring {
  outline: auto;
}

.maya-tabs-trigger:focus-visible {
  outline: 2px solid var(--maya-accent);
  outline-offset: -2px;
}

.maya-tabs-trigger:hover:not(.is-active) {
  color: var(--maya-text-primary);
}
</style>
