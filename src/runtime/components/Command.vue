<template>
  <div class="maya-command">
    <div class="maya-command-search">
      <svg viewBox="0 0 24 24" class="maya-command-icon" fill="none" stroke="currentColor" stroke-width="2"
        stroke-linecap="round" stroke-linejoin="round">
        <circle cx="11" cy="11" r="8" />
        <line x1="21" y1="21" x2="16.65" y2="16.65" />
      </svg>
      <input class="maya-command-input" v-model="searchQuery" :placeholder="placeholder" ref="inputRef"
        @keydown.down.prevent="navigateDown" @keydown.up.prevent="navigateUp" @keydown.enter.prevent="selectCurrent"
        @keydown="handleShortcut" />
    </div>

    <div class="maya-command-list" role="listbox" ref="listRef">
      <div v-if="filteredGroupsWithIndex.length === 0" class="maya-command-empty">
        <slot name="empty">No results found.</slot>
      </div>

      <template v-for="(group, groupIndex) in filteredGroupsWithIndex" :key="groupIndex">
        <div class="maya-command-group" role="group">
          <div v-if="group.heading" class="maya-command-group-heading">{{ group.heading }}</div>
          <div class="maya-command-items">
            <button v-for="item in group.items" :key="item.flatIndex" class="maya-command-item"
              :class="{ 'is-selected': selectedIndex === item.flatIndex }" role="option"
              :aria-selected="selectedIndex === item.flatIndex" @mouseenter="selectedIndex = item.flatIndex"
              @click="handleSelect(item)"
              :ref="el => { if (el && selectedIndex === item.flatIndex) activeItemRef = el }">
              <div class="maya-command-item-content">
                <span v-if="item.icon" class="maya-command-item-icon" v-html="item.icon"></span>
                <span class="maya-command-item-label">{{ item.label }}</span>
              </div>
              <MayaKbd v-if="item.shortcut" :triggered="triggeredShortcut === item.shortcut">{{ item.shortcut }}
              </MayaKbd>
            </button>
          </div>
        </div>
        <div v-if="groupIndex < filteredGroupsWithIndex.length - 1" class="maya-command-separator" />
      </template>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, nextTick, onMounted } from 'vue'
import MayaKbd from './Kbd.vue'

const props = defineProps({
  groups: {
    type: Array,
    default: () => []
  },
  placeholder: {
    type: String,
    default: 'Type a command or search...'
  }
})

const emit = defineEmits(['select'])

const searchQuery = ref('')
const selectedIndex = ref(0)
const inputRef = ref(null)
const listRef = ref(null)
const activeItemRef = ref(null)
const triggeredShortcut = ref(null)
let shortcutTimeout = null

// Flat list of all items (for navigation + shortcut matching)
const flatItemsList = computed(() => {
  if (!searchQuery.value) return props.groups.flatMap(g => g.items)
  const query = searchQuery.value.toLowerCase()
  return props.groups.flatMap(g => g.items).filter(item => item.label.toLowerCase().includes(query))
})

const filteredGroupsWithIndex = computed(() => {
  let count = 0
  const query = searchQuery.value.toLowerCase()
  return props.groups.map(group => {
    return {
      ...group,
      items: group.items
        .filter(item => !query || item.label.toLowerCase().includes(query))
        .map(item => ({ ...item, flatIndex: count++ }))
    }
  }).filter(group => group.items.length > 0)
})

// Reset selection when query changes
watch(searchQuery, () => {
  selectedIndex.value = 0
})

// Scroll selected item into view
watch(selectedIndex, async () => {
  await nextTick()
  if (activeItemRef.value && listRef.value) {
    const list = listRef.value
    const item = activeItemRef.value
    const itemTop = item.offsetTop
    const itemBottom = itemTop + item.offsetHeight
    const listTop = list.scrollTop
    const listBottom = listTop + list.clientHeight

    if (itemTop < listTop) {
      list.scrollTop = itemTop - 8
    } else if (itemBottom > listBottom) {
      list.scrollTop = itemBottom - list.clientHeight + 8
    }
  }
})

function navigateDown() {
  if (flatItemsList.value.length === 0) return
  selectedIndex.value = selectedIndex.value < flatItemsList.value.length - 1
    ? selectedIndex.value + 1
    : 0
}

function navigateUp() {
  if (flatItemsList.value.length === 0) return
  selectedIndex.value = selectedIndex.value > 0
    ? selectedIndex.value - 1
    : flatItemsList.value.length - 1
}

function selectCurrent() {
  if (flatItemsList.value.length > 0) {
    emit('select', flatItemsList.value[selectedIndex.value])
  }
}

function handleSelect(item) {
  emit('select', item)
}

/**
 * Keyboard shortcut execution:
 * Matches item.shortcut values like "⌘K", "⌘P", "⌘B" etc.
 * When the input detects a matching key combo, it selects that item.
 */
