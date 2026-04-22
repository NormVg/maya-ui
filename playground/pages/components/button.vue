<template>
  <div>
    <div class="component-header">
      <h2 class="component-title">Button</h2>
      <p class="component-desc">The primary interactive element. Supports variants and semantic intent colors.</p>
    </div>

    <Showcase title="Variants" description="primary, secondary, ghost — the shape of the interaction.">
      <template #preview>
        <div class="row">
          <MayaBtn variant="primary">Primary</MayaBtn>
          <MayaBtn variant="secondary">Secondary</MayaBtn>
          <MayaBtn variant="ghost">Ghost</MayaBtn>
        </div>
      </template>
    </Showcase>

    <Showcase title="Intent — Primary" description="primary variant across all semantic meanings.">
      <template #preview>
        <div class="row wrap">
          <MayaBtn variant="primary">Default</MayaBtn>
          <MayaBtn variant="primary" intent="success">Success</MayaBtn>
          <MayaBtn variant="primary" intent="warning">Warning</MayaBtn>
          <MayaBtn variant="primary" intent="danger">Danger</MayaBtn>
          <MayaBtn variant="primary" intent="info">Info</MayaBtn>
        </div>
      </template>
    </Showcase>

    <Showcase title="Intent — Secondary" description="secondary variant with semantic intent.">
      <template #preview>
        <div class="row wrap">
          <MayaBtn variant="secondary">Default</MayaBtn>
          <MayaBtn variant="secondary" intent="success">Success</MayaBtn>
          <MayaBtn variant="secondary" intent="warning">Warning</MayaBtn>
          <MayaBtn variant="secondary" intent="danger">Danger</MayaBtn>
          <MayaBtn variant="secondary" intent="info">Info</MayaBtn>
        </div>
      </template>
    </Showcase>

    <Showcase title="Intent — Ghost" description="ghost variant with semantic intent.">
      <template #preview>
        <div class="row wrap">
          <MayaBtn variant="ghost">Default</MayaBtn>
          <MayaBtn variant="ghost" intent="success">Success</MayaBtn>
          <MayaBtn variant="ghost" intent="warning">Warning</MayaBtn>
          <MayaBtn variant="ghost" intent="danger">Danger</MayaBtn>
          <MayaBtn variant="ghost" intent="info">Info</MayaBtn>
        </div>
      </template>
    </Showcase>

    <Showcase title="Sizes" description="sm, md, lg.">
      <template #preview>
        <div class="row align-center">
          <MayaBtn size="sm">Small</MayaBtn>
          <MayaBtn size="md">Medium</MayaBtn>
          <MayaBtn size="lg">Large</MayaBtn>
        </div>
      </template>
    </Showcase>

    <Showcase title="Disabled" description="Disabled state across variants.">
      <template #preview>
        <div class="row">
          <MayaBtn variant="primary" disabled>Primary</MayaBtn>
          <MayaBtn variant="secondary" disabled>Secondary</MayaBtn>
          <MayaBtn variant="ghost" disabled>Ghost</MayaBtn>
        </div>
      </template>
    </Showcase>
  </div>
</template>

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
