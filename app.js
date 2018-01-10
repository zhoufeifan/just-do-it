const Koa = require('koa');
const controller = require('./controller');
// const session = require('koa-session2');
const mongoose = require('mongoose');
const app = new Koa();

const MONGO_DB_URL = 'mongodb://176.122.172.8:27017/test';

mongoose.connect(MONGO_DB_URL, {
    useMongoClient: true,
    /* other options */
}).then(()=>{
    console.log('connect success');
},()=>{
    console.log('connect error');
});


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

// response

app.use(controller());


app.listen(3000,()=>{
    console.log('starting at port 3000')
});