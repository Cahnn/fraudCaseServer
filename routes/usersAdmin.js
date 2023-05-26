const router = require('koa-router')()
const userCtl = require('../controller/user')
router.prefix('/admin/users')

// 删除系统用户(根据id删除)
router.post('/del',userCtl.userDel)

// 查询所有系统用户
router.get('/find',userCtl.userFind)

// 设置密保
router.post('/setProblem',userCtl.updatePersonal)

// 根据手机号查询用户信息
router.get('/findByPhone',userCtl.findByPhone)

// 修改系统用户密码（忘记密码情况下使用此接口，不接收token）
router.post('/update/pwd', userCtl.updatePwd)

module.exports = router
