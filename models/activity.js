// 1. 导入mongoose
const mongoose = require('mongoose')

// 2.创建模型对象
const activitySchema = new mongoose.Schema({
    title: String,  // 活动标题
    createTime: String,   // 活动创建时间
    content: String,   // 活动内容
    cover: String       // 活动封面
})

// 3.根据规则创建对象
const Activity = mongoose.model('activity',activitySchema)

// 4.抛出模型对象
module.exports = Activity
