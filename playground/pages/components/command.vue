<template>
  <div class="component-page">
    <div class="page-header">
      <h1 class="page-title">Command</h1>
      <p class="page-description">Fast, composable, unstyled command menu for React. (Adapted for Maya UI in Vue)</p>
    </div>

    <MayaPreviewCode title="Basic Usage"
      description="Provide an array of grouped items to the Command component. It handles search filtering natively."
      code="<MayaCommand :groups='groups' />">
      <template #preview>
        <div style="display: flex; align-items: center; justify-content: center; padding: 2rem;">
          <MayaCommand :groups="mockGroups" />
        </div>
      </template>
    </MayaPreviewCode>

    <MayaPreviewCode title="Inside a Modal"
      description="Command is traditionally used inside a MayaModal. The modal acts as the palette overlay." code="<MayaModal v-model='isOpen' :hideCloseButton='true' maxWidth='640px' style='padding: 0;'>
  <MayaCommand :groups='groups' @select='isOpen = false' style='border: none; box-shadow: none;' />
</MayaModal>">
      <template #preview>
        <div style="display: flex; align-items: center; justify-content: center; padding: 2rem;">
          <MayaBtn @click="isOpen = true" variant="outline">
            Open Command Palette <MayaKbd ref="triggerKbdRef">⌘K</MayaKbd>
          </MayaBtn>

          <MayaModal v-model="isOpen" :hideCloseButton="true" maxWidth="640px">
            <MayaCommand :groups="mockGroups" @select="isOpen = false"
              style="border: none; box-shadow: none; max-width: 100%;" />
          </MayaModal>
        </div>
      </template>
    </MayaPreviewCode>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const isOpen = ref(false)
const triggerKbdRef = ref(null)

function handleGlobalShortcut(e) {
  if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
    e.preventDefault()
    // Flash the Kbd on the trigger button
    if (triggerKbdRef.value?.$el || triggerKbdRef.value) {
      const kbdInstance = triggerKbdRef.value
      if (kbdInstance?.flash) kbdInstance.flash()
    }
    isOpen.value = !isOpen.value
  }
}

onMounted(() => {
  window.addEventListener('keydown', handleGlobalShortcut)
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleGlobalShortcut)
})

const mockGroups = [
  {
    heading: 'Suggestions',
    items: [
      {
        label: 'Calendar',
        shortcut: 'C',
        icon: '<svg viewBox="0 0 24 24" width="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></svg>'
      },
      {
        label: 'Search Emoji',
        shortcut: '⌘E',
        icon: '<svg viewBox="0 0 24 24" width="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10" /><path d="M8 14s1.5 2 4 2 4-2 4-2" /><line x1="9" y1="9" x2="9.01" y2="9" /><line x1="15" y1="9" x2="15.01" y2="9" /></svg>'
      },
      {
        label: 'Calculator',
        icon: '<svg viewBox="0 0 24 24" width="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="2" width="16" height="20" rx="2" ry="2" /><line x1="8" y1="6" x2="16" y2="6" /><line x1="16" y1="14" x2="16" y2="18" /><path d="M16 10h.01" /><path d="M12 10h.01" /><path d="M8 10h.01" /><path d="M12 14h.01" /><path d="M8 14h.01" /><path d="M12 18h.01" /><path d="M8 18h.01" /></svg>'
      }
    ]
  },
  {
    heading: 'Settings',
    items: [
      {
        label: 'Profile',
        shortcut: '⌘P',
        icon: '<svg viewBox="0 0 24 24" width="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>'
      },
      {
        label: 'Billing',
        shortcut: '⌘B',
        icon: '<svg viewBox="0 0 24 24" width="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="5" width="20" height="14" rx="2" /> <line x1="2" y1="10" x2="22" y2="10" /></svg>'
      },
      {
        label: 'Settings',
        shortcut: '⌘S',
        icon: '<svg viewBox="0 0 24 24" width="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" /></svg>'
      }
    ]
  }
]
</script>
