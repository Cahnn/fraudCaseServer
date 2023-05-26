const Fraud = require('../models/fraud')
const crud = require('./crudUtil')

/**
 * 发布文章
 */
const add = async ctx => {
    let fraud = ctx.request.body
    await crud.add(Fraud,fraud,ctx)
}

// 查询所有文章（分页）
const findAll = async ctx => {
    let {page,size} = ctx.query
    console.log("分页查询的数据",ctx.query)

    // 判断页码
    if(!page || isNaN(Number(page))){
        page = 1
    }else{
        page = Number(page)
    }

    // 每页条数
    let pageSize = Number(size)
    // 计算总页数
    let count = 0   // 数据总条数
    await Fraud.find().count().then(rel => {
        count = rel
    })
    let totalPage = 0
    if(count > 0){
        totalPage = Math.ceil(count / pageSize)
    }

    // 判断当前页码的范围
    if(totalPage > 0 && page > totalPage){ // 如果总页数>0并且要查询的页数大于最后一页，则默认查询最后一页
        page = totalPage
    }else if(page < 1){
        page = 1
    }

    // 计算起始位置
    let start = (page-1) * pageSize     // 当前页码-1再除以每页条数
    await Fraud.find().skip(start).limit(pageSize).then(rel => {
        if (rel && rel.length > 0){
            ctx.body = {
                code: 200,
                msg: '查询成功',
                result: rel,
                page,
                pageSize,
                count
            }
        }else{
            ctx.body = {
                code: 300,
                msg: '没有查询到'
            }
        }
    }).catch(err => {
        ctx.body = {
            code: 500,
            msg: '查询时出现异常',
            err
        }
    })
}

/*
分类查询
 */
const findByType = async ctx => {
    let {type} = ctx.query
    console.log(ctx)
    await crud.find(Fraud,{type},ctx)
}



/**
 * 查询单个文章
 */
const findOne = async ctx => {
    let {_id} = ctx.query
    let isRead = false
    await Fraud.findOne({_id}).then(rel => {
        if(rel){
            isRead = true
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

    if(isRead){
        await Fraud.updateOne({_id},{$inc:{read:1}})
    }
}

// 修改文章
const update = async ctx => {
    let params = ctx.request.body
    await crud.update(Fraud,
        {_id:params._id},
        {
            title: params.title,
            content: params.content,
            stemfrom: params.stemfrom,
            author: params.author,
            age: params.age,
            amount: params.amount,
            province: params.province,
            type: params.type,
            timeofcrime: params.timeofcrime
        },
        ctx)
}

/**
 * 删除文章
 */
const del = async ctx => {
    let {_id} = ctx.request.body
    await crud.del(Fraud,{_id},ctx)
}

module.exports = {
    add,
    findAll,
    findOne,
    update,
    del,
    findByType
}
