# Maya UI

A premium component library for Nuxt — dark-first, zero dependencies, pure CSS tokens.

## Features

- **Dark-first design** — every component is crafted for dark mode, with a polished light counterpart
- **Pure CSS tokens** — no Tailwind, no utility classes — just clean custom properties you override
- **Auto-imported** — register the module and all components are globally available
- **Semantic intent** — success, warning, danger, info across every interactive component
- **Spring-based motion** — bouncy animations on buttons, toggles, checkboxes, and switches
- **View Transitions** — cinematic circular-reveal theme toggle via the Document View Transition API
- **Shiki syntax highlighting** — theme-aware code blocks with automatic light/dark switching

## Quick Start

```bash
pnpm add -D maya-ui
```

```typescript
// nuxt.config.ts
export default defineNuxtConfig({
  modules: ['maya-ui'],
})
```

That's it. All components are auto-imported with the `Maya` prefix.

## Components

### Buttons & Controls
- `MayaBtn` — primary, secondary, ghost with semantic intent
- `MayaSwitch` — iOS-style toggle with spring animation
- `MayaToggle` / `MayaToggleGroup` — pressable selection buttons

### Inputs
- `MayaInput` — text input with focus ring
- `MayaTextarea` — multi-line text input
- `MayaCheckbox` — bouncy animated checkmark

### Containers
- `MayaCard` — surface with header/content/footer slots
- `MayaBadge` — solid, soft, outline chip with semantic colors
- `MayaAvatar` / `MayaAvatarGroup` — image, initials, status dot
- `MayaTable` — clean data table

### Base UI
- `MayaLabel` — accessible form label with required indicator
- `MayaSeparator` — horizontal/vertical divider
- `MayaKbd` — keyboard shortcut display

### Code & Prose
- `MayaCodeBlock` — Shiki-highlighted multi-line code with copy button
- `MayaInlineCode` — copyable one-liner
- `MayaProse` — markdown renderer with syntax highlighting
- `MayaPreviewCode` — live preview + code tab component

### Loaders
- `MayaSpinner` — SVG animated ring
- `MayaSkeleton` — shimmer placeholder
- `MayaLoadingDots` — bouncing dots

### System
- `MayaThemeToggle` — View Transition-powered dark/light switch

## Customization

Override any CSS token in your app:

```css
:root {
  --maya-accent: #6366f1;
  --maya-accent-hover: #818cf8;
  --maya-radius-md: 8px;
  --maya-font-sans: "Geist", sans-serif;
}
```

## Development

```bash
# Install dependencies
pnpm install

# Generate type stubs
pnpm run dev:prepare

# Develop with the playground
pnpm run dev

# Lint
pnpm run lint

# Test
pnpm run test
```

## License

[MIT](./LICENSE)
