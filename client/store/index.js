import vue from 'vue'
export const state = () => ({
  tabs: [],
  activeIndex: '/admin'
})
export const mutations = {
  ADD_SESSION_TAB(state, tabs) {
    state.tabs = tabs
  },
  //新增tab
  ADD_TAB(state, tab) {
    if (state.tabs === null) {
      state.tabs = []
    }
    state.tabs.push(tab)
    vue.prototype.utils.session('a-leftMenus', state.tabs)
  },
  //删除tab
  REMOVE_TAB(state, tab) {
    vue.prototype._.remove(state.tabs, function(n) {
      return n.path === tab
    })
    vue.prototype.utils.session('a-leftMenus', state.tabs)
  },
  //清空tab
  DROP_TAB(state, tab) {
    state.tabs.length = 0
    state.tabs = [{ name: '首页', path: '/admin' }]
  },
  SET_ACTIVE_INDEX(state, index) {
    state.activeIndex = index
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
  }
}
