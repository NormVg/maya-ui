<template>
  <div class="component-page">
    <div class="page-header">
      <h1 class="page-title">Navigation Menu</h1>
      <p class="page-description">A collection of links for navigating websites.</p>
    </div>

    <MayaPreviewCode title="Basic Usage"
      description="Wraps navigational links in a highly aesthetic, segmented-control-like container." code="<MayaNavigationMenu>
  <NuxtLink to='/'>Home</NuxtLink>
  <NuxtLink to='/components/navigation-menu'>Components</NuxtLink>
  <a href='#'>Documentation</a>
</MayaNavigationMenu>">
      <template #preview>
        <div style="display: flex; align-items: center; justify-content: center; padding: 2rem;">
          <MayaNavigationMenu>
            <a href="#" :class="{ active: currentNav === 'overview' }" @click.prevent="currentNav = 'overview'">Overview</a>
            <a href="#" :class="{ active: currentNav === 'start' }" @click.prevent="currentNav = 'start'">Getting Started</a>
            <a href="#" :class="{ active: currentNav === 'docs' }" @click.prevent="currentNav = 'docs'">Docs</a>
            <a href="#" :class="{ active: currentNav === 'blog' }" @click.prevent="currentNav = 'blog'">Blog</a>
          </MayaNavigationMenu>
        </div>
      </template>
    </MayaPreviewCode>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const currentNav = ref('overview')
</script>
