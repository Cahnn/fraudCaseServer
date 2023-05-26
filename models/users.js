// 1. 导入mongoose
const mongoose = require('mongoose')

// 2.创建模型对象
const userSchema = new mongoose.Schema({
    username: String,
    password: {
        type: String,
        select: false   // 不被返回
    },
    avatar: {
        type: String,
        default: ''
    },
    sex: {
        type: String,
        default: 'male'
    },
    desc: {
        type: String,
        default: ''
    },
    phone: {
        type: String,
        default: ''
    },
    email: {
        type: String,
        default: ''
    },
    status:{
        type: Number,
        default: 1
    },
    problem:{
        question: {
            type: String,
            default: '你喜欢看的电影?'
        },
        answer: {
            type: String,
            default: ''
        }
    }
})

// 3.根据规则创建对象
const User = mongoose.model('users',userSchema)

// 4.抛出模型对象
module.exports = User
