<template>
  <Table
    :loading="params.loading"
    :columns="params.columns" 
    :data="params.data"
    border/>
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
  data() {
    return {}
  },
  computed: {},
  methods: {}
}
</script>
