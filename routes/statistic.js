const statistic = require('../models/statistic')
const router = require('koa-router')()
router.prefix('/admin/statistic')

router.get('/typeCount', async (ctx) => {
    try {
        ctx.body = await statistic.aggregate([
            {$group: {_id: '$type', count: {$sum: 1}}},
        ]);
    } catch (error) {
        ctx.status = 500;
        ctx.body = { error: 'Internal server error' };
    }
})

router.get('/ageCount', async (ctx) => {
    try {
        ctx.body = await statistic.aggregate([
            {$group: {_id: '$age', count: {$sum: 1}}},
        ]);
    } catch (error) {
        ctx.status = 500;
        ctx.body = { error: 'Internal server error' };
    }
})

router.get('/provinceCount', async (ctx) => {
    try {
        ctx.body = await statistic.aggregate([
            {$group: {_id: '$province', count: {$sum: 1}}},
        ]);
    } catch (error) {
        ctx.status = 500;
        ctx.body = { error: 'Internal server error' };
    }
})

router.get('/yearCount', async (ctx) => {
    try {
        ctx.body = await statistic.aggregate([
            {$group: {_id: '$year', count: {$sum: 1}}},
        ]);
    } catch (error) {
        ctx.status = 500;
        ctx.body = { error: 'Internal server error' };
    }
})

module.exports = router
