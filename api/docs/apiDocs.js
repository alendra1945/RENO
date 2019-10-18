const express=require('express')
const router=express.Router()
const swaggerUi = require('swagger-ui-express');
const path = require('path');
const yamljs=require('yamljs')
const configApp = require('../../config/app');


// -- setup up swagger-jsdoc --
const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'API-Centra',
    version: '1.0.0',
    description: 'Development',
  },
  host: 'localhost:'+configApp.port,
  // host: 'server.amalsolution.com:'+configApp.port,
  basePath: '/',
  securityDefinitions:{
    ApiKeyAuth:{
      type:"apiKey",
      name:"Authorization",
      in:"header"
    }
  }
};

// options
const swaggerOptions = {
  explorer:true,
  swaggerOptions: {
    urls:[
      {
        url: '/api-docs/user',
        name:'User'
      }
    ]
  }
}
router.use('/',swaggerUi.serve)
router.get('/',swaggerUi.setup(null, swaggerOptions))


router.get('/user',function(req,res,next) {
  let swaggerSpecUser= {
    ...swaggerDefinition,
    paths:{
      ...yamljs.load('./api/docs/user.yml')
    }
    ,
  }
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerSpecUser);
})

module.exports=router