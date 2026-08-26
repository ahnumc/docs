<script setup lang="ts">
withDefaults(defineProps<{
  name: string
  address: string
  status?: 'online' | 'offline' | 'maintenance'
  players?: number
  maxPlayers?: number
  version?: string
  latency?: number
}>(), {
  status: 'online',
})

const statusLabels = {
  online: '运行中',
  offline: '离线',
  maintenance: '维护中',
}
</script>

<template>
  <section class="ah-server" :class="`ah-server--${status}`" :aria-label="`${name}服务器状态`">
    <header class="ah-server__header">
      <div>
        <h3 class="ah-server__name">{{ name }}</h3>
        <code class="ah-server__address">{{ address }}</code>
      </div>
      <span class="ah-server__state">
        <span class="ah-server__dot" aria-hidden="true" />
        {{ statusLabels[status] }}
      </span>
    </header>
    <dl v-if="players !== undefined || version || latency !== undefined" class="ah-server__meta">
      <div v-if="players !== undefined">
        <dt>在线玩家</dt>
        <dd>{{ players }}<template v-if="maxPlayers !== undefined"> / {{ maxPlayers }}</template></dd>
      </div>
      <div v-if="version">
        <dt>游戏版本</dt>
        <dd>{{ version }}</dd>
      </div>
      <div v-if="latency !== undefined">
        <dt>延迟</dt>
        <dd>{{ latency }} ms</dd>
      </div>
    </dl>
  </section>
</template>
