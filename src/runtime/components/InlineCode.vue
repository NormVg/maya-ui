<template>
  <span class="maya-inline-code" :class="{ 'maya-inline-code--copyable': copyable }">
    <code class="maya-inline-code-text" v-html="highlighted" />
    <button v-if="copyable" class="maya-inline-code-copy" @click="copy" :aria-label="copied ? 'Copied' : 'Copy'">
      <Transition name="maya-icon-swap" mode="out-in">
        <svg v-if="!copied" key="copy" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor"
          stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
          <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
        </svg>
        <svg v-else key="check" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="var(--maya-success)"
          stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="20 6 9 17 4 12" />
        </svg>
      </Transition>
    </button>
  </span>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { useShiki } from '../composables/useShiki'

const props = defineProps({
  code: { type: String, default: '' },
  lang: { type: String, default: '' },
  copyable: { type: Boolean, default: true },
})

const copied = ref(false)
const highlighted = ref('')
const { highlight: shikiHighlight, currentTheme } = useShiki()

async function doHighlight() {
  if (!props.lang) {
    highlighted.value = props.code.replace(/</g, '&lt;').replace(/>/g, '&gt;')
    return
  }
  try {
    const html = await shikiHighlight(props.code, props.lang)
    const match = html.match(/<code[^>]*>([\s\S]*?)<\/code>/)
    highlighted.value = match ? match[1].trim() : props.code
  } catch {
    highlighted.value = props.code.replace(/</g, '&lt;').replace(/>/g, '&gt;')
  }
}

onMounted(doHighlight)
watch(() => [props.code, props.lang], doHighlight)
watch(currentTheme, doHighlight)

function copy() {
  navigator.clipboard.writeText(props.code)
  copied.value = true
  setTimeout(() => { copied.value = false }, 1500)
}
</script>

<style scoped>
.maya-inline-code {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background: var(--maya-bg-raised);
  border: 1px solid var(--maya-border);
  border-radius: var(--maya-radius-sm);
  padding: 3px 8px;
  font-family: var(--maya-font-mono);
  font-size: 0.8125rem;
  line-height: 1.5;
  color: var(--maya-text-primary);
  vertical-align: middle;
}

.maya-inline-code-text {
  font-family: inherit;
  white-space: nowrap;
}

.maya-inline-code-text :deep(span) {
  font-family: var(--maya-font-mono);
}

.maya-inline-code-copy {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: none;
  border: none;
  color: var(--maya-text-muted);
  cursor: pointer;
  padding: 2px;
  border-radius: var(--maya-radius-sm);
  transition:
    color var(--maya-duration) var(--maya-ease),
    transform var(--maya-duration-bouncy) var(--maya-ease-bouncy);
  flex-shrink: 0;
}

.maya-inline-code-copy::after {
  content: '';
  position: absolute;
  inset: -6px;
}

.maya-inline-code-copy:hover {
  color: var(--maya-text-primary);
}

.maya-inline-code-copy:active {
  transform: scale(0.85);
}
</style>
