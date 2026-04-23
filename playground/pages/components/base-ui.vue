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
      description="Render keyboard shortcuts with physical key styling. Click the ⌘K key to see the triggered glow.">
      <template #preview>
        <div class="row wrap">
          <MayaKbd>⌘</MayaKbd>
          <MayaKbd>⌘K</MayaKbd>
          <MayaKbd>Ctrl</MayaKbd>
          <MayaKbd>Enter</MayaKbd>
          <MayaKbd>Shift</MayaKbd>
          <MayaKbd>Esc</MayaKbd>
          <MayaKbd>Tab</MayaKbd>
        </div>
        <div style="margin-top: 16px;">
          <span style="color: var(--maya-text-secondary); font-size: 0.8125rem;">Press
            <span @click="triggerDemo" style="cursor: pointer;">
              <MayaKbd :triggered="kbdTriggered">⌘K</MayaKbd>
            </span>
            to open command palette
          </span>
        </div>
      </template>
    </MayaPreviewCode>
  </div>
</template>


<script setup>
import { ref } from 'vue'

const kbdTriggered = ref(false)

function triggerDemo() {
  kbdTriggered.value = true
  setTimeout(() => { kbdTriggered.value = false }, 300)
}
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
