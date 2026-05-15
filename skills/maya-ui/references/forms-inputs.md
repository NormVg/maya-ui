# Maya UI — Forms & Inputs

---

## `<MayaInput>`

Styled text input with support for all native input types.

### Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `modelValue` | `string` | `''` | Bound value. Use `v-model`. |
| `placeholder` | `string` | `''` | Placeholder text |
| `type` | `string` | `'text'` | Any native input type |
| `size` | `string` | `'md'` | `'sm'` `'md'` `'lg'` |
| `disabled` | `boolean` | `false` | |
| `readonly` | `boolean` | `false` | |

### Events
`@update:modelValue`, `@input`, `@change`, `@focus`, `@blur`

### Example

```html
<MayaInput v-model="email" type="email" placeholder="you@example.com" />
<MayaInput v-model="search" placeholder="Search..." size="sm" readonly />
```

---

## `<MayaTextarea>`

Multi-line text input.

### Props

Same as `<MayaInput>` plus:

| Prop | Type | Default | Description |
|---|---|---|---|
| `rows` | `number` | `4` | Number of visible rows |
| `resize` | `string` | `'vertical'` | `'none'` `'vertical'` `'horizontal'` `'both'` |

### Example

```html
<MayaTextarea v-model="bio" placeholder="Tell us about yourself..." :rows="5" />
```

---

## `<MayaSelect>`

Custom-styled dropdown select. Accepts plain strings or `{ value, label, disabled? }` objects.

### Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `modelValue` | `string \| number` | `''` | Use `v-model` |
| `options` | `Array` | `[]` | Strings, numbers, or `{ value, label, disabled? }` objects |
| `placeholder` | `string` | `'Select an option'` | |
| `disabled` | `boolean` | `false` | |

### Events
`@update:modelValue`, `@change`

### Example

```html
<!-- Plain strings -->
<MayaSelect v-model="status" :options="['Active', 'Inactive', 'Pending']" />

<!-- With objects -->
<MayaSelect v-model="role" :options="[
  { value: 'admin', label: 'Administrator' },
  { value: 'user', label: 'Standard User' },
  { value: 'guest', label: 'Guest', disabled: true }
]" placeholder="Select role" />
```

---

## `<MayaMultiSelect>`

Like `<MayaSelect>` but `v-model` is an array. Allows multiple selections with tags.

### Props

Same as `<MayaSelect>`, but `modelValue` is `Array`.

---

## `<MayaCombobox>`

Searchable select with real-time filtering.

### Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `modelValue` | `string \| number` | `''` | Use `v-model` |
| `options` | `Array` | `[]` | Same format as Select |
| `placeholder` | `string` | `'Search...'` | |
| `disabled` | `boolean` | `false` | |

---

## `<MayaNativeSelect>`

Wraps a native `<select>` with Maya styling. Useful for mobile or accessibility-sensitive contexts.

### Props

Same API as `<MayaSelect>`.

---

## `<MayaCheckbox>`

Animated checkbox with optional label.

### Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `modelValue` | `boolean` | `false` | Use `v-model` |
| `label` | `string` | `''` | Inline label text |
| `disabled` | `boolean` | `false` | |
| `indeterminate` | `boolean` | `false` | Shows dash instead of checkmark |

### Events
`@update:modelValue`, `@change`

### Example

```html
<MayaCheckbox v-model="agreed" label="I agree to the terms" />
<MayaCheckbox v-model="allSelected" :indeterminate="someSelected" label="Select all" />
```

---

## `<MayaCheckboxGroup>`

Wraps multiple `<MayaCheckbox>` with shared v-model (array of values).

---

## `<MayaRadio>` + `<MayaRadioGroup>`

Radio button with optional label. Use inside `<MayaRadioGroup>` for group behavior.

### Props (`<MayaRadio>`)

| Prop | Type | Default | Description |
|---|---|---|---|
| `value` | `any` | — | The value this radio represents |
| `label` | `string` | `''` | |
| `disabled` | `boolean` | `false` | |

### Props (`<MayaRadioGroup>`)

| Prop | Type | Default | Description |
|---|---|---|---|
| `modelValue` | `any` | `null` | Use `v-model` |
| `orientation` | `string` | `'vertical'` | `'vertical'` `'horizontal'` |

### Example

```html
<MayaRadioGroup v-model="plan" orientation="vertical">
  <MayaRadio value="free" label="Free" />
  <MayaRadio value="pro" label="Pro" />
  <MayaRadio value="enterprise" label="Enterprise" />
</MayaRadioGroup>
```

---

## `<MayaSwitch>`

Toggle switch for binary settings.

### Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `modelValue` | `boolean` | `false` | Use `v-model` |
| `label` | `string` | `''` | |
| `disabled` | `boolean` | `false` | |

### Example

```html
<MayaSwitch v-model="notifications" label="Email notifications" />
```

---

## `<MayaNumberField>`

Numeric stepper with increment/decrement buttons.

### Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `modelValue` | `number` | `0` | Use `v-model` |
| `min` | `number` | `undefined` | Minimum allowed value |
| `max` | `number` | `undefined` | Maximum allowed value |
| `step` | `number` | `1` | Increment step |
| `disabled` | `boolean` | `false` | |

---

## `<MayaInputOTP>`

One-time password / PIN input with individual digit boxes.

### Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `modelValue` | `string` | `''` | Use `v-model` |
| `length` | `number` | `6` | Number of digit slots |

### Example

```html
<MayaInputOTP v-model="otp" :length="6" />
```

---

## `<MayaInputGroup>`

Attaches a prefix or suffix addon to an input (e.g. `$`, `@username`, a button).

### Slots

