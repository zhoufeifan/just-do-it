function remove(model,todoId) {
    return model.findOneAndRemove({id:todoId});
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
            let data = await remove(Todo,item);
            console.log(data);
        });
        ctx.success();
    } catch (e) {
        ctx.error(e);
    }
    await next();
};