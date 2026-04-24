<template>
  <label
    class="maya-choice-box"
    :class="{
      'maya-choice-box--selected': isSelected,
      'maya-choice-box--disabled': disabled
    }"
  >
    <input
      class="maya-choice-box__input"
      :type="type"
      :name="name"
      :checked="isChecked"
      :disabled="disabled"
      @change="onInputChange"
    />

    <span class="maya-choice-box__control" aria-hidden="true">
      <svg
        v-if="type === 'radio'"
        viewBox="0 0 24 24"
        width="12"
        height="12"
        class="maya-choice-box__icon"
      >
        <circle cx="12" cy="12" r="5" fill="currentColor" />
      </svg>
      <svg
        v-else
        viewBox="0 0 24 24"
        width="14"
        height="14"
        fill="none"
        stroke="currentColor"
        stroke-width="2.5"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="maya-choice-box__icon"
      >
        <path d="M20 6 9 17l-5-5" />
      </svg>
    </span>

    <span class="maya-choice-box__content">
      <span v-if="$slots.title || title" class="maya-choice-box__title">
        <slot name="title">{{ title }}</slot>
      </span>
      <span v-if="$slots.description || description" class="maya-choice-box__description">
        <slot name="description">{{ description }}</slot>
      </span>
      <slot />
    </span>
  </label>
</template>

<script setup lang="ts">
import { computed } from 'vue'

type ChoiceValue = string | number | boolean

const props = withDefaults(defineProps<{
  modelValue?: ChoiceValue | ChoiceValue[] | null
  value?: ChoiceValue
  type?: 'checkbox' | 'radio'
  name?: string
  title?: string
  description?: string
  disabled?: boolean
}>(), {
  modelValue: false,
  value: true,
  type: 'checkbox',
  name: undefined,
  title: '',
  description: '',
  disabled: false
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: ChoiceValue | ChoiceValue[]): void
  (e: 'change', checked: boolean): void
}>()

const isArrayModel = computed(() => Array.isArray(props.modelValue))

const isChecked = computed(() => {
  if (props.type === 'radio') return props.modelValue === props.value
  if (isArrayModel.value) return (props.modelValue as ChoiceValue[]).includes(props.value)
  return Boolean(props.modelValue)
})

const isSelected = computed(() => isChecked.value && !props.disabled)

function onInputChange(event: Event) {
  const target = event.target as HTMLInputElement
  const checked = target.checked
  emit('change', checked)

  if (props.type === 'radio') {
    if (checked) emit('update:modelValue', props.value)
    return
  }

  if (isArrayModel.value) {
    const next = [...(props.modelValue as ChoiceValue[])]
    const index = next.findIndex((entry) => entry === props.value)

    if (checked && index === -1) next.push(props.value)
    if (!checked && index !== -1) next.splice(index, 1)

    emit('update:modelValue', next)
    return
  }

  emit('update:modelValue', checked)
}
</script>

<style scoped>
.maya-choice-box {
  position: relative;
  display: flex;
  align-items: flex-start;
  gap: 12px;
  width: 100%;
  padding: 14px;
  border-radius: var(--maya-radius-lg);
  border: 1px solid var(--maya-border);
  background: var(--maya-bg-surface);
  background-image: var(--maya-gradient-surface);
  box-shadow: var(--maya-shadow-sm);
  color: var(--maya-text-primary);
  cursor: pointer;
  transition:
    border-color var(--maya-duration) var(--maya-ease),
    background-color var(--maya-duration) var(--maya-ease),
    box-shadow var(--maya-duration) var(--maya-ease),
    transform 120ms var(--maya-ease-out);
}

.maya-choice-box::before {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: inherit;
  background: currentColor;
  opacity: 0;
  transform: scale(0.98);
  transition: opacity 140ms var(--maya-ease-out), transform 140ms var(--maya-ease-out);
  pointer-events: none;
}

.maya-choice-box::after {
  content: '';
  position: absolute;
  inset: -6px;
}

.maya-choice-box:hover {
  border-color: var(--maya-border-hover);
}

.maya-choice-box:hover::before {
  opacity: 0.025;
  transform: scale(1);
}

.maya-choice-box:has(.maya-choice-box__input:focus-visible) {
  border-color: var(--maya-input-focus-border);
  box-shadow: 0 0 0 3px var(--maya-border);
}

.maya-choice-box:active {
  transform: scale(0.99);
}

.maya-choice-box--selected {
  border-color: var(--maya-border-hover);
  background: var(--maya-bg-raised) var(--maya-gradient-surface);
}

.maya-choice-box--disabled {
  opacity: 0.55;
  cursor: not-allowed;
}

.maya-choice-box__input {
  position: absolute;
  opacity: 0;
  inset: 0;
  pointer-events: none;
}

.maya-choice-box__control {
  width: 20px;
  height: 20px;
  flex-shrink: 0;
  border-radius: 999px;
  border: 1px solid var(--maya-border-strong);
  background: var(--maya-checkbox-bg);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: transparent;
  transition: all 150ms var(--maya-ease-out);
  margin-top: 1px;
}

.maya-choice-box__input[type="checkbox"] + .maya-choice-box__control {
  border-radius: var(--maya-radius-sm);
}

.maya-choice-box__input:checked + .maya-choice-box__control {
  background: var(--maya-accent, var(--maya-checkbox-checked-bg));
  border-color: var(--maya-accent, var(--maya-checkbox-checked-border));
  color: var(--maya-accent-text, var(--maya-checkbox-check-color));
}

.maya-choice-box__icon {
  transform: scale(0.8);
  opacity: 0;
  transition: transform 180ms var(--maya-ease-bouncy), opacity 140ms var(--maya-ease-out);
}

.maya-choice-box__input:checked + .maya-choice-box__control .maya-choice-box__icon {
  transform: scale(1);
  opacity: 1;
}

.maya-choice-box__content {
  display: flex;
  flex-direction: column;
  gap: 4px;
  min-width: 0;
}

.maya-choice-box__title {
  font-size: 0.875rem;
  line-height: 1.25rem;
  font-weight: 600;
  color: var(--maya-text-primary);
}

.maya-choice-box__description {
  font-size: 0.8125rem;
  line-height: 1.25rem;
  color: var(--maya-text-secondary);
}
</style>
