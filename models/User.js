const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    id: Number, // id
    userName: String,// 标题
    password: String,
    mail: String,//e-mail 地址
    description: String,//用户个人说明
});
module.exports = mongoose.model('User', userSchema);