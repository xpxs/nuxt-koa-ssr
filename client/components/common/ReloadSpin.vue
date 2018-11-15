<template>
  <Spin 
    v-if="spinShow"
    size="large"
    fix/>
</template>
<script>
export default {
  props: {
    spinShow: {
      type: Boolean,
      required: true,
      default() {
        return false
      }
    }
  }
}
</script>
