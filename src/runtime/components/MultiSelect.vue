<template>
  <div class="maya-select" ref="container" :class="{ disabled }">
    <button type="button" class="maya-select-trigger" :class="{ 'is-open': isOpen }" @click="toggle"
      :disabled="disabled" aria-haspopup="listbox" :aria-expanded="isOpen">
      <span class="maya-select-value" :class="{ 'has-value': modelValue && modelValue.length }">
        {{ displayValue }}
      </span>
      <svg class="maya-select-icon" viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor"
        stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <polyline points="6 9 12 15 18 9" />
      </svg>
    </button>

    <Transition name="maya-select-dropdown">
      <div v-show="isOpen" class="maya-select-popover" role="listbox" aria-multiselectable="true" tabindex="-1">
        <div v-if="normalizedOptions.length === 0" class="maya-select-empty">No options</div>

        <div v-for="option in normalizedOptions" :key="option.value" class="maya-select-option"
          :class="{ selected: isSelected(option), disabled: option.disabled }"
          @click="!option.disabled && toggleOption(option)" role="option" :aria-selected="isSelected(option)">

          <div class="maya-select-checkbox">
            <svg v-if="isSelected(option)" viewBox="0 0 24 24" width="12" height="12" fill="none"
              stroke="var(--maya-bg-surface)" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>

          <span class="maya-select-option-label">{{ option.label }}</span>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'

const props = defineProps({
  modelValue: { type: Array, default: () => [] },
  options: { type: Array, default: () => [] },
  placeholder: { type: String, default: 'Select options...' },
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
  if (!props.modelValue || props.modelValue.length === 0) return props.placeholder

  const labels = props.modelValue.map(val => {
    const opt = normalizedOptions.value.find(o => o.value === val)
    return opt ? opt.label : String(val)
  })

  if (labels.length <= 2) return labels.join(', ')
  return `${labels.length} items selected`
})

function toggle() {
  if (!props.disabled) isOpen.value = !isOpen.value
}

function isSelected(option) {
  return props.modelValue.includes(option.value)
}

function toggleOption(option) {
  const newValue = [...props.modelValue]
  const idx = newValue.indexOf(option.value)

  if (idx > -1) {
    newValue.splice(idx, 1)
  } else {
    newValue.push(option.value)
  }

  emit('update:modelValue', newValue)
  emit('change', newValue)
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

.maya-select-empty {
  padding: 12px;
  font-size: 0.875rem;
  color: var(--maya-text-muted);
  text-align: center;
}

.maya-select-option {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 8px;
  border-radius: var(--maya-radius-sm);
  font-size: 0.875rem;
  color: var(--maya-text-secondary);
  cursor: pointer;
  transition: all 150ms ease;
}

.maya-select-option:hover:not(.disabled) {
  background: var(--maya-bg-root);
}

.maya-select-option.selected {
  font-weight: 500;
  color: var(--maya-text-primary);
}

.maya-select-option.disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.maya-select-checkbox {
  width: 16px;
  height: 16px;
  border: 1px solid var(--maya-border);
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all var(--maya-duration) var(--maya-ease);
}

.maya-select-option.selected .maya-select-checkbox {
  background: var(--maya-accent);
  border-color: var(--maya-accent);
}

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
