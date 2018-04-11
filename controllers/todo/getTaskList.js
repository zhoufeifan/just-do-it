function  getTaskList({userId,beginTime,endTime}) {
    const Todo = require('../../models/Todo');
    let query = {};
    if(beginTime){
        query.$and= [
            {"createdTime":{"$gte": new Date(beginTime)}},
            {"createdTime":{"$lte": new Date(endTime).setDate(new Date(endTime).getDate()+1)}}
        ];
    }
    return Todo.find({...query,userId});
}

module.exports = async (ctx, next) => {
    const requestData = ctx.method === 'POST' ? ctx.request.body : ctx.query;
    let {beginTime = "", endTime = "",} = requestData;
    const {userId}= ctx.session;
    if(userId){
        try {
            let taskList = await getTaskList({
                userId,
                beginTime,
                endTime,
            });
            let result = [];
            taskList.map((item=>{
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
    }else {
        ctx.error("登录身份过期，请重新登录");
    }

    await next();
};