const getTheLastId = require('../../utils/getLastTheId');

module.exports = async (ctx, next) => {
    const requestData = ctx.method === 'POST' ? ctx.request.body : ctx.query;
    const {title = "unknow", description = "you are lazy !", type = "1"} = requestData;
    const Todo = require('../../models/Todo.js');
    let id = await getTheLastId(Todo);
    console.log(id,title,type);
    let todoItem = {
        id,
        title,
        type,
        isFinished: false,
        createdTime: new Date(),
        description
    };

    try {
        await new Todo(todoItem).save();
        ctx.success("操作成功");
    } catch (e) {
        console.log(e);
        ctx.error(e);
    }

    await next();
};