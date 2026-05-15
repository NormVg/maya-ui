<template>
  <div ref="container" class="dither-container">
    <canvas ref="canvas" />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount, watch, toRefs } from 'vue'
import * as THREE from 'three'

// ── Shape & Type enums ────────────────────────────────────────
export type DitheringShape = 'simplex' | 'warp' | 'dots' | 'wave' | 'ripple' | 'swirl' | 'sphere'
export type DitheringType = 'random' | '2x2' | '4x4' | '8x8'
export type FitMode = 'none' | 'contain' | 'cover'

const ShapeMap: Record<DitheringShape, number> = {
  simplex: 1,
  warp: 2,
  dots: 3,
  wave: 4,
  ripple: 5,
  swirl: 6,
  sphere: 7,
}

const TypeMap: Record<DitheringType, number> = {
  random: 1,
  '2x2': 2,
  '4x4': 3,
  '8x8': 4,
}

const FitMap: Record<FitMode, number> = {
  none: 0,
  contain: 1,
  cover: 2,
}

// ── Props ─────────────────────────────────────────────────────
const props = withDefaults(
  defineProps<{
    /** Foreground (ink) color - CSS hex string */
    colorFront?: string
    /** Background color - CSS hex string */
    colorBack?: string
    /** Foreground color for light mode (used when themeAware is true) */
    colorFrontLight?: string
    /** Background color for light mode (used when themeAware is true) */
    colorBackLight?: string
    /** Auto-swap colors based on Maya's data-theme attribute */
    themeAware?: boolean
    /** Shape pattern: simplex | warp | dots | wave | ripple | swirl | sphere */
    shape?: DitheringShape
    /** Dither type: random | 2x2 | 4x4 | 8x8 */
    type?: DitheringType
    /** Pixel size of dithering grid (0.5–20) */
    size?: number
    /** Fit mode: none | contain | cover */
    fit?: FitMode
    /** Overall zoom/scale (0.01–4) */
    scale?: number
    /** Rotation in degrees (0–360) */
    rotation?: number
    /** Horizontal offset (-1 to 1) */
    offsetX?: number
    /** Vertical offset (-1 to 1) */
    offsetY?: number
    /** Origin X reference (0 to 1) */
    originX?: number
    /** Origin Y reference (0 to 1) */
    originY?: number
    /** Virtual world width (0 = use canvas width) */
    worldWidth?: number
    /** Virtual world height (0 = use canvas height) */
    worldHeight?: number
    /** Animation speed multiplier */
    speed?: number
  }>(),
  {
    colorFront: '#ED00B5',
    colorBack: '#000000',
    colorFrontLight: '',
    colorBackLight: '',
    themeAware: false,
    shape: 'simplex',
    type: '8x8',
    size: 3,
    fit: 'none',
    scale: 1,
    rotation: 0,
    offsetX: 0,
    offsetY: 0,
    originX: 0.5,
    originY: 0.5,
    worldWidth: 0,
    worldHeight: 0,
    speed: 1,
  },
)

const {
  colorFront, colorBack, colorFrontLight, colorBackLight, themeAware,
  shape, type, size, fit, scale, rotation,
  offsetX, offsetY, originX, originY, worldWidth, worldHeight, speed,
} = toRefs(props)

// ── Theme-aware color resolution ──────────────────────────────
import { useMayaTheme } from '../composables/useMayaTheme'
const { isLight: isLightTheme } = useMayaTheme()

const resolvedFront = computed(() => {
  if (themeAware.value && isLightTheme.value && colorFrontLight.value) {
    return colorFrontLight.value
  }
  return colorFront.value
})

const resolvedBack = computed(() => {
  if (themeAware.value && isLightTheme.value && colorBackLight.value) {
    return colorBackLight.value
  }
  return colorBack.value
})

// ── Helpers ───────────────────────────────────────────────────
function hexToRGBA(hex: string): [number, number, number, number] {
  const h = hex.replace('#', '')
  const hasAlpha = h.length === 8
  const r = parseInt(h.substring(0, 2), 16) / 255
  const g = parseInt(h.substring(2, 4), 16) / 255
  const b = parseInt(h.substring(4, 6), 16) / 255
  const a = hasAlpha ? parseInt(h.substring(6, 8), 16) / 255 : 1.0
  return [r, g, b, a]
}

const container = ref<HTMLDivElement | null>(null)
const canvas = ref<HTMLCanvasElement | null>(null)

