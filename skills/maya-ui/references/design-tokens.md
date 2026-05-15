# Maya UI — Design Tokens

All tokens are CSS custom properties defined in `maya.css` and injected automatically by the module. Use them in any scoped or global CSS. Never hardcode colors — always prefer these tokens so your styles adapt to both dark and light mode.

---

## Backgrounds

| Token | Dark value | Light value | Purpose |
|---|---|---|---|
| `--maya-bg-root` | `#0a0a0a` | `#ffffff` | Base page background |
| `--maya-bg-surface` | `#111111` | `#f8f8f8` | Cards, panels, inputs |
| `--maya-bg-raised` | `#191919` | `#f0f0f0` | Dropdowns, popovers, elevated surfaces |
| `--maya-bg-overlay` | `rgba(0,0,0,0.6)` | `rgba(0,0,0,0.3)` | Modal backdrop scrim |
| `--maya-bg-topbar` | `rgba(10,10,10,0.6)` | `rgba(255,255,255,0.6)` | Translucent topbar with glass effect |

---

## Text

| Token | Dark value | Light value | Purpose |
|---|---|---|---|
| `--maya-text-primary` | `#ededed` | `#171717` | Main readable text |
| `--maya-text-secondary` | `#888888` | `#6b6b6b` | Supporting / subdued text |
| `--maya-text-muted` | `#555555` | `#a3a3a3` | Placeholders, disabled states |
| `--maya-text-inverse` | `#0a0a0a` | `#ffffff` | Text on inverted surfaces |

---

## Borders

| Token | Purpose |
|---|---|
| `--maya-border` | Default subtle border |
| `--maya-border-strong` | Stronger, more visible border |
| `--maya-border-hover` | Border on interactive hover states |

---

## Shadows

| Token | Purpose |
|---|---|
| `--maya-shadow-sm` | Slight lift (e.g. small cards) |
| `--maya-shadow-md` | Medium depth (dropdowns, dialogs) |
| `--maya-shadow-inset` | Inner shadow (inputs, concave surfaces) |
| `--maya-gradient-surface` | Subtle top-to-bottom surface gradient |

---

## Border Radii

```css
--maya-radius-sm: 5px   /* Small buttons, tags */
--maya-radius-md: 6px   /* Default inputs, buttons */
--maya-radius-lg: 8px   /* Cards, panels */
--maya-radius-xl: 12px  /* Large modals, overlays */
```

---

## Typography

```css
--maya-font-sans: "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
--maya-font-mono: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
```

---

## Animation

```css
--maya-duration: 150ms                              /* Default transition duration */
--maya-duration-bouncy: 400ms                       /* Bouncy spring animations */
--maya-ease: cubic-bezier(0.16, 1, 0.3, 1)          /* Default ease-out feel */
--maya-ease-in: cubic-bezier(0.32, 0, 0.67, 0)
--maya-ease-out: cubic-bezier(0.33, 1, 0.68, 1)
--maya-ease-in-out: cubic-bezier(0.65, 0, 0.35, 1)
--maya-ease-bouncy: cubic-bezier(0.25, 1, 0.5, 1.2) /* Spring overshoot */
```

### Built-in CSS transition classes
Use these on `<Transition name="...">` wrappers in your own components:

| Class name | Effect |
|---|---|
| `maya-icon-swap` | Bouncy scale + fade (for icon swaps) |
| `maya-panel-fade` | Opacity + translateY slide (for tab switching) |
| `maya-fade` | Simple opacity fade |
| `maya-overlay-fade` | Backdrop fade |
| `maya-dialog-zoom` | Dialog scale-in with blur |

---

## Semantic / Intent Colors

These underpin the `intent` prop system across all components. Each intent has five tokens:

```css
/* Pattern: --maya-{intent}-{variant} */
--maya-success            /* Base color */
--maya-success-hover      /* Hover/active tint */
--maya-success-muted      /* Low-opacity background fill */
--maya-success-border     /* Border color */
--maya-success-text       /* Readable text on muted background */

/* Same pattern for: warning, danger, info */
```

**Base colors:**

| Intent | Dark color | Light color |
|---|---|---|
| Success | `#30A46C` | `#30A46C` |
| Warning | `#F76B15` | `#F76B15` |
| Danger | `#E5484D` | `#E5484D` |
| Info | `#0090FF` | `#0090FF` |

---

## Utility Classes

These utility classes are globally available without any import:

```css
.maya-dash-top      /* Dashed top border */
.maya-dash-bottom   /* Dashed bottom border */
.maya-dash-left     /* Dashed left border */
.maya-dash-right    /* Dashed right border */
.maya-dash-all      /* Dashed all sides */
```

---

## Theming in Practice

```html
<!-- Dark (default) -->
<html data-theme="dark">

<!-- Light -->
<html data-theme="light">
```

Override accent color in your global CSS:
```css
:root {
  --maya-accent: #6366f1;
  --maya-accent-hover: #818cf8;
  --maya-accent-muted: rgba(99, 102, 241, 0.15);
}
```
