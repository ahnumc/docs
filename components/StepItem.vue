<script setup lang="ts">
defineProps<{
  title: string
  description?: string
}>()
</script>

<template>
  <li class="ah-step">
    <div class="ah-step__marker" aria-hidden="true" />
    <div class="ah-step__content">
      <h3 class="ah-step__title">{{ title }}</h3>
      <p v-if="description" class="ah-step__description">{{ description }}</p>
      <div v-if="$slots.default" class="ah-step__body"><slot /></div>
    </div>
  </li>
</template>
