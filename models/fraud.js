// 1. 导入mongoose
const mongoose = require('mongoose')

// 2.创建模型对象
const fraudSchema = new mongoose.Schema({
    title: String,  // 文章标题
    createTime: String,   // 文章创建时间
    content: String,   // 文章内容
    cover: String,
    stemfrom: String,   // 文章来源
    read: {        // 阅读量
        type: Number,
        default: 0
    },
    star: {        // 点赞量
        type: Number,
        default: 0
    },
    comment: {        // 评论数量
        type: Number,
        default: 0
    },
    author: String,    // 作者
    timeofcrime: Date,   // 案发时间
    year: String,    // 案发年
    age: String,    // 年龄段
    amount: Number,    // 受骗金额
    province: String,    // 案发省份
    type: String,       // 诈骗类型
})

// 3.根据规则创建对象
const Fraud = mongoose.model('fraud',fraudSchema)

// 4.抛出模型对象
module.exports = Fraud
