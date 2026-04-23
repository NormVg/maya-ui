<template>
  <div class="maya-color-picker" ref="pickerRef">
    <!-- Trigger -->
    <button class="maya-color-picker-trigger" @click="toggle" :style="{ '--swatch': modelValue }" aria-label="Open color picker">
      <span class="maya-color-picker-swatch"></span>
      <span class="maya-color-picker-value">{{ modelValue }}</span>
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" :style="{ transform: isOpen ? 'rotate(180deg)' : 'none', transition: 'transform 200ms var(--maya-ease-out)' }">
        <path d="m6 9 6 6 6-6"/>
      </svg>
    </button>

    <!-- Dropdown panel -->
    <Transition name="maya-color-picker-drop">
      <div v-if="isOpen" class="maya-color-picker-panel">
        <!-- Gradient canvas -->
        <div class="maya-color-picker-canvas" ref="canvasRef" @mousedown="startPickingGradient" @touchstart.prevent="startPickingGradient">
          <div class="maya-color-picker-canvas-saturation" :style="{ background: `hsl(${hue}, 100%, 50%)` }"></div>
          <div class="maya-color-picker-canvas-white"></div>
          <div class="maya-color-picker-canvas-black"></div>
          <!-- Cursor dot -->
          <div class="maya-color-picker-cursor" :style="{ left: `${cursorX}%`, top: `${cursorY}%` }"></div>
        </div>

        <!-- Hue slider -->
        <div class="maya-color-picker-hue" ref="hueRef" @mousedown="startPickingHue" @touchstart.prevent="startPickingHue">
          <div class="maya-color-picker-hue-thumb" :style="{ left: `${hue / 360 * 100}%` }"></div>
        </div>

        <!-- Alpha slider -->
        <div class="maya-color-picker-alpha" ref="alphaRef" @mousedown="startPickingAlpha" @touchstart.prevent="startPickingAlpha">
          <div class="maya-color-picker-alpha-track" :style="{ background: `linear-gradient(to right, transparent, hsl(${hue}, 100%, 50%))` }"></div>
          <div class="maya-color-picker-alpha-thumb" :style="{ left: `${alpha * 100}%` }"></div>
        </div>

        <!-- Hex input -->
        <div class="maya-color-picker-inputs">
          <label class="maya-color-picker-input-group">
            <span class="maya-color-picker-input-label">HEX</span>
            <input class="maya-color-picker-input" :value="hexInput" @change="onHexInput" @blur="onHexInput" spellcheck="false" maxlength="7" />
          </label>
          <label class="maya-color-picker-input-group">
            <span class="maya-color-picker-input-label">A</span>
            <input class="maya-color-picker-input" type="number" min="0" max="100" :value="Math.round(alpha * 100)" @change="e => setAlpha(e.target.value / 100)" />
          </label>
        </div>

        <!-- Preset swatches -->
        <div class="maya-color-picker-presets">
          <button
            v-for="color in presets"
            :key="color"
            class="maya-color-picker-preset"
            :class="{ 'is-active': modelValue === color }"
            :style="{ background: color }"
            :aria-label="color"
            @click="applyHex(color)"
          ></button>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted, onUnmounted } from 'vue'

const props = defineProps({
  modelValue: { type: String, default: '#6366f1' },
  presets: {
    type: Array,
    default: () => ['#ef4444','#f97316','#eab308','#22c55e','#06b6d4','#6366f1','#a855f7','#ec4899','#ffffff','#71717a','#27272a','#09090b'],
  }
})
const emit = defineEmits(['update:modelValue'])

const isOpen = ref(false)
const pickerRef = ref(null)

// HSB state
const hue = ref(240)
const saturation = ref(82)  // 0-100
const brightness = ref(91)  // 0-100
const alpha = ref(1)

// Cursor position
const cursorX = ref(saturation.value)
const cursorY = ref(100 - brightness.value)

const hexInput = ref(props.modelValue)

