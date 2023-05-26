const Acvitity = require('../models/activity')
const crud = require('./crudUtil')

/**
 * 发布文章
 */
const add = async ctx => {
    let activity = ctx.request.body
    await crud.add(Acvitity,activity,ctx)
}

// 查询所有文章（分页）
const findAll = async ctx => {
    await crud.find(Acvitity,null,ctx)
}

/**
 * 查询单个文章
 */
const findOne = async ctx => {
    let {_id} = ctx.query
    await Acvitity.findOne({_id}).then(rel => {
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

// 修改文章
const update = async ctx => {
    let params = ctx.request.body
    await crud.update(Acvitity,
        {_id:params._id},
        {
            title: params.title,
            content: params.content
        },
        ctx)
}

/**
 * 删除文章
 */
const del = async ctx => {
    let {_id} = ctx.request.body
    await crud.del(Acvitity,{_id},ctx)
}

module.exports = {
    add,
    findAll,
    findOne,
    update,
    del
}
