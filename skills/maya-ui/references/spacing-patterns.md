# Maya UI — Spacing & Composition Patterns

Maya UI components have **zero outer margins** by default. This is intentional — it gives you full control. But it means **you must explicitly define spacing** between components using CSS `gap`, `margin`, or wrapper `padding`.

This file is the most important reference for building layouts that don't look broken.

---

## Core Spacing Scale

Use these values consistently. They map to the visual rhythm of Maya's internal component padding:

| Size | Pixels | Use for |
|---|---|---|
| `4px` | Micro | Between inline badges, icon+text pairs |
| `8px` | Tight | Between items in a compact list, toolbar buttons |
| `12px` | Snug | Between icon and label inside a component, between radio options |
| `16px` | Default | Between form fields, between cards in a grid, between list items |
| `24px` | Section | Between logical groups within a page section |
| `32px` | Block | Between major page blocks/sections |
| `48px` | Page | Page header to first section, between major page zones |

---

## The #1 Pattern: Page Container

Every page you build should start with a container that sets max-width, centering, and vertical spacing:

```html
<div style="max-width: 800px; margin: 0 auto; padding: 48px 24px; display: flex; flex-direction: column; gap: 32px;">
  <!-- All page sections go here with automatic 32px vertical spacing -->
</div>
```

For wider layouts (dashboards, data tables):
```html
<div style="max-width: 1200px; margin: 0 auto; padding: 32px 24px; display: flex; flex-direction: column; gap: 24px;">
  <!-- Dashboard content -->
</div>
```

---

## Form Layouts

### Vertical Form (most common)
```html
<div style="display: flex; flex-direction: column; gap: 16px; max-width: 400px;">
  <MayaInput v-model="name" label="Full Name" placeholder="Jane Doe" />
  <MayaInput v-model="email" label="Email" placeholder="jane@example.com" type="email" />
  <MayaSelect v-model="role" :options="['Admin', 'Editor', 'Viewer']" placeholder="Select role" />
  <MayaTextarea v-model="bio" label="Bio" placeholder="Tell us about yourself" :rows="3" />
  <MayaBtn>Submit</MayaBtn>
</div>
```

### Inline Form Row
```html
<div style="display: flex; gap: 12px; align-items: flex-end;">
  <MayaInput v-model="search" placeholder="Search..." style="flex: 1;" />
  <MayaBtn>Search</MayaBtn>
</div>
```

### Two-Column Form
```html
<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px; max-width: 600px;">
  <MayaInput v-model="first" label="First Name" />
  <MayaInput v-model="last" label="Last Name" />
  <MayaInput v-model="email" label="Email" style="grid-column: span 2;" />
  <div style="grid-column: span 2;">
    <MayaBtn>Save</MayaBtn>
  </div>
</div>
```

---

## Button Groups

### Horizontal button row
```html
<div style="display: flex; gap: 8px;">
  <MayaBtn>Save</MayaBtn>
  <MayaBtn variant="secondary">Cancel</MayaBtn>
</div>
```

### Right-aligned actions (e.g. dialog footer)
```html
<div style="display: flex; justify-content: flex-end; gap: 8px; margin-top: 24px;">
  <MayaBtn variant="ghost">Cancel</MayaBtn>
  <MayaBtn>Confirm</MayaBtn>
</div>
```

### Button with destructive confirmation
```html
<div style="display: flex; justify-content: space-between; align-items: center;">
  <MayaBtn variant="ghost" intent="danger" size="sm">Delete Account</MayaBtn>
  <MayaBtn>Save Changes</MayaBtn>
</div>
```

---

## Card Grids

### Stats Row (3 columns)
```html
<div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px;">
  <MayaCard>
    <template #header>Revenue</template>
    <span style="font-size: 1.5rem; font-weight: 700; color: var(--maya-text-primary);">$12,400</span>
  </MayaCard>
  <MayaCard>
    <template #header>Users</template>
    <span style="font-size: 1.5rem; font-weight: 700; color: var(--maya-text-primary);">1,204</span>
  </MayaCard>
  <MayaCard>
    <template #header>Uptime</template>
    <span style="font-size: 1.5rem; font-weight: 700; color: var(--maya-text-primary);">99.98%</span>
  </MayaCard>
</div>
```

### Responsive card grid
```html
<div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 16px;">
  <MayaCard v-for="item in items" :key="item.id">
    <!-- card content -->
  </MayaCard>
</div>
```

---

## Page Section Pattern

A typical page section: title, description, then content.

```html
<!-- Section wrapper -->
<div style="display: flex; flex-direction: column; gap: 16px;">
  <!-- Section header -->
  <div>
    <h2 style="font-size: 1.25rem; font-weight: 600; color: var(--maya-text-primary); margin: 0;">
      Section Title
    </h2>
    <p style="font-size: 0.875rem; color: var(--maya-text-secondary); margin: 4px 0 0;">
      A brief description of this section.
    </p>
  </div>

  <!-- Section content -->
  <MayaCard>
    <!-- content here -->
  </MayaCard>
</div>
```

---

## List of Items

### Separated list
```html
<div style="display: flex; flex-direction: column;">
  <div v-for="(item, i) in items" :key="item.id">
    <div style="padding: 12px 0; display: flex; align-items: center; justify-content: space-between;">
      <span style="color: var(--maya-text-primary);">{{ item.name }}</span>
      <MayaBadge intent="success">Active</MayaBadge>
    </div>
    <MayaSeparator v-if="i < items.length - 1" />
  </div>
</div>
```

---

## Alert Stacks

