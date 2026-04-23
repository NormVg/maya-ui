<template>
  <div class="showcase">
    <!-- Preview Card -->
    <MayaPreviewCode title="Preview Card" description="A card variation highlighting content with subtle inner/outer depth and rich glassmorphic hovers.">
      <template #preview>
        <div class="flex items-center justify-center py-12 gap-6 w-full">
          <MayaPreviewCard
            interactive
            imageUrl="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop"
            class="w-[280px] h-[320px]"
          >
            <div class="mt-auto">
              <h3 class="text-xl font-bold text-white mb-2">Abstract Fluid</h3>
              <p class="text-sm text-zinc-300">Modern dynamic lighting.</p>
            </div>
          </MayaPreviewCard>

          <MayaPreviewCard class="w-[280px] h-[320px]">
            <div class="mb-4">
              <MayaBadge variant="secondary">Notice</MayaBadge>
            </div>
            <h3 class="text-lg font-bold text-white mb-2">Non-Interactive</h3>
            <p class="text-sm text-zinc-400 leading-relaxed">
              This card lacks the 'interactive' flag. It retains the deep inner
              box-shadow and borders, but does not hover, scale or show radial shines.
            </p>
          </MayaPreviewCard>
        </div>
      </template>
      <template #code>
        <MayaCodeBlock filename="preview-card.vue" lang="vue" :code="previewCardCode" />
      </template>
    </MayaPreviewCode>

    <!-- Carousel -->
    <MayaPreviewCode title="Carousel" description="A horizontally scrollable container with snap physics. Combines beautifully with Preview Cards.">
      <template #preview>
        <div class="py-12 w-full max-w-2xl mx-auto">
          <MayaCarousel>
            <MayaCarouselItem v-for="(image, idx) in carouselImages" :key="idx" class="w-[60%] pl-4">
              <MayaPreviewCard
                interactive
                :imageUrl="image.url"
                class="w-full aspect-[4/3]"
              >
                <div class="mt-auto">
                  <h3 class="text-lg font-semibold text-white">{{ image.title }}</h3>
                </div>
              </MayaPreviewCard>
            </MayaCarouselItem>
          </MayaCarousel>
        </div>
      </template>
      <template #code>
        <MayaCodeBlock filename="carousel.vue" lang="vue" :code="carouselCode" />
      </template>
    </MayaPreviewCode>
  </div>
</template>

<script setup>
const carouselImages = [
  { title: "Neon Gradients", url: "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?q=80&w=2670&auto=format&fit=crop" },
  { title: "Fluid Dynamics", url: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop" },
  { title: "Deep Space", url: "https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=2694&auto=format&fit=crop" },
  { title: "Geometric", url: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=2670&auto=format&fit=crop" }
]

const previewCardCode = `<template>
  <MayaPreviewCard
    interactive
    imageUrl="https://images.unsplash.com/photo-example"
    class="w-[280px] h-[320px]"
  >
    <div class="mt-auto">
      <h3 class="text-xl font-bold text-white mb-2">Abstract Fluid</h3>
      <p class="text-sm text-zinc-300">Modern dynamic lighting.</p>
    </div>
  </MayaPreviewCard>
</template>`

const carouselCode = `<template>
  <MayaCarousel>
    <MayaCarouselItem v-for="item in items" :key="item.id" class="w-[60%] pl-4">
      <MayaPreviewCard interactive :imageUrl="item.url" class="aspect-[4/3]">
        <div class="mt-auto">
          <h3 class="text-lg font-semibold text-white">{{ item.title }}</h3>
        </div>
      </MayaPreviewCard>
    </MayaCarouselItem>
  </MayaCarousel>
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
.gap-6 { gap: 1.5rem; }
.w-full { width: 100%; }
.max-w-2xl { max-width: 42rem; }
.mx-auto { margin-right: auto; margin-left: auto; }
.w-\[280px\] { width: 280px; }
.h-\[320px\] { height: 320px; }
.mt-auto { margin-top: auto; }
.mb-2 { margin-bottom: 0.5rem; }
.mb-4 { margin-bottom: 1rem; }
.w-\[60\%\] { width: 60%; }
.pl-4 { padding-left: 1rem; }
.aspect-\[4\/3\] { aspect-ratio: 4 / 3; }
.font-bold { font-weight: 700; }
.font-semibold { font-weight: 600; }
.text-xl { font-size: 1.25rem; line-height: 1.75rem; }
.text-lg { font-size: 1.125rem; line-height: 1.75rem; }
.text-sm { font-size: 0.875rem; line-height: 1.25rem; }
.text-white { color: white; }
.text-zinc-300 { color: #d4d4d8; }
.text-zinc-400 { color: #a1a1aa; }
.leading-relaxed { line-height: 1.625; }
</style>
