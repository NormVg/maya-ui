<template>
  <div class="page-content">
    <MayaPreviewCode
      title="Choice Box"
      description="Card-style radio group for important selections. The active card glows with the accent color and the inner dot bounces in."
      lang="vue"
      :code="choiceBoxCode"
    >
      <template #preview>
        <div style="padding: 16px; max-width: 420px;">
          <MayaChoiceBox v-model="plan">
            <MayaChoiceBoxItem value="hobby" title="Hobby" description="For personal projects and side experiments.">
              <template #icon>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 21a9 9 0 0 1-9-9c0-4.97 4.03-9 9-9"/><path d="M12 21a9 9 0 0 0 9-9c0-4.97-4.03-9-9-9"/><path d="M12 3v18"/><path d="M3 12h18"/></svg>
              </template>
            </MayaChoiceBoxItem>
            <MayaChoiceBoxItem value="pro" title="Pro" description="Ideal for freelancers and small teams shipping products.">
              <template #icon>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/></svg>
              </template>
            </MayaChoiceBoxItem>
            <MayaChoiceBoxItem value="enterprise" title="Enterprise" description="Full control, SSO, advanced audit logs, and dedicated support.">
              <template #icon>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="16" height="20" x="4" y="2" rx="2"/><path d="M9 22v-4h6v4"/><path d="M8 6h.01"/><path d="M16 6h.01"/><path d="M12 6h.01"/><path d="M12 10h.01"/><path d="M12 14h.01"/><path d="M16 10h.01"/><path d="M16 14h.01"/><path d="M8 10h.01"/><path d="M8 14h.01"/></svg>
              </template>
            </MayaChoiceBoxItem>
          </MayaChoiceBox>
          <div style="margin-top: 12px; font-size: 0.8rem; color: var(--maya-text-tertiary);">Selected: {{ plan }}</div>
        </div>
      </template>
    </MayaPreviewCode>

    <MayaPreviewCode
      title="Horizontal Layout"
      description="Choice boxes can also be laid out horizontally for comparisons on wider screens."
      lang="vue"
      :code="horizontalCode"
    >
      <template #preview>
        <div style="padding: 16px;">
          <MayaChoiceBox v-model="size" orientation="horizontal">
            <MayaChoiceBoxItem value="sm" title="Small" description="Up to 10 users" />
            <MayaChoiceBoxItem value="md" title="Medium" description="Up to 100 users" />
            <MayaChoiceBoxItem value="lg" title="Large" description="Unlimited" />
          </MayaChoiceBox>
        </div>
      </template>
    </MayaPreviewCode>
  </div>
</template>

<script setup>
import { ref } from 'vue'
const plan = ref('pro')
const size = ref('md')

const choiceBoxCode = `<MayaChoiceBox v-model="plan">
  <MayaChoiceBoxItem value="hobby" title="Hobby" description="For personal projects." />
  <MayaChoiceBoxItem value="pro" title="Pro" description="For teams shipping products." />
  <MayaChoiceBoxItem value="enterprise" title="Enterprise" description="Full control and support." />
</MayaChoiceBox>`

const horizontalCode = `<MayaChoiceBox v-model="size" orientation="horizontal">
  <MayaChoiceBoxItem value="sm" title="Small" description="Up to 10 users" />
  <MayaChoiceBoxItem value="md" title="Medium" description="Up to 100 users" />
  <MayaChoiceBoxItem value="lg" title="Large" description="Unlimited" />
</MayaChoiceBox>`
</script>

<style scoped>
.page-content { display: flex; flex-direction: column; gap: 32px; }
</style>
