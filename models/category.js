// 1. 导入mongoose
const mongoose = require('mongoose')

// 2.创建模型对象
const categorySchema = new mongoose.Schema({
    name: String,
    id: String
})

// 3.根据规则创建对象
const Category = mongoose.model('category',categorySchema)

// 4.抛出模型对象
module.exports = Category
