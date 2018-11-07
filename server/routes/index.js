import Router from 'koa-router'
import users from './users'
import common from './common'

const router = Router()

// 获取用户列表
router.use(users.routes(), users.allowedMethods())
//公共接口
router.use(common.routes(), common.allowedMethods())

export default router
