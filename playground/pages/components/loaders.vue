<template>
  <div>
    <div class="component-header">
      <h2 class="component-title">Loaders</h2>
      <p class="component-desc">Visual feedback during async operations. Spinner, Skeleton, and Loading Dots.</p>
    </div>

    <MayaPreviewCode title="Spinner" description="SVG rotating ring. Sizes and semantic intent colors.">
      <template #preview>
        <div class="row wrap align-center">
          <MayaSpinner size="sm" />
          <MayaSpinner size="md" />
          <MayaSpinner size="lg" />
          <MayaSeparator orientation="vertical" />
          <MayaSpinner size="md" intent="success" />
          <MayaSpinner size="md" intent="warning" />
          <MayaSpinner size="md" intent="danger" />
          <MayaSpinner size="md" intent="info" />
        </div>
      </template>
    </MayaPreviewCode>

    <MayaPreviewCode title="Skeleton" description="Shimmer placeholder for loading states. Matches real content shape.">
      <template #preview>
        <div class="col" style="width: 100%; max-width: 340px;">
          <div class="row align-center" style="gap: 12px;">
            <MayaSkeleton width="40px" height="40px" rounded="full" />
            <div class="col" style="flex: 1; gap: 6px;">
              <MayaSkeleton width="60%" height="14px" rounded="md" />
              <MayaSkeleton width="90%" height="12px" rounded="md" />
            </div>
          </div>
          <MayaSkeleton width="100%" height="80px" rounded="lg" />
          <MayaSkeleton width="40%" height="12px" rounded="md" />
        </div>
      </template>
    </MayaPreviewCode>

    <MayaPreviewCode title="Loading Dots" description="Three bouncing dots with staggered timing.">
      <template #preview>
        <div class="row wrap align-center">
          <MayaLoadingDots size="sm" />
          <MayaLoadingDots size="md" />
          <MayaLoadingDots size="lg" />
          <MayaSeparator orientation="vertical" />
          <MayaBtn variant="secondary" size="sm" disabled>
            <MayaLoadingDots size="sm" /> Saving...
          </MayaBtn>
        </div>
      </template>
    </MayaPreviewCode>
  </div>
</template>

<style scoped>
.row {
  display: flex;
  gap: 12px;
}

.row.wrap {
  flex-wrap: wrap;
}

.row.align-center {
  align-items: center;
}

.col {
  display: flex;
  flex-direction: column;
}
</style>
