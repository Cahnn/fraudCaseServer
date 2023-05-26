let {
    add,
    findAll,
    findOne,
    update,
    del,
    findByType
} = require('../controller/fraud')
const router = require('koa-router')()
router.prefix('/admin/fraud')

// 发布文章
router.post('/add',add)

// 查询文章（分页）
router.get('/findAll',findAll)

// 查询单个文章
router.get('/findOne',findOne)

// 修改文章
router.post('/update',update)

// 删除文章
router.post('/del',del)

// 根据分类查询文章
router.get('/findByType',findByType)

module.exports = router
