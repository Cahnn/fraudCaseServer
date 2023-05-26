let {
    add,
    findAll,
    findOne,
    update,
    del
} = require('../controller/activity')
const router = require('koa-router')()
router.prefix('/admin/activity')

// 发布活动
router.post('/add',add)

// 查询活动（分页）
router.get('/findAll',findAll)

// 查询单个活动
router.get('/findOne',findOne)

// 修改活动
router.post('/update',update)

// 删除活动
router.post('/del',del)

module.exports = router
