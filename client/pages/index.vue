<template>
  <section class="container">
    <Row>
      <Col span="12">
      <btn-count-down :parmas="parmas"/>
      <date-picker 
        :parmas="dateParmas" 
        @fnChange="fnDateValue"/>
      </Col>
      <Col span="12">col-12</Col>
    </Row>
  </section>
</template>
<script>
import BtnCountDown from '~/components/common/BtnCountDown.vue'
import DatePicker from '~/components/common/DatePicker.vue'
export default {
  components: {
    'btn-count-down': BtnCountDown,
    'date-picker': DatePicker
  },
  data() {
    return {
      dateParmas: {
        type: 'daterange'
      },
      parmas: {
        mobile: '13562014710'
      }
    }
  },
  methods: {
    fnDateValue(data) {
      console.log('data', data)
    }
  }
}
</script>
<style scoped>
.title {
  margin: 50px 0;
}
</style>
