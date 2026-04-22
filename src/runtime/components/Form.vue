<template>
  <form class="maya-form" @submit.prevent="$emit('submit', $event)" novalidate>
    <slot />
  </form>
</template>

<script setup>
defineEmits(['submit'])
</script>

<style scoped>
.maya-form {
  display: flex;
  flex-direction: column;
  gap: 24px;
  width: 100%;
}
</style>
