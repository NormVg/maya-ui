<template>
  <div class="page-container">
    <div class="page-header">
      <h1 class="page-title">Toast / Sonner</h1>
      <p class="page-desc">
        A stacked, animated notification system that queues messages using playful, bouncy springs.
      </p>
    </div>

    <MayaPreviewCode title="Trigger Types"
      description="Programmatically invoke toast notifications with semantic intents and custom actions." lang="vue"
      :code="triggersCode">
      <template #preview>
        <div class="btn-grid">
          <MayaBtn @click="spawnToast('default')">Add Default</MayaBtn>
          <MayaBtn intent="success" @click="spawnToast('success')">Add Success</MayaBtn>
          <MayaBtn intent="warning" @click="spawnToast('warning')">Add Warning</MayaBtn>
          <MayaBtn intent="danger" @click="spawnToast('danger')">Add Danger</MayaBtn>
          <MayaBtn intent="info" @click="spawnToast('info')">Add Info</MayaBtn>
          <MayaBtn variant="outline" @click="spawnWithAction">With Action</MayaBtn>
        </div>
      </template>
    </MayaPreviewCode>

    <ApiTable 
      title="useToast() API" 
      description="Properties accepted by the toast() function options object."
      :propsList="toastOptions"
    />
  </div>
</template>

<script setup>
import ApiTable from '~/components/ApiTable.vue'

useSeoMeta({
  title: 'Toast — Maya UI',
  description: 'Premium toast notifications with stacking logic and smooth exit animations.',
})

defineOgImage('OgImageMaya', {
  title: 'Toast Component',
  description: 'Elegant notifications that stack beautifully.',
})
import { SparklesIcon, CheckCircleIcon, AlertTriangleIcon, AlertOctagonIcon, InfoIcon, BellIcon } from 'lucide-vue-next'

const { toast } = useToast()

const intents = {
  default: {
    title: 'Notification',
    desc: 'Someone sent you a message.',
    icon: BellIcon
  },
  success: {
    title: 'Changes Saved',
    desc: 'Your profile has been updated successfully.',
    icon: CheckCircleIcon
  },
  warning: {
    title: 'Almost out of space',
    desc: 'You have less than 5GB remaining.',
    icon: AlertTriangleIcon
  },
  danger: {
    title: 'Delete failed',
    desc: 'We could not remove that item. Try again.',
    icon: AlertOctagonIcon
  },
  info: {
    title: 'New Version',
    desc: 'Maya UI v2.0 is highly responsive.',
    icon: InfoIcon
  }
}

function spawnToast(intentStr) {
  const data = intents[intentStr]
  toast({
    title: data.title,
    description: data.desc,
    intent: intentStr,
    icon: data.icon,
    duration: 4000
  })
}

function spawnWithAction() {
  toast({
    title: 'Update Available',
    description: 'A new version of this page is available.',
    intent: 'info',
    icon: SparklesIcon,
    duration: 10000,
    action: {
      label: 'Reload',
      onClick: () => { window.location.reload() }
    }
  })
}

const triggersCode = `
<script setup>
const { toast } = useToast()

function spawnWithAction() {
  toast({
    title: 'Update Available',
    description: 'A new version of this page is available.',
    intent: 'info',
    icon: SparklesIcon,
    duration: 10000,
    action: {
      label: 'Reload',
      onClick: () => { window.location.reload() }
    }
  })
}
<\/script>

<template>
  <MayaBtn variant="outline" @click="spawnWithAction">With Action</MayaBtn>
</template>
`.trim()

const toastOptions = [
  { name: 'title', type: 'string', default: "''", description: 'The main heading text of the toast.' },
  { name: 'description', type: 'string', default: "''", description: 'Secondary descriptive text below the title.' },
  { name: 'intent', type: 'string', default: "'default'", description: "The visual semantic intent: 'default', 'success', 'warning', 'danger', or 'info'." },
  { name: 'icon', type: 'Component', default: 'undefined', description: 'A Vue component (like a Lucide icon) to render alongside the text.' },
  { name: 'duration', type: 'number', default: '4000', description: 'Time in milliseconds before the toast auto-dismisses.' },
  { name: 'action', type: 'object', default: 'undefined', description: 'An object containing { label: string, onClick: Function } to render an action button.' }
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

.btn-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
  gap: 16px;
}
</style>
