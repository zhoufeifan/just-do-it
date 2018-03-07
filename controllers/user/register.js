const getLastId = require('../../utils/getLastTheId');

module.exports = async (ctx, next) => {
    const requestData = ctx.method === 'POST' ? ctx.request.body : ctx.query;
    const {userName = "zhoufeifan", mail = "nima@nima.com",  password = "123456", description = "程序猿"} = requestData;
    const User = require('../../models/User.js');
    let id = await getLastId(User);
    let userItem = {
        id,
        userName,
        password,
        mail,//e-mail 地址
        description,//用户个人说明
    };

    try {
        await new User(userItem).save();
        ctx.success("操作成功");
    } catch (e) {
        console.log(e);
        ctx.error(e);
    }

    await next();
};