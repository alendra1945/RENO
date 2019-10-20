const express=require('express')
const router=express.Router()
const swaggerUi = require('swagger-ui-express');
const yamljs=require('yamljs')
const {apiDocsSettings}=require('../../settings')
const apiDocs=require('../../api/docs/apiDocs')


// options
const swaggerOptions = {
  explorer:true,
  swaggerOptions: {
    urls:apiDocs
  }
}

router.use('/',swaggerUi.serve)
router.get('/',swaggerUi.setup(null, swaggerOptions))


router.get('/:name',function(req,res,next) {
  let swaggerSpecUser= {
    ...apiDocsSettings,
    paths:{
      ...yamljs.load('./api/docs/'+req.name+'.yml')
    }
  }
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerSpecUser);
})

module.exports=router