<template>
  <div class="maya-canvas-board" ref="boardRef" @mousedown="startPan" @mousemove="onMouseMove" @mouseup="onMouseUp" @mouseleave="onMouseUp">
    <!-- Grid Background -->
    <div class="canvas-grid" :style="{ backgroundPosition: `${pan.x}px ${pan.y}px` }"></div>
    
    <div 
      class="canvas-content" 
      :style="{ transform: `translate(${pan.x}px, ${pan.y}px)` }"
    >
      <div
        v-for="(node, index) in modelValue"
        :key="node.id || index"
        class="canvas-node"
        :class="{ 'is-dragging': draggedNodeId === node.id }"
        :style="{ transform: `translate(${node.x}px, ${node.y}px)` }"
        @mousedown="onMouseDown($event, node)"
      >
        <slot name="node" :node="node" :index="index">
          <!-- Default Node -->
          <div class="default-node">
            {{ node.label || \`Node \${node.id}\` }}
          </div>
        </slot>
      </div>
    </div>

    <!-- Controls -->
    <div class="canvas-controls">
      <MayaBtn size="icon" variant="secondary" @click="resetPan" aria-label="Reset View">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/>
          <path d="M3 3v5h5"/>
        </svg>
      </MayaBtn>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
  modelValue: {
    type: Array,
    required: true
  }
})

const emit = defineEmits(['update:modelValue', 'node-move'])

const boardRef = ref(null)
const pan = ref({ x: 0, y: 0 })

// Dragging state for nodes
const draggedNodeId = ref(null)
const dragOffset = ref({ x: 0, y: 0 })

// Dragging state for panning the board itself
const isPanning = ref(false)
const lastMousePos = ref({ x: 0, y: 0 })

const resetPan = () => {
  pan.value = { x: 0, y: 0 }
}

const onMouseDown = (e, node) => {
  // If user holds space or middle click, we pan instead
  if (e.button === 1 || e.shiftKey) {
    isPanning.value = true
    lastMousePos.value = { x: e.clientX, y: e.clientY }
    return
  }

  e.stopPropagation() // prevent board panning
  draggedNodeId.value = node.id
  
  // Calculate offset from mouse to the node's top-left
  // Note: we must account for the current pan translation
  const rect = e.currentTarget.getBoundingClientRect()
  const boardRect = boardRef.value.getBoundingClientRect()
  
  dragOffset.value = {
    x: e.clientX - rect.left,
    y: e.clientY - rect.top
  }
}

// Global board mousedown for panning
const startPan = (e) => {
  if (e.target.closest('.canvas-node')) return
  isPanning.value = true
  lastMousePos.value = { x: e.clientX, y: e.clientY }
}

const onMouseMove = (e) => {
  if (isPanning.value) {
    const dx = e.clientX - lastMousePos.value.x
    const dy = e.clientY - lastMousePos.value.y
    pan.value.x += dx
    pan.value.y += dy
    lastMousePos.value = { x: e.clientX, y: e.clientY }
    return
  }

  if (draggedNodeId.value !== null) {
    const boardRect = boardRef.value.getBoundingClientRect()
    
    // Calculate new position relative to board, subtracting pan
    const newX = e.clientX - boardRect.left - dragOffset.value.x - pan.value.x
    const newY = e.clientY - boardRect.top - dragOffset.value.y - pan.value.y

    const newNodes = [...props.modelValue]
    const nodeIndex = newNodes.findIndex(n => n.id === draggedNodeId.value)
    
    if (nodeIndex > -1) {
      newNodes[nodeIndex] = { ...newNodes[nodeIndex], x: newX, y: newY }
      emit('update:modelValue', newNodes)
      emit('node-move', newNodes[nodeIndex])
    }
  }
}

const onMouseUp = () => {
  draggedNodeId.value = null
  isPanning.value = false
}
</script>

<style scoped>
.maya-canvas-board {
  position: relative;
  width: 100%;
  height: 500px;
  background: var(--maya-bg-root);
  border: 1px solid var(--maya-border);
  border-radius: var(--maya-radius-xl);
  overflow: hidden;
  cursor: grab;
}

.maya-canvas-board:active {
  cursor: grabbing;
}

.canvas-grid {
  position: absolute;
  inset: -100%; /* Extra size for panning */
  background-image: 
    radial-gradient(var(--maya-border-strong) 1px, transparent 1px);
  background-size: 20px 20px;
  opacity: 0.5;
  pointer-events: none;
}

.canvas-content {
  position: absolute;
  inset: 0;
  pointer-events: none; /* Let board capture clicks unless on a node */
}

.canvas-node {
  position: absolute;
  top: 0;
  left: 0;
  pointer-events: auto;
  cursor: grab;
  user-select: none;
  z-index: 10;
  will-change: transform;
}

.canvas-node:active {
  cursor: grabbing;
  z-index: 20;
}

.canvas-node.is-dragging {
  opacity: 0.9;
  filter: drop-shadow(0 8px 16px rgba(0,0,0,0.15));
}

.default-node {
  padding: 12px 24px;
  background: var(--maya-bg-surface);
  border: 1px solid var(--maya-border-strong);
  border-radius: var(--maya-radius-md);
  box-shadow: 0 4px 6px rgba(0,0,0,0.05);
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--maya-text-primary);
  min-width: 120px;
  text-align: center;
}

.canvas-controls {
  position: absolute;
  bottom: 16px;
  right: 16px;
  display: flex;
  gap: 8px;
  z-index: 30;
}
</style>
