import Router from 'koa-router'
import users from './users'
import common from './common'
const router = Router()

//公共接口
router.use(common.routes(), common.allowedMethods())

router.use(users.routes(), common.allowedMethods())

export default router
