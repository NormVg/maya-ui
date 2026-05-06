# Maya UI — Buttons & Actions

---

## `<MayaBtn>`

The primary interactive action element. Supports four visual variants, three sizes, five semantic intents, and a disabled state.

### Props

| Prop | Type | Default | Values |
|---|---|---|---|
| `variant` | `string` | `'primary'` | `'primary'` `'secondary'` `'ghost'` `'outline'` |
| `size` | `string` | `'md'` | `'sm'` `'md'` `'lg'` `'icon'` |
| `intent` | `string` | `'default'` | `'default'` `'success'` `'warning'` `'danger'` `'info'` |
| `disabled` | `boolean` | `false` | |

### Events
| Event | Payload | Description |
|---|---|---|
| `@click` | `MouseEvent` | Fired when button is clicked |

### Slots
| Slot | Description |
|---|---|
| `default` | Button label content (text, icons, or both) |

### Examples

```html
<!-- Basic -->
<MayaBtn>Save changes</MayaBtn>

<!-- Variants -->
<MayaBtn variant="secondary">Cancel</MayaBtn>
<MayaBtn variant="ghost">Settings</MayaBtn>
<MayaBtn variant="outline">Learn more</MayaBtn>

<!-- Sizes -->
<MayaBtn size="sm">Small</MayaBtn>
<MayaBtn size="lg">Large</MayaBtn>
<MayaBtn size="icon"><TrashIcon :size="16" /></MayaBtn>

<!-- Intent (semantic color) -->
<MayaBtn intent="danger">Delete</MayaBtn>
<MayaBtn variant="secondary" intent="success">Approve</MayaBtn>
<MayaBtn variant="ghost" intent="warning">Warn</MayaBtn>

<!-- Disabled -->
<MayaBtn :disabled="isLoading">
  <MayaLoadingDots size="sm" /> Saving...
</MayaBtn>

<!-- With icon -->
<MayaBtn>
  <PlusIcon :size="14" /> Add item
</MayaBtn>
```

---

## `<MayaBtnGroup>`

Groups multiple `<MayaBtn>` elements into a visually joined row. The buttons share borders and radii to appear as a single unit.

### Slots
| Slot | Description |
|---|---|
| `default` | Place `<MayaBtn>` components inside |

### Example

```html
<MayaBtnGroup>
  <MayaBtn variant="secondary">Day</MayaBtn>
  <MayaBtn variant="secondary">Week</MayaBtn>
  <MayaBtn>Month</MayaBtn>
</MayaBtnGroup>
```

---

## `<MayaToggle>`

A pressable button that maintains an on/off state. Useful for toolbar actions, bold/italic toggles, etc.

### Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `modelValue` | `boolean` | `false` | Current pressed state. Use `v-model`. |
| `disabled` | `boolean` | `false` | |

### Events
| Event | Payload |
|---|---|
| `@update:modelValue` | `boolean` |

### Example

```html
<MayaToggle v-model="isBold">
  <BoldIcon :size="14" />
</MayaToggle>
```

---

## `<MayaToggleGroup>`

Groups multiple `<MayaToggle>` buttons. Optionally enforces single-selection (radio-like behavior).

### Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `modelValue` | `string \| string[]` | `''` | Selected value(s). Use `v-model`. |
| `multiple` | `boolean` | `false` | Allow multi-select. |

### Example

```html
<!-- Single selection -->
<MayaToggleGroup v-model="align">
  <MayaToggle value="left"><AlignLeftIcon :size="14" /></MayaToggle>
  <MayaToggle value="center"><AlignCenterIcon :size="14" /></MayaToggle>
  <MayaToggle value="right"><AlignRightIcon :size="14" /></MayaToggle>
</MayaToggleGroup>
```