// ── Uniforms Interface ────────────────────────────────────────
interface Uniforms {
  uTime: { value: number }
  uResolution: { value: THREE.Vector2 }
  uPixelRatio: { value: number }
  uOriginX: { value: number }
  uOriginY: { value: number }
  uWorldWidth: { value: number }
  uWorldHeight: { value: number }
  uFit: { value: number }
  uScale: { value: number }
  uRotation: { value: number }
  uOffsetX: { value: number }
  uOffsetY: { value: number }
  uPxSize: { value: number }
  uColorFront: { value: THREE.Vector4 }
  uColorBack: { value: THREE.Vector4 }
  uShape: { value: number }
  uType: { value: number }
}

let renderer: THREE.WebGLRenderer | null = null
let animationId: number | null = null
let uniforms: Uniforms | null = null

// ── Vertex Shader ─────────────────────────────────────────────
const vertexShader = /* glsl */ `
  void main() {
    gl_Position = vec4(position, 1.0);
  }
`

// ── Fragment Shader ───────────────────────────────────────────
// Faithfully ported from reference dithering.ts - all shapes, types, sizing
const fragmentShader = /* glsl */ `
  precision highp float;

  uniform float uTime;
  uniform vec2 uResolution;
  uniform float uPixelRatio;
  uniform float uOriginX;
  uniform float uOriginY;
  uniform float uWorldWidth;
  uniform float uWorldHeight;
  uniform float uFit;
  uniform float uScale;
  uniform float uRotation;
  uniform float uOffsetX;
  uniform float uOffsetY;

  uniform float uPxSize;
  uniform vec4 uColorBack;
  uniform vec4 uColorFront;
  uniform float uShape;
  uniform float uType;

  // ── Constants ──
  #define PI 3.14159265358979323846
  #define TWO_PI 6.28318530717958647692

  // ── 2D Simplex Noise ────────────────────────────────────────
  vec3 mod289v3(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec2 mod289v2(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec3 permute3(vec3 x) { return mod289v3(((x * 34.0) + 10.0) * x); }

  float snoise(vec2 v) {
    const vec4 C = vec4(
      0.211324865405187,
      0.366025403784439,
     -0.577350269189626,
      0.024390243902439
    );
    vec2 i  = floor(v + dot(v, C.yy));
    vec2 x0 = v - i + dot(i, C.xx);
    vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
    vec4 x12 = x0.xyxy + C.xxzz;
    x12.xy -= i1;
    i = mod289v2(i);
    vec3 p = permute3(permute3(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));
    vec3 m = max(0.5 - vec3(dot(x0, x0), dot(x12.xy, x12.xy), dot(x12.zw, x12.zw)), 0.0);
    m = m * m;
    m = m * m;
    vec3 x = 2.0 * fract(p * C.www) - 1.0;
    vec3 h = abs(x) - 0.5;
    vec3 ox = floor(x + 0.5);
    vec3 a0 = x - ox;
    m *= 1.79284291400159 - 0.85373472095314 * (a0 * a0 + h * h);
    vec3 g;
    g.x = a0.x * x0.x + h.x * x0.y;
    g.yz = a0.yz * x12.xz + h.yz * x12.yw;
    return 130.0 * dot(m, g);
  }

  // ── Noise shape (2-octave simplex) ──────────────────────────
  float getSimplexNoise(vec2 uv, float t) {
    float noise = 0.5 * snoise(uv - vec2(0.0, 0.3 * t));
    noise += 0.5 * snoise(2.0 * uv + vec2(0.0, 0.32 * t));
    return noise;
  }

  // ── Procedural hash functions ───────────────────────────────
  float hash11(float p) {
    p = fract(p * 0.1031);
    p *= p + 33.33;
    p *= p + p;
    return fract(p);
  }

  float hash21(vec2 p) {
    vec3 p3 = fract(vec3(p.xyx) * 0.1031);
    p3 += dot(p3, p3.yzx + 33.33);
    return fract((p3.x + p3.y) * p3.z);
  }

  // ── Bayer matrices (WebGL1-safe, no int arrays) ─────────────
  float getBayer2(vec2 uv) {
    ivec2 pos = ivec2(mod(uv, 2.0));
    int idx = pos.y * 2 + pos.x;
    if (idx == 0) return 0.0 / 4.0;
    if (idx == 1) return 2.0 / 4.0;
    if (idx == 2) return 3.0 / 4.0;
    return 1.0 / 4.0;
  }

  float getBayer4(vec2 uv) {
    ivec2 pos = ivec2(mod(uv, 4.0));
    int idx = pos.y * 4 + pos.x;
    if (idx == 0) return 0.0 / 16.0;
    if (idx == 1) return 8.0 / 16.0;
    if (idx == 2) return 2.0 / 16.0;
    if (idx == 3) return 10.0 / 16.0;
    if (idx == 4) return 12.0 / 16.0;
    if (idx == 5) return 4.0 / 16.0;
    if (idx == 6) return 14.0 / 16.0;
    if (idx == 7) return 6.0 / 16.0;
    if (idx == 8) return 3.0 / 16.0;
    if (idx == 9) return 11.0 / 16.0;
    if (idx == 10) return 1.0 / 16.0;
    if (idx == 11) return 9.0 / 16.0;
    if (idx == 12) return 15.0 / 16.0;
    if (idx == 13) return 7.0 / 16.0;
    if (idx == 14) return 13.0 / 16.0;
    return 5.0 / 16.0;
  }

  float getBayer8(vec2 uv) {
    ivec2 pos = ivec2(mod(uv, 8.0));
    int idx = pos.y * 8 + pos.x;
    // Row 0
    if (idx == 0) return 0.0 / 64.0;
    if (idx == 1) return 32.0 / 64.0;
    if (idx == 2) return 8.0 / 64.0;
    if (idx == 3) return 40.0 / 64.0;
    if (idx == 4) return 2.0 / 64.0;
    if (idx == 5) return 34.0 / 64.0;
    if (idx == 6) return 10.0 / 64.0;
    if (idx == 7) return 42.0 / 64.0;
    // Row 1
    if (idx == 8) return 48.0 / 64.0;
    if (idx == 9) return 16.0 / 64.0;
    if (idx == 10) return 56.0 / 64.0;
    if (idx == 11) return 24.0 / 64.0;
    if (idx == 12) return 50.0 / 64.0;
    if (idx == 13) return 18.0 / 64.0;
    if (idx == 14) return 58.0 / 64.0;
    if (idx == 15) return 26.0 / 64.0;
    // Row 2
    if (idx == 16) return 12.0 / 64.0;
    if (idx == 17) return 44.0 / 64.0;
    if (idx == 18) return 4.0 / 64.0;
    if (idx == 19) return 36.0 / 64.0;
    if (idx == 20) return 14.0 / 64.0;
    if (idx == 21) return 46.0 / 64.0;
    if (idx == 22) return 6.0 / 64.0;
    if (idx == 23) return 38.0 / 64.0;
    // Row 3
    if (idx == 24) return 60.0 / 64.0;
    if (idx == 25) return 28.0 / 64.0;
    if (idx == 26) return 52.0 / 64.0;
    if (idx == 27) return 20.0 / 64.0;
    if (idx == 28) return 62.0 / 64.0;
    if (idx == 29) return 30.0 / 64.0;
    if (idx == 30) return 54.0 / 64.0;
    if (idx == 31) return 22.0 / 64.0;
    // Row 4
    if (idx == 32) return 3.0 / 64.0;
    if (idx == 33) return 35.0 / 64.0;
    if (idx == 34) return 11.0 / 64.0;
    if (idx == 35) return 43.0 / 64.0;
    if (idx == 36) return 1.0 / 64.0;
    if (idx == 37) return 33.0 / 64.0;
    if (idx == 38) return 9.0 / 64.0;
    if (idx == 39) return 41.0 / 64.0;
    // Row 5
    if (idx == 40) return 51.0 / 64.0;
    if (idx == 41) return 19.0 / 64.0;
    if (idx == 42) return 59.0 / 64.0;
    if (idx == 43) return 27.0 / 64.0;
    if (idx == 44) return 49.0 / 64.0;
    if (idx == 45) return 17.0 / 64.0;
    if (idx == 46) return 57.0 / 64.0;
    if (idx == 47) return 25.0 / 64.0;
    // Row 6
    if (idx == 48) return 15.0 / 64.0;
    if (idx == 49) return 47.0 / 64.0;
    if (idx == 50) return 7.0 / 64.0;
    if (idx == 51) return 39.0 / 64.0;
    if (idx == 52) return 13.0 / 64.0;
    if (idx == 53) return 45.0 / 64.0;
    if (idx == 54) return 5.0 / 64.0;
    if (idx == 55) return 37.0 / 64.0;
    // Row 7
    if (idx == 56) return 63.0 / 64.0;
    if (idx == 57) return 31.0 / 64.0;
    if (idx == 58) return 55.0 / 64.0;
    if (idx == 59) return 23.0 / 64.0;
    if (idx == 60) return 61.0 / 64.0;
    if (idx == 61) return 29.0 / 64.0;
    if (idx == 62) return 53.0 / 64.0;
    return 21.0 / 64.0;
  }

  // ── Bayer dispatch ──────────────────────────────────────────
  float getBayerValue(vec2 uv, int sz) {
    if (sz == 2) return getBayer2(uv);
    if (sz == 4) return getBayer4(uv);
    return getBayer8(uv);
  }

  // ── Main ────────────────────────────────────────────────────
  void main() {
    float t = 0.5 * uTime;

    // ── Pixel grid (from reference: gl_FragCoord-based) ───────
    float pxSize = uPxSize * uPixelRatio;
    vec2 pxSizeUV = (gl_FragCoord.xy - 0.5 * uResolution) / pxSize;
    vec2 canvasPixelizedUV = (floor(pxSizeUV) + 0.5) * pxSize;
    vec2 normalizedUV = canvasPixelizedUV / uResolution;

    vec2 ditheringNoiseUV = canvasPixelizedUV;
    vec2 shapeUV = normalizedUV;

    // ── Sizing / fitting system (from reference) ──────────────
    vec2 boxOrigin = vec2(0.5 - uOriginX, uOriginY - 0.5);
    vec2 givenBoxSize = vec2(uWorldWidth, uWorldHeight);
    givenBoxSize = max(givenBoxSize, vec2(1.0)) * uPixelRatio;
    float r = uRotation * PI / 180.0;
    mat2 graphicRotation = mat2(cos(r), sin(r), -sin(r), cos(r));

    float patternBoxRatio = givenBoxSize.x / givenBoxSize.y;
    vec2 boxSize = vec2(
      (uWorldWidth == 0.0) ? uResolution.x : givenBoxSize.x,
      (uWorldHeight == 0.0) ? uResolution.y : givenBoxSize.y
    );

    if (uShape > 3.5) {
      // Object shapes (wave, ripple, swirl, sphere) - square fitting
      vec2 objectBoxSize = vec2(0.0);
      objectBoxSize.x = min(boxSize.x, boxSize.y);
      if (uFit == 1.0) {
        objectBoxSize.x = min(uResolution.x, uResolution.y);
      } else if (uFit == 2.0) {
        objectBoxSize.x = max(uResolution.x, uResolution.y);
      }
      objectBoxSize.y = objectBoxSize.x;
      vec2 objectWorldScale = uResolution.xy / objectBoxSize;

      shapeUV *= objectWorldScale;
      shapeUV += boxOrigin * (objectWorldScale - 1.0);
      shapeUV += vec2(-uOffsetX, uOffsetY);
      shapeUV /= uScale;
      shapeUV = graphicRotation * shapeUV;
    } else {
      // Pattern shapes (simplex, warp, dots) - aspect-ratio fitting
      vec2 patternBoxSize = vec2(0.0);
      patternBoxSize.x = patternBoxRatio * min(boxSize.x / patternBoxRatio, boxSize.y);
      float patternWorldNoFitBoxWidth = patternBoxSize.x;
      if (uFit == 1.0) {
        patternBoxSize.x = patternBoxRatio * min(uResolution.x / patternBoxRatio, uResolution.y);
      } else if (uFit == 2.0) {
        patternBoxSize.x = patternBoxRatio * max(uResolution.x / patternBoxRatio, uResolution.y);
      }
      patternBoxSize.y = patternBoxSize.x / patternBoxRatio;
      vec2 patternWorldScale = uResolution.xy / patternBoxSize;

      shapeUV += vec2(-uOffsetX, uOffsetY) / patternWorldScale;
      shapeUV += boxOrigin;
      shapeUV -= boxOrigin / patternWorldScale;
      shapeUV *= uResolution.xy;
      shapeUV /= uPixelRatio;
      if (uFit > 0.0) {
        shapeUV *= (patternWorldNoFitBoxWidth / patternBoxSize.x);
      }
      shapeUV /= uScale;
      shapeUV = graphicRotation * shapeUV;
      shapeUV += boxOrigin / patternWorldScale;
      shapeUV -= boxOrigin;
      shapeUV += 0.5;
    }

    // ── Shape selection ───────────────────────────────────────
    float shape = 0.0;

    if (uShape < 1.5) {
      // 1. Simplex noise
      shapeUV *= 0.001;
      shape = 0.5 + 0.5 * getSimplexNoise(shapeUV, t);
      shape = smoothstep(0.3, 0.9, shape);

    } else if (uShape < 2.5) {
      // 2. Warp
      shapeUV *= 0.003;
      for (float i = 1.0; i < 6.0; i++) {
        shapeUV.x += 0.6 / i * cos(i * 2.5 * shapeUV.y + t);
        shapeUV.y += 0.6 / i * cos(i * 1.5 * shapeUV.x + t);
      }
      shape = 0.15 / max(0.001, abs(sin(t - shapeUV.y - shapeUV.x)));
      shape = smoothstep(0.02, 1.0, shape);

    } else if (uShape < 3.5) {
      // 3. Dots
      shapeUV *= 0.05;
      float stripeIdx = floor(2.0 * shapeUV.x / TWO_PI);
      float rand = hash11(stripeIdx * 10.0);
      rand = sign(rand - 0.5) * pow(0.1 + abs(rand), 0.4);
      shape = sin(shapeUV.x) * cos(shapeUV.y - 5.0 * rand * t);
      shape = pow(abs(shape), 6.0);

    } else if (uShape < 4.5) {
      // 4. Sine wave
      shapeUV *= 4.0;
      float wave = cos(0.5 * shapeUV.x - 2.0 * t) * sin(1.5 * shapeUV.x + t) * (0.75 + 0.25 * cos(3.0 * t));
      shape = 1.0 - smoothstep(-1.0, 1.0, shapeUV.y + wave);

    } else if (uShape < 5.5) {
      // 5. Ripple
      float dist = length(shapeUV);
      float waves = sin(pow(dist, 1.7) * 7.0 - 3.0 * t) * 0.5 + 0.5;
      shape = waves;

    } else if (uShape < 6.5) {
      // 6. Swirl
      float l = length(shapeUV);
      float angle = 6.0 * atan(shapeUV.y, shapeUV.x) + 4.0 * t;
      float twist = 1.2;
      float offset = 1.0 / pow(max(l, 1e-6), twist) + angle / TWO_PI;
      float mid = smoothstep(0.0, 1.0, pow(l, twist));
      shape = mix(0.0, fract(offset), mid);

    } else {
      // 7. Sphere
      shapeUV *= 2.0;
      float d = 1.0 - pow(length(shapeUV), 2.0);
      vec3 pos = vec3(shapeUV, sqrt(max(0.0, d)));
      vec3 lightPos = normalize(vec3(cos(1.5 * t), 0.8, sin(1.25 * t)));
      shape = 0.5 + 0.5 * dot(lightPos, pos);
      shape *= step(0.0, d);
    }

    // ── Dithering type selection ──────────────────────────────
    int ditherType = int(floor(uType));
    float dithering = 0.0;

    if (ditherType == 1) {
      // Random
      dithering = step(hash21(ditheringNoiseUV), shape);
      // For random, skip the offset formula - it's already binary
      vec3 fgColor = uColorFront.rgb * uColorFront.a;
      float fgOpacity = uColorFront.a;
      vec3 bgColor = uColorBack.rgb * uColorBack.a;
      float bgOpacity = uColorBack.a;
      vec3 color = fgColor * dithering;
      float opacity = fgOpacity * dithering;
      color += bgColor * (1.0 - opacity);
      opacity += bgOpacity * (1.0 - opacity);
      gl_FragColor = vec4(color, opacity);
      return;
    } else if (ditherType == 2) {
      dithering = getBayerValue(pxSizeUV, 2);
    } else if (ditherType == 3) {
      dithering = getBayerValue(pxSizeUV, 4);
    } else {
      dithering = getBayerValue(pxSizeUV, 8);
    }

    // ── Dither formula (from reference) ───────────────────────
    dithering -= 0.5;
    float res = step(0.5, shape + dithering);

    // ── Two-color compositing (from reference) ────────────────
    vec3 fgColor = uColorFront.rgb * uColorFront.a;
    float fgOpacity = uColorFront.a;
    vec3 bgColor = uColorBack.rgb * uColorBack.a;
    float bgOpacity = uColorBack.a;

    vec3 color = fgColor * res;
    float opacity = fgOpacity * res;

    color += bgColor * (1.0 - opacity);
    opacity += bgOpacity * (1.0 - opacity);

    gl_FragColor = vec4(color, opacity);
  }
`

