const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')

// 错误处理中间件
const jsonerror = require('koa-json-error')
// 校验请求参数中间件
const parameter = require('koa-parameter')
// 引入数据库连接文件
const MongoConnect = require('./db')
// 连接数据库
MongoConnect()

const cors = require('koa2-cors')
const koajwt = require('koa-jwt')

const index = require('./routes/index')
const users = require('./routes/users')
const upload = require('./routes/upload')
const fraud = require('./routes/fraud')
const activity = require('./routes/activity')
const category = require('./routes/category')
const usersAdmin = require('./routes/usersAdmin')
const issue = require('./routes/issue')
const feedback = require('./routes/feedback')
const qbank = require('./routes/qBank')
const statistic = require('./routes/statistic')


// error handler
onerror(app)

// middlewares
app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
}))
app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))
app.use(cors())
app.use(koajwt({
  secret: 'fraudcase-server-jwt'
}).unless({
  path: [/^\/users\/login/,/^\/users\/reg/,/^\/admin\/*/,/^\/upload\/*/]   // 哪些接口不需要jwt接口认证
}))

app.use(views(__dirname + '/views', {
  extension: 'pug'
}))

// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

// routes
app.use(index.routes(), index.allowedMethods())
app.use(users.routes(), users.allowedMethods())
app.use(upload.routes(), upload.allowedMethods())
app.use(fraud.routes(), fraud.allowedMethods())
app.use(activity.routes(), activity.allowedMethods())
app.use(category.routes(), category.allowedMethods())
app.use(usersAdmin.routes(), usersAdmin.allowedMethods())
app.use(issue.routes(), issue.allowedMethods())
app.use(feedback.routes(), feedback.allowedMethods())
app.use(qbank.routes(), qbank.allowedMethods())
app.use(statistic.routes(), statistic.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app
