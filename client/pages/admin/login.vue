<template>
  <section class="container">
    <div class="particles">
      <vue-particles
        :particle-opacity="0.7"
        :particles-number="80"
        :particle-size="4"
        :lines-width="1"
        :line-linked="true"
        :line-opacity="0.4"
        :lines-distance="150"
        :move-speed="3"
        :hover-effect="true"
        :click-effect="true"
        color="#dedede"
        shape-type="circle"
        lines-color="#dedede"
        hover-mode="grab"
        click-mode="push"
      />
    </div>
    <Row>
      <Col 
        :xs="{ span: 18, offset: 3 }"
        :sm="{ span: 12, offset: 6 }"
        :md="{ span: 8, offset: 8 }"
        :lg="{ span: 6, offset: 9 }"
        class="login-form">
      <h1 class="tc mt20">登 录</h1>
      <Form 
        ref="loginForm"
        :model="loginForm" 
        :rules="loginFormRule" 
        :label-width="60">
        <FormItem 
          label="用户名" 
          prop="username">
          <Input 
            v-model="loginForm.username" 
            type="text" 
            number><Icon 
              slot="prepend" 
              type="md-person"/></Input>
        </FormItem>
        <FormItem 
          label="密码" 
          prop="password">
          <Input 
            v-model="loginForm.password" 
            type="password"><Icon 
              slot="prepend" 
              type="md-lock"/></Input>
        </FormItem>
        <FormItem>
          <Button 
            :disabled="submitOnce" 
            type="primary" 
            @click="fnSubmit('loginForm')">登录</Button>
          <Button 
            type="default" 
            style="margin-left: 8px" 
            @click="fnReset('loginForm')">重置</Button>
        </FormItem>
      </Form>
      </Col>
    </Row>
  </section>
</template>
<script>
export default {
  data() {
    const validatePassword = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('*请输入密码'))
      } else {
        callback()
      }
    }
    const validateUsername = (rule, value, callback) => {
      if (value === '') {
        return callback(new Error('*用户名不能为空'))
      }
      callback()
    }

    return {
      submitOnce: false,
      loginForm: {
        password: '',
        username: ''
      },
      loginFormRule: {
        password: [
          { required: true, validator: validatePassword, trigger: 'blur' }
        ],
        username: [
          { required: true, validator: validateUsername, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    fnSubmit(name) {
      let vm = this
      vm.$refs[name].validate(valid => {
        if (valid) {
          vm.submitOnce = true
          vm.$Message.success({
            content: '表单验证成功',
            onClose: function() {
              vm.submitOnce = false
            }
          })
        } else {
          vm.submitOnce = true
          vm.$Message.error({
            content: '表单验证失败',
            onClose: function() {
              vm.submitOnce = false
            }
          })
        }
      })
    },
    fnReset(name) {
      this.$refs[name].resetFields()
    }
  }
}
</script>
