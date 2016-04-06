/**
 * Created by hu on 2016/4/1.
 */
var express = require('express');
var router=express.Router();
var articleModel=require('../model/article.js');
/*
* 文章路由:
* 请求一个空白文章的页面 get
* 提交文章数据 post
* */

router.get('/add',function(req,res){
    res.render('article/add');
});

router.post('/add',function(req,res){
    var article=req.body;
    var user=req.session.user;
    article.user=user;
    articleModel.create(article,function(err,article){
        if(err){
            req.flash('error','文章发表失败');
            res.redirect('back');
        }else{
            req.flash('success','文章发表成功');
            res.redirect('/');
        }
    });
});
module.exports=router;