<template>
  <div class="maya-field" :class="{ 'has-error': !!error, required }">
    <div v-if="label || $slots.label" class="maya-field-label">
      <MayaLabel :for="name" :required="required">
        <slot name="label">{{ label }}</slot>
      </MayaLabel>
    </div>

    <div class="maya-field-control">
      <slot />
    </div>

    <div v-if="description && !error" class="maya-field-description">
      {{ description }}
    </div>

    <Transition name="maya-fade">
      <div v-if="error" class="maya-field-error">
        {{ error }}
      </div>
    </Transition>
  </div>
</template>

<script setup>
defineProps({
  label: { type: String, default: '' },
  description: { type: String, default: '' },
  error: { type: String, default: '' },
  name: { type: String, default: '' },
  required: { type: Boolean, default: false }
})
</script>

<style scoped>
.maya-field {
  display: flex;
  flex-direction: column;
  gap: 6px;
  width: 100%;
}

.maya-field-label {
  display: flex;
  align-items: center;
}

.maya-field-control {
  position: relative;
  width: 100%;
}

.maya-field-description {
  font-size: 0.8125rem;
  color: var(--maya-text-muted);
  font-family: var(--maya-font-sans);
}

.maya-field-error {
  font-size: 0.8125rem;
  color: var(--maya-danger);
  font-family: var(--maya-font-sans);
  font-weight: 500;
}

/* Auto-target inner inputs when error is present to turn them red */
.maya-field.has-error :deep(input),
.maya-field.has-error :deep(textarea),
.maya-field.has-error :deep(select),
.maya-field.has-error :deep(.maya-select-trigger),
.maya-field.has-error :deep(.maya-combobox-trigger),
.maya-field.has-error :deep(.maya-date-chooser-trigger) {
  border-color: var(--maya-danger);
}

.maya-field.has-error :deep(*:focus-visible) {
  box-shadow: 0 0 0 1px var(--maya-danger);
}
</style>
