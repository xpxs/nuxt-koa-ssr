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
        click-mode="push" />
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
            number>
          <Icon 
            slot="prepend" 
            type="md-person" /></Input>
        </FormItem>
        <FormItem 
          label="密码" 
          prop="userPwd">
          <Input 
            v-model="loginForm.userPwd" 
            type="password">
          <Icon 
            slot="prepend" 
            type="md-lock" /></Input>
        </FormItem>
        <FormItem 
          label="验证码" 
          prop="captchaCode">
          <Input 
            v-model="loginForm.captchaCode" 
            class="mr10" 
            style="width: 120px;">
          <Icon 
            slot="prepend" 
            type="ios-create" /></Input>
          <span
            style="position: absolute; right: 0; top: 1px;"
            @click="fnGetCaptcha"
            v-html="captchaData"/>
        </FormItem>
        <FormItem>
          <Button 
            :loading="btnParams.loading"
            :disabled="loginForm.userPwd === '' || loginForm.userName === '' || loginForm.captchaCode === ''"
            type="primary" 
            @click="fnSubmit('loginForm')">{{ btnParams.text }}</Button>
          <Button 
            type="default" 
            style="margin-left: 8px; margin-right: 10px;" 
            @click="fnReset('loginForm')">重置</Button>
          <Checkbox v-model="rememberPassword">记住密码</Checkbox>
        </FormItem>
      </Form>
      </Col>
    </Row>
  </section>
</template>
<script>
import { reqDataMixins } from '~/mixins'
import crypto from 'crypto'
import jwtDecode from 'jwt-decode'
import UUID from 'uuid'
export default {
  mixins: [reqDataMixins],
  fetch({ store, params }) {
    console.log('store.state', store.state)
  },
  data() {
    let vm = this
    const validateUserPwd = (rule, value, callback) => {
      if (value === '') {
        return callback(new Error('*请输入密码'))
      }
      callback()
    }
    const validateUserName = (rule, value, callback) => {
      if (value === '') {
        return callback(new Error('*用户名不能为空'))
      }
      callback()
    }
    const validateCaptcha = (rule, value, callback) => {
      if (value === '') {
        return callback(new Error('*图片验证码不能为空'))
      }
      vm.captchaForm.captchaCode = vm.loginForm.captchaCode
      vm.reqData({
        url: 'checkCaptcha',
        params: 'captchaForm',
        success: res => {
          if (res.data.success) {
            callback()
          } else {
            callback(new Error(res.data.message))
          }
        },
        error: err => {
          vm.utils.catchErrorStatus(err.status, err.data.message)
        }
      })
    }

    return {
      captchaData: '',
      btnParams: {
        loading: false,
        text: '登录'
      },
      rememberPassword: true,
      loginForm: {
        userPwd: '',
        captchaCode: '',
        userName: ''
      },
      captchaForm: {
        captchaUUID: UUID.v1()
      },
      loginFormRule: {
        userPwd: [
          { required: true, validator: validateUserPwd, trigger: 'blur' }
        ],
        userName: [
          { required: true, validator: validateUserName, trigger: 'blur' }
        ],
        captchaCode: [
          { required: true, message: '*图片验证码不能为空', trigger: 'blur' }
        ]
      }
    }
  },
  mounted() {
    let vm = this
    vm.fnGetCaptcha()
    let params = {
      formName: 'loginForm',
      formItems: ['userName', 'userPwd']
    }
    vm.fnGetCookie(params)
  },
  methods: {
    fnSetCookie(params) {
      let vm = this
      if (params.items.length === 0) {
        return false
      }
      for (let i = 0; i <= params.items.length; i++) {
        if (params.items[i] !== undefined) {
          vm.$vueCookies.set(
            params.items[i].name,
            params.items[i].value,
            params.exdays
          )
        }
      }
    },
    //读取cookie
    fnGetCookie(params) {
      let vm = this
      for (let i = 0; i <= params.formItems.length; i++) {
        let value = vm.$vueCookies.get(params.formItems[i])
        vm[params.formName][params.formItems[i]] = value //保存到保存数据的地方
      }
    },
    //清除cookie
    fnClearCookie(params) {
      let vm = this
      for (let i = 0; i <= params.length; i++) {
        vm.$vueCookies.remove(params[i])
      }
    },
    fnGetCaptcha() {
      let vm = this
      vm.reqData({
        url: 'getCaptcha',
        params: 'captchaForm',
        success: res => {
          if (res.data.success) {
            vm.captchaData = res.data.data
          } else {
            vm.utils.errorFn(res.data.message)
          }
        },
        error: err => {
          vm.utils.catchErrorStatus(err.status, err.data.message)
        }
      })
    },
    fnSubmit(name) {
      let vm = this
      vm.$refs[name].validate(valid => {
        if (valid) {
          vm.loginForm.captchaUUID = vm.captchaForm.captchaUUID
          let userPwd = vm.loginForm.userPwd
          let pwdBadge = '%%&%%'
          let fnCryptPwd = ''
          /**
           * [if 当是从cookie取出来的密码]
           * @Author   tanpeng
           * @DateTime 2019-04-19
           * @version  [v1.0]
           * @param    {[type]}   userPwd.indexOf(pwdBadge) >             -1 [description]
           * @return   {[type]}                             [description]
           */
          if (userPwd.indexOf(pwdBadge) > -1) {
            vm.loginForm.userPwd = userPwd.split(pwdBadge)[0]
            fnCryptPwd = userPwd
          } else {
            fnCryptPwd = vm.fnCryptPwd(userPwd)
            vm.loginForm.userPwd = fnCryptPwd.split(pwdBadge)[0]
          }
          vm.fnSubmiting(true, '登录中...')
          vm.reqData({
            url: 'adminLogin',
            params: 'loginForm',
            success: res => {
              if (res.data.success) {
                //设置cookie或者清除cookie
                let params = {
                  items: [
                    {
                      name: 'userName',
                      value: vm.loginForm.userName
                    },
                    {
                      name: 'userPwd',
                      value: fnCryptPwd
                    }
                  ],
                  exdays: '2d',
                  path: '/admin/login'
                }
                if (vm.rememberPassword) {
                  vm.fnSetCookie(params)
                } else {
                  vm.fnClearCookie(['userName', 'userPwd'])
                }
                //登录保持时间
                let thisTime = vm.$moment().valueOf()
                vm.utils.session('a-loginRetentionTime', thisTime)
                vm.utils.messageFn(res.data.message)
                // vm.utils.session('a-token', res.data.data)
                vm.utils.session('a-user', jwtDecode(res.data.data))
                vm.$router.push({ path: '/admin' })
                vm.$store.dispatch('setToken')
                vm.$store.dispatch('setUser', jwtDecode(res.data.data))
              } else {
                vm.utils.errorFn(res.data.message, () => {
                  vm.fnSubmiting(false, '登录')
                  vm.fnGetCaptcha()
                  let params = {
                    formName: 'loginForm',
                    formItems: ['userName', 'userPwd']
                  }
                  vm.fnGetCookie(params)
                })
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
    },
    fnCryptPwd(password) {
      var md5 = crypto.createHash('md5')
      return md5.update(password).digest('hex') + '%%&%%'
    }
  }
}
</script>
