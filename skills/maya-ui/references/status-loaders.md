# Maya UI — Status & Loaders

---

## `<MayaSpinner>`

Circular indeterminate loading indicator.

### Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `size` | `string` | `'md'` | `'sm'` `'md'` `'lg'` |
| `intent` | `string` | `'default'` | Intent system for color |

### Example

```html
<MayaSpinner size="md" />
<MayaSpinner size="lg" intent="info" />

<!-- Inside a button -->
<MayaBtn :disabled="loading">
  <MayaSpinner v-if="loading" size="sm" />
  {{ loading ? 'Saving...' : 'Save' }}
</MayaBtn>
```

---

## `<MayaSkeleton>`

Animated placeholder shown while content is loading.

### Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `width` | `string` | `'100%'` | CSS width |
| `height` | `string` | `'16px'` | CSS height |
| `rounded` | `string` | `'md'` | `'none'` `'sm'` `'md'` `'lg'` `'full'` |

### Example

```html
<!-- Text lines -->
<div style="display: flex; flex-direction: column; gap: 8px;">
  <MayaSkeleton width="60%" height="20px" />
  <MayaSkeleton width="100%" height="14px" />
  <MayaSkeleton width="80%" height="14px" />
</div>

<!-- Avatar placeholder -->
<MayaSkeleton width="40px" height="40px" rounded="full" />

<!-- Card placeholder -->
<MayaCard style="padding: 20px; display: flex; flex-direction: column; gap: 12px;">
  <MayaSkeleton height="160px" rounded="lg" />
  <MayaSkeleton width="70%" height="18px" />
  <MayaSkeleton width="90%" height="14px" />
</MayaCard>
```

---

## `<MayaLoadingDots>`

Three animated bouncing dots. Use for inline loading states (e.g. "Thinking...", "Typing...").

### Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `size` | `string` | `'md'` | `'sm'` `'md'` `'lg'` |

### Example

```html
<p>AI is thinking <MayaLoadingDots size="sm" /></p>
```

---

## `<MayaPixelLoader>`

Animated 4×4 pixel grid with multiple animation styles. Decorative loader for splash screens or empty states.

### Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `variant` | `string` | `'pulse'` | `'pulse'` `'wave'` `'glitch'` `'snake'` |
| `size` | `string` | `'md'` | `'sm'` `'md'` `'lg'` |

### Example

```html
<MayaPixelLoader variant="wave" />
<MayaPixelLoader variant="snake" size="lg" />
```

---

## `<MayaDotOrbit>`

3D orbiting dots animation. Decorative loader conveying processing activity.

No props. Just drop it in:

```html
<MayaDotOrbit />
```

---

## `<MayaStatusDot>`

A small colored indicator dot. Used to communicate live status (online, offline, error, etc.).

### Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `intent` | `string` | `'default'` | Intent system |
| `ping` | `boolean` | `false` | Animated pulsing ring (for "live" states) |
| `size` | `string` | `'md'` | `'sm'` `'md'` `'lg'` |

### Example

```html
<!-- Server status -->
<div style="display: flex; align-items: center; gap: 8px;">
  <MayaStatusDot intent="success" :ping="true" />
  <span>Production — Online</span>
</div>

<div style="display: flex; align-items: center; gap: 8px;">
  <MayaStatusDot intent="danger" />
  <span>Staging — Offline</span>
</div>
```

---

## `<MayaProgress>`

A horizontal progress bar.

### Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `value` | `number` | `0` | Current value (0–100) |
| `max` | `number` | `100` | Maximum value |
| `intent` | `string` | `'default'` | Intent system |
| `indeterminate` | `boolean` | `false` | Animated scanning bar (unknown progress) |
| `showLabel` | `boolean` | `false` | Shows percentage text |
| `size` | `string` | `'md'` | `'sm'` `'md'` `'lg'` |

### Example

```html
<!-- Determinate -->
<MayaProgress :value="uploadProgress" intent="info" showLabel />

<!-- Indeterminate -->
<MayaProgress indeterminate intent="default" />

<!-- Task checklist -->
<div v-for="task in tasks" :key="task.id">
  <div style="display: flex; justify-content: space-between; font-size: 0.8125rem; margin-bottom: 4px;">
    <span>{{ task.label }}</span>
    <span>{{ task.progress }}%</span>
  </div>
  <MayaProgress :value="task.progress" :intent="task.intent" size="sm" />
</div>
```

---

## `<MayaMeter>`

Semantic value meter that automatically changes color based on configurable thresholds. Unlike `<MayaProgress>`, `<MayaMeter>` represents a measured quantity within a known range (e.g. disk usage, CPU load, a rating).

### Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `value` | `number` | `0` | Current measured value |
| `min` | `number` | `0` | Minimum of the range |
| `max` | `number` | `100` | Maximum of the range |
| `optimum` | `number` | `100` | Ideal/optimal point |
| `lowThreshold` | `number` | `25` | Below this = low zone |
| `highThreshold` | `number` | `75` | Above this = high zone |
| `label` | `string` | `''` | Label shown above the bar |
| `showLabel` | `boolean` | `false` | Whether to display the label |

The color system automatically applies:
- **Green** (success) when in the optimal zone
- **Orange** (warning) in the low/high zone
- **Red** (danger) when beyond the threshold

### Example

```html
<!-- CPU load — high is bad -->
<MayaMeter label="CPU Load" :value="85" :optimum="0" :lowThreshold="50" :highThreshold="80" showLabel />

<!-- Battery — high is good -->
<MayaMeter label="Battery" :value="72" :optimum="100" :lowThreshold="20" :highThreshold="50" showLabel />

<!-- Disk usage — low free space is bad -->
<MayaMeter label="Disk Usage" :value="94" :optimum="0" :lowThreshold="60" :highThreshold="80" showLabel />
```
