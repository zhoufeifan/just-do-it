const getLastId = require('../../utils/getLastTheId');

module.exports = async (ctx, next) => {
    const requestData = ctx.method === 'POST' ? ctx.request.body : ctx.query;
    const {userName = "zhoufeifan", mail = "nima@nima.com",  password = "123456", description = "程序猿"} = requestData;
    const User = require('../../models/User.js');
    const validate = require('../../utils/validate');
    const rules = {
        userName:{type: "string", required: true},
        mail:{type: "email", required: true},
        password:{type: "string", required: true, min: 6}
    };

    try{
        await validate(rules, {
            userName,
            mail,
            password
        });
        try {
            if(await User.findOne({userName})){
                throw "该用户名已被注册";
            }
            if(await User.findOne({mail})){
                throw "该邮箱已被注册";
            }
            let id = await getLastId(User);
            let userItem = {
                id,
                userName,
                password,
                mail,//e-mail 地址
                description,//用户个人说明
            };
            await new User(userItem).save();
            ctx.success("操作成功");
        } catch (e) {
            console.log(e);
            ctx.error(e);
        }

    }catch (e){
        ctx.error("参数错误");
    }

    await next();
};