<template>
  <div>
    <div class="component-header">
      <h2 class="component-title">Textarea</h2>
      <p class="component-desc">A multi-line text input.</p>
    </div>

    <MayaPreviewCode
      title="Default"
      description="Basic textarea."
      :code="`<MayaTextarea v-model=&quot;val&quot; placeholder=&quot;Write something...&quot; />`"
    >
      <template #preview>
        <div style="width: 400px;">
          <MayaTextarea v-model="val" placeholder="Write something..." />
        </div>
      </template>
    </MayaPreviewCode>

    <MayaPreviewCode
      title="With Label"
      description="Textarea with an associated label."
      :code="`<MayaTextarea v-model=&quot;val&quot; label=&quot;Message&quot; placeholder=&quot;Your message...&quot; />`"
    >
      <template #preview>
        <div style="width: 400px;">
          <MayaTextarea v-model="labeled" label="Message" placeholder="Your message..." />
        </div>
      </template>
    </MayaPreviewCode>

    <MayaPreviewCode
      title="Custom Rows"
      description="Textarea with custom row count."
      :code="`<MayaTextarea v-model=&quot;val&quot; label=&quot;Bio&quot; :rows=&quot;6&quot; placeholder=&quot;Tell us about yourself...&quot; />`"
    >
      <template #preview>
        <div style="width: 400px;">
          <MayaTextarea v-model="bio" label="Bio" :rows="6" placeholder="Tell us about yourself..." />
        </div>
      </template>
    </MayaPreviewCode>

    <!-- API Reference -->
    <ApiTable title="MayaTextarea Props API" :propsList="textareaProps" />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import ApiTable from '~/components/ApiTable.vue'

const val = ref('')
const labeled = ref('')
const bio = ref('')

const textareaProps = [
  { name: 'modelValue', type: 'String', default: '""', description: 'The value of the textarea. Used with v-model.' },
  { name: 'placeholder', type: 'String', default: '""', description: 'Placeholder text when textarea is empty.' },
  { name: 'label', type: 'String', default: '""', description: 'Optional text label displayed above the textarea.' },
  { name: 'rows', type: 'Number', default: '4', description: 'Number of visible text lines.' },
  { name: 'disabled', type: 'Boolean', default: 'false', description: 'Whether the textarea is disabled.' },
  { name: '@update:modelValue', type: 'Event', default: '—', description: 'Emitted when the textarea value changes.' }
]
</script>
