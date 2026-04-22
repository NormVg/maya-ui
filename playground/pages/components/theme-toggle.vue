<template>
  <div>
    <div class="component-header">
      <h2 class="component-title">Theme Toggle</h2>
      <p class="component-desc">Switches between dark and light modes.</p>
    </div>

    <Showcase title="Default" description="Click to toggle between dark and light themes."
      :code="`<MayaThemeToggle />`">
      <template #preview>
        <MayaThemeToggle />
      </template>
    </Showcase>

    <Showcase title="Accent Color"
      description="Override --maya-accent to customize the accent color across all components."
      :code="`<!-- In your CSS -->\n:root {\n  --maya-accent: #6366f1;\n  --maya-accent-hover: #818cf8;\n  --maya-accent-muted: rgba(99, 102, 241, 0.15);\n}`">
      <template #preview>
        <div style="display: flex; gap: 12px; align-items: center;">
          <div class="swatch" style="background: var(--maya-accent);" />
          <div class="swatch" style="background: var(--maya-accent-hover);" />
          <div class="swatch" style="background: var(--maya-accent-muted);" />
        </div>
      </template>
    </Showcase>
  </div>
</template>

<style scoped>
.swatch {
  width: 40px;
  height: 40px;
  border-radius: var(--maya-radius-md);
  border: 1px solid var(--maya-border);
}
</style>
