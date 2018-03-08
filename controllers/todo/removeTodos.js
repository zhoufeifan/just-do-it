function remove(model,todoId,userId) {
    return model.findOneAndRemove({id:todoId,userId});
}

module.exports = async (ctx, next) => {
    const requestData = ctx.method === 'POST' ? ctx.request.body : ctx.query;
    let {idList} = requestData;
    const {userId} = ctx.session;
    if(ctx.session.userId){
        if(!idList || !idList.length){
            ctx.error("id不能为空");
            return;
        }
        const Todo = require('../../models/Todo.js');
        idList = idList.split(',');
        try {
            idList.map(async (item)=>{
                let data = await remove(Todo,item,userId);
                console.log(data);
            });
            ctx.success();
        } catch (e) {
            ctx.error(e);
        }
    }else {
        ctx.error("登录身份过期，请重新登录");
    }
    await next();
};