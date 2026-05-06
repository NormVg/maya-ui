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
    
    <!-- API Reference -->
    <ApiTable 
      title="HoverCard API" 
      description="Props and slots from HoverCard.vue source."
      :propsList="hoverCardProps"
      :slotsList="hoverCardSlots"
    />
  </div>
</template>

<script setup>
const hoverCardProps = [
  { name: 'align', type: 'string', default: "'bottom-center'", description: "Controls the alignment and placement of the hover card relative to the trigger. One of 'bottom-start' | 'bottom-center' | 'bottom-end' | 'top-start' | 'top-center' | 'top-end'." },
  { name: 'openDelay', type: 'number', default: '200', description: 'Delay in milliseconds before the hover card opens when hovered.' },
  { name: 'closeDelay', type: 'number', default: '150', description: 'Delay in milliseconds before the hover card closes when unhovered.' }
]

const hoverCardSlots = [
  { name: 'trigger', description: 'The element that triggers the hover card when hovered or focused.' },
  { name: 'default', description: 'The main content of the hover card.' }
]
</script>

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
