<template>
  <button class="maya-theme-toggle" :title="isDark ? 'Switch to light mode' : 'Switch to dark mode'" @click="toggle">
    <svg v-if="isDark" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2" />
      <path d="M12 20v2" />
      <path d="m4.93 4.93 1.41 1.41" />
      <path d="m17.66 17.66 1.41 1.41" />
      <path d="M2 12h2" />
      <path d="M20 12h2" />
      <path d="m6.34 17.66-1.41 1.41" />
      <path d="m19.07 4.93-1.41 1.41" />
    </svg>
    <svg v-else xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
    </svg>
  </button>
</template>

<script setup>
import { ref, onMounted, watch, nextTick } from 'vue'

const isDark = ref(true)

function toggle(event) {
  const isAppearanceTransition = document.startViewTransition && !window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (!isAppearanceTransition) {
    isDark.value = !isDark.value
    return
  }

  const x = event.clientX
  const y = event.clientY
  const endRadius = Math.hypot(
    Math.max(x, innerWidth - x),
    Math.max(y, innerHeight - y)
  )

  document.documentElement.classList.add('maya-theme-transitioning')

  const transition = document.startViewTransition(async () => {
    isDark.value = !isDark.value
    await nextTick()
  })

  transition.ready.then(() => {
    const clipPath = [
      `circle(0px at ${x}px ${y}px)`,
      `circle(${endRadius}px at ${x}px ${y}px)`
    ]

    document.documentElement.animate(
      {
        clipPath: isDark.value ? [...clipPath].reverse() : clipPath
      },
      {
        duration: 400,
        easing: 'ease-in-out',
        pseudoElement: isDark.value
          ? '::view-transition-old(root)'
          : '::view-transition-new(root)'
      }
    )
  })

  transition.finished.then(() => {
    document.documentElement.classList.remove('maya-theme-transitioning')
  })
}

function applyTheme(dark) {
  document.documentElement.setAttribute('data-theme', dark ? 'dark' : 'light')
  try {
    localStorage.setItem('maya-theme', dark ? 'dark' : 'light')
  } catch { }
}

onMounted(() => {
  try {
    const saved = localStorage.getItem('maya-theme')
    if (saved === 'light') isDark.value = false
    else if (!saved && window.matchMedia('(prefers-color-scheme: light)').matches) {
      isDark.value = false
    }
  } catch { }
  applyTheme(isDark.value)
})

watch(isDark, (v) => applyTheme(v))
</script>

<style scoped>
.maya-theme-toggle {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  background: none;
  border: 1px solid var(--maya-border);
  border-radius: var(--maya-radius-md);
  color: var(--maya-text-secondary);
  cursor: pointer;
  transition: all var(--maya-duration) var(--maya-ease);
}

.maya-theme-toggle::after {
  content: '';
  position: absolute;
  inset: -4px;
}

.maya-theme-toggle:hover {
  color: var(--maya-text-primary);
  border-color: var(--maya-border-strong);
  background-color: var(--maya-bg-surface);
}

.maya-theme-toggle:active {
  transform: scale(0.92);
}
</style>
