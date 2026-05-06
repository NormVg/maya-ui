# Maya UI — Composables

---

## `useToast()`

The primary way to trigger toast notifications. Must have `<MayaToaster />` rendered in `app.vue`.

### Setup

```html
<!-- app.vue -->
<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
  <MayaToaster />
</template>
```

### API

```ts
const { toast, dismiss, toasts } = useToast()
```

| Return | Type | Description |
|---|---|---|
| `toast(options)` | `Function → string` | Creates a toast. Returns the toast `id`. |
| `dismiss(id)` | `Function` | Programmatically dismisses a toast by ID |
| `toasts` | `Ref<Toast[]>` | Reactive array of all active toasts |

### `toast(options)` Options

| Option | Type | Default | Description |
|---|---|---|---|
| `title` | `string` | required | Main heading of the toast |
| `description` | `string` | `''` | Supporting subtext |
| `intent` | `string` | `'default'` | `'default'` `'success'` `'warning'` `'danger'` `'info'` |
| `icon` | `Component` | `undefined` | Lucide icon component (e.g. `CheckCircleIcon`) |
| `duration` | `number` | `4000` | Auto-dismiss delay in ms. Pass `Infinity` to persist. |
| `action.label` | `string` | | Action button label |
| `action.onClick` | `() => void` | | Action button handler |

### Examples

```ts
import { CheckCircleIcon, AlertTriangleIcon, XCircleIcon, InfoIcon } from 'lucide-vue-next'

const { toast, dismiss } = useToast()

// Simple
toast({ title: 'Saved successfully' })

// Semantic intents
toast({ title: 'Changes saved', intent: 'success', icon: CheckCircleIcon })
toast({ title: 'Low disk space', description: 'Less than 1 GB remaining.', intent: 'warning', icon: AlertTriangleIcon })
toast({ title: 'Upload failed', description: 'Network error. Please try again.', intent: 'danger', icon: XCircleIcon })
toast({ title: 'New message', description: 'Alice replied to your thread.', intent: 'info', icon: InfoIcon })

// With action button
toast({
  title: 'File deleted',
  description: 'report_q4.pdf has been moved to Trash.',
  intent: 'default',
  action: {
    label: 'Undo',
    onClick: () => restoreFile()
  }
})

// Persistent + manual dismiss
const id = toast({ title: 'Uploading...', duration: Infinity })
await uploadFile()
dismiss(id)
toast({ title: 'Upload complete!', intent: 'success' })
```

---

## `useMayaSound()`

Mathematically generated UI sound effects — zero audio file dependencies. Built on the Web Audio API.

### API

```ts
const { play } = useMayaSound()
```

| Return | Type | Description |
|---|---|---|
| `play(type, theme?)` | `Function` | Plays a sound effect |

### `play(type, theme?)` Parameters

| Parameter | Type | Description |
|---|---|---|
| `type` | `SoundType` | The semantic sound to play (see below) |
| `theme` | `FeelType` (optional) | Sound character/feel preset (see below) |

### Sound Types (`SoundType`)

| Value | When to use |
|---|---|
| `'click'` | Button clicks, selections |
| `'pop'` | Dropdown open, item appear |
| `'toggle'` | Switch/checkbox toggle |
| `'tick'` | Stepper increment, checkbox check |
| `'drop'` | Drag-and-drop release, file upload |
| `'success'` | Confirmation, save success |
| `'warning'` | Alert, validation error |
| `'error'` | Failure, critical error |
| `'startup'` | App loaded, session start |

### Feel Presets (`FeelType`)

| Value | Character |
|---|---|
| `'aero'` | Default — clean, modern |
| `'soft'` | Gentle, muted |
| `'arcade'` | Retro game-like |
| `'organic'` | Natural, woody |
| `'glass'` | Crystalline, delicate |
| `'industrial'` | Mechanical, heavy |
| `'minimal'` | Subtle, barely-there |
| `'retro'` | 8-bit inspired |
| `'crisp'` | Sharp, tight |

### Examples

```ts
const { play } = useMayaSound()

// Basic usage
play('click')
play('success')

// With a theme feel
play('pop', 'glass')
play('error', 'arcade')

// Attach to interactions
function handleSave() {
  play('success', 'soft')
  saveData()
}

function handleDelete() {
  play('warning')
  deleteItem()
}
```

### With `<MayaSelect>` for live previewing

```html
<script setup>
const { play } = useMayaSound()
const currentTheme = ref('aero')

const themeOptions = [
  { value: 'aero', label: 'Aero' },
  { value: 'glass', label: 'Glass' },
  { value: 'arcade', label: 'Arcade' },
  { value: 'soft', label: 'Soft' },
]
</script>

<template>
  <MayaSelect v-model="currentTheme" :options="themeOptions" />
  <MayaBtn @click="play('click', currentTheme)">Test sound</MayaBtn>
</template>
```
