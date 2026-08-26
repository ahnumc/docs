<script setup lang="ts">
import { computed, getCurrentInstance, nextTick, provide, ref, watchEffect } from 'vue'
import type { VNode } from 'vue'

import { nextTabIndex } from './internal/component-utils.mjs'
import { tabsKey } from './internal/tabs-context'

const props = defineProps<{
  defaultLabel?: string
  ariaLabel?: string
}>()

const slots = defineSlots<{
  default(): VNode[]
}>()

const instanceId = `ah-tabs-${getCurrentInstance()?.uid ?? 0}`
const tabButtons = ref<HTMLButtonElement[]>([])

function collectLabels(nodes: VNode[]): string[] {
  return nodes.flatMap((node) => {
    if (typeof node.type === 'symbol' && Array.isArray(node.children)) {
      return collectLabels(node.children as VNode[])
    }

    const label = node.props?.label
    return typeof label === 'string' && label ? [label] : []
  })
}

const labels = computed(() => collectLabels(slots.default?.() ?? []))
const activeLabel = ref(props.defaultLabel || '')

watchEffect(() => {
  if (!labels.value.includes(activeLabel.value)) {
    activeLabel.value = labels.value[0] ?? ''
  }
})

function safeId(label: string) {
  return encodeURIComponent(label).replaceAll('%', '-')
}

function tabId(label: string) {
  return `${instanceId}-tab-${safeId(label)}`
}

function panelId(label: string) {
  return `${instanceId}-panel-${safeId(label)}`
}

function select(label: string) {
  activeLabel.value = label
}

async function handleKeydown(event: KeyboardEvent, currentIndex: number) {
  if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return

  event.preventDefault()
  const targetIndex = nextTabIndex(currentIndex, event.key, labels.value.length)
  const targetLabel = labels.value[targetIndex]
  if (!targetLabel) return

  select(targetLabel)
  await nextTick()
  tabButtons.value[targetIndex]?.focus()
}

provide(tabsKey, { activeLabel, instanceId, select, tabId, panelId })
</script>

<template>
  <div class="ah-tabs">
    <div class="ah-tabs__list" role="tablist" :aria-label="ariaLabel || '内容选项'">
      <button
        v-for="(label, index) in labels"
        :id="tabId(label)"
        :key="label"
        :ref="(element) => { if (element) tabButtons[index] = element as HTMLButtonElement }"
        class="ah-tabs__tab"
        :class="{ 'ah-tabs__tab--active': activeLabel === label }"
        type="button"
        role="tab"
        :aria-selected="activeLabel === label"
        :aria-controls="panelId(label)"
        :tabindex="activeLabel === label ? 0 : -1"
        @click="select(label)"
        @keydown="handleKeydown($event, index)"
      >
        {{ label }}
      </button>
    </div>
    <div class="ah-tabs__panels"><slot /></div>
  </div>
</template>
