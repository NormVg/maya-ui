<template>
  <div class="page-container">
    <div class="page-header">
      <h1 class="page-title">Empty State</h1>
      <p class="page-desc">
        A container displaying zero-data states, featuring a bouncy entrance animation and desaturated iconography.
      </p>
    </div>

    <MayaPreviewCode title="Default Usage"
      description="The standard empty state with an icon, title, description, and action button." lang="vue"
      :code="defaultCode">
      <template #preview>
        <MayaEmptyState :icon="InboxIcon" title="No messages yet"
          description="When you receive new messages, they will appear here. Start a conversation to get started.">
          <MayaBtn :icon="PlusIcon">New Message</MayaBtn>
        </MayaEmptyState>
      </template>
    </MayaPreviewCode>

    <MayaPreviewCode title="Action Variants"
      description="Empty states usually guide the user with a primary recovery action." lang="vue" :code="actionCode">
      <template #preview>
        <MayaEmptyState :icon="SearchIcon" title="No results found"
          description="We couldn't find anything matching your search. Try adjusting your filters.">
          <MayaBtn variant="outline">Clear Filters</MayaBtn>
        </MayaEmptyState>
      </template>
    </MayaPreviewCode>

    <MayaPreviewCode title="Minimal" description="A minimal state without action buttons or verbose descriptions."
      lang="vue" :code="minimalCode">
      <template #preview>
        <MayaEmptyState :icon="FolderOpenIcon" title="Empty Directory" description="" />
      </template>
    </MayaPreviewCode>

    <ApiTable 
      title="Empty State API"
      description="Properties and slots for the EmptyState component."
      :propsList="emptyStateProps"
      :slotsList="emptyStateSlots"
    />
  </div>
</template>

<script setup>
import { InboxIcon, PlusIcon, SearchIcon, FolderOpenIcon } from 'lucide-vue-next'

const defaultCode = `
<template>
  <MayaEmptyState :icon="InboxIcon" title="No messages yet" description="When you receive new messages, they will appear here. Start a conversation to get started.">
    <MayaBtn :icon="PlusIcon">New Message</MayaBtn>
  </MayaEmptyState>
</template>
`.trim()

const actionCode = `
<template>
  <MayaEmptyState :icon="SearchIcon" title="No results found" description="We couldn't find anything matching your search. Try adjusting your filters.">
    <MayaBtn variant="outline">Clear Filters</MayaBtn>
  </MayaEmptyState>
</template>
`.trim()

const minimalCode = `
<template>
  <MayaEmptyState :icon="FolderOpenIcon" title="Empty Directory" description="" />
</template>
`.trim()

const emptyStateProps = [
  { name: 'title', type: 'string', default: "'No items found'", description: 'The primary title text.' },
  { name: 'description', type: 'string', default: "'There is nothing to display here right now.'", description: 'A secondary description text.' },
  { name: 'icon', type: 'Component | String', default: 'null', description: 'Icon component or string to display.' }
]

const emptyStateSlots = [
  { name: 'icon', description: 'Slot for a custom icon or image.' },
  { name: 'title', description: 'Slot for custom title content.' },
  { name: 'description', description: 'Slot for custom description content.' },
  { name: 'default', description: 'Slot for actions (e.g. buttons) below the description.' }
]
</script>

<style scoped>
.page-container {
  max-width: 800px;
  margin: 0 auto;
}

.page-header {
  margin-bottom: 48px;
}

.page-title {
  font-size: 2rem;
  font-weight: 600;
  color: var(--maya-text-primary);
  margin-bottom: 12px;
  letter-spacing: -0.02em;
}

.page-desc {
  font-size: 1.125rem;
  color: var(--maya-text-secondary);
  line-height: 1.6;
}

.showcase-section {
  margin-bottom: 48px;
}

.section-title {
  font-size: 1.125rem;
  font-weight: 500;
  color: var(--maya-text-primary);
  margin-bottom: 16px;
}

.demo-card {
  padding: 32px;
}
</style>
