const express = require('express') // 引入express

const app = express()
const proxy = require('http-proxy-middleware')

// eslint-disable-next-line no-path-concat
app.use(express.static(__dirname + '/dist')) // 设置node要托管哪一些静态资源
app.use(
  '/'
  , proxy(
    {
      ws: true,
      target: 'https://ins-spring-boot-1618793-1309615625.ap-shanghai.run.tcloudbase.com/',
      changeOrigin: true,
      pathReWrite: {
        '^/api': '/'
      }
    }
  )
)

app.listen(8080)
