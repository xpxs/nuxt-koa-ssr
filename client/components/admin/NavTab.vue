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
  methods: {
    handleTabRemove(data) {
      console.log('data', data)
      this.$store.dispatch('removeTab', data)
      let tabs = this.$store.state.tabs
      let path = tabs[tabs.length - 1].path
      this.$store.dispatch('setActiveIndex', path)
      this.$router.push({ path: path })
    },
    fnOnClick(data) {
      this.$store.dispatch('setActiveIndex', data)
      this.$router.push({ path: data })
    }
  }
}
</script>
