import vue from 'vue'
import { session, localStorageRemoveItem, messageFn } from '@/plugins/utils'
import { commonReq } from '@/api/commonReq'
export const state = () => ({
  tabs: [],
  user: '',
  token: '',
  activeIndex: '/admin',
  locales: ['en', 'zh'],
  locale: null
})
export const mutations = {
  SET_USER(state, user) {
    state.user = user
  },
  ADD_SESSION_TAB(state, tabs) {
    state.tabs = tabs
  },
  //新增tab
  ADD_TAB(state, tab) {
    if (state.tabs === null) {
      state.tabs = []
    }
    state.tabs.push(tab)
    session('a-leftMenus', state.tabs)
  },
  //删除tab
  REMOVE_TAB(state, tab) {
    let tabs = state.tabs
    vue.prototype._.remove(tabs, function(n) {
      return n.path === tab
    })
    state.tabs = tabs
    session('a-leftMenus', state.tabs)
  },
  //清空tab
  DROP_TAB(state, tab) {
    state.tabs.length = 0
    state.tabs = [{ name: '首页', path: '/admin' }]
  },
  SET_ACTIVE_INDEX(state, index) {
    state.activeIndex = index
  },
  SET_TOKEN(state) {
    let token = session('a-token')
    state.token = token
  },
  SET_LANG(state, lang) {
    state.locale = lang
  },
  LOGOUT(state) {
    messageFn('退出成功！')
    localStorageRemoveItem()
    vue.prototype.$vueCookies.remove('jwt')
    state.tabs = []
    state.token = ''
    state.user = ''
  }
}
export const getters = {}
//页面执行方法
export const actions = {
  addSessionTab({ commit }, tabs) {
    commit('ADD_SESSION_TAB', tabs)
  },
  addTab({ commit }, tab) {
    commit('ADD_TAB', tab)
  },
  removeTab({ commit }, tab) {
    commit('REMOVE_TAB', tab)
  },
  dropTab({ commit }) {
    commit('DROP_TAB')
  },
  setActiveIndex({ commit }, index) {
    commit('SET_ACTIVE_INDEX', index)
  },
  setToken({ commit }) {
    commit('SET_TOKEN')
  },
  logout({ commit }) {
    commit('LOGOUT')
  },
  setLang({ commit }, lang) {
    commit('SET_LANG', lang)
  },
  setUser({ commit }, user) {
    commit('SET_USER', user)
  }
}
