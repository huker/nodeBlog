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
                res.redirect('/admin/manageInfo')
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
        userData.forEach(function (item) {
            if(item.roles == 1){
                system_user.push(item)
            }
        })
    }).then(function () {
        console.log(system_user)
        res.render('admin/manager',{sys_user:system_user,user:user});
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

router.get('/sys-qs',function (req,res) {
    var user = req.session.user;
    qsModel.find({},function (err, qsData) {
        if(err){

        }else{
            res.render('admin/managerqs',{sys_article:qsData,user:user});
        }
    })
});


router.get('/logout',function (req, res) {
    req.session.user = null;
    res.redirect('/')
});

module.exports = router;
