const Category = require('../models/category')
const crud = require('./crudUtil')

/**
 * 添加类型
 */
const add = async ctx => {
    let category = ctx.request.body
    await crud.add(Category,category,ctx)
}

// 查询所有类型
const findAll = async ctx => {
    await crud.find(Category,null,ctx)
}

// 查询所有类型
const findById = async ctx => {
    let id = ctx.query
    await crud.findOne(Category,id,ctx)
}

/**
 * 查询单个类型
 */
const findOne = async ctx => {
    let {_id} = ctx.query
    await Category.findOne({_id}).then(rel => {
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
}

// 修改类型
const update = async ctx => {
    // 获取更改的数据
    let params = ctx.request.body
    await crud.update(Category,
        {_id:params._id},
        {name:params.name,
                id: params.id},
        ctx)
}

/**
 * 删除类型
 */
const del = async ctx => {
    let {_id} = ctx.request.body
    await crud.del(Category,{_id},ctx)
}

module.exports = {
    add,
    findAll,
    findOne,
    findById,
    update,
    del
}
