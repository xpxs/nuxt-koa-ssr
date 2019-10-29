<template>
  <Form
    ref="form"
    :model="form"
    :label-width="60"
    label-position="right"
    inline
  >
    <FormItem
      v-for="item in params.items"
      :key="item.id"
      :label="item.label"
      :prop="item.prop"
    >
      <template v-if="item.type === 'date' || item.type === 'daterange'">
        <DatePicker
          v-model="form[item.prop]"
          :type="item.type"
          :placeholder="item.placeholder"
        />
      </template>
      <template v-else-if="item.type === 'select'">
        <Select 
          v-model="form[item.prop]" 
          style="width:100px">
          <Option
            v-for="opt in item.opitions"
            :value="opt.value"
            :key="opt.value"
          >{{ opt.label }}</Option
          >
        </Select>
      </template>
      <template v-else>
        <Input
          v-model="form[item.prop]"
          :type="item.type"
          :placeholder="item.placeholder"
        >
        </Input>
      </template>
    </FormItem>
    <FormItem>
      <Button 
        class="ml-bear-60" 
        type="primary" 
        @click="fnSubmit('form', 1)"
      >查询</Button
      >
      <Button @click="fnSubmit('form', 2)">重置</Button>
    </FormItem>
  </Form>
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
    return {
      form: {}
    }
  },
  methods: {
    fnSubmit(name, type) {
      let vm = this
      if (type === 2) {
        vm.$refs[name].resetFields()
      }
      vm.$emit('fnChangeForm', vm.form)
    }
  }
}
</script>
<style scoped>
.ivu-form-item {
  margin-bottom: 10px;
}
.ml-bear-60 {
  margin-left: -60px;
}
</style>
