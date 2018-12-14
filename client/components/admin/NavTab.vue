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
    //获得localStorge里的打开菜单的数据
  },
  methods: {
    handleTabRemove(data) {
      let vm = this
      let index = vm._.findIndex(vm.$store.state.tabs, { path: data })
      let path = vm.$store.state.tabs[index - 1].path
      vm.$router.push({ path: path })
      vm.$store.dispatch('setActiveIndex', path)
      vm.$store.dispatch('removeTab', data)
    },
    fnOnClick(data) {
      let vm = this
      vm.$store.dispatch('setActiveIndex', data)
      vm.$router.push({ path: data })
    }
  }
}
</script>
