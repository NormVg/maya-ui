import { defineNuxtModule, addComponentsDir, addImports, addImportsDir, createResolver } from '@nuxt/kit'

export interface ModuleOptions {}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: '@thenormvg/maya-ui',
    configKey: 'mayaUi',
  },
  defaults: {},
  setup(_options, nuxt) {
    const resolver = createResolver(import.meta.url)

    // Auto-import all components from runtime/components
    addComponentsDir({
      path: resolver.resolve('./runtime/components'),
      prefix: 'Maya',
      global: true,
      watch: true
    })

    // Auto-import composables (explicitly for better reliability)
    addImports([
      { name: 'useToast', from: resolver.resolve('./runtime/composables/useToast') },
      { name: 'useMayaSound', from: resolver.resolve('./runtime/composables/useMayaSound') }
    ])

    // Inject global CSS tokens
    nuxt.options.css.push(resolver.resolve('./runtime/maya.css'))
  },
})
