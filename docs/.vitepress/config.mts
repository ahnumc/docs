import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "AHNUMC Docs",
  description: "玩家文档",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: '主页', link: '/' },
      { text: '皮肤站', link: 'https://skin.ahnumc.org' },
      { text: '卫星地图', link: 'https://map.ahnumc.srcflow.studio' }
    ],
    sidebar: [
      {
        text: '开始',
        items: [
          { text: '简介', link: '/introduction' },
          { text: '快速开始', link: '/getting-started' }
        ]
      },
      {
        text: '玩法',
        items: [
          { text: '星门', link: '/mechanism/stargate' },
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/ahnumc' }
    ]
  }
})
