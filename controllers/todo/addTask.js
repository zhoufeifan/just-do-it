const getTheLastId = require('../../utils/getLastTheId');

module.exports = async (ctx, next) => {
    const requestData = ctx.method === 'POST' ? ctx.request.body : ctx.query;
    const {title = "unknow", description = "you are lazy !", type = "1"} = requestData;
    const {userId} = ctx.session;
    if(userId){
        const Todo = require('../../models/Todo.js');
        let id = await getTheLastId(Todo);
        let todoItem = {
            id,
            userId,
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
    }else {
        ctx.error("登录身份过期，请重新登录");
    }

    await next();
};