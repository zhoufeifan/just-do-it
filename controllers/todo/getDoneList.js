function  getDoneList() {
    const Todo = require('../../models/Todo');
    return Todo.find({isFinished:true});
}

module.exports = async (ctx, next) => {
    try {
        let todoList = await getDoneList();
        ctx.success(todoList);
    } catch (e) {
        ctx.error(e);
    }
    await next();
};