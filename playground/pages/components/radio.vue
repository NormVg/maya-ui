<template>
  <div class="component-page">
    <div class="page-header">
      <h1 class="page-title">Radio</h1>
      <p class="page-description">Standard radio buttons with bouncy physics and generous Fitts's law hit areas.</p>
    </div>

    <MayaPreviewCode title="Default" description="A simple radio button. Note the expanded hover area." code='<MayaRadio v-model="color" value="red" label="Red" />
<MayaRadio v-model="color" value="blue" label="Blue" />'>
      <template #preview>
        <div style="display: flex; gap: 1rem;">
          <MayaRadio v-model="color1" value="red" label="Red" />
          <MayaRadio v-model="color1" value="blue" label="Blue" />
        </div>
      </template>
    </MayaPreviewCode>

    <div class="page-header">
      <h1 class="page-title" style="margin-top: 48px;">Radio Group</h1>
      <p class="page-description">Group radio buttons together horizontally or vertically.</p>
    </div>

    <MayaPreviewCode title="Vertical (Default)" description="Lines items up with a clean gap." code='<MayaRadioGroup>
  <MayaRadio v-model="color" value="red" label="Red" />
  <MayaRadio v-model="color" value="blue" label="Blue" />
  <MayaRadio v-model="color" value="green" label="Green" />
</MayaRadioGroup>'>
      <template #preview>
        <MayaRadioGroup>
          <MayaRadio v-model="color2" value="red" label="Red" />
          <MayaRadio v-model="color2" value="blue" label="Blue" />
          <MayaRadio v-model="color2" value="green" label="Green" />
        </MayaRadioGroup>
      </template>
    </MayaPreviewCode>

    <MayaPreviewCode title="Horizontal" description="Wraps if space constrains." code='<MayaRadioGroup orientation="horizontal">
  <MayaRadio v-model="color" value="red" label="Red" />
  <MayaRadio v-model="color" value="blue" label="Blue" />
  <MayaRadio v-model="color" value="green" label="Green" />
</MayaRadioGroup>'>
      <template #preview>
        <MayaRadioGroup orientation="horizontal">
          <MayaRadio v-model="color3" value="red" label="Red" />
          <MayaRadio v-model="color3" value="blue" label="Blue" />
          <MayaRadio v-model="color3" value="green" label="Green" />
        </MayaRadioGroup>
      </template>
    </MayaPreviewCode>

  </div>
</template>

<script setup>
import { ref } from 'vue'

const color1 = ref('red')
const color2 = ref('blue')
const color3 = ref('green')
</script>
