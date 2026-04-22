<template>
  <div>
    <div class="component-header">
      <h2 class="component-title">Card</h2>
      <p class="component-desc">Surface container with header, body, and footer slots. Supports semantic intent for
        alert-style cards.</p>
    </div>

    <MayaPreviewCode title="Default Card">
      <template #preview>
        <div style="width: 300px;">
          <MayaCard>
            <template #header>
              <div style="display:flex; justify-content:space-between; align-items:center;">
                <strong style="font-size:0.875rem;">Project Alpha</strong>
                <MayaBadge intent="info" variant="soft" dot>Active</MayaBadge>
              </div>
            </template>
            <p style="font-size:0.8125rem; color:var(--maya-text-secondary); margin:0;">
              A surface container that holds a unit of related content.
            </p>
            <template #footer>
              <div style="display:flex; gap:8px;">
                <MayaBtn size="sm" variant="secondary">Details</MayaBtn>
                <MayaBtn size="sm" variant="primary">Open</MayaBtn>
              </div>
            </template>
          </MayaCard>
        </div>
      </template>
    </MayaPreviewCode>

    <MayaPreviewCode title="Intent Cards" description="Left-edge accent using semantic colors for alert-style usage.">
      <template #preview>
        <div class="card-grid">
          <MayaCard intent="success">
            <p style="font-size:0.8125rem; margin:0; color:var(--maya-success-text);">✓ Changes saved successfully.</p>
          </MayaCard>
          <MayaCard intent="warning">
            <p style="font-size:0.8125rem; margin:0; color:var(--maya-warning-text);">⚠ Your subscription expires in 3
              days.</p>
          </MayaCard>
          <MayaCard intent="danger">
            <p style="font-size:0.8125rem; margin:0; color:var(--maya-danger-text);">✕ Failed to connect to server.</p>
          </MayaCard>
          <MayaCard intent="info">
            <p style="font-size:0.8125rem; margin:0; color:var(--maya-info-text);">ℹ A new version is available.</p>
          </MayaCard>
        </div>
      </template>
    </MayaPreviewCode>
  </div>
</template>

<style scoped>
.card-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
  width: 100%;
}
</style>
