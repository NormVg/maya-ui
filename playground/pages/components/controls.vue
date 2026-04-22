<template>
  <div>
    <div class="component-header">
      <h2 class="component-title">Toggle & Switch</h2>
      <p class="component-desc">On/off controls for settings, filters, and selections.</p>
    </div>

    <MayaPreviewCode title="Toggle — Intents" description="Single toggle with semantic intent colors.">
      <template #preview>
        <div class="row wrap">
          <MayaToggle v-model="t0">Default</MayaToggle>
          <MayaToggle v-model="t1" intent="success">Success</MayaToggle>
          <MayaToggle v-model="t2" intent="warning">Warning</MayaToggle>
          <MayaToggle v-model="t3" intent="danger">Danger</MayaToggle>
          <MayaToggle v-model="t4" intent="info">Info</MayaToggle>
        </div>
      </template>
    </MayaPreviewCode>

    <MayaPreviewCode title="Button Group" description="Joined buttons sharing borders.">
      <template #preview>
        <div class="col">
          <MayaBtnGroup>
            <MayaBtn variant="secondary" size="sm">Day</MayaBtn>
            <MayaBtn variant="secondary" size="sm">Week</MayaBtn>
            <MayaBtn variant="secondary" size="sm">Month</MayaBtn>
          </MayaBtnGroup>
          <MayaBtnGroup>
            <MayaBtn variant="secondary">Left</MayaBtn>
            <MayaBtn variant="secondary">Center</MayaBtn>
            <MayaBtn variant="secondary">Right</MayaBtn>
          </MayaBtnGroup>
        </div>
      </template>
    </MayaPreviewCode>

    <MayaPreviewCode title="Toggle Group — Single" description="Radio-style selection — one active at a time.">
      <template #preview>
        <MayaToggleGroup v-model="tgSingle" type="single">
          <MayaToggle value="left">Left</MayaToggle>
          <MayaToggle value="center">Center</MayaToggle>
          <MayaToggle value="right">Right</MayaToggle>
        </MayaToggleGroup>
      </template>
    </MayaPreviewCode>

    <MayaPreviewCode title="Switch" description="Animated toggle switch. Checked state uses success color.">
      <template #preview>
        <div class="col">
          <div class="row">
            <MayaSwitch v-model="sw1" size="sm" />
            <span style="font-size: 0.8125rem; color: var(--maya-text-secondary)">Small</span>
          </div>
          <div class="row">
            <MayaSwitch v-model="sw2" size="md" />
            <span style="font-size: 0.8125rem; color: var(--maya-text-secondary)">Medium — {{ sw2 ? 'On' : 'Off'
              }}</span>
          </div>
          <div class="row">
            <MayaSwitch v-model="sw3" size="lg" />
            <span style="font-size: 0.8125rem; color: var(--maya-text-secondary)">Large</span>
          </div>
          <div class="row">
            <MayaSwitch v-model="swDis" size="md" disabled />
            <span style="font-size: 0.8125rem; color: var(--maya-text-muted)">Disabled</span>
          </div>
        </div>
      </template>
    </MayaPreviewCode>
  </div>
</template>

<script setup>
import { ref } from 'vue'
const t0 = ref(false), t1 = ref(true), t2 = ref(false), t3 = ref(false), t4 = ref(true)
const tgSingle = ref('center')
const sw1 = ref(false), sw2 = ref(true), sw3 = ref(false), swDis = ref(true)
</script>

<style scoped>
.row {
  display: flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
}

.col {
  display: flex;
  flex-direction: column;
  gap: 14px;
}
</style>
