<template>
  <section 
    class="container tc pt100">
    <img 
      src="/img/404.svg"
      width="500" 
      alt="404图片">
    <p class="mt20 mb20 font18">Sorry！您找的页面已飞向天空，请回到首页继续寻找</p>
    <nuxt-link 
      v-if="error.statusCode === 404" 
      class="button" 
      to="/"><Button 
        type="primary" 
        icon="ios-arrow-back">返回首页</Button>
    </nuxt-link>
  </section>
</template>
<script>
export default {
  layout: 'layout404',
  props: {
    error: {
      type: Object,
      required: true,
      default() {
        return {}
      }
    }
  },
  data() {
    return {}
  }
}
</script>
