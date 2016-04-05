var express = require('express');
var router = express.Router();
var userModel=require('../model/user');

//注册 这里的'/'是当前路由下的根目录 '/users'
router.get('/reg',function(req,res){
  res.render('user/reg');
});
//提交用户注册的表单到服务器
router.post('/reg',function(req,res){
  var user=req.body;
  userModel.create(user,function(err,doc){
    if(err){
      //返回到上一个页面
      res.redirect('back');
    }else{
      req.session.user=doc;
      res.redirect('/')
    }
  });
});

//登录
router.get('/login',function(req,res){
  res.render('user/login');
});

router.post('/login',function(req,res){
  res.redirect('/');
});

//退出
router.get('/logout',function(req,res){
  req.session.user=null;
  res.redirect('/');
});

module.exports = router;
