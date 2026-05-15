import { ref, computed, readonly } from 'vue'

export type MayaTheme = 'dark' | 'light'

// ── Shared singleton state ──────────────────────────────────────
const theme = ref<MayaTheme>('dark')
let initialized = false
let observer: MutationObserver | null = null

function initTheme() {
  if (initialized || typeof window === 'undefined') return
  initialized = true

  // Read from localStorage or system preference
  try {
    const saved = localStorage.getItem('maya-theme') as MayaTheme | null
    if (saved === 'light' || saved === 'dark') {
      theme.value = saved
    } else if (window.matchMedia('(prefers-color-scheme: light)').matches) {
      theme.value = 'light'
    }
  } catch { }

  applyTheme()

  // Watch for external changes (e.g. devtools editing data-theme)
  observer = new MutationObserver(() => {
    const attr = document.documentElement.getAttribute('data-theme')
    if (attr === 'light' || attr === 'dark') {
      theme.value = attr
    }
  })
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['data-theme'],
  })
}

function applyTheme() {
  if (typeof document === 'undefined') return
  document.documentElement.setAttribute('data-theme', theme.value)
  try { localStorage.setItem('maya-theme', theme.value) } catch { }
}

/**
 * Composable for reading and controlling Maya UI's theme.
 *
 * @example
 * ```ts
 * const { theme, isDark, isLight, setTheme, toggleTheme } = useMayaTheme()
 *
 * // Read
 * if (isDark.value) { ... }
 *
 * // Set explicitly
 * setTheme('light')
 *
 * // Toggle
 * toggleTheme()
 * ```
 */
export function useMayaTheme() {
  initTheme()

  const isDark = computed(() => theme.value === 'dark')
  const isLight = computed(() => theme.value === 'light')

  function setTheme(newTheme: MayaTheme) {
    theme.value = newTheme
    applyTheme()
  }

  function toggleTheme() {
    theme.value = theme.value === 'dark' ? 'light' : 'dark'
    applyTheme()
  }

  return {
    /** Current theme value: 'dark' | 'light' */
    theme: readonly(theme),
    /** true when theme is 'dark' */
    isDark,
    /** true when theme is 'light' */
    isLight,
    /** Set the theme explicitly */
    setTheme,
    /** Toggle between dark and light */
    toggleTheme,
  }
}
