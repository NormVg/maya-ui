<template>
  <div class="maya-empty-state">
    <Transition appear name="maya-empty-bounce">
      <div class="maya-empty-state__inner">

        <div v-if="icon || $slots.icon" class="maya-empty-state__icon-wrapper">
          <div class="maya-empty-state__icon-bg" />
          <slot name="icon">
            <component :is="icon" v-if="icon" class="maya-empty-state__icon" />
          </slot>
        </div>

        <div class="maya-empty-state__text">
          <h3 class="maya-empty-state__title">
            <slot name="title">{{ title }}</slot>
          </h3>
          <p class="maya-empty-state__desc">
            <slot name="description">{{ description }}</slot>
          </p>
        </div>

        <div v-if="$slots.default" class="maya-empty-state__actions">
          <slot />
        </div>

      </div>
    </Transition>
  </div>
</template>

<script setup>
const props = defineProps({
  title: {
    type: String,
    default: 'No items found'
  },
  description: {
    type: String,
    default: 'There is nothing to display here right now.'
  },
  icon: {
    type: [Object, Function, String],
    default: null
  }
})
</script>

<style scoped>
.maya-empty-state {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 48px 24px;
  border: 1px dashed var(--maya-dash-color);
  border-radius: var(--maya-radius-lg);
  background-color: transparent;
  font-family: var(--maya-font-sans);
  overflow: hidden;
}

.maya-empty-state__inner {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  max-width: 400px;
}

/* ─── Icon Layering ─── */
.maya-empty-state__icon-wrapper {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 64px;
  height: 64px;
  margin-bottom: 24px;
}

/* A soft, desaturated background disc behind the icon */
.maya-empty-state__icon-bg {
  position: absolute;
  inset: 0;
  border-radius: 9999px;
  background-color: var(--maya-text-muted);
  opacity: 0.15;
  z-index: 0;
}

.maya-empty-state__icon {
  position: relative;
  z-index: 1;
  width: 32px;
  height: 32px;
  color: var(--maya-text-secondary);
  stroke-width: 1.5px;
}

/* ─── Text ─── */
.maya-empty-state__text {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 24px;
}

.maya-empty-state__title {
  font-size: 1.125rem;
  font-weight: 600;
  color: var(--maya-text-primary);
  margin: 0;
  letter-spacing: -0.01em;
}

.maya-empty-state__desc {
  font-size: 0.9375rem;
  color: var(--maya-text-secondary);
  line-height: 1.5;
  margin: 0;
}

/* ─── Actions ─── */
.maya-empty-state__actions {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
}

/* ─── Entrance Animation (Spring) ─── */
.maya-empty-bounce-enter-active {
  transition: opacity 400ms var(--maya-ease-bouncy), transform 500ms var(--maya-ease-bouncy);
}

.maya-empty-bounce-enter-from {
  opacity: 0;
  transform: scale(0.9) translateY(12px);
}
</style>
