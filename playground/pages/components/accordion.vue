<template>
  <div class="showcase">
    <!-- Accordion Section -->
    <MayaPreviewCode title="Accordion" description="A vertically stacked set of interactive headings that each reveal a section of content.">
      <template #preview>
        <div class="flex items-center justify-center py-12 max-w-lg mx-auto w-full">
          <MayaAccordion type="single" collapsible>
            <MayaAccordionItem value="item-1">
              <template #trigger>Is it accessible?</template>
              Yes. It adheres to the WAI-ARIA design pattern.
            </MayaAccordionItem>

            <MayaAccordionItem value="item-2">
              <template #trigger>Is it styled?</template>
              Yes. It comes with default styles that matches the other components' aesthetic.
            </MayaAccordionItem>

            <MayaAccordionItem value="item-3">
              <template #trigger>Is it animated?</template>
              Yes. It's animated by default, but you can disable it if you prefer.
            </MayaAccordionItem>
          </MayaAccordion>
        </div>
      </template>

      <template #code>
        <MayaCodeBlock
          filename="accordion-example.vue"
          lang="vue"
          :code="accordionCode"
        />
      </template>
    </MayaPreviewCode>

    <!-- Collapsible Section -->
    <MayaPreviewCode title="Collapsible" description="An interactive component which expands/collapses a panel.">
      <template #preview>
        <div class="flex flex-col items-center justify-center py-12">
          <MayaCollapsible v-model="isCollapsibleOpen" class="w-[350px] space-y-2">
            <template #trigger="{ isOpen }">
              <div class="flex items-center justify-between px-4 py-2 border rounded-lg hover:border-zinc-700 transition">
                <h4 class="text-sm font-semibold text-white">
                  @peduarte starred 3 repositories
                </h4>
                <MayaBtn variant="ghost" size="sm" class="h-8 w-8 p-0">
                  <svg class="h-4 w-4" :class="{ 'rotate-180': isOpen, 'transition-transform': true }" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m8 3 4 8 5-5 5 15H2L8 3z"/></svg>
                </MayaBtn>
              </div>
            </template>

            <div class="rounded-md border border-zinc-800 px-4 py-3 font-mono text-sm text-zinc-300 mt-2">
              @radix-ui/primitives
            </div>

            <div class="rounded-md border border-zinc-800 px-4 py-3 font-mono text-sm text-zinc-300 mt-2">
              @radix-ui/colors
            </div>

            <div class="rounded-md border border-zinc-800 px-4 py-3 font-mono text-sm text-zinc-300 mt-2">
              @radix-ui/react
            </div>
          </MayaCollapsible>
        </div>
      </template>

      <template #code>
        <MayaCodeBlock
          filename="collapsible-example.vue"
          lang="vue"
          :code="collapsibleCode"
        />
      </template>
    </MayaPreviewCode>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const isCollapsibleOpen = ref(false)

const accordionCode = `<template>
  <MayaAccordion type="single" collapsible>
    <MayaAccordionItem value="item-1">
      <template #trigger>Is it accessible?</template>
      Yes. It adheres to the WAI-ARIA design pattern.
    </MayaAccordionItem>

    <MayaAccordionItem value="item-2">
      <template #trigger>Is it styled?</template>
      Yes. It comes with default styles that matches the other components' aesthetic.
    </MayaAccordionItem>

    <MayaAccordionItem value="item-3">
      <template #trigger>Is it animated?</template>
      Yes. It's animated by default, but you can disable it if you prefer.
    </MayaAccordionItem>
  </MayaAccordion>
</template>`

const collapsibleCode = `<template>
  <MayaCollapsible v-model="isOpen" class="w-[350px] space-y-2">
    <template #trigger="{ isOpen }">
      <div class="flex items-center justify-between px-4 py-2 border rounded-lg">
        <h4 class="text-sm font-semibold text-white">
          @peduarte starred 3 repositories
        </h4>
        <MayaBtn variant="ghost" size="sm" class="h-8 w-8 p-0">
          <svg :class="{ 'rotate-180': isOpen, 'transition-transform': true }">...</svg>
        </MayaBtn>
      </div>
    </template>

    <!-- Content inside the collapsible -->
    <div class="rounded-md border px-4 py-3 font-mono text-sm text-zinc-300 mt-2">
      @radix-ui/primitives
    </div>

    <div class="rounded-md border px-4 py-3 font-mono text-sm text-zinc-300 mt-2">
      @radix-ui/colors
    </div>
  </MayaCollapsible>
</template>

<script setup>
import { ref } from 'vue'
const isOpen = ref(false)
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
.items-center { align-items: center; }
.justify-center { justify-content: center; }
.justify-between { justify-content: space-between; }
.py-12 { padding-top: 3rem; padding-bottom: 3rem; }
.mx-auto { margin-right: auto; margin-left: auto; }
.max-w-lg { max-width: 32rem; }
.w-full { width: 100%; }
.w-\[350px\] { width: 350px; }
.px-4 { padding-left: 1rem; padding-right: 1rem; }
.py-2 { padding-top: 0.5rem; padding-bottom: 0.5rem; }
.py-3 { padding-top: 0.75rem; padding-bottom: 0.75rem; }
.mt-2 { margin-top: 0.5rem; }
.space-y-2 > * + * { margin-top: 0.5rem; }
.h-8 { height: 2rem; }
.w-8 { width: 2rem; }
.h-4 { height: 1rem; }
.w-4 { width: 1rem; }
.p-0 { padding: 0; }
.rounded-lg { border-radius: var(--maya-radius-lg, 0.5rem); }
.rounded-md { border-radius: var(--maya-radius-md, 0.375rem); }
.border { border: 1px solid var(--maya-border); }
.border-zinc-800 { border-color: var(--maya-border-strong); }
.hover\:border-zinc-700:hover { border-color: var(--maya-border-hover); }
.text-sm { font-size: 0.875rem; line-height: 1.25rem; }
.font-semibold { font-weight: 600; }
.font-mono { font-family: var(--maya-font-mono); }
.text-white { color: var(--maya-text-primary); }
.text-zinc-300 { color: var(--maya-text-secondary); }
.transition { transition: all 150ms ease; }
.transition-transform { transition: transform 250ms var(--maya-ease-bouncy); }
.rotate-180 { transform: rotate(180deg); }
</style>
