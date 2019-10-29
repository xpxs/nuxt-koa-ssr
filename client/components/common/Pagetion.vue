<template>
  <div class="page-box">
    <Page
      :total="params.total"
      :size="params.size"
      :show-elevator="params.showElevator"
      :show-sizer="params.showSizer"
      :show-total="params.showTotal"
      @on-page-size-change="fnPageSizeChange"
      @on-change="fnPageNumChange"
    />
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
  },
  methods: {
    fnPageNumChange(val) {
      this.$emit('fnPageNumChange', val)
    },
    fnPageSizeChange(val) {
      this.$emit('fnPageSizeChange', val)
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
