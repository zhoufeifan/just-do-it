function getTheLastId(Model) {
   return new Promise((resolve,reject)=>{
       Model.find(function (err, items) {
            if (err) {
                reject(err);
                return;
            }
            console.log(items);
            if(items.length){
                resolve(items[items.length-1].id+1);
                return
            }
            resolve(1);
        });
    });
}
module.exports = getTheLastId;