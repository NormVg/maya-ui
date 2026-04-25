<template>
  <div class="maya-file-upload">
    <input type="file" ref="fileInput" class="hidden-input" @change="handleFile" :accept="accept" :multiple="multiple">
    
    <div 
      class="upload-dropzone" 
      :class="{ 'is-dragover': isDragging, 'has-file': !!file }"
      @dragover.prevent="isDragging = true" 
      @dragleave.prevent="isDragging = false" 
      @drop.prevent="onDrop"
      @click="triggerUpload"
    >
      <div class="upload-content">
        <svg class="upload-icon" viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
          <polyline points="17 8 12 3 7 8"></polyline>
          <line x1="12" y1="3" x2="12" y2="15"></line>
        </svg>
        <div class="upload-text">
          <span v-if="!file" class="primary-text">Click to upload or drag and drop</span>
          <span v-else class="primary-text">{{ file.name }}</span>
          
          <span v-if="!file" class="secondary-text">SVG, PNG, JPG or GIF (max. 800x400px)</span>
          <span v-else class="secondary-text">{{ (file.size / 1024).toFixed(2) }} KB</span>
        </div>
      </div>
      
      <!-- Bouncy background layer for active drop -->
      <div class="drop-indicator" :class="{ active: isDragging }"></div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
  accept: { type: String, default: '*/*' },
  multiple: { type: Boolean, default: false }
})

const emit = defineEmits(['change'])
const fileInput = ref(null)
const isDragging = ref(false)
const file = ref(null)

const triggerUpload = () => {
  fileInput.value?.click()
}

const handleFile = (e) => {
  const selected = e.target.files[0]
  if (selected) {
    file.value = selected
    emit('change', selected)
  }
}

const onDrop = (e) => {
  isDragging.value = false
  const dropped = e.dataTransfer.files[0]
  if (dropped) {
    file.value = dropped
    emit('change', dropped)
  }
}
</script>

<style scoped>
.maya-file-upload {
  width: 100%;
}

.hidden-input {
  display: none;
}

.upload-dropzone {
  position: relative;
  width: 100%;
  border: 2px dashed var(--maya-dash-color);
  border-radius: var(--maya-radius-lg);
  background: var(--maya-bg-surface);
  padding: 40px 24px;
  text-align: center;
  cursor: pointer;
  overflow: hidden;
  transition: all 400ms var(--maya-ease-bouncy);
  box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.05);
}

.upload-dropzone:hover {
  border-color: var(--maya-accent, var(--maya-border-hover));
  background: var(--maya-bg-raised);
}

.upload-dropzone:active {
  transform: scale(0.98);
}

.upload-dropzone.is-dragover {
  border-color: var(--maya-accent, var(--maya-success));
  transform: scale(1.02);
}

.upload-content {
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  pointer-events: none;
}

.upload-icon {
  color: var(--maya-text-muted);
  transition: transform 400ms var(--maya-ease-bouncy), color 400ms var(--maya-ease);
}

.upload-dropzone:hover .upload-icon {
  color: var(--maya-text-primary);
  transform: translateY(-4px);
}

.is-dragover .upload-icon {
  color: var(--maya-success);
  transform: translateY(-8px) scale(1.1);
}

.has-file .upload-icon {
  color: var(--maya-accent, var(--maya-success));
}

.upload-text {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.primary-text {
  font-family: var(--maya-font-sans);
  font-weight: 500;
  font-size: 0.875rem;
  color: var(--maya-text-primary);
}

.secondary-text {
  font-family: var(--maya-font-sans);
  font-size: 0.75rem;
  color: var(--maya-text-muted);
}

.drop-indicator {
  position: absolute;
  inset: 0;
  background: var(--maya-success-muted);
  opacity: 0;
  transform: scale(0.95);
  transition: all 400ms var(--maya-ease-bouncy);
  z-index: 1;
  pointer-events: none;
}

.drop-indicator.active {
  opacity: 0.2;
  transform: scale(1);
}
</style>
