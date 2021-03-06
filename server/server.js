import Koa from 'koa'
import { Nuxt, Builder } from 'nuxt'
import path from 'path'
import fs from 'fs'
import Log4js from 'koa-log4'
import bodyParser from 'koa-bodyparser'
import convert from 'koa-convert'
import cors from 'koa-cors'
import jwt from 'koa-jwt'
import { CONFIG_API } from './config/CONFIG_API'
import logConfig from './config/log4js'
import routes from './routes'

async function start() {
  const app = new Koa()
  let logger = Log4js.getLogger('app')
  const host = CONFIG_API.HOST || '127.0.0.1'
  const port = CONFIG_API.PORT || 3000

  // routes
  app.use(
    jwt({ secret: CONFIG_API.SECRET_JWT }).unless({
      path: [/^\/oauth\/adminLogin/, /^((?!\/oauth).)*$/] // 设置除了私有接口外的其它资源，可以不需要认证访问]
    })
  )
  app.use(bodyParser())
  app.use(convert(cors()))
  app.use(routes.routes(), routes.allowedMethods())

  // Import and Set Nuxt.js options
  let config = require('../nuxt.config.js')
  config.dev = !(app.env === 'production')

  // 生成logs目录 && 加载配置文件 start
  const logPath = path.join(__dirname, 'logs')
  try {
    fs.mkdirSync(logPath)
  } catch (err) {
    if (err.code !== 'EEXIST') {
      console.error('Could not set up log directory, error was: ', err)
      process.exit(1)
    }
  }
  Log4js.configure(logConfig, {
    cwd: logPath
  })
  // 生成logs目录 && 加载配置文件 end

  app.use(
    Log4js.koaLogger(Log4js.getLogger('http'), {
      level: 'http'
    })
  )
  // Instantiate nuxt.js
  const nuxt = new Nuxt(config)

  // Build in development
  if (config.dev) {
    const builder = new Builder(nuxt)
    await builder.build()
  }

  app.use(async (ctx, next) => {
    const start = new Date()
    await next()
    const ms = new Date() - start
    logger.info(`${ctx.method} ${ctx.url} - ${ms}ms`)
    ctx.status = 200 // koa defaults to 404 when it sees that status is unset
    return new Promise((resolve, reject) => {
      ctx.res.on('close', resolve)
      ctx.res.on('finish', resolve)
      nuxt.render(ctx.req, ctx.res, promise => {
        // nuxt.render passes a rejected promise into callback on error.
        promise.then(resolve).catch(reject)
      })
    })
  })

  app.on('error', function(err, ctx) {
    console.log(err)
    logger.error('server error', err, ctx)
  })

  app.listen(port, host)
  console.log('Server listening on ' + host + ':' + port) // eslint-disable-line no-console
}

start()
