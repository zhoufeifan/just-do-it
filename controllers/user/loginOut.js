module.exports = async (ctx, next) => {
    ctx.session.userId = "";
    ctx.success("退出成功");
    await next();
};
