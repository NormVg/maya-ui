<template>
  <button class="maya-theme-toggle" :title="isDark ? 'Switch to light mode' : 'Switch to dark mode'" @click="toggle">
    <svg v-if="isDark" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
      stroke-linecap="round" stroke-linejoin="round">
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
    <svg v-else width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
      stroke-linecap="round" stroke-linejoin="round">
      <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
    </svg>
  </button>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const isDark = ref(true)

onMounted(() => {
  try {
    const saved = localStorage.getItem('maya-theme')
    if (saved === 'light') isDark.value = false
    else if (!saved && window.matchMedia('(prefers-color-scheme: light)').matches) {
      isDark.value = false
    }
  } catch { }
  applyTheme()
})

function applyTheme() {
  const theme = isDark.value ? 'dark' : 'light'
  document.documentElement.setAttribute('data-theme', theme)
  try { localStorage.setItem('maya-theme', theme) } catch { }
}

async function toggle(e) {
  // If View Transitions not supported or reduced motion, just swap
  if (
    !document.startViewTransition ||
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  ) {
    isDark.value = !isDark.value
    applyTheme()
    return
  }

  // Get click coordinates for the circle origin
  const x = e.clientX
  const y = e.clientY
  const endRadius = Math.hypot(
    Math.max(x, innerWidth - x),
    Math.max(y, innerHeight - y),
  )

  // Start the view transition
  const transition = document.startViewTransition(() => {
    isDark.value = !isDark.value
    applyTheme()
  })

  // Wait for the old snapshot to be taken
  await transition.ready

  // Animate the new view in with a circular clip-path
  document.documentElement.animate(
    {
      clipPath: [
        `circle(0px at ${x}px ${y}px)`,
        `circle(${endRadius}px at ${x}px ${y}px)`,
      ]
    },
    {
      duration: 500,
      easing: 'ease-in-out',
      pseudoElement: '::view-transition-new(root)',
    },
  )
}
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
