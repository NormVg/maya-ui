<template>
  <div>
    <div class="component-header">
      <h2 class="component-title">Input</h2>
      <p class="component-desc">A text input field with optional label.</p>
    </div>

    <Showcase
      title="Default"
      description="Basic text input."
      :code="`<MayaInput v-model=&quot;val&quot; placeholder=&quot;Enter text...&quot; />`"
    >
      <template #preview>
        <div style="width: 320px;">
          <MayaInput v-model="val" placeholder="Enter text..." />
        </div>
      </template>
    </Showcase>

    <Showcase
      title="With Label"
      description="Input with an associated label."
      :code="`<MayaInput v-model=&quot;val&quot; label=&quot;Email&quot; placeholder=&quot;you@example.com&quot; />`"
    >
      <template #preview>
        <div style="width: 320px;">
          <MayaInput v-model="labeled" label="Email" placeholder="you@example.com" />
        </div>
      </template>
    </Showcase>

    <Showcase
      title="Disabled"
      description="Input in a disabled state."
      :code="`<MayaInput label=&quot;Disabled&quot; placeholder=&quot;Can't type here&quot; disabled />`"
    >
      <template #preview>
        <div style="width: 320px;">
          <MayaInput label="Disabled" placeholder="Can't type here" disabled />
        </div>
      </template>
    </Showcase>
  </div>
</template>

<script setup>
import { ref } from 'vue'
const val = ref('')
const labeled = ref('')
</script>
