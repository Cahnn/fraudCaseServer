let {
    add,
    findAll,
    findOne,
    update,
    del
} = require('../controller/issue')
const router = require('koa-router')()
router.prefix('/admin/issue')

// 发布类型
router.post('/add',add)

// 查询类型（分页）
router.get('/findAll',findAll)

// 查询单个类型
router.get('/findOne',findOne)

// 修改类型
router.post('/update',update)

// 删除类型
router.post('/del',del)

module.exports = router
