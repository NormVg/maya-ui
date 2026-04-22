<template>
  <div>
    <div class="component-header">
      <h2 class="component-title">Colors & Surfaces</h2>
      <p class="component-desc">Design tokens that power the Maya UI experience. Never use hardcoded hex values — always
        consume these variables.</p>
    </div>

    <MayaPreviewCode title="Background Tiers"
      description="Use these in order of z-axis depth. Root = deepest, Raised = floating.">
      <template #preview>
        <div class="token-grid">
          <div class="tier-card" style="background: var(--maya-bg-root)">
            <code>--maya-bg-root</code>
            <span>Body, canvas, page base</span>
          </div>
          <div class="tier-card" style="background: var(--maya-bg-surface)">
            <code>--maya-bg-surface</code>
            <span>Panels, toolbars, sidebars</span>
          </div>
          <div class="tier-card" style="background: var(--maya-bg-raised)">
            <code>--maya-bg-raised</code>
            <span>Cards, dropdowns, modals</span>
          </div>
        </div>
      </template>
    </MayaPreviewCode>

    <MayaPreviewCode title="Striped Texture" description="Premium noise pattern. Stack on top of any background token.">
      <template #preview>
        <div
          style="background: var(--maya-pattern-stripes), var(--maya-bg-root); width: 100%; height: 120px; border-radius: var(--maya-radius-lg); border: 1px solid var(--maya-border); display: flex; align-items: center; justify-content: center;">
          <code
            style="color: var(--maya-text-secondary); font-size: 0.8125rem;">var(--maya-pattern-stripes), var(--maya-bg-root)</code>
        </div>
      </template>
    </MayaPreviewCode>

    <MayaPreviewCode title="Typography Scale" description="Three levels of text emphasis.">
      <template #preview>
        <div class="type-list">
          <div style="color: var(--maya-text-primary); font-size: 1.125rem; font-weight: 600;">
            Primary — Headings, Labels <code class="code-badge">--maya-text-primary</code>
          </div>
          <div style="color: var(--maya-text-secondary);">
            Secondary — Body, descriptions <code class="code-badge">--maya-text-secondary</code>
          </div>
          <div style="color: var(--maya-text-muted);">
            Muted — Placeholders, section titles <code class="code-badge">--maya-text-muted</code>
          </div>
        </div>
      </template>
    </MayaPreviewCode>

    <MayaPreviewCode title="Borders" description="Three border weights for different contexts.">
      <template #preview>
        <div class="token-grid">
          <div class="border-box" style="border-color: var(--maya-border)">
            <code>--maya-border</code>
            <span>Default dividers</span>
          </div>
          <div class="border-box" style="border-color: var(--maya-border-strong)">
            <code>--maya-border-strong</code>
            <span>Inputs, buttons</span>
          </div>
          <div class="border-box" style="border-color: var(--maya-border-hover)">
            <code>--maya-border-hover</code>
            <span>Focus, hover</span>
          </div>
          <div class="border-box maya-dash-all" style="border-color: var(--maya-dash-color)!important">
            <code>maya-dash-all</code>
            <span>Dashed separators</span>
          </div>
        </div>
      </template>
    </MayaPreviewCode>

    <MayaPreviewCode title="Depth & Elevation" description="Layered shadow system to express z-axis position.">
      <template #preview>
        <div class="token-grid">
          <div class="depth-box" style="box-shadow: var(--maya-shadow-sm)">
            <code>--maya-shadow-sm</code>
            <span>Inline elements</span>
          </div>
          <div class="depth-box" style="box-shadow: var(--maya-shadow-md)">
            <code>--maya-shadow-md</code>
            <span>Cards, panels</span>
          </div>
          <div class="depth-box" style="box-shadow: var(--maya-shadow-inset)">
            <code>--maya-shadow-inset</code>
            <span>Inputs, wells</span>
          </div>
        </div>
      </template>
    </MayaPreviewCode>

    <MayaPreviewCode title="Semantic Colors"
      description="Use sparingly to trigger emotion and communicate state. Each color has 5 variants: solid, hover, muted bg, border, text.">
      <template #preview>
        <div class="semantic-grid">
          <div class="semantic-card"
            style="background: var(--maya-success-muted); border-color: var(--maya-success-border);">
            <div class="semantic-dot" style="background: var(--maya-success);" />
            <div class="semantic-info">
              <span class="semantic-label" style="color: var(--maya-success-text);">Success</span>
              <span class="semantic-hint">Trust, growth, done</span>
              <code>--maya-success</code>
            </div>
          </div>
          <div class="semantic-card"
            style="background: var(--maya-warning-muted); border-color: var(--maya-warning-border);">
            <div class="semantic-dot" style="background: var(--maya-warning);" />
            <div class="semantic-info">
              <span class="semantic-label" style="color: var(--maya-warning-text);">Warning</span>
              <span class="semantic-hint">Caution, action needed</span>
              <code>--maya-warning</code>
            </div>
          </div>
          <div class="semantic-card"
            style="background: var(--maya-danger-muted); border-color: var(--maya-danger-border);">
            <div class="semantic-dot" style="background: var(--maya-danger);" />
            <div class="semantic-info">
              <span class="semantic-label" style="color: var(--maya-danger-text);">Danger</span>
              <span class="semantic-hint">Error, destructive, urgent</span>
              <code>--maya-danger</code>
            </div>
          </div>
          <div class="semantic-card" style="background: var(--maya-info-muted); border-color: var(--maya-info-border);">
            <div class="semantic-dot" style="background: var(--maya-info);" />
            <div class="semantic-info">
              <span class="semantic-label" style="color: var(--maya-info-text);">Info</span>
              <span class="semantic-hint">Neutral, informational</span>
              <code>--maya-info</code>
            </div>
          </div>
          <div class="semantic-card" style="background: var(--maya-accent-muted); border-color: rgba(99,102,241,0.25);">
            <div class="semantic-dot" style="background: var(--maya-accent);" />
            <div class="semantic-info">
              <span class="semantic-label" style="color: var(--maya-accent-hover);">Accent</span>
              <span class="semantic-hint">Brand, interactive, CTA</span>
              <code>--maya-accent</code>
            </div>
          </div>
        </div>
      </template>
    </MayaPreviewCode>
  </div>
