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
    state.tabs.push(tab)
  },
  //清空tab
  DROP_TAB(state, tab) {
    state.tabs.length = 0
    state.tabs = [{ name: '首页', path: '/admin' }]
  }
}
export const getters = {}
export const actions = {
  addTab({ commit }, tab) {
    commit('ADD_TAB', tab)
  },
  removeTab({ commit }, tab) {
    commit('REMOVE_TAB', tab)
  },
  dropTab({ commit }) {
    commit('DROP_TAB')
  }
}
