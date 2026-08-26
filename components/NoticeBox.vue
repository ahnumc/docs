<script setup lang="ts">
import { computed } from 'vue'

type NoticeType = 'info' | 'success' | 'warning' | 'danger'

const props = withDefaults(defineProps<{
  type?: NoticeType
  title?: string
}>(), {
  type: 'info',
})

const labels: Record<NoticeType, string> = {
  info: '提示',
  success: '成功',
  warning: '注意',
  danger: '警告',
}

const icons: Record<NoticeType, string> = {
  info: 'i',
  success: '\u2713',
  warning: '!',
  danger: '\u00d7',
}

const heading = computed(() => props.title || labels[props.type])
</script>

<template>
  <aside class="ah-notice" :class="`ah-notice--${type}`" :aria-label="heading">
    <span class="ah-notice__icon" aria-hidden="true">{{ icons[type] }}</span>
    <div class="ah-notice__content">
      <p class="ah-notice__title">{{ heading }}</p>
      <div class="ah-notice__body"><slot /></div>
    </div>
  </aside>
</template>
