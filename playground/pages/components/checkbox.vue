<template>
  <div>
    <div class="component-header">
      <h2 class="component-title">Checkbox</h2>
      <p class="component-desc">A toggleable checkbox input.</p>
    </div>

    <Showcase
      title="Default"
      description="Basic checkbox with a label."
      :code="`<MayaCheckbox v-model=&quot;checked&quot; label=&quot;Accept terms&quot; />`"
    >
      <template #preview>
        <MayaCheckbox v-model="checked" label="Accept terms" />
      </template>
    </Showcase>

    <Showcase
      title="Multiple"
      description="Group of checkboxes."
      :code="`<MayaCheckbox v-model=&quot;a&quot; label=&quot;Option A&quot; />\n<MayaCheckbox v-model=&quot;b&quot; label=&quot;Option B&quot; />\n<MayaCheckbox v-model=&quot;c&quot; label=&quot;Option C&quot; />`"
    >
      <template #preview>
        <div style="display: flex; flex-direction: column; gap: 12px;">
          <MayaCheckbox v-model="a" label="Option A" />
          <MayaCheckbox v-model="b" label="Option B" />
          <MayaCheckbox v-model="c" label="Option C" />
        </div>
      </template>
    </Showcase>

    <Showcase
      title="Disabled"
      description="Checkbox in a disabled state."
      :code="`<MayaCheckbox label=&quot;Can't toggle&quot; disabled />`"
    >
      <template #preview>
        <MayaCheckbox label="Can't toggle" disabled />
      </template>
    </Showcase>
  </div>
</template>

<script setup>
import { ref } from 'vue'
const checked = ref(false)
const a = ref(true)
const b = ref(false)
const c = ref(false)
</script>
