<template>
  <Layout style="height: 100%;">
    <Layout class="h64">
      <Sider 
        hide-trigger 
        class="extend-sider">
        <h1 align="center">admin</h1>
      </Sider>
      <Content class="extend-header">
        <div class="left-nav">
          <nuxt-link 
            to="/" 
            class="on"><Icon type="ios-globe" /> 网站管理</nuxt-link>
          <nuxt-link to="/admin/login"><Icon type="ios-flower" /> 公众号管理</nuxt-link>
        </div>
        <div class="right-nav">
          <Button 
            type="primary" 
            @click="collapsed = !collapsed">切换</Button>
          <Badge dot>
            <Avatar 
              shape="circle" 
              icon="md-notifications" 
              title="系统信息"/>
          </Badge>
          <Badge dot>
            <Avatar 
              shape="circle"
              icon="md-person" 
              title="用户信息"/>
          </Badge>
          <Badge>
            <Avatar 
              shape="circle" 
              icon="md-lock" 
              title="锁住账户"/>
          </Badge>
          <Badge>
            <Avatar 
              shape="circle" 
              icon="md-power" 
              title="退出账户"/>
          </Badge>
        </div>
      </Content>
    </Layout>
    <Layout style="height: 100%;">
      <Sider 
        :class="{'extend-collapsed-sider':!collapsed}" 
        hide-trigger
        class="extend-sider">
        <menus :collapsed="collapsed"/>
      </Sider>
      <Content class="extend-content">
        <nav-tab/>
        <div class="containter">
          <nuxt/>
        </div>
      </Content>
    </Layout>
  </Layout>
</template>
<script>
import Menus from '@/components/admin/Menus.vue'
import NavTab from '@/components/admin/NavTab.vue'
export default {
  components: {
    menus: Menus,
    'nav-tab': NavTab
  },
  data() {
    return {
      collapsed: true
    }
  },
  mounted() {
    let vm = this
    //获得当前路由
    let pathname = location.pathname
    vm.$store.dispatch('setActiveIndex', pathname)
    vm.$router.push({ path: pathname })
    let tabs = vm.utils.session('a-leftMenus')
    if (!tabs) {
      tabs = [{ name: '首页', path: '/admin' }]
      vm.utils.session('a-leftMenus', tabs)
    }
    vm.$store.dispatch('addSessionTab', tabs)
  }
}
</script>
