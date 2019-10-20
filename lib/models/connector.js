const {dbSettings} = require('../../settings');
const neode=require('neode')
const models=require("../../api/models/models")

instances= new neode(dbSettings.uri,dbSettings.username, dbSettings.password)
                .with({
                    'User':{...require("./user/user")},
                    ...models
                })
module.exports=instances