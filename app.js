var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var db = require('./db/db')
var expressJwt = require('express-jwt')
var {PRIVITE_KEY,EXPIRESD} = require('./utils/store')

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var policysRouter = require('./routes/policys');
var tagsRouter = require('./routes/tags');
var talentsRouter = require('./routes/talents');
var recommendListsRouter = require('./routes/recommendLists')
var blackListRouter = require('./routes/blackList')

var historicalRouter = require('./routes/historical')

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.set('port', process.env.PORT || 4000);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/api/users', usersRouter);
app.use('/api/policys', policysRouter);
app.use('/api/tags', tagsRouter);
app.use('/api/talents', talentsRouter);
app.use('/api/recommendLists', recommendListsRouter);
app.use('/api/blackLists', blackListRouter);
app.use('/api/historical', historicalRouter);

//configure JWT service
var secret_private_key = "hello jiangdu"
app.use(expressJwt({
  credentialsRequired: false,
  secret: secret_private_key,
  algorithms: ['HS256']
}).unless({
  path: ['/api/users', '/api/policys', '/api/tags', '/api/talents', '/api/historical','/api/blackLists'] //添加不需要验证的路由
}))

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
