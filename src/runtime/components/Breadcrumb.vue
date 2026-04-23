<template>
  <nav aria-label="breadcrumb" class="maya-breadcrumb">
    <ol class="maya-breadcrumb-list">
      <template v-if="items">
        <template v-for="(item, index) in items" :key="index">
          <li class="maya-breadcrumb-item">
            <template v-if="index === items.length - 1">
              <span class="maya-breadcrumb-page" aria-current="page">{{ item.label }}</span>
            </template>
            <template v-else>
              <component :is="item.href ? 'a' : 'span'" :href="item.href" class="maya-breadcrumb-link">
                {{ item.label }}
              </component>
            </template>
          </li>
          <li v-if="index < items.length - 1" role="presentation" aria-hidden="true" class="maya-breadcrumb-separator">
            <slot name="separator">
              <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M6.1584 3.13508C6.35985 2.95692 6.66473 2.9753 6.84289 3.17675L10.2179 7.00008C10.3705 7.17255 10.3705 7.42761 10.2179 7.60008L6.84289 11.4234C6.66473 11.6249 6.35985 11.6432 6.1584 11.4651C5.95695 11.2869 5.93857 10.982 6.11673 10.7806L9.18241 7.30008L6.11673 3.81958C5.93857 3.61813 5.95695 3.31325 6.1584 3.13508Z"
                  fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path>
              </svg>
            </slot>
          </li>
        </template>
      </template>
      <slot v-else />
    </ol>
  </nav>
</template>

<script setup>
defineProps({
  /**
   * Array of items. E.g. [{ label: 'Home', href: '/' }, { label: 'Settings' }]
   */
  items: {
    type: Array,
    default: null
  }
})
</script>

<style scoped>
.maya-breadcrumb-list {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 6px;
  list-style: none;
  margin: 0;
  padding: 0;
  font-family: var(--maya-font-sans);
  font-size: 0.875rem;
}

.maya-breadcrumb-item {
  display: inline-flex;
  align-items: center;
}

/* Deep selects to style slotted items implicitly if users want to compose manually */
:deep(.maya-breadcrumb-link) {
  color: var(--maya-text-muted);
  text-decoration: none;
  border-radius: var(--maya-radius-sm);
  padding: 2px 6px;
  margin: -2px -6px;
  /* Hit Area Expansion - Fitts's Law */
  transition: all var(--maya-duration) var(--maya-ease);
  cursor: pointer;
}

:deep(.maya-breadcrumb-link:hover) {
  color: var(--maya-text-primary);
  background: var(--maya-bg-root);
}

:deep(.maya-breadcrumb-page) {
  color: var(--maya-text-primary);
  font-weight: 500;
}

:deep(.maya-breadcrumb-separator) {
  color: var(--maya-border-strong);
  display: inline-flex;
  margin: 0 2px;
}
</style>
