<template>
  <div>
    <h2 class="page-title">Components / Code & Prose</h2>

    <!-- CodeBlock -->
    <MayaPreviewCode title="Code Block" description="Multi-line syntax-highlighted code with copy button." lang="vue"
      :code="codeBlockUsage">
      <template #preview>
        <div style="width: 100%;">
          <MayaCodeBlock filename="nuxt.config.ts" lang="typescript" :code="codeBlockExample" />
        </div>
      </template>
    </MayaPreviewCode>

    <!-- InlineCode -->
    <MayaPreviewCode title="Inline Code" description="One-line copyable snippet for commands and imports." lang="vue"
      :code="inlineCodeUsage">
      <template #preview>
        <div style="display: flex; flex-direction: column; gap: 12px; align-items: flex-start;">
          <MayaInlineCode code="npm install maya-ui" lang="bash" />
          <MayaInlineCode code="import { MayaBtn } from 'maya-ui'" lang="typescript" />
          <MayaInlineCode code="v1.0.0" />
        </div>
      </template>
    </MayaPreviewCode>

    <!-- Prose -->
    <MayaPreviewCode title="Prose / Markdown" description="Renders markdown with syntax-highlighted fenced code blocks."
      lang="vue" :code="proseUsage">
      <template #preview>
        <div style="width: 100%; text-align: left;">
          <MayaProse :content="markdownExample" />
        </div>
      </template>
    </MayaPreviewCode>
    <!-- Preview Code Component -->
    <MayaPreviewCode title="Preview Component" description="Interactive tabbed viewer demonstrating a live component next to its source code, with configurable heights." lang="vue"
      :code="previewCodeUsage">
      <template #preview>
        <div style="width: 100%;">
          <MayaPreviewCode
            title="Nested Preview"
            description="I am inside a preview!"
            lang="html"
            previewHeight="160px"
            codeHeight="200px"
            code="<!-- This code block has a strict height of 200px and will scroll -->\n<div class='example'>\n  <p>Hello World</p>\n</div>"
          >
            <template #preview>
              <div style="display:flex; height: 100%; align-items:center; justify-content:center;">
                <MayaBtn>Sample Action</MayaBtn>
              </div>
            </template>
          </MayaPreviewCode>
        </div>
      </template>
    </MayaPreviewCode>

  </div>
</template>

<script setup>
const previewCodeUsage = `<MayaPreviewCode
  title="Nested Preview"
  description="I am inside a preview!"
  lang="html"
  previewHeight="160px"
  codeHeight="200px"
  code="<!-- HTML goes here -->"
>
  <template #preview>
    <!-- Live component preview here -->
  </template>
</MayaPreviewCode>`
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
