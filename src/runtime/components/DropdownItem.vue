<template>
  <button class="maya-dropdown-item" :class="{ disabled, danger: variant === 'danger' }" @click="handleClick"
    :disabled="disabled" role="menuitem">
    <span v-if="$slots.icon" class="maya-dropdown-item-icon">
      <slot name="icon" />
    </span>
    <span class="maya-dropdown-item-label">
      <slot />
    </span>
    <span v-if="shortcut" class="maya-dropdown-item-shortcut">{{ shortcut }}</span>
  </button>
</template>

<script setup>
import { inject } from 'vue'

const props = defineProps({
  disabled: { type: Boolean, default: false },
  variant: { type: String, default: 'default' }, // 'default', 'danger'
  shortcut: { type: String, default: '' },
  closeOnClick: { type: Boolean, default: true }
})

const emit = defineEmits(['click'])
const closeDropdown = inject('closeDropdown', () => { })

function handleClick(e) {
  if (props.disabled) return
  emit('click', e)
  if (props.closeOnClick) {
    closeDropdown()
  }
}
</script>

<style scoped>
.maya-dropdown-item {
  display: flex;
  align-items: center;
  width: 100%;
  padding: 6px 8px;
  border: none;
  background: transparent;
  border-radius: var(--maya-radius-sm);
  font-family: var(--maya-font-sans);
  font-size: 0.875rem;
  color: var(--maya-text-primary);
  cursor: pointer;
  outline: none;
  transition: all var(--maya-duration) var(--maya-ease);
  text-align: left;
  user-select: none;
}

.maya-dropdown-item:hover,
.maya-dropdown-item:focus {
  background: var(--maya-bg-root);
}

.maya-dropdown-item:active:not(.disabled) {
  transform: scale(0.98);
}

.maya-dropdown-item.disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.maya-dropdown-item.danger {
  color: var(--maya-danger-text);
}

.maya-dropdown-item.danger:hover,
.maya-dropdown-item.danger:focus {
  background: var(--maya-danger-muted);
}

.maya-dropdown-item-icon {
  margin-right: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--maya-text-muted);
}

.maya-dropdown-item.danger .maya-dropdown-item-icon {
  color: var(--maya-danger-text);
}

.maya-dropdown-item:hover .maya-dropdown-item-icon {
  color: var(--maya-text-primary);
}

.maya-dropdown-item.danger:hover .maya-dropdown-item-icon {
  color: var(--maya-danger-text);
}

.maya-dropdown-item-label {
  flex: 1 1 auto;
}

.maya-dropdown-item-shortcut {
  flex: 0 0 auto;
  font-size: 0.75rem;
  color: var(--maya-text-muted);
  letter-spacing: 0.5px;
  margin-left: 12px;
}
</style>
