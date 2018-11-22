<template>
  <div>
    <Menu
      v-show="collapsed"
      :active-name="activeIndex"
      :class="{'left-nav-width-collapsed': !collapsed}"
      theme="light"
      accordion
      class="left-nav-width"
      @on-select="fnOnSelect">
      <template v-for="item in navData">
        <Submenu 
          v-if="item.children.length > 0"
          :key="item.id"
          :name="item.label + '!!' + item.route">
          <template slot="title">
            <Icon :type="item.icon" />
            {{ item.label }}
          </template>
          <MenuItem 
            v-for="cItem in item.children"
            :key="cItem.id"
            :name="cItem.label + '!!' + cItem.route" 
            :to="cItem.route" 
            replace>{{ cItem.label }}</MenuItem>
        </Submenu>
        <MenuItem 
          v-else
          :key="item.id"
          :name="item.label + '!!' + item.route"
          :to="item.route">
        <Icon 
          :key="item.id" 
          :type="item.icon" 
        />
        {{ item.label }}
          </MenuItem>
      </template>
    </Menu>
    <div 
      v-show="!collapsed" 
      class="menu-collapsed">
      <template v-for="item in navData">
        <Poptip
          v-if="item.children.length === 0"
          :key="item.id"
          trigger="hover"
          placement="right">
          <template slot="content">
            <span
              @click="fnOnSelect(item.label + '!!' + item.route)">{{ item.label }}</span>
          </template>
          <Icon :type="item.icon"/>
        </Poptip>
        <Dropdown 
          v-else
          :key="item.id"
          placement="right"
          @on-click="fnOnSelect">
          <a href="javascript:void(0)">
            <Icon :type="item.icon"/>
          </a>
          <DropdownMenu 
            slot="list">
            <DropdownItem 
              v-for="cItem in item.children"
              :name="cItem.label + '!!' + cItem.route" 
              :key="cItem.id">{{ cItem.label }}</DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </template>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    collapsed: {
      type: Boolean,
      required: true,
      default() {
        return false
      }
    }
  },
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
  },
  computed: {
    activeIndex() {
      let vm = this
      let name = ''
      vm.$store.state.tabs.forEach((value, index) => {
        if (value.path === vm.$store.state.activeIndex) {
          name = value.name + '!!' + value.path
        }
      })
      return name
    }
  },
  methods: {
    fnOnSelect(value) {
      let vm = this
      let path = value.split('!!')[1]
      let name = value.split('!!')[0]
      let tab = { name: name, path: path }
      vm.$store.dispatch('setActiveIndex', path)
      vm.$router.push({ path: path })
      if (
        vm._.findIndex(vm.$store.state.tabs, tab) < 1 &&
        path !== '/admin' &&
        name !== '首页'
      ) {
        vm.$store.dispatch('addTab', tab)
      }
    }
  }
}
</script>
<style scoped lang="scss">
.menu-collapsed {
  width: 60px;
  .ivu-poptip,
  .ivu-dropdown {
    text-align: center;
    cursor: pointer;
    width: 60px;
    line-height: 50px;
    position: relative;
  }
}
</style>
