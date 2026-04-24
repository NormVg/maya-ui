<template>
  <div class="maya-tabs" :class="`maya-tabs--${orientation}`" :data-orientation="orientation">
    <slot />
  </div>
</template>

<script setup>
import { provide, ref, watch } from 'vue'

const props = defineProps({
  defaultValue: {
    type: String,
    required: true,
  },
  orientation: {
    type: String,
    default: 'horizontal',
    validator: (v) => ['horizontal', 'vertical'].includes(v)
  },
})

// Current active tab state
const activeTab = ref(props.defaultValue)
provide('mayaTabsActive', activeTab)

// Provide orientation for vertical layout alignment
provide('mayaTabsOrientation', props.orientation)

const setActive = (value) => {
  activeTab.value = value
}
provide('mayaTabsSetActive', setActive)
</script>

<style scoped>
.maya-tabs {
  display: flex;
}

.maya-tabs--horizontal {
  flex-direction: column;
}

.maya-tabs--vertical {
  flex-direction: row;
  gap: 24px;
}
</style>
