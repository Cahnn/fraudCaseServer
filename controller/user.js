// 统一管理当前所有的业务逻辑
let  jwt = require('jsonwebtoken')
const User = require('../models/users')
const crud = require('./crudUtil')

// 添加系统用户
const userAdd = async (ctx) => {
    // ctx.req -> Node中的request对象；  ctx.request -> Koa中的Request对象
    // ctx.request.query获取解析的查询字符串对象
    let {username = '',password = ''} = ctx.request.body
    // 返回一个promise对象
    await crud.add(User,{username,password},ctx)
}

// 修改用户密码
const userUpdate = async (ctx) => {
    // 获取更改的数据
    let params = ctx.request.body
    await crud.update(User,
        {_id:params._id},
        {password:params.password},
        ctx)
}

// 删除用户
const userDel = async (ctx) => {
    let {_id} = ctx.request.body
    await crud.del(User,{_id},ctx)
}

// 查询所有系统用户
const userFind = async (ctx) => {
    await crud.find(User,null,ctx)
}

// 查询单个系统用户
const userFindOne = async (ctx) => {
    // 通过parameter方式接收id
    await crud.findOne(User,{_id:ctx.params.id},ctx)
}

// 接收_id和接收普通参数的方法不同

// 根据手机号查询用户信息
const findByPhone = async (ctx) => {
    // 通过parameter方式接收id
    let {phone} = ctx.query
    await crud.findOne(User,{phone},ctx)
}

/**
 * 用户登录
 * @param ctx
 * @returns {Promise<void>}
 */
const login = async ctx => {
    let {phone,password} = ctx.request.body
    await User.findOne({phone,password}).then(rel => {
        if(!rel){
            ctx.body = {
                code: 300,
                msg: '手机号或密码错误'
            }
        }else if (rel && rel.status === 0){
            ctx.body = {
                code: 301,
                msg: '该账号已被禁用'
            }
        }else{
            let token = jwt.sign({
                phone: rel.phone,
                _id: rel._id
            },'fraudcase-server-jwt',{
                expiresIn: 3600 * 24 *7  //token的有效时长（7天）
            })
            ctx.body = {
                code: 200,
                msg: '登录成功',
                userInfo: rel,
                token
            }
        }
    }).catch(err => {
        ctx.body = {
            code: 500 ,
            msg: '登录时出现异常'
        }
    })
}

/**
 * 用户注册
 */
const reg = async ctx => {
    let {phone,password,username} = ctx.request.body
    let isDouble = false
    await User.findOne({phone}).then(rel => {
        if(rel) isDouble = true
    })
    if (isDouble){
        ctx.body = {
            code: 300,
            msg: '手机号已存在'
        }
        return
    }
    await User.create({phone,password,username}).then(rel => {
        if(rel){
            ctx.body = {
                code: 200,
                msg: '注册成功',
                rel
            }
        }else{
            ctx.body = {
                code: 300,
                msg: '注册失败'
            }
        }
    }).catch(err =>{
        ctx.body = {
            code: 500 ,
            msg: '注册时出现异常',
            err
        }
    })
}

/**
 * 验证用户登录
 */
const verify = async ctx =>{
    let token = ctx.header.authorization
    token = token.replace('Bearer ','')
    try{
        let result = jwt.verify(token,'fraudcase-server-jwt')
        await User.findOne({_id:result._id}).then(rel => {
            if(rel){
                ctx.body = {
                    code: 200,
                    msg: '用户认证成功',
                    user: rel
                }
            }else{
                ctx.body = {
                    code: 500,
                    msg: '用户认证失败'
                }
            }
        }).catch(err => {
            ctx.body = {
                code: 500,
                msg: '用户认证失败'
            }
        })
    }catch (err){
        ctx.body = {
            code: 500,
            msg: '用户认证失败'
        }
    }
}

/**
 * 修改用户密码
 */
const updatePwd = async ctx => {
    let {_id,password} = ctx.request.body
    await crud.update(User,
        {_id:_id},
        {password:password},
        ctx)
}

/**
 * 修改个人资料
 */
const updatePersonal = async ctx => {
    let user = ctx.request.body
    await User.updateOne(
        {_id: user._id},
        {
            avatar: user.avatar,
            username: user.username,
            sex: user.sex,
            desc: user.desc,
            phone: user.phone,
            email: user.email,
            problem: user.problem
        }
    ).then(rel => {
        if (rel.modifiedCount > 0){
            ctx.body = {
                code: 200,
                msg: '资料已更新'
            }
        }else{
            ctx.body = {
                code: 300,
                msg: '资料更新失败'
            }
        }
    }).catch(err => {
        ctx.body = {
            code: 500,
            msg: '资料更新异常',
            err
        }
    })
}

// 禁用账号
const closeAccount = async ctx => {
    let user = ctx.request.body
    await User.updateOne(
        {_id: user._id},
        {
            status: user.status
        }
    ).then(rel => {
        if (rel.modifiedCount > 0){
            ctx.body = {
                code: 200,
                msg: '账号已禁用'
            }
        }else{
            ctx.body = {
                code: 300,
                msg: '账号禁用失败'
            }
        }
    }).catch(err => {
        ctx.body = {
            code: 500,
            msg: '资料更新异常',
            err
        }
    })
}

module.exports = {
    userAdd,
    userUpdate,
    userDel,
    userFind,
    userFindOne,
    login,
    reg,
    verify,
    updatePwd,
    updatePersonal,
    closeAccount,
    findByPhone    // 未登录前使用的接口
}
