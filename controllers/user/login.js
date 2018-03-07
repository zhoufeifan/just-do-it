module.exports = async (ctx, next) => {
    const requestData = ctx.method === 'POST' ? ctx.request.body : ctx.query;
    const {userName = "zhoufeifan", password = "123456"} = requestData;
    const User = require('../../models/User.js');
    try {
        const user = await User.findOne({userName,password});
        console.log(ctx.session);
        if(user){
            ctx.session.userId = user.id;
            ctx.session.count = (ctx.session.count || 0) +1;
            ctx.success("登录成功");
        }else {
            ctx.error("密码错误")
        }
    } catch (e) {
        console.log(e);
        ctx.error(e);
    }
    await next();
};
