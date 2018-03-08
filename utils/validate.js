const schema = require('async-validator');

function validate(rules,data) {
    const validator = new schema(rules);
    return new Promise((resolve,reject)=>{
        validator.validate(data,(errors,fields)=>{
            if(errors){
                console.log(errors);
                reject({errors,fields});
            }
            resolve();
        });
    })
}

module.exports = validate;