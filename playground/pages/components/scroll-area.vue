<template>
  <div class="component-page">
    <div class="page-header">
      <h1 class="page-title">Scroll Area</h1>
      <p class="page-description">Augments native scroll functionality for custom, cross-browser styling.</p>
    </div>

    <MayaPreviewCode title="Basic Usage"
      description="Wraps your content in a container with styled scrollbars automatically injected." code="<MayaScrollArea style='height: 200px; width: 350px; border: 1px solid var(--maya-border); border-radius: var(--maya-radius-md); padding: 1rem;'>
  <div>...long content...</div>
</MayaScrollArea>">
      <template #preview>
        <div style="display: flex; align-items: center; justify-content: center; padding: 2rem;">
          <MayaScrollArea
            style="height: 200px; width: 350px; border: 1px solid var(--maya-border); border-radius: var(--maya-radius-md); padding: 1rem;">
            <div style="padding-bottom: 24px;">
              <h4 style="margin: 0 0 16px 0; font-size: 0.875rem;">Tags</h4>
              <div v-for="i in 50" :key="i"
                style="font-size: 0.875rem; border-top: 1px solid var(--maya-border); padding: 8px 0;">
                v1.0.{{ i }}-beta
              </div>
            </div>
          </MayaScrollArea>
        </div>
      </template>
    </MayaPreviewCode>
  </div>
</template>
