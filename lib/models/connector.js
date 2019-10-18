const config = require('../../config/config');
const neode=require('neode')
const models=require("../../api/models/models")

instances= new neode(dbconfig.uri,dbconfig.username, dbconfig.password)
                .with({
                    'User':{...require("./user/user")},
                    ...models
                })
module.exports=instances