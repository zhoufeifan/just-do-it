const mongoose = require('mongoose');

const todoSchema = mongoose.Schema({
    id: Number, // id
    title: String,// 标题
    description: String,//事项说明
    isFinished: Boolean,//是否完成
    createdTime: Date,//创建时间
    finishedTime: Date//完成时间
});
module.exports = mongoose.model('Todo', todoSchema);