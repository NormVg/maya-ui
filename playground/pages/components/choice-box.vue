<template>
  <div>
    <div class="component-header">
      <h2 class="component-title">Choice Box</h2>
      <p class="component-desc">Selectable card-style control for settings, plans, and preference groups.</p>
    </div>

    <MayaPreviewCode
      title="Checkbox Mode"
      description="Use as a boolean card with title and description."
      :code="`<script setup lang=&quot;ts&quot;>
import { ref } from 'vue'

const notifications = ref(true)
const weeklyDigest = ref(false)
</script>

<template>
  <MayaChoiceBox
    v-model=&quot;notifications&quot;
    title=&quot;Email notifications&quot;
    description=&quot;Receive release updates, security alerts, and team mentions.&quot;
  />
  <MayaChoiceBox
    v-model=&quot;weeklyDigest&quot;
    title=&quot;Weekly digest&quot;
    description=&quot;One compact summary every Friday.&quot;
  />
</template>`"
    >
      <template #preview>
        <div class="stack">
          <MayaChoiceBox
            v-model="notifications"
            title="Email notifications"
            description="Receive release updates, security alerts, and team mentions."
          />
          <MayaChoiceBox
            v-model="weeklyDigest"
            title="Weekly digest"
            description="One compact summary every Friday."
          />
        </div>
      </template>
    </MayaPreviewCode>

    <MayaPreviewCode
      title="Radio Mode"
      description="Use value + same name to build premium option pickers."
      :code="`<script setup lang=&quot;ts&quot;>
import { ref } from 'vue'

const plan = ref('pro')
</script>

<template>
  <MayaChoiceBox
    v-model=&quot;plan&quot;
    type=&quot;radio&quot;
    name=&quot;billing-plan&quot;
    value=&quot;starter&quot;
    title=&quot;Starter&quot;
    description=&quot;For small teams getting started.&quot;
  />
  <MayaChoiceBox
    v-model=&quot;plan&quot;
    type=&quot;radio&quot;
    name=&quot;billing-plan&quot;
    value=&quot;pro&quot;
    title=&quot;Pro&quot;
    description=&quot;Advanced automation and higher limits.&quot;
  />
</template>`"
    >
      <template #preview>
        <div class="stack">
          <MayaChoiceBox
            v-model="plan"
            type="radio"
            name="billing-plan"
            value="starter"
            title="Starter"
            description="For small teams getting started."
          />
          <MayaChoiceBox
            v-model="plan"
            type="radio"
            name="billing-plan"
            value="pro"
            title="Pro"
            description="Advanced automation and higher limits."
          />
          <MayaChoiceBox
            v-model="plan"
            type="radio"
            name="billing-plan"
            value="enterprise"
            title="Enterprise"
            description="SAML, audit logs, and premium support."
          />
        </div>
      </template>
    </MayaPreviewCode>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const notifications = ref(true)
const weeklyDigest = ref(false)
const plan = ref('pro')
</script>

<style scoped>
.stack {
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: min(100%, 560px);
}
</style>
