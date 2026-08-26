import DefaultTheme from 'vitepress/theme'
import type { Theme } from 'vitepress'

import CopyField from '../../../components/CopyField.vue'
import DownloadCard from '../../../components/DownloadCard.vue'
import NoticeBox from '../../../components/NoticeBox.vue'
import ServerStatus from '../../../components/ServerStatus.vue'
import StepItem from '../../../components/StepItem.vue'
import StepList from '../../../components/StepList.vue'
import TabItem from '../../../components/TabItem.vue'
import Tabs from '../../../components/Tabs.vue'
import '../../../components/styles.css'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component('CopyField', CopyField)
    app.component('DownloadCard', DownloadCard)
    app.component('NoticeBox', NoticeBox)
    app.component('ServerStatus', ServerStatus)
    app.component('StepItem', StepItem)
    app.component('StepList', StepList)
    app.component('TabItem', TabItem)
    app.component('Tabs', Tabs)
  },
} satisfies Theme