When showing multiple alerts, stack them with gap:
```html
<div style="display: flex; flex-direction: column; gap: 12px;">
  <MayaAlert intent="info" title="New Feature" :icon="SparklesIcon">
    Dark mode is now available!
  </MayaAlert>
  <MayaAlert intent="warning" title="Disk Space" :icon="AlertTriangleIcon">
    You're running low on storage.
  </MayaAlert>
</div>
```

---

## Responsive Screens (Breakpoints)

Maya UI does NOT ship with a utility-class framework like Tailwind, meaning there are no `md:`, `lg:`, etc. classes out of the box. You must use standard CSS media queries for your screens.

We recommend standardizing your screens around these breakpoints in your scoped CSS:

| Screen Size | Breakpoint | Typical Device |
|---|---|---|
| Mobile | (default) | Phones |
| Tablet | `@media (min-width: 768px)` | iPads, large tablets |
| Desktop | `@media (min-width: 1024px)` | Laptops, small desktops |
| Wide | `@media (min-width: 1280px)` | Large monitors |

### Example Responsive Layout

When building layouts that change based on screen size, change `flex-direction` or `grid-template-columns` using standard media queries:

```vue
<template>
  <div class="responsive-grid">
    <MayaCard>Item 1</MayaCard>
    <MayaCard>Item 2</MayaCard>
  </div>
</template>

<style scoped>
/* Mobile first: 1 column */
.responsive-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 16px;
}

/* Tablet screen: 2 columns */
@media (min-width: 768px) {
  .responsive-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

/* Desktop screen: 4 columns */
@media (min-width: 1024px) {
  .responsive-grid {
    grid-template-columns: repeat(4, 1fr);
  }
}
</style>
```

---

## Component Internal Padding Reference

These are the **internal** padding values that components use. Match your surrounding spacing accordingly:

| Component | Internal Padding |
|---|---|
| `MayaCard` body | `16px 20px` |
| `MayaCard` header | `16px 20px 12px` |
| `MayaCard` footer | `12px 20px` |
| `MayaAlert` | `16px` |
| `MayaBtn` sm | `6px 12px` |
| `MayaBtn` md | `8px 16px` |
| `MayaBtn` lg | `10px 20px` |
| `MayaInput` | `8px 12px` |
| `MayaTextarea` | `8px 12px` |
| `MayaDialog` content | `24px` (1.5rem) |
| `MayaAccordionItem` body | `0 16px 16px` |
| `MayaSelect` trigger | `8px 12px` |

---

## Typography in Pages

Maya UI does NOT provide heading components. Style your own headings using tokens:

```html
<!-- Page title -->
<h1 style="font-size: 2rem; font-weight: 600; color: var(--maya-text-primary); letter-spacing: -0.02em; margin: 0;">
  Page Title
</h1>

<!-- Subtitle -->
<p style="font-size: 1.125rem; color: var(--maya-text-secondary); line-height: 1.6; margin: 0;">
  A brief description of this page.
</p>

<!-- Section heading -->
<h2 style="font-size: 1.25rem; font-weight: 600; color: var(--maya-text-primary); margin: 0;">
  Section Title
</h2>

<!-- Body text -->
<p style="font-size: 0.875rem; color: var(--maya-text-secondary); line-height: 1.5; margin: 0;">
  Body text using secondary color.
</p>
```

**Key rule:** Always set `margin: 0` on headings and paragraphs — browser defaults will break your `gap`-based layouts.

---

## Full Page Example

```vue
<template>
  <div class="page">
    <div class="page-header">
      <h1 class="page-title">Settings</h1>
      <p class="page-desc">Manage your account preferences.</p>
    </div>

    <MayaCard>
      <template #header>Profile</template>
      <div style="display: flex; flex-direction: column; gap: 16px;">
        <MayaInput v-model="name" label="Display Name" />
        <MayaInput v-model="email" label="Email" type="email" />
        <MayaTextarea v-model="bio" label="Bio" :rows="3" />
      </div>
      <template #footer>
        <div style="display: flex; justify-content: flex-end; gap: 8px;">
          <MayaBtn variant="ghost">Reset</MayaBtn>
          <MayaBtn>Save</MayaBtn>
        </div>
      </template>
    </MayaCard>

    <MayaSeparator />

    <MayaCard>
      <template #header>Notifications</template>
      <div style="display: flex; flex-direction: column; gap: 12px;">
        <div style="display: flex; justify-content: space-between; align-items: center;">
          <span style="color: var(--maya-text-primary); font-size: 0.875rem;">Email notifications</span>
          <MayaSwitch v-model="emailNotifs" />
        </div>
        <MayaSeparator />
        <div style="display: flex; justify-content: space-between; align-items: center;">
          <span style="color: var(--maya-text-primary); font-size: 0.875rem;">Push notifications</span>
          <MayaSwitch v-model="pushNotifs" />
        </div>
      </div>
    </MayaCard>
  </div>
</template>

<script setup>
const name = ref('')
const email = ref('')
const bio = ref('')
const emailNotifs = ref(true)
const pushNotifs = ref(false)
</script>

<style scoped>
.page {
  max-width: 640px;
  margin: 0 auto;
  padding: 48px 24px;
  display: flex;
  flex-direction: column;
  gap: 32px;
}

.page-header {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.page-title {
  font-size: 2rem;
  font-weight: 600;
  color: var(--maya-text-primary);
  letter-spacing: -0.02em;
  margin: 0;
}

.page-desc {
  font-size: 1.125rem;
  color: var(--maya-text-secondary);
  line-height: 1.6;
  margin: 0;
}
</style>
```
