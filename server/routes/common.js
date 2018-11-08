import Router from 'koa-router'
import { resDataTpl } from '../controller/resDataTpl' // 引入返回数据模板

const router = Router()

// 用户列表
router.get('/getMsg', async (ctx, next) => {
  console.log('ctx', ctx.query)
  resDataTpl.success = true
  resDataTpl.message = '发送验证码成功'
  ctx.body = resDataTpl
})

export default router
