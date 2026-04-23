<template>
  <div class="page-container">
    <div class="page-header">
      <h1 class="page-title">Banner</h1>
      <p class="page-desc">
        A full-width informational strip often placed at the top of a page or below navigation.
      </p>
    </div>

    <MayaPreviewCode title="Controlling State" description="Banners can be dismissed and conditionally rendered."
      lang="vue" :code="stateCode">
      <template #preview>
        <div style="width: 100%; display: flex; flex-direction: column;">
          <div style="margin-bottom: 24px;">
            <MayaBtn @click="showCustom = true" :disabled="showCustom">Show Custom Banner</MayaBtn>
          </div>

          <div
            style="position: relative; border: 1px solid var(--maya-border); border-radius: var(--maya-radius-lg); overflow: hidden; min-height: 200px;">
            <MayaBanner v-model="showCustom" intent="success" :icon="SparklesIcon">
              <b>Upgrade complete!</b> Your workspace has been successfully migrated to the new infrastructure.

              <template #actions>
                <MayaBtn variant="outline" size="sm" @click="showCustom = false">View Changelog</MayaBtn>
              </template>
            </MayaBanner>

            <div style="padding: 24px; color: var(--maya-text-secondary);">
              Main content goes here underneath the banner...
            </div>
          </div>
        </div>
      </template>
    </MayaPreviewCode>

    <MayaPreviewCode title="Semantic Variants" description="Different intents to convey distinct contexts." lang="vue"
      :code="variantsCode">
      <template #preview>
        <div class="variants-stack" style="width: 100%;">
          <MayaBanner v-model="show1" intent="default">
            This is a standard system banner.
          </MayaBanner>

          <MayaBanner v-model="show2" intent="info" :icon="InfoIcon">
            We will be performing scheduled maintenance on Sunday at 2 AM UTC.
          </MayaBanner>

          <MayaBanner v-model="show3" intent="warning" :icon="AlertTriangleIcon">
            Your billing method is about to expire in 3 days. Please update it.
          </MayaBanner>

          <MayaBanner v-model="show4" intent="danger" :icon="AlertOctagonIcon">
            Payment failed. Your subscription has been paused.
          </MayaBanner>
        </div>
      </template>
    </MayaPreviewCode>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { SparklesIcon, InfoIcon, AlertTriangleIcon, AlertOctagonIcon } from 'lucide-vue-next'

const showCustom = ref(true)
const show1 = ref(true)
const show2 = ref(true)
const show3 = ref(true)
const show4 = ref(true)

const stateCode = `
<script setup>
import { ref } from 'vue'
const showCustom = ref(true)
<\/script>

<template>
  <MayaBtn @click="showCustom = true" :disabled="showCustom">Show Custom Banner</MayaBtn>

  <MayaBanner v-model="showCustom" intent="success" :icon="SparklesIcon">
    <b>Upgrade complete!</b> Your workspace has been successfully migrated.

    <template #actions>
      <MayaBtn variant="outline" size="sm" @click="showCustom = false">View Changelog</MayaBtn>
    </template>
  </MayaBanner>
</template>
`.trim()

const variantsCode = `
<template>
  <div class="variants-stack">
    <MayaBanner v-model="show" intent="default">
      This is a standard system banner.
    </MayaBanner>

    <MayaBanner v-model="show" intent="info" :icon="InfoIcon">
      We will be performing scheduled maintenance on Sunday at 2 AM UTC.
    </MayaBanner>

    <MayaBanner v-model="show" intent="warning" :icon="AlertTriangleIcon">
      Your billing method is about to expire in 3 days. Please update it.
    </MayaBanner>

    <MayaBanner v-model="show" intent="danger" :icon="AlertOctagonIcon">
      Payment failed. Your subscription has been paused.
    </MayaBanner>
  </div>
</template>
`.trim()
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

.variants-stack {
  display: flex;
  flex-direction: column;
  gap: 16px;
  border-radius: var(--maya-radius-md);
  overflow: hidden;
  border: 1px solid var(--maya-border);
}

.variants-stack .maya-banner {
  border-bottom: 1px solid var(--maya-border);
}

.variants-stack .maya-banner:last-child {
  border-bottom: none;
}
</style>
