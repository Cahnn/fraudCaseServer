const Issue = require('../models/issue')
const crud = require('./crudUtil')

/**
 * 添加
 */
const add = async ctx => {
    let issue = ctx.request.body
    await crud.add(Issue,issue,ctx)
}

// 查询所有
const findAll = async ctx => {
    await crud.find(Issue,null,ctx)
}

/**
 * 查询单个
 */
const findOne = async ctx => {
    let {_id} = ctx.query
    await Issue.findOne({_id}).then(rel => {
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

// 修改
const update = async ctx => {
    // 获取更改的数据
    let params = ctx.request.body
    await crud.update(Issue,
        {_id:params._id},
        {question:params.question,
            answer: params.answer},
        ctx)
}

/**
 * 删除
 */
const del = async ctx => {
    let {_id} = ctx.request.body
    await crud.del(Issue,{_id},ctx)
}

module.exports = {
    add,
    findAll,
    findOne,
    update,
    del
}
