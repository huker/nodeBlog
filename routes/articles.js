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
    //是否有id 有的话就是更新页面
    var _id=article._id;
    if(_id){
        //要改变的值
        var set={title:article.title,content:article.content};
        if(req.file){
            set.img='/images/'+req.file.filename;
        }
        articleModel.update({_id:article._id},{$set:set},function(err,article){
            if(err){
                req.flash('error','更新文章失败');
                res.redirect('back')
            }else{
                req.flash('success','更新文章成功');
                res.redirect('/');
            }
        })
    }else{
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
    }

});

//详情文章页面
router.get('/detail/:_id',function(req,res){
    articleModel.findById(req.params._id,function(err,article) {
        if (err) {
            req.flash('error', err);
            res.redirect('back')
        }
        else {
            res.render('article/detail', {article: article});
        }
    })
});

//删除文章
router.get('/delete/:_id',function(req,res){
    articleModel.remove({_id:req.params._id},function(err,result){
        if(err){
            req.flash('error','文章删除失败');
            res.redirect('back')
        }else{
            req.flash('success','文章删除成功');
            res.redirect('/');
        }
    })
});

//修改文章
router.get('/update/:_id',function(req,res){
    articleModel.findById(req.params._id,function(err,article){
        res.render('article/add',{article:article})
    })
});

module.exports=router;