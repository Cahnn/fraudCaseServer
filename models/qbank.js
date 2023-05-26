// 1. 导入mongoose
const mongoose = require('mongoose')

// 2.创建模型对象
const qBankSchema = new mongoose.Schema({
    title: String,
    type: Number,
    optionList: [
        {
            id:String,
            content: String
        }
    ],
    answer: {
        type: String,
        default: ''
    },
    userAnswer: {
        type: String,
        default: ''
    },
    userFavor: {
        type: String,
        default: 'false'
    },
    explain: {
        type: String,
        default: ''
    }
})

// 3.根据规则创建对象
const qBank = mongoose.model('qbanks',qBankSchema)

// 4.抛出模型对象
module.exports = qBank
