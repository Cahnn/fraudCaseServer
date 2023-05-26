const router = require('koa-router')()
const User = require('../models/users')
const userCtl = require('../controller/user')
router.prefix('/users')

// router.get('/', function (ctx, next) {
//   ctx.body = 'this is a users response!'
// })
//
// router.get('/bar', function (ctx, next) {
//   ctx.body = 'this is a users/bar response'
// })

// 添加系统用户(无用处接口)
router.post('/add', userCtl.userAdd)

// 修改系统用户密码
router.post('/update/pwd', userCtl.updatePwd)

// 删除系统用户(根据id删除)
router.post('/del',userCtl.userDel)

// 查询所有系统用户
router.get('/find',userCtl.userFind)

// 查询单个系统用户
router.get('/find/:id',userCtl.userFindOne)

// 用户登录(status为0的账号不能登录)
router.post('/login',userCtl.login)

// 用户注册
router.post('/reg',userCtl.reg)

// 用户登录认证
router.post('/verify',userCtl.verify)

// 修改个人用户资料
router.post('/update/personal',userCtl.updatePersonal)

// 注销帐号
router.post('/closeAccount',userCtl.closeAccount)


module.exports = router
