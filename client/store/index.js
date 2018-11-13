import vue from 'vue'
export const state = () => ({
  tabs: [{ name: '首页', path: '/admin' }],
  activeIndex: '/admin'
})
export const mutations = {
  //新增tab
  ADD_TAB(state, tab) {
    state.tabs.push(tab)
  },
  //删除tab
  REMOVE_TAB(state, tab) {
    vue.prototype._.remove(state.tabs, function(n) {
      return n.path === tab
    })
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
