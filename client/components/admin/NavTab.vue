<template>
  <div class="nav-tab">
    <Tabs
      :value="activeIndex"
      type="card"
      @on-click="fnOnClick"
      @on-tab-remove="handleTabRemove">
      <TabPane 
        v-for="item in tabs" 
        :label="item.name"
        :closable="item.path !== '/admin'" 
        :key="item.id" 
        :name="item.path"/>
    </Tabs>
  </div>
</template>
<script>
export default {
  data() {
    return {}
  },
  computed: {
    tabs() {
      return this.$store.state.tabs
    },
    activeIndex() {
      return this.$store.state.activeIndex
    }
  },
  mounted() {
    let vm = this
    //获得当前路由
    let pathname = location.pathname
    vm.$store.dispatch('setActiveIndex', pathname)
    vm.$router.push({ path: pathname })
    //获得localStorge里的打开菜单的数据
    let tabs = vm.utils.session('leftMenus')
    vm.$store.dispatch('addSessionTab', tabs)
  },
  methods: {
    handleTabRemove(data) {
      console.log('data', data)
      let vm = this
      vm.$store.dispatch('removeTab', data)
      let tabs = vm.$store.state.tabs
      let path = tabs[tabs.length - 1].path
      vm.$store.dispatch('setActiveIndex', path)
      vm.$router.push({ path: path })
    },
    fnOnClick(data) {
      let vm = this
      vm.$store.dispatch('setActiveIndex', data)
      vm.$router.push({ path: data })
    }
  }
}
</script>