onMounted(() => {
  if (!canvas.value || !container.value) return

  // ── Renderer ──
  renderer = new THREE.WebGLRenderer({
    canvas: canvas.value,
    antialias: false,
    alpha: true,
  })
  const pixelRatio = Math.min(window.devicePixelRatio, 2)
  renderer.setPixelRatio(pixelRatio)
  renderer.setClearColor(0x000000, 0)

  const width = container.value.clientWidth
  const height = container.value.clientHeight
  renderer.setSize(width, height)

  // ── Scene + Camera ──
  const scene = new THREE.Scene()
  const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1)



  // ── Initial uniform values ──
  const [fr, fg, fb, fa] = hexToRGBA(resolvedFront.value)
  const [br, bg, bb, ba] = hexToRGBA(resolvedBack.value)

  uniforms = {
    uTime: { value: 0 },
    uResolution: { value: new THREE.Vector2(width * pixelRatio, height * pixelRatio) },
    uPixelRatio: { value: pixelRatio },
    uOriginX: { value: originX.value },
    uOriginY: { value: originY.value },
    uWorldWidth: { value: worldWidth.value },
    uWorldHeight: { value: worldHeight.value },
    uFit: { value: FitMap[fit.value] },
    uScale: { value: scale.value },
    uRotation: { value: rotation.value },
    uOffsetX: { value: offsetX.value },
    uOffsetY: { value: offsetY.value },
    uPxSize: { value: size.value },
    uColorFront: { value: new THREE.Vector4(fr, fg, fb, fa) },
    uColorBack: { value: new THREE.Vector4(br, bg, bb, ba) },
    uShape: { value: ShapeMap[shape.value] },
    uType: { value: TypeMap[type.value] },
  }

  const material = new THREE.ShaderMaterial({
    vertexShader,
    fragmentShader,
    uniforms: uniforms as any,
    transparent: true,
  })

  // Fullscreen quad
  const geometry = new THREE.PlaneGeometry(2, 2)
  const mesh = new THREE.Mesh(geometry, material)
  scene.add(mesh)

  // ── Resize handler ──
  const onResize = () => {
    if (!renderer || !container.value || !uniforms) return
    const w = container.value.clientWidth
    const h = container.value.clientHeight
    renderer.setSize(w, h)
    const pr = renderer.getPixelRatio()
    uniforms.uResolution.value.set(w * pr, h * pr)
    uniforms.uPixelRatio.value = pr
  }

  window.addEventListener('resize', onResize)

  // ── Animation loop ──
  const clock = new THREE.Clock()

  const animate = () => {
    animationId = requestAnimationFrame(animate)
    uniforms!.uTime.value = clock.getElapsedTime() * speed.value
    renderer!.render(scene, camera)
  }

  animate()

  // ── Cleanup ──
  onBeforeUnmount(() => {
    window.removeEventListener('resize', onResize)
    if (animationId !== null) cancelAnimationFrame(animationId)
    geometry.dispose()
    material.dispose()
    renderer?.dispose()
    renderer = null
  })
})

