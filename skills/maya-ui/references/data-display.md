# Maya UI — Data Display

---

## `<MayaTable>`

Semantic HTML table with Maya styling applied. Use for simple structured data.

### Slots
`default` — use standard `<thead>`, `<tbody>`, `<tr>`, `<th>`, `<td>` inside.

### Example

```html
<MayaTable>
  <thead>
    <tr>
      <th>Name</th>
      <th>Status</th>
      <th>Date</th>
    </tr>
  </thead>
  <tbody>
    <tr v-for="row in rows" :key="row.id">
      <td>{{ row.name }}</td>
      <td><MayaBadge :intent="row.statusIntent">{{ row.status }}</MayaBadge></td>
      <td>{{ row.date }}</td>
    </tr>
  </tbody>
</MayaTable>
```

---

## `<MayaDataTable>`

Feature-rich data table with built-in sorting, column configuration, and optional row actions.

### Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `data` | `Array` | `[]` | Array of row objects |
| `columns` | `Array<Column>` | `[]` | Column definitions |
| `loading` | `boolean` | `false` | Shows skeleton rows while loading |
| `emptyMessage` | `string` | `'No results'` | Message shown when data is empty |

**Column definition:**
```ts
{
  key: string       // Maps to row object key
  label: string     // Column header text
  sortable?: boolean
  width?: string    // e.g. '120px'
}
```

### Events
`@sort` — emits `{ key, direction: 'asc' | 'desc' }`

### Example

```html
<MayaDataTable
  :data="users"
  :columns="[
    { key: 'name', label: 'Name', sortable: true },
    { key: 'email', label: 'Email' },
    { key: 'role', label: 'Role', sortable: true },
    { key: 'status', label: 'Status' },
  ]"
  :loading="isLoading"
  @sort="handleSort"
/>
```

---

## `<MayaBadge>`

A compact inline label for statuses, tags, and categories.

### Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `intent` | `string` | `'default'` | Intent system for color |
| `size` | `string` | `'md'` | `'sm'` `'md'` |
| `variant` | `string` | `'solid'` | `'solid'` `'muted'` `'outline'` |

### Slots
`default` — badge text

### Example

```html
<MayaBadge intent="success">Active</MayaBadge>
<MayaBadge intent="warning" variant="muted">Pending</MayaBadge>
<MayaBadge intent="danger" variant="outline">Blocked</MayaBadge>
<MayaBadge>Default</MayaBadge>
```

---

## `<MayaAvatar>` / `<MayaAvatarGroup>`

User/entity avatar with image and fallback initials.

### `<MayaAvatar>` Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `src` | `string` | `''` | Image URL |
| `alt` | `string` | `''` | Alt text (used as initials fallback) |
| `size` | `string` | `'md'` | `'xs'` `'sm'` `'md'` `'lg'` `'xl'` |
| `shape` | `string` | `'circle'` | `'circle'` `'square'` |

### `<MayaAvatarGroup>` Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `max` | `number` | `5` | Maximum avatars shown before overflow counter |
| `size` | `string` | `'md'` | Applied to all child avatars |

### Example

```html
<!-- Single avatar -->
<MayaAvatar src="/user.jpg" alt="Jane Doe" size="lg" />

<!-- Initials fallback (no src) -->
<MayaAvatar alt="John Smith" size="md" />

<!-- Group with overflow -->
<MayaAvatarGroup :max="3">
  <MayaAvatar src="/a.jpg" alt="Alice" />
  <MayaAvatar src="/b.jpg" alt="Bob" />
  <MayaAvatar src="/c.jpg" alt="Charlie" />
  <MayaAvatar src="/d.jpg" alt="Diana" />
  <MayaAvatar src="/e.jpg" alt="Eve" />
</MayaAvatarGroup>
<!-- Shows 3 avatars + "+2" counter -->
```

---

## `<MayaCarousel>` / `<MayaCarouselItem>`

Horizontal scroll carousel with smooth snapping.

### `<MayaCarousel>` Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `gap` | `string` | `'16px'` | Gap between items |
| `showArrows` | `boolean` | `true` | Show prev/next navigation arrows |

### Example

```html
<MayaCarousel>
  <MayaCarouselItem v-for="card in cards" :key="card.id">
    <MayaCard style="width: 280px; padding: 20px;">
      <h3>{{ card.title }}</h3>
      <p>{{ card.description }}</p>
    </MayaCard>
  </MayaCarouselItem>
</MayaCarousel>
```

---

## `<MayaCodeBlock>` / `<MayaInlineCode>`

Syntax-highlighted code display powered by Shiki.

### `<MayaCodeBlock>` Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `code` | `string` | required | Code string to display |
| `lang` | `string` | `'typescript'` | Language identifier for syntax highlighting |
| `filename` | `string` | `''` | Optional filename shown in header |
| `showCopy` | `boolean` | `true` | Copy to clipboard button |

### `<MayaInlineCode>` Props
`default` slot — inline code text.

### Example

```html
<MayaCodeBlock lang="vue" filename="App.vue" :code="myCode" />

<p>Use the <MayaInlineCode>v-model</MayaInlineCode> directive to bind values.</p>
```

---

## `<MayaProse>`

Renders rich text / markdown HTML with Maya typography styles applied.

### Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `content` | `string` | `''` | HTML string to render |

---

## `<MayaEmptyState>`

Zero-state placeholder for empty lists, search results with no matches, etc.

### Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `icon` | `Component` | `null` | Lucide icon |
| `title` | `string` | `''` | Primary message |
| `description` | `string` | `''` | Supporting text |

### Slots
`action` — call-to-action button below the description

### Example

```html
<MayaEmptyState
  :icon="InboxIcon"
  title="No messages yet"
  description="When someone sends you a message, it'll appear here."
>
  <template #action>
    <MayaBtn>Compose message</MayaBtn>
  </template>
</MayaEmptyState>
```

---

## `<MayaChatBubble>`

Styled chat message bubble with sender/receiver variants.

### Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `variant` | `string` | `'received'` | `'sent'` `'received'` |
| `author` | `string` | `''` | Author name |
| `timestamp` | `string` | `''` | Time string |

### Slots
`default` — message content

### Example

```html
<MayaChatBubble variant="received" author="Alice" timestamp="2:30 PM">
  Hey, did you review the PR?
</MayaChatBubble>
<MayaChatBubble variant="sent" timestamp="2:31 PM">
  Yes! Left some comments.
</MayaChatBubble>
```

---

## `<MayaShowMore>`

Truncates long content behind a "Show more" toggle.

### Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `maxHeight` | `string` | `'120px'` | Height when collapsed |
| `labelShow` | `string` | `'Show more'` | Toggle button label (collapsed) |
| `labelHide` | `string` | `'Show less'` | Toggle button label (expanded) |
