import { defineNuxtModule, addComponentsDir, addPlugin, createResolver } from '@nuxt/kit'

export interface ModuleOptions {}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: 'maya-ui',
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

    // Inject global CSS tokens
    nuxt.options.css.push(resolver.resolve('./runtime/maya.css'))
  },
})
