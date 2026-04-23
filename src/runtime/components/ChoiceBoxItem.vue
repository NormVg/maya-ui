<template>
  <label class="maya-choice-box-item" :class="{ 'is-active': isActive, 'is-disabled': disabled }">
    <input type="radio" :value="value" :checked="isActive" :disabled="disabled" @change="handleChange"
      class="sr-only" />
    <div class="maya-choice-box-content">
      <div v-if="$slots.icon" class="maya-choice-box-icon">
        <slot name="icon" />
      </div>
      <div class="maya-choice-box-text">
        <span class="maya-choice-box-title">{{ title }}</span>
        <span v-if="description" class="maya-choice-box-desc">{{ description }}</span>
      </div>
      <div class="maya-choice-box-indicator">
        <div class="maya-choice-box-indicator-inner"></div>
      </div>
    </div>
  </label>
</template>

<script setup>
import { inject, computed } from 'vue'

const props = defineProps({
  value: { type: [String, Number], required: true },
  title: { type: String, required: true },
  description: { type: String, default: '' },
  disabled: { type: Boolean, default: false }
})

const getActive = inject('mayaChoiceActive')
const setActive = inject('mayaChoiceSetActive')
const isActive = computed(() => getActive() === props.value)

const handleChange = () => {
  if (!props.disabled) {
    setActive(props.value)
  }
}
</script>

<style scoped>
.maya-choice-box-item {
  position: relative;
  display: block;
  cursor: pointer;
  border-radius: var(--maya-radius-lg);
  background: var(--maya-bg-surface);
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.02),
    inset 0 0 0 1px var(--maya-border-subtle);
  transition: all 150ms var(--maya-ease-out);
  user-select: none;
}

.maya-choice-box-item.is-disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.maya-choice-box-item:hover:not(.is-disabled) {
  background: var(--maya-bg-surface-elevated);
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.04),
    inset 0 0 0 1px var(--maya-border-hover);
}

.maya-choice-box-item:active:not(.is-disabled) {
  transform: scale(0.98);
}

.maya-choice-box-item.is-active {
  background: rgba(99, 102, 241, 0.08);
  /* specific accent-aware tint */
  box-shadow:
    inset 0 0 0 1px var(--maya-accent),
    0 2px 8px rgba(99, 102, 241, 0.15);
  /* Accent depth glow */
}

.maya-choice-box-content {
  display: flex;
  align-items: flex-start;
  gap: 16px;
  padding: 16px;
}

.maya-choice-box-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  color: var(--maya-text-secondary);
}

.maya-choice-box-item.is-active .maya-choice-box-icon {
  color: var(--maya-accent);
}

.maya-choice-box-text {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.maya-choice-box-title {
  font-weight: 500;
  font-size: 0.875rem;
  color: var(--maya-text-primary);
  line-height: 1.2;
}

.maya-choice-box-desc {
  font-size: 0.8125rem;
  color: var(--maya-text-secondary);
  line-height: 1.4;
}

/* Form indicator dot */
.maya-choice-box-indicator {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: 1px solid var(--maya-border-strong);
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--maya-bg-root);
  transition: all 150ms ease;
  flex-shrink: 0;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.2) inset;
}

.maya-choice-box-item.is-active .maya-choice-box-indicator {
  border-color: var(--maya-accent);
  background: var(--maya-accent);
  box-shadow: none;
}

.maya-choice-box-indicator-inner {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: white;
  transform: scale(0);
  transition: transform 300ms var(--maya-ease-bouncy);
}

.maya-choice-box-item.is-active .maya-choice-box-indicator-inner {
  transform: scale(1);
}

.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}
</style>
