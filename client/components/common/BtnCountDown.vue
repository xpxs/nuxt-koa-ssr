<template>
  <Button 
    :disabled="btnDisabled || !sendMsgOnce"
    type="primary"
    @click="fnSendMsg">{{ btnText }}</Button>
</template>
<script>
import { commonReq } from '@/api/commonReq'
export default {
  props: {
    parmas: {
      type: Object,
      required: true,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      btnText: '发送验证码',
      btnDisabled: false,
      sendMsgOnce: true,
      interVal: null
    }
  },
  methods: {
    async fnSendMsg() {
      let vm = this
      vm.sendMsgOnce = false
      let result = await commonReq('sendMsg', vm.parmas)
      if (result.success) {
        vm.interVal = window.setInterval(() => {
          if (curCount === 0) {
            window.clearInterval(vm.interVal) // 停止计时器
            vm.btnText = '发送验证码' //按钮文字
            vm.btnDisabled = false //按钮状态
            vm.sendMsgOnce = true //按钮控制发送
          } else {
            vm.btnDisabled = true
            curCount--
            vm.btnText = curCount + '后重新发送'
          }
        }, 1000)
      } else {
        vm.sendMsgOnce = true //按钮控制发送
        vm.utils.errorFn(error.message)
      }
    }
  }
}
</script>
