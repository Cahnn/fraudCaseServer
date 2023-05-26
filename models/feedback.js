// 1. 导入mongoose
const mongoose = require('mongoose')

// 2.创建模型对象
const feedbackSchema = new mongoose.Schema({
    type: String,
    content: String,
    photo: String,
    contactWay: String,
    createTime:String
})

// 3.根据规则创建对象
const Feedback = mongoose.model('feedback',feedbackSchema)

// 4.抛出模型对象
module.exports = Feedback
