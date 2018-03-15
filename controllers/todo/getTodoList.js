function  getTodoList(userId) {
    const Todo = require('../../models/Todo');
    return Todo.find({isFinished:false,userId});
}

module.exports = async (ctx, next) => {
    const {userId}= ctx.session;
    if(userId){
        try {
            let todoList = await getTodoList(userId);
            let result = [];
            todoList.map((item=>{
                let data = {};
                data.id = item.id;
                data.title = item.title;
                data.type = item.type;
                data.isFinished = item.isFinished;
                data.createdTime = item.createdTime.valueOf();
                data.description = item.description;
                result.push(data);

            }));
            ctx.success(result);
        } catch (e) {
            ctx.error(e);
        }
    }else {
        ctx.error("登录身份过期，请重新登录");
    }

    await next();
};