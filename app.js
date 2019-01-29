const Koa = require('koa');
const bodyParser = require('koa-bodyparser');//处理post请求
const session = require('koa-session');
const controller = require('./controller');
const mongoose = require('mongoose');

const app = new Koa();
app.keys = ['nima'];
const CONFIG = {
    key: 'justdoit', /** (string) cookie key (default is koa:sess) */
    /** (number || 'session') maxAge in ms (default is 1 days) */
    /** 'session' will result in a cookie that expires when session/browser is closed */
    /** Warning: If a session cookie is stolen, this cookie will never expire */
    maxAge: 86400000,
    overwrite: true, /** (boolean) can overwrite or not (default true) */
    httpOnly: true, /** (boolean) httpOnly or not (default true) */
    signed: true, /** (boolean) signed or not (default true) */
    rolling: false, /** (boolean) Force a session identifier cookie to be set on every response. The expiration is reset to the original maxAge, resetting the expiration countdown. (default is false) */
    renew: false, /** (boolean) renew session when session is nearly expired, so we can always keep user logged in. (default is false)*/
};
app.use(session(CONFIG, app));


// const {dbHost} = require('./config.json');

// console.log(dbHost);
// const MONGO_DB_URL = `mongodb://${dbHost}/test`;

// mongoose.connect(MONGO_DB_URL, {
//     useMongoClient: true,
//     /* other options */
// }).then(()=>{
//     console.log('connect success');
// },()=>{
//     console.log('connect error');
// });




//处理统一成功
app.context.success = function (data) {
    this.body = {
        result: {
            success: true,
            errorCode: '0',
            errorMsg: "操作成功",
        },
        data,
    };
};
//统一处理错误
app.context.error = function (msg = '系统错误', code = 'PARAMS_ERROR') {
    this.body = {
        result: {
            success: false,
            errorCode: code,
            errorMsg: msg,
        },
    };
};


// 使用ctx.body解析中间件
app.use(bodyParser());

// 全局错误处理
app.use(async function (ctx, next) {
    try {
        await next();
    } catch (e) {
        console.error(e);
        ctx.error();
    }
});

// 允许跨域
app.use(async (ctx, next) => {
    ctx.type = 'application/json';
    ctx.set("Access-Control-Allow-Origin", ctx.headers.origin);
    ctx.set('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    ctx.set("Access-Control-Allow-Headers", "X-Requested-With");
    ctx.set('Access-Control-Allow-Headers', 'Content-Type');
    ctx.set('Access-Control-Allow-Credentials', 'true');
    await next();
});

//检测登录
// app.use(async (ctx,next)=>{
//     // let n = ctx.session.views || 0;
//     // ctx.session.views = ++n;
//     // ctx.body = n + ' views';
//     console.log(ctx.session);
//     if(!ctx.session.userId){
//         ctx.error("登录身份过期，请重新登录！","-1");
//         return;
//     }
//     await next();
// });


// response

app.use(controller());


app.listen(3001,()=>{
    console.log('starting at http://localhost:3001')
});