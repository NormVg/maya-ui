<template>
  <div class="page-content">
    <MayaPreviewCode
      title="Basic Pagination"
      description="Smart ellipsis pagination that collapses ranges for large page counts. Active page has an elevated layered shadow."
      lang="vue"
      :code="basicCode"
    >
      <template #preview>
        <div class="center-wrap">
          <MayaPagination v-model:current="page" :total="240" :per-page="10" />
          <span style="font-size: 0.8rem; color: var(--maya-text-tertiary);">Page {{ page }} of 24</span>
        </div>
      </template>
    </MayaPreviewCode>

    <MayaPreviewCode
      title="Few Pages"
      description="When total pages are few, all numbers render without ellipsis."
      lang="vue"
      :code="fewCode"
    >
      <template #preview>
        <div class="center-wrap">
          <MayaPagination v-model:current="page2" :total="50" :per-page="10" />
        </div>
      </template>
    </MayaPreviewCode>
  </div>
</template>

<script setup>
import { ref } from 'vue'
const page = ref(6)
const page2 = ref(3)

const basicCode = `<MayaPagination v-model:current="page" :total="240" :per-page="10" />`
const fewCode = `<MayaPagination v-model:current="page" :total="50" :per-page="10" />`
</script>

<style scoped>
.page-content { display: flex; flex-direction: column; gap: 32px; }
.center-wrap { display: flex; flex-direction: column; align-items: center; gap: 12px; padding: 24px; }
</style>
