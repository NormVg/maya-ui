<template>
  <div class="maya-accordion-item" :class="{ 'is-open': isOpen }">
    <button class="maya-accordion-trigger" @click="toggle" :aria-expanded="isOpen" type="button">
      <slot name="trigger" />
      <span class="maya-accordion-chevron" :class="{ 'rotate-180': isOpen }">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chevron-down"><path d="m6 9 6 6 6-6"/></svg>
      </span>
    </button>

    <div class="maya-accordion-grid-wrapper" :class="{ 'is-open': isOpen }">
      <div class="maya-accordion-content">
        <div class="maya-accordion-inner">
          <slot />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { inject, computed, getCurrentInstance } from 'vue'

const props = defineProps({
  value: {
    type: String,
    required: true
  }
})

const context = inject('mayaAccordionContext') as any

const isOpen = computed(() => {
  return context?.state.value.includes(props.value) || false
})

function toggle() {
  if (context?.toggleItem) {
    context.toggleItem(props.value)
  }
}
</script>

<style scoped>
.maya-accordion-item {
  border-bottom: 1px solid var(--maya-border);
}

.maya-accordion-item:last-child {
  border-bottom: none;
}

.maya-accordion-trigger {
  display: flex;
  flex: 1;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 0;
  background: transparent;
  border: none;
  font-weight: 500;
  color: var(--maya-text-primary);
  cursor: pointer;
  outline: none;
  transition: all 150ms var(--maya-ease-out, ease-out);
}

.maya-accordion-trigger:hover {
  text-decoration: underline;
}

.maya-accordion-chevron {
  color: var(--maya-text-muted);
  transition: transform 300ms var(--maya-ease-bouncy, cubic-bezier(0.34, 1.56, 0.64, 1));
}

.maya-accordion-chevron.rotate-180 {
  transform: rotate(180deg);
}

/*
  Modern CSS Grid trick to animate height to auto seamlessly
*/
.maya-accordion-grid-wrapper {
  display: grid;
  grid-template-rows: 0fr;
  transition: grid-template-rows 250ms var(--maya-ease-out, ease-out);
}

.maya-accordion-grid-wrapper.is-open {
  grid-template-rows: 1fr;
}

.maya-accordion-content {
  min-height: 0;
  overflow: hidden;
  transition: opacity 250ms var(--maya-ease-out, ease-out);
  opacity: 0;
}

.maya-accordion-grid-wrapper.is-open > .maya-accordion-content {
  opacity: 1;
}

.maya-accordion-inner {
  padding-bottom: 1rem;
  color: var(--maya-text-secondary);
}
</style>
