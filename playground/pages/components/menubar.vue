<template>
  <div class="component-page">
    <div class="page-header">
      <h1 class="page-title">Menubar</h1>
      <p class="page-description">A visually styled horizontal menu that typically contains DropdownMenus.</p>
    </div>

    <MayaPreviewCode title="Basic Usage"
      description="Wraps multiple dropdown menus to create a desktop application style menubar." code="<MayaMenubar>
  <MayaDropdownMenu>
    <template #trigger><MayaBtn>File</MayaBtn></template>
<MayaDropdownItem>New Window</MayaDropdownItem>
</MayaDropdownMenu>
<MayaDropdownMenu>
  <template #trigger><MayaBtn>Edit</MayaBtn></template>
  <MayaDropdownItem>Undo</MayaDropdownItem>
</MayaDropdownMenu>
</MayaMenubar>">
      <template #preview>
        <div style="display: flex; align-items: center; justify-content: center; padding: 2rem;">
          <MayaMenubar>
            <MayaDropdownMenu>
              <template #trigger>
                <MayaBtn>File</MayaBtn>
              </template>
              <MayaDropdownItem shortcut="⌘N">New Window</MayaDropdownItem>
              <MayaDropdownItem shortcut="⌘T">New Tab</MayaDropdownItem>
              <MayaDropdownSeparator />
              <MayaDropdownItem>Options...</MayaDropdownItem>
            </MayaDropdownMenu>

            <MayaDropdownMenu>
              <template #trigger>
                <MayaBtn>Edit</MayaBtn>
              </template>
              <MayaDropdownItem shortcut="⌘Z">Undo</MayaDropdownItem>
              <MayaDropdownItem shortcut="⇧⌘Z">Redo</MayaDropdownItem>
              <MayaDropdownSeparator />
              <MayaDropdownItem shortcut="⌘X">Cut</MayaDropdownItem>
              <MayaDropdownItem shortcut="⌘C">Copy</MayaDropdownItem>
            </MayaDropdownMenu>

            <MayaDropdownMenu>
              <template #trigger>
                <MayaBtn>View</MayaBtn>
              </template>
              <MayaDropdownItem shortcut="⌘=">Zoom In</MayaDropdownItem>
              <MayaDropdownItem shortcut="⌘-">Zoom Out</MayaDropdownItem>
            </MayaDropdownMenu>
          </MayaMenubar>
        </div>
      </template>
    </MayaPreviewCode>
  </div>
</template>
