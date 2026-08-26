<script setup lang="ts">
import { computed, inject } from 'vue'

import { tabsKey } from './internal/tabs-context'

const props = defineProps<{
  label: string
}>()

const tabs = inject(tabsKey)

if (!tabs) {
  throw new Error('TabItem must be used inside Tabs')
}

const isActive = computed(() => tabs.activeLabel.value === props.label)
</script>

<template>
  <section
    v-show="isActive"
    :id="tabs.panelId(label)"
    class="ah-tabs__panel"
    role="tabpanel"
    :aria-labelledby="tabs.tabId(label)"
    :tabindex="0"
  >
    <slot />
  </section>
</template>
