<template>
  <div class="component-page">
    <div class="page-header">
      <h1 class="page-title">Dropdown Menu</h1>
      <p class="page-description">Displays a menu to the user—such as a set of actions or functions—triggered by a
        button.</p>
    </div>

    <MayaPreviewCode title="Basic Usage"
      description="Create a dropdown by wrapping a trigger element and using DropdownItem elements inside the default slot. Alignment is configurable."
      code='<MayaDropdownMenu align="down-left">
  <template #trigger>
    <MayaBtn>Options</MayaBtn>
  </template>
<MayaDropdownItem shortcut="⌘T">New Tab</MayaDropdownItem>
<MayaDropdownItem shortcut="⌘N">New Window</MayaDropdownItem>
<MayaDropdownSeparator />
<MayaDropdownItem disabled>Reload</MayaDropdownItem>
<MayaDropdownSeparator />
<MayaDropdownItem variant="danger" shortcut="⇧⌘Q">Quit</MayaDropdownItem>
</MayaDropdownMenu>'>
      <template #preview>
        <div style="display: flex; gap: 1rem; align-items: center; justify-content: center;">
          <MayaDropdownMenu align="down-left">
            <template #trigger>
              <MayaBtn>Options</MayaBtn>
            </template>
            <MayaDropdownItem shortcut="⌘T">
              <template #icon>
                <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2"
                  stroke-linecap="round" stroke-linejoin="round">
                  <path d="M12 20h9" />
                  <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
                </svg>
              </template>
              New Tab
            </MayaDropdownItem>
            <MayaDropdownItem shortcut="⌘N">
              <template #icon>
                <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2"
                  stroke-linecap="round" stroke-linejoin="round">
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                  <line x1="12" y1="8" x2="12" y2="16" />
                  <line x1="8" y1="12" x2="16" y2="12" />
                </svg>
              </template>
              New Window
            </MayaDropdownItem>
            <MayaDropdownSeparator />
            <MayaDropdownItem disabled>
              <template #icon>
                <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2"
                  stroke-linecap="round" stroke-linejoin="round">
                  <polyline points="23 4 23 10 17 10" />
                  <polyline points="1 20 1 14 7 14" />
                  <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" />
                </svg>
              </template>
              Reload
            </MayaDropdownItem>
            <MayaDropdownSeparator />
            <MayaDropdownItem variant="danger" shortcut="⇧⌘Q">
              <template #icon>
                <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2"
                  stroke-linecap="round" stroke-linejoin="round">
                  <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                  <polyline points="16 17 21 12 16 7" />
                  <line x1="21" y1="12" x2="9" y2="12" />
                </svg>
              </template>
              Quit
            </MayaDropdownItem>
          </MayaDropdownMenu>
        </div>
      </template>
    </MayaPreviewCode>
  </div>
</template>
