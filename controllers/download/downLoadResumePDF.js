const superagent = require('superagent');
const cheerio = require('cheerio');
const pdf = require('html-pdf');
const browserMsg = {
    "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/54.0.2840.71 Safari/537.36",
    'Content-Type': 'application/x-www-form-urlencoded'
};

function getResumePage(url) {
    return new Promise((resolve,reject)=>{
        superagent.get(url)
            .set(browserMsg)
            .end((err,response)=>{
                if(err){
                    console.log(err);
                    reject(err);
                    return;
                }
                resolve(response.text);
            });
    });
}

function createPDF(html) {
    return new Promise((resolve, reject)=>{
        pdf.create(html, {width: '300mm', height: '800mm'}).toBuffer(function(err, buffer){
            if(err){
                reject(err);
            }
            else if(!Buffer.isBuffer(buffer)){
                reject('type error');
            }else {
                resolve(buffer);
            }
        });
    });
}


module.exports = async (ctx, next) => {
    ctx.type = 'application/pdf';
    let html = await getResumePage("http://localhost:3000");
    let $ = cheerio.load(html);
    $('.download').text('');
    ctx.body = await createPDF($.html());
    await next();
};