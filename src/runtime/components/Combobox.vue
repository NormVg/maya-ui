<template>
  <div class="maya-combobox" ref="container" :class="{ disabled }">
    <div class="maya-combobox-trigger" :class="{ 'is-open': isOpen }">
      <input type="text" class="maya-combobox-input" :value="searchQuery" :placeholder="placeholder"
        :disabled="disabled" @input="onSearch" @focus="openDropdown" @keydown.down.prevent="navigateOption(1)"
        @keydown.up.prevent="navigateOption(-1)" @keydown.enter.prevent="selectHighlighted"
        @keydown.esc="isOpen = false" autocomplete="off" role="combobox" aria-autocomplete="list"
        :aria-expanded="isOpen" />

      <svg class="maya-combobox-icon" viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor"
        stroke-width="2" stroke-linecap="round" stroke-linejoin="round" @click="toggle">
        <polyline points="6 9 12 15 18 9" />
      </svg>
    </div>

    <Transition name="maya-combobox-dropdown">
      <div v-show="isOpen" class="maya-combobox-popover" role="listbox" tabindex="-1">
        <div v-if="filteredOptions.length === 0" class="maya-combobox-empty">
          <slot name="empty">No results found.</slot>
        </div>

        <div v-for="(option, index) in filteredOptions" :key="option.value" class="maya-combobox-option"
          :class="{ selected: modelValue === option.value, disabled: option.disabled, highlighted: activeIndex === index }"
          @click="!option.disabled && selectOption(option)" @mouseenter="activeIndex = index" role="option"
          :aria-selected="modelValue === option.value">
          <span class="maya-combobox-option-label">{{ option.label }}</span>
          <svg v-if="modelValue === option.value" class="maya-combobox-check" viewBox="0 0 24 24" width="14" height="14"
            fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted, onUnmounted } from 'vue'

const props = defineProps({
  modelValue: { type: [String, Number], default: '' },
  options: { type: Array, default: () => [] },
  placeholder: { type: String, default: 'Search...' },
  disabled: { type: Boolean, default: false },
})

const emit = defineEmits(['update:modelValue', 'change'])

const isOpen = ref(false)
const container = ref(null)
const searchQuery = ref('')
const activeIndex = ref(-1)

const normalizedOptions = computed(() => {
  return props.options.map(opt => {
    if (typeof opt === 'string' || typeof opt === 'number') {
      return { value: opt, label: String(opt), disabled: false }
    }
    return { ...opt, disabled: !!opt.disabled }
  })
})

const filteredOptions = computed(() => {
  if (!searchQuery.value) return normalizedOptions.value
  const q = searchQuery.value.toLowerCase()
  return normalizedOptions.value.filter(opt => opt.label.toLowerCase().includes(q))
})

watch(() => props.modelValue, (val) => {
  const selected = normalizedOptions.value.find(opt => opt.value === val)
  if (selected) {
    searchQuery.value = selected.label
  } else {
    searchQuery.value = ''
  }
}, { immediate: true })

watch(isOpen, (val) => {
  if (val) {
    // If we open and have a value, just pre-select it in the list but don't clear query.
    // If the user types, it filters.
    if (props.modelValue) {
      activeIndex.value = filteredOptions.value.findIndex(o => o.value === props.modelValue)
    } else {
      activeIndex.value = -1
    }
  } else {
    // Revert search query to selected item label on close to prevent orphan text
    const selected = normalizedOptions.value.find(opt => opt.value === props.modelValue)
    searchQuery.value = selected ? selected.label : ''
  }
})

function onSearch(e) {
  searchQuery.value = e.target.value
  isOpen.value = true
  activeIndex.value = -1 // Reset highlight on new search
}

function openDropdown() {
  if (!props.disabled) isOpen.value = true
}

function toggle() {
  if (!props.disabled) isOpen.value = !isOpen.value
}

function selectOption(option) {
  searchQuery.value = option.label
  emit('update:modelValue', option.value)
  emit('change', option.value)
  isOpen.value = false
}

function navigateOption(direction) {
  if (!isOpen.value) {
    isOpen.value = true
    return
  }

  if (filteredOptions.value.length === 0) return

  let nextIndex = activeIndex.value + direction
  if (nextIndex < 0) nextIndex = filteredOptions.value.length - 1
  if (nextIndex >= filteredOptions.value.length) nextIndex = 0

  activeIndex.value = nextIndex

  // Note: Scrolling into view would be added here in a robust implementation
}

function selectHighlighted() {
  if (isOpen.value && activeIndex.value !== -1 && filteredOptions.value[activeIndex.value]) {
    selectOption(filteredOptions.value[activeIndex.value])
  } else if (!isOpen.value) {
    isOpen.value = true
  }
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
.maya-combobox {
  position: relative;
  width: 100%;
}

.maya-combobox.disabled {
  opacity: 0.5;
}

.maya-combobox-trigger {
  width: 100%;
  position: relative;
  display: flex;
  align-items: center;
  background: var(--maya-bg-surface);
  border: 1px solid var(--maya-border);
  border-radius: var(--maya-radius-md);
  height: 36px;
  transition: all var(--maya-duration) var(--maya-ease);
}

.maya-combobox-trigger:focus-within,
.maya-combobox-trigger.is-open {
  border-color: var(--maya-input-focus-border);
}

.maya-combobox.disabled .maya-combobox-trigger {
  background: var(--maya-bg-root);
  cursor: not-allowed;
}

.maya-combobox-input {
  width: 100%;
  height: 100%;
  background: transparent;
  border: none;
  color: var(--maya-text-primary);
  font-family: var(--maya-font-sans);
  font-size: 0.875rem;
  padding: 8px 36px 8px 12px;
  outline: none;
}

.maya-combobox-input::placeholder {
  color: var(--maya-text-muted);
}

.maya-combobox-icon {
  position: absolute;
  right: 12px;
  color: var(--maya-text-muted);
  cursor: pointer;
  transition: transform var(--maya-duration) var(--maya-ease);
}

.maya-combobox-trigger.is-open .maya-combobox-icon {
  transform: rotate(180deg);
}

.maya-combobox-popover {
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

.maya-combobox-empty {
  padding: 12px;
  font-size: 0.875rem;
  color: var(--maya-text-muted);
  text-align: center;
}

.maya-combobox-option {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px;
  border-radius: var(--maya-radius-sm);
  font-size: 0.875rem;
  color: var(--maya-text-secondary);
  cursor: pointer;
  transition: all 150ms ease;
}

.maya-combobox-option.highlighted,
.maya-combobox-option:hover:not(.disabled) {
  background: var(--maya-bg-root);
  color: var(--maya-text-primary);
}

.maya-combobox-option.selected {
  font-weight: 500;
  color: var(--maya-text-primary);
}

.maya-combobox-option.disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.maya-combobox-check {
  color: var(--maya-text-primary);
}

.maya-combobox-dropdown-enter-active {
  transition: opacity 200ms cubic-bezier(0.19, 1, 0.22, 1), transform 200ms cubic-bezier(0.19, 1, 0.22, 1);
}

.maya-combobox-dropdown-leave-active {
  transition: opacity 150ms ease;
}

.maya-combobox-dropdown-enter-from {
  opacity: 0;
  transform: translateY(-4px) scale(0.98);
}

.maya-combobox-dropdown-leave-to {
  opacity: 0;
}
</style>
