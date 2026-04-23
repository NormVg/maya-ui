<template>
  <div class="maya-app-shell">
    <!-- Sidebar Area -->
    <div v-if="$slots.sidebar" class="maya-app-shell-sidebar">
      <slot name="sidebar" />
    </div>

    <!-- Main Column Area -->
    <div class="maya-app-shell-main">
      <!-- Topbar Area -->
      <div v-if="$slots.topbar" class="maya-app-shell-topbar">
        <slot name="topbar" />
      </div>

      <!-- Scrollable Work Area -->
      <main class="maya-app-shell-content">
        <slot />
      </main>
    </div>
  </div>
</template>

<style scoped>
.maya-app-shell {
  display: flex;
  height: 100vh;
  width: 100%;
  overflow: hidden;
  background: var(--maya-bg-root);
  font-family: var(--maya-font-sans);
}

.maya-app-shell-sidebar {
  flex-shrink: 0;
  height: 100%;
  /* The sidebar component itself provides the styling/width (usually 220px) */
}

.maya-app-shell-main {
  flex: 1;
  display: flex;
  flex-direction: column;
  min-width: 0;
  /* Prevents flex children from blowing out width */
  height: 100%;
}

.maya-app-shell-topbar {
  flex-shrink: 0;
  /* Topbar component provides its own height/styling */
}

.maya-app-shell-content {
  flex: 1;
  overflow-y: auto;
  position: relative;
}

/* Custom scrollbar for the work area */
.maya-app-shell-content::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}

.maya-app-shell-content::-webkit-scrollbar-track {
  background: transparent;
}

.maya-app-shell-content::-webkit-scrollbar-thumb {
  background: var(--maya-border-strong);
  border-radius: 99px;
  border: 1px solid var(--maya-bg-root);
}
</style>
