<template>
  <div class="page-container">
    <div class="page-header">
      <h1 class="page-title">Show More</h1>
      <p class="page-desc">Truncates long content with an expandable toggle button.</p>
    </div>

    <MayaPreviewCode title="Usage" description="Wrap long text or content blocks in a ShowMore component." lang="vue" :code="code">
      <template #preview>
        <div style="width: 100%; max-width: 500px; padding: 24px; border: 1px solid var(--maya-border); border-radius: var(--maya-radius-lg); background: var(--maya-bg-surface);">
          <MayaShowMore maxHeight="80px">
            <p style="margin: 0 0 12px; line-height: 1.6;">
              Maya UI is a premium component library. It provides beautiful, handcrafted components that work flawlessly in Nuxt environments out of the box. Every detail is meticulously designed.
            </p>
            <p style="margin: 0; line-height: 1.6;">
              The components are completely customizable using native CSS variables. We prefer standard, semantic CSS over utility classes to give you absolute control without the clutter. This means you can integrate Maya into any architecture seamlessly.
            </p>
          </MayaShowMore>
        </div>
      </template>
    </MayaPreviewCode>

    <ApiTable 
      title="ShowMore API" 
      description="Properties for the ShowMore component."
      :propsList="[
        { name: 'maxHeight', type: 'string', default: '120px', description: 'The height at which the content will be truncated.' },
        { name: 'labelShow', type: 'string', default: 'Show more', description: 'Button text when collapsed.' },
        { name: 'labelHide', type: 'string', default: 'Show less', description: 'Button text when expanded.' }
      ]"
    />
  </div>
</template>

<script setup>
import ApiTable from '~/components/ApiTable.vue'

const code = `<MayaShowMore maxHeight="80px" labelShow="Read more" labelHide="Read less">
  <p>Very long text goes here...</p>
  <p>Even more text...</p>
</MayaShowMore>`
</script>
