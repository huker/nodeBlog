var express = require('express');
var router = express.Router();
var userModel = require('../model/user');
var articleModel = require('../model/article');
var qsModel = require('../model/question');
//登录

router.get('/login',function (req, res) {
    res.render('admin/adminlogin',{user:{}})
});

router.post('/login',function (req, res) {
    if(req.session.user){
        req.session.user = null;
    }
   var userData = req.body;
    userModel.findOne(userData,function (err, user) {
        if(!user && typeof user === 'object'){
            req.flash('error', '管理员登录失败');
            res.redirect('back');
        }else{
            if(user.roles == 0){
                req.session.user = user;
                req.flash('success', '管理员登录成功');
                // res.render('admin/manager',{user:user});
                res.redirect('/admin/manage-info')
            }else{
                req.flash('error', '管理员登录失败');
                res.redirect('back');
            }
        }
    })
});

router.get('/manage-info',function (req,res) {
    var user = req.session.user;
    var system_user = [];
    userModel.find({},function (err, userData) {
        if(err){

        }else{
            userData.forEach(function (item) {
                if(item.roles == 1){
                    system_user.push(item)
                }
            })
        }
    }).then(function () {
        console.log(system_user)
        res.render('admin/manager',{sys_user:system_user,user:user});
    })
});
router.get('/sys-user/:_id',function (req,res) {
    var resdata = false;
    userModel.remove({_id:req.params._id},function (err, result) {
        if(err){

        }else{
            resdata = true;
        }
    }).then(function () {
        //删除了用户后还需要删除它发表得到文章和问题
        var $set = {user:{_id:req.params._id}};
        articleModel.remove($set,function (err, result) {
            if(err){

            }else{
                resdata = true;
            }
        })
    }).then(function () {
        var $setqs = {user:{_id:req.params._id}};
        qsModel.remove($setqs,function (err, result) {
            if(err){

            }else{
                resdata = true;
            }
        })
    }).then(function () {
        if(resdata){
            var data = {"success":true};
            res.end(JSON.stringify(data));
        }
    })
});
router.get('/sys-article',function (req,res) {
    var user = req.session.user;
    articleModel.find({}).populate('user').exec(function (err, articleData) {
        if(err){

        }else{
            res.render('admin/managerarticle',{sys_article:articleData,user:user});
        }
    })
});
router.get('/sys-article/:_id',function (req,res) {
    articleModel.remove({_id:req.params._id},function (err, result) {
        if(err){

        }else{
            var resdata = {"success":true};
            res.end(JSON.stringify(resdata));
        }
    })
});

router.get('/sys-qs',function (req,res) {
    var user = req.session.user;
    qsModel.find({}).populate('user').exec(function (err, qsData) {
        if(err){

        }else{
            res.render('admin/managerqs',{sys_qs:qsData,user:user});
        }
    })
});
router.get('/sys-qs/:_id',function (req,res) {
    qsModel.remove({_id:req.params._id},function (err, result) {
        if(err){

        }else{
            var resdata = {"success":true};
            res.end(JSON.stringify(resdata));
        }
    })
});

router.get('/logout',function (req, res) {
    req.session.user = null;
    res.redirect('/')
});

module.exports = router;
