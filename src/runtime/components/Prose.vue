<template>
  <div class="maya-prose" v-html="rendered" @click="handleCopy" />
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { useShiki } from '../composables/useShiki'

const props = defineProps({
  content: { type: String, default: '' },
})

const rendered = ref('')
const { highlight: shikiHighlight, currentTheme } = useShiki()

function escapeHtml(str) {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
}

async function render() {
  const src = props.content
  const lines = src.split('\n')
  const parts = []
  let i = 0

  while (i < lines.length) {
    // Code fences
    const fenceMatch = lines[i].match(/^```(\w*)/)
    if (fenceMatch) {
      const lang = fenceMatch[1] || 'text'
      const codeLines = []
      i++
      while (i < lines.length && !lines[i].startsWith('```')) {
        codeLines.push(lines[i])
        i++
      }
      i++ // skip closing ```
      const code = codeLines.join('\n')
      
      const copySvg = `<svg class="icon-copy" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2" /><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" /></svg>`
      const checkSvg = `<svg class="icon-check" style="display:none;" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--maya-success)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12" /></svg>`
      
      // Encode code to safely store in data attribute
      const encodedCode = encodeURIComponent(code)

      const headerHtml = `
        <div class="maya-prose-codeblock-header">
          <span class="maya-prose-codeblock-filename">${lang}</span>
          <button class="maya-prose-copy-btn" data-code="${encodedCode}" aria-label="Copy code">
            ${copySvg}
            ${checkSvg}
          </button>
        </div>
      `
      
      try {
        const html = await shikiHighlight(code, lang)
        parts.push(`<div class="maya-prose-codeblock">${headerHtml}<div class="maya-prose-codeblock-body">${html}</div></div>`)
      } catch {
        parts.push(`<div class="maya-prose-codeblock">${headerHtml}<div class="maya-prose-codeblock-body"><pre><code>${escapeHtml(code)}</code></pre></div></div>`)
      }
      continue
    }

    const line = lines[i]

    // Headings
    if (line.startsWith('### ')) {
      parts.push(`<h3>${inlineFormat(line.slice(4))}</h3>`)
    } else if (line.startsWith('## ')) {
      parts.push(`<h2>${inlineFormat(line.slice(3))}</h2>`)
    } else if (line.startsWith('# ')) {
      parts.push(`<h1>${inlineFormat(line.slice(2))}</h1>`)
    }
    // Unordered list
    else if (line.match(/^[\-\*] /)) {
      const items = []
      while (i < lines.length && lines[i].match(/^[\-\*] /)) {
        items.push(`<li>${inlineFormat(lines[i].slice(2))}</li>`)
        i++
      }
      parts.push(`<ul>${items.join('')}</ul>`)
      continue
    }
    // Ordered list
    else if (line.match(/^\d+\. /)) {
      const items = []
      while (i < lines.length && lines[i].match(/^\d+\. /)) {
        items.push(`<li>${inlineFormat(lines[i].replace(/^\d+\.\s/, ''))}</li>`)
        i++
      }
      parts.push(`<ol>${items.join('')}</ol>`)
      continue
    }
    // Horizontal rule
    else if (line.match(/^---+$/)) {
      parts.push('<hr />')
    }
    // Blockquote
    else if (line.startsWith('> ')) {
      const bqLines = []
      while (i < lines.length && lines[i].startsWith('> ')) {
        bqLines.push(inlineFormat(lines[i].slice(2)))
        i++
      }
      parts.push(`<blockquote>${bqLines.join('<br/>')}</blockquote>`)
      continue
    }
    // Empty line
    else if (line.trim() === '') {
      // skip
    }
    // Paragraph
    else {
      parts.push(`<p>${inlineFormat(line)}</p>`)
    }

    i++
  }

  rendered.value = parts.join('\n')
}

