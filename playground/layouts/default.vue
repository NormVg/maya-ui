<template>
  <div class="layout" :class="{ 'is-sidebar-open': isSidebarOpen }">
    <!-- Mobile overlay -->
    <div v-if="isSidebarOpen" class="sidebar-overlay" @click="isSidebarOpen = false"></div>

    <aside class="sidebar">
      <div class="sidebar-header">
        <h1>Maya UI</h1>
        <!-- Mobile close button -->
        <button class="mobile-menu-close" @click="isSidebarOpen = false" aria-label="Close menu">
          <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
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
          <NuxtLink to="/components/number-field" class="nav-item" active-class="active">Number Field</NuxtLink>
          <NuxtLink to="/components/checkbox" class="nav-item" active-class="active">Checkbox</NuxtLink>
          <NuxtLink to="/components/radio" class="nav-item" active-class="active">Radio</NuxtLink>
          <NuxtLink to="/components/input-otp" class="nav-item" active-class="active">Input OTP</NuxtLink>
        </div>
        <div class="nav-group">
          <div class="nav-group-title">Selectors</div>
          <NuxtLink to="/components/select" class="nav-item" active-class="active">Select & Combobox</NuxtLink>
          <NuxtLink to="/components/date-chooser" class="nav-item" active-class="active">Date Chooser</NuxtLink>
        </div>
        <div class="nav-group">
          <div class="nav-group-title">Form Structure</div>
          <NuxtLink to="/components/field" class="nav-item" active-class="active">Field & Form</NuxtLink>
        </div>
        <div class="nav-group">
          <div class="nav-group-title">Navigation</div>
          <NuxtLink to="/components/breadcrumb" class="nav-item" active-class="active">Breadcrumb</NuxtLink>
          <NuxtLink to="/components/navigation-menu" class="nav-item" active-class="active">Navigation Menu</NuxtLink>
          <NuxtLink to="/components/menubar" class="nav-item" active-class="active">Menubar</NuxtLink>
        </div>
        <div class="nav-group">
          <div class="nav-group-title">Menus</div>
          <NuxtLink to="/components/dropdown-menu" class="nav-item" active-class="active">Dropdown Menu</NuxtLink>
          <NuxtLink to="/components/context-menu" class="nav-item" active-class="active">Context Menu</NuxtLink>
          <NuxtLink to="/components/command" class="nav-item" active-class="active">Command</NuxtLink>
        </div>
        <div class="nav-group">
          <div class="nav-group-title">Containers / Layout</div>
          <NuxtLink to="/components/card" class="nav-item" active-class="active">Card</NuxtLink>
          <NuxtLink to="/components/badge" class="nav-item" active-class="active">Badge</NuxtLink>
          <NuxtLink to="/components/avatar" class="nav-item" active-class="active">Avatar</NuxtLink>
          <NuxtLink to="/components/table" class="nav-item" active-class="active">Table</NuxtLink>
          <NuxtLink to="/components/scroll-area" class="nav-item" active-class="active">Scroll Area</NuxtLink>
          <NuxtLink to="/components/resizable" class="nav-item" active-class="active">Resizable</NuxtLink>
          <NuxtLink to="/components/sheet" class="nav-item" active-class="active">Sheet / Drawer</NuxtLink>
        </div>
        <div class="nav-group">
          <div class="nav-group-title">Data Display & States</div>
          <NuxtLink to="/components/empty-state" class="nav-item" active-class="active">Empty State</NuxtLink>
        </div>
        <div class="nav-group">
          <div class="nav-group-title">Loaders</div>
          <NuxtLink to="/components/loaders" class="nav-item" active-class="active">Spinner / Skeleton / Dots</NuxtLink>
        </div>
        <div class="nav-group">
          <div class="nav-group-title">Feedback & Overlays</div>
          <NuxtLink to="/components/alert" class="nav-item" active-class="active">Alert</NuxtLink>
          <NuxtLink to="/components/alert-dialog" class="nav-item" active-class="active">Alert Dialog</NuxtLink>
          <NuxtLink to="/components/banner" class="nav-item" active-class="active">Banner</NuxtLink>
          <NuxtLink to="/components/toast" class="nav-item" active-class="active">Toast / Sonner</NuxtLink>
          <NuxtLink to="/components/status-indicators" class="nav-item" active-class="active">Status Indicators
          </NuxtLink>
        </div>
        <div class="nav-group">
          <div class="nav-group-title">System</div>
          <NuxtLink to="/components/theme-toggle" class="nav-item" active-class="active">Theme Toggle</NuxtLink>
        </div>
        <div class="nav-group">
          <div class="nav-group-title">Screens</div>
          <NuxtLink to="/screens/sidebar-demo" class="nav-item nav-item--screen" active-class="active">
            Sidebar Demo
            <svg viewBox="0 0 24 24" width="11" height="11" fill="none" stroke="currentColor" stroke-width="2.5"
              stroke-linecap="round" stroke-linejoin="round" style="margin-left: auto; opacity: 0.5;">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </NuxtLink>
          <NuxtLink to="/screens/topbar-demo" class="nav-item nav-item--screen" active-class="active">
            Topbar Demo
            <svg viewBox="0 0 24 24" width="11" height="11" fill="none" stroke="currentColor" stroke-width="2.5"
              stroke-linecap="round" stroke-linejoin="round" style="margin-left: auto; opacity: 0.5;">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </NuxtLink>
          <NuxtLink to="/screens/app-shell-demo" class="nav-item nav-item--screen" active-class="active">
            App Shell Demo
            <svg viewBox="0 0 24 24" width="11" height="11" fill="none" stroke="currentColor" stroke-width="2.5"
              stroke-linecap="round" stroke-linejoin="round" style="margin-left: auto; opacity: 0.5;">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </NuxtLink>
        </div>
      </nav>
    </aside>

    <main class="main-content">
      <header class="topbar">
        <div class="topbar-left">
          <button class="mobile-menu-open" @click="isSidebarOpen = true" aria-label="Open menu">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
          </button>
          <span class="path">{{ breadcrumb }}</span>
        </div>
        <MayaThemeToggle />
      </header>

      <div class="content-area">
        <slot />
      </div>
    </main>

    <!-- Global Toaster for Playground -->
    <MayaToaster />
  </div>
</template>

<script setup>
import { computed, ref, watch } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const isSidebarOpen = ref(false)

// Close sidebar on route change
watch(() => route.path, () => {
  isSidebarOpen.value = false
})

const breadcrumb = computed(() => {
  const segments = route.path.split('/').filter(Boolean)
  if (!segments.length) return 'Getting Started / Introduction'
  return segments.map(s => s.charAt(0).toUpperCase() + s.slice(1).replace('-', ' ')).join(' / ')
})
</script>
