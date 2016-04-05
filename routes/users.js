var express = require('express');
var router = express.Router();
var userModel=require('../model/user');
var validate=require('../middle/index.js');

//注册 这里的'/'是当前路由下的根目录 '/users'
router.get('/reg',validate.checkNotLogin,function(req,res){
  res.render('user/reg');
});
//提交用户注册的表单到服务器
router.post('/reg',validate.checkNotLogin,function(req,res){
  var user=req.body;
  userModel.create(user,function(err,doc){
    if(err){
      req.flash('error',err);
      //返回到上一个页面
      res.redirect('back');
    }else{
      req.session.user=doc;
      req.flash('success','注册成功!');
      res.redirect('/')
    }
  });
});

//登录
router.get('/login',validate.checkNotLogin,function(req,res){
  res.render('user/login');
});

router.post('/login',validate.checkNotLogin,function(req,res){
  res.redirect('/');
});

//退出
router.get('/logout',validate.checkLogin,function(req,res){
  req.session.user=null;
  res.redirect('/');
});

module.exports = router;
