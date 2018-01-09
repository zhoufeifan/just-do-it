module.exports = async (ctx, next) => {
    ctx.body = '404';
    await next();
};