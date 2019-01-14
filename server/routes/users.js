import Router from 'koa-router'
import Mock from 'mockjs'
import JWT from 'jsonwebtoken'
import { exec } from 'child_process'
import { M_Users } from '../mock'
import { CONFIG_API } from '../config/CONFIG_API'
import { VeriftyToken, Upload } from '../common/utils'
import * as userController from '../controller/userController' // 引入userController

function parserequest(urls, ctx) {
  let arg1 = 'D:/tanpeng/nuxt-koa-ssr/client/static/uploads/20181226/face0.jpg'
  let arg2 = 'D:/tanpeng/nuxt-koa-ssr/client/static/'
  var exec_path = 'python D:/tanpeng/nuxt-koa-ssr/server/routes/add.py '
  exec(exec_path, function(error, stdout, stderr) {
    console.log('error', error)
    console.log('stdout', stdout)
    console.log('stderr', stderr)
    let data = ''
    if (stdout.length > 1) {
      data = `{errcode:0,errmsg:'${stdout}'}`
    } else {
      data = `{errcode:0,errmsg:'${stdout}'}`
    }
    ctx.body = { data: JSON.stringify(data) }
    if (error) {
      data = `{errcode:500,errmsg:'${error}'}`
      ctx.body = { data: JSON.stringify(data) }
    }
  })
  console.log('22222')
}

//加载配置
let upload = new Upload().upload()
let filePath = new Upload().path()

const router = Router()

router
  //新建用户
  .get('/users/:id', async (ctx, next) => {
    let values = Mock.mock(M_Users)
    values.user_id = ctx.params.id
    await userController.addUser(ctx, values)
  })
  //获得用户列表
  .get(CONFIG_API.ENDPOINT_BACKEND_AUTH + '/getUsers', async (ctx, next) => {
    // parserequest('../../client/static/uploads/20181226/face0.jpg', ctx)
    let flag = await new VeriftyToken(ctx).getJWTUserToken()
    if (flag) {
      await userController.getUsers(ctx)
    }
  })
  //测试权限
  .get(CONFIG_API.ENDPOINT_BACKEND_AUTH + '/getAuth', async (ctx, next) => {
    let flag = await new VeriftyToken(ctx).getJWTUserToken()
    if (flag) {
      ctx.body = '可以访问'
    }
  })
  //更新数据
  .post(CONFIG_API.ENDPOINT_BACKEND_AUTH + '/updateUser', async (ctx, next) => {
    await userController.updateUser(ctx)
  })
  //后台管理登录
  .post(CONFIG_API.ENDPOINT_BACKEND_AUTH + '/adminLogin', async (ctx, next) => {
    await userController.postUserAuth(ctx)
  })
  //后台管理上传图片
  .post(
    CONFIG_API.ENDPOINT_BACKEND_AUTH + '/upload',
    upload.single('file'),
    async (ctx, next) => {
      let path = ctx.req.file.destination.split('/static')[1]
      var url =
        'http://' + ctx.headers.host + path + '/' + ctx.req.file.filename
      ctx.body = {
        filename: ctx.req.file.filename,
        url: url //返回文件名
      }
    }
  )

export default router
