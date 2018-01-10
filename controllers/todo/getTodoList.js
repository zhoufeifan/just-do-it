function  getTodoList() {
    const Todo = require('../../models/Todo');
    return new Promise((resolve,reject)=>{
        Todo.find(function (err, items) {
            if (err) {
                reject(err);
                return;
            }
            resolve(items);
        });
    });
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