<template>
  <div class="fudo-pixel-loader" :class="[`fudo-pixel-loader--${variant}`, `fudo-pixel-loader--${size}`]">
    <div v-for="i in 16" :key="i" class="fudo-pixel" :class="`fudo-pixel-${i}`"></div>
  </div>
</template>

<script setup lang="ts">
withDefaults(defineProps<{
  variant?: 'pulse' | 'wave' | 'glitch' | 'snake'
  size?: 'sm' | 'md' | 'lg'
}>(), {
  variant: 'pulse',
  size: 'md'
})
</script>

<style scoped>
.fudo-pixel-loader {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(4, 1fr);
  gap: 2px;
}

.fudo-pixel-loader--sm {
  width: 16px;
  height: 16px;
  gap: 1px;
}

.fudo-pixel-loader--md {
  width: 24px;
  height: 24px;
  gap: 2px;
}

.fudo-pixel-loader--lg {
  width: 32px;
  height: 32px;
  gap: 3px;
}

.fudo-pixel {
  background: var(--fudo-text);
  opacity: 0.1;
}

/* ============================
   VARIANT: PULSE
   ============================ */
.fudo-pixel-loader--pulse .fudo-pixel {
  animation: fudo-pixel-pulse 1.2s infinite alternate var(--ease-snappy);
}

.fudo-pixel-loader--pulse .fudo-pixel:nth-child(2n) {
  animation-delay: 0.2s;
}

.fudo-pixel-loader--pulse .fudo-pixel:nth-child(3n) {
  animation-delay: 0.4s;
}

.fudo-pixel-loader--pulse .fudo-pixel:nth-child(5n) {
  animation-delay: 0.6s;
}

.fudo-pixel-loader--pulse .fudo-pixel:nth-child(7n) {
  animation-delay: 0.8s;
}

@keyframes fudo-pixel-pulse {
  0% {
    opacity: 0.05;
  }

  100% {
    opacity: 1;
    border-radius: 1px;
    transform: scale(0.9);
  }
}

/* ============================
   VARIANT: WAVE
   ============================ */
.fudo-pixel-loader--wave .fudo-pixel {
  animation: fudo-pixel-pulse 0.8s infinite alternate ease-in-out;
}

/* Diagonal mapping 1 to 16 in 4x4:
   1  2  3  4
   5  6  7  8
   9  10 11 12
   13 14 15 16
*/
.fudo-pixel-loader--wave .fudo-pixel-1 {
  animation-delay: 0s;
}

.fudo-pixel-loader--wave .fudo-pixel-2,
.fudo-pixel-loader--wave .fudo-pixel-5 {
  animation-delay: 0.1s;
}

.fudo-pixel-loader--wave .fudo-pixel-3,
.fudo-pixel-loader--wave .fudo-pixel-6,
.fudo-pixel-loader--wave .fudo-pixel-9 {
  animation-delay: 0.2s;
}

.fudo-pixel-loader--wave .fudo-pixel-4,
.fudo-pixel-loader--wave .fudo-pixel-7,
.fudo-pixel-loader--wave .fudo-pixel-10,
.fudo-pixel-loader--wave .fudo-pixel-13 {
  animation-delay: 0.3s;
}

.fudo-pixel-loader--wave .fudo-pixel-8,
.fudo-pixel-loader--wave .fudo-pixel-11,
.fudo-pixel-loader--wave .fudo-pixel-14 {
  animation-delay: 0.4s;
}

.fudo-pixel-loader--wave .fudo-pixel-12,
.fudo-pixel-loader--wave .fudo-pixel-15 {
  animation-delay: 0.5s;
}

.fudo-pixel-loader--wave .fudo-pixel-16 {
  animation-delay: 0.6s;
}

/* ============================
   VARIANT: GLITCH
   ============================ */
.fudo-pixel-loader--glitch .fudo-pixel {
  animation: fudo-pixel-glitch 0.5s infinite steps(2, end);
}

.fudo-pixel-loader--glitch .fudo-pixel:nth-child(even) {
  animation-duration: 0.3s;
  animation-direction: reverse;
}

.fudo-pixel-loader--glitch .fudo-pixel:nth-child(3n) {
  animation-duration: 0.7s;
}

.fudo-pixel-loader--glitch .fudo-pixel:nth-child(5n) {
  animation-duration: 0.2s;
}

@keyframes fudo-pixel-glitch {
  0% {
    opacity: 0;
  }

  30% {
    opacity: 1;
    transform: translateX(1px);
  }

  60% {
    opacity: 0;
    transform: translateX(-1px);
  }

  100% {
    opacity: 0.8;
  }
}

/* ============================
   VARIANT: SNAKE
   ============================ */
.fudo-pixel-loader--snake .fudo-pixel {
  opacity: 0.05;
  animation: fudo-pixel-snake 1.6s infinite;
}

/* Perimeter snake: 1,2,3,4 -> 8,12,16 -> 15,14,13 -> 9,5 -> loop */
.fudo-pixel-loader--snake .fudo-pixel-1 {
  animation-delay: 0.0s;
}

.fudo-pixel-loader--snake .fudo-pixel-2 {
  animation-delay: 0.1s;
}

.fudo-pixel-loader--snake .fudo-pixel-3 {
  animation-delay: 0.2s;
}

.fudo-pixel-loader--snake .fudo-pixel-4 {
  animation-delay: 0.3s;
}

.fudo-pixel-loader--snake .fudo-pixel-8 {
  animation-delay: 0.4s;
}

.fudo-pixel-loader--snake .fudo-pixel-12 {
  animation-delay: 0.5s;
}

.fudo-pixel-loader--snake .fudo-pixel-16 {
  animation-delay: 0.6s;
}

.fudo-pixel-loader--snake .fudo-pixel-15 {
  animation-delay: 0.7s;
}

.fudo-pixel-loader--snake .fudo-pixel-14 {
  animation-delay: 0.8s;
}

.fudo-pixel-loader--snake .fudo-pixel-13 {
  animation-delay: 0.9s;
}

.fudo-pixel-loader--snake .fudo-pixel-9 {
  animation-delay: 1.0s;
}

.fudo-pixel-loader--snake .fudo-pixel-5 {
  animation-delay: 1.1s;
}

@keyframes fudo-pixel-snake {

  0%,
  100% {
    opacity: 0.05;
    transform: scale(1);
  }

  10% {
    opacity: 1;
    transform: scale(1.2);
  }

  30% {
    opacity: 0.05;
    transform: scale(1);
  }
}
</style>
