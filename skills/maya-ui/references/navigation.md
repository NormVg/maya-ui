# Maya UI — Navigation

---

## `<MayaTabs>` / `<MayaTabsList>` / `<MayaTabsTrigger>` / `<MayaTabsContent>`

A full tab system built from composable parts. Always use all four components together.

### `<MayaTabs>` Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `modelValue` | `string` | `''` | Active tab value. Use `v-model`. |
| `orientation` | `string` | `'horizontal'` | `'horizontal'` or `'vertical'` |

### `<MayaTabsTrigger>` Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `value` | `string` | required | Unique key that matches a `<MayaTabsContent value>` |
| `disabled` | `boolean` | `false` | |

### Example

```html
<MayaTabs v-model="activeTab" orientation="horizontal">
  <MayaTabsList>
    <MayaTabsTrigger value="overview">Overview</MayaTabsTrigger>
    <MayaTabsTrigger value="analytics">Analytics</MayaTabsTrigger>
    <MayaTabsTrigger value="settings" :disabled="!isOwner">Settings</MayaTabsTrigger>
  </MayaTabsList>

  <MayaTabsContent value="overview">
    <MayaCard>Overview content here</MayaCard>
  </MayaTabsContent>
  <MayaTabsContent value="analytics">
    <MayaCard>Analytics charts here</MayaCard>
  </MayaTabsContent>
  <MayaTabsContent value="settings">
    <MayaCard>Settings form here</MayaCard>
  </MayaTabsContent>
</MayaTabs>

<!-- Vertical tabs (sidebar-style) -->
<MayaTabs v-model="tab" orientation="vertical" style="display: flex; gap: 24px;">
  <MayaTabsList>
    <MayaTabsTrigger value="profile">Profile</MayaTabsTrigger>
    <MayaTabsTrigger value="billing">Billing</MayaTabsTrigger>
  </MayaTabsList>
  <div style="flex: 1;">
    <MayaTabsContent value="profile">Profile panel</MayaTabsContent>
    <MayaTabsContent value="billing">Billing panel</MayaTabsContent>
  </div>
</MayaTabs>
```

---

## `<MayaBreadcrumb>`

Breadcrumb trail for hierarchical navigation.

### Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `items` | `Array<{ label: string, href?: string }>` | `[]` | Breadcrumb items. Last item is current page. |
| `separator` | `string` | `'/'` | Visual separator between items |

### Example

```html
<MayaBreadcrumb :items="[
  { label: 'Home', href: '/' },
  { label: 'Components', href: '/components' },
  { label: 'Dialog' }
]" />
```

---

## `<MayaDropdownMenu>` / `<MayaDropdownItem>` / `<MayaDropdownSeparator>`

A floating dropdown menu triggered by a slot element. Closes on outside click and Escape.

### `<MayaDropdownMenu>` Slots
| Slot | Description |
|---|---|
| `trigger` | The element that opens the menu |
| `default` | Menu items (`<MayaDropdownItem>` and `<MayaDropdownSeparator>`) |

### `<MayaDropdownItem>` Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `intent` | `string` | `'default'` | Intent system for color |
| `disabled` | `boolean` | `false` | |
| `icon` | `Component` | `null` | Leading icon |

### Events (`<MayaDropdownItem>`)
`@click`

### Example

```html
<MayaDropdownMenu>
  <template #trigger>
    <MayaBtn variant="outline" size="icon">
      <MoreHorizontalIcon :size="14" />
    </MayaBtn>
  </template>

  <MayaDropdownItem :icon="EditIcon">Edit</MayaDropdownItem>
  <MayaDropdownItem :icon="CopyIcon">Duplicate</MayaDropdownItem>
  <MayaDropdownSeparator />
  <MayaDropdownItem :icon="TrashIcon" intent="danger">Delete</MayaDropdownItem>
</MayaDropdownMenu>
```

---

## `<MayaContextMenu>`

Right-click context menu. Same slot/item API as `<MayaDropdownMenu>`, but triggered on `contextmenu` event on the wrapped element.

### Slots
| Slot | Description |
|---|---|
| `default` | The element to attach the context menu to |
| `menu` | Menu items (`<MayaDropdownItem>` etc.) |

### Example

```html
<MayaContextMenu>
  <div class="file-card">Right-click me</div>
  <template #menu>
    <MayaDropdownItem>Open</MayaDropdownItem>
    <MayaDropdownItem>Rename</MayaDropdownItem>
    <MayaDropdownItem intent="danger">Delete</MayaDropdownItem>
  </template>
</MayaContextMenu>
```

---

## `<MayaCommand>`

A keyboard-driven command palette (⌘K style). Typically opened via a keyboard shortcut and used for global search and navigation.

### Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `modelValue` | `boolean` | `false` | Open state. Use `v-model`. |
| `placeholder` | `string` | `'Search...'` | Input placeholder |
| `items` | `Array<{ label, value, icon?, group? }>` | `[]` | Searchable items |

### Events
| Event | Payload | Description |
|---|---|---|
| `@select` | `item` | Emitted when user selects an item |
| `@update:modelValue` | `boolean` | |

### Example

```html
<MayaKbd shortcut="meta+k" @trigger="commandOpen = true">⌘K</MayaKbd>

<MayaCommand v-model="commandOpen" placeholder="Search commands..." :items="[
  { value: 'new-file', label: 'New File', icon: FileIcon, group: 'Files' },
  { value: 'settings', label: 'Open Settings', icon: SettingsIcon, group: 'App' },
]" @select="handleCommand" />
```

---

## `<MayaMenubar>`

Horizontal application-style menu bar (File, Edit, View, etc.).

### Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `items` | `Array` | `[]` | Menu structure with nested items |

---

## `<MayaNavigationMenu>`

Top-level navigation with hover dropdowns. For use in site headers.

---

## `<MayaPagination>`

Page number navigation for data tables, lists, etc.

### Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `modelValue` | `number` | `1` | Current page. Use `v-model`. |
| `total` | `number` | required | Total number of items |
| `perPage` | `number` | `10` | Items per page |
| `siblingCount` | `number` | `1` | Pages shown on each side of current |

### Events
`@update:modelValue`

### Example

```html
<MayaPagination v-model="page" :total="totalItems" :perPage="20" />
```
