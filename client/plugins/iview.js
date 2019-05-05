import Vue from 'vue'
import iView from 'iview'
import 'iview/dist/styles/iview.css'
import en from 'iview/dist/locale/en-US'
import zh from 'iview/dist/locale/zh-CN'

// Vue.use(iView)
// After plugin: i18n.js
export default ({ store: { state } }) => {
  const locale = state.locale === 'en' ? en : zh
  Vue.use(iView, { locale })
}
