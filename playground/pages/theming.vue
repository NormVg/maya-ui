<template>
  <div class="theming-docs-page">
    <MayaProse :content="docsMarkdown" />
  </div>
</template>

<script setup lang="ts">
const docsMarkdown = `
# Theming & Customisation

Maya UI is built entirely on native CSS custom properties. This means you can easily customize the look and feel of your application without any complex build steps or preprocessors.

## How it Works

Every component in Maya UI uses CSS variables for colors, spacing, typography, and animations. To change the theme, you simply need to override these variables in your global CSS.

\`\`\`css
/* global.css */
:root {
  /* Surface Colors */
  --maya-bg-base: #ffffff;
  --maya-bg-surface: #f8f9fa;
  --maya-bg-surface-elevated: #ffffff;

  /* Primary Brand Color */
  --maya-primary: #3b82f6;
  --maya-primary-hover: #2563eb;
  --maya-primary-muted: rgba(59, 130, 246, 0.1);

  /* Typography */
  --maya-text-base: #111827;
  --maya-text-muted: #6b7280;
  
  /* Borders & Radii */
  --maya-border-color: #e5e7eb;
  --maya-radius-md: 0.5rem;
}

/* Dark Mode Overrides */
.dark, [data-theme="dark"] {
  --maya-bg-base: #030712;
  --maya-bg-surface: #111827;
  --maya-bg-surface-elevated: #1f2937;
  --maya-text-base: #f9fafb;
  --maya-text-muted: #9ca3af;
  --maya-border-color: #374151;
}
\`\`\`

## Color Palette Requirements

When defining a custom color (like primary, success, warning, danger), ensure you provide the base color, a hover state, and a muted (transparent) variant for the best component visuals.

\`\`\`css
:root {
  --maya-primary: #8b5cf6; /* Base */
  --maya-primary-hover: #7c3aed; /* Darker */
  --maya-primary-muted: #8b5cf61a; /* 10% opacity */
  
  --maya-danger: #ef4444; 
  --maya-danger-hover: #dc2626; 
  --maya-danger-muted: #ef44441a; 
}
\`\`\`

## Fonts & Typography

Maya UI inherits your project's font family by default. To enforce a specific font, override the typography variables.

\`\`\`css
:root {
  --maya-font-sans: 'Inter', system-ui, sans-serif;
  --maya-font-mono: 'JetBrains Mono', monospace;
}
\`\`\`

## Ready-to-use Themes

Copy and paste these snippets into your stylesheet to instantly apply a different aesthetic.

### Midnight Purple (Dark)
\`\`\`css
:root {
  --maya-bg-base: #0f0e17;
  --maya-bg-surface: #1e1b2e;
  --maya-bg-surface-elevated: #2a2542;
  --maya-text-base: #fffffe;
  --maya-text-muted: #a7a9be;
  --maya-border-color: #2a2542;
  
  --maya-primary: #ff8906;
  --maya-primary-hover: #f25f4c;
  --maya-primary-muted: rgba(255, 137, 6, 0.1);
  
  --maya-radius-md: 0.75rem;
}
\`\`\`

### Forest Minimal (Light)
\`\`\`css
:root {
  --maya-bg-base: #f7f9f7;
  --maya-bg-surface: #ffffff;
  --maya-bg-surface-elevated: #ffffff;
  --maya-text-base: #2d3a33;
  --maya-text-muted: #6b7a70;
  --maya-border-color: #e2e8e4;
  
  --maya-primary: #3b6b4e;
  --maya-primary-hover: #2d523c;
  --maya-primary-muted: rgba(59, 107, 78, 0.1);
  
  --maya-radius-md: 0.25rem;
}
\`\`\`
`
</script>

<style scoped>
.theming-docs-page {
  max-width: 800px;
  padding-bottom: 4rem;
}
</style>
