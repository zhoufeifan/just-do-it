const getTheLastId = require('../../utils/getLastTheId');

module.exports = async (ctx, next) => {
    const {title = "unknow",description ="you are lazy !"} = ctx.query;
    const Todo = require('../../models/Todo.js');
    let id = await getTheLastId(Todo);
    console.log(id);
    let todoItem = {
        id,
        title,
        isFinished: false,
        createdTime: new Date(),
        description
    };

    try {
        await new Promise((resolve,reject)=>{
            new Todo(todoItem).save((error,item)=>{
                if(error) {
                    reject(error);
                    console.log(error);
                    return;
                }
                resolve();
            });
        });
        ctx.success("操作成功");
    } catch (e) {
        console.log(e);
        ctx.error(e);
    }

    await next();
};