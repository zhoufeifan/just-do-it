const fs = require('fs');
const path = require('path');
function getRouterList(dirPath, prefix = "") {
    let content = "";
    fs.readdirSync(dirPath).forEach(file => {
        let filePath = path.resolve(`${dirPath}/${file}`);
        const stat = fs.statSync(filePath);
        if (stat.isDirectory()) {
            content+= getRouterList(filePath,file);
        }else {
            let url = prefix+"/"+file.replace(/.js/,'');
            content+=`<p><a href="/${url}" target="_blank">${url}</a></p>`;
        }
    });
    return content;
}


module.exports = async (ctx, next) => {
    ctx.type = 'text/html';
    ctx.body = `${getRouterList(path.resolve('./controllers'))}`;
    await next();
};