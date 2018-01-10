function  getTodoList() {
    const Todo = require('../../models/Todo');
    return Todo.find({isFinished:false});
}

module.exports = async (ctx, next) => {
    try {
        let todoList = await getTodoList();
        ctx.success(todoList);
    } catch (e) {
        ctx.error(e);
    }
    await next();
};