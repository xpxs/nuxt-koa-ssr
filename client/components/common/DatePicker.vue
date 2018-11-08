<template>
  <DatePicker 
    :value="value"
    :type="parmas.type"
    placeholder="请选择时间"/>
</template>
<script>
export default {
  props: {
    parmas: {
      type: Object,
      required: true,
      default() {
        return {
          type: 'date',
          value: ''
        }
      }
    }
  },
  data() {
    return {
      value: this.parmas.value
    }
  },
  watch: {
    value(val) {
      console.log('val', val)
      this.$emit('fnChange', val)
    }
  },
  mounted() {
    this.value = this.parmas.value
  }
}
</script>
