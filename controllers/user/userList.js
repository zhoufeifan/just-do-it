function  getUserList() {
    const Todo = require('../../models/User');
    return Todo.find();
}

module.exports = async (ctx, next) => {
    try {
        let userList = await getUserList();
        ctx.success(userList);
    } catch (e) {
        ctx.error(e);
    }
    await next();
};