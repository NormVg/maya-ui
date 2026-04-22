<template>
  <div class="component-page">
    <div class="page-header">
      <h1 class="page-title">Custom Selectors</h1>
      <p class="page-description">A suite of beautifully animated, layered dropdown selectors tailored for different
        interaction models.</p>
    </div>

    <MayaPreviewCode title="Native Select"
      description="A styled wrapper over the system biological select button, preserving native mobile UI wheels." code='<MayaNativeSelect v-model="val" name="fruit">
  <option value="apple">Apple</option>
  <option value="banana">Banana</option>
  <option value="cherry">Cherry</option>
</MayaNativeSelect>'>
      <template #preview>
        <MayaNativeSelect v-model="val1" style="max-width: 240px;">
          <option value="" disabled>Select a fruit</option>
          <option value="apple">Apple</option>
          <option value="banana">Banana</option>
          <option value="cherry">Cherry</option>
        </MayaNativeSelect>
      </template>
    </MayaPreviewCode>

    <div class="page-header" style="margin-top: 48px;">
      <h1 class="page-title">Select</h1>
      <p class="page-description">A fully custom dropdown overlay using our standard easing transition curve.</p>
    </div>

    <MayaPreviewCode title="Basic Use" description="Provide an array of objects ({ label, value }) to populate."
      code='<MayaSelect v-model="val" :options="frameworks" placeholder="Select framework..." />'>
      <template #preview>
        <MayaSelect v-model="val2" :options="frameworks" placeholder="Select framework..." style="max-width: 240px;" />
      </template>
    </MayaPreviewCode>

    <div class="page-header" style="margin-top: 48px;">
      <h1 class="page-title">Multi Select</h1>
      <p class="page-description">Extends the custom select allowing an array of values, rendering checkboxes.</p>
    </div>

    <MayaPreviewCode title="Multiple Selections"
      description="State manages an array. UI gracefully aggregates selected count if too long."
      code='<MayaMultiSelect v-model="arr" :options="frameworks" />'>
      <template #preview>
        <MayaMultiSelect v-model="val3" :options="frameworks" style="max-width: 240px;" />
      </template>
    </MayaPreviewCode>

    <div class="page-header" style="margin-top: 48px;">
      <h1 class="page-title">Combobox</h1>
      <p class="page-description">The most interactive Select. Allows full text input to natively filter down the array
        list
        using your keyboard.</p>
    </div>

    <MayaPreviewCode title="Typeahead Search" description="Try typing 'Vue' or 'React'. Navigate with arrow keys."
      code='<MayaCombobox v-model="val" :options="frameworks" placeholder="Search frameworks..." />'>
      <template #preview>
        <MayaCombobox v-model="val4" :options="frameworks" placeholder="Search frameworks..."
          style="max-width: 240px;" />
      </template>
    </MayaPreviewCode>

  </div>
</template>

<script setup>
import { ref } from 'vue'

const val1 = ref('')
const val2 = ref('')
const val3 = ref(['vue', 'nuxt'])
const val4 = ref('')

const frameworks = [
  { label: 'Vue', value: 'vue' },
  { label: 'Nuxt', value: 'nuxt' },
  { label: 'React', value: 'react' },
  { label: 'Next.js', value: 'nextjs' },
  { label: 'Svelte', value: 'svelte' },
  { label: 'Solid', value: 'solid', disabled: true },
]
</script>
