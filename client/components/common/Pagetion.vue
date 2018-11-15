<template>
  <div class="page-box">
    <Page 
      :total="params.total"
      :size="params.size"
      :show-elevator="params.showElevator"
      :show-sizer="params.showSizer"
      :show-total="params.showTotal" />
  </div>
</template>
<script>
export default {
  props: {
    params: {
      type: Object,
      required: true,
      default() {
        return {}
      }
    }
  }
}
</script>
<style scoped>
.page-box {
  padding: 10px;
  background: #fff;
}
</style>
