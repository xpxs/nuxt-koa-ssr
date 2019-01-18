import Router from 'koa-router'
import { ResDataTpl } from '../common/utils' // 引入返回数据模板
import { RedisToken } from '../common/utils'
import svgCaptcha from 'svg-captcha'
import path from 'path'
const router = Router()
svgCaptcha.loadFont(path.join(__dirname, '../common/georgia.ttf'))

// 用户列表
router
  .get('/getMsg', async (ctx, next) => {
    let resDataTpl = new ResDataTpl().data()
    resDataTpl.success = true
    resDataTpl.message = '发送验证码成功'
    ctx.body = resDataTpl
  })
  .get('/getCaptcha', async (ctx, next) => {
    let captchaUUID = ctx.query.captchaUUID
    let captcha = svgCaptcha.create({
      noise: 3,
      background: '#e2f6f3',
      width: 80,
      fontSize: 36,
      height: 32
    })
    await new RedisToken().set(captchaUUID, captcha.text)
    let resDataTpl = new ResDataTpl().data()
    resDataTpl.success = true
    resDataTpl.message = '图片验证码获取成功'
    resDataTpl.data = captcha.data
    ctx.body = resDataTpl
  })
  .get('/checkCaptcha', async (ctx, next) => {
    let captchaUUID = ctx.query.captchaUUID
    let captchaCode = ctx.query.captchaCode
    let captchaTextInRedis = await new RedisToken().get(captchaUUID)
    if (captchaCode === captchaTextInRedis) {
      let resDataTpl = new ResDataTpl().data()
      resDataTpl.success = true
      resDataTpl.message = '图片验证码验证成功'
      resDataTpl.data = null
      ctx.body = resDataTpl
    } else {
      let resDataTpl = new ResDataTpl().data()
      resDataTpl.success = false
      resDataTpl.message = '*图片验证码错误'
      resDataTpl.data = null
      ctx.body = resDataTpl
    }
  })

export default router
