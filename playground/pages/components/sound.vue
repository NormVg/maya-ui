<template>
  <div>
    <div class="component-header">
      <h2 class="component-title">Sound</h2>
      <p class="component-desc">
        Zero-dependency, mathematically generated UI sound effects to enhance interaction feedback.
      </p>
    </div>

    <MayaPreviewCode title="Basic Interactions" description="Click the buttons below to hear different semantic sound intents." lang="vue"
      :code="basicCode">
      <template #preview>
        <div class="row wrap">
          <MayaBtn @click="playSound('click')" variant="secondary">Click</MayaBtn>
          <MayaBtn @click="playSound('pop')" variant="secondary">Pop</MayaBtn>
          <MayaBtn @click="playSound('toggle')" variant="secondary">Toggle</MayaBtn>
          <MayaBtn @click="playSound('tick')" variant="secondary">Tick</MayaBtn>
          <MayaBtn @click="playSound('drop')" variant="secondary">Drop</MayaBtn>
        </div>
      </template>
    </MayaPreviewCode>

    <MayaPreviewCode title="Status Interactions" description="Semantic sounds mapped to their corresponding intents." lang="vue"
      :code="statusCode">
      <template #preview>
        <div class="row wrap">
          <MayaBtn @click="playSound('success')" intent="success" variant="primary">Success</MayaBtn>
          <MayaBtn @click="playSound('warning')" intent="warning" variant="primary">Warning</MayaBtn>
          <MayaBtn @click="playSound('error')" intent="danger" variant="primary">Error</MayaBtn>
          <MayaBtn @click="playSound('startup')" intent="info" variant="primary">Startup</MayaBtn>
        </div>
      </template>
    </MayaPreviewCode>

    <MayaPreviewCode title="Themes & Feels" description="Change the character of the sound globally or per-call by passing a theme." lang="vue"
      :code="themeCode">
      <template #preview>
        <div class="row wrap align-center overflow-visible pb-12" style="overflow: visible; gap: 1rem;">
          <div style="width: 200px; z-index: 9999;">
            <MayaSelect v-model="currentTheme" :options="themeOptions" placeholder="Select Theme" />
          </div>
          <div class="row wrap" style="gap: 8px;">
            <MayaBtn v-for="sound in soundTypes" :key="sound" @click="playSound(sound, currentTheme)" variant="secondary">
              {{ sound }}
            </MayaBtn>
          </div>
        </div>
      </template>
    </MayaPreviewCode>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useMayaSound, type SoundType, type FeelType } from '#imports'

const { play } = useMayaSound()

const currentTheme = ref<FeelType>('aero')

const soundTypes: SoundType[] = ['click', 'pop', 'toggle', 'tick', 'drop', 'success', 'warning', 'error', 'startup']

const themeOptions = [
  { value: 'aero', label: 'Aero (Default)' },
  { value: 'soft', label: 'Soft' },
  { value: 'arcade', label: 'Arcade' },
  { value: 'organic', label: 'Organic' },
  { value: 'glass', label: 'Glass' },
  { value: 'industrial', label: 'Industrial' },
  { value: 'minimal', label: 'Minimal' },
  { value: 'retro', label: 'Retro' },
  { value: 'crisp', label: 'Crisp' }
]

const playSound = (type: SoundType, theme?: FeelType) => {
  play(type, theme)
}

const basicCode = `const { play } = useMayaSound()

<MayaBtn @click="play('click')">Click</MayaBtn>
<MayaBtn @click="play('pop')">Pop</MayaBtn>
<MayaBtn @click="play('toggle')">Toggle</MayaBtn>
<MayaBtn @click="play('tick')">Tick</MayaBtn>
<MayaBtn @click="play('drop')">Drop</MayaBtn>`

const statusCode = `const { play } = useMayaSound()

<MayaBtn @click="play('success')" intent="success">Success</MayaBtn>
<MayaBtn @click="play('warning')" intent="warning">Warning</MayaBtn>
<MayaBtn @click="play('error')" intent="danger">Error</MayaBtn>
<MayaBtn @click="play('startup')" intent="info">Startup</MayaBtn>`

const themeCode = `const { play } = useMayaSound()
const theme = ref('glass')

<MayaSelect v-model="theme" :options="['aero', 'glass', 'arcade', ...]" />
<MayaBtn @click="play('success', theme)">Play Theme</MayaBtn>`
</script>

<style scoped>
.row {
  display: flex;
  gap: 10px;
  align-items: flex-start;
}

.row.align-center {
  align-items: center;
}

.row.wrap {
  flex-wrap: wrap;
}

.overflow-visible {
  overflow: visible !important;
}

.pb-12 {
  padding-bottom: 6rem;
}
</style>
