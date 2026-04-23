<template>
  <div class="maya-command">
    <div class="maya-command-search">
      <svg viewBox="0 0 24 24" class="maya-command-icon" fill="none" stroke="currentColor" stroke-width="2"
        stroke-linecap="round" stroke-linejoin="round">
        <circle cx="11" cy="11" r="8" />
        <line x1="21" y1="21" x2="16.65" y2="16.65" />
      </svg>
      <input class="maya-command-input" v-model="searchQuery" :placeholder="placeholder" ref="inputRef"
        @keydown.down.prevent="navigateDown" @keydown.up.prevent="navigateUp" @keydown.enter.prevent="selectCurrent" />
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
              <span v-if="item.shortcut" class="maya-command-shortcut">{{ item.shortcut }}</span>
            </button>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, nextTick, onMounted } from 'vue'

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
      items: group.items.filter(item => !query || item.label.toLowerCase().includes(query)).map(item => {
        return { ...item, flatIndex: count++ }
      })
    }
  }).filter(group => group.items.length > 0)
})

watch(searchQuery, () => {
  selectedIndex.value = 0
})

watch(selectedIndex, async () => {
  await nextTick()
  if (activeItemRef.value && listRef.value) {
    const list = listRef.value
    const item = activeItemRef.value

    // Smooth scrolling logic to keep item in view
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
  if (selectedIndex.value < flatItemsList.value.length - 1) {
    selectedIndex.value++
  } else {
    selectedIndex.value = 0 // loop to top
  }
}

function navigateUp() {
  if (flatItemsList.value.length === 0) return
  if (selectedIndex.value > 0) {
    selectedIndex.value--
  } else {
    selectedIndex.value = flatItemsList.value.length - 1 // loop to bottom
  }
}

function selectCurrent() {
  if (flatItemsList.value.length > 0) {
    emit('select', flatItemsList.value[selectedIndex.value])
  }
}

function handleSelect(item) {
  emit('select', item)
}

onMounted(() => {
  // Autofocus visually works better inside modals if explicitly delayed slightly
  setTimeout(() => {
    if (inputRef.value) inputRef.value.focus()
  }, 100)
})
</script>

<style scoped>
.maya-command {
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 640px;
  /* Increased from 500px as requested */
  background: var(--maya-bg-surface);
  border-radius: var(--maya-radius-lg);
  border: 1px solid var(--maya-border);
  overflow: hidden;
  font-family: var(--maya-font-sans);
  box-shadow: var(--maya-shadow-md);
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
  max-height: 300px;
  overflow-y: auto;
  padding: 6px;
  scroll-behavior: smooth;
}

.maya-command-list::-webkit-scrollbar {
  width: 6px;
}

.maya-command-list::-webkit-scrollbar-thumb {
  background: var(--maya-border-strong);
  border-radius: 99px;
}

.maya-command-empty {
  padding: 32px 24px;
  text-align: center;
  color: var(--maya-text-muted);
  font-size: 0.875rem;
}

.maya-command-group-heading {
  padding: 8px 10px;
  font-size: 0.75rem;
  font-weight: 500;
  color: var(--maya-text-muted);
  text-transform: capitalize;
}

.maya-command-items {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.maya-command-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 8px 10px;
  border: none;
  background: transparent;
  border-radius: var(--maya-radius-md);
  font-size: 0.875rem;
  color: var(--maya-text-primary);
  cursor: pointer;
  text-align: left;
  transition: all 150ms var(--maya-ease);
}

.maya-command-item.is-selected {
  background: var(--maya-bg-raised);
}

.maya-command-item:active {
  transform: scale(0.99);
}

.maya-command-item-content {
  display: flex;
  align-items: center;
  gap: 8px;
}

.maya-command-item-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 16px;
  height: 16px;
  color: var(--maya-text-muted);
}

.maya-command-item.is-selected .maya-command-item-icon {
  color: var(--maya-text-primary);
}

.maya-command-shortcut {
  font-size: 0.75rem;
  color: var(--maya-text-muted);
  background: var(--maya-bg-root);
  padding: 2px 6px;
  border-radius: var(--maya-radius-sm);
  border: 1px solid var(--maya-border);
}
</style>
