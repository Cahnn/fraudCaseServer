/**
 * 用于查询所有数据的公共方法
 * @param model
 * @param where
 * @param ctx
 * @returns {Promise<ResultType> | Promise<ResultType> | Promise<any>}
 */
const find = (model, where, ctx) => (
    model.find(where).then(rel => {
        ctx.body = {
            code: 200,
            msg: '查询成功',
            result: rel
        }
    }).catch(err=>{
        ctx.body = {
            code: 400,
            msg: '查询时出现异常'
        }
        console.error(err)
    })
)

/**
 * 用于添加的公共方法
 * @param model
 * @param params
 * @param ctx
 */
const add = (model,params,ctx) => (
    model.create(params).then(rel => {
        if(rel){
            ctx.body = {
                code: 200,
                msg: '添加成功',
                data: rel
            }
        }else{
            ctx.body = {
                code: 300,
                msg: '添加失败'
            }
        }
    }).catch(err => {
        ctx.body = {
            code: 400,
            msg: '添加时出现异常'
        }
        console.error(err)
    })
)

/**
 * 用于修改数据的公共方法
 * @param model
 * @param where
 * @param params
 * @param ctx
 */
const update = (model,where,params,ctx) => (
    model.updateOne(where,params).then(rel => {
        if (rel.modifiedCount > 0){
            ctx.body  = {
                code: 200,
                msg: '修改成功',
                rel
            }
        }else{
            ctx.body = {
                code: 300,
                msg: '修改失败'
            }
        }
    }).catch(err=>{
        ctx.body = {
            code: 500,
            msg: '修改时出现异常'
        }
        console.error(err)
    })
)

/**
 * 用于删除的公共方法
 * @param model
 * @param where
 * @param ctx
 */
const del = (model,where,ctx) => (
    model.findOneAndDelete(where).then(rel => {
        if(rel){
            ctx.body = {
                code: 200,
                msg: '删除成功',
                result: rel
            }
        }else{
            ctx.body = {
                code: 300,
                msg: '删除失败'
            }
        }
    }).catch(err => {
        ctx.body = {
            code: 500,
            msg: '删除时出现异常'
        }
        console.error(err)
    })
)

/**
 * 查询单条数据的公共方法
 * @param model
 * @param where
 * @param ctx
 * @returns {Promise<ResultType> | Promise<ResultType> | Promise<any>}
 */
const findOne = (model,where,ctx) => (
    model.findOne(where).then(rel => {
        if(rel){
            ctx.body = {
                code: 200,
                msg: '查询成功',
                result: rel
            }
        }else{
            ctx.body = {
                code: 300,
                msg: '查询失败'
            }
        }
    }).catch(err => {
        ctx.body = {
            code: 400,
            msg: '查询时出现异常',
            err
        }
    })
)

module.exports = {
    find,
    findOne,
    add,
    update,
    del
}
