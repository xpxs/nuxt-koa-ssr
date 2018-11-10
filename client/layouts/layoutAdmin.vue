<template>
  <Layout>
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
            <Icon 
              type="md-notifications" 
              title="系统信息" />
          </Badge>
          <Badge dot>
            <Icon 
              type="md-person" 
              title="用户信息" />
          </Badge>
          <Badge>
            <Icon 
              type="md-lock" 
              title="锁住账户"/>
          </Badge>
          <Badge>
            <Icon 
              type="md-power" 
              title="退出账户"/>
          </Badge>
        </div>
      </Content>
    </Layout>
    <Layout>
      <Sider 
        hide-trigger 
        class="extend-sider">Sider</Sider>
      <Content class="extend-content"><nuxt/></Content>
    </Layout>
  </Layout>
</template>
