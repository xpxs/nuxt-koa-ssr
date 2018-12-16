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
          prop="userName">
          <Input 
            v-model="loginForm.userName" 
            type="text" 
            number><Icon 
              slot="prepend" 
              type="md-person"/></Input>
        </FormItem>
        <FormItem 
          label="密码" 
          prop="userPwd">
          <Input 
            v-model="loginForm.userPwd" 
            type="password"><Icon 
              slot="prepend" 
              type="md-lock"/></Input>
        </FormItem>
        <FormItem>
          <Button 
            :loading="btnParams.loading"
            :disabled="loginForm.userPwd === '' || loginForm.userName === ''"
            type="primary" 
            @click="fnSubmit('loginForm')">{{ btnParams.text }}</Button>
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
import { reqDataMixins } from '~/mixins'
export default {
  mixins: [reqDataMixins],
  fetch({ store, params }) {
    console.log('store.state', store.state)
  },
  data() {
    const validateUserPwd = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('*请输入密码'))
      } else {
        callback()
      }
    }
    const validateUserName = (rule, value, callback) => {
      if (value === '') {
        return callback(new Error('*用户名不能为空'))
      }
      callback()
    }

    return {
      btnParams: {
        loading: false,
        text: '登录'
      },
      loginForm: {
        userPwd: '',
        userName: ''
      },
      loginFormRule: {
        userPwd: [
          { required: true, validator: validateUserPwd, trigger: 'blur' }
        ],
        userName: [
          { required: true, validator: validateUserName, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    fnSubmit(name) {
      let vm = this
      vm.$refs[name].validate(valid => {
        if (valid) {
          vm.fnSubmiting(true, '登录中...')
          vm.reqData({
            url: 'adminLogin',
            params: 'loginForm',
            success: res => {
              if (res.data.success) {
                vm.utils.messageFn(res.data.message)
                vm.utils.session('a-token', res.data.data)
                vm.$router.push({ path: '/admin' })
                vm.$store.dispatch('setToken')
              } else {
                vm.utils.errorFn(res.data.message)
              }
            },
            error: err => {
              vm.utils.catchErrorStatus(err.status, err.data.message, () => {
                vm.fnSubmiting(false, '登录')
              })
            }
          })
        } else {
          vm.submitOnce = true
          vm.$Message.error({
            content: '表单验证失败',
            onClose: function() {
              vm.fnSubmiting(false, '登录')
            }
          })
        }
      })
    },
    fnReset(name) {
      this.$refs[name].resetFields()
      this.fnSubmiting(false, '登录')
    }
  }
}
</script>
