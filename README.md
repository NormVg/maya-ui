<div align="center">
  <h1>Maya UI</h1>
  <p>A premium, highly customizable Vue & Nuxt component library.</p>
</div>

<p align="center">
  <b>Dark-First • Zero Dependencies • Pure CSS Tokens • Deep Nuxt Integration</b>
</p>

---

## Why Maya UI?

Maya UI is not just another utility-based component library. It is designed to be **highly opinionated on motion and structure** but **completely unopinionated on styling mechanisms**.

- **State-of-the-art Motion** — Fluid, spring-based interactions on buttons, switches, toggles, and modals.
- **Pure CSS Tokens** — No Tailwind config overhead. The theme strictly relies on standard CSS variables (`var(--maya-bg-surface)`).
- **Nuxt Auto-Imports** — Zero repetitive `import` statements. `MayaBtn`, `MayaDialog`, `MayaToaster` are automatically available.
- **Semantic Intent** — Built-in `success`, `warning`, `danger`, and `info` intents across all interactive elements.
- **Cinematic Theme Toggling** — Uses the native Document View Transition API for instant, buttery-smooth light/dark mode circular reveals.

---

## Installation

Install the library using your preferred package manager:

```bash
pnpm add -D maya-ui
```

Add the module to your `nuxt.config.ts`:

```typescript
export default defineNuxtConfig({
  modules: ['maya-ui'],
})
```

You're done! All components prefixing with `Maya` are now accessible in your `.vue` files.

---

## Component Ecosystem

Maya UI includes over **40 distinct components** grouped by functionality, all following the exact same aesthetic language.

### Controls & Inputs
- `MayaBtn`, `MayaToggle`, `MayaToggleGroup`, `MayaSwitch`
- `MayaInput`, `MayaTextarea`, `MayaNumberField`, `MayaInputOtp`
- `MayaCheckbox`, `MayaRadio`, `MayaSelect`, `MayaCombobox`
- `MayaDateChooser`

### Layouts & Containers
- `MayaCard`, `MayaPreviewCard`, `MayaCarousel`, `MayaBadge`, `MayaAvatar`, `MayaTable`
- `MayaAccordion`, `MayaCollapsible`
- `MayaField`, `MayaLabel`, `MayaFieldset`
- `MayaScrollArea`, `MayaResizable`, `MayaSheet` (Drawer)

### Navigation & Menus
- `MayaBreadcrumb`, `MayaMenubar`, `MayaSidebar`, `MayaTopbar`
- `MayaDropdownMenu`, `MayaContextMenu`, `MayaCommand`

### Feedback & Overlays
- `MayaAlert`, `MayaAlertDialog`, `MayaDialog`, `MayaBanner`
- `MayaPopover`, `MayaHoverCard`, `MayaTooltip`
- `MayaToast`, `MayaSonner` (Stackable notifications wrapper)
- `MayaSpinner`, `MayaSkeleton`, `MayaPixelLoader`, `MayaDotOrbit`

### Code Documentation
- `MayaCodeBlock`, `MayaInlineCode`, `MayaPreviewCode`, `MayaProse`

---

## Theming & Customization

Maya UI relies purely on native CSS custom properties. By default, it injects a highly tuned `maya.css` stylesheet, but overriding it is as simple as defining root variables in your project.

```css
:root {
  /* Core Colors */
  --maya-bg-root: #09090b;
  --maya-text-primary: #ededed;

  /* Accent Theming */
  --maya-accent: #6366f1;
  --maya-accent-hover: #818cf8;
  --maya-accent-text: #ffffff;

  /* Form & Radius */
  --maya-radius-md: 8px;
  --maya-radius-full: 9999px;

  /* Typography */
  --maya-font-sans: "Inter", "Geist", sans-serif;
  --maya-font-mono: "Fira Code", monospace;
}
```

---

## Local Development Playground

Maya UI features a beautifully crafted playground mapped to the actual documentation UI.

```bash
# Install dependencies
pnpm install

# Generate Nuxt definitions
pnpm run dev:prepare

# Start playground
pnpm run dev
```

Navigate to `http://localhost:3000` to interact with all the components live in the browser.

---

## License

[MIT](./LICENSE) © 2026

