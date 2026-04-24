<template>
  <div>
    <div class="component-header">
      <h2 class="component-title">Hover Card</h2>
      <p class="component-desc">Preview extra context on hover/focus without forcing a full navigation.</p>
    </div>

    <MayaPreviewCode
      title="Profile Preview"
      description="Hover or focus trigger text to reveal compact profile details."
      :code='`<MayaHoverCard align="bottom-center">
  <template #trigger>
    <button class="link-trigger">@maya_design</button>
  </template>

  <div class="card-content">
    <div class="card-row">
      <div class="avatar">M</div>
      <div>
        <p class="name">Maya Design Team</p>
        <p class="meta">Design system maintainers</p>
      </div>
    </div>
    <p class="bio">
      Building opinionated, theme-first UI components focused on motion and clarity.
    </p>
  </div>
</MayaHoverCard>`'
    >
      <template #preview>
        <MayaHoverCard align="bottom-center">
          <template #trigger>
            <button class="link-trigger">@maya_design</button>
          </template>
          <div class="card-content">
            <div class="card-row">
              <div class="avatar">M</div>
              <div>
                <p class="name">Maya Design Team</p>
                <p class="meta">Design system maintainers</p>
              </div>
            </div>
            <p class="bio">Building opinionated, theme-first UI components focused on motion and clarity.</p>
          </div>
        </MayaHoverCard>
      </template>
    </MayaPreviewCode>

    <MayaPreviewCode
      title="Top Alignment"
      description="Use top alignment when trigger sits lower in the viewport."
      :code='`<MayaHoverCard align="top-start">
  <template #trigger>
    <MayaBtn variant="ghost">Project Status</MayaBtn>
  </template>

  <div class="status">
    <p class="status-title">Production healthy</p>
    <p class="status-meta">99.98% uptime this month</p>
  </div>
</MayaHoverCard>`'
    >
      <template #preview>
        <MayaHoverCard align="top-start">
          <template #trigger>
            <MayaBtn variant="ghost">Project Status</MayaBtn>
          </template>
          <div class="status">
            <p class="status-title">Production healthy</p>
            <p class="status-meta">99.98% uptime this month</p>
          </div>
        </MayaHoverCard>
      </template>
    </MayaPreviewCode>
  </div>
</template>

<style scoped>
.link-trigger {
  border: none;
  background: transparent;
  color: var(--maya-accent, var(--maya-text-primary));
  font-size: 0.875rem;
  font-weight: 600;
  text-decoration: underline;
  text-decoration-color: transparent;
  text-underline-offset: 3px;
  padding: 4px 0;
  margin: -4px 0;
  cursor: pointer;
  transition: text-decoration-color var(--maya-duration) var(--maya-ease);
}

.link-trigger:hover {
  text-decoration-color: currentColor;
}

.card-content {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.card-row {
  display: flex;
  align-items: center;
  gap: 10px;
}

.avatar {
  width: 34px;
  height: 34px;
  border-radius: 999px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 0.75rem;
  font-weight: 700;
  border: 1px solid var(--maya-border-strong);
  background: var(--maya-bg-surface);
}

.name {
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--maya-text-primary);
}

.meta,
.bio,
.status-meta {
  font-size: 0.8125rem;
  color: var(--maya-text-secondary);
}

.status-title {
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--maya-text-primary);
  margin-bottom: 4px;
}
</style>
