<template>
  <section class="container">
    <Row>
      <Col span="12">
      <btn-count-down :parmas="parmas"/>
      </Col>
      <Col span="12">col-12</Col>
    </Row>
  </section>
</template>
<script>
import BtnCountDown from '~/components/common/BtnCountDown.vue'
export default {
  components: {
    'btn-count-down': BtnCountDown
  },
  data() {
    return {
      parmas: {
        mobile: '13562014710'
      }
    }
  }
}
</script>
<style scoped>
.title {
  margin: 50px 0;
}
</style>
