function  getTodoList() {
    const Todo = require('../../models/Todo');
    return Todo.find({isFinished:false});
}

module.exports = async (ctx, next) => {
    try {
        let todoList = await getTodoList();
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
    await next();
};