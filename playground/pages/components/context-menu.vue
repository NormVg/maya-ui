<template>
  <div class="component-page">
    <div class="page-header">
      <h1 class="page-title">Context Menu</h1>
      <p class="page-description">Displays a menu to the user—such as a set of actions or functions—triggered by
        right-clicking.</p>
    </div>

    <MayaPreviewCode title="Basic Usage"
      description="Wrap any area with MayaContextMenu. Right-clicking inside the area will trigger the menu exactly at the cursor coordinates."
      code='<MayaContextMenu>
  <div class="context-zone">
    Right click here
  </div>

  <template #menu>
    <MayaDropdownItem shortcut="⌘[">Back</MayaDropdownItem>
    <MayaDropdownItem shortcut="⌘]">Forward</MayaDropdownItem>
    <MayaDropdownItem shortcut="⌘R">Reload</MayaDropdownItem>
    <MayaDropdownSeparator />
    <MayaDropdownItem shortcut="⌘⇧S">Save As...</MayaDropdownItem>
    <MayaDropdownItem>Print...</MayaDropdownItem>
  </template>
</MayaContextMenu>'>
      <template #preview>
        <div style="display: flex; align-items: center; justify-content: center; padding: 2rem;">
          <MayaContextMenu>
            <div
              style="border: 1px dashed var(--maya-border-strong); border-radius: var(--maya-radius-lg); padding: 4rem; display: flex; align-items: center; justify-content: center; width: 100%; font-family: var(--maya-font-mono); font-size: 0.875rem; color: var(--maya-text-muted);">
              Right click here
            </div>

            <template #menu>
              <MayaDropdownItem shortcut="⌘[">
                <template #icon>
                  <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2"
                    stroke-linecap="round" stroke-linejoin="round">
                    <polyline points="15 18 9 12 15 6" />
                  </svg>
                </template>
                Back
              </MayaDropdownItem>
              <MayaDropdownItem shortcut="⌘]" disabled>
                <template #icon>
                  <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2"
                    stroke-linecap="round" stroke-linejoin="round">
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
                </template>
                Forward
              </MayaDropdownItem>
              <MayaDropdownItem shortcut="⌘R">
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
              <MayaDropdownItem shortcut="⌘⇧S">
                <template #icon>
                  <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2"
                    stroke-linecap="round" stroke-linejoin="round">
                    <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
                    <polyline points="17 21 17 13 7 13 7 21" />
                    <polyline points="7 3 7 8 15 8" />
                  </svg>
                </template>
                Save As...
              </MayaDropdownItem>
              <MayaDropdownItem>
                <template #icon>
                  <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2"
                    stroke-linecap="round" stroke-linejoin="round">
                    <polyline points="6 9 6 2 18 2 18 9" />
                    <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
                    <rect x="6" y="14" width="12" height="8" />
                  </svg>
                </template>
                Print...
              </MayaDropdownItem>
            </template>
          </MayaContextMenu>
        </div>
      </template>
    </MayaPreviewCode>
  </div>
</template>
