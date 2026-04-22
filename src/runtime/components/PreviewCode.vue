<template>
  <div class="maya-preview-code">
    <div v-if="title || description" class="maya-preview-code-label">
      <h3 v-if="title">{{ title }}</h3>
      <p v-if="description">{{ description }}</p>
    </div>

    <div class="maya-preview-code-card">
      <div class="maya-preview-code-toolbar">
        <button class="maya-preview-code-tab" :class="{ active: view === 'preview' }"
          @click="view = 'preview'">Preview</button>
        <button class="maya-preview-code-tab" :class="{ active: view === 'code' }" @click="view = 'code'">Code</button>
      </div>

      <div v-show="view === 'preview'" class="maya-preview-code-canvas">
        <slot name="preview" />
      </div>

      <div v-show="view === 'code'" class="maya-preview-code-source">
        <slot name="code" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

defineProps({
  title: { type: String, default: '' },
  description: { type: String, default: '' },
})

const view = ref('preview')
</script>

<style scoped>
.maya-preview-code {
  margin-bottom: 40px;
}

.maya-preview-code-label h3 {
  font-size: 0.875rem;
  font-weight: 500;
  letter-spacing: 0.01em;
  margin-bottom: 4px;
  color: var(--maya-text-primary);
  font-family: var(--maya-font-sans);
}

.maya-preview-code-label p {
  font-size: 0.8125rem;
  color: var(--maya-text-secondary);
  margin-bottom: 12px;
  font-family: var(--maya-font-sans);
}

.maya-preview-code-card {
  border: 1px solid var(--maya-border);
  border-radius: var(--maya-radius-lg);
  overflow: hidden;
  transition: border-color var(--maya-duration) var(--maya-ease);
}

.maya-preview-code-toolbar {
  display: flex;
  gap: 0;
  border-bottom: 1px dashed var(--maya-dash-color);
  background: var(--maya-bg-surface);
  transition: background-color var(--maya-duration) var(--maya-ease);
}

.maya-preview-code-tab {
  background: none;
  border: none;
  border-bottom: 1.5px solid transparent;
  padding: 10px 16px;
  font-size: 0.75rem;
  font-weight: 500;
  color: var(--maya-text-muted);
  cursor: pointer;
  transition: color var(--maya-duration) var(--maya-ease);
  margin-bottom: -1px;
  font-family: var(--maya-font-sans);
  position: relative;
}

.maya-preview-code-tab::after {
  content: '';
  position: absolute;
  inset: -4px -6px;
}

.maya-preview-code-tab:hover {
  color: var(--maya-text-secondary);
}

.maya-preview-code-tab.active {
  color: var(--maya-text-primary);
  border-bottom-color: var(--maya-text-primary);
}

.maya-preview-code-canvas {
  padding: 40px 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 140px;
  background: var(--maya-pattern-stripes), var(--maya-bg-root);
  transition: background-color var(--maya-duration) var(--maya-ease);
}

.maya-preview-code-source {
  background: var(--maya-bg-surface);
  transition: background-color var(--maya-duration) var(--maya-ease);
}

.maya-preview-code-source :deep(pre) {
  margin: 0;
  padding: 20px 24px;
  font-family: var(--maya-font-mono);
  font-size: 0.8125rem;
  line-height: 1.6;
  color: var(--maya-text-secondary);
  overflow-x: auto;
}
</style>
