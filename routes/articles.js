/**
 * Created by hu on 2016/4/1.
 */
var express = require('express');
var articleModel=require('../model/article.js');
var router=express.Router();
var multer=require('multer');

//指定文件元素的存储方式
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, '../public/images');
    },
    filename: function (req, file, cb) {
        console.error(file);
        cb(null, Date.now()+'.'+file.mimetype.slice(file.mimetype.indexOf('/')+1))
    }
});
var upload = multer({ storage: storage });


router.get('/add',function(req,res){
    res.render('article/add',{article:{}});
});

router.post('/add',upload.single('img'),function(req,res){
    var article=req.body;
    var user=req.session.user;
    article.user=user;
    if(req.file){
        //拼路径
        article.img='/images/'+req.file.filename;
    }
    articleModel.create(article,function(err,article){
        if(err){
            req.flash('error','文章发表失败');
            res.redirect('back');
        }else{
            req.flash('success','文章发表成功');
            return res.redirect('/');
        }
    });
});
module.exports=router;