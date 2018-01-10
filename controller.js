const fs = require('fs');

function addControllers(router, dir = './controllers') {
    const files = fs.readdirSync(dir);
    files.forEach(file => {
        const path = `${dir}/${file}`;
        const stat = fs.statSync(path);
        if (stat.isDirectory()) {
            return addControllers(router, path);
        }
        // 获取处理函数
        const handleAction = require(path);
        //去除路径中的.js
        const url = path.substring(13).slice(0, -3);
        router.get(url, handleAction);
        router.post(url, handleAction);
    });
}

module.exports = function () {
    const router = require('koa-router')();
    addControllers(router);
    router.get('/', require(`${__dirname}/controllers/index`));
    return router.routes();
};