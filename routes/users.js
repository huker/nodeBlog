var express = require('express');
var router = express.Router();

//注册 这里的'/'是当前路由下的根目录 '/users'
router.get('/reg',function(req,res){
  res.render('user/reg');
});
//提交用户注册的表单到服务器
router.post('/reg',function(req,res){
  res.send('reg');
});

//登录
router.get('/login',function(req,res){
  res.render('user/login');
});

router.post('/login',function(req,res){
  res.send('login');
});

//退出
router.get('/logout',function(req,res){
  res.send('logout');
});

module.exports = router;
