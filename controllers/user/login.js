module.exports = async (ctx, next) => {
    const requestData = ctx.method === 'POST' ? ctx.request.body : ctx.query;
    const {userName = "zhoufeifan", password = "123456"} = requestData;
    const validate = require('../../utils/validate');

    const rules = {
        userName:{type: "string", required: true},
        password:{type: "string", required: true, min: 6}
    };

    try {
        await validate(rules,{userName,password});
        const User = require('../../models/User.js');
        try {
            const user = await User.findOne({userName,password});
            if(user){
                ctx.session.userId = user.id;
                ctx.success({userInfo:user});
            }else {
                ctx.error("密码错误")
            }
        } catch (e) {
            console.log(e);
            ctx.error(e);
        }
    }
    catch (e){
        ctx.error("参数错误");
    }
    await next();
};
