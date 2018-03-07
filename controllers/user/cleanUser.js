module.exports = async (ctx, next) => {
    const User = require('../../models/User.js');
    try {
        await User.remove();
        ctx.success();
    } catch (e) {
        ctx.error(e);
    }
    await next();
};