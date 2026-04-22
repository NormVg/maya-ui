import { ref, onMounted, onUnmounted } from 'vue'
import { createHighlighter } from 'shiki'

const cache = {}

function getTheme() {
  if (typeof document === 'undefined') return 'dark'
  return document.documentElement.getAttribute('data-theme') === 'light' ? 'light' : 'dark'
}

const THEMES = {
  dark: 'github-dark-default',
  light: 'github-light-default',
}

export function useShiki() {
  const currentTheme = ref(getTheme())

  let observer = null

  onMounted(() => {
    observer = new MutationObserver(() => {
      currentTheme.value = getTheme()
    })
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme'],
    })
  })

  onUnmounted(() => {
    observer?.disconnect()
  })

  async function highlight(code, lang) {
    const theme = currentTheme.value
    const shikiTheme = THEMES[theme]
    const langId = lang === 'text' ? 'plaintext' : (lang || 'plaintext')

    const cacheKey = `${shikiTheme}:${langId}`
    if (!cache[cacheKey]) {
      cache[cacheKey] = await createHighlighter({
        themes: [shikiTheme],
        langs: [langId],
      })
    }

    const highlighter = cache[cacheKey]
    try { await highlighter.loadLanguage(langId) } catch { /* loaded */ }

    return highlighter.codeToHtml(code, { lang: langId, theme: shikiTheme })
  }

  return { highlight, currentTheme }
}
