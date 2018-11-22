'use strict'
import Vue from 'vue'
import { getData } from '@/api/axios.js'

/**
 * [获取与存储sessionStorage]
 * @Author   tanpeng
 * @DateTime 2018-11-02
 * @version  [v1.0]
 * @param    {String}   key   [存储或获取sessionStorage的KEY值]
 * @param    {Object}   value [存储sessionStorage的KEY值]
 * @return   {[type]}         [description]
 */
export const session = (key = '', value) => {
  if (value === undefined) {
    let lsVal = localStorage.getItem(key)
    if (lsVal && lsVal.indexOf('autostringify-') === 0) {
      return JSON.parse(lsVal.split('autostringify-')[1])
    }
    return lsVal
  }
  if (typeof value === 'object' || Array.isArray(value)) {
    value = 'autostringify-' + JSON.stringify(value)
  }
  return localStorage.setItem(key, value)
}

/**
 * [基于iview $message组件封装的函数]
 * @Author   tanpeng
 * @DateTime 2018-11-01
 * @version  [v1.0]
 * @param    {String}   type     [信息类型]
 * @param    {String}   msg      [信息文本]
 * @param    {Number}   duration [延时关闭]
 * @param    {Boolean}  closable [是否有关闭按钮]
 * @param    {Function} fn       [关闭回调]
 * @return   {[type]}            [description]
 */
export const messageFn = (
  type = 'success',
  content = '操作成功',
  duration = 1.5,
  closable = false,
  fn = () => {
    return false
  }
) => {
  if (content === undefined || typeof content === 'function') {
    content = type
    title = 'success'
  }
  let params = {
    content: content,
    duration: duration,
    closable: closable,
    onClose: fn
  }
  let Message = Vue.prototype.$Message
  switch (type) {
    case 'success':
      Message.success(params)
      break
    case 'error':
      Message.error(params)
      break
    case 'warning':
      Message.warning(params)
      break
    case 'info':
      Message.info(params)
      break
    default:
      Message.success(params)
  }
}

export const errorFn = (
  title = '错误提示',
  content,
  fn = () => {
    return false
  }
) => {
  if (content === undefined || typeof content === 'function') {
    content = title
    title = '错误提示'
  }
  Vue.prototype.$Modal.error({
    title: title,
    content: content,
    'mask-closable': false,
    onOk: fn
  })
}

/**
 * [请求访问封装处理]
 * @Author   tanpeng
 * @DateTime 2018-11-01
 * @version  [v1.0]
 * @param    {Object}   error [请求错误]
 * @return   {[type]}         [返回Promise.reject]
 */
export const catchError = (error = {}) => {
  if (error.response) {
    switch (error.response.status) {
      case 400:
        errorFn(error.response.data.message || '请求参数异常！')
        break
      case 401:
        errorFn(error.response.data.message || '密码错误或账号不存在！')
        break
      case 403:
        errorFn(error.response.data.message || '无访问权限，请联系企业管理员！')
        break
      default:
        errorFn(error.response.data.message || '无访问权限，请联系企业管理员！')
      // Vue.prototype.$Modal.error({
      //   title: '错误提示',
      //   content: error.response.data.message || '服务端异常，请联系技术支持',
      //   onOk: () => {
      //     return false
      //   }
      // })
    }
  }
  return Promise.reject(error)
}

/**
 * [变换数字带万、亿字符串的函数]
 * @Author   tanpeng
 * @DateTime 2018-11-01
 * @version  [v1.0]
 * @param    {Number}   value [需要变换的数字]
 * @return   {[type]}         [返回的带万、亿、万亿字符串的数字]
 */
export const addUnit = (value = 0) => {
  if (typeof numberValue !== 'number') {
    messageFn('error', '参数不正确')
    return false
  }
  let numberValueStr = numberValue + ''
  let decimals = ''
  if (numberValueStr.split('.').length > 1) {
    decimals = '.' + numberValueStr.split('.')[1]
  }
  let unitThan = numberValueStr.split('.')[0] / 10000
  if (unitThan > 1) {
    let unitThanStr = unitThan.toFixed(4) + ''
    let _unitThanStr =
      unitThanStr.split('.')[0] + '<span>万</span>' + unitThanStr.split('.')[1]
    let unitMillion = _unitThanStr.split('<span>万</span>')[0] / 10000
    if (unitMillion > 1) {
      let unitMillionStr = unitMillion.toFixed(4) + ''
      let _unitMillionStr =
        unitMillionStr.split('.')[0] +
        '<span>亿</span>' +
        unitMillionStr.split('.')[1] +
        '<span>万</span>' +
        _unitThanStr.split('<span>万</span>')[1]
      let unitTrillion = _unitMillionStr.split('<span>亿</span>')[0] / 10000
      if (unitTrillion > 1) {
        let unitTrillionStr = unitTrillion.toFixed(4) + ''
        let _unitTrillionStr =
          unitTrillionStr.split('.')[0] +
          '<span>万亿</span>' +
          unitTrillionStr.split('.')[1] +
          '<span>亿</span>' +
          _unitMillionStr.split('<span>亿</span>')[1]
        return _unitTrillionStr + decimals
      }
      return _unitMillionStr + decimals
    }
    return _unitThanStr + decimals
  }
  return value + decimals
}

