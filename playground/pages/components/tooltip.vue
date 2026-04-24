<template>
  <div class="showcase">
    <MayaPreviewCode title="Tooltip" description="A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.">
      <template #preview>
        <div class="flex items-center justify-center py-12 gap-8 flex-wrap">
          <MayaTooltip align="up-center">
            <template #trigger>
              <MayaBtn variant="outline" class="w-10 p-0">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-plus"><path d="M5 12h14"/><path d="M12 5v14"/></svg>
                <span class="sr-only">Add</span>
              </MayaBtn>
            </template>
            Add to library
          </MayaTooltip>

          <MayaTooltip align="down-center">
            <template #trigger>
              <MayaBtn variant="ghost" class="w-10 p-0">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z"/></svg>
              </MayaBtn>
            </template>
            Bookmark
          </MayaTooltip>

          <MayaTooltip align="right-center">
            <template #trigger>
              <MayaBtn variant="secondary" class="w-10 p-0">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>
              </MayaBtn>
            </template>
            Information
          </MayaTooltip>
        </div>
      </template>

      <template #code>
        <MayaCodeBlock
          filename="tooltip-example.vue"
          lang="vue"
          :code="tooltipCode"
        />
      </template>
    </MayaPreviewCode>
  </div>
</template>

<script setup>
const tooltipCode = `<template>
  <MayaTooltip align="up-center">
    <template #trigger>
      <MayaBtn variant="outline" class="w-10 p-0">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M5 12h14"/><path d="M12 5v14"/>
        </svg>
      </MayaBtn>
    </template>

    Add to library
  </MayaTooltip>
</template>`
</script>

<style scoped>
.showcase {
  display: flex;
  flex-direction: column;
  gap: 32px;
}
.flex { display: flex; }
.items-center { align-items: center; }
.justify-center { justify-content: center; }
.py-12 { padding-top: 3rem; padding-bottom: 3rem; }
.w-10 { width: 2.5rem; }
.p-0 { padding: 0; }
.gap-8 { gap: 2rem; }
.flex-wrap { flex-wrap: wrap; }
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}
</style>
