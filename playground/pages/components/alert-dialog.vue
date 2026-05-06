<template>
  <div class="page-container">
    <div class="page-header">
      <h1 class="page-title">Alert Dialog</h1>
      <p class="page-desc">
        A modal dialog that interrupts the user with important content and expects a response.
      </p>
    </div>

    <MayaPreviewCode title="Trigger & Display"
      description="Basic implementation using v-model to bind the dialog state." lang="vue" :code="triggerCode">
      <template #preview>
        <div>
          <MayaBtn @click="open1 = true">Show Alert</MayaBtn>
        </div>

        <MayaAlertDialog v-model:open="open1" title="Are you absolutely sure?"
          description="This action cannot be undone. This will permanently delete your account and remove your data from our servers."
          @action="handleDelete" />
      </template>
    </MayaPreviewCode>

    <MayaPreviewCode title="Custom Content & Non-dismissable"
      description="Use slots for custom HTML content and prevent clicking outside to dismiss the dialog." lang="vue"
      :code="customCode">
      <template #preview>
        <div>
          <MayaBtn variant="secondary" @click="open2 = true">Read Terms</MayaBtn>
        </div>

        <MayaAlertDialog v-model:open="open2" title="Terms of Service Updated" preventCloseOut>
          <div class="scroll-content">
            <p>Please read our updated terms of service carefully. By continuing to use our platform you agree to these
              changes.</p>
            <ul>
              <li>Data processing updates</li>
              <li>New subscription tiers</li>
              <li>Expanded API limits</li>
            </ul>
          </div>

          <template #cancel>
            <MayaBtn variant="ghost" @click="open2 = false">Decline</MayaBtn>
          </template>

          <template #action>
            <MayaBtn intent="success" @click="open2 = false">Accept & Continue</MayaBtn>
          </template>
        </MayaAlertDialog>
      </template>
    </MayaPreviewCode>
  <ApiTable
      title="AlertDialog API"
      description="Props, events, and slots from AlertDialog.vue source."
      :propsList="alertDialogProps"
      :eventsList="alertDialogEvents"
      :slotsList="alertDialogSlots"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'

const open1 = ref(false)
const open2 = ref(false)

function handleDelete() {
  alert('Account deleted!')
  open1.value = false
}

const triggerCode = `
<script setup>
import { ref } from 'vue'
const open = ref(false)
<\/script>

<template>
  <MayaBtn @click="open = true">Show Alert</MayaBtn>

  <MayaAlertDialog v-model:open="open" title="Are you absolutely sure?"
    description="This action cannot be undone. This will permanently delete your account."
    @action="open = false" />
</template>
`.trim()

const customCode = `
<script setup>
import { ref } from 'vue'
const open = ref(false)
<\/script>

<template>
  <MayaBtn variant="secondary" @click="open = true">Read Terms</MayaBtn>

  <MayaAlertDialog v-model:open="open" title="Terms of Service Updated" preventCloseOut>
    <div class="scroll-content">
      <p>Please read our updated terms of service carefully.</p>
    </div>

    <template #cancel>
      <MayaBtn variant="ghost" @click="open = false">Decline</MayaBtn>
    </template>

    <template #action>
      <MayaBtn intent="success" @click="open = false">Accept & Continue</MayaBtn>
    </template>
  </MayaAlertDialog>
</template>
`.trim()
// From AlertDialog.vue: defineProps({ open, title, description, preventCloseOut })
const alertDialogProps = [
  { name: 'open', type: 'boolean', default: 'false', description: 'Controls dialog visibility. Bind with v-model:open.' },
  { name: 'title', type: 'string', default: "''", description: 'Heading text rendered in the dialog header.' },
  { name: 'description', type: 'string', default: "''", description: 'Subtext below the title describing the action.' },
  { name: 'preventCloseOut', type: 'boolean', default: 'false', description: 'When true, clicking the backdrop or pressing Escape does NOT close the dialog.' }
]

// From AlertDialog.vue: defineEmits(['update:open', 'action'])
const alertDialogEvents = [
  { name: 'update:open', description: 'Emitted with false when the dialog requests to close.' },
  { name: 'action', description: 'Emitted when the default action button is clicked.' }
]

// From AlertDialog.vue template: slots title, description, default, cancel, action
const alertDialogSlots = [
  { name: 'title', description: 'Custom title content — overrides the title prop.' },
  { name: 'description', description: 'Custom description content — overrides the description prop.' },
  { name: 'default', description: 'Optional custom body content shown between the header and footer.' },
  { name: 'cancel', description: 'Custom cancel button (defaults to secondary Cancel button).' },
  { name: 'action', description: 'Custom action button (defaults to danger Continue button).' }
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
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.scroll-content {
  font-size: 0.9375rem;
  color: var(--maya-text-secondary);
  line-height: 1.5;
}

.scroll-content ul {
  margin: 12px 0 0;
  padding-left: 20px;
}

.scroll-content li {
  margin-bottom: 4px;
}
</style>
