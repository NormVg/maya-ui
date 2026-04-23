<template>
  <div v-show="isActive" class="maya-tabs-content" :data-state="isActive ? 'active' : 'inactive'"
    :data-tab-value="value" role="tabpanel">
    <slot v-if="isActive || forceMount" />
  </div>
</template>

<script setup>
import { inject, computed } from 'vue'

const props = defineProps({
  value: {
    type: String,
    required: true,
  },
  forceMount: {
    type: Boolean,
    default: false
  }
})

const activeTab = inject('mayaTabsActive')
const isActive = computed(() => activeTab.value === props.value)
</script>

<style scoped>
.maya-tabs-content {
  margin-top: 16px;
  animation: maya-tab-content-enter 300ms var(--maya-ease-out) forwards;
}

.maya-tabs[data-orientation="vertical"] .maya-tabs-content {
  margin-top: 0;
  flex: 1;
  /* takes up remaining horizontal space */
}

@keyframes maya-tab-content-enter {
  from {
    opacity: 0;
    transform: translateY(4px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
