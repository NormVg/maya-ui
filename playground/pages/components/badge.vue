<template>
  <div>
    <div class="component-header">
      <h2 class="component-title">Badge</h2>
      <p class="component-desc">Inline label chip for status, tags, and counts. Three rendering modes × five semantic
        intents.</p>
    </div>

    <MayaPreviewCode title="Soft (default)" description="Muted bg + border + text. The standard alert chip pattern.">
      <template #preview>
        <div class="row wrap">
          <MayaBadge variant="soft">Default</MayaBadge>
          <MayaBadge variant="soft" intent="success">Success</MayaBadge>
          <MayaBadge variant="soft" intent="warning">Warning</MayaBadge>
          <MayaBadge variant="soft" intent="danger">Danger</MayaBadge>
          <MayaBadge variant="soft" intent="info">Info</MayaBadge>
        </div>
      </template>
    </MayaPreviewCode>

    <MayaPreviewCode title="Solid" description="Filled background — use for high-contrast counts or labels.">
      <template #preview>
        <div class="row wrap">
          <MayaBadge variant="solid">Default</MayaBadge>
          <MayaBadge variant="solid" intent="success">Success</MayaBadge>
          <MayaBadge variant="solid" intent="warning">Warning</MayaBadge>
          <MayaBadge variant="solid" intent="danger">Danger</MayaBadge>
          <MayaBadge variant="solid" intent="info">Info</MayaBadge>
        </div>
      </template>
    </MayaPreviewCode>

    <MayaPreviewCode title="Outline" description="Transparent bg with colored border.">
      <template #preview>
        <div class="row wrap">
          <MayaBadge variant="outline">Default</MayaBadge>
          <MayaBadge variant="outline" intent="success">Success</MayaBadge>
          <MayaBadge variant="outline" intent="warning">Warning</MayaBadge>
          <MayaBadge variant="outline" intent="danger">Danger</MayaBadge>
          <MayaBadge variant="outline" intent="info">Info</MayaBadge>
        </div>
      </template>
    </MayaPreviewCode>

    <MayaPreviewCode title="With Dot" description="Status dot for live/active indicators.">
      <template #preview>
        <div class="row wrap">
          <MayaBadge variant="soft" intent="success" dot>Online</MayaBadge>
          <MayaBadge variant="soft" intent="warning" dot>Away</MayaBadge>
          <MayaBadge variant="soft" intent="danger" dot>Busy</MayaBadge>
          <MayaBadge variant="soft" dot>Offline</MayaBadge>
        </div>
      </template>
    </MayaPreviewCode>
  </div>
</template>

<style scoped>
.row {
  display: flex;
  align-items: center;
  gap: 8px;
}

.row.wrap {
  flex-wrap: wrap;
}
</style>
