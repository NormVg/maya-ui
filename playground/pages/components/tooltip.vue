<template>
  <div class="showcase">
    <MayaPreviewCode
      title="Tooltip"
      description="A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it."
      :code="tooltipCode"
    >
      <template #preview>
        <div class="tooltip-demo-row">
          <MayaTooltip align="up-center">
            <template #trigger>
              <MayaBtn variant="outline" size="md">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="M12 5v14"/></svg>
                Add item
              </MayaBtn>
            </template>
            Add to library
          </MayaTooltip>

          <MayaTooltip align="down-center">
            <template #trigger>
              <MayaBtn variant="secondary" size="md">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z"/></svg>
                Bookmark
              </MayaBtn>
            </template>
            Save for later
          </MayaTooltip>

          <MayaTooltip align="up-right">
            <template #trigger>
              <MayaBtn variant="ghost" size="md">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>
                API info
              </MayaBtn>
            </template>
            View API details
          </MayaTooltip>
        </div>
      </template>
    </MayaPreviewCode>
  </div>
</template>

<script setup>
const tooltipCode = `<template>
  <div class="tooltip-demo-row">
    <MayaTooltip align="up-center">
      <template #trigger>
        <MayaBtn variant="outline" size="md">Add item</MayaBtn>
      </template>
      Add to library
    </MayaTooltip>

    <MayaTooltip align="down-center">
      <template #trigger>
        <MayaBtn variant="secondary" size="md">Bookmark</MayaBtn>
      </template>
      Save for later
    </MayaTooltip>
  </div>
</template>`
</script>

<style scoped>
.showcase {
  display: flex;
  flex-direction: column;
  gap: 32px;
}

.tooltip-demo-row {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  gap: 14px;
  padding: 40px 0;
}
</style>
