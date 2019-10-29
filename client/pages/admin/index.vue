<template>
  <Row>
    <Col span="12"> </Col>
    <Col 
      v-if="$store.state.user" 
      span="12">{{ $store.state.user.id }}</Col>
  </Row>
</template>
<script>
export default {
  layout: 'layoutAdmin',
  components: {},
  data() {
    return {}
  },
  methods: {}
}
</script>
