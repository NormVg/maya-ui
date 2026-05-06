<template>
  <div>
    <div class="component-header">
      <h2 class="component-title">Popover</h2>
      <p class="component-desc">Rich click-triggered overlay for contextual controls and compact forms.</p>
    </div>

    <MayaPreviewCode
      title="Basic Popover"
      description="Click the trigger to open and interact with the content."
      :code='`<MayaPopover align="bottom-start">
  <template #trigger>
    <MayaBtn variant="secondary">Share</MayaBtn>
  </template>

  <div class="popover-content">
    <p class="popover-title">Share this page</p>
    <p class="popover-desc">Copy the link or invite collaborators.</p>
    <div class="popover-row">
      <MayaInput model-value="https://maya-ui.dev/docs" readonly />
      <MayaBtn size="sm">Copy</MayaBtn>
    </div>
  </div>
</MayaPopover>`'
    >
      <template #preview>
        <MayaPopover align="bottom-start">
          <template #trigger>
            <MayaBtn variant="secondary">Share</MayaBtn>
          </template>
          <div class="popover-content">
            <p class="popover-title">Share this page</p>
            <p class="popover-desc">Copy the link or invite collaborators.</p>
            <div class="popover-row">
              <MayaInput model-value="https://maya-ui.dev/docs" readonly />
              <MayaBtn size="sm">Copy</MayaBtn>
            </div>
          </div>
        </MayaPopover>
      </template>
    </MayaPreviewCode>

    <MayaPreviewCode
      title="Top Aligned"
      description="Use top alignment for triggers near viewport bottom."
      :code='`<MayaPopover align="top-end">
  <template #trigger>
    <MayaBtn>Quick Actions</MayaBtn>
  </template>

  <div class="action-grid">
    <MayaBtn variant="ghost" size="sm">Duplicate</MayaBtn>
    <MayaBtn variant="ghost" size="sm">Archive</MayaBtn>
    <MayaBtn variant="ghost" size="sm">Export</MayaBtn>
    <MayaBtn variant="ghost" size="sm">Delete</MayaBtn>
  </div>
</MayaPopover>`'
    >
      <template #preview>
        <MayaPopover align="top-end">
          <template #trigger>
            <MayaBtn>Quick Actions</MayaBtn>
          </template>
          <div class="action-grid">
            <MayaBtn variant="ghost" size="sm">Duplicate</MayaBtn>
            <MayaBtn variant="ghost" size="sm">Archive</MayaBtn>
            <MayaBtn variant="ghost" size="sm">Export</MayaBtn>
            <MayaBtn variant="ghost" size="sm">Delete</MayaBtn>
          </div>
        </MayaPopover>
      </template>
    </MayaPreviewCode>
    
    <!-- API Reference -->
    <ApiTable 
      title="Popover API" 
      description="Props and slots from Popover.vue source."
      :propsList="popoverProps"
      :slotsList="popoverSlots"
    />
  </div>
</template>

<script setup>
const popoverProps = [
  { name: 'align', type: 'string', default: "'bottom-start'", description: "Controls the alignment and placement of the popover relative to the trigger. One of 'bottom-start' | 'bottom-center' | 'bottom-end' | 'top-start' | 'top-center' | 'top-end'." },
  { name: 'ariaLabel', type: 'string', default: "'Popover'", description: 'Accessibility label for the popover dialog.' }
]

const popoverSlots = [
  { name: 'trigger', description: 'The element that toggles the popover when clicked (e.g. a button).' },
  { name: 'default', description: 'The main content of the popover.' }
]
</script>

<style scoped>
.popover-content {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.popover-title {
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--maya-text-primary);
}

.popover-desc {
  font-size: 0.8125rem;
  color: var(--maya-text-secondary);
}

.popover-row {
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 8px;
  align-items: center;
}

.action-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(100px, 1fr));
  gap: 6px;
}
</style>