/**
 * [首字母大写]
 * @Author   tanpeng
 * @DateTime 2018-11-01
 * @version  [v1.0]
 * @param    {String}   str [英文字符]
 * @return   {[type]}       [英文字符首字母大写后的字符]
 */
export const firstUpperCase = (str = '') => {
  let first = str[0].toUpperCase()
  return str.replace(str[0], first)
}

/**
 * [把数字按照千分号隔开。例1,000,000]
 * @Author   tanpeng
 * @DateTime 2018-11-01
 * @version  [v1.0]
 * @param    {Number}   num [数字]
 * @return   {[type]}       [返回千分隔开的字符串]
 */
export const toThousands = (num = 0) => {
  num = num || 0
  let result = ''
  num = Number(num.toString() || 0).toFixed(2)
  let numAry = num.toString().split('.')
  let preNum = numAry[0]
  let lastNum = numAry[1]
  while (preNum.length > 3) {
    result = ',' + preNum.slice(-3) + result
    preNum = preNum.slice(0, preNum.length - 3)
  }
  if (preNum) {
    result = preNum + result
  }
  result = result + '.' + lastNum

  return result
}

/**
 * [把数字按照四个数字用空格隔开]
 * @Author   tanpeng
 * @DateTime 2018-11-01
 * @version  [v1.0]
 * @param    {Number}   num [数字]
 * @return   {[type]}       [返回分隔开的数字]
 */
export const toSplitFour = (num = 0) => {
  let result = ''
  num = num.toString()
  result = num.replace(/\s/g, '').replace(/(.{4})/g, '$1 ')
  return result
}

/**
 * [根据名字和性别输出称谓]
 * @Author   tanpeng
 * @DateTime 2018-11-01
 * @version  [v1.0]
 * @param    {String}   name   [人名]
 * @param    {Boolean}  gender [性别]
 * @return   {[type]}          [description]
 */
export const callName = (name = '李先生', gender = true) => {
  let result = ''
  let firstName = name.slice(0, 1)
  if (gender) {
    result = firstName + '先生'
  } else {
    result = firstName + '女士'
  }
  return result
}

/**
 * [description]
 * @Author   tanpeng
 * @DateTime 2018-11-01
 * @version  [v1.0]
 * @param    {Object}   vm [vue实例]
 * @return   {[type]}      [返回'上午'或'下午'字符串]
 */
export const nowName = (vm = {}) => {
  let now = vm.$moment().format('dddd, MMMM Do YYYY, h:mm:ss a')
  let isNowAm = now.slice(-2)
  let result = ''
  if (isNowAm === 'pm') {
    result = '下午'
  } else {
    result = '上午'
  }
  return result
}

/**
 * [把数字的整数与小数部分分成两个大小的字符串]
 * @Author   tanpeng
 * @DateTime 2018-11-01
 * @version  [v1.0]
 * @param    {[type]}   value [数字]
 * @return   {[type]}         [html富文本格式的字符串]
 */
export const splitValue = (value = 0) => {
  let result = ''
  value = toThousands(value.toFixed(2))
  result =
    '<span class="bl-amount-integer">' +
    value.split('.')[0] +
    '</span><span class="bl-amount-float">.' +
    value.split('.')[1] +
    '</span>'
  return result
}

/**
 * [加密手机号]
 * @Author   tanpeng
 * @DateTime 2018-11-01
 * @version  [v1.0]
 * @param    {String}   value [手机号]
 * @return   {[type]}         [加密后的手机号]
 */
export const encryptMobile = (value = '0') => {
  let result = ''
  if (value.length > 4) {
    result = value.slice(0, 3) + '****' + value.slice(-4)
  }
  return result
}

/**
 * [加密银行卡号]
 * @Author   tanpeng
 * @DateTime 2018-11-01
 * @version  [v1.0]
 * @param    {String}   value [银行卡号]
 * @return   {[type]}         [加密后的银行卡号]
 */
export const encryptBankNo = (value = '0') => {
  let result = ''
  if (value.length > 8) {
    result = value.slice(0, 6) + '*******' + value.slice(-4)
  }
  return result
}

/**
 * [取得银行名称]
 * @Author   tanpeng
 * @DateTime 2018-11-01
 * @version  [v1.0]
 * @param    {String}   value [银行网点名称]
 * @return   {String}         [银行名称]
 */
export const cutBankName = (value = '0') => {
  let result = ''
  if (value.indexOf('银行') > -1) {
    result = value.split('银行')[0] + '银行'
  }
  return result
}

