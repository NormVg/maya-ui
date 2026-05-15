<div align="center">
  <h1>Maya UI</h1>
  <p><strong>A polished Vue and Nuxt component library for expressive, production-grade interfaces.</strong></p>
  <p>
    Dark-first design tokens · Nuxt auto-imports · Motion-rich interactions · Accessible primitives
  </p>
  <p>
    Made with love by <a href="https://taohq.org">TaoHQ</a>
  </p>
</div>

---

## Overview

Maya UI is a component system for teams that want refined interface building blocks without adopting a utility-first styling stack. It ships a broad set of Vue components, Nuxt module integration, CSS variable theming, interactive feedback patterns, code-display utilities, and a local agent skill for AI-assisted development.

The library is designed around a consistent visual language: compact controls, tactile motion, layered surfaces, semantic intent colors, and practical defaults that still remain easy to override.

## Highlights

- **Nuxt-native setup**: register the module once and use globally auto-imported `Maya*` components across your app.
- **CSS token architecture**: customize color, radius, typography, spacing, borders, shadows, and motion with standard CSS variables.
- **Rich component coverage**: form controls, overlays, navigation, data display, status feedback, layout primitives, media, and code presentation.
- **Motion and sound hooks**: built-in interaction feedback through Maya composables and component states.
- **Dark-first, theme-aware UI**: includes theme primitives and defaults tuned for both dark and light surfaces.
- **Agent-ready docs**: ships a structured `skills/maya-ui` reference for coding agents and AI-assisted workflows.

## Installation

Install the package:

```bash
pnpm add -D @thenormvg/maya-ui
```

Add Maya UI to your Nuxt config:

```ts
export default defineNuxtConfig({
  modules: ['@thenormvg/maya-ui'],
})
```

Use components directly in your Vue files:

```vue
<template>
  <MayaCard>
    <MayaField label="Project name">
      <MayaInput placeholder="Maya UI" />
    </MayaField>

    <MayaBtn intent="success">
      Save changes
    </MayaBtn>
  </MayaCard>
</template>
```

The module automatically registers components with the `Maya` prefix and injects the default `maya.css` design tokens.

## Agent Skill Install

Give your coding assistant the Maya UI component reference, token system, and usage patterns:

```bash
npx skills TheAlphaOnes/maya-ui
```

The skill helps agents generate Maya UI screens with the right component names, props, spacing, and design conventions.

## Component Library

Maya UI includes a wide runtime component set, grouped by product workflow.

### Actions And Inputs

`MayaBtn`, `MayaBtnGroup`, `MayaInput`, `MayaTextarea`, `MayaNumberField`, `MayaCheckbox`, `MayaCheckboxGroup`, `MayaRadio`, `MayaRadioGroup`, `MayaSwitch`, `MayaToggle`, `MayaToggleGroup`, `MayaSelect`, `MayaNativeSelect`, `MayaCombobox`, `MayaMultiSelect`, `MayaInputOTP`, `MayaColorPicker`, `MayaDateChooser`, `MayaFileUpload`

### Layout And Structure

`MayaAppShell`, `MayaCard`, `MayaBentoGrid`, `MayaBentoItem`, `MayaAspectRatio`, `MayaResizable`, `MayaScrollArea`, `MayaSeparator`, `MayaSidebar`, `MayaTopbar`, `MayaField`, `MayaFieldset`, `MayaForm`, `MayaFormGroup`, `MayaLabel`, `MayaInputGroup`

### Navigation And Menus

`MayaBreadcrumb`, `MayaTabs`, `MayaTabsList`, `MayaTabsTrigger`, `MayaTabsContent`, `MayaMenubar`, `MayaNavigationMenu`, `MayaDropdownMenu`, `MayaDropdownItem`, `MayaDropdownSeparator`, `MayaContextMenu`, `MayaCommand`, `MayaPagination`

### Feedback And Overlays

`MayaAlert`, `MayaAlertDialog`, `MayaBanner`, `MayaDialog`, `MayaModal`, `MayaSheet`, `MayaPopover`, `MayaHoverCard`, `MayaTooltip`, `MayaToast`, `MayaToaster`, `MayaEmptyState`, `MayaSkeleton`, `MayaSpinner`, `MayaLoadingDots`, `MayaPixelLoader`, `MayaDotOrbit`, `MayaProgress`, `MayaMeter`, `MayaStatusDot`

### Data, Media, And Display

`MayaTable`, `MayaDataTable`, `MayaCalendar`, `MayaFullCalendar`, `MayaAvatar`, `MayaAvatarGroup`, `MayaBadge`, `MayaCarousel`, `MayaCarouselItem`, `MayaPreviewCard`, `MayaColorPanels`, `MayaCanvasBoard`, `MayaSortableList`, `MayaShowMore`, `MayaAudioPlayer`, `MayaVideoPlayer`, `MayaDitherShader`, `MayaChatBubble`

### Code And Documentation

`MayaCodeBlock`, `MayaInlineCode`, `MayaPreviewCode`, `MayaProse`, `MayaKbd`

## Composables

Maya UI also auto-imports supporting composables:

```ts
const toast = useToast()
const { play } = useMayaSound()
const theme = useMayaTheme()
```

Use them for product feedback, interaction sounds, toast workflows, and theme-aware UI behavior.

## Theming

Maya UI uses native CSS custom properties. Override tokens anywhere in your app CSS:

```css
:root {
  --maya-bg-root: #09090b;
  --maya-bg-surface: #111113;
  --maya-text-primary: #f4f4f5;
  --maya-text-secondary: #a1a1aa;

  --maya-accent: #6366f1;
  --maya-accent-hover: #818cf8;
  --maya-accent-text: #ffffff;

  --maya-radius-sm: 6px;
  --maya-radius-md: 8px;
  --maya-radius-lg: 12px;

  --maya-font-sans: "Inter", "Geist", system-ui, sans-serif;
  --maya-font-mono: "Fira Code", "SFMono-Regular", monospace;
}
```

Because the theme is token-based, you can customize Maya UI without changing component source, build configuration, or a utility framework preset.

## Agent Skill

This repository includes a first-party agent skill at:

```txt
skills/maya-ui
```

The skill contains component references, design tokens, spacing rules, usage guidance, and implementation notes. It is intended for coding assistants that need accurate local context for generating Maya UI screens without guessing props or patterns.

## Local Development

Install dependencies:

```bash
pnpm install
```

Prepare the Nuxt module and playground:

```bash
pnpm run dev:prepare
```

Start the playground:

```bash
pnpm run dev
```

Build the playground:

```bash
pnpm run dev:build
```

Run tests:

```bash
pnpm run test
```

## Project Scripts

| Script | Description |
| --- | --- |
| `pnpm run dev` | Builds the module stub and starts the Nuxt playground. |
| `pnpm run dev:prepare` | Generates Nuxt/module build artifacts for local development. |
| `pnpm run dev:build` | Builds the playground for production. |
| `pnpm run lint` | Runs ESLint across the repository. |
| `pnpm run test` | Runs the Vitest suite. |
| `pnpm run test:types` | Runs Vue and TypeScript type checks. |

## License

[MIT](./LICENSE) © 2026 TaoHQ. Made with love by TaoHQ.
