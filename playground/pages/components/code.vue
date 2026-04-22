<template>
  <div>
    <h2 class="page-title">Components / Code & Prose</h2>

    <!-- CodeBlock -->
    <MayaPreviewCode title="Code Block" description="Multi-line syntax-highlighted code with copy button.">
      <template #preview>
        <div style="width: 100%;">
          <MayaCodeBlock filename="nuxt.config.ts" lang="typescript" :code="codeBlockExample" />
        </div>
      </template>
      <template #code>
        <pre><code>{{ codeBlockUsage }}</code></pre>
      </template>
    </MayaPreviewCode>

    <!-- InlineCode -->
    <MayaPreviewCode title="Inline Code" description="One-line copyable snippet for commands and imports.">
      <template #preview>
        <div style="display: flex; flex-direction: column; gap: 12px; align-items: flex-start;">
          <MayaInlineCode code="npm install maya-ui" lang="bash" />
          <MayaInlineCode code="import { MayaBtn } from 'maya-ui'" lang="typescript" />
          <MayaInlineCode code="v1.0.0" />
        </div>
      </template>
      <template #code>
        <pre><code>{{ inlineCodeUsage }}</code></pre>
      </template>
    </MayaPreviewCode>

    <!-- Prose -->
    <MayaPreviewCode title="Prose / Markdown" description="Renders markdown with syntax-highlighted fenced code blocks.">
      <template #preview>
        <div style="width: 100%; text-align: left;">
          <MayaProse :content="markdownExample" />
        </div>
      </template>
      <template #code>
        <pre><code>{{ proseUsage }}</code></pre>
      </template>
    </MayaPreviewCode>
  </div>
</template>

<script setup>
const codeBlockExample = `export default defineNuxtConfig({
  modules: ['maya-ui'],
  maya: {
    theme: 'dark',
    prefix: 'Maya',
  },
})`

const codeBlockUsage = `<MayaCodeBlock
  filename="nuxt.config.ts"
  lang="typescript"
  :code="myCode"
/>`

const inlineCodeUsage = `<MayaInlineCode code="npm install maya-ui" lang="bash" />
<MayaInlineCode code="import { MayaBtn } from 'maya-ui'" lang="typescript" />
<MayaInlineCode code="v1.0.0" />`

const markdownExample = `# Getting Started

Install Maya UI via your package manager:

\`\`\`bash
npm install maya-ui
\`\`\`

## Configuration

Add the module to your \`nuxt.config.ts\`:

\`\`\`typescript
export default defineNuxtConfig({
  modules: ['maya-ui'],
})
\`\`\`

> **Note:** All components are auto-imported with the \`Maya\` prefix.

### Available Components

- **MayaBtn** — Button with semantic intent variants
- **MayaCard** — Surface container with slots
- **MayaBadge** — Inline label with \`solid\`, \`soft\`, and \`outline\` styles`

const proseUsage = `<MayaProse :content="markdownString" />`
</script>
