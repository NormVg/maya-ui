<template>
  <nav class="maya-nav-menu" role="navigation">
    <ul class="maya-nav-list">
      <slot />
    </ul>
  </nav>
</template>

<style scoped>
.maya-nav-menu {
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  width: 100%;
}

.maya-nav-list {
  display: flex;
  justify-content: center;
  list-style: none;
  margin: 0;
  padding: 4px;
  background: var(--maya-bg-surface);
  border: 1px solid var(--maya-border);
  border-radius: var(--maya-radius-lg);
  gap: 4px;
}

/* Deep injection for child links */
:deep(a),
:deep(button) {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 8px 16px;
  font-family: var(--maya-font-sans);
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--maya-text-muted);
  text-decoration: none;
  background: transparent;
  border: none;
  border-radius: var(--maya-radius-md);
  transition: all var(--maya-duration) var(--maya-ease);
  cursor: pointer;
  outline: none;
}

:deep(a:hover),
:deep(button:hover),
:deep(a:focus),
:deep(button:focus) {
  color: var(--maya-text-primary);
  background: var(--maya-bg-raised);
}

:deep(a.router-link-active) {
  color: var(--maya-text-primary);
  background: var(--maya-bg-raised);
  box-shadow: var(--maya-shadow-sm);
  /* Subtle depth for active pill */
}
</style>