// ── Reactive prop watchers → update uniforms ──────────────────
watch(shape, (v) => { if (uniforms) uniforms.uShape.value = ShapeMap[v] })
watch(type, (v) => { if (uniforms) uniforms.uType.value = TypeMap[v] })
watch(size, (v) => { if (uniforms) uniforms.uPxSize.value = v })
watch(fit, (v) => { if (uniforms) uniforms.uFit.value = FitMap[v] })
watch(scale, (v) => { if (uniforms) uniforms.uScale.value = v })
watch(rotation, (v) => { if (uniforms) uniforms.uRotation.value = v })
watch(offsetX, (v) => { if (uniforms) uniforms.uOffsetX.value = v })
watch(offsetY, (v) => { if (uniforms) uniforms.uOffsetY.value = v })
watch(originX, (v) => { if (uniforms) uniforms.uOriginX.value = v })
watch(originY, (v) => { if (uniforms) uniforms.uOriginY.value = v })
watch(worldWidth, (v) => { if (uniforms) uniforms.uWorldWidth.value = v })
watch(worldHeight, (v) => { if (uniforms) uniforms.uWorldHeight.value = v })
watch(resolvedFront, (v) => {
  if (!uniforms) return
  const [r, g, b, a] = hexToRGBA(v)
  uniforms.uColorFront.value.set(r, g, b, a)
})
watch(resolvedBack, (v) => {
  if (!uniforms) return
  const [r, g, b, a] = hexToRGBA(v)
  uniforms.uColorBack.value.set(r, g, b, a)
})
</script>

<style scoped>
.dither-container {
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.dither-container canvas {
  display: block;
  width: 100%;
  height: 100%;
}
</style>
