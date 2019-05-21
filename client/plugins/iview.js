import Vue from 'vue'
import iView from 'iview'
import 'iview/dist/styles/iview.css'
import en from 'iview/dist/locale/en-US'
import zh from 'iview/dist/locale/zh-CN'

// Vue.use(iView)
// After plugin: i18n.js
export default ({ app }) => {
  // console.log('app.store.state', app.store.state)
  // const locale = app.store.state.locale === 'en' ? zh : en
  const locale = app.store.state.locale === 'en' ? en : zh
  Vue.use(iView, { locale })
}
