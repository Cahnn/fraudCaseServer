// 1. 导入mongoose
const mongoose = require('mongoose')

// 2.创建模型对象
const issueSchema = new mongoose.Schema({
    question: String,
    answer: String
})

// 3.根据规则创建对象
const Issue = mongoose.model('issue',issueSchema)

// 4.抛出模型对象
module.exports = Issue
