let {
    add,
    findAll,
    findOne,
    update,
    del,
    findById
} = require('../controller/category')
const router = require('koa-router')()
router.prefix('/admin/category')

// 发布类型
router.post('/add',add)

// 查询类型（分页）
router.get('/findAll',findAll)

// 查询单个类型
router.get('/findOne',findOne)

// 根据类型编号查询单个类型
router.get('/findById',findById)

// 修改类型
router.post('/update',update)

// 删除类型
router.post('/del',del)

module.exports = router
