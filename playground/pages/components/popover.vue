<template>
  <div class="showcase">
    <MayaPreviewCode title="Popover"
      description="A rich contextual menu attached to a trigger element to reveal settings or deeper actions.">
      <template #preview>
        <div class="flex items-center justify-center py-12">
          <MayaPopover align="down-center">
            <template #trigger>
              <div class="flex items-center gap-2 cursor-pointer hover:bg-zinc-800/50 p-1.5 rounded-lg transition">
                <MayaAvatar src="https://github.com/shadcn.png" size="md" />
                <span class="font-medium text-white">@shadcn</span>
              </div>
            </template>
            <div class="p-4 w-80 flex flex-col gap-4">
              <div class="flex justify-between items-center">
                <MayaAvatar src="https://github.com/shadcn.png" size="lg" />
                <MayaBtn variant="primary" size="sm">Follow</MayaBtn>
              </div>
              <div class="space-y-1">
                <h4 class="text-sm font-semibold text-white">shadcn</h4>
                <p class="text-sm text-zinc-400">
                  Design system creator & open source advocate. Building UI tools that developers love.
                </p>
                <div class="flex mt-2 pt-4 border-t border-zinc-800 text-xs text-zinc-400 gap-4">
                  <div class="flex items-center gap-1">
                    <span class="text-white font-semibold">1,240</span> Followers
                  </div>
                  <div class="flex items-center gap-1">
                    <span class="text-white font-semibold">14</span> Following
                  </div>
                </div>
              </div>
            </div>
          </MayaPopover>
        </div>
      </template>

      <template #code>
        <MayaCodeBlock filename="popover-example.vue" lang="vue" :code="popoverCode" />
      </template>
    </MayaPreviewCode>
  </div>
</template>

<script setup>
const popoverCode = `<template>
  <MayaPopover align="down-center">
    <template #trigger>
      <div class="flex items-center gap-2 cursor-pointer hover:bg-zinc-800/50 p-1.5 rounded-lg transition">
        <MayaAvatar src="https://github.com/shadcn.png" size="sm" />
        <span class="text-sm font-medium text-white">shadcn</span>
      </div>
    </template>

    <div class="p-4 w-72 flex flex-col gap-4">
      <div class="flex items-center gap-4">
        <MayaAvatar src="https://github.com/shadcn.png" size="lg" />
        <div class="flex-col flex gap-0.5">
          <h4 class="text-sm font-semibold text-white">shadcn</h4>
          <p class="text-sm text-zinc-400">@shadcn</p>
        </div>
      </div>

      <p class="text-sm text-zinc-300 leading-relaxed">
        Design system creator & open source advocate. Building UI tools that developers love.
      </p>

      <div class="flex mt-2 pt-4 border-t border-zinc-800 text-xs text-zinc-400 gap-4">
        <div class="flex items-center gap-1">
          <span class="text-white font-semibold">1,240</span> Followers
        </div>
        <div class="flex items-center gap-1">
          <span class="text-white font-semibold">14</span> Following
        </div>
      </div>
    </div>
  </MayaPopover>
</template>`
</script>

<style scoped>
.showcase {
  display: flex;
  flex-direction: column;
  gap: 32px;
}

.flex {
  display: flex;
}

.flex-col {
  flex-direction: column;
}

.items-center {
  align-items: center;
}

.justify-center {
  justify-content: center;
}

.gap-4 {
  gap: 1rem;
}

.gap-2 {
  gap: 0.5rem;
}

.gap-1 {
  gap: 0.25rem;
}

.gap-0\.5 {
  gap: 0.125rem;
}

.py-12 {
  padding-top: 3rem;
  padding-bottom: 3rem;
}

.p-4 {
  padding: 1rem;
}

.p-1\.5 {
  padding: 0.375rem;
}

.pt-4 {
  padding-top: 1rem;
}

.mt-2 {
  margin-top: 0.5rem;
}

.w-72 {
  width: 18rem;
}

.border-t {
  border-top-width: 1px;
}

.border-zinc-800 {
  border-color: #27272a;
}

.rounded-lg {
  border-radius: var(--maya-radius-lg, 0.5rem);
}

.cursor-pointer {
  cursor: pointer;
}

.hover\:bg-zinc-800\/50:hover {
  background-color: rgba(39, 39, 42, 0.5);
}

.transition {
  transition-property: color, background-color, border-color, text-decoration-color, fill, stroke;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
}

.font-medium {
  font-weight: 500;
}

.font-semibold {
  font-weight: 600;
}

.leading-relaxed {
  line-height: 1.625;
}

.text-white {
  color: white;
}

.text-sm {
  font-size: 0.875rem;
}

.text-xs {
  font-size: 0.75rem;
}

.text-zinc-300 {
  color: #d4d4d8;
}

.text-zinc-400 {
  color: #a1a1aa;
}
</style>