function inlineFormat(text) {
  return text
    // Bold
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    // Italic
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    // Inline code
    .replace(/`([^`]+)`/g, '<code class="maya-prose-inline-code">$1</code>')
    // Links
    .replace(/\[([^\]]+)\]\(([^\)]+)\)/g, '<a href="$2" target="_blank" rel="noopener">$1</a>')
}

function handleCopy(e) {
  const btn = e.target.closest('.maya-prose-copy-btn')
  if (!btn) return
  
  const encodedCode = btn.getAttribute('data-code')
  if (encodedCode) {
    const code = decodeURIComponent(encodedCode)
    navigator.clipboard.writeText(code)
    
    const iconCopy = btn.querySelector('.icon-copy')
    const iconCheck = btn.querySelector('.icon-check')
    
    if (iconCopy && iconCheck) {
      iconCopy.style.display = 'none'
      iconCheck.style.display = 'block'
      setTimeout(() => {
        iconCopy.style.display = 'block'
        iconCheck.style.display = 'none'
      }, 1500)
    }
  }
}

onMounted(render)
watch(() => props.content, render)
watch(currentTheme, render)
</script>

<style scoped>
.maya-prose {
  font-family: var(--maya-font-sans);
  color: var(--maya-text-primary);
  line-height: 1.75;
  font-size: 0.875rem;
  -webkit-font-smoothing: antialiased;
}

.maya-prose :deep(h1) {
  font-size: 1.5rem;
  font-weight: 600;
  margin: 2em 0 0.75em;
  letter-spacing: -0.01em;
}

.maya-prose :deep(h2) {
  font-size: 1.25rem;
  font-weight: 600;
  margin: 1.75em 0 0.5em;
  letter-spacing: -0.01em;
}

.maya-prose :deep(h3) {
  font-size: 1rem;
  font-weight: 600;
  margin: 1.5em 0 0.4em;
}

.maya-prose :deep(p) {
  margin: 0.75em 0;
  color: var(--maya-text-secondary);
}

.maya-prose :deep(strong) {
  font-weight: 600;
  color: var(--maya-text-primary);
}

.maya-prose :deep(em) {
  font-style: italic;
}

.maya-prose :deep(a) {
  color: var(--maya-info);
  text-decoration: none;
  border-bottom: 1px dashed var(--maya-info-border);
  transition: color var(--maya-duration) var(--maya-ease);
}

.maya-prose :deep(a:hover) {
  color: var(--maya-info-hover);
}

.maya-prose :deep(.maya-prose-inline-code) {
  background: var(--maya-bg-raised);
  border: 1px solid var(--maya-border);
  border-radius: var(--maya-radius-sm);
  padding: 2px 6px;
  font-family: var(--maya-font-mono);
  font-size: 0.8125em;
  color: var(--maya-text-primary);
}

.maya-prose :deep(ul),
.maya-prose :deep(ol) {
  padding-left: 1.25em;
  margin: 0.5em 0;
  color: var(--maya-text-secondary);
}

.maya-prose :deep(li) {
  margin: 0.25em 0;
}

.maya-prose :deep(blockquote) {
  border-left: 3px solid var(--maya-border-strong);
  padding: 0.5em 1em;
  margin: 1em 0;
  color: var(--maya-text-muted);
  background: var(--maya-bg-surface);
  border-radius: 0 var(--maya-radius-sm) var(--maya-radius-sm) 0;
}

.maya-prose :deep(hr) {
  border: none;
  border-top: 1px dashed var(--maya-dash-color);
  margin: 2em 0;
}

.maya-prose :deep(.maya-prose-codeblock) {
  margin: 1em 0;
  border: 1px solid var(--maya-border);
  border-radius: var(--maya-radius-lg);
  overflow: hidden;
}

.maya-prose :deep(.maya-prose-codeblock-header) {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 16px;
  background: var(--maya-bg-surface);
  border-bottom: 1px dashed var(--maya-dash-color);
}

.maya-prose :deep(.maya-prose-codeblock-filename) {
  font-size: 0.6875rem;
  font-weight: 500;
  color: var(--maya-text-muted);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  font-family: var(--maya-font-mono);
}

.maya-prose :deep(.maya-prose-copy-btn) {
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
  transition: color var(--maya-duration) var(--maya-ease), transform var(--maya-duration-bouncy) var(--maya-ease-bouncy);
}

.maya-prose :deep(.maya-prose-copy-btn:hover) {
  color: var(--maya-text-primary);
}

.maya-prose :deep(.maya-prose-copy-btn:active) {
  transform: scale(0.88);
}

.maya-prose :deep(.maya-prose-codeblock-body) {
  background: var(--maya-code-bg);
  overflow-x: auto;
}

.maya-prose :deep(.maya-prose-codeblock-body pre) {
  margin: 0;
  padding: 16px 20px;
  background: transparent !important;
  font-family: var(--maya-font-mono);
  font-size: 0.8125rem;
  line-height: 1.65;
}

.maya-prose :deep(.maya-prose-codeblock-body code) {
  font-family: var(--maya-font-mono);
}
</style>
