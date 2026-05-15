# Maya UI — Overlays & Feedback

---

## `<MayaDialog>`

A modal dialog that teleports to `<body>`. Locks body scroll and handles Escape key automatically.

### Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `modelValue` | `boolean` | `false` | Open state. Use `v-model`. |
| `showClose` | `boolean` | `true` | Whether to render the × close button |
| `closeOnClickOutside` | `boolean` | `true` | Close when clicking the backdrop |
| `closeOnEscape` | `boolean` | `true` | Close on Escape key |
| `titleId` | `string` | `undefined` | `aria-labelledby` ID for accessibility |
| `descId` | `string` | `undefined` | `aria-describedby` ID for accessibility |

### Events
| Event | Description |
|---|---|
| `@update:modelValue` | Emits `false` when dialog closes |
| `@close` | Emits when dialog is dismissed |

### Slots
| Slot | Description |
|---|---|
| `default` | All dialog content (title, body, footer, etc.) |

### Example

```html
<script setup>
const open = ref(false)
</script>

<template>
  <MayaBtn @click="open = true">Open Dialog</MayaBtn>

  <MayaDialog v-model="open">
    <h2 style="margin: 0 0 8px; font-size: 1.125rem; font-weight: 600;">Confirm Action</h2>
    <p style="color: var(--maya-text-secondary); margin-bottom: 24px;">
      Are you sure you want to proceed?
    </p>
    <div style="display: flex; justify-content: flex-end; gap: 8px;">
      <MayaBtn variant="secondary" @click="open = false">Cancel</MayaBtn>
      <MayaBtn intent="danger" @click="confirm">Delete</MayaBtn>
    </div>
  </MayaDialog>
</template>
```

---

## `<MayaAlertDialog>`

A pre-structured confirmation dialog with title, description, and built-in Cancel/Action button slots. Prefer this over `<MayaDialog>` for destructive or irreversible confirmations.

### Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `open` | `boolean` | `false` | Use `v-model:open` |
| `title` | `string` | `''` | Dialog heading |
| `description` | `string` | `''` | Supporting description |
| `preventCloseOut` | `boolean` | `false` | Prevent dismiss on backdrop click / Escape |

### Events
| Event | Description |
|---|---|
| `@update:open` | Emits `false` when dismissed |
| `@action` | Emits when the primary action button (default slot `action`) is clicked |

### Slots
| Slot | Description |
|---|---|
| `title` | Overrides the `title` prop |
| `description` | Overrides the `description` prop |
| `default` | Extra body content between description and footer |
| `cancel` | Overrides the Cancel button |
| `action` | Overrides the Action button |

### Example

```html
<MayaAlertDialog
  v-model:open="showConfirm"
  title="Delete this file?"
  description="This action is permanent and cannot be undone."
>
  <template #action>
    <MayaBtn intent="danger" @click="deleteFile(); showConfirm = false">
      Yes, delete
    </MayaBtn>
  </template>
</MayaAlertDialog>
```

---

## `<MayaModal>`

A standard, styled modal similar to Dialog but using a slightly different API/structure out of the box (with a close button, header, and footer).

### Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `modelValue` \| `open` | `boolean` | `false` | Open state. Use `v-model` or `v-model:open`. |
| `title` | `string` | `''` | Modal heading |
| `description` | `string` | `''` | Supporting description |
| `maxWidth` | `string` | `'480px'` | Maximum width |
| `closeOnClickOutside` | `boolean` | `true` | Close when clicking the backdrop |
| `hideCloseButton` | `boolean` | `false` | Hide the × button |

### Slots
`header`, `default` (body content), `footer`.

### Example

```html
<MayaModal v-model="isOpen" title="Settings" description="Update your preferences here.">
  <div style="padding: 16px 0;">
    <MayaInput label="Username" />
  </div>
  <template #footer>
    <MayaBtn @click="isOpen = false">Done</MayaBtn>
  </template>
</MayaModal>
```

---

## `<MayaSheet>`

A drawer that slides in from any screen edge. Shares the same teleport + scroll-lock mechanics as Dialog.

### Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `open` | `boolean` | `false` | Use `v-model:open` |
| `side` | `string` | `'right'` | `'left'` `'right'` `'top'` `'bottom'` |
| `hideClose` | `boolean` | `false` | Hide the × button |

### Events
`@update:open`

### Slots
`default` — sheet body content

### Example

```html
<MayaBtn @click="open = true">Open Sidebar</MayaBtn>

<MayaSheet v-model:open="open" side="right">
  <div style="padding: 24px;">
    <h2>Edit Profile</h2>
    <MayaFormGroup label="Name">
      <MayaInput v-model="name" />
    </MayaFormGroup>
    <MayaBtn @click="save">Save changes</MayaBtn>
  </div>
</MayaSheet>
```

---

## `<MayaPopover>`

A click-triggered floating panel. Closes on outside click or Escape. Positions itself relative to the trigger element.

### Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `align` | `string` | `'bottom-start'` | `'bottom-start'` `'bottom-center'` `'bottom-end'` `'top-start'` `'top-center'` `'top-end'` |
| `ariaLabel` | `string` | `'Popover'` | Accessibility label |

### Slots
| Slot | Description |
|---|---|
| `trigger` | The element that toggles the popover |
| `default` | The popover content |

### Example

```html
<MayaPopover align="bottom-start">
  <template #trigger>
    <MayaBtn variant="secondary">Share</MayaBtn>
  </template>

  <div style="display: flex; flex-direction: column; gap: 8px; min-width: 240px;">
    <p style="font-weight: 600; font-size: 0.875rem;">Share this page</p>
    <MayaInputGroup>
      <MayaInput model-value="https://example.com" readonly />
      <template #suffix><MayaBtn size="sm">Copy</MayaBtn></template>
    </MayaInputGroup>
  </div>
</MayaPopover>
```

