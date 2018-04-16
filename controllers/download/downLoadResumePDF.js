const superagent = require('superagent');
const cheerio = require('cheerio');
const pdf = require('html-pdf');
const {resumeUrl} = require('../../config.json');
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
        pdf.create(html, {
            "format": "A4",
            "orientation": "portrait",
            "header": {
                "height": "8mm",
                "contents": '<div style="text-align: center; font-size:10px; background-color: white">简历 &nbsp;| &nbsp;周非凡</div>'
            },
            "footer": {
                "height": "6mm",
                "contents": {
                    default: '<div style="color: #444; font-size:10px; text-align: center;">{{page}}/{{pages}}</div>', // fallback value
                }
            },
        }).toBuffer(function(err, buffer){
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
    console.log(resumeUrl);
    let html = await getResumePage(resumeUrl);
    console.log(html);
    let $ = cheerio.load(html);
    $('.download').text('');
    ctx.body = await createPDF($.html());
    await next();
};