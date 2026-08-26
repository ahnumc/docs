<script setup lang="ts">
import { computed, getCurrentInstance, onBeforeUnmount, ref } from 'vue'

import { copyText } from './internal/component-utils.mjs'

const props = withDefaults(defineProps<{
  value: string
  label?: string
  resetAfter?: number
}>(), {
  label: '可复制内容',
  resetAfter: 1800,
})

type CopyStatus = 'idle' | 'copied' | 'failed'

const status = ref<CopyStatus>('idle')
const fieldId = `ah-copy-${getCurrentInstance()?.uid ?? 0}`
let resetTimer: ReturnType<typeof setTimeout> | undefined

const feedback = computed(() => ({
  idle: '',
  copied: '已复制',
  failed: '复制失败，请手动选择',
})[status.value])

const buttonLabel = computed(() => status.value === 'copied' ? '已复制' : `复制${props.label}`)

async function handleCopy() {
  if (resetTimer) clearTimeout(resetTimer)
  status.value = await copyText(props.value)
  resetTimer = setTimeout(() => {
    status.value = 'idle'
  }, props.resetAfter)
}

onBeforeUnmount(() => {
  if (resetTimer) clearTimeout(resetTimer)
})
</script>

<template>
  <div class="ah-copy" :class="`ah-copy--${status}`">
    <label class="ah-copy__label" :for="fieldId">{{ label }}</label>
    <div class="ah-copy__control">
      <input
        :id="fieldId"
        class="ah-copy__value"
        :value="value"
        readonly
        spellcheck="false"
        @focus="($event.target as HTMLInputElement).select()"
      >
      <button class="ah-copy__button" type="button" :title="buttonLabel" :aria-label="buttonLabel" @click="handleCopy">
        <span class="ah-copy__icon" aria-hidden="true" />
      </button>
    </div>
    <span class="ah-copy__feedback" role="status" aria-live="polite">{{ feedback }}</span>
  </div>
</template>
