module.exports = async (ctx, next) => {
    try {
        ctx.success();
    } catch (e) {
        ctx.error(e);
    }
    await next();
};