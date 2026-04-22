<template>
  <div class="maya-input-otp" :class="{ disabled }" @paste="onPaste">
    <input v-for="(char, index) in length" :key="index" :ref="(el) => { if (el) inputs[index] = el }" type="text"
      inputmode="numeric" pattern="[0-9]*" maxlength="1" class="maya-input-otp-slot"
      :class="{ 'is-active': activeIndex === index }" :value="getValueAt(index)" :disabled="disabled"
      @input="onInput($event, index)" @keydown="onKeydown($event, index)" @focus="activeIndex = index"
      @blur="activeIndex = -1" />
  </div>
</template>

<script setup>
import { ref, watch, nextTick } from 'vue'

const props = defineProps({
  modelValue: { type: String, default: '' },
  length: { type: Number, default: 6 },
  disabled: { type: Boolean, default: false },
})

const emit = defineEmits(['update:modelValue', 'complete'])

const inputs = ref([])
const activeIndex = ref(-1)

function getValueAt(index) {
  return props.modelValue[index] || ''
}

function updateValue(str) {
  const clean = str.replace(/\D/g, '').slice(0, props.length)
  emit('update:modelValue', clean)
  if (clean.length === props.length) {
    emit('complete', clean)
  }
}

function focusInput(index) {
  nextTick(() => {
    if (inputs.value[index]) {
      inputs.value[index].focus()
      // Optional: select the text so typing over-writes it
      inputs.value[index].select()
    }
  })
}

function onInput(e, index) {
  const val = e.data || e.target.value
  e.target.value = getValueAt(index) // Prevent manual DOM desync

  if (!val) return // Handled by keydown backspace

  // Only accept numbers
  if (!/^\d$/.test(val)) return

  const chars = props.modelValue.split('')
  chars[index] = val
  updateValue(chars.join(''))

  if (index < props.length - 1) {
    focusInput(index + 1)
  } else {
    inputs.value[index].blur()
  }
}

function onKeydown(e, index) {
  if (e.key === 'Backspace') {
    e.preventDefault()
    const chars = props.modelValue.split('')
    if (chars[index]) {
      chars[index] = ''
      updateValue(chars.join(''))
    } else if (index > 0) {
      chars[index - 1] = ''
      updateValue(chars.join(''))
      focusInput(index - 1)
    }
  } else if (e.key === 'ArrowLeft' && index > 0) {
    e.preventDefault()
    focusInput(index - 1)
  } else if (e.key === 'ArrowRight' && index < props.length - 1) {
    e.preventDefault()
    focusInput(index + 1)
  }
}

function onPaste(e) {
  e.preventDefault()
  const pastedData = e.clipboardData.getData('text')
  updateValue(pastedData)
  const targetIndex = Math.min(pastedData.length, props.length - 1)
  focusInput(targetIndex)
}
</script>

<style scoped>
.maya-input-otp {
  display: flex;
  align-items: center;
  gap: 8px;
}

.maya-input-otp.disabled {
  opacity: 0.5;
  pointer-events: none;
}

.maya-input-otp-slot {
  width: 44px;
  height: 52px;
  text-align: center;
  font-family: var(--maya-font-mono);
  font-size: 1.125rem;
  font-weight: 500;
  color: var(--maya-text-primary);
  background: var(--maya-bg-surface);
  border: 1px solid var(--maya-border);
  border-radius: var(--maya-radius-md);
  transition: all var(--maya-duration) var(--maya-ease);
  outline: none;
  box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.05);
}

.maya-input-otp-slot:focus-visible {
  border-color: var(--maya-input-focus-border);
  box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.05);
}

.maya-input-otp-slot.is-active {
  background: var(--maya-bg-root);
}

@media (max-width: 400px) {
  .maya-input-otp {
    gap: 4px;
  }

  .maya-input-otp-slot {
    width: 36px;
    height: 44px;
    font-size: 1rem;
  }
}
</style>
