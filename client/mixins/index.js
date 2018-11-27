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
     *                              params.params:接口请求参数],
     *                              params.success:接口请求数据成功返回函数],
     *                              params.error:接口未请求到数据返回函数],
     * @return   {[type]}          [description]
     */
    async reqData(params) {
      let vm = this
      let result = await commonReq(params.url, vm[params.params])
      if (result.data.success) {
        if (params.success && typeof params.success === 'function') {
          params.success(result)
        }
      } else {
        if (params.error && typeof params.error === 'function') {
          params.error(result)
        }
      }
    }
  }
}
