<template>
  <div class="component-page">
    <div class="page-header">
      <h1 class="page-title">Resizable</h1>
      <p class="page-description">Accessible resizable panel groups and layouts utilizing blazing-fast native CSS resize
        semantics.</p>
    </div>

    <MayaPreviewCode title="Basic Usage"
      description="Wrap any content in a MayaResizable component. Drag the bottom-right corner to resize." code="<MayaResizable style='display: flex; align-items: center; justify-content: center; min-width: 200px; min-height: 200px;'>
  <span style='font-weight: 500'>Resizable Content</span>
</MayaResizable>">
      <template #preview>
        <div style="display: flex; align-items: center; justify-content: center; padding: 2rem; min-height: 400px;">
          <MayaResizable
            style="display: flex; align-items: center; justify-content: center; width: 250px; height: 250px;">
            <span style="font-weight: 500">Resizable Component</span>
          </MayaResizable>
        </div>
      </template>
    </MayaPreviewCode>

    <!-- API Reference -->
    <ApiTable 
      title="Resizable API" 
      description="Props for MayaResizable."
      :propsList="resizableProps"
    />
  </div>
</template>

<script setup>
const resizableProps = [
  { name: 'minWidth', type: 'string', default: "'180px'", description: 'Minimum width allowed for the container.' },
  { name: 'minHeight', type: 'string', default: "'120px'", description: 'Minimum height allowed for the container.' },
  { name: 'maxWidth', type: 'string', default: "'100%'", description: 'Maximum width allowed for the container.' },
  { name: 'maxHeight', type: 'string', default: "'100%'", description: 'Maximum height allowed for the container.' }
]
</script>
