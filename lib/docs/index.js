const express=require('express')
const router=express.Router()
const swaggerUi = require('swagger-ui-express');
const {apiDocsSettings}=require('../../settings')
const apiDocs=require('../../api/docs/apiDocs')
const {getURLDoc,makeDataDoc}=require('../utils/docsUtils')


// options
const swaggerOptions = {
  explorer:true,
  swaggerOptions: {
    urls:getURLDoc
  }
}

router.use('/',swaggerUi.serve)
router.get('/',swaggerUi.setup(null, swaggerOptions))


router.get('/:name',function(req,res,next) {
  let swaggerSpecUser= {
    ...apiDocsSettings,
    paths:{
      ...makeDataDoc(req.params.name)
    }
  }
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerSpecUser);
})

module.exports=router