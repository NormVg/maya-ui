<template>
  <div class="page-container">
    <div class="page-header">
      <h1 class="page-title">Aspect Ratio</h1>
      <p class="page-desc">Displays content within a desired ratio.</p>
    </div>

    <MayaPreviewCode title="Usage" description="Force content to maintain a 16:9 or 4:3 aspect ratio." lang="vue" :code="code">
      <template #preview>
        <div style="width: 100%; max-width: 400px; border: 1px dashed var(--maya-border); border-radius: var(--maya-radius-lg); overflow: hidden;">
          <MayaAspectRatio :ratio="16 / 9">
            <img src="https://images.unsplash.com/photo-1579546929518-9e396f3cc809?q=80&w=2070&auto=format&fit=crop" alt="Abstract gradient" style="object-fit: cover; width: 100%; height: 100%;" />
          </MayaAspectRatio>
        </div>
      </template>
    </MayaPreviewCode>

    <ApiTable 
      title="AspectRatio API" 
      description="Properties for the AspectRatio component."
      :propsList="[
        { name: 'ratio', type: 'number', default: '1', description: 'The desired aspect ratio (e.g. 16/9, 4/3, 1).' }
      ]"
    />
  </div>
</template>

<script setup>
import ApiTable from '~/components/ApiTable.vue'

const code = `<MayaAspectRatio :ratio="16 / 9">
  <img src="/image.jpg" alt="Description" style="object-fit: cover; width: 100%; height: 100%;" />
</MayaAspectRatio>`
</script>
