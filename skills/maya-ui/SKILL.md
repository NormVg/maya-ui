---
name: maya-ui
description: >
  How to install, configure, and use Maya UI — a Nuxt 3 module that auto-registers 90+
  premium Vue components globally under the `Maya` prefix (e.g. `<MayaBtn>`, `<MayaDialog>`,
  `<MayaToast>`). Use this skill whenever the user is working in a Nuxt project and wants to
  add UI components, build forms, dialogs, dashboards, data tables, or any interactive
  interface using Maya UI. Trigger proactively on phrases like: "use Maya UI", "add a button",
  "build a form", "create a dialog", "I need a sidebar", "show a toast", "add a modal",
  "I'm using @thenormvg/maya-ui", or when you see `<Maya*>` tags in Vue files. Also trigger when the
  user has @thenormvg/maya-ui in their package.json and starts asking about UI components — even if they
  don't explicitly mention "Maya".
---

# Maya UI — Agent Reference

Maya UI is a **Nuxt 3 module** that provides 90+ polished, theme-aware Vue components. All components auto-register globally with the `Maya` prefix. No per-file imports are needed — just install and use.

---

## Quick Setup

```bash
npm install @thenormvg/maya-ui
# or
pnpm add @thenormvg/maya-ui
```

```ts
// nuxt.config.ts
export default defineNuxtConfig({
  modules: ['@thenormvg/maya-ui']
})
```

The module automatically:
- Registers all `<Maya*>` components globally
- Auto-imports all composables (`useToast`, `useMayaSound`)
- Injects the full CSS design token system

---

## Theming

Dark mode is the default. Toggle via `data-theme` on `<html>`:

```html
<html data-theme="dark">   <!-- default -->
<html data-theme="light">  <!-- light mode -->
```

Use `<MayaThemeToggle />` for a built-in animated toggle. To customize the accent color globally, override these CSS variables anywhere:

```css
:root {
  --maya-accent: #6366f1;
  --maya-accent-hover: #818cf8;
  --maya-accent-muted: rgba(99, 102, 241, 0.15);
}
```

---

## The Intent System

Many components accept an `intent` prop for semantic coloring. Always prefer intent over hardcoded colors:

```
'default' | 'success' | 'warning' | 'danger' | 'info'
```

---

## Key Conventions

- **Never manually import** `<Maya*>` components in `<script setup>` — they are globally auto-registered.
- **Never manually import** composables like `useToast` — they are auto-imported.
- For toasts to render, place `<MayaToaster />` **once** in `app.vue`.
- Use `--maya-*` CSS variables for custom styling to stay theme-compatible.
- Icons: the library uses `lucide-vue-next` throughout. Pass icon components as props (e.g. `:icon="CheckCircleIcon"`).
- Options for `<MayaSelect>` accept either plain strings/numbers or `{ value, label, disabled? }` objects.

---

## Reference Files

Consult these files for full prop tables, events, slots, and examples per category. Read only what you need:

| Category | File | Components |
|---|---|---|
| Design Tokens | `references/design-tokens.md` | All CSS variables, animations, spacing |
| Buttons & Actions | `references/buttons-actions.md` | Btn, Toggle, ToggleGroup, BtnGroup |
| Forms & Inputs | `references/forms-inputs.md` | Input, Select, Checkbox, Radio, Switch, Combobox, FileUpload, ColorPicker, Calendar, OTP |
| Overlays & Feedback | `references/overlays-feedback.md` | Dialog, AlertDialog, Sheet, Popover, HoverCard, Tooltip, Toast, Alert, Banner |
| Navigation | `references/navigation.md` | Tabs, Dropdown, Breadcrumb, Command, ContextMenu, Menubar, NavigationMenu, Pagination |
| Layout | `references/layout.md` | Card, AppShell, Accordion, Collapsible, BentoGrid, ScrollArea, Resizable, Separator, AspectRatio |
| Data Display | `references/data-display.md` | Table, DataTable, Badge, Avatar, Carousel, CodeBlock, Prose, EmptyState, ChatBubble |
| Status & Loaders | `references/status-loaders.md` | Spinner, Skeleton, LoadingDots, PixelLoader, DotOrbit, StatusDot, Progress, Meter |
| Composables | `references/composables.md` | useToast(), useMayaSound() |

---

## Most Common Patterns (quick reference)

### Button
```html
<MayaBtn>Primary</MayaBtn>
<MayaBtn variant="secondary" size="sm" intent="danger" :disabled="false">Delete</MayaBtn>
```

### Form Group
```html
<MayaFormGroup label="Email" hint="Required">
  <MayaInput v-model="email" placeholder="you@example.com" />
</MayaFormGroup>
```

### Select
```html
<MayaSelect v-model="role" :options="['Admin', 'User']" placeholder="Pick role" />
<!-- Or with objects: -->
<MayaSelect v-model="role" :options="[{ value: 'admin', label: 'Admin' }]" />
```

### Dialog
```html
<MayaDialog v-model="open">
  <h2>Dialog Title</h2>
  <p>Dialog content here.</p>
</MayaDialog>
```

### Toast
```ts
// In app.vue: <MayaToaster />
const { toast } = useToast()
toast({ title: 'Saved!', intent: 'success', duration: 4000 })
```

### Tabs
```html
<MayaTabs v-model="tab">
  <MayaTabsList>
    <MayaTabsTrigger value="a">Tab A</MayaTabsTrigger>
    <MayaTabsTrigger value="b">Tab B</MayaTabsTrigger>
  </MayaTabsList>
  <MayaTabsContent value="a">Content A</MayaTabsContent>
  <MayaTabsContent value="b">Content B</MayaTabsContent>
</MayaTabs>
```

### Alert
```html
<MayaAlert intent="warning" title="Heads up" :icon="AlertTriangleIcon">
  Something needs your attention.
</MayaAlert>
```

For deeper API details on any component, read the relevant reference file listed above.