---

## `<MayaHoverCard>`

Like `<MayaPopover>` but triggered by hover/focus instead of click. Ideal for preview cards, user profiles, tooltips with rich content.

### Props

Same `align` and `ariaLabel` props as `<MayaPopover>`, plus:

| Prop | Type | Default | Description |
|---|---|---|---|
| `openDelay` | `number` | `200` | ms delay before opening |
| `closeDelay` | `number` | `150` | ms delay before closing |

### Slots
Same as `<MayaPopover>`: `trigger` and `default`.

### Example

```html
<MayaHoverCard align="bottom-center">
  <template #trigger>
    <button style="font-weight: 600; text-decoration: underline; cursor: pointer;">@maya_design</button>
  </template>

  <div style="display: flex; gap: 10px; align-items: center;">
    <MayaAvatar src="/team.jpg" alt="Maya" />
    <div>
      <p style="font-weight: 600;">Maya Design Team</p>
      <p style="color: var(--maya-text-secondary); font-size: 0.8125rem;">Design system maintainers</p>
    </div>
  </div>
</MayaHoverCard>
```

---

## `<MayaTooltip>`

Lightweight hover tooltip for short single-line text. For richer hover content, use `<MayaHoverCard>`.

### Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `align` | `string` | `'up-center'` | `'up-left'` `'up-center'` `'up-right'` `'down-left'` `'down-center'` `'down-right'` |
| `openDelay` | `number` | `200` | ms delay before opening |
| `closeDelay` | `number` | `100` | ms delay before closing |

### Slots
| Slot | Description |
|---|---|
| `trigger` | The element to attach the tooltip to |
| `default` | Tooltip text content |

### Example

```html
<MayaTooltip align="up-center">
  <template #trigger>
    <MayaBtn size="icon" variant="ghost"><TrashIcon :size="14" /></MayaBtn>
  </template>
  Delete item
</MayaTooltip>
```

---

## Toast Notifications (`useToast()`)

Toasts are imperative — triggered via the `useToast()` composable, not via component props.

**Setup (once in `app.vue`):**
```html
<MayaToaster />
```

**Usage:**
```ts
const { toast, dismiss } = useToast()

// Basic
toast({ title: 'Profile updated', intent: 'success' })

// Full options
toast({
  title: 'Update Available',
  description: 'A new version is ready to install.',
  intent: 'info',
  icon: SparklesIcon,        // Lucide icon component
  duration: 10000,           // ms; use Infinity to persist
  action: {
    label: 'Install now',
    onClick: () => installUpdate()
  }
})

// Dismiss manually
const id = toast({ title: 'Loading...', duration: Infinity })
dismiss(id)
```

### Toast Options

| Option | Type | Default | Description |
|---|---|---|---|
| `title` | `string` | required | Main heading |
| `description` | `string` | `''` | Supporting text |
| `intent` | `string` | `'default'` | `'default'` `'success'` `'warning'` `'danger'` `'info'` |
| `icon` | `Component` | `undefined` | Lucide icon component |
| `duration` | `number` | `4000` | Auto-dismiss after ms. `Infinity` = manual only |
| `action.label` | `string` | | Label for the action button |
| `action.onClick` | `Function` | | Handler for action button |

---

## `<MayaAlert>`

Inline alert block for non-dismissible status messages. Great for page-level warnings, info notices, etc.

### Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `intent` | `string` | `'default'` | Intent system |
| `title` | `string` | `''` | Alert heading |
| `icon` | `Component` | `null` | Lucide icon component |
| `layout` | `string` | `'column'` | `'column'` (stacked) or `'row'` (inline) |

### Slots
| Slot | Description |
|---|---|
| `icon` | Custom icon content (overrides `:icon` prop) |
| `title` | Custom title content |
| `default` | Alert body / description text |
| `action` | Optional action (button) placed at the end |

### Examples

```html
<!-- Info banner -->
<MayaAlert intent="info" title="New Feature" :icon="SparklesIcon">
  Interactive demos are now available in the playground.
  <template #action>
    <MayaBtn variant="outline" size="sm">Try it</MayaBtn>
  </template>
</MayaAlert>

<!-- Compact row layout -->
<MayaAlert intent="warning" title="Disk almost full" layout="row" :icon="AlertTriangleIcon">
  You have less than 1 GB remaining.
</MayaAlert>
```

---

## `<MayaBanner>`

Full-width, dismissible announcement strip. Typically placed at the top of a page or below a nav bar.

### Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `modelValue` | `boolean` | `true` | Visibility. Use `v-model`. |
| `intent` | `string` | `'default'` | Intent system |
| `icon` | `Component` | `null` | Lucide icon component |
| `dismissible` | `boolean` | `true` | Whether to show the × button |

### Events
`@update:modelValue`, `@close`

### Slots
| Slot | Description |
|---|---|
| `default` | Banner message content |
| `icon` | Custom icon |
| `actions` | Action buttons on the right side |

### Example

```html
<script setup>
const show = ref(true)
</script>

<template>
  <MayaBanner v-model="show" intent="success" :icon="SparklesIcon">
    <b>Version 2.0 is live!</b> See what's new in the changelog.
    <template #actions>
      <MayaBtn variant="outline" size="sm">View changelog</MayaBtn>
    </template>
  </MayaBanner>
</template>
```
