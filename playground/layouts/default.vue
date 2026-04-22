<template>
  <div class="layout">
    <aside class="sidebar">
      <div class="sidebar-header">
        <h1>Maya UI</h1>
      </div>
      <nav class="sidebar-nav">
        <div class="nav-group">
          <div class="nav-group-title">Getting Started</div>
          <NuxtLink to="/" class="nav-item" :class="{ active: route.path === '/' }">Introduction</NuxtLink>
          <NuxtLink to="/install" class="nav-item" active-class="active">Installation</NuxtLink>
        </div>
        <div class="nav-group">
          <div class="nav-group-title">Foundations</div>
          <NuxtLink to="/foundations/colors" class="nav-item" active-class="active">Colors & Surfaces</NuxtLink>
        </div>
        <div class="nav-group">
          <div class="nav-group-title">Base UI</div>
          <NuxtLink to="/components/base-ui" class="nav-item" active-class="active">Label / Separator / Kbd</NuxtLink>
          <NuxtLink to="/components/code" class="nav-item" active-class="active">Code & Prose</NuxtLink>
        </div>
        <div class="nav-group">
          <div class="nav-group-title">Buttons & Controls</div>
          <NuxtLink to="/components/button" class="nav-item" active-class="active">Button</NuxtLink>
          <NuxtLink to="/components/controls" class="nav-item" active-class="active">Toggle & Switch</NuxtLink>
        </div>
        <div class="nav-group">
          <div class="nav-group-title">Inputs</div>
          <NuxtLink to="/components/input" class="nav-item" active-class="active">Input</NuxtLink>
          <NuxtLink to="/components/textarea" class="nav-item" active-class="active">Textarea</NuxtLink>
          <NuxtLink to="/components/checkbox" class="nav-item" active-class="active">Checkbox</NuxtLink>
        </div>
        <div class="nav-group">
          <div class="nav-group-title">Containers</div>
          <NuxtLink to="/components/card" class="nav-item" active-class="active">Card</NuxtLink>
          <NuxtLink to="/components/badge" class="nav-item" active-class="active">Badge</NuxtLink>
          <NuxtLink to="/components/avatar" class="nav-item" active-class="active">Avatar</NuxtLink>
          <NuxtLink to="/components/table" class="nav-item" active-class="active">Table</NuxtLink>
        </div>
        <div class="nav-group">
          <div class="nav-group-title">Loaders</div>
          <NuxtLink to="/components/loaders" class="nav-item" active-class="active">Spinner / Skeleton / Dots</NuxtLink>
        </div>
        <div class="nav-group">
          <div class="nav-group-title">System</div>
          <NuxtLink to="/components/theme-toggle" class="nav-item" active-class="active">Theme Toggle</NuxtLink>
        </div>
      </nav>
    </aside>

    <main class="main-content">
      <header class="topbar">
        <span class="path">{{ breadcrumb }}</span>
        <MayaThemeToggle />
      </header>

      <div class="content-area">
        <slot />
      </div>
    </main>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const breadcrumb = computed(() => {
  const segments = route.path.split('/').filter(Boolean)
  if (!segments.length) return 'Getting Started / Introduction'
  return segments.map(s => s.charAt(0).toUpperCase() + s.slice(1).replace('-', ' ')).join(' / ')
})
</script>
