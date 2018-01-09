module.exports = async (ctx, next) => {
    const {idList} = ctx.query;
    if(!idList || !idList.length){
        ctx.error("id 不能为空");
        return;
    }
    try {
        ctx.success();
    } catch (e) {
        ctx.error(e);
    }
    await next();
};