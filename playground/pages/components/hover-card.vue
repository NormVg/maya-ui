<template>
  <div class="showcase">
    <MayaPreviewCode title="Hover Card" description="For sighted users to preview content available behind a link.">
      <template #preview>
        <div class="flex items-center justify-center py-12">
          <MayaHoverCard align="down-center">
            <template #trigger>
              <div class="flex items-center justify-center">
                <MayaAvatar src="https://github.com/vuejs.png" size="md" />
                <span class="ml-3 font-medium text-white hover:underline cursor-pointer">@vuejs</span>
              </div>
            </template>
            <div class="p-4 w-80 flex flex-col gap-4">
              <div class="flex justify-between items-start">
                <MayaAvatar src="https://github.com/vuejs.png" size="lg" />
                <MayaBtn variant="primary" size="sm">Follow</MayaBtn>
              </div>
              <div class="space-y-1">
                <h4 class="text-sm font-semibold text-white">Vue.js</h4>
                <p class="text-sm text-zinc-400">
                  The Progressive JavaScript Framework.
                </p>
                <div class="flex items-center pt-2 text-xs text-zinc-500">
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                    class="mr-1 lucide lucide-calendar-days">
                    <path d="M8 2v4" />
                    <path d="M16 2v4" />
                    <rect width="18" height="18" x="3" y="4" rx="2" />
                    <path d="M3 10h18" />
                    <path d="M8 14h.01" />
                    <path d="M12 14h.01" />
                    <path d="M16 14h.01" />
                    <path d="M8 18h.01" />
                    <path d="M12 18h.01" />
                    <path d="M16 18h.01" />
                  </svg>
                  Joined January 2014
                </div>
              </div>
            </div>
          </MayaHoverCard>
        </div>
      </template>

      <template #code>
        <MayaCodeBlock filename="hover-card-example.vue" lang="vue" :code="hoverCardCode" />
      </template>
    </MayaPreviewCode>
  </div>
</template>

<script setup>
const hoverCardCode = `<template>
  <MayaHoverCard align="down-center" :openDelay="400" :closeDelay="200">
    <template #trigger>
      <div class="flex items-center justify-center cursor-pointer hover:underline">
        <MayaAvatar src="https://github.com/vuejs.png" size="md" />
        <span class="ml-3 font-medium text-white">@vuejs</span>
      </div>
    </template>

    <div class="p-4 w-80 flex flex-col gap-4">
      <div class="flex justify-between items-center">
        <MayaAvatar src="https://github.com/vuejs.png" size="lg" />
        <MayaBtn variant="primary" size="sm">Follow</MayaBtn>
      </div>

      <div class="space-y-1">
        <h4 class="text-sm font-semibold text-white">Vue.js</h4>
        <p class="text-sm text-zinc-400">
          The Progressive JavaScript Framework.
        </p>
      </div>
    </div>
  </MayaHoverCard>
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

.items-start {
  align-items: flex-start;
}

.justify-center {
  justify-content: center;
}

.justify-between {
  justify-content: space-between;
}

.gap-4 {
  gap: 1rem;
}

.py-12 {
  padding-top: 3rem;
  padding-bottom: 3rem;
}

.p-4 {
  padding: 1rem;
}

.pt-2 {
  padding-top: 0.5rem;
}

.ml-3 {
  margin-left: 0.75rem;
}

.mr-1 {
  margin-right: 0.25rem;
}

.w-80 {
  width: 20rem;
}

.cursor-pointer {
  cursor: pointer;
}

.hover\:underline:hover {
  text-decoration: underline;
}

.font-medium {
  font-weight: 500;
}

.font-semibold {
  font-weight: 600;
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

.text-zinc-400 {
  color: #a1a1aa;
}

.text-zinc-500 {
  color: #71717a;
}

.space-y-1>*+* {
  margin-top: 0.25rem;
}
</style>
