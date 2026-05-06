# Maya UI Component Docs Migration

This document outlines the migration plan to add the `ApiTable` component to all component showcase pages in the playground, standardizing the DX.

## How to migrate a page

1. Import the `ApiTable` component in `<script setup>`.
2. Define a `componentProps` array detailing the Props, Events, and Slots.
3. Add the `<ApiTable>` component to the bottom of the `<template>`.

### Code Example

**1. At the bottom of the `<template>`:**
```vue
    <!-- API Reference -->
    <ApiTable title="Maya[Component] Props API" :propsList="componentProps" />
  </div>
</template>
```

**2. Inside `<script setup>`:**
```vue
<script setup>
import ApiTable from '~/components/ApiTable.vue'

const componentProps = [
  {
    name: 'variant',
    type: 'String',
    default: '"primary"',
    description: 'The visual style variant.'
  },
  {
    name: 'disabled',
    type: 'Boolean',
    default: 'false',
    description: 'Whether the component is disabled.'
  },
  {
    name: '@click',
    type: 'Event',
    default: '',
    description: 'Emitted when the component is clicked.'
  }
]
</script>
```

---

## Migration Checklist

### Forms & Inputs
- [x] `button.vue`
- [x] `input.vue`
- [x] `textarea.vue`
- [x] `number-field.vue`
- [x] `checkbox.vue`
- [x] `radio.vue`
- [x] `controls.vue` (Toggle & Switch)
- [x] InputOTP (`input-otp.vue`)
- [x] ChoiceBox (`choice-box.vue`)
- [x] Select (`select.vue`)
- [x] DateChooser (`date-chooser.vue`)
- [x] Calendar (`calendar.vue`)
- [x] ColorPicker (`color-picker.vue`)
- [x] Field (`field.vue`)

### Navigation & Menus
- [x] Menubar (`menubar.vue`)
- [x] NavigationMenu (`navigation-menu.vue`)
- [x] DropdownMenu (`dropdown-menu.vue`)
- [x] ContextMenu (`context-menu.vue`)
- [x] Command (`command.vue`)
- [x] Breadcrumb (`breadcrumb.vue`)
- [x] Tabs (`tabs.vue`)
- [x] Pagination (`pagination.vue`)

### Data Display
- [x] `table.vue`
- [x] `data-table.vue`
- [x] `card.vue`
- [x] `avatar.vue`
- [x] `badge.vue`
- [x] `accordion.vue`
- [x] `panels.vue`
- [x] `empty-state.vue`
- [x] `visualisation.vue`
- [x] `code.vue`

### Feedback & Overlays
- [x] `dialog.vue`
- [x] `alert-dialog.vue`
- [x] `sheet.vue`
- [x] `popover.vue`
- [x] `hover-card.vue`
- [x] `tooltip.vue`
- [x] `toast.vue`
- [x] `alert.vue`
- [x] `banner.vue`
- [x] `loaders.vue`
- [x] `status-indicators.vue`

### Layout & Utilities
- [x] `scroll-area.vue`
- [x] `resizable.vue`
- [x] `base-ui.vue`
- [x] `theme-toggle.vue`
- [x] `sound.vue`
