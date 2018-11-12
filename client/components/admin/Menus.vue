<template>
  <Menu 
    theme="light"
    accordion
    class="left-nav-width">
    <template v-for="item in navData">
      <Submenu 
        v-if="item.children.length > 0"
        :key="item.id"
        :name="item.id">
        <template slot="title">
          <Icon :type="item.icon" />
          {{ item.label }}
        </template>
        <MenuItem 
          v-for="cItem in item.children"
          :key="cItem.id"
          :name="cItem.id" 
          :to="cItem.route" 
          replace>{{ cItem.label }}</MenuItem>
      </Submenu>
      <MenuItem 
        v-else
        :key="item.id"
        :name="item.id"
        :to="item.route">
      <Icon 
        :key="item.id" 
        :type="item.icon" 
      />
      {{ item.label }}
      </MenuItem>
    </template>
  </Menu>
</template>
<script>
export default {
  data() {
    return {
      navData: [
        {
          label: '首页',
          route: '/admin',
          id: '0',
          icon: 'ios-home',
          parentId: '',
          children: []
        },
        {
          label: '基础管理',
          route: '',
          id: '1',
          icon: 'ios-settings',
          parentId: '',
          children: [
            {
              label: '用户管理',
              route: '/admin/users',
              id: '1-1',
              icon: '',
              parentId: '',
              children: []
            },
            {
              label: '岗位管理',
              route: '/admin/posts',
              id: '1-2',
              icon: '',
              parentId: '',
              children: []
            },
            {
              label: '系统管理',
              route: '/admin/systems',
              id: '1-3',
              icon: '',
              parentId: '',
              children: []
            }
          ]
        },
        {
          label: '新闻管理',
          route: '/admin/news',
          id: '2',
          icon: 'ios-paper',
          parentId: '',
          children: [
            {
              label: '行业新闻',
              route: '/admin/industrynews',
              id: '2-1',
              icon: '',
              parentId: '2',
              children: []
            },
            {
              label: '官方新闻',
              route: '/admin/news',
              id: '2-2',
              icon: '',
              parentId: '2',
              children: []
            }
          ]
        },
        {
          label: '权限管理',
          route: '',
          id: '3',
          icon: 'ios-key',
          parentId: '',
          children: [
            {
              label: '菜单管理',
              route: '/admin/menus',
              id: '3-1',
              icon: '',
              parentId: '3',
              children: []
            },
            {
              label: '角色管理',
              route: '/admin/roles',
              id: '3-2',
              icon: '',
              parentId: '3',
              children: []
            }
          ]
        }
      ]
    }
  }
}
</script>
