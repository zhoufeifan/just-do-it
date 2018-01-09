// const http = require('http');
// const hostname = '127.0.0.1';
// const port = 3000;
// const server = http.createServer((req, res) => {
//     res.statusCode = 200;
//     res.setHeader('Content-Type', 'text/plain');
//     res.end('Hello World\n');
// });

var MongoClient = require('mongodb').MongoClient;
var DB_CONN_STR = 'mongodb://176.122.172.8:27017/test';

var selectData = function(db, callback) {
    //连接到表
    var collection = db.collection('t1');
    //查询数据
    collection.find().toArray(function(err, result) {
        if(err){
            console.log('Error:'+ err);
            return;
        }
        callback(result);
    });
}

MongoClient.connect(DB_CONN_STR, function(err, db) {
    if(err){
        console.log("连接失败");
        return;
    }
    console.log("连接成功！");
    var database = db.db('test')
    selectData(database, function(result) {
        console.log(result);
        db.close();
    });
});


// server.listen(port, hostname, () => {
//     console.log(`Server running at http://${hostname}:${port}/`);
// });