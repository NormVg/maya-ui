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
  gap: 2px;
  box-shadow:
    0 0 0 1px rgba(255, 255, 255, 0.04),
    0 1px 3px rgba(0, 0, 0, 0.15);
}

/* Child link/button styling via deep */
:deep(a),
:deep(button) {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 7px 14px;
  font-family: var(--maya-font-sans);
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--maya-text-muted);
  text-decoration: none;
  background: transparent;
  border: none;
  border-radius: var(--maya-radius-md);
  cursor: pointer;
  outline: none;
  transition: color 120ms cubic-bezier(0.19, 1, 0.22, 1);
  user-select: none;
}

/* Pseudo-element hover background — ui-rules */
:deep(a)::before,
:deep(button)::before {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: inherit;
  background: var(--maya-text-primary);
  opacity: 0;
  transform: scale(0.92);
  transition:
    opacity 120ms cubic-bezier(0.19, 1, 0.22, 1),
    transform 120ms cubic-bezier(0.19, 1, 0.22, 1);
}

:deep(a:hover)::before,
:deep(button:hover)::before,
:deep(a:focus)::before,
:deep(button:focus)::before {
  opacity: 0.06;
  transform: scale(1);
}

:deep(a:hover),
:deep(button:hover),
:deep(a:focus),
:deep(button:focus) {
  color: var(--maya-text-primary);
}

:deep(a:active),
:deep(button:active) {
  transform: scale(0.97);
}

/* Active / router-link-active pill — bouncy spring feel */
:deep(a.router-link-active),
:deep(a.active),
:deep(button.active) {
  color: var(--maya-text-primary);
  background: var(--maya-bg-raised);
  box-shadow:
    0 0 0 1px rgba(255, 255, 255, 0.06),
    0 1px 3px rgba(0, 0, 0, 0.2);
}

:deep(a.router-link-active)::before,
:deep(a.active)::before,
:deep(button.active)::before {
  display: none;
  /* active state uses bg directly */
}
</style>
