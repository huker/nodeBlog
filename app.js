var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session=require('express-session');
var MongoStore=require('connect-mongo/es5')(session);

//路由
var routes = require('./routes/index');
var users = require('./routes/users');
var articles = require('./routes/articles');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');
//对html文件 渲染的时候委托ejs渲染方式渲染
app.engine('html',require('ejs').renderFile);
var mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/nodeBlog');
//使用了会话中间件后 req多了一个session的属性
app.use(session({
  secret:'nodeBlog',
  resave:false,
  saveUninitialized:true,
  //指定保存的位置
  store: new MongoStore({mongooseConnection:mongoose.connection})
}));

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
//配置模板中间件
app.use(function(req,res,next){
  res.locals.user=req.session.user;
  next();
});

//路由实例
app.use('/', routes);
app.use('/users', users);
app.use('/articles', articles);

//线性执行 上面全没找到的话　就捕获404
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// 错误处理

// development error handler 开发环境的错误处理
// will print stacktrace 打印出错误的调用堆栈
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

//没有next 所以不接着执行

// production error handler 生产环境中的错误处理
// no stacktraces leaked to user 不把堆栈信息暴露给用户

app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
