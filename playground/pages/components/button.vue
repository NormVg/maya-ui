<template>
  <div>
    <div class="component-header">
      <h2 class="component-title">Button</h2>
      <p class="component-desc">The primary interactive element. Supports variants and semantic intent colors.</p>
    </div>

    <MayaPreviewCode title="Variants" description="primary, secondary, ghost — the shape of the interaction." lang="vue"
      :code="variantsCode">
      <template #preview>
        <div class="row">
          <MayaBtn variant="primary">Primary</MayaBtn>
          <MayaBtn variant="secondary">Secondary</MayaBtn>
          <MayaBtn variant="ghost">Ghost</MayaBtn>
        </div>
      </template>
    </MayaPreviewCode>

    <MayaPreviewCode title="Intent — Primary" description="primary variant across all semantic meanings." lang="vue"
      :code="intentPrimaryCode">
      <template #preview>
        <div class="row wrap">
          <MayaBtn variant="primary">Default</MayaBtn>
          <MayaBtn variant="primary" intent="success">Success</MayaBtn>
          <MayaBtn variant="primary" intent="warning">Warning</MayaBtn>
          <MayaBtn variant="primary" intent="danger">Danger</MayaBtn>
          <MayaBtn variant="primary" intent="info">Info</MayaBtn>
        </div>
      </template>
    </MayaPreviewCode>

    <MayaPreviewCode title="Intent — Secondary" description="secondary variant with semantic intent." lang="vue"
      :code="intentSecondaryCode">
      <template #preview>
        <div class="row wrap">
          <MayaBtn variant="secondary">Default</MayaBtn>
          <MayaBtn variant="secondary" intent="success">Success</MayaBtn>
          <MayaBtn variant="secondary" intent="warning">Warning</MayaBtn>
          <MayaBtn variant="secondary" intent="danger">Danger</MayaBtn>
          <MayaBtn variant="secondary" intent="info">Info</MayaBtn>
        </div>
      </template>
    </MayaPreviewCode>

    <MayaPreviewCode title="Intent — Ghost" description="ghost variant with semantic intent." lang="vue"
      :code="intentGhostCode">
      <template #preview>
        <div class="row wrap">
          <MayaBtn variant="ghost">Default</MayaBtn>
          <MayaBtn variant="ghost" intent="success">Success</MayaBtn>
          <MayaBtn variant="ghost" intent="warning">Warning</MayaBtn>
          <MayaBtn variant="ghost" intent="danger">Danger</MayaBtn>
          <MayaBtn variant="ghost" intent="info">Info</MayaBtn>
        </div>
      </template>
    </MayaPreviewCode>

    <MayaPreviewCode title="Sizes" description="sm, md, lg." lang="vue" :code="sizesCode">
      <template #preview>
        <div class="row align-center">
          <MayaBtn size="sm">Small</MayaBtn>
          <MayaBtn size="md">Medium</MayaBtn>
          <MayaBtn size="lg">Large</MayaBtn>
        </div>
      </template>
    </MayaPreviewCode>

    <MayaPreviewCode title="Disabled" description="Disabled state across variants." lang="vue" :code="disabledCode">
      <template #preview>
        <div class="row">
          <MayaBtn variant="primary" disabled>Primary</MayaBtn>
          <MayaBtn variant="secondary" disabled>Secondary</MayaBtn>
          <MayaBtn variant="ghost" disabled>Ghost</MayaBtn>
        </div>
      </template>
    </MayaPreviewCode>
  </div>
</template>

<script setup>
const variantsCode = `<MayaBtn variant="primary">Primary</MayaBtn>
<MayaBtn variant="secondary">Secondary</MayaBtn>
<MayaBtn variant="ghost">Ghost</MayaBtn>`

const intentPrimaryCode = `<MayaBtn variant="primary" intent="success">Success</MayaBtn>
<MayaBtn variant="primary" intent="warning">Warning</MayaBtn>
<MayaBtn variant="primary" intent="danger">Danger</MayaBtn>
<MayaBtn variant="primary" intent="info">Info</MayaBtn>`

const intentSecondaryCode = `<MayaBtn variant="secondary" intent="success">Success</MayaBtn>
<MayaBtn variant="secondary" intent="danger">Danger</MayaBtn>`

const intentGhostCode = `<MayaBtn variant="ghost" intent="success">Success</MayaBtn>
<MayaBtn variant="ghost" intent="danger">Danger</MayaBtn>`

const sizesCode = `<MayaBtn size="sm">Small</MayaBtn>
<MayaBtn size="md">Medium</MayaBtn>
<MayaBtn size="lg">Large</MayaBtn>`

const disabledCode = `<MayaBtn variant="primary" disabled>Primary</MayaBtn>
<MayaBtn variant="secondary" disabled>Secondary</MayaBtn>`
</script>

<style scoped>
.row {
  display: flex;
  gap: 10px;
  align-items: flex-start;
}

.row.align-center {
  align-items: center;
}

.row.wrap {
  flex-wrap: wrap;
}
</style>
