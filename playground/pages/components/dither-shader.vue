<template>
  <div class="page-content">
    <div class="component-header">
      <h2 class="component-title">Dither Shader</h2>
      <p class="component-desc">A WebGL-powered dithering shader component built with Three.js. Supports procedural noise, waves, and patterns.</p>
    </div>

    <!-- Interactive Builder -->
    <MayaPreviewCode title="Interactive Playground" description="Configure the shape, scale, and dithering style of the WebGL material." lang="vue" :code="generatedCode">
      <template #preview>
        <div class="playground-layout">
          <!-- Canvas preview -->
          <div class="shader-canvas-wrap">
            <MayaDitherShader 
              :shape="shape"
              :type="type"
              :size="size"
              :speed="speed"
              :scale="scale"
              :colorFront="colorFront"
              :colorBack="colorBack"
            />
          </div>
          
          <!-- Controls -->
          <div class="controls-panel">
            <div class="controls-grid">
              <MayaField label="Shape">
                <MayaSelect v-model="shape" :options="['simplex', 'warp', 'dots', 'wave', 'ripple', 'swirl', 'sphere']" />
              </MayaField>
              
              <MayaField label="Dithering Type">
                <MayaSelect v-model="type" :options="['random', '2x2', '4x4', '8x8']" />
              </MayaField>
            </div>

            <div class="controls-grid mt-4">
              <MayaField label="Foreground Color">
                <div class="color-input-wrapper">
                  <input type="color" v-model="colorFront" class="color-picker" />
                  <span class="color-value">{{ colorFront }}</span>
                </div>
              </MayaField>

              <MayaField label="Background Color">
                <div class="color-input-wrapper">
                  <input type="color" v-model="colorBack" class="color-picker" />
                  <span class="color-value">{{ colorBack }}</span>
                </div>
              </MayaField>
            </div>

            <div class="sliders-grid mt-6">
              <MayaField>
                <template #label>
                  <div class="slider-label"><span>Pixel Size</span> <span class="muted">{{ size }}</span></div>
                </template>
                <input type="range" v-model.number="size" min="1" max="10" step="0.5" class="maya-slider" />
              </MayaField>
              
              <MayaField>
                <template #label>
                  <div class="slider-label"><span>Speed</span> <span class="muted">{{ speed }}x</span></div>
                </template>
                <input type="range" v-model.number="speed" min="0" max="3" step="0.1" class="maya-slider" />
              </MayaField>

              <MayaField>
                <template #label>
                  <div class="slider-label"><span>Scale</span> <span class="muted">{{ scale }}</span></div>
                </template>
                <input type="range" v-model.number="scale" min="0.1" max="4" step="0.1" class="maya-slider" />
              </MayaField>
            </div>
          </div>
        </div>
      </template>
    </MayaPreviewCode>

    <ApiTable title="MayaDitherShader Props API" :propsList="shaderProps" />
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import type { DitheringShape, DitheringType } from '~/../src/runtime/components/DitherShader.vue'
import ApiTable from '~/components/ApiTable.vue'

const shape = ref<DitheringShape>('warp')
const type = ref<DitheringType>('2x2')
const size = ref(3)
const speed = ref(1)
const scale = ref(1)
const colorFront = ref('#ED00B5')
const colorBack = ref('#000000')

const generatedCode = computed(() => {
  return `<template>
  <div class="shader-wrapper">
    <MayaDitherShader 
      shape="${shape.value}" 
      type="${type.value}" 
      :size="${size.value}" 
      :speed="${speed.value}" 
      :scale="${scale.value}" 
      colorFront="${colorFront.value}" 
      colorBack="${colorBack.value}" 
    />
  </div>
</template>

<style scoped>
.shader-wrapper {
  height: 400px;
  width: 100%;
  border-radius: 8px;
  overflow: hidden;
}
</style>`
})

