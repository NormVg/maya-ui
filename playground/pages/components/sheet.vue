<template>
  <div class="component-page">
    <div class="page-header">
      <h1 class="page-title">Sheet (Drawer)</h1>
      <p class="page-description">Extends the Dialog component to display content that complements the main UI from the
        edge of the screen.</p>
    </div>

    <MayaPreviewCode title="Right Side (Default)" description="The sheet slides in from the right side by default."
      code="<MayaSheet v-model:open='openRight'>
  <div class='sheet-demo'>
    <h2>Edit Profile</h2>
    <p>Make changes to your profile here.</p>
  </div>
</MayaSheet>">
      <template #preview>
        <div style="display: flex; align-items: center; justify-content: center; padding: 2rem;">
          <MayaBtn @click="openRight = true" variant="outline">Open Sheet (Right)</MayaBtn>
          <MayaSheet v-model:open="openRight" side="right">
            <div style="padding: 24px;">
              <h2 style="margin: 0 0 8px 0; font-size: 1.25rem;">Edit Profile</h2>
              <p style="color: var(--maya-text-muted); font-size: 0.875rem; margin-bottom: 24px;">Make changes to your
                profile here. Click save when you're done.</p>

              <div style="display: flex; flex-direction: column; gap: 16px;">
                <MayaFormGroup label="Name">
                  <MayaInput placeholder="Pedro Duarte" />
                </MayaFormGroup>
                <MayaFormGroup label="Username">
                  <MayaInput placeholder="@peduarte" />
                </MayaFormGroup>
                <MayaBtn style="margin-top: 16px;">Save changes</MayaBtn>
              </div>
            </div>
          </MayaSheet>
        </div>
      </template>
    </MayaPreviewCode>

    <MayaPreviewCode title="Sides" description="Use the `side` prop to slide in from left, top, right, or bottom." code="<MayaSheet side='left' v-model:open='openLeft' />
<MayaSheet side='bottom' v-model:open='openBottom' />">
      <template #preview>
        <div
          style="display: flex; flex-wrap: wrap; gap: 1rem; align-items: center; justify-content: center; padding: 2rem;">
          <MayaBtn @click="openLeft = true" variant="outline">Left</MayaBtn>
          <MayaBtn @click="openTop = true" variant="outline">Top</MayaBtn>
          <MayaBtn @click="openBottom = true" variant="outline">Bottom</MayaBtn>

          <MayaSheet v-model:open="openLeft" side="left">
            <div style="padding: 24px;">Sidebar Navigation</div>
          </MayaSheet>
          <MayaSheet v-model:open="openTop" side="top">
            <div style="padding: 24px;">Top Search Bar</div>
          </MayaSheet>
          <MayaSheet v-model:open="openBottom" side="bottom">
            <div style="padding: 24px;">Mobile Action Sheet</div>
          </MayaSheet>
        </div>
      </template>
    </MayaPreviewCode>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const openRight = ref(false)
const openLeft = ref(false)
const openTop = ref(false)
const openBottom = ref(false)
</script>
