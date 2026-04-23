<template>
  <div class="maya-dot-orbit" role="progressbar" aria-busy="true" :style="{ '--orbit-size': size + 'px' }">
    <div class="maya-dot-orbit__wrapper">
      <div class="maya-dot-orbit__dot maya-dot-orbit__dot--1" />
      <div class="maya-dot-orbit__dot maya-dot-orbit__dot--2" />
      <div class="maya-dot-orbit__dot maya-dot-orbit__dot--3" />
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  size: {
    type: Number,
    default: 40
  }
})
</script>

<style scoped>
.maya-dot-orbit {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: var(--orbit-size);
  height: var(--orbit-size);
  perspective: 200px;
}

.maya-dot-orbit__wrapper {
  position: relative;
  width: 100%;
  height: 100%;
  transform-style: preserve-3d;
  animation: maya-orbit-spin 3s linear infinite;
}

.maya-dot-orbit__dot {
  position: absolute;
  top: 50%;
  left: 50%;
  width: calc(var(--orbit-size) * 0.25);
  height: calc(var(--orbit-size) * 0.25);
  margin-top: calc(var(--orbit-size) * -0.125);
  margin-left: calc(var(--orbit-size) * -0.125);
  border-radius: 50%;
  background-color: var(--maya-text-primary);
  transform-style: preserve-3d;
}

/* We orbit them by pushing them out using translateX, then rotating the wrapper */
.maya-dot-orbit__dot--1 {
  animation: maya-dot-orbit-1 1.5s cubic-bezier(0.4, 0, 0.2, 1) infinite;
}

.maya-dot-orbit__dot--2 {
  animation: maya-dot-orbit-2 1.5s cubic-bezier(0.4, 0, 0.2, 1) infinite;
  animation-delay: -0.5s;
}

.maya-dot-orbit__dot--3 {
  animation: maya-dot-orbit-3 1.5s cubic-bezier(0.4, 0, 0.2, 1) infinite;
  animation-delay: -1s;
}

@keyframes maya-orbit-spin {
  100% {
    transform: rotateZ(360deg);
  }
}

@keyframes maya-dot-orbit-1 {
  0% {
    transform: rotateY(0deg) translateZ(calc(var(--orbit-size) * 0.35));
  }

  100% {
    transform: rotateY(360deg) translateZ(calc(var(--orbit-size) * 0.35));
  }
}

@keyframes maya-dot-orbit-2 {
  0% {
    transform: rotateY(0deg) translateZ(calc(var(--orbit-size) * 0.35));
  }

  100% {
    transform: rotateY(360deg) translateZ(calc(var(--orbit-size) * 0.35));
  }
}

@keyframes maya-dot-orbit-3 {
  0% {
    transform: rotateY(0deg) translateZ(calc(var(--orbit-size) * 0.35));
  }

  100% {
    transform: rotateY(360deg) translateZ(calc(var(--orbit-size) * 0.35));
  }
}
</style>
