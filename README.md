# nuxt-koa-ssr
nuxt-koa-ssr team

> nuxt后端渲染  

## Build Setup  

``` bash
# install dependencies
$ npm install # Or yarn install*[see note below]

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server X = alpha(测试环境), X = uat(联调环境), X = prod(生产环境)
$ npm run X:build  
$ npm run X:start

#pm2运行nodejs程序
$ npm run X:pm2

# generate static project 静态打包
$ npm run generate

# nodejs >= 8.11.4

```
*Note: Due to a bug in yarn's engine version detection code if you are
using a prerelease version of Node (i.e. v7.6.0-rc.1) you will need to either:
  1. Use `npm install`
  2. Run `yarn` with a standard release of Node and then switch back

For detailed explanation on how things work, checkout the [Nuxt.js docs](https://github.com/nuxt/nuxt.js).
