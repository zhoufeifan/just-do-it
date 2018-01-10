function done(model,todoId) {
    console.log(todoId);
    return new Promise((resolve,reject)=>{
        model.findOneAndUpdate({id:todoId},
            {isFinished: true,finishedTime:new Date()},
            (error,item)=>{
                console.log(item);
                if(error) reject(error);
                resolve();
            }
        )
    });

}

module.exports = async (ctx, next) => {
    let {idList} = ctx.query;
    console.log(idList);
    if(!idList || !idList.length){
        ctx.error("id不能为空");
        return;
    }
    const Todo = require('../../models/Todo.js');
    idList = idList.split(',');
    try {
        idList.map(async (item)=>{
            await done(Todo,item);
        });
        ctx.success();
    } catch (e) {
        ctx.error(e);
    }
    await next();
};