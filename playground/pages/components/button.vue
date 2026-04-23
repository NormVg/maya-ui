<template>
  <div>
    <div class="component-header">
      <h2 class="component-title">Button</h2>
      <p class="component-desc">The primary interactive element. Supports variants and semantic intent colors.</p>
    </div>

    <MayaPreviewCode title="Variants" description="primary, secondary, ghost — the shape of the interaction." lang="vue"
      :code="variantsCode">
      <template #preview>
        <div class="row">
          <MayaBtn variant="primary">Primary</MayaBtn>
          <MayaBtn variant="secondary">Secondary</MayaBtn>
          <MayaBtn variant="ghost">Ghost</MayaBtn>
        </div>
      </template>
    </MayaPreviewCode>

    <MayaPreviewCode title="Intent — Primary" description="primary variant across all semantic meanings." lang="vue"
      :code="intentPrimaryCode">
      <template #preview>
        <div class="row wrap">
          <MayaBtn variant="primary">Default</MayaBtn>
          <MayaBtn variant="primary" intent="success">Success</MayaBtn>
          <MayaBtn variant="primary" intent="warning">Warning</MayaBtn>
          <MayaBtn variant="primary" intent="danger">Danger</MayaBtn>
          <MayaBtn variant="primary" intent="info">Info</MayaBtn>
        </div>
      </template>
    </MayaPreviewCode>

    <MayaPreviewCode title="Intent — Secondary" description="secondary variant with semantic intent." lang="vue"
      :code="intentSecondaryCode">
      <template #preview>
        <div class="row wrap">
          <MayaBtn variant="secondary">Default</MayaBtn>
          <MayaBtn variant="secondary" intent="success">Success</MayaBtn>
          <MayaBtn variant="secondary" intent="warning">Warning</MayaBtn>
          <MayaBtn variant="secondary" intent="danger">Danger</MayaBtn>
          <MayaBtn variant="secondary" intent="info">Info</MayaBtn>
        </div>
      </template>
    </MayaPreviewCode>

    <MayaPreviewCode title="Intent — Ghost" description="ghost variant with semantic intent." lang="vue"
      :code="intentGhostCode">
      <template #preview>
        <div class="row wrap">
          <MayaBtn variant="ghost">Default</MayaBtn>
          <MayaBtn variant="ghost" intent="success">Success</MayaBtn>
          <MayaBtn variant="ghost" intent="warning">Warning</MayaBtn>
          <MayaBtn variant="ghost" intent="danger">Danger</MayaBtn>
          <MayaBtn variant="ghost" intent="info">Info</MayaBtn>
        </div>
      </template>
    </MayaPreviewCode>

    <MayaPreviewCode title="Sizes" description="sm, md, lg." lang="vue" :code="sizesCode">
      <template #preview>
        <div class="row align-center">
          <MayaBtn size="sm">Small</MayaBtn>
          <MayaBtn size="md">Medium</MayaBtn>
          <MayaBtn size="lg">Large</MayaBtn>
        </div>
      </template>
    </MayaPreviewCode>

    <MayaPreviewCode title="Disabled" description="Disabled state across variants." lang="vue" :code="disabledCode">
      <template #preview>
        <div class="row">
          <MayaBtn variant="primary" disabled>Primary</MayaBtn>
          <MayaBtn variant="secondary" disabled>Secondary</MayaBtn>
          <MayaBtn variant="ghost" disabled>Ghost</MayaBtn>
        </div>
      </template>
    </MayaPreviewCode>
    <MayaPreviewCode title="With Icons" description="Buttons containing an icon alongside text." lang="vue"
      :code="withIconsCode">
      <template #preview>
        <div class="row align-center">
          <MayaBtn variant="primary">
            <svg class="mr-2" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M5 12h14" />
              <path d="m12 5 7 7-7 7" />
            </svg>
            Continue
          </MayaBtn>
          <MayaBtn variant="secondary">
            Settings
            <svg class="ml-2" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path
                d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
              <circle cx="12" cy="12" r="3" />
            </svg>
          </MayaBtn>
        </div>
      </template>
    </MayaPreviewCode>

    <MayaPreviewCode title="Icon Only"
      description="A square button designed to perfectly center a single icon using the 'icon' size variant." lang="vue"
      :code="iconOnlyCode">
      <template #preview>
        <div class="row align-center">
          <MayaBtn variant="secondary" size="icon" aria-label="Add item">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M5 12h14" />
              <path d="M12 5v14" />
            </svg>
          </MayaBtn>
          <MayaBtn variant="ghost" size="icon" aria-label="Refresh">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
              <path d="M3 3v5h5" />
              <path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16" />
              <path d="M16 21v-5h5" />
            </svg>
          </MayaBtn>
        </div>
      </template>
    </MayaPreviewCode>

    <MayaPreviewCode title="Split Button"
      description="Compose a MayaBtnGroup with a dropdown menu to offer secondary actions attached to the main button."
      lang="vue" :code="splitBtnCode">
      <template #preview>
        <div class="row align-center pb-12 pt-4">
          <MayaBtnGroup>
            <MayaBtn variant="primary">Submit Request</MayaBtn>
            <MayaDropdownMenu align="down-right">
              <template #trigger>
                <MayaBtn variant="primary" class="px-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="m6 9 6 6 6-6" />
                  </svg>
                </MayaBtn>
              </template>
              <MayaDropdownItem>Save as Draft</MayaDropdownItem>
              <MayaDropdownItem>Schedule Submit...</MayaDropdownItem>
            </MayaDropdownMenu>
          </MayaBtnGroup>
        </div>
      </template>
    </MayaPreviewCode>
  </div>