// --- Hex helpers ---
const hexToHsb = (hex) => {
  const r = parseInt(hex.slice(1,3), 16) / 255
  const g = parseInt(hex.slice(3,5), 16) / 255
  const b = parseInt(hex.slice(5,7), 16) / 255
  const max = Math.max(r,g,b), min = Math.min(r,g,b), d = max - min
  let h = 0
  if (d !== 0) {
    if (max === r) h = ((g - b) / d) % 6
    else if (max === g) h = (b - r) / d + 2
    else h = (r - g) / d + 4
    h = Math.round(h * 60)
    if (h < 0) h += 360
  }
  const s = max === 0 ? 0 : Math.round(d / max * 100)
  const v = Math.round(max * 100)
  return { h, s, v }
}

const hsbToHex = (h, s, v) => {
  s /= 100; v /= 100
  const f = (n) => {
    const k = (n + h / 60) % 6
    return v - v * s * Math.max(0, Math.min(k, 4 - k, 1))
  }
  const toHex = (n) => Math.round(n * 255).toString(16).padStart(2, '0')
  return `#${toHex(f(5))}${toHex(f(3))}${toHex(f(1))}`
}

const emitColor = () => {
  const hex = hsbToHex(hue.value, saturation.value, brightness.value)
  hexInput.value = hex
  emit('update:modelValue', hex)
}

// --- Sync from prop ---
watch(() => props.modelValue, (val) => {
  if (val && val.startsWith('#') && val.length === 7) {
    const { h, s, v } = hexToHsb(val)
    hue.value = h; saturation.value = s; brightness.value = v
    cursorX.value = s; cursorY.value = 100 - v
    hexInput.value = val
  }
}, { immediate: true })

// --- Gradient canvas picking ---
const canvasRef = ref(null)
let pickingGradient = false
const startPickingGradient = (e) => {
  pickingGradient = true
  pickGradient(e)
}
const pickGradient = (e) => {
  if (!pickingGradient || !canvasRef.value) return
  const rect = canvasRef.value.getBoundingClientRect()
  const clientX = e.touches ? e.touches[0].clientX : e.clientX
  const clientY = e.touches ? e.touches[0].clientY : e.clientY
  saturation.value = Math.round(Math.max(0, Math.min(100, (clientX - rect.left) / rect.width * 100)))
  brightness.value = Math.round(Math.max(0, Math.min(100, 100 - (clientY - rect.top) / rect.height * 100)))
  cursorX.value = saturation.value; cursorY.value = 100 - brightness.value
  emitColor()
}

// --- Hue picking ---
const hueRef = ref(null)
let pickingHue = false
const startPickingHue = (e) => { pickingHue = true; pickHue(e) }
const pickHue = (e) => {
  if (!pickingHue || !hueRef.value) return
  const rect = hueRef.value.getBoundingClientRect()
  const clientX = e.touches ? e.touches[0].clientX : e.clientX
  hue.value = Math.round(Math.max(0, Math.min(360, (clientX - rect.left) / rect.width * 360)))
  emitColor()
}

// --- Alpha picking ---
const alphaRef = ref(null)
let pickingAlpha = false
const startPickingAlpha = (e) => { pickingAlpha = true; pickAlpha(e) }
const pickAlpha = (e) => {
  if (!pickingAlpha || !alphaRef.value) return
  const rect = alphaRef.value.getBoundingClientRect()
  const clientX = e.touches ? e.touches[0].clientX : e.clientX
  alpha.value = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width))
}
const setAlpha = (val) => { alpha.value = Math.max(0, Math.min(1, val)) }