/**
 * [发送验证码倒计时插件]
 * @Author   tanpeng
 * @DateTime 2018-11-01
 * @version  [v1.0]
 * @param    {Object}   vm [vue实例]
 * @return   {[type]}      [description]
 */
export const countDown = (vm = {}) => {
  let curCount = 60
  vm.InterValObj = window.setInterval(function() {
    if (curCount === 0) {
      window.clearInterval(vm.InterValObj) // 停止计时器
      vm.btnText = '发送验证码' //按钮文字
      vm.btnDisabled = false //按钮状态
      vm.sendMsgOnce = true //按钮控制发送
    } else {
      vm.btnDisabled = true
      curCount--
      vm.btnText = curCount + '后重新发送'
    }
  }, 1000)
}

/**
 * [输入框限制函数 str=0:只能数字，str=2:保留2位小数, str=w:英文和数字]
 * @Author   tanpeng
 * @DateTime 2018-11-01
 * @version  [v1.0]
 * @param    {String}   　　　　　　　　　value [description]
 * @param    {Number ||　String}   　str   [description]
 * @return   {[type]}         　　　　　　　　　[description]
 */
export const clearNoNum = (value = '0', str) => {
  if (str === 0) {
    value = value.replace(/[^\d]/g, '')
  } else if (str === 2) {
    value = value
      .replace(/[^\d.]/g, '')
      .replace(/^\./g, '')
      .replace(/\.{2,}/g, '.')
      .replace(/^(\-)*(\d+)\.(\d\d).*$/, '$1$2.$3') // 清除"数字"和"."以外的字符
    // value = value.replace(/^\./g, ''); //验证第一个字符是数字而不是
    // value = value.replace(/\.{2,}/g, '.'); //只保留第一个. 清除多余的
    // value = value.replace(/^(\-)*(\d+)\.(\d\d).*$/, '$1$2.$3');
  } else if (str === 'w') {
    value = value.replace(/[\W]/g, '')
  }
  return value
}
/**
 * [打开pdf]
 * @Author   tanpeng
 * @DateTime 2018-11-01
 * @version  [v1.0]
 * @param    {[type]}   url [pdf url地址]
 * @return   {[type]}       [description]
 */
export const openProtocol = url => {
  let flag = false
  if (!!window.ActiveXObject || 'ActiveXObject' in window) {
    // IE浏览器
    for (let x = 2; x < 10; x++) {
      try {
        oAcro = eval(`new ActiveXObject('PDF.PdfCtrl.${x}');`)
        if (oAcro) {
          flag = true
        }
      } catch (e) {
        flag = false
      }
    }
    try {
      oAcro4 = new ActiveXObject('PDF.PdfCtrl.1')
      if (oAcro4) {
        flag = true
      }
    } catch (e) {
      flag = false
    }
    try {
      oAcro7 = new ActiveXObject('AcroPDF.PDF.1')
      if (oAcro7) {
        flag = true
      }
    } catch (e) {
      flag = false
    }
  } else if (navigator.plugins && navigator.plugins.length) {
    // 如果是firefox浏览器或者谷歌浏览器
    for (let x = 0; x < navigator.plugins.length; x++) {
      if (
        navigator.plugins[x].name === 'Adobe Acrobat' ||
        navigator.plugins[x].name === 'Chrome PDF Viewer'
      ) {
        flag = true
      }
    }
  }

  if (flag) {
    return window.open(
      url,
      '',

      'dialogWidth=1024px;dialogHeight=768px,status=0,toolbar=no,menubar=no,location=no,scrollbars=yes,top=20,left=20,resizable=no'
    )
  }
  return errorFn(
    '对不起,您还没有安装PDF阅读器软件呢,为了方便预览PDF文档,请选择安装！'
  )
}

/**
 * [随机编码值]
 * @Author   tanpeng
 * @DateTime 2018-11-01
 * @version  [v1.0]
 * @return   {[type]}   [description]
 */
export const UUID = () => {
  let s = []
  let hexDigits =
    '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
  for (let i = 0; i < 36; i++) {
    s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1)
  }
  s[14] = '4' // bits 12-15 of the time_hi_and_version field to 0010
  s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1) // bits 6-7 of the clock_seq_hi_and_reserved to 01
  s[8] = s[13] = s[18] = s[23] = '-'
  let uuid = s.join('')
  return uuid
}

const utils = {
  install(Vue) {
    Vue.prototype.utils = {
      session: session,
      errorFn: errorFn,
      catchError: catchError,
      addUnit: addUnit,
      firstUpperCase: firstUpperCase,
      messageFn: messageFn,
      toThousands: toThousands,
      toSplitFour: toSplitFour,
      callName: callName,
      nowName: nowName,
      splitValue: splitValue,
      encryptMobile: encryptMobile,
      encryptBankNo: encryptBankNo,
      cutBankName: cutBankName,
      countDown: countDown,
      clearNoNum: clearNoNum,
      UUID: UUID,
      openProtocol: openProtocol
    }
  }
}

Vue.use(utils)
