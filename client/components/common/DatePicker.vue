<template>
  <DatePicker 
    :value="value"
    :type="parmas.type"
    placeholder="请选择时间"
    @on-change="fnOnChange"/>
</template>
<script>
export default {
  props: {
    parmas: {
      type: Object,
      required: true,
      default() {
        return {
          type: 'date'
        }
      }
    }
  },
  data() {
    return {
      value: this.parmas.value
    }
  },
  mounted() {
    this.value = this.parmas.value
  },
  methods: {
    fnOnChange(val) {
      this.$emit('fnChange', val)
    }
  }
}
</script>
