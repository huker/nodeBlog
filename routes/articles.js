/**
 * Created by hu on 2016/4/1.
 */
var express = require('express');
var router=express.Router();

/*
* 请求一个空白文章的页面 get
* 提交文章数据 post
* */

router.get('/add',function(req,res){
    res.render('article/add');
});

router.post('/add',function(req,res){
    res.send('article')
});
module.exports=router;