<template>
  <div class="component-page">
    <div class="page-header">
      <h1 class="page-title">Topbar</h1>
      <p class="page-description">A sticky horizontal navigation header block with left, center, and right slot areas.
      </p>
    </div>

    <MayaPreviewCode title="Basic Usage" description="Standard dashboard header setup." code="<MayaTopbar>
  <template #left>Logo</template>
<template #center><MayaInput placeholder='Search...' /></template>
<template #right><MayaAvatar /></template>
</MayaTopbar>">
      <template #preview>
        <div
          style="display: flex; align-items: stretch; justify-content: flex-start; padding: 2rem; height: 300px; border: 1px solid var(--maya-border); border-radius: var(--maya-radius-lg); background: var(--maya-bg-root); overflow: hidden; position: relative;">
          <MayaTopbar :sticky="false" style="border-radius: var(--maya-radius-md) var(--maya-radius-md) 0 0;">
            <template #left>
              <div style="font-weight: 600; font-size: 1.1rem; display: flex; align-items: center; gap: 8px;">
                <div style="width: 24px; height: 24px; background: var(--maya-text-primary); border-radius: 4px;"></div>
                Brand
              </div>
            </template>

            <template #center>
              <MayaInput placeholder="Search..." style="width: 300px;" />
            </template>

            <template #right>
              <MayaAvatar src="https://i.pravatar.cc/150?u=a042581f4e29026704d" />
            </template>
          </MayaTopbar>
        </div>
      </template>
    </MayaPreviewCode>
  </div>
</template>
