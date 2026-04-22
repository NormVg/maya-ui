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
          <div class="nav-group-title">Components</div>
          <NuxtLink to="/components/button" class="nav-item" active-class="active">Button</NuxtLink>
          <NuxtLink to="/components/input" class="nav-item" active-class="active">Input</NuxtLink>
          <NuxtLink to="/components/textarea" class="nav-item" active-class="active">Textarea</NuxtLink>
          <NuxtLink to="/components/checkbox" class="nav-item" active-class="active">Checkbox</NuxtLink>
          <NuxtLink to="/components/table" class="nav-item" active-class="active">Table</NuxtLink>
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
