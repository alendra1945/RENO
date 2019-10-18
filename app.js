const express = require('express');
const logger = require('morgan');
const createError = require('http-errors');
const path = require('path');
const bodyParser = require('body-parser');
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const app = express();
app.use(logger('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json({
  strict: false,
}));

// -- setup up swagger-jsdoc --
const swaggerDefinition = {
  info: {
    title: 'API',
    version: '0.0.1',
    description: 'Development',
  },
  host: 'localhost:8080',
  basePath: '/',
  securityDefinitions:{
    ApiKeyAuth:{
      type:"apiKey",
      name:"Authorization",
      in:"header"
    }
  }
};

// -- routes for docs and generated swagger spec --
const swaggerOptions = {
  swaggerOptions: {
    url: '/docs/swagger.json'
  }
}

const options = {
  swaggerDefinition,
  apis: [path.resolve(__dirname, './routes/*/*')],
};
const swaggerSpec = swaggerJSDoc(options);

app.get('/docs/swagger.json', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerSpec);
});

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(null, swaggerOptions));

//User
app.use('/user', require('./routes/user/user'));


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  // send the error
  res.status(err.status || 500);
  res.json({
    error: {
      message : err.message
  }
});


});

module.exports = app;