const onHexInput = (e) => {
  const val = e.target.value.trim()
  if (/^#[0-9a-fA-F]{6}$/.test(val)) applyHex(val)
}
const applyHex = (hex) => { emit('update:modelValue', hex) }

// --- Global mouse/touch events ---
const onGlobalMove = (e) => {
  if (pickingGradient) pickGradient(e)
  if (pickingHue) pickHue(e)
  if (pickingAlpha) pickAlpha(e)
}
const onGlobalUp = () => { pickingGradient = false; pickingHue = false; pickingAlpha = false }

// --- Click outside ---
const onClickOutside = (e) => { if (pickerRef.value && !pickerRef.value.contains(e.target)) isOpen.value = false }

onMounted(() => {
  window.addEventListener('mousemove', onGlobalMove)
  window.addEventListener('touchmove', onGlobalMove, { passive: false })
  window.addEventListener('mouseup', onGlobalUp)
  window.addEventListener('touchend', onGlobalUp)
  document.addEventListener('mousedown', onClickOutside)
})
onUnmounted(() => {
  window.removeEventListener('mousemove', onGlobalMove)
  window.removeEventListener('touchmove', onGlobalMove)
  window.removeEventListener('mouseup', onGlobalUp)
  window.removeEventListener('touchend', onGlobalUp)
  document.removeEventListener('mousedown', onClickOutside)
})

const toggle = () => { isOpen.value = !isOpen.value }
</script>

<style scoped>
.maya-color-picker {
  position: relative;
  display: inline-block;
}

/* ─── Trigger ─── */
.maya-color-picker-trigger {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 7px 12px;
  background: var(--maya-bg-surface);
  border: none;
  border-radius: var(--maya-radius-md);
  cursor: pointer;
  font-family: var(--maya-font-sans);
  font-size: 0.8125rem;
  color: var(--maya-text-secondary);
  transition: all 150ms var(--maya-ease-out);
  box-shadow:
    inset 0 0 0 1px var(--maya-border-strong),
    0 1px 3px rgba(0, 0, 0, 0.2),
    inset 0 1px 0 rgba(255,255,255,0.04);
}

.maya-color-picker-trigger:hover {
  color: var(--maya-text-primary);
  box-shadow:
    inset 0 0 0 1px var(--maya-border-hover),
    0 1px 3px rgba(0, 0, 0, 0.2),
    inset 0 1px 0 rgba(255,255,255,0.06);
}

.maya-color-picker-trigger:active {
  transform: scale(0.97);
}

.maya-color-picker-swatch {
  display: block;
  width: 16px;
  height: 16px;
  border-radius: 4px;
  background: var(--swatch, #6366f1);
  box-shadow: inset 0 0 0 1px rgba(0,0,0,0.2);
  flex-shrink: 0;
}

.maya-color-picker-value {
  font-family: var(--maya-font-mono);
  letter-spacing: 0.02em;
}

/* ─── Panel ─── */
.maya-color-picker-panel {
  position: absolute;
  top: calc(100% + 8px);
  left: 0;
  z-index: 100;
  width: 260px;
  background: var(--maya-bg-surface);
  border-radius: var(--maya-radius-xl);
  padding: 14px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  box-shadow:
    0 0 0 1px var(--maya-border-subtle),
    0 4px 16px rgba(0, 0, 0, 0.35),
    0 12px 32px rgba(0, 0, 0, 0.25),
    inset 0 1px 0 rgba(255,255,255,0.05);
}

/* ─── Gradient canvas ─── */
.maya-color-picker-canvas {
  position: relative;
  width: 100%;
  height: 150px;
  border-radius: var(--maya-radius-md);
  overflow: hidden;
  cursor: crosshair;
}

.maya-color-picker-canvas-saturation,
.maya-color-picker-canvas-white,
.maya-color-picker-canvas-black {
  position: absolute;
  inset: 0;
}

.maya-color-picker-canvas-white {
  background: linear-gradient(to right, white, transparent);
}

.maya-color-picker-canvas-black {
  background: linear-gradient(to bottom, transparent, black);
}

.maya-color-picker-cursor {
  position: absolute;
  width: 14px;
  height: 14px;
  border-radius: 50%;
  border: 2px solid white;
  box-shadow: 0 0 0 1px rgba(0,0,0,0.4), 0 2px 4px rgba(0,0,0,0.3);
  transform: translate(-50%, -50%);
  pointer-events: none;
  transition: left 0ms, top 0ms;
}

/* ─── Hue slider ─── */
.maya-color-picker-hue {
  position: relative;
  height: 12px;
  border-radius: var(--maya-radius-full);
  background: linear-gradient(to right, #ff0000, #ffff00, #00ff00, #00ffff, #0000ff, #ff00ff, #ff0000);
  cursor: pointer;
}

.maya-color-picker-hue-thumb {
  position: absolute;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: white;
  box-shadow: 0 0 0 2px rgba(0,0,0,0.2), 0 2px 6px rgba(0,0,0,0.3);
  pointer-events: none;
}

/* ─── Alpha slider ─── */
.maya-color-picker-alpha {
  position: relative;
  height: 12px;
  border-radius: var(--maya-radius-full);
  cursor: pointer;
  /* Checkerboard background indicating transparency */
  background-image: linear-gradient(45deg, #888 25%, transparent 25%),
    linear-gradient(-45deg, #888 25%, transparent 25%),
    linear-gradient(45deg, transparent 75%, #888 75%),
    linear-gradient(-45deg, transparent 75%, #888 75%);
  background-size: 8px 8px;
  background-position: 0 0, 0 4px, 4px -4px, -4px 0px;
  overflow: hidden;
}

.maya-color-picker-alpha-track {
  position: absolute;
  inset: 0;
  border-radius: inherit;
}

.maya-color-picker-alpha-thumb {
  position: absolute;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: white;
  box-shadow: 0 0 0 2px rgba(0,0,0,0.2), 0 2px 6px rgba(0,0,0,0.3);
  pointer-events: none;
}

/* ─── Inputs ─── */
.maya-color-picker-inputs {
  display: flex;
  gap: 8px;
}

.maya-color-picker-input-group {
  display: flex;
  flex-direction: column;
  gap: 4px;
  flex: 1;
}

.maya-color-picker-input-label {
  font-size: 0.675rem;
  font-weight: 600;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--maya-text-tertiary);
  font-family: var(--maya-font-sans);
}

.maya-color-picker-input {
  width: 100%;
  padding: 6px 8px;
  background: var(--maya-bg-root);
  border: 1px solid var(--maya-border-subtle);
  border-radius: var(--maya-radius-sm);
  color: var(--maya-text-primary);
  font-family: var(--maya-font-mono);
  font-size: 0.8125rem;
  outline: none;
  transition: border-color 150ms ease;
}

.maya-color-picker-input:focus {
  border-color: var(--maya-accent);
}

/* ─── Presets ─── */
.maya-color-picker-presets {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.maya-color-picker-preset {
  width: 22px;
  height: 22px;
  border-radius: 6px;
  border: none;
  cursor: pointer;
  transition: all 150ms var(--maya-ease-out);
  box-shadow: inset 0 0 0 1px rgba(0,0,0,0.15);
}

.maya-color-picker-preset:hover {
  transform: scale(1.2);
  box-shadow: 0 2px 8px rgba(0,0,0,0.3), inset 0 0 0 1px rgba(0,0,0,0.1);
}

.maya-color-picker-preset:active {
  transform: scale(0.95);
}

.maya-color-picker-preset.is-active {
  box-shadow: 0 0 0 2px var(--maya-bg-surface), 0 0 0 4px currentColor, 0 2px 8px rgba(0,0,0,0.3);
}

/* ─── Transition ─── */
.maya-color-picker-drop-enter-active {
  transition: opacity 200ms var(--maya-ease-out), transform 250ms var(--maya-ease-bouncy);
}
.maya-color-picker-drop-leave-active {
  transition: opacity 150ms ease-in, transform 150ms ease-in;
}
.maya-color-picker-drop-enter-from {
  opacity: 0;
  transform: translateY(-6px) scale(0.97);
}
.maya-color-picker-drop-leave-to {
  opacity: 0;
  transform: translateY(-2px) scale(0.98);
}
</style>
