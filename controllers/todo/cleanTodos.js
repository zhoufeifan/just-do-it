module.exports = async (ctx, next) => {
    const Todo = require('../../models/Todo.js');
    try {
        await Todo.remove();
        ctx.success();
    } catch (e) {
        ctx.error(e);
    }
    await next();
};