const shaderProps = [
  { name: 'shape', type: 'String', default: '"simplex"', description: 'The pattern shape: simplex, warp, dots, wave, ripple, swirl, sphere.' },
  { name: 'type', type: 'String', default: '"8x8"', description: 'The Bayer matrix dithering level: random, 2x2, 4x4, 8x8.' },
  { name: 'size', type: 'Number', default: '3', description: 'Pixel size of the dithering grid grid (1–10 recommended).' },
  { name: 'fit', type: 'String', default: '"none"', description: 'Fit mode inside the canvas: none, contain, cover.' },
  { name: 'scale', type: 'Number', default: '1', description: 'Overall zoom/scale multiplier.' },
  { name: 'speed', type: 'Number', default: '1', description: 'Animation speed multiplier.' },
  { name: 'colorFront', type: 'String', default: '"#ED00B5"', description: 'Foreground (ink) color in CSS hex format.' },
  { name: 'colorBack', type: 'String', default: '"#000000"', description: 'Background color in CSS hex format.' },
  { name: 'rotation', type: 'Number', default: '0', description: 'Rotation in degrees (0–360).' },
]
</script>

<style scoped>
.page-content {
  display: flex;
  flex-direction: column;
  gap: 32px;
}

.component-header {
  margin-bottom: 2rem;
}

.component-title {
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
}

.component-desc {
  color: var(--maya-text-muted);
}

.playground-layout {
  display: flex;
  flex-direction: column;
  gap: 24px;
  width: 100%;
}

.shader-canvas-wrap {
  width: 100%;
  height: 400px;
  border-radius: var(--maya-radius-md);
  overflow: hidden;
  background: #000;
  box-shadow: inset 0 0 0 1px rgba(255,255,255,0.1);
}

.controls-panel {
  padding: 16px;
  background: var(--maya-bg-surface);
  border: 1px solid var(--maya-border);
  border-radius: var(--maya-radius-md);
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.controls-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
}

.mt-4 { margin-top: 16px; }
.mt-6 { margin-top: 24px; }

.sliders-grid {
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding-top: 16px;
  border-top: 1px solid var(--maya-border);
}

.sliders-grid :deep(.maya-field-label),
.sliders-grid :deep(.maya-label) {
  width: 100%;
}

.slider-label {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  font-size: 0.875rem;
  font-weight: 500;
}

.slider-label .muted {
  color: var(--maya-text-muted);
  font-family: var(--maya-font-mono);
}

/* Custom Maya Slider Styling */
.maya-slider {
  -webkit-appearance: none;
  appearance: none;
  width: 100%;
  height: 6px;
  background: var(--maya-border);
  border-radius: 3px;
  outline: none;
  margin-top: 4px;
}

.maya-slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: var(--maya-primary, #3b82f6);
  cursor: pointer;
  box-shadow: 0 0 0 2px var(--maya-bg-surface);
  transition: transform 0.2s var(--maya-ease-bouncy);
}

.maya-slider::-webkit-slider-thumb:hover {
  transform: scale(1.2);
}

.maya-slider::-moz-range-thumb {
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: var(--maya-primary, #3b82f6);
  cursor: pointer;
  border: 2px solid var(--maya-bg-surface);
  transition: transform 0.2s var(--maya-ease-bouncy);
}

.maya-slider::-moz-range-thumb:hover {
  transform: scale(1.2);
}

/* Color Picker Row styling */
.color-input-wrapper {
  display: flex;
  align-items: center;
  gap: 12px;
  background: var(--maya-bg-base);
  border: 1px solid var(--maya-border);
  border-radius: var(--maya-radius-md);
  padding: 6px 12px 6px 6px;
}

.color-picker {
  -webkit-appearance: none;
  appearance: none;
  width: 24px;
  height: 24px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  padding: 0;
  background: transparent;
}

.color-picker::-webkit-color-swatch-wrapper {
  padding: 0;
}

.color-picker::-webkit-color-swatch {
  border: 1px solid rgba(0,0,0,0.1);
  border-radius: 4px;
}

.color-picker::-moz-color-swatch {
  border: 1px solid rgba(0,0,0,0.1);
  border-radius: 4px;
}

.color-value {
  font-family: var(--maya-font-mono);
  font-size: 0.8125rem;
  color: var(--maya-text-base);
  text-transform: uppercase;
}
</style>
