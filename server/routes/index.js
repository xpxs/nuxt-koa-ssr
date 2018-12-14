import Router from 'koa-router'
import users from './users'
import common from './common'
import { CONFIG_API } from '../config/CONFIG_API'
import jwt from 'koa-jwt'
const router = Router()

// 获取用户列表
router.use(
  CONFIG_API.ENDPOINT_BACKEND_AUTH,
  jwt({ secret: CONFIG_API.JWT_SECRET }),
  users.routes()
)
//公共接口
router.use(common.routes(), common.allowedMethods())
// 所有走/oauth/token/打头的请求都需要经过jwt验证。
export default router
