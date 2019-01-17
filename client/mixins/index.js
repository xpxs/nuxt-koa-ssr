'use strict'
import { commonReq } from '@/api/commonReq'
export const reqDataMixins = {
  methods: {
    /**
     * [reqData 请求表格数据封装]
     * @Author   tanpeng
     * @DateTime 2018-11-26
     * @version  [v1.0]
     * @param    {[type]}   params [params.url:接口请求定义名称,
     *                              params.params:接口请求参数,
     *                              params.success:接口请求数据成功返回函数,
     *                              params.error:接口未请求到数据返回函数],
     * @return   {[type]}          [description]
     */
    async reqData(params) {
      let vm = this
      let result = ''
      //把异常try catch抛出异常
      // result = await commonReq(params.url, vm[params.params])
      try {
        result = await commonReq(params.url, vm[params.params])
      } catch (err) {
        result = err
      }
      if (result.status === 401) {
        vm.utils.catchErrorStatus(result.status, result.data.message, () => {
          vm.$store.dispatch('logout')
          vm.$router.push('/admin/login')
        })
        return
      } else if (result.status === 200) {
        if (params.success && typeof params.success === 'function') {
          params.success(result)
        }
      } else {
        if (params.error && typeof params.error === 'function') {
          params.error(result)
        }
      }
    },
    fnSubmiting(value, text) {
      let vm = this
      if (value) {
        vm.btnParams.loading = true
        vm.btnParams.text = text
      } else {
        vm.btnParams.loading = false
        vm.btnParams.text = text
      }
    }
  }
}
