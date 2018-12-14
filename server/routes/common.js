import Router from 'koa-router'
import { ResDataTpl } from '../common/utils' // 引入返回数据模板
import { CONFIG_API } from '../config/CONFIG_API'
const router = Router()

// 用户列表
router.get(
  CONFIG_API.ENDPOINT_BACKEND_VALIDATE + '/getMsg',
  async (ctx, next) => {
    let resDataTpl = new ResDataTpl().data()
    resDataTpl.success = true
    resDataTpl.message = '发送验证码成功'
    ctx.body = resDataTpl
  }
)

export default router
