<template>
  <div class="component-page">
    <div class="page-header">
      <h1 class="page-title">Input OTP</h1>
      <p class="page-description">A purpose-built numeric input for verification codes featuring auto-focusing slots,
        backspace regression, and paste support.</p>
    </div>

    <MayaPreviewCode title="Default" description="A 6-slot OTP field."
      code='<MayaInputOTP v-model="code" :length="6" />'>
      <template #preview>
        <div style="display: flex; flex-direction: column; gap: 1rem;">
          <MayaInputOTP v-model="code1" :length="6" @complete="log" />
          <div style="font-size: 0.8rem; color: var(--maya-text-muted)">Value: {{ code1 }}</div>
        </div>
      </template>
    </MayaPreviewCode>

    <MayaPreviewCode title="Custom Length" description="Configure the exact number of slots you need."
      code='<MayaInputOTP v-model="code" :length="4" />'>
      <template #preview>
        <MayaInputOTP v-model="code2" :length="4" />
      </template>
    </MayaPreviewCode>

    <MayaPreviewCode title="Disabled State" description="" code='<MayaInputOTP v-model="code" disabled />'>
      <template #preview>
        <MayaInputOTP v-model="code3" :length="6" disabled />
      </template>
    </MayaPreviewCode>

  </div>
</template>

<script setup>
import { ref } from 'vue'

const code1 = ref('')
const code2 = ref('')
const code3 = ref('123456')

function log(val) {
  console.log('OTP Complete:', val)
}
</script>
