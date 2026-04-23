<template>
  <div class="page-container">
    <div class="page-header">
      <h1 class="page-title">Status Indicators</h1>
      <p class="page-desc">
        Visual cues representing system status, progress, and quantities.
      </p>
    </div>

    <!-- Status Dot -->
    <MayaPreviewCode title="Status Dot"
      description="Small animated indicators to represent live statuses like online, offline, or busy." lang="vue"
      :code="dotCode">
      <template #preview>
        <div class="flex-row">
          <div class="status-group">
            <MayaStatusDot intent="success" /> Online
          </div>
          <div class="status-group">
            <MayaStatusDot intent="warning" /> Away
          </div>
          <div class="status-group">
            <MayaStatusDot intent="danger" /> Busy
          </div>
          <div class="status-group">
            <MayaStatusDot intent="default" :ping="false" /> Offline
          </div>
        </div>
      </template>
    </MayaPreviewCode>

    <!-- Progress -->
    <MayaPreviewCode title="Progress" description="A linear status component representing task completion." lang="vue"
      :code="progressCode">
      <template #preview>
        <div class="stack" style="width: 100%;">
          <div>
            <div class="margin-bottom">Definite ({{ progressValue }}%)</div>
            <MayaProgress :value="progressValue" intent="info" />
          </div>
          <div>
            <div class="margin-bottom">Indeterminate</div>
            <MayaProgress indeterminate intent="default" />
          </div>

          <div class="demo-actions">
            <MayaBtn size="sm" @click="resetProgress">Reset</MayaBtn>
            <MayaBtn size="sm" @click="addProgress">Add 20%</MayaBtn>
          </div>
        </div>
      </template>
    </MayaPreviewCode>

    <MayaPreviewCode title="Meter" description="A visual representation of a scalar value within a known range."
      lang="vue" :code="meterCode">
      <template #preview>
        <div class="stack" style="width: 100%;">
          <!-- Server load: optimal is 0, so approaching 100 is danger -->
          <MayaMeter label="Server CPU Load" :value="serverLoad" showLabel :optimum="0" :lowThreshold="50"
            :highThreshold="85" />

          <!-- Battery: optimal is 100, so approaching 0 is danger -->
          <MayaMeter label="Battery Level" :value="battery" showLabel :optimum="100" :lowThreshold="20"
            :highThreshold="50" />
        </div>
        <div class="demo-actions">
          <MayaBtn size="sm" @click="randomizeMeters">Randomize Data</MayaBtn>
        </div>
      </template>
    </MayaPreviewCode>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const progressValue = ref(30)
function addProgress() {
  progressValue.value = Math.min(100, progressValue.value + 20)
}
function resetProgress() {
  progressValue.value = 0
}

const serverLoad = ref(45)
const battery = ref(100)

function randomizeMeters() {
  serverLoad.value = Math.floor(Math.random() * 100)
  battery.value = Math.floor(Math.random() * 100)
}

const dotCode = `
<template>
  <MayaStatusDot intent="success" /> Online
  <MayaStatusDot intent="warning" /> Away
  <MayaStatusDot intent="danger" /> Busy
  <MayaStatusDot intent="default" :ping="false" /> Offline
</template>
`.trim()

const progressCode = `
<script setup>
import { ref } from 'vue'
const progressValue = ref(30)
<\/script>

<template>
  <MayaProgress :value="progressValue" intent="info" />
  <MayaProgress indeterminate intent="default" />
</template>
`.trim()

const meterCode = `
<template>
  <!-- Server load: optimal is 0, so approaching 100 is danger -->
  <MayaMeter label="Server CPU Load" :value="45" showLabel :optimum="0" :lowThreshold="50" :highThreshold="85" />

  <!-- Battery: optimal is 100, so approaching 0 is danger -->
  <MayaMeter label="Battery Level" :value="100" showLabel :optimum="100" :lowThreshold="20" :highThreshold="50" />
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

.flex-row {
  display: flex;
  gap: 24px;
  flex-wrap: wrap;
}

.status-group {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.875rem;
  color: var(--maya-text-secondary);
}

.stack {
  display: flex;
  flex-direction: column;
  gap: 32px;
}

.margin-bottom {
  margin-bottom: 8px;
  font-size: 0.875rem;
  color: var(--maya-text-secondary);
}

.demo-actions {
  display: flex;
  gap: 12px;
  margin-top: 16px;
  padding-top: 16px;
  border-top: 1px dashed var(--maya-border);
}
</style>
