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
              <svg width="14" height="14" viewBox="0 0 15 15" fill="none">
                <path
                  d="M6.1584 3.13508C6.35985 2.95692 6.66473 2.9753 6.84289 3.17675L10.2179 7.00008C10.3705 7.17255 10.3705 7.42761 10.2179 7.60008L6.84289 11.4234C6.66473 11.6249 6.35985 11.6432 6.1584 11.4651C5.95695 11.2869 5.93857 10.982 6.11673 10.7806L9.18241 7.30008L6.11673 3.81958C5.93857 3.61813 5.95695 3.31325 6.1584 3.13508Z"
                  fill="currentColor" fill-rule="evenodd" clip-rule="evenodd" />
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
  items: { type: Array, default: null }
})
</script>

<style scoped>
.maya-breadcrumb-list {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 2px;
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

/* These classes may be used by slot-based composition */
:deep(.maya-breadcrumb-link),
.maya-breadcrumb-link {
  position: relative;
  color: var(--maya-text-muted);
  text-decoration: none;
  border-radius: var(--maya-radius-sm);
  padding: 3px 6px;
  margin: -3px -6px;
  transition: color 120ms cubic-bezier(0.19, 1, 0.22, 1);
  cursor: pointer;
}

/* Pseudo-element hover bg — ui-rules */
:deep(.maya-breadcrumb-link)::before,
.maya-breadcrumb-link::before {
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

:deep(.maya-breadcrumb-link:hover),
.maya-breadcrumb-link:hover {
  color: var(--maya-text-primary);
}

:deep(.maya-breadcrumb-link:hover)::before,
.maya-breadcrumb-link:hover::before {
  opacity: 0.06;
  transform: scale(1);
}

:deep(.maya-breadcrumb-page),
.maya-breadcrumb-page {
  color: var(--maya-text-primary);
  font-weight: 500;
  padding: 3px 0;
}

:deep(.maya-breadcrumb-separator),
.maya-breadcrumb-separator {
  color: var(--maya-border-strong);
  display: inline-flex;
  align-items: center;
  margin: 0 1px;
  opacity: 0.7;
}
</style>
