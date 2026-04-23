<template>
  <div class="maya-pixel-loader" :class="[`maya-pixel-loader--${variant}`, `maya-pixel-loader--${size}`]">
    <div v-for="i in 16" :key="i" class="maya-pixel" :class="`maya-pixel-${i}`"></div>
  </div>
</template>

<script setup>
defineProps({
  variant: {
    type: String,
    default: 'pulse',
    validator: (v) => ['pulse', 'wave', 'glitch', 'snake'].includes(v)
  },
  size: {
    type: String,
    default: 'md',
    validator: (v) => ['sm', 'md', 'lg'].includes(v)
  }
})
</script>

<style scoped>
.maya-pixel-loader {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(4, 1fr);
  gap: 2px;
}

.maya-pixel-loader--sm {
  width: 16px;
  height: 16px;
  gap: 1px;
}

.maya-pixel-loader--md {
  width: 24px;
  height: 24px;
  gap: 2px;
}

.maya-pixel-loader--lg {
  width: 32px;
  height: 32px;
  gap: 3px;
}

.maya-pixel {
  background: var(--maya-text-primary);
  opacity: 0.1;
}

/* ============================
   VARIANT: PULSE
   ============================ */
.maya-pixel-loader--pulse .maya-pixel {
  animation: maya-pixel-pulse 1.2s infinite alternate var(--maya-ease-bouncy);
}

.maya-pixel-loader--pulse .maya-pixel:nth-child(2n) {
  animation-delay: 0.2s;
}

.maya-pixel-loader--pulse .maya-pixel:nth-child(3n) {
  animation-delay: 0.4s;
}

.maya-pixel-loader--pulse .maya-pixel:nth-child(5n) {
  animation-delay: 0.6s;
}

.maya-pixel-loader--pulse .maya-pixel:nth-child(7n) {
  animation-delay: 0.8s;
}

@keyframes maya-pixel-pulse {
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
.maya-pixel-loader--wave .maya-pixel {
  animation: maya-pixel-pulse 0.8s infinite alternate ease-in-out;
}

/* Diagonal mapping 1 to 16 in 4x4:
   1  2  3  4
   5  6  7  8
   9  10 11 12
   13 14 15 16
*/
.maya-pixel-loader--wave .maya-pixel-1 {
  animation-delay: 0s;
}

.maya-pixel-loader--wave .maya-pixel-2,
.maya-pixel-loader--wave .maya-pixel-5 {
  animation-delay: 0.1s;
}

.maya-pixel-loader--wave .maya-pixel-3,
.maya-pixel-loader--wave .maya-pixel-6,
.maya-pixel-loader--wave .maya-pixel-9 {
  animation-delay: 0.2s;
}

.maya-pixel-loader--wave .maya-pixel-4,
.maya-pixel-loader--wave .maya-pixel-7,
.maya-pixel-loader--wave .maya-pixel-10,
.maya-pixel-loader--wave .maya-pixel-13 {
  animation-delay: 0.3s;
}

.maya-pixel-loader--wave .maya-pixel-8,
.maya-pixel-loader--wave .maya-pixel-11,
.maya-pixel-loader--wave .maya-pixel-14 {
  animation-delay: 0.4s;
}

.maya-pixel-loader--wave .maya-pixel-12,
.maya-pixel-loader--wave .maya-pixel-15 {
  animation-delay: 0.5s;
}

.maya-pixel-loader--wave .maya-pixel-16 {
  animation-delay: 0.6s;
}

/* ============================
   VARIANT: GLITCH
   ============================ */
.maya-pixel-loader--glitch .maya-pixel {
  animation: maya-pixel-glitch 0.5s infinite steps(2, end);
}

.maya-pixel-loader--glitch .maya-pixel:nth-child(even) {
  animation-duration: 0.3s;
  animation-direction: reverse;
}

.maya-pixel-loader--glitch .maya-pixel:nth-child(3n) {
  animation-duration: 0.7s;
}

.maya-pixel-loader--glitch .maya-pixel:nth-child(5n) {
  animation-duration: 0.2s;
}

@keyframes maya-pixel-glitch {
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
.maya-pixel-loader--snake .maya-pixel {
  opacity: 0.05;
  animation: maya-pixel-snake 1.6s infinite;
}

/* Perimeter snake: 1,2,3,4 -> 8,12,16 -> 15,14,13 -> 9,5 -> loop */
.maya-pixel-loader--snake .maya-pixel-1 {
  animation-delay: 0.0s;
}

.maya-pixel-loader--snake .maya-pixel-2 {
  animation-delay: 0.1s;
}

.maya-pixel-loader--snake .maya-pixel-3 {
  animation-delay: 0.2s;
}

.maya-pixel-loader--snake .maya-pixel-4 {
  animation-delay: 0.3s;
}

.maya-pixel-loader--snake .maya-pixel-8 {
  animation-delay: 0.4s;
}

.maya-pixel-loader--snake .maya-pixel-12 {
  animation-delay: 0.5s;
}

.maya-pixel-loader--snake .maya-pixel-16 {
  animation-delay: 0.6s;
}

.maya-pixel-loader--snake .maya-pixel-15 {
  animation-delay: 0.7s;
}

.maya-pixel-loader--snake .maya-pixel-14 {
  animation-delay: 0.8s;
}

.maya-pixel-loader--snake .maya-pixel-13 {
  animation-delay: 0.9s;
}

.maya-pixel-loader--snake .maya-pixel-9 {
  animation-delay: 1.0s;
}

.maya-pixel-loader--snake .maya-pixel-5 {
  animation-delay: 1.1s;
}

@keyframes maya-pixel-snake {

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