</template>

<style scoped>
.token-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
  gap: 12px;
  width: 100%;
}

.tier-card {
  border: 1px solid var(--maya-border);
  border-radius: var(--maya-radius-lg);
  padding: 20px 16px;
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.tier-card code {
  font-size: 0.75rem;
  font-family: var(--maya-font-mono);
  color: var(--maya-text-primary);
  font-weight: 600;
}

.tier-card span {
  font-size: 0.75rem;
  color: var(--maya-text-muted);
}

.type-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 100%;
  padding: 12px;
}

.code-badge {
  font-family: var(--maya-font-mono);
  font-size: 0.6875rem;
  color: var(--maya-text-muted);
  margin-left: 8px;
}

.border-box,
.depth-box {
  border: 1px solid;
  border-radius: var(--maya-radius-md);
  padding: 20px 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  background: var(--maya-bg-surface);
  text-align: center;
}

.border-box code,
.depth-box code {
  font-size: 0.6875rem;
  font-family: var(--maya-font-mono);
  color: var(--maya-text-primary);
  font-weight: 600;
}

.border-box span,
.depth-box span {
  font-size: 0.75rem;
  color: var(--maya-text-muted);
}

.semantic-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 12px;
  width: 100%;
}

.semantic-card {
  border: 1px solid;
  border-radius: var(--maya-radius-lg);
  padding: 14px;
  display: flex;
  align-items: center;
  gap: 12px;
}

.semantic-dot {
  width: 32px;
  height: 32px;
  border-radius: var(--maya-radius-md);
  flex-shrink: 0;
}

.semantic-info {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.semantic-label {
  font-size: 0.875rem;
  font-weight: 600;
}

.semantic-hint {
  font-size: 0.6875rem;
  color: var(--maya-text-muted);
}

.semantic-info code {
  font-family: var(--maya-font-mono);
  font-size: 0.625rem;
  color: var(--maya-text-muted);
  margin-top: 2px;
}
</style>
