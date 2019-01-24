module.exports = {
  /*
   ** Headers of the page
   */
  head: {
    title: 'starter',
    meta: [
      {
        charset: 'utf-8'
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1'
      },
      {
        hid: 'description',
        name: 'description',
        content: 'Nuxt.js project'
      }
    ],
    link: [
      {
        rel: 'icon',
        type: 'image/x-icon',
        href: '/favicon.ico'
      }
    ]
  },
  /*
   ** Global CSS
   */
  css: [
    'iview/dist/styles/iview.css',
    '@/static/css/common.css',
    '@/static/css/main.css',
    {
      src: '@/static/sass/admin-main.scss',
      lang: 'scss'
    }
  ],
  /*
   ** Customize the progress-bar color
   */
  plugins: [
    {
      src: '@/plugins/iview.js',
      ssr: true
    },
    {
      src: '@/plugins/lodash.js',
      ssr: false
    },
    {
      src: '@/plugins/moment.js',
      ssr: true
    },
    {
      src: '@/plugins/utils.js',
      ssr: true
    },
    {
      src: '@/plugins/particles.js',
      ssr: false
    },
    {
      src: '@/plugins/vue-cookies.js',
      ssr: true
    }
  ],
  router: {
    middleware: 'auth'
  },
  /*
   ** Customize the progress-bar color
   */
  loading: {
    color: '#3B8070'
  },
  /*
   ** Build configuration
   */
  build: {
    /*
     ** Run ESLINT on save
     */
    extend(config, ctx) {
      if (ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  },
  modules: ['@nuxtjs/axios', '@nuxtjs/proxy'],
  // axios: {
  //   prefix: '/api/',
  //   proxy: true
  // },
  proxy: [
    [
      '/api',
      {
        target: 'http://127.0.0.1:3000',
        pathRewrite: {
          '^/api': '/'
        }
      }
    ]
  ],
  cache: true,
  srcDir: 'client/',
  env: {
    __ENV: process.env.NODE_ENV
  }
}
