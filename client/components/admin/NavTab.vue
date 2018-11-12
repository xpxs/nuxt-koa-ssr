<template>
  <div class="nav-tab">
    <Button 
      type="primary" 
      size="small"
      to="/admin">首页</Button>
    <Button 
      type="primary" 
      size="small" 
      to="/admin/users">用户管理 <Icon type="ios-close" /></Button>
  </div>
</template>
<script>
export default {
  data() {
    return {
      tab0: true,
      tab1: true,
      tab2: true
    }
  },
  methods: {
    handleTabRemove(data) {
      console.log('data', data)
    }
  }
}
</script>
