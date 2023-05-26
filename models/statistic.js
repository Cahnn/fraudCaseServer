const mongoose = require('mongoose')

const Statistic = mongoose.model('frauds', new mongoose.Schema({
    type: String,
    province: String,
    age: String,
    year: String
}));

module.exports = Statistic
