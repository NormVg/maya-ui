---
name: maya-ui
description: >
  How to install, configure, and use Maya UI — a Nuxt module that auto-registers 90+
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

Maya UI is a **Nuxt module** that provides 90+ polished, theme-aware Vue components. All components auto-register globally with the `Maya` prefix. No per-file imports needed — just install and use.

---

## Quick Setup

```bash
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
- Injects the full CSS design token system (dark & light themes)

---

## ⚠️ Critical Rules for Agents

1. **Never manually import** `<Maya*>` components — they are globally auto-registered.
2. **Never manually import** composables like `useToast` — they are auto-imported.
3. **Components have ZERO outer margins.** You MUST add spacing yourself using CSS `gap`, `margin`, or wrapper `padding`. See `references/spacing-patterns.md`.
4. For toasts to render, place `<MayaToaster />` **once** in `app.vue`.
5. Use `--maya-*` CSS variables for any custom styling. Never hardcode colors.
6. Icons: use `lucide-vue-next`. Pass icon components as props (e.g. `:icon="CheckCircleIcon"`).

---

## Theming

Dark mode is the default. Toggle via `data-theme` on `<html>`:

```html
<html data-theme="dark">   <!-- default -->
<html data-theme="light">  <!-- light mode -->
```

Use `<MayaThemeToggle />` for a built-in animated toggle.

---

## The Intent System

Many components accept an `intent` prop for semantic coloring. Always prefer intent over hardcoded colors:

```
'default' | 'success' | 'warning' | 'danger' | 'info'
```

Components supporting intent: `MayaBtn`, `MayaAlert`, `MayaBadge`, `MayaCard`, `MayaBanner`, `MayaStatusDot`.

---

## Reference Files

**Read the file relevant to your task. DO NOT load all files at once.**

| Category | File | What's Inside |
|---|---|---|
| **Spacing & Composition** | `references/spacing-patterns.md` | **READ THIS FIRST.** Page layout gaps, component spacing rules, common layout patterns |
| Design Tokens | `references/design-tokens.md` | All CSS variables, backgrounds, text, borders, shadows, animation |
| Buttons & Actions | `references/buttons-actions.md` | MayaBtn, MayaToggle, MayaToggleGroup, MayaBtnGroup |
| Forms & Inputs | `references/forms-inputs.md` | MayaInput, MayaSelect, MayaCheckbox, MayaRadio, MayaSwitch, MayaCombobox, MayaFileUpload, MayaColorPicker, MayaCalendar, MayaInputOTP |
| Overlays & Feedback | `references/overlays-feedback.md` | MayaDialog, MayaAlertDialog, MayaSheet, MayaPopover, MayaHoverCard, MayaTooltip, MayaToast, MayaAlert, MayaBanner |
| Navigation | `references/navigation.md` | MayaTabs, MayaDropdownMenu, MayaBreadcrumb, MayaCommand, MayaContextMenu, MayaMenubar, MayaNavigationMenu, MayaPagination |
| Layout | `references/layout.md` | MayaCard, MayaAppShell, MayaAccordion, MayaCollapsible, MayaBentoGrid, MayaScrollArea, MayaResizable, MayaSeparator, MayaAspectRatio |
| Data Display | `references/data-display.md` | MayaTable, MayaDataTable, MayaBadge, MayaAvatar, MayaCarousel, MayaCodeBlock, MayaProse, MayaEmptyState, MayaChatBubble |
| Status & Loaders | `references/status-loaders.md` | MayaSpinner, MayaSkeleton, MayaLoadingDots, MayaPixelLoader, MayaDotOrbit, MayaStatusDot, MayaProgress, MayaMeter |
| Composables | `references/composables.md` | useToast(), useMayaSound() |

---

## Quick Cheatsheet

### Page Container
```html
<div style="max-width: 800px; margin: 0 auto; padding: 48px 24px; display: flex; flex-direction: column; gap: 32px;">
  <!-- page sections go here -->
</div>
```

### Button
```html
<MayaBtn>Primary</MayaBtn>
<MayaBtn variant="secondary" size="sm" intent="danger" :disabled="false">Delete</MayaBtn>
```

### Form Field
```html
<div style="display: flex; flex-direction: column; gap: 16px;">
  <MayaInput v-model="name" label="Name" placeholder="Jane Doe" />
  <MayaSelect v-model="role" :options="['Admin', 'User']" placeholder="Pick role" />
  <MayaTextarea v-model="bio" label="Bio" placeholder="Tell us about yourself" />
</div>
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
<MayaTabs default-value="a">
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

### Card with Sections
```html
<MayaCard>
  <template #header>Card Header</template>
  Card body content.
  <template #footer>
    <MayaBtn size="sm">Action</MayaBtn>
  </template>
</MayaCard>
```

For deeper API details on any component, read the relevant reference file listed above.
