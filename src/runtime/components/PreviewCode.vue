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
        <button v-if="code" class="maya-preview-code-copy" @click="copyCode"
          :aria-label="copied ? 'Copied' : 'Copy code'">
          <Transition name="maya-icon-swap" mode="out-in">
            <svg v-if="!copied" key="copy" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor"
              stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
              <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
            </svg>
            <svg v-else key="check" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="var(--maya-success)"
              stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </Transition>
        </button>
      </div>

      <div v-show="view === 'preview'" class="maya-preview-code-canvas">
        <slot name="preview" />
      </div>

      <div v-show="view === 'code'" class="maya-preview-code-source">
        <div v-if="highlighted" v-html="highlighted" />
        <slot v-else name="code" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { createHighlighter } from 'shiki'

const props = defineProps({
  title: { type: String, default: '' },
  description: { type: String, default: '' },
  code: { type: String, default: '' },
  lang: { type: String, default: 'vue' },
})

const view = ref('preview')
const copied = ref(false)
const highlighted = ref('')
let highlighterInstance = null

async function highlight() {
  if (!props.code) return
  try {
    if (!highlighterInstance) {
      highlighterInstance = await createHighlighter({
        themes: ['github-dark-default'],
        langs: [props.lang],
      })
    }
    try { await highlighterInstance.loadLanguage(props.lang) } catch { /* loaded */ }

    highlighted.value = highlighterInstance.codeToHtml(props.code, {
      lang: props.lang,
      theme: 'github-dark-default',
    })
  } catch {
    highlighted.value = `<pre><code>${props.code.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</code></pre>`
  }
}

onMounted(highlight)
watch(() => [props.code, props.lang], highlight)

function copyCode() {
  navigator.clipboard.writeText(props.code)
  copied.value = true
  setTimeout(() => { copied.value = false }, 1500)
}
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
  align-items: center;
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

.maya-preview-code-copy {
  margin-left: auto;
  margin-right: 12px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: none;
  border: none;
  color: var(--maya-text-muted);
  cursor: pointer;
  padding: 4px;
  border-radius: var(--maya-radius-sm);
  transition:
    color var(--maya-duration) var(--maya-ease),
    transform var(--maya-duration-bouncy) var(--maya-ease-bouncy);
  position: relative;
}

.maya-preview-code-copy::after {
  content: '';
  position: absolute;
  inset: -6px;
}

.maya-preview-code-copy:hover {
  color: var(--maya-text-primary);
}

.maya-preview-code-copy:active {
  transform: scale(0.88);
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
  background: #0a0a0a;
  overflow-x: auto;
}

.maya-preview-code-source :deep(pre) {
  margin: 0;
  padding: 16px 20px;
  background: transparent !important;
  font-family: var(--maya-font-mono);
  font-size: 0.8125rem;
  line-height: 1.65;
  overflow-x: auto;
}

.maya-preview-code-source :deep(code) {
  font-family: var(--maya-font-mono);
  font-size: 0.8125rem;
  line-height: 1.65;
}
</style>
