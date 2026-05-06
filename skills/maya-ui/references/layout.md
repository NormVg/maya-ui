# Maya UI — Layout Components

---

## `<MayaCard>`

A surface container with subtle elevation and border. Use as the baseline building block for panels, stat blocks, and content sections.

### Slots
`default` — card content

### Example

```html
<MayaCard style="padding: 24px;">
  <h3>Card Title</h3>
  <p>Card body content here.</p>
</MayaCard>
```

---

## `<MayaAppShell>`

Full-page layout primitive that manages sidebar, topbar, and main content areas.

### Slots
| Slot | Description |
|---|---|
| `sidebar` | Left sidebar navigation |
| `topbar` | Top navigation bar |
| `default` | Main content area |

### Example

```html
<MayaAppShell>
  <template #topbar>
    <MayaTopbar>
      <MayaThemeToggle />
    </MayaTopbar>
  </template>
  <template #sidebar>
    <MayaSidebar :items="navItems" />
  </template>
  <NuxtPage />
</MayaAppShell>
```

---

## `<MayaAccordion>` / `<MayaAccordionItem>`

Expandable/collapsible content sections. Multiple items can be open simultaneously.

### `<MayaAccordionItem>` Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `title` | `string` | required | Header text |
| `defaultOpen` | `boolean` | `false` | Whether this item starts expanded |
| `disabled` | `boolean` | `false` | |

### Slots (`<MayaAccordionItem>`)
`default` — content shown when expanded

### Example

```html
<MayaAccordion>
  <MayaAccordionItem title="What is Maya UI?" :defaultOpen="true">
    Maya UI is a premium Nuxt 3 component library with 90+ auto-registered components.
  </MayaAccordionItem>
  <MayaAccordionItem title="How do I install it?">
    Run <code>npm install maya-ui</code> and add it to your nuxt.config.ts modules.
  </MayaAccordionItem>
</MayaAccordion>
```

---

## `<MayaCollapsible>`

A single expand/collapse section with full control over trigger and content.

### Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `modelValue` | `boolean` | `false` | Open state. Use `v-model`. |
| `defaultOpen` | `boolean` | `false` | Start expanded without v-model |

### Slots
| Slot | Description |
|---|---|
| `trigger` | The clickable trigger element |
| `default` | The collapsible content |

### Example

```html
<MayaCollapsible v-model="isOpen">
  <template #trigger>
    <MayaBtn variant="ghost">Advanced options <ChevronDownIcon /></MayaBtn>
  </template>
  <div style="padding: 16px; border: 1px solid var(--maya-border); border-radius: var(--maya-radius-md);">
    Advanced settings here...
  </div>
</MayaCollapsible>
```

---

## `<MayaBentoGrid>` / `<MayaBentoItem>`

CSS grid-based bento box layout for dashboards and feature grids.

### `<MayaBentoGrid>` Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `columns` | `number` | `3` | Grid column count |
| `gap` | `string` | `'16px'` | Gap between items |

### `<MayaBentoItem>` Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `colSpan` | `number` | `1` | How many columns this item spans |
| `rowSpan` | `number` | `1` | How many rows this item spans |

### Example

```html
<MayaBentoGrid :columns="3">
  <MayaBentoItem :colSpan="2" :rowSpan="2">
    <MayaCard style="height: 100%; padding: 24px;">Main feature</MayaCard>
  </MayaBentoItem>
  <MayaBentoItem>
    <MayaCard style="height: 100%; padding: 16px;">Stat 1</MayaCard>
  </MayaBentoItem>
  <MayaBentoItem>
    <MayaCard style="height: 100%; padding: 16px;">Stat 2</MayaCard>
  </MayaBentoItem>
</MayaBentoGrid>
```

---

## `<MayaScrollArea>`

Custom-styled scrollable container with thin themed scrollbars and fade-edge masks.

### Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `hideScrollbar` | `boolean` | `false` | Hides the scrollbar (keeps scrollability) |

### Slots
`default` — scrollable content

### Example

```html
<MayaScrollArea style="height: 300px; width: 100%;">
  <div v-for="item in items" :key="item.id" style="padding: 8px; border-top: 1px solid var(--maya-border);">
    {{ item.label }}
  </div>
</MayaScrollArea>
```

---

## `<MayaResizable>`

A container that can be drag-resized by the user (via the native CSS `resize` property + a custom handle indicator).

### Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `minWidth` | `string` | `'180px'` | Minimum width |
| `minHeight` | `string` | `'120px'` | Minimum height |
| `maxWidth` | `string` | `'100%'` | Maximum width |
| `maxHeight` | `string` | `'100%'` | Maximum height |

### Example

```html
<MayaResizable style="width: 300px; height: 200px; display: flex; align-items: center; justify-content: center;">
  Drag corner to resize
</MayaResizable>
```

---

## `<MayaSeparator>`

A visual divider — horizontal (default) or vertical. Supports an optional center label.

### Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `orientation` | `string` | `'horizontal'` | `'horizontal'` or `'vertical'` |
| `label` | `string` | `''` | Center badge text (horizontal only) |

### Example

```html
<!-- Between sections -->
<MayaSeparator />

<!-- With label -->
<MayaSeparator label="or continue with" />

<!-- In a toolbar -->
<div style="display: flex; align-items: center; gap: 8px; height: 32px;">
  <span>File</span>
  <MayaSeparator orientation="vertical" />
  <span>Edit</span>
</div>
```

---

## `<MayaAspectRatio>`

Enforces a fixed aspect ratio on its child content. Useful for images, videos, and embeds.

### Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `ratio` | `number` | `1` | Width/height ratio (e.g. `16/9`, `4/3`, `1`) |

### Example

```html
<MayaAspectRatio :ratio="16/9" style="width: 100%; max-width: 600px;">
  <img src="/hero.jpg" alt="Hero" style="width: 100%; height: 100%; object-fit: cover;" />
</MayaAspectRatio>
```

---

## Dashboard Layout Pattern

```html
<MayaAppShell>
  <template #topbar>
    <MayaTopbar>
      <h1>Dashboard</h1>
      <MayaThemeToggle />
    </MayaTopbar>
  </template>
  <template #sidebar>
    <MayaSidebar :items="[
      { label: 'Overview', href: '/', icon: HomeIcon },
      { label: 'Analytics', href: '/analytics', icon: BarChartIcon },
      { label: 'Settings', href: '/settings', icon: SettingsIcon },
    ]" />
  </template>

  <div style="padding: 24px; display: flex; flex-direction: column; gap: 24px;">
    <!-- Stat cards -->
    <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px;">
      <MayaCard style="padding: 20px;">Revenue: $12,400</MayaCard>
      <MayaCard style="padding: 20px;">Users: 1,204</MayaCard>
      <MayaCard style="padding: 20px;">Uptime: 99.98%</MayaCard>
    </div>

    <!-- Tabbed content -->
    <MayaTabs v-model="tab">
      <MayaTabsList>
        <MayaTabsTrigger value="activity">Activity</MayaTabsTrigger>
        <MayaTabsTrigger value="reports">Reports</MayaTabsTrigger>
      </MayaTabsList>
      <MayaTabsContent value="activity">Activity feed...</MayaTabsContent>
      <MayaTabsContent value="reports">Reports table...</MayaTabsContent>
    </MayaTabs>
  </div>
</MayaAppShell>
```
