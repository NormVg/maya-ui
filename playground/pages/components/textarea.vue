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
  </div>
</template>

<script setup>
import { ref } from 'vue'
const val = ref('')
const labeled = ref('')
const bio = ref('')
</script>
