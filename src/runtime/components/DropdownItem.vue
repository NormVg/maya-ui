<template>
  <button class="maya-dropdown-item" :class="{ disabled, danger: variant === 'danger' }" @click="handleClick"
    :disabled="disabled" role="menuitem">
    <span v-if="$slots.icon" class="maya-dropdown-item-icon">
      <slot name="icon" />
    </span>
    <span class="maya-dropdown-item-label">
      <slot />
    </span>
    <MayaKbd v-if="shortcut" style="margin-left: 16px;">{{ shortcut }}</MayaKbd>
  </button>
</template>

<script setup>
import { inject } from 'vue'
import MayaKbd from './Kbd.vue'

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
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
  padding: 7px 8px;
  border: none;
  background: transparent;
  border-radius: var(--maya-radius-sm);
  font-family: var(--maya-font-sans);
  font-size: 0.8125rem;
  color: var(--maya-text-primary);
  cursor: pointer;
  outline: none;
  text-align: left;
  user-select: none;
  /* ui-rules: consistent 150ms hover transition */
  transition: color 120ms cubic-bezier(0.19, 1, 0.22, 1);
}

/* Pseudo-element hover bg as per ui-rules § Pseudo-Elements */
.maya-dropdown-item::before {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: inherit;
  background: var(--maya-text-primary);
  opacity: 0;
  transform: scale(0.97);
  transition:
    opacity 120ms cubic-bezier(0.19, 1, 0.22, 1),
    transform 120ms cubic-bezier(0.19, 1, 0.22, 1);
}

.maya-dropdown-item:hover::before,
.maya-dropdown-item:focus::before {
  opacity: 0.06;
  transform: scale(1);
}

/* Expanded hit area via ::after (Fitts's Law) */
.maya-dropdown-item::after {
  content: '';
  position: absolute;
  inset: -2px;
}

/* Physical press: squash & stretch */
.maya-dropdown-item:active:not(.disabled) {
  transform: scale(0.97);
  transition: transform 80ms cubic-bezier(0.19, 1, 0.22, 1);
}

.maya-dropdown-item.disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

.maya-dropdown-item.danger {
  color: var(--maya-danger-text, #f4645f);
}

.maya-dropdown-item.danger::before {
  background: var(--maya-danger-text, #f4645f);
}

.maya-dropdown-item-icon {
  position: relative;
  z-index: 1;
  margin-right: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--maya-text-muted);
  transition: color 120ms ease;
}

.maya-dropdown-item:hover .maya-dropdown-item-icon,
.maya-dropdown-item:focus .maya-dropdown-item-icon {
  color: var(--maya-text-primary);
}

.maya-dropdown-item.danger .maya-dropdown-item-icon {
  color: var(--maya-danger-text, #f4645f);
}

.maya-dropdown-item-label {
  position: relative;
  z-index: 1;
  flex: 1 1 auto;
}

/* Shortcut handled by MayaKbd */
:deep(.maya-kbd) {
  position: relative;
  z-index: 1;
  flex-shrink: 0;
}
</style>
