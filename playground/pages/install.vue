<template>
  <div>
    <div class="component-header">
      <h2 class="component-title">Installation</h2>
      <p class="component-desc">Get up and running with Maya UI in under a minute.</p>
    </div>

    <MayaProse :content="installContent" />
  </div>
</template>

<script setup>
const installContent = `## 1. Install the package

\`\`\`bash
pnpm add -D maya-ui
\`\`\`

Or use your preferred package manager:

\`\`\`bash
npm install -D maya-ui
# or
yarn add -D maya-ui
\`\`\`

---

## 2. Register the Nuxt Module

Add \`maya-ui\` to your \`nuxt.config.ts\`:

\`\`\`typescript
export default defineNuxtConfig({
  modules: ['maya-ui'],
})
\`\`\`

That's it. All components are now **auto-imported** with the \`Maya\` prefix.

---

## 3. Start Using Components

No manual imports needed. Use any component directly in your templates:

\`\`\`vue
<template>
  <MayaBtn variant="primary" intent="success">
    Save Changes
  </MayaBtn>

  <MayaSwitch v-model="darkMode" />

  <MayaBadge variant="soft" intent="info">
    New
  </MayaBadge>
</template>
\`\`\`

---

## 4. Customize Tokens

Maya UI uses CSS custom properties for theming. Override any token in your app's CSS:

\`\`\`css
:root {
  /* Change the accent color */
  --maya-accent: #6366f1;
  --maya-accent-hover: #818cf8;

  /* Adjust radii */
  --maya-radius-md: 8px;

  /* Swap the font stack */
  --maya-font-sans: "Geist", sans-serif;
}
\`\`\`

---

## 5. Theme Toggle

Drop in the theme toggle component for instant dark/light switching with a View Transition animation:

\`\`\`vue
<template>
  <MayaThemeToggle />
</template>
\`\`\`

> **Note:** The toggle uses \`document.startViewTransition()\` for a circular reveal effect. Falls back to instant swap on unsupported browsers.
`
</script>
