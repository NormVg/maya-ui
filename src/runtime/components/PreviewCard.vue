<template>
  <div class="maya-preview-card" :class="[variant, { 'is-interactive': interactive }]">
    <div v-if="imageUrl" class="maya-preview-card-bg">
      <img :src="imageUrl" alt="" aria-hidden="true" class="maya-preview-card-img" />
    </div>

    <!-- Shine gradient overlay for interactive depth -->
    <div v-if="interactive" class="maya-preview-card-shine"></div>

    <div class="maya-preview-card-content">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  imageUrl: {
    type: String,
    default: undefined
  },
  interactive: {
    type: Boolean,
    default: false
  },
  variant: {
    type: String,
    default: 'default', // 'default', 'compact', 'expanded'
  }
})
</script>

<style scoped>
.maya-preview-card {
  position: relative;
  display: flex;
  flex-direction: column;
  background-color: var(--maya-bg-surface);
  border-radius: var(--maya-radius-xl, 16px);
  border: 1px solid var(--maya-border);
  overflow: hidden;

  /* Advanced outer and inner depth as required by ui-rules */
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.04),
    0 4px 12px rgba(0, 0, 0, 0.1);

  transition:
    border-color 300ms ease,
    box-shadow 300ms var(--maya-ease-bouncy, cubic-bezier(0.34, 1.56, 0.64, 1)),
    transform 300ms var(--maya-ease-bouncy);
}

.maya-preview-card.is-interactive {
  cursor: pointer;
}

.maya-preview-card.is-interactive:hover {
  border-color: var(--maya-border-hover);
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.06),
    0 8px 32px rgba(0, 0, 0, 0.2);
  transform: translateY(-2px) scale(1.01);
}

.maya-preview-card.is-interactive:active {
  transform: translateY(1px) scale(0.98);
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.02),
    0 2px 4px rgba(0, 0, 0, 0.1);
}

/* Base Image Wrapper */
.maya-preview-card-bg {
  position: absolute;
  inset: 0;
  z-index: 0;
  opacity: 0.15;
  transition: opacity 300ms ease;
  pointer-events: none;
}

.maya-preview-card.is-interactive:hover .maya-preview-card-bg {
  opacity: 0.25;
}

.maya-preview-card-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* Glassmorphic Shine / Flare Effect */
.maya-preview-card-shine {
  position: absolute;
  inset: 0;
  z-index: 1;
  background: radial-gradient(
    800px circle at top center,
    rgba(255, 255, 255, 0.08),
    transparent 40%
  );
  opacity: 0;
  transition: opacity 400ms ease;
  pointer-events: none;
}

.maya-preview-card.is-interactive:hover .maya-preview-card-shine {
  opacity: 1;
}

/* Content Area */
.maya-preview-card-content {
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  flex: 1;
}

/* Variants */
.maya-preview-card.default .maya-preview-card-content {
  padding: 1.5rem;
}

.maya-preview-card.compact .maya-preview-card-content {
  padding: 1rem;
}

.maya-preview-card.expanded .maya-preview-card-content {
  padding: 2.5rem;
}
</style>