function handleShortcut(e) {
  // Build a comparable string from the current key combo
  const meta = e.metaKey || e.ctrlKey
  const shift = e.shiftKey
  const key = e.key.toUpperCase()

  if (!meta && !shift) return // Only intercept modifier combos

  const allItems = props.groups.flatMap(g => g.items)
  for (const item of allItems) {
    if (!item.shortcut) continue

    // Parse shortcut string (e.g. "⌘K", "⇧⌘Z", "C")
    const sc = item.shortcut
    const scMeta = sc.includes('⌘')
    const scShift = sc.includes('⇧')
    // Extract the actual key character (last alphanumeric char in shortcut)
    const scKey = sc.replace(/[⌘⇧⌥⎇]/g, '').toUpperCase()

    if (meta === scMeta && shift === scShift && key === scKey) {
      e.preventDefault()
      // Flash the matching Kbd before selecting
      triggeredShortcut.value = item.shortcut
      clearTimeout(shortcutTimeout)
      shortcutTimeout = setTimeout(() => {
        triggeredShortcut.value = null
      }, 350)
      emit('select', item)
      return
    }
  }
}

onMounted(() => {
  // Focus with slight delay for modal context
  setTimeout(() => {
    if (inputRef.value) inputRef.value.focus()
  }, 80)
})
</script>

<style scoped>
.maya-command {
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 640px;
  background: var(--maya-bg-surface);
  background-image: linear-gradient(180deg, rgba(255, 255, 255, 0.03) 0%, rgba(255, 255, 255, 0) 100%);
  border-radius: var(--maya-radius-lg);
  border: 1px solid var(--maya-border);
  overflow: hidden;
  font-family: var(--maya-font-sans);
  box-shadow:
    0 0 0 1px rgba(255, 255, 255, 0.04),
    0 8px 32px rgba(0, 0, 0, 0.35),
    0 2px 8px rgba(0, 0, 0, 0.2);
}

.maya-command-search {
  display: flex;
  align-items: center;
  padding: 12px 14px;
  border-bottom: 1px solid var(--maya-border);
}

.maya-command-icon {
  width: 18px;
  height: 18px;
  color: var(--maya-text-muted);
  flex-shrink: 0;
  margin-right: 12px;
}

.maya-command-input {
  flex: 1;
  background: transparent;
  border: none;
  outline: none;
  font-size: 0.9375rem;
  color: var(--maya-text-primary);
  font-family: inherit;
}

.maya-command-input::placeholder {
  color: var(--maya-text-muted);
}

.maya-command-list {
  max-height: 320px;
  overflow-y: auto;
  padding: 6px;
  scroll-behavior: smooth;
}

.maya-command-list::-webkit-scrollbar {
  width: 4px;
}

.maya-command-list::-webkit-scrollbar-thumb {
  background: var(--maya-border-strong);
  border-radius: 99px;
}

.maya-command-separator {
  height: 1px;
  background: var(--maya-border);
  margin: 4px 6px;
  opacity: 0.6;
}

.maya-command-empty {
  padding: 32px 24px;
  text-align: center;
  color: var(--maya-text-muted);
  font-size: 0.875rem;
}

.maya-command-group-heading {
  padding: 6px 10px 4px;
  font-size: 0.6875rem;
  font-weight: 600;
  color: var(--maya-text-muted);
  text-transform: uppercase;
  letter-spacing: 0.06em;
}

.maya-command-items {
  display: flex;
  flex-direction: column;
  gap: 1px;
}

.maya-command-item {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 8px 10px;
  border: none;
  background: transparent;
  border-radius: var(--maya-radius-sm);
  font-size: 0.875rem;
  color: var(--maya-text-secondary);
  cursor: pointer;
  text-align: left;
  transition: color 120ms cubic-bezier(0.19, 1, 0.22, 1);
  user-select: none;
}

/* Pseudo-element hover — ui-rules § Pseudo-Elements */
.maya-command-item::before {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: inherit;
  background: var(--maya-text-primary);
  opacity: 0;
  transform: scale(0.97);
  transition:
    opacity 120ms cubic-bezier(0.19, 1, 0.22, 1),
    transform 120ms cubic-bezier(0.19, 1, 0.22, 1);
}

.maya-command-item.is-selected::before {
  opacity: 0.07;
  transform: scale(1);
}

.maya-command-item.is-selected {
  color: var(--maya-text-primary);
}

.maya-command-item:active {
  transform: scale(0.98);
  transition: transform 80ms ease;
}

.maya-command-item-content {
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
  gap: 10px;
}

.maya-command-item-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 16px;
  height: 16px;
  color: var(--maya-text-muted);
  transition: color 120ms ease;
}

.maya-command-item.is-selected .maya-command-item-icon {
  color: var(--maya-text-primary);
}

/* Shortcut key is handled by MayaKbd component's own styles.
   We just ensure it stays correctly positioned inside the item. */
:deep(.maya-kbd) {
  position: relative;
  z-index: 1;
}
</style>
