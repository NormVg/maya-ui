<template>
  <div class="maya-sortable-list" ref="listRef">
    <div
      v-for="(item, index) in modelValue"
      :key="getKey(item, index)"
      class="maya-sortable-item"
      :class="{ 'is-dragging': draggedIndex === index, 'is-drag-over': dragOverIndex === index }"
      draggable="true"
      @dragstart="onDragStart($event, index)"
      @dragover.prevent="onDragOver($event, index)"
      @dragenter.prevent="onDragEnter($event, index)"
      @drop="onDrop($event, index)"
      @dragend="onDragEnd"
    >
      <slot name="item" :item="item" :index="index">
        <!-- Default Item Rendering -->
        <div class="default-item-card">
          <div class="drag-handle">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="9" cy="12" r="1"/>
              <circle cx="9" cy="5" r="1"/>
              <circle cx="9" cy="19" r="1"/>
              <circle cx="15" cy="12" r="1"/>
              <circle cx="15" cy="5" r="1"/>
              <circle cx="15" cy="19" r="1"/>
            </svg>
          </div>
          <span class="item-text">{{ item.label || item }}</span>
        </div>
      </slot>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
  modelValue: {
    type: Array,
    required: true
  },
  itemKey: {
    type: [String, Function],
    default: null
  }
})

const emit = defineEmits(['update:modelValue', 'change'])

const draggedIndex = ref(null)
const dragOverIndex = ref(null)

const getKey = (item, index) => {
  if (typeof props.itemKey === 'function') return props.itemKey(item, index)
  if (props.itemKey && typeof item === 'object') return item[props.itemKey]
  return index
}

const onDragStart = (e, index) => {
  draggedIndex.value = index
  if (e.dataTransfer) {
    e.dataTransfer.effectAllowed = 'move'
    // Required for Firefox
    e.dataTransfer.setData('text/plain', index)
    
    // Slight delay to allow browser to grab the element visual before styling as hidden
    setTimeout(() => {
      // you could add a class here if needed
    }, 0)
  }
}

const onDragEnter = (e, index) => {
  if (draggedIndex.value !== null && draggedIndex.value !== index) {
    dragOverIndex.value = index
  }
}

const onDragOver = (e, index) => {
  if (draggedIndex.value !== null && draggedIndex.value !== index) {
    e.dataTransfer.dropEffect = 'move'
  }
}

const onDrop = (e, index) => {
  if (draggedIndex.value !== null && draggedIndex.value !== index) {
    const newList = [...props.modelValue]
    const [movedItem] = newList.splice(draggedIndex.value, 1)
    newList.splice(index, 0, movedItem)
    
    emit('update:modelValue', newList)
    emit('change', { list: newList, movedItem, oldIndex: draggedIndex.value, newIndex: index })
  }
  
  draggedIndex.value = null
  dragOverIndex.value = null
}

const onDragEnd = () => {
  draggedIndex.value = null
  dragOverIndex.value = null
}
</script>

<style scoped>
.maya-sortable-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
}

.maya-sortable-item {
  transition: transform 0.2s cubic-bezier(0.2, 1, 0.2, 1), opacity 0.2s ease;
  cursor: grab;
}

.maya-sortable-item:active {
  cursor: grabbing;
}

.maya-sortable-item.is-dragging {
  opacity: 0.4;
  transform: scale(0.98);
}

.maya-sortable-item.is-drag-over {
  transform: translateY(4px);
  position: relative;
}

.maya-sortable-item.is-drag-over::before {
  content: '';
  position: absolute;
  top: -6px;
  left: 0;
  right: 0;
  height: 2px;
  background: var(--maya-primary);
  border-radius: 2px;
  pointer-events: none;
}

.default-item-card {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  background: var(--maya-bg-surface);
  border: 1px solid var(--maya-border);
  border-radius: var(--maya-radius-md);
  box-shadow: 0 1px 2px rgba(0,0,0,0.05);
}

.drag-handle {
  color: var(--maya-text-tertiary);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: grab;
}

.drag-handle:active {
  cursor: grabbing;
}

.item-text {
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--maya-text-primary);
}
</style>
