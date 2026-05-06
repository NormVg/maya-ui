<template>
  <div class="component-page">
    <div class="page-header">
      <h1 class="page-title">Breadcrumb</h1>
      <p class="page-description">Displays the path to the current resource using a hierarchy of links.</p>
    </div>

    <MayaPreviewCode title="Basic Usage (Array)"
      description="You can quickly generate breadcrumbs by passing an array of items." code='<MayaBreadcrumb :items="[
  { label: &quot;Home&quot;, href: &quot;/&quot; },
  { label: &quot;Components&quot;, href: &quot;/components&quot; },
  { label: &quot;Breadcrumb&quot; }
]" />'>
      <template #preview>
        <MayaBreadcrumb :items="[
          { label: 'Home', href: '/' },
          { label: 'Components', href: '/components' },
          { label: 'Breadcrumb' }
        ]" />
      </template>
    </MayaPreviewCode>

    <MayaPreviewCode title="Custom Composition"
      description="You can also manually build the breadcrumb using standard HTML slots to inject custom links, dropdowns, or routing components."
      code='<MayaBreadcrumb>
  <li class="maya-breadcrumb-item">
    <a href="#" class="maya-breadcrumb-link">Dashboard</a>
  </li>
  <li role="presentation" aria-hidden="true" class="maya-breadcrumb-separator">/</li>
  <li class="maya-breadcrumb-item">
    <span class="maya-breadcrumb-page" aria-current="page">Analytics</span>
  </li>
</MayaBreadcrumb>'>
      <template #preview>
        <MayaBreadcrumb>
          <li class="maya-breadcrumb-item">
            <a href="#" class="maya-breadcrumb-link">Dashboard</a>
          </li>
          <li role="presentation" aria-hidden="true" class="maya-breadcrumb-separator">/</li>
          <li class="maya-breadcrumb-item">
            <span class="maya-breadcrumb-page" aria-current="page">Analytics</span>
          </li>
        </MayaBreadcrumb>
      </template>
    </MayaPreviewCode>

    <!-- API Reference -->
    <ApiTable title="MayaBreadcrumb API" :propsList="breadcrumbProps" />
  </div>
</template>

<script setup>
import ApiTable from '~/components/ApiTable.vue'

const breadcrumbProps = [
  { name: 'items', type: 'Array', default: 'null', description: 'Optional array of items { label, href }. If null, relies on default slot content.' },
  { name: '#default', type: 'Slot', default: '—', description: 'If items array is not used, provide list items here.' },
  { name: '#separator', type: 'Slot', default: '—', description: 'Customize the separator between breadcrumb items.' }
]
</script>
