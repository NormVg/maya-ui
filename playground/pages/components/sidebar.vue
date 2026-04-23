<template>
  <div class="component-page">
    <div class="page-header">
      <h1 class="page-title">Sidebar</h1>
      <p class="page-description">A collapsable vertical navigation layout container.</p>
    </div>

    <MayaPreviewCode title="Basic Usage" description="Sidebar features header, main content, and footer slots." code="<MayaSidebar :collapsed='false'>
  <template #header>Logo</template>
<div class='nav-links'>...</div>
<template #footer>Settings</template>
</MayaSidebar>">
      <template #preview>
        <div
          style="display: flex; align-items: stretch; justify-content: flex-start; padding: 2rem; height: 500px; border: 1px solid var(--maya-border); border-radius: var(--maya-radius-lg); background: var(--maya-bg-surface); overflow: hidden;">
          <MayaSidebar :collapsed="false">
            <template #header>
              <div style="font-weight: 600; font-size: 1.1rem;">Maya App</div>
            </template>

            <div style="display: flex; flex-direction: column; gap: 4px;">
              <MayaBtn variant="ghost" style="justify-content: flex-start;">Dashboard</MayaBtn>
              <MayaBtn variant="ghost" style="justify-content: flex-start;">Projects</MayaBtn>
              <MayaBtn variant="ghost" style="justify-content: flex-start;">Team</MayaBtn>
              <MayaBtn variant="ghost" style="justify-content: flex-start;">Calendar</MayaBtn>
            </div>

            <template #footer>
              <MayaBtn variant="ghost" style="justify-content: flex-start; width: 100%;">Settings</MayaBtn>
            </template>
          </MayaSidebar>
          <div style="flex: 1; padding: 24px;">
            <p style="color: var(--maya-text-muted);">Main content area</p>
          </div>
        </div>
      </template>
    </MayaPreviewCode>
  </div>
</template>
