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