</template>

<script setup>
const variantsCode = `<MayaBtn variant="primary">Primary</MayaBtn>
<MayaBtn variant="secondary">Secondary</MayaBtn>
<MayaBtn variant="ghost">Ghost</MayaBtn>`

const intentPrimaryCode = `<MayaBtn variant="primary" intent="success">Success</MayaBtn>
<MayaBtn variant="primary" intent="warning">Warning</MayaBtn>
<MayaBtn variant="primary" intent="danger">Danger</MayaBtn>
<MayaBtn variant="primary" intent="info">Info</MayaBtn>`

const intentSecondaryCode = `<MayaBtn variant="secondary" intent="success">Success</MayaBtn>
<MayaBtn variant="secondary" intent="danger">Danger</MayaBtn>`

const intentGhostCode = `<MayaBtn variant="ghost" intent="success">Success</MayaBtn>
<MayaBtn variant="ghost" intent="danger">Danger</MayaBtn>`

const sizesCode = `<MayaBtn size="sm">Small</MayaBtn>
<MayaBtn size="md">Medium</MayaBtn>
<MayaBtn size="lg">Large</MayaBtn>`

const disabledCode = `<MayaBtn variant="primary" disabled>Primary</MayaBtn>
<MayaBtn variant="secondary" disabled>Secondary</MayaBtn>`

const withIconsCode = `<MayaBtn variant="primary">
  <IconArrowRight />
  Continue
</MayaBtn>

<MayaBtn variant="secondary">
  Settings
  <IconSettings />
</MayaBtn>`

const iconOnlyCode = `<MayaBtn variant="secondary" size="icon" aria-label="Add item">
  <IconPlus />
</MayaBtn>

<MayaBtn variant="ghost" size="icon" aria-label="Refresh">
  <IconRefresh />
</MayaBtn>`

const splitBtnCode = `<MayaBtnGroup>
  <MayaBtn variant="primary">Submit Request</MayaBtn>
  <MayaDropdownMenu align="down-right">
    <template #trigger>
      <MayaBtn variant="primary" class="px-2 border-l border-white-20">
        <IconChevronDown />
      </MayaBtn>
    </template>

    <MayaDropdownItem>Save as Draft</MayaDropdownItem>
    <MayaDropdownItem>Schedule Submit...</MayaDropdownItem>
  </MayaDropdownMenu>
</MayaBtnGroup>`
</script>

<style scoped>
.row {
  display: flex;
  gap: 10px;
  align-items: flex-start;
}

.row.align-center {
  align-items: center;
}

.row.wrap {
  flex-wrap: wrap;
}

.mr-2 {
  margin-right: 0.5rem;
}

.ml-2 {
  margin-left: 0.5rem;
}

.px-2 {
  padding-left: 0.5rem;
  padding-right: 0.5rem;
}

.border-l {
  border-left-width: 1px;
}

.border-white-20 {
  border-left-color: rgba(255, 255, 255, 0.2);
}

.pb-12 {
  padding-bottom: 3rem;
}

.pt-4 {
  padding-top: 1rem;
}
</style>
