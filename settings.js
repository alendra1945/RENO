'use strict'
//Port settings
module.exports.port= 8080


// neo4j dataBase settings
module.exports.dbSettings={
    uri: "bolt://localhost:7687",
    username: "neo4j",
    password: "admin123"
}

// -- swagger settings
module.exports.apiDocsSettings= {
    openapi: '3.0.0',
    info: {
      title: 'API-RENO',
      version: '1.0.0',
      description: 'Development',
    },
    host: 'localhost:'+this.port,
    basePath: '/',
    securityDefinitions:{
      ApiKeyAuth:{
        type:"apiKey",
        name:"Authorization",
        in:"header"
      }
    }
  };

module.exports.secretKey="xaksj!#@#$*(&*^SJJJJDGSNNNXSBHGHG@#*&*@&#*"