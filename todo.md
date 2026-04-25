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
- [ ] `textarea.vue`
- [ ] `number-field.vue`
- [ ] `checkbox.vue`
- [ ] `radio.vue`
- [ ] `controls.vue` (Toggle & Switch)
- [ ] `input-otp.vue`
- [ ] `choice-box.vue`
- [ ] `select.vue`
- [ ] `date-chooser.vue`
- [ ] `calendar.vue`
- [ ] `color-picker.vue`
- [ ] `field.vue`

### Navigation & Menus
- [ ] `menubar.vue`
- [ ] `navigation-menu.vue`
- [ ] `dropdown-menu.vue`
- [ ] `context-menu.vue`
- [ ] `command.vue`
- [ ] `breadcrumb.vue`
- [ ] `tabs.vue`
- [ ] `pagination.vue`

### Data Display
- [ ] `table.vue`
- [ ] `data-table.vue`
- [ ] `card.vue`
- [ ] `avatar.vue`
- [ ] `badge.vue`
- [ ] `accordion.vue`
- [ ] `panels.vue`
- [ ] `empty-state.vue`
- [ ] `visualisation.vue`
- [ ] `code.vue`

### Feedback & Overlays
- [ ] `dialog.vue`
- [ ] `alert-dialog.vue`
- [ ] `sheet.vue`
- [ ] `popover.vue`
- [ ] `hover-card.vue`
- [ ] `tooltip.vue`
- [ ] `toast.vue`
- [ ] `alert.vue`
- [ ] `banner.vue`
- [ ] `loaders.vue`
- [ ] `status-indicators.vue`

### Layout & Utilities
- [ ] `scroll-area.vue`
- [ ] `resizable.vue`
- [ ] `base-ui.vue`
- [ ] `theme-toggle.vue`
- [ ] `sound.vue`
