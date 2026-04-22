<template>
  <div class="maya-codeblock">
    <div v-if="filename || lang" class="maya-codeblock-header">
      <span class="maya-codeblock-filename">{{ filename || lang }}</span>
      <button class="maya-codeblock-copy" @click="copy" :aria-label="copied ? 'Copied' : 'Copy code'">
        <Transition name="maya-icon-swap" mode="out-in">
          <svg v-if="!copied" key="copy" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor"
            stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
          </svg>
          <svg v-else key="check" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--maya-success)"
            stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </Transition>
      </button>
    </div>
    <div class="maya-codeblock-body" v-html="highlighted" />
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { createHighlighter } from 'shiki'

const props = defineProps({
  code: { type: String, default: '' },
  lang: { type: String, default: 'text' },
  filename: { type: String, default: '' },
})

const copied = ref(false)
const highlighted = ref('')
let highlighterInstance = null

async function highlight() {
  try {
    if (!highlighterInstance) {
      highlighterInstance = await createHighlighter({
        themes: ['github-dark-default'],
        langs: [props.lang === 'text' ? 'plaintext' : props.lang],
      })
    }
    // Ensure the language is loaded
    const langId = props.lang === 'text' ? 'plaintext' : props.lang
    try {
      await highlighterInstance.loadLanguage(langId)
    } catch { /* already loaded */ }

    highlighted.value = highlighterInstance.codeToHtml(props.code, {
      lang: langId,
      theme: 'github-dark-default',
    })
  } catch {
    highlighted.value = `<pre><code>${props.code.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</code></pre>`
  }
}

onMounted(highlight)
watch(() => [props.code, props.lang], highlight)

function copy() {
  navigator.clipboard.writeText(props.code)
  copied.value = true
  setTimeout(() => { copied.value = false }, 1500)
}
</script>

<style scoped>
.maya-codeblock {
  border: 1px solid var(--maya-border);
  border-radius: var(--maya-radius-lg);
  overflow: hidden;
  font-family: var(--maya-font-mono);
  font-size: 0.8125rem;
  line-height: 1.65;
}

.maya-codeblock-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 16px;
  background: var(--maya-bg-surface);
  border-bottom: 1px dashed var(--maya-dash-color);
}

.maya-codeblock-filename {
  font-size: 0.6875rem;
  font-weight: 500;
  color: var(--maya-text-muted);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.maya-codeblock-copy {
  position: relative;
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
}

.maya-codeblock-copy::after {
  content: '';
  position: absolute;
  inset: -6px;
}

.maya-codeblock-copy:hover {
  color: var(--maya-text-primary);
}

.maya-codeblock-copy:active {
  transform: scale(0.88);
}

.maya-codeblock-body {
  background: #0a0a0a;
  overflow-x: auto;
}

.maya-codeblock-body :deep(pre) {
  margin: 0;
  padding: 16px 20px;
  background: transparent !important;
}

.maya-codeblock-body :deep(code) {
  font-family: var(--maya-font-mono);
  font-size: 0.8125rem;
  line-height: 1.65;
}
</style>
