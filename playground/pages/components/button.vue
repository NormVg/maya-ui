<template>
  <div>
    <div class="component-header">
      <h2 class="component-title">Button</h2>
      <p class="component-desc">Triggers an action or event.</p>
    </div>

    <Showcase
      title="Variants"
      description="Primary, secondary, and ghost presets."
      :code="`<MayaBtn>Primary</MayaBtn>\n<MayaBtn variant=&quot;secondary&quot;>Secondary</MayaBtn>\n<MayaBtn variant=&quot;ghost&quot;>Ghost</MayaBtn>`"
    >
      <template #preview>
        <div style="display: flex; gap: 12px; align-items: center;">
          <MayaBtn>Primary</MayaBtn>
          <MayaBtn variant="secondary">Secondary</MayaBtn>
          <MayaBtn variant="ghost">Ghost</MayaBtn>
        </div>
      </template>
    </Showcase>

    <Showcase
      title="Sizes"
      description="Small, medium, and large."
      :code="`<MayaBtn size=&quot;sm&quot;>Small</MayaBtn>\n<MayaBtn>Default</MayaBtn>\n<MayaBtn size=&quot;lg&quot;>Large</MayaBtn>`"
    >
      <template #preview>
        <div style="display: flex; gap: 12px; align-items: center;">
          <MayaBtn size="sm">Small</MayaBtn>
          <MayaBtn>Default</MayaBtn>
          <MayaBtn size="lg">Large</MayaBtn>
        </div>
      </template>
    </Showcase>

    <Showcase
      title="Disabled"
      description="Buttons can be disabled."
      :code="`<MayaBtn disabled>Disabled</MayaBtn>\n<MayaBtn variant=&quot;secondary&quot; disabled>Disabled</MayaBtn>`"
    >
      <template #preview>
        <div style="display: flex; gap: 12px; align-items: center;">
          <MayaBtn disabled>Disabled</MayaBtn>
          <MayaBtn variant="secondary" disabled>Disabled</MayaBtn>
        </div>
      </template>
    </Showcase>
  </div>
</template>
