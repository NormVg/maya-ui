<template>
  <div>
    <div class="component-header">
      <h2 class="component-title">Base UI</h2>
      <p class="component-desc">Foundational building blocks — Label, Separator, and Kbd.</p>
    </div>

    <MayaPreviewCode title="Label" description="Accessible form label with required indicator and hint text.">
      <template #preview>
        <div class="col">
          <MayaLabel>Default Label</MayaLabel>
          <MayaLabel required>Required Field</MayaLabel>
          <MayaLabel hint="(optional)">Label with hint</MayaLabel>
          <MayaLabel disabled>Disabled Label</MayaLabel>
        </div>
      </template>
    </MayaPreviewCode>

    <MayaPreviewCode title="Separator — Horizontal" description="Dashed horizontal divider with optional center label.">
      <template #preview>
        <div style="width: 100%; display: flex; flex-direction: column; gap: 24px;">
          <MayaSeparator />
          <MayaSeparator label="or continue with" />
        </div>
      </template>
    </MayaPreviewCode>

    <MayaPreviewCode title="Separator — Vertical" description="Inline vertical divider for toolbars and button rows.">
      <template #preview>
        <div style="display: flex; align-items: center; gap: 12px; height: 32px;">
          <span style="color: var(--maya-text-secondary); font-size: 0.8125rem;">File</span>
          <MayaSeparator orientation="vertical" />
          <span style="color: var(--maya-text-secondary); font-size: 0.8125rem;">Edit</span>
          <MayaSeparator orientation="vertical" />
          <span style="color: var(--maya-text-secondary); font-size: 0.8125rem;">View</span>
        </div>
      </template>
    </MayaPreviewCode>

    <MayaPreviewCode title="Kbd — Keyboard Keys"
      description="Physical key styling for shortcuts. Add a 'shortcut' prop to autonomously listen for hotkeys and emit '@trigger'.">
      <template #preview>
        <div
          style="padding: 16px; border: 1px solid var(--maya-border); border-radius: var(--maya-radius-md); text-align: center;">
          <p style="color: var(--maya-text-secondary); font-size: 0.8125rem; margin-bottom: 8px;">
            Press <MayaKbd shortcut="meta+j" @trigger="triggerCount++">⌘J</MayaKbd> anywhere on this page
          </p>
          <p
            style="color: var(--maya-text-primary); font-size: 1.25rem; font-weight: 600; font-variant-numeric: tabular-nums;">
            {{ triggerCount }}
          </p>
        </div>
      </template>
    </MayaPreviewCode>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const triggerCount = ref(0)
</script>

<style scoped>
.col {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.row {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
}
</style>
