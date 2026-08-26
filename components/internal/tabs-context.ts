import type { InjectionKey, Ref } from 'vue'

export interface TabsContext {
  activeLabel: Ref<string>
  instanceId: string
  select: (label: string) => void
  tabId: (label: string) => string
  panelId: (label: string) => string
}

export const tabsKey: InjectionKey<TabsContext> = Symbol('ahnumc-tabs')
