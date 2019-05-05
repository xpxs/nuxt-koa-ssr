import Vue from 'vue'
import VueI18n from 'vue-i18n'

export default ({ app, store, req }) => {
  Vue.use(VueI18n)
  if (process.server) {
    const Negotiator = require('negotiator')
    const negotiator = new Negotiator(req)
    const lang = negotiator.language(store.state.locales)
    store.commit('SET_LANG', lang || 'zh')
  }

  // 项目包含的语言
  let en = require('@/locales/en.json')
  let zh = require('@/locales/zh.json')

  // 设置全局 i18n
  // 可以用于 middleware 和 pages asyncData/fetch
  app.i18n = new VueI18n({
    locale: store.state.locale || 'zh',
    fallbackLocale: 'zh',
    messages: { en, zh }
  })
}
