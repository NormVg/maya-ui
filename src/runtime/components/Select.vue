<template>
  <div class="maya-select" ref="container" :class="{ disabled }">
    <button type="button" class="maya-select-trigger" :class="{ 'is-open': isOpen }" @click="toggle"
      :disabled="disabled" aria-haspopup="listbox" :aria-expanded="isOpen">
      <span class="maya-select-value" :class="{ 'has-value': displayValue }">
        {{ displayValue || placeholder }}
      </span>
      <svg class="maya-select-icon" viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor"
        stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <polyline points="6 9 12 15 18 9" />
      </svg>
    </button>

    <Transition name="maya-select-dropdown">
      <div v-show="isOpen" class="maya-select-popover" role="listbox" tabindex="-1">
        <div v-for="option in normalizedOptions" :key="option.value" class="maya-select-option"
          :class="{ selected: modelValue === option.value, disabled: option.disabled }"
          @click="!option.disabled && selectOption(option)" role="option" :aria-selected="modelValue === option.value">
          <span class="maya-select-option-label">{{ option.label }}</span>
          <svg v-if="modelValue === option.value" class="maya-select-check" viewBox="0 0 24 24" width="14" height="14"
            fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'

const props = defineProps({
  modelValue: { type: [String, Number], default: '' },
  options: { type: Array, default: () => [] },
  placeholder: { type: String, default: 'Select an option' },
  disabled: { type: Boolean, default: false },
})

const emit = defineEmits(['update:modelValue', 'change'])

const isOpen = ref(false)
const container = ref(null)

const normalizedOptions = computed(() => {
  return props.options.map(opt => {
    if (typeof opt === 'string' || typeof opt === 'number') {
      return { value: opt, label: String(opt), disabled: false }
    }
    return { ...opt, disabled: !!opt.disabled }
  })
})

const displayValue = computed(() => {
  const selected = normalizedOptions.value.find(opt => opt.value === props.modelValue)
  return selected ? selected.label : ''
})

function toggle() {
  if (!props.disabled) isOpen.value = !isOpen.value
}

function selectOption(option) {
  emit('update:modelValue', option.value)
  emit('change', option.value)
  isOpen.value = false
}

function closeDropdown(e) {
  if (isOpen.value && container.value && !container.value.contains(e.target)) {
    isOpen.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', closeDropdown)
})

onUnmounted(() => {
  document.removeEventListener('click', closeDropdown)
})
</script>

<style scoped>
.maya-select {
  position: relative;
  width: 100%;
}

.maya-select.disabled {
  opacity: 0.5;
}

.maya-select-trigger {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: var(--maya-bg-surface);
  border: 1px solid var(--maya-border);
  border-radius: var(--maya-radius-md);
  color: var(--maya-text-primary);
  font-family: var(--maya-font-sans);
  font-size: 0.875rem;
  padding: 8px 12px;
  height: 36px;
  outline: none;
  cursor: pointer;
  transition: all var(--maya-duration) var(--maya-ease);
}

.maya-select-trigger:focus-visible,
.maya-select-trigger.is-open {
  border-color: var(--maya-accent);
  box-shadow: 0 0 0 1px var(--maya-accent);
}

.maya-select.disabled .maya-select-trigger {
  background: var(--maya-bg-root);
  cursor: not-allowed;
}

.maya-select-value {
  color: var(--maya-text-muted);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.maya-select-value.has-value {
  color: var(--maya-text-primary);
}

.maya-select-icon {
  color: var(--maya-text-muted);
  transition: transform var(--maya-duration) var(--maya-ease);
}

.maya-select-trigger.is-open .maya-select-icon {
  transform: rotate(180deg);
}

.maya-select-popover {
  position: absolute;
  top: calc(100% + 4px);
  left: 0;
  width: 100%;
  max-height: 240px;
  overflow-y: auto;
  background: var(--maya-bg-surface);
  border: 1px solid var(--maya-border);
  border-radius: var(--maya-radius-md);
  padding: 4px;
  z-index: 50;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1), 0 0 0 1px rgba(255, 255, 255, 0.05);
}

.maya-select-option {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px;
  border-radius: var(--maya-radius-sm);
  font-size: 0.875rem;
  color: var(--maya-text-secondary);
  cursor: pointer;
  transition: all var(--maya-duration) var(--maya-ease);
}

.maya-select-option:hover:not(.disabled) {
  background: var(--maya-bg-root);
  color: var(--maya-text-primary);
}

.maya-select-option.selected {
  background: var(--maya-bg-root);
  color: var(--maya-text-primary);
  font-weight: 500;
}

.maya-select-option.disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.maya-select-check {
  color: var(--maya-accent);
}

/* Dropdown Animation - ease curve, not spring */
.maya-select-dropdown-enter-active {
  transition: opacity 200ms cubic-bezier(0.19, 1, 0.22, 1), transform 200ms cubic-bezier(0.19, 1, 0.22, 1);
}

.maya-select-dropdown-leave-active {
  transition: opacity 150ms ease;
}

.maya-select-dropdown-enter-from {
  opacity: 0;
  transform: translateY(-4px) scale(0.98);
}

.maya-select-dropdown-leave-to {
  opacity: 0;
}
</style>
