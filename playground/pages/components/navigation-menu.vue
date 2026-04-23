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
            <a href="#"
              style="background: var(--maya-bg-raised); color: var(--maya-text-primary); box-shadow: var(--maya-shadow-sm);">Overview</a>
            <a href="#">Getting Started</a>
            <a href="#">Docs</a>
            <a href="#">Blog</a>
          </MayaNavigationMenu>
        </div>
      </template>
    </MayaPreviewCode>
  </div>
</template>
