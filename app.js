const express = require('express');
const logger = require('morgan');
const createError = require('http-errors');
const bodyParser = require('body-parser');
const {allowHeader,allowOrigin}=require('./settings')

const app = express();
app.use(logger('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json({
  strict: false,
}));

//csrf settings
app.use((req,res,next)=>{
  res.header('Access-Control-Allow-Origin',allowOrigin)
  res.header('Acces-Control-Allow-Headers',allowHeader.join(','))
  next()
})


//rediect to api-docs
app.get('/',function(req,res,next){
  res.redirect('/api-docs')
})
//docs api
app.use('/api-docs',require('./lib/docs/') );

//User
app.use('/user', require('./api/routes/user/user'));


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
