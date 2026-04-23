<template>
  <div>
    <div class="component-header">
      <h2 class="component-title">Loaders</h2>
      <p class="component-desc">Visual feedback during async operations. Spinner, Skeleton, and Loading Dots.</p>
    </div>

    <MayaPreviewCode title="Spinner" description="SVG rotating ring. Sizes and semantic intent colors."
      :code="spinnerCode">
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

    <MayaPreviewCode title="Skeleton" description="Shimmer placeholder for loading states. Matches real content shape."
      :code="skeletonCode">
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

    <MayaPreviewCode title="Loading Dots" description="Three bouncing dots with staggered timing." :code="dotsCode">
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

    <MayaPreviewCode title="Pixel Loader" description="Animated 4x4 pixel grids with multiple pattern variants."
      :code="pixelCode">
      <template #preview>
        <div class="row wrap align-center"
          style="gap: 32px; background-color: var(--maya-bg-raised); padding: 32px; border-radius: var(--maya-radius-md);">
          <div class="col group">
            <MayaPixelLoader variant="pulse" size="md" /><span>Pulse</span>
          </div>
          <div class="col group">
            <MayaPixelLoader variant="wave" size="md" /><span>Wave</span>
          </div>
          <div class="col group">
            <MayaPixelLoader variant="glitch" size="md" /><span>Glitch</span>
          </div>
          <div class="col group">
            <MayaPixelLoader variant="snake" size="md" /><span>Snake</span>
          </div>
        </div>
      </template>
    </MayaPreviewCode>

    <MayaPreviewCode title="Dot Orbit (3D)" description="Elegant rotational dots using 3D CSS perspective transforms."
      :code="orbitCode">
      <template #preview>
        <div class="row wrap align-center">
          <MayaDotOrbit />
        </div>
      </template>
    </MayaPreviewCode>
  </div>
</template>

<script setup>
const spinnerCode = `
<template>
  <MayaSpinner size="sm" />
  <MayaSpinner size="md" />
  <MayaSpinner size="lg" />

  <MayaSpinner size="md" intent="success" />
  <MayaSpinner size="md" intent="warning" />
  <MayaSpinner size="md" intent="danger" />
  <MayaSpinner size="md" intent="info" />
</template>
`.trim()

const skeletonCode = `
<template>
  <div class="row align-center" style="gap: 12px;">
    <MayaSkeleton width="40px" height="40px" rounded="full" />
    <div class="col" style="flex: 1; gap: 6px;">
      <MayaSkeleton width="60%" height="14px" rounded="md" />
      <MayaSkeleton width="90%" height="12px" rounded="md" />
    </div>
  </div>
  <MayaSkeleton width="100%" height="80px" rounded="lg" />
</template>
`.trim()

const dotsCode = `
<template>
  <MayaLoadingDots size="sm" />
  <MayaLoadingDots size="md" />
  <MayaLoadingDots size="lg" />

  <MayaBtn variant="secondary" size="sm" disabled>
    <MayaLoadingDots size="sm" /> Saving...
  </MayaBtn>
</template>
`.trim()

const pixelCode = `
<template>
  <MayaPixelLoader variant="pulse" size="md" />
  <MayaPixelLoader variant="wave" size="md" />
  <MayaPixelLoader variant="glitch" size="md" />
  <MayaPixelLoader variant="snake" size="md" />
</template>
`.trim()

const orbitCode = `
<template>
  <MayaDotOrbit />
</template>
`.trim()
</script>

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
