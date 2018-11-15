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
          <nuxt-link to="/"><Icon type="ios-flower" /> 公众号管理</nuxt-link>
        </div>
        <div class="right-nav">
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
        hide-trigger 
        class="extend-sider">
        <menus/>
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
    return {}
  }
}
</script>