| Slot | Description |
|---|---|
| `prefix` | Content placed before the input |
| `default` | The input itself (use `<MayaInput>` here) |
| `suffix` | Content placed after the input |

### Example

```html
<MayaInputGroup>
  <template #prefix>$</template>
  <MayaInput v-model="amount" type="number" />
  <template #suffix>USD</template>
</MayaInputGroup>
```

---

---

## `<MayaChoiceBox>`

An advanced, styled selection tile that can act as a radio or checkbox depending on the `type` prop. Useful for premium pricing tiers, settings options, or visual lists.

### Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `modelValue` | `any` | `false` | Use `v-model` |
| `value` | `any` | `true` | The underlying value of this choice |
| `type` | `string` | `'checkbox'` | `'checkbox'` (multiple) or `'radio'` (single) |
| `name` | `string` | `undefined` | Native input name |
| `title` | `string` | `''` | Title text (also available as `#title` slot) |
| `description` | `string` | `''` | Description text (also available as `#description` slot) |
| `disabled` | `boolean` | `false` | |

### Example

```html
<!-- Radio Mode -->
<div style="display: flex; flex-direction: column; gap: 12px;">
  <MayaChoiceBox v-model="plan" value="basic" type="radio" title="Basic Plan" description="$9/month" />
  <MayaChoiceBox v-model="plan" value="pro" type="radio" title="Pro Plan" description="$29/month" />
</div>

<!-- Checkbox Mode -->
<MayaChoiceBox v-model="addons" value="support" type="checkbox">
  <template #title>Premium Support</template>
  <template #description>24/7 priority support channel</template>
</MayaChoiceBox>
```

---

## `<MayaForm>`

A wrapper for forms that manages spacing between children.

### Events
`@submit`

### Example
```html
<MayaForm @submit="onSubmit">
  <MayaField label="Name">...</MayaField>
  <MayaBtn type="submit">Save</MayaBtn>
</MayaForm>
```

---

## `<MayaFieldset>`

Accessible fieldset container for grouping related form controls with a shared legend and description.

### Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `legend` | `string` | `''` | Legend title (also available as `#legend` slot) |
| `description` | `string` | `''` | Description text (also available as `#description` slot) |
| `disabled` | `boolean` | `false` | Disables all inputs within |

### Example

```html
<MayaFieldset legend="Notifications" description="Choose how you want to be notified.">
  <MayaCheckbox v-model="email" label="Email" />
  <MayaCheckbox v-model="sms" label="SMS" />
</MayaFieldset>
```

---

## `<MayaField>` & `<MayaFormGroup>`

Wraps an input control with a label, hint text, and optional error message. Automatically connects the `<MayaLabel>` semantically. Both components share identical APIs.

### Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `label` | `string` | `''` | Label text |
| `description` | `string` | `''` | Helper/hint text below label (called `hint` on FormGroup) |
| `error` | `string` | `''` | Error message (highlights red) |
| `required` | `boolean` | `false` | Shows asterisk on label |

### Example

```html
<MayaField label="Password" description="At least 8 characters" :required="true" :error="errors.password">
  <MayaInput v-model="password" type="password" />
</MayaField>
```

---

## `<MayaLabel>`

Accessible `<label>` with optional required marker and hint text.

### Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `for` | `string` | `''` | ID of the associated input |
| `required` | `boolean` | `false` | Shows red asterisk |
| `hint` | `string` | `''` | Inline helper text |
| `disabled` | `boolean` | `false` | Dims the label visually |

---

## `<MayaFileUpload>`

Drag-and-drop file picker with click-to-browse fallback.

### Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `accept` | `string` | `'*'` | Accepted file types (e.g. `'.pdf,.doc'`) |
| `multiple` | `boolean` | `false` | Allow multiple file selection |
| `disabled` | `boolean` | `false` | |

### Events
`@change` — emits `File[]`

---

## `<MayaColorPicker>`

Full HSL color picker with hex input, hue slider, and saturation/lightness canvas.

### Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `modelValue` | `string` | `'#000000'` | Hex color string. Use `v-model`. |

---

## `<MayaColorPanels>`

A grid of selectable color swatches. Perfect for themes, labels, or product color options.

### Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `modelValue` | `string` | `''` | Selected color hex. Use `v-model`. |
| `colors` | `Array` | `[...]` | Array of `{ value, label? }` color objects |
| `cols` | `string \| number` | `'auto'` | Grid column count (`2`, `3`, `4`, `6`, `8`, or `'auto'`) |
| `showLabel` | `boolean` | `false` | Display color label beneath the swatch |

### Example

```html
<MayaColorPanels v-model="themeColor" :cols="4" :showLabel="true" />
```

---

## `<MayaCalendar>` / `<MayaDateChooser>`

Date picker components. `MayaCalendar` is a visual month grid; `MayaDateChooser` is a full date picker with input trigger.

### Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `modelValue` | `Date \| null` | `null` | Use `v-model` |
| `min` | `Date` | `undefined` | Minimum selectable date |
| `max` | `Date` | `undefined` | Maximum selectable date |

---

## Full Form Pattern

```html
<form @submit.prevent="submit">
  <MayaFormGroup label="Name" :required="true">
    <MayaInput v-model="form.name" placeholder="Full name" />
  </MayaFormGroup>

  <MayaFormGroup label="Role">
    <MayaSelect v-model="form.role" :options="roles" placeholder="Choose role" />
  </MayaFormGroup>

  <MayaFormGroup label="Bio">
    <MayaTextarea v-model="form.bio" :rows="4" placeholder="Tell us about yourself" />
  </MayaFormGroup>

  <MayaCheckbox v-model="form.agreed" label="I agree to the terms" />

  <MayaBtn type="submit" :disabled="!form.agreed">Submit</MayaBtn>
</form>
```
