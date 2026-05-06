<template>
  <div class="showcase">
    <MayaPreviewCode title="Dialog" description="A window overlaid on either the primary window or another dialog window, rendering the content underneath inert.">
      <template #preview>
        <div class="flex flex-col gap-4">
          <MayaBtn @click="isOpen = true">Open Dialog</MayaBtn>

          <MayaDialog v-model="isOpen">
            <div class="flex flex-col gap-4">
              <div>
                <h3 class="text-lg font-semibold text-white">Edit profile</h3>
                <p class="text-sm text-zinc-400 mt-1">Make changes to your profile here. Click save when you're done.</p>
              </div>

              <div class="flex flex-col gap-4 py-4">
                <MayaField>
                  <MayaLabel>Name</MayaLabel>
                  <MayaInput v-model="data.name" placeholder="Pedro Duarte" />
                </MayaField>
                <MayaField>
                  <MayaLabel>Username</MayaLabel>
                  <MayaInput v-model="data.username" placeholder="@peduarte" />
                </MayaField>
              </div>

              <div class="flex justify-end gap-2 mt-4">
                <MayaBtn variant="secondary" @click="isOpen = false">Cancel</MayaBtn>
                <MayaBtn @click="isOpen = false">Save changes</MayaBtn>
              </div>
            </div>
          </MayaDialog>
        </div>
      </template>

      <template #code>
        <MayaCodeBlock
          filename="dialog-example.vue"
          lang="vue"
          :code="dialogCode"
        />
      </template>
    </MayaPreviewCode>

    <ApiTable
      title="Dialog API"
      description="Props, events, and slots from Dialog.vue source."
      :propsList="dialogProps"
      :eventsList="dialogEvents"
      :slotsList="dialogSlots"
    />
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'

const isOpen = ref(false)
const data = reactive({
  name: 'Pedro Duarte',
  username: '@peduarte'
})

const dialogCode = `<template>
  <MayaBtn @click="isOpen = true">Open Dialog</MayaBtn>

  <MayaDialog v-model="isOpen">
    <div class="flex flex-col gap-4">
      <div>
        <h3 class="text-lg font-semibold text-white">Edit profile</h3>
        <p class="text-sm text-zinc-400 mt-1">
          Make changes to your profile here. Click save when you're done.
        </p>
      </div>

      <div class="flex flex-col gap-4 py-4">
        <MayaField>
          <MayaLabel>Name</MayaLabel>
          <MayaInput v-model="data.name" placeholder="Pedro Duarte" />
        </MayaField>
        <MayaField>
          <MayaLabel>Username</MayaLabel>
          <MayaInput v-model="data.username" placeholder="@peduarte" />
        </MayaField>
      </div>

      <div class="flex justify-end gap-2 mt-4">
        <MayaBtn variant="secondary" @click="isOpen = false">Cancel</MayaBtn>
        <MayaBtn @click="isOpen = false">Save changes</MayaBtn>
      </div>
    </div>
  </MayaDialog>
</template>

<script setup>
import { ref, reactive } from 'vue'

const isOpen = ref(false)
const data = reactive({
  name: 'Pedro Duarte',
  username: '@peduarte'
})
<\/script>`

// From Dialog.vue source: defineProps({ modelValue, showClose, closeOnClickOutside, closeOnEscape, titleId, descId })
const dialogProps = [
  { name: 'modelValue', type: 'boolean', default: 'false', description: 'Controls dialog visibility. Use v-model to bind.' },
  { name: 'showClose', type: 'boolean', default: 'true', description: 'Whether to render the close (×) button in the top-right corner.' },
  { name: 'closeOnClickOutside', type: 'boolean', default: 'true', description: 'Close when clicking the backdrop.' },
  { name: 'closeOnEscape', type: 'boolean', default: 'true', description: 'Close when the Escape key is pressed.' },
  { name: 'titleId', type: 'string', default: 'undefined', description: 'ID for the title element, used for aria-labelledby.' },
  { name: 'descId', type: 'string', default: 'undefined', description: 'ID for the description element, used for aria-describedby.' }
]

// From Dialog.vue: defineEmits(['update:modelValue', 'close'])
const dialogEvents = [
  { name: 'update:modelValue', description: 'Emitted with false when the dialog requests to close.' },
  { name: 'close', description: 'Emitted whenever the dialog closes (backdrop click, Escape, or close button).' }
]

// From Dialog.vue template: <slot />
const dialogSlots = [
  { name: 'default', description: 'The dialog body content — forms, text, actions, etc.' }
]
</script>

<style scoped>
.showcase {
  display: flex;
  flex-direction: column;
  gap: 32px;
}
.flex { display: flex; }
.flex-col { flex-direction: column; }
.gap-4 { gap: 1rem; }
.gap-2 { gap: 0.5rem; }
.justify-end { justify-content: flex-end; }
.py-4 { padding-top: 1rem; padding-bottom: 1rem; }
.mt-1 { margin-top: 0.25rem; }
.mt-4 { margin-top: 1rem; }
.text-lg { font-size: 1.125rem; line-height: 1.75rem; }
.font-semibold { font-weight: 600; }
.text-white { color: white; }
.text-sm { font-size: 0.875rem; line-height: 1.25rem; }
.text-zinc-400 { color: #a1a1aa; }
</style>
