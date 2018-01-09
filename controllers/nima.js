module.exports = async (ctx, next) => {
    ctx.body = 'nima';
    await next();
};