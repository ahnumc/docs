<script setup lang="ts">
defineProps<{
  title: string
  description?: string
  href: string
  platform?: string
  version?: string
  size?: string
}>()
</script>

<template>
  <article class="ah-download">
    <div class="ah-download__main">
      <h3 class="ah-download__title">{{ title }}</h3>
      <p v-if="description" class="ah-download__description">{{ description }}</p>
      <ul v-if="platform || version || size" class="ah-download__meta" aria-label="文件信息">
        <li v-if="platform">{{ platform }}</li>
        <li v-if="version">v{{ version }}</li>
        <li v-if="size">{{ size }}</li>
      </ul>
    </div>
    <a class="ah-download__action" :href="href" download>
      <span class="ah-download__arrow" aria-hidden="true">&darr;</span>
      下载
    </a>
  </article>
</template>